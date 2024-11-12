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
import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import telegram from "../../services/telegram.js";
import database from "../../services/database.js";
import getAIOdata from "./aIODocument.js";
import { sendToCOllection, sendToLogGroup } from "../../utils/sendToCollection.js";
import env from "../../services/env.js";
import getRandomId from "../../extra/getRandomId.js";
import { processCaption } from "../../utils/caption/editCaption.js";
import { delay } from "../../extra/delay.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
function startCopying(ctx) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var caption, msgId, AIODetails, forwardedMessageIds, AIOData, shareId, _d, botUsername, link, user, _e, error_1, AIODetails, forwardedMessageIds, AIOData, shareId, _f, botUsername, link, user, _g, error_2;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!(ctx.message &&
                        "text" in ctx.message &&
                        (ctx.message.text.toLowerCase() === "done" || ctx.message.text === "/cancel"))) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /add")];
                case 1:
                    _h.sent();
                    ctx.session.done = false;
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _h.sent()];
                case 3:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/add")) return [3 /*break*/, 5];
                    return [4 /*yield*/, ctx.reply("send Files")];
                case 4:
                    _h.sent();
                    return [3 /*break*/, 39];
                case 5: return [4 /*yield*/, ctx.reply("Send next file if Done Click Done ".concat((_a = ctx.session.msgId) === null || _a === void 0 ? void 0 : _a.length), keyboard.oneTimeDoneKeyboard())];
                case 6:
                    _h.sent();
                    caption = getRandomId().toString();
                    msgId = ctx.message.message_id;
                    if (!("document" in ctx.message && ctx.message.document.file_name)) return [3 /*break*/, 23];
                    caption = ctx.message.document.file_name;
                    AIODetails = {
                        caption: processCaption(caption, env.join) || "",
                        backupChannel: "none",
                        messageIds: msgId,
                        aIOPosterID: "none",
                    };
                    _h.label = 7;
                case 7:
                    _h.trys.push([7, 20, , 22]);
                    return [4 /*yield*/, telegram.forwardMessages(env.dbAIOChannelId, (_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id, [msgId], false, [caption])];
                case 8:
                    forwardedMessageIds = _h.sent();
                    return [4 /*yield*/, getAIOdata(AIODetails, forwardedMessageIds[0])];
                case 9:
                    AIOData = _h.sent();
                    if (!AIOData) return [3 /*break*/, 11];
                    return [4 /*yield*/, database.saveAIO(AIOData)];
                case 10:
                    _d = _h.sent();
                    return [3 /*break*/, 12];
                case 11:
                    _d = null;
                    _h.label = 12;
                case 12:
                    shareId = _d;
                    botUsername = ctx.botInfo.username;
                    link = shareId ? "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-aio") : null;
                    if (!AIOData || !shareId || !link) {
                        throw new Error("Failed to process the request ");
                    }
                    return [4 /*yield*/, ctx.reply(link)];
                case 13:
                    _h.sent();
                    return [4 /*yield*/, delay(500, 1000)];
                case 14:
                    _h.sent();
                    return [4 /*yield*/, sendToCOllection(env.collectionAIO, link, processCaption(caption || "none", env.join))];
                case 15:
                    _h.sent();
                    _h.label = 16;
                case 16:
                    _h.trys.push([16, 18, , 19]);
                    user = {
                        id: ctx.from.id,
                        firstname: ctx.from.first_name,
                        username: ctx.from.username,
                    };
                    return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("".concat(AIODetails.caption.slice(0, 30), " added by..."), user))];
                case 17:
                    _h.sent();
                    return [3 /*break*/, 19];
                case 18:
                    _e = _h.sent();
                    return [3 /*break*/, 19];
                case 19: return [3 /*break*/, 22];
                case 20:
                    error_1 = _h.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 21: return [2 /*return*/, _h.sent()];
                case 22: return [3 /*break*/, 39];
                case 23:
                    if (!("caption" in ctx.message)) return [3 /*break*/, 39];
                    caption = ctx.message.caption || "no";
                    if (!(caption !== "no" && caption !== undefined)) return [3 /*break*/, 39];
                    AIODetails = {
                        caption: processCaption(caption, env.join) || "",
                        backupChannel: "none",
                        messageIds: msgId,
                        aIOPosterID: "none",
                    };
                    _h.label = 24;
                case 24:
                    _h.trys.push([24, 37, , 39]);
                    return [4 /*yield*/, telegram.forwardMessages(env.dbAIOChannelId, (_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id, [msgId], false, [caption])];
                case 25:
                    forwardedMessageIds = _h.sent();
                    return [4 /*yield*/, getAIOdata(AIODetails, forwardedMessageIds[0])];
                case 26:
                    AIOData = _h.sent();
                    if (!AIOData) return [3 /*break*/, 28];
                    return [4 /*yield*/, database.saveAIO(AIOData)];
                case 27:
                    _f = _h.sent();
                    return [3 /*break*/, 29];
                case 28:
                    _f = null;
                    _h.label = 29;
                case 29:
                    shareId = _f;
                    botUsername = ctx.botInfo.username;
                    link = shareId ? "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-aio") : null;
                    if (!AIOData || !shareId || !link) {
                        throw new Error("Failed to process the request ");
                    }
                    return [4 /*yield*/, ctx.reply(link)];
                case 30:
                    _h.sent();
                    return [4 /*yield*/, delay(500, 1000)];
                case 31:
                    _h.sent();
                    return [4 /*yield*/, sendToCOllection(env.collectionAIO, link, processCaption(caption || "none", env.join))];
                case 32:
                    _h.sent();
                    _h.label = 33;
                case 33:
                    _h.trys.push([33, 35, , 36]);
                    user = {
                        id: ctx.from.id,
                        firstname: ctx.from.first_name,
                        username: ctx.from.username,
                    };
                    return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("".concat(AIODetails.caption.slice(0, 30), " added by..."), user))];
                case 34:
                    _h.sent();
                    return [3 /*break*/, 36];
                case 35:
                    _g = _h.sent();
                    return [3 /*break*/, 36];
                case 36: return [3 /*break*/, 39];
                case 37:
                    error_2 = _h.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 38: return [2 /*return*/, _h.sent()];
                case 39: return [2 /*return*/];
            }
        });
    });
}
export { startCopying };
