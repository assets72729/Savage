var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import auth from "../../services/auth.js";
import database, { reqDB } from "../../services/database.js";
import env from "../../services/env.js";
import telegram from "../../services/telegram.js";
export default function startHandler(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var chatId, user, userId, payload, shareId, parts, _a, chatsUserHasNotJoined, e_1, messageIds, channel, result, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    chatId = ctx.chat.id;
                    user = ctx.from;
                    userId = user.id;
                    payload = ctx.message.text.split(" ")[1];
                    shareId = undefined;
                    if (payload) {
                        parts = payload.split("-");
                        if (parts.length > 0) {
                            shareId = Number(parts[0]);
                        }
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, database.saveUser(user)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 4:
                    if (!shareId) {
                        try {
                            return [2 /*return*/, ctx.reply("Hello ".concat(user.first_name, "!\n Use :\n/m movie name : for movies \n"), {
                                    reply_to_message_id: ctx.message.message_id,
                                    parse_mode: "HTML",
                                    reply_markup: {
                                        inline_keyboard: [[{ text: "❣️❣️ Join ❣️❣️", url: "https://t.me/".concat(env.join) }]],
                                    },
                                })];
                        }
                        catch (e) {
                            return [2 /*return*/];
                        }
                    }
                    if (!!auth.isAdmin(userId)) return [3 /*break*/, 8];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, telegram.getChatsUserHasNotJoined(userId)];
                case 6:
                    chatsUserHasNotJoined = _b.sent();
                    if (chatsUserHasNotJoined.length) {
                        return [2 /*return*/, telegram.sendForceJoinMessage(shareId, chatId, user, chatsUserHasNotJoined)];
                    }
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _b.sent();
                    console.log(e_1);
                    return [2 /*return*/];
                case 8: return [4 /*yield*/, reqDB.hasReachedRequestLimit(userId.toString())];
                case 9:
                    if (!(!(_b.sent()) || env.adminIds.includes(userId))) return [3 /*break*/, 17];
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 15, , 16]);
                    if (!payload.includes("aio")) return [3 /*break*/, 12];
                    console.log(shareId);
                    return [4 /*yield*/, database.getAIOMessages(Number(shareId))];
                case 11:
                    result = _b.sent();
                    channel = env.dbAIOChannelId;
                    if (result) {
                        messageIds = result;
                    }
                    _b.label = 12;
                case 12:
                    if (!messageIds) {
                        return [2 /*return*/, ctx.reply("Message not found, try another link", {
                                reply_to_message_id: ctx.message.message_id,
                            })];
                    }
                    if (!channel) {
                        throw Error("There must be DB_CHANNEL_ID and DB_MOVIE_CHANNEL_ID");
                    }
                    return [4 /*yield*/, telegram.forwardMessages(chatId, channel, [messageIds], true)];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, reqDB.saveRequestData(userId.toString())];
                case 14:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 15:
                    e_2 = _b.sent();
                    console.log(e_2);
                    return [3 /*break*/, 16];
                case 16: return [3 /*break*/, 18];
                case 17:
                    try {
                        return [2 /*return*/, ctx.reply("Hello ".concat(user.first_name, "!\nIn 6 hour you can only 3 requests please wait for sometime to request again \n"), {
                                reply_to_message_id: ctx.message.message_id,
                                parse_mode: "HTML",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "❣️❣️Join KDL Official ❣️❣️", url: "https://t.me/".concat(env.join) }],
                                    ],
                                },
                            })];
                    }
                    catch (e) {
                        console.log(e);
                        return [2 /*return*/];
                    }
                    _b.label = 18;
                case 18: return [2 /*return*/];
            }
        });
    });
}
