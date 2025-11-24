class TelegramAutoComplete {
  constructor() {
    this.id = "telegram-autocomplete";
    this.name = "Telegram Bot AutoComplete";
    this.completions = window.telegramCompletions;
  }

  init(app) {
    this.app = app;
    console.log("🔧 Telegram Bot AutoComplete loaded!");
    
    // Setup auto-complete
    this.setupAutoComplete();
    
    // Add command to palette
    this.addCommands();
  }

  setupAutoComplete() {
    // Tunggu editor ready
    const checkEditor = setInterval(() => {
      if (this.app.editor && this.app.editor.editor) {
        clearInterval(checkEditor);
        this.injectAutoComplete();
      }
    }, 500);
  }

  injectAutoComplete() {
    const editor = this.app.editor.editor;
    const session = editor.getSession();
    
    // Enable autocomplete jika belum
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    });

    // Custom completer
    const customCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        try {
          // Dapatkan line text saat ini
          const line = session.getLine(pos.row);
          const cursor = pos.column;
          
          // Cari trigger words
          let triggerType = null;
          
          // Check untuk single character 'c'
          if (prefix === 'c' || (line[cursor-1] === 'c' && !this.isInMiddleOfWord(line, cursor))) {
            triggerType = 'cKeywords';
          }
          
          // Check trigger lainnya
          for (const [trigger, type] of Object.entries(this.completions.triggers)) {
            if (line.includes(trigger) && this.isTriggerActive(line, trigger, cursor)) {
              triggerType = type;
              break;
            }
          }

          if (triggerType) {
            const items = this.completions[triggerType];
            if (items) {
              const completions = items.map(item => ({
                caption: item.name,
                value: item.snippet || item.value,
                meta: "🤖 Telegram",
                description: item.description,
                score: 1000,
                completer: this
              }));
              
              callback(null, completions);
              return;
            }
          }

          callback(null, []);
        } catch (error) {
          console.error("AutoComplete error:", error);
          callback(null, []);
        }
      }
    };

    // Tambahkan completer ke editor
    if (editor.completers) {
      editor.completers = [customCompleter, ...editor.completers];
    } else {
      editor.completers = [customCompleter];
    }
  }

  isTriggerActive(line, trigger, cursorPos) {
    const triggerIndex = line.lastIndexOf(trigger, cursorPos);
    if (triggerIndex === -1) return false;
    
    // Cek jika trigger adalah bagian dari word yang lebih panjang
    const afterTrigger = line.substring(triggerIndex + trigger.length, cursorPos);
    return afterTrigger.trim() === '' || /[^a-zA-Z0-9_]/.test(line[triggerIndex + trigger.length]);
  }

  isInMiddleOfWord(line, cursorPos) {
    if (cursorPos === 0) return false;
    const prevChar = line[cursorPos - 1];
    const nextChar = line[cursorPos];
    return /[a-zA-Z0-9_]/.test(prevChar) && /[a-zA-Z0-9_]/.test(nextChar);
  }

  addCommands() {
    if (this.app.commands) {
      this.app.commands.registerCommand("telegram-autocomplete:show", {
        name: "Show Telegram AutoComplete",
        description: "Manual trigger Telegram auto-complete",
        exec: () => {
          this.triggerAutoComplete();
        }
      });
    }
  }

  triggerAutoComplete() {
    if (this.app.editor && this.app.editor.editor) {
      this.app.editor.editor.execCommand("startAutocomplete");
    }
  }
}

// Register plugin
if (typeof acode !== "undefined") {
  acode.setPluginInit("telegram-autocomplete", (baseUrl, $page, options) => {
    if (!window.telegramAutoComplete) {
      window.telegramAutoComplete = new TelegramAutoComplete();
      window.telegramAutoComplete.init(acode);
    }
  });
  
  acode.setPluginUninstall("telegram-autocomplete", () => {
    if (window.telegramAutoComplete) {
      window.telegramAutoComplete = null;
    }
  });
}
