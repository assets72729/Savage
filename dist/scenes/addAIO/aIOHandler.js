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
import { processCaption } from "../../utils/caption/editCaption.js";
import { delay } from "../../extra/delay.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
import { addToWebsite } from "../../services/toWebsite.js";
// Main function to start copying
function startCopying(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var text, caption, msgId;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message)) return [3 /*break*/, 8];
                    text = ctx.message.text.toLowerCase();
                    if (!(text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled, start again /add")];
                case 1:
                    _c.sent();
                    ctx.session.done = false;
                    ctx.session.queue = [];
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _c.sent()];
                case 3:
                    if (!(text === "/add")) return [3 /*break*/, 5];
                    return [4 /*yield*/, ctx.reply("Send Files")];
                case 4: return [2 /*return*/, _c.sent()];
                case 5:
                    if (!(text === "done")) return [3 /*break*/, 8];
                    ctx.session.done = true;
                    return [4 /*yield*/, processQueue(ctx)];
                case 6:
                    _c.sent();
                    ctx.session.queue = [];
                    return [4 /*yield*/, ctx.scene.leave()];
                case 7: return [2 /*return*/, _c.sent()];
                case 8: return [4 /*yield*/, ctx
                        .reply("Send next file. If Done, Click Done ".concat((_a = ctx.session.msgId) === null || _a === void 0 ? void 0 : _a.length), keyboard.oneTimeDoneKeyboard())
                        .catch(function (error) { return console.error("Error sending message:", error); })];
                case 9:
                    _c.sent();
                    caption = "no";
                    msgId = ctx.message.message_id;
                    if ("document" in ctx.message && ctx.message.document.file_name) {
                        caption = ctx.message.document.file_name;
                    }
                    else if ("caption" in ctx.message) {
                        caption = ctx.message.caption || "no";
                        console.log("caption", caption);
                    }
                    if (caption !== "no") {
                        ctx.session.queue = ctx.session.queue || [];
                        (_b = ctx.session.queue) === null || _b === void 0 ? void 0 : _b.push({ caption: caption, msgId: msgId });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export { startCopying };
// Handle AIO processing for each file
function handleAIOProcessing(ctx, caption, msgId) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var processedCaption, AIODetails, forwardedMessageIds, AIOData, shareId, botUsername, link, user, error_1, error_2, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    processedCaption = processCaption(caption, env.join) || "";
                    AIODetails = {
                        caption: processedCaption,
                        backupChannel: "none",
                        messageIds: msgId,
                        aIOPosterID: "none",
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 15, , 17]);
                    return [4 /*yield*/, telegram.forwardMessages(env.dbAIOChannelId, (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id, [msgId], false, [caption])];
                case 2:
                    forwardedMessageIds = _b.sent();
                    return [4 /*yield*/, getAIOdata(AIODetails, forwardedMessageIds[0])];
                case 3:
                    AIOData = _b.sent();
                    if (!AIOData)
                        throw new Error("AIO Data is null");
                    return [4 /*yield*/, database.saveAIO(AIOData)];
                case 4:
                    shareId = _b.sent();
                    if (!shareId)
                        throw new Error("Failed to save AIO data");
                    botUsername = ctx.botInfo.username;
                    link = "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-aio");
                    return [4 /*yield*/, ctx.reply("".concat(caption, " , ").concat(link))];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, sendToCOllection(env.collectionAIO, link, processedCaption)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 9, , 10]);
                    user = {
                        id: ctx.from.id,
                        firstname: ctx.from.first_name,
                        username: ctx.from.username,
                    };
                    return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("".concat(processedCaption.slice(0, 30), " added by..."), user))];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _b.sent();
                    console.error("Error logging to group:", error_1);
                    return [3 /*break*/, 10];
                case 10:
                    _b.trys.push([10, 13, , 14]);
                    return [4 /*yield*/, addToWebsite(AIOData)];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, delay(200, 300)];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 13:
                    error_2 = _b.sent();
                    console.error("Error sending to website:", error_2);
                    return [3 /*break*/, 14];
                case 14: return [3 /*break*/, 17];
                case 15:
                    error_3 = _b.sent();
                    console.error("Error processing AIO:", error_3);
                    return [4 /*yield*/, ctx.scene.leave()];
                case 16:
                    _b.sent();
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
}
function processQueue(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var sessionData, queue, _i, queue_1, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sessionData = ctx.session;
                    queue = sessionData.queue;
                    if (!(!queue || queue.length === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("No files to process.")];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    queue.sort(function (a, b) { return a.msgId - b.msgId; });
                    _i = 0, queue_1 = queue;
                    _a.label = 3;
                case 3:
                    if (!(_i < queue_1.length)) return [3 /*break*/, 7];
                    item = queue_1[_i];
                    return [4 /*yield*/, handleAIOProcessing(ctx, item.caption, item.msgId)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, delay(1000, 2000)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7:
                    sessionData.queue = [];
                    return [4 /*yield*/, ctx.reply("All files processed!")];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
