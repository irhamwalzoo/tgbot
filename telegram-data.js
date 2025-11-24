window.telegramCompletions = {
  // AUTO-COMPLETE UNTUK HURUF 'c'
  cKeywords: [
    {
      name: "callback_data",
      value: "callback_data: \"",
      description: "Callback data for inline buttons",
      snippet: "callback_data: \"${1:data}\"",
      match: "c"
    },
    {
      name: "chatId",
      value: "chatId",
      description: "Chat ID parameter",
      snippet: "chatId",
      match: "c"
    },
    {
      name: "caption",
      value: "caption: \"",
      description: "Caption for media messages",
      snippet: "caption: \"${1:caption text}\"",
      match: "c"
    },
    {
      name: "callback_query",
      value: "callback_query",
      description: "Callback query object",
      snippet: "callback_query",
      match: "c"
    },
    {
      name: "createInvoice",
      value: "createInvoicePayload",
      description: "Create invoice payload",
      snippet: "{\n  title: \"${1:Invoice Title}\",\n  description: \"${2:Invoice Description}\",\n  payload: \"${3:payload}\",\n  provider_token: \"${4:token}\",\n  currency: \"${5:USD}\",\n  prices: [\n    { label: \"${6:Item}\", amount: ${7:1000} }\n  ]\n}",
      match: "c"
    },
    {
      name: "contact",
      value: "contact: {",
      description: "Contact information",
      snippet: "contact: {\n  phone_number: \"${1:number}\",\n  first_name: \"${2:name}\"\n}",
      match: "c"
    },
    {
      name: "channel",
      value: "channel",
      description: "Channel object",
      snippet: "channel",
      match: "c"
    },
    {
      name: "chat",
      value: "chat",
      description: "Chat object",
      snippet: "chat",
      match: "c"
    },
    {
      name: "command",
      value: "command",
      description: "Bot command",
      snippet: "command",
      match: "c"
    },
    {
      name: "ctx",
      value: "ctx",
      description: "Context object (Telegraf)",
      snippet: "ctx",
      match: "c"
    }
  ],

  // TELEGRAM BOT METHODS
  methods: [
    {
      name: "getMe",
      value: "getMe()",
      description: "Get bot info",
      snippet: "getMe()"
    },
    {
      name: "sendMessage",
      value: "sendMessage(chatId, text, options)",
      description: "Send message",
      snippet: "sendMessage(${1:chatId}, \"${2:text}\", {\n  parse_mode: \"${3:HTML|Markdown}\",\n  reply_markup: ${4:keyboard},\n  disable_web_page_preview: ${5:true}\n})$0"
    },
    {
      name: "editMessageText",
      value: "editMessageText(chatId, messageId, text, options)",
      description: "Edit message text",
      snippet: "editMessageText(${1:chatId}, ${2:messageId}, \"${3:new text}\")$0"
    },
    {
      name: "deleteMessage",
      value: "deleteMessage(chatId, messageId)",
      description: "Delete message",
      snippet: "deleteMessage(${1:chatId}, ${2:messageId})$0"
    },
    {
      name: "answerCallbackQuery",
      value: "answerCallbackQuery(callbackQueryId, options)",
      description: "Answer callback query",
      snippet: "answerCallbackQuery(\"${1:callbackQueryId}\", {\n  text: \"${2:Notification text}\",\n  show_alert: ${3:false},\n  url: \"${4:url}\",\n  cache_time: ${5:0}\n})$0"
    },
    {
      name: "editMessageReplyMarkup",
      value: "editMessageReplyMarkup(chatId, messageId, replyMarkup)",
      description: "Edit message reply markup",
      snippet: "editMessageReplyMarkup(${1:chatId}, ${2:messageId}, ${3:replyMarkup})$0"
    }
  ],

  // KEYBOARD OBJECTS
  keyboards: [
    {
      name: "InlineKeyboardMarkup",
      value: "InlineKeyboardMarkup",
      description: "Inline keyboard with callback_data",
      snippet: "{\n  inline_keyboard: [\n    [\n      { text: \"${1:Button 1}\", callback_data: \"${2:data1}\" },\n      { text: \"${3:Button 2}\", callback_data: \"${4:data2}\" }\n    ]\n  ]\n}"
    },
    {
      name: "ReplyKeyboardMarkup",
      value: "ReplyKeyboardMarkup",
      description: "Reply keyboard markup",
      snippet: "{\n  keyboard: [\n    [{ text: \"${1:Button 1}\" }],\n    [{ text: \"${2:Button 2}\" }]\n  ],\n  resize_keyboard: true,\n  one_time_keyboard: ${3:false}\n}"
    },
    {
      name: "InlineKeyboardButton",
      value: "InlineKeyboardButton",
      description: "Single inline keyboard button",
      snippet: "{\n  text: \"${1:Button Text}\",\n  callback_data: \"${2:callback_data}\"\n}"
    }
  ],

  // TRIGGERS UNTUK AUTO-COMPLETE
  triggers: {
    "c": "cKeywords",
    "bot.": "methods",
    "ctx.": "methods",
    "reply_markup": "keyboards",
    "inline_keyboard": "keyboards",
    "keyboard": "keyboards",
    "callback": "cKeywords"
  }
};
