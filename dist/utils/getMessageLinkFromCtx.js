export var getMessageLink = function (ctx) {
    if (ctx.chat && ctx.message) {
        var messageId = ctx.message.message_id;
        var chatId = ctx.chat.id;
        if (ctx.chat.username) {
            return "https://t.me/".concat(ctx.chat.username, "/").concat(messageId);
        }
        else if (chatId.toString().startsWith("-100")) {
            var privateChatId = chatId.toString().replace("-100", "");
            return "https://t.me/c/".concat(privateChatId, "/").concat(messageId);
        }
    }
    return null;
};
