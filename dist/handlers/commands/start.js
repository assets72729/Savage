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
import database, { reqDB } from "../../services/database.js";
import env from "../../services/env.js";
import telegram from "../../services/telegram.js";
import { sendInviterWelcomeMessage, sendRateLimitMessage, sendTokenExpiredMessage, sendWelcomeMessage, } from "../../utils/helper.js";
// Main handler function for the /start command
export default function startHandler(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var chatId, user, userId, payload, shareId, haveBotPremium, tokenNumber, firstSortItem, activeShareId, token, isValidToken_1, firstItem, inviteParts, inviterId, newUserId, isUserExist, parts, _a, e_1, chatsUserHasNotJoined, e_2, isValidToken, firstItem, messageIds, channel, isRequestExceeded, result, e_3, e_4, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    chatId = ctx.chat.id;
                    user = ctx.from;
                    userId = user.id;
                    payload = ctx.message.text.split(" ")[1];
                    shareId = undefined;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 44, , 45]);
                    return [4 /*yield*/, database
                            .checkBotPremiumStatus(userId.toString())
                            .catch(function (error) { return console.error(error); })];
                case 2:
                    haveBotPremium = _b.sent();
                    if (!payload) return [3 /*break*/, 17];
                    if (!payload.includes("token-")) return [3 /*break*/, 11];
                    tokenNumber = payload.replace("token-", "");
                    return [4 /*yield*/, database.getFirstSortItem()];
                case 3:
                    firstSortItem = _b.sent();
                    if (!firstSortItem) return [3 /*break*/, 10];
                    activeShareId = firstSortItem.currentActivePath;
                    if (!(tokenNumber === activeShareId)) return [3 /*break*/, 6];
                    return [4 /*yield*/, database.manageToken(userId.toString())];
                case 4:
                    token = (_b.sent()).token;
                    return [4 /*yield*/, ctx.reply("Your new token has been generated: ".concat(token.slice(0, 15), " ...\nNow, click the \"Try Again\" button \uD83D\uDC46\uD83D\uDC46!"))];
                case 5: return [2 /*return*/, _b.sent()];
                case 6: return [4 /*yield*/, database.verifyAndValidateToken(userId.toString())];
                case 7:
                    isValidToken_1 = _b.sent();
                    if (!!isValidToken_1) return [3 /*break*/, 10];
                    return [4 /*yield*/, database.getFirstSortItem()];
                case 8:
                    firstItem = _b.sent();
                    if (!(firstItem && !haveBotPremium)) return [3 /*break*/, 10];
                    return [4 /*yield*/, sendTokenExpiredMessage(ctx, user, firstItem.sort[0].aioShortUrl, payload).catch(function (error) { return console.error(error); })];
                case 9: return [2 /*return*/, _b.sent()];
                case 10: return [3 /*break*/, 17];
                case 11:
                    if (!payload.includes("invite")) return [3 /*break*/, 16];
                    inviteParts = payload.split("-");
                    inviterId = inviteParts[1];
                    newUserId = userId.toString();
                    if (!(newUserId && inviterId && newUserId !== inviterId)) return [3 /*break*/, 15];
                    return [4 /*yield*/, database.isUserExist(newUserId)];
                case 12:
                    isUserExist = _b.sent();
                    if (!!isUserExist) return [3 /*break*/, 15];
                    return [4 /*yield*/, addInviteUser(inviterId, newUserId, user.username || "null")];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, sendInviterWelcomeMessage(ctx, inviterId)];
                case 14: return [2 /*return*/, _b.sent()];
                case 15: return [3 /*break*/, 17];
                case 16:
                    parts = payload.split("-");
                    if (parts.length > 0) {
                        shareId = Number(parts[0]);
                    }
                    _b.label = 17;
                case 17:
                    _b.trys.push([17, 19, , 20]);
                    return [4 /*yield*/, database.saveUser(user)];
                case 18:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 19:
                    _a = _b.sent();
                    return [3 /*break*/, 20];
                case 20:
                    if (!!shareId) return [3 /*break*/, 24];
                    _b.label = 21;
                case 21:
                    _b.trys.push([21, 23, , 24]);
                    return [4 /*yield*/, sendWelcomeMessage(ctx, user)];
                case 22: return [2 /*return*/, _b.sent()];
                case 23:
                    e_1 = _b.sent();
                    return [2 /*return*/];
                case 24:
                    _b.trys.push([24, 26, , 27]);
                    return [4 /*yield*/, telegram.getChatsUserHasNotJoined(userId)];
                case 25:
                    chatsUserHasNotJoined = _b.sent();
                    if (chatsUserHasNotJoined.length) {
                        return [2 /*return*/, telegram.sendForceJoinMessage(shareId, chatId, user, chatsUserHasNotJoined)];
                    }
                    return [3 /*break*/, 27];
                case 26:
                    e_2 = _b.sent();
                    console.log(e_2);
                    return [2 /*return*/];
                case 27: return [4 /*yield*/, database.verifyAndValidateToken(userId.toString())];
                case 28:
                    isValidToken = _b.sent();
                    if (!!isValidToken) return [3 /*break*/, 31];
                    return [4 /*yield*/, database.getFirstSortItem()];
                case 29:
                    firstItem = _b.sent();
                    if (!(firstItem && !haveBotPremium)) return [3 /*break*/, 31];
                    return [4 /*yield*/, sendTokenExpiredMessage(ctx, user, firstItem.sort[0].aioShortUrl, payload).catch(function (error) { return console.error(error); })];
                case 30: return [2 /*return*/, _b.sent()];
                case 31:
                    messageIds = void 0;
                    channel = void 0;
                    return [4 /*yield*/, reqDB.hasReachedRequestLimit(userId.toString())];
                case 32:
                    isRequestExceeded = _b.sent();
                    if (!(!isRequestExceeded || env.adminIds.includes(userId) || haveBotPremium)) return [3 /*break*/, 40];
                    _b.label = 33;
                case 33:
                    _b.trys.push([33, 38, , 39]);
                    if (!payload.includes("aio")) return [3 /*break*/, 35];
                    return [4 /*yield*/, database.getAIOMessages(Number(shareId))];
                case 34:
                    result = _b.sent();
                    channel = (result === null || result === void 0 ? void 0 : result.channel) ? Number(result.channel) : undefined;
                    if (result) {
                        messageIds = result.messageIds;
                    }
                    _b.label = 35;
                case 35:
                    if (!messageIds) {
                        return [2 /*return*/, ctx.reply("Message not found, try another link", {
                                reply_to_message_id: ctx.message.message_id,
                            })];
                    }
                    if (!channel) {
                        throw Error("There must be DB_CHANNEL_ID and DB_MOVIE_CHANNEL_ID");
                    }
                    return [4 /*yield*/, telegram.forwardMessages(chatId, channel, [messageIds], true)];
                case 36:
                    _b.sent();
                    return [4 /*yield*/, reqDB.saveRequestData(userId.toString())];
                case 37:
                    _b.sent();
                    return [3 /*break*/, 39];
                case 38:
                    e_3 = _b.sent();
                    console.log(e_3);
                    return [3 /*break*/, 39];
                case 39: return [3 /*break*/, 43];
                case 40:
                    _b.trys.push([40, 42, , 43]);
                    return [4 /*yield*/, sendRateLimitMessage(ctx, user)];
                case 41: return [2 /*return*/, _b.sent()];
                case 42:
                    e_4 = _b.sent();
                    console.log(e_4);
                    return [2 /*return*/];
                case 43: return [3 /*break*/, 45];
                case 44:
                    error_1 = _b.sent();
                    return [3 /*break*/, 45];
                case 45: return [2 /*return*/];
            }
        });
    });
}
// Helper Function to Add Invited User
var addInviteUser = function (inviterId, newUserId, username) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.addInvite(inviterId, newUserId, username)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
