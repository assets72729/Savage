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
import { Scenes, Composer } from "telegraf";
import database from "../../services/database.js";
import env from "../../services/env.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import { cleanString } from "../../utils/cleanReq.js";
import { sortEpisodesByCaption } from "./sortdata.js";
import telegram from "../../services/telegram.js";
import { getMessageLink } from "../../utils/getMessageLinkFromCtx.js";
import handleResultsReply, { editResultsReply, updateSession } from "./reqHandler.js";
import memory from "../../extra/isInProcess.js";
// Create a Wizard Scene
var paginationWizard = new Scenes.WizardScene("reqAIO", Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var session, request, searchCriteria, messageIdLink, searchResults, finalResult, batchedResults, firstBatch, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 11, , 12]);
                if (memory.isObjectInProcess((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id)) {
                    memory.completeProcess((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id);
                }
                if (!("text" in ctx.message)) return [3 /*break*/, 8];
                session = ctx.session;
                request = ctx.message.text.replace("/m", "").trim();
                if (!(request.length > 2)) return [3 /*break*/, 7];
                searchCriteria = {
                    caption: cleanString(request.toLowerCase()),
                };
                messageIdLink = getMessageLink(ctx);
                return [4 /*yield*/, database.searchAIO(searchCriteria, messageIdLink)];
            case 1:
                searchResults = (_c.sent()) || [];
                if (!((searchResults === null || searchResults === void 0 ? void 0 : searchResults.length) === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, ctx.scene.leave()];
            case 2:
                _c.sent();
                return [2 /*return*/];
            case 3:
                finalResult = sortEpisodesByCaption(searchResults);
                updateSession(session, ctx, finalResult, request);
                batchedResults = batchResults(finalResult);
                session.aioBatches = batchedResults;
                firstBatch = batchedResults === null || batchedResults === void 0 ? void 0 : batchedResults[0];
                if (!(finalResult.length > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, handleResultsReply(ctx, request, firstBatch, session, batchedResults.length)];
            case 4:
                _c.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, ctx.scene.leave()];
            case 6:
                _c.sent();
                _c.label = 7;
            case 7: return [2 /*return*/, ctx.wizard.next()];
            case 8: return [4 /*yield*/, ctx.scene.leave()];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_1 = _c.sent();
                console.error(error_1);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionData, result, requestBy, qualities, callbackData_1, aIOData, page, isValidToken, firstItem, botLink, userLink, error_2, page, data_1, quality, newResult, aIOData;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                sessionData = ctx.session;
                result = sessionData.result;
                requestBy = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString()) === sessionData.reqestBy;
                if (!requestBy) {
                    ctx.answerCbQuery("It's not your request, request yourself!");
                    return [2 /*return*/];
                }
                qualities = ["480p", "720p", "1080p", "540p", "all"];
                if (!("data" in ctx.callbackQuery && requestBy)) return [3 /*break*/, 18];
                callbackData_1 = (_b = ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.data;
                console.log("callbackData:", callbackData_1);
                if (!(callbackData_1 === sessionData.sendAll)) return [3 /*break*/, 9];
                aIOData = sessionData.aioBatches;
                page = (_c = sessionData.page) !== null && _c !== void 0 ? _c : 0;
                _m.label = 1;
            case 1:
                _m.trys.push([1, 8, , 9]);
                return [4 /*yield*/, database.verifyAndValidateToken((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id.toString())];
            case 2:
                isValidToken = _m.sent();
                if (!!isValidToken) return [3 /*break*/, 7];
                return [4 /*yield*/, database.getFirstSortItem()];
            case 3:
                firstItem = _m.sent();
                if (!(firstItem && firstItem.sort && firstItem.sort.length > 0)) return [3 /*break*/, 6];
                botLink = "https://t.me/".concat(env.botUserName);
                userLink = "https://t.me/".concat(ctx.from.username || "tg://user?id=".concat(ctx.from.id));
                return [4 /*yield*/, ctx
                        .reply("Hello [".concat(ctx.from.first_name, "](").concat(userLink, ") \nYour Token Has Expired: [Generate New Token Once in 24 hours](").concat(botLink, ")"), {
                        parse_mode: "Markdown",
                        disable_web_page_preview: true,
                    })
                        .then(function (sentMessage) {
                        setTimeout(function () {
                            ctx.deleteMessage(sentMessage.message_id);
                        }, 60 * 1000);
                    })];
            case 4:
                _m.sent();
                return [4 /*yield*/, telegram.app.telegram.sendMessage(ctx.from.id, "Hello ".concat((_e = ctx.from) === null || _e === void 0 ? void 0 : _e.first_name, ", your token has expired. You can generate a new token once a day. After that, you can make unlimited requests within 24 hours."), {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: "Click Me To Generate New Token",
                                        url: firstItem.sort[0].aioShortUrl,
                                    },
                                ],
                            ],
                        },
                        parse_mode: "Markdown",
                    })];
            case 5:
                _m.sent();
                return [2 /*return*/];
            case 6:
                telegram.forwardMessages(ctx.from.id, env.dbAIOChannelId, aIOData[page].map(function (item) { return item.messageIds; }), true, [], ctx);
                return [2 /*return*/];
            case 7: return [2 /*return*/];
            case 8:
                error_2 = _m.sent();
                console.error(error_2);
                return [3 /*break*/, 9];
            case 9:
                sessionData.page = (_f = sessionData.page) !== null && _f !== void 0 ? _f : 0;
                if (!(callbackData_1 === sessionData.next ||
                    callbackData_1 === sessionData.prev ||
                    qualities.some(function (quality) { return callbackData_1 === null || callbackData_1 === void 0 ? void 0 : callbackData_1.startsWith(quality); }))) return [3 /*break*/, 18];
                page = sessionData.page;
                data_1 = (_g = ctx.callbackQuery) === null || _g === void 0 ? void 0 : _g.data;
                if (data_1) {
                    quality = qualities.find(function (q) { return data_1.startsWith(q); });
                    if (quality) {
                        newResult = batchResultsAndFilter(result, quality);
                        if (newResult.length === 0) {
                            sendCallbackQueryResponse(ctx, "Not found");
                            return [2 /*return*/];
                        }
                        sessionData.aioBatches = newResult;
                        sessionData.page = 0;
                    }
                }
                aIOData = sessionData.aioBatches;
                if (!aIOData) return [3 /*break*/, 17];
                if (!(callbackData_1.startsWith("next") ||
                    qualities.some(function (quality) { return callbackData_1 === null || callbackData_1 === void 0 ? void 0 : callbackData_1.startsWith(quality); }))) return [3 /*break*/, 13];
                console.log(sessionData.page);
                if (!(((_h = sessionData.page) !== null && _h !== void 0 ? _h : 0) + 1 <= aIOData.length)) return [3 /*break*/, 11];
                return [4 /*yield*/, editResultsReply(ctx, sessionData.reqest || "user request", aIOData[sessionData.page], sessionData, aIOData.length, sessionData.page)];
            case 10:
                _m.sent();
                sessionData.page = ((_j = sessionData.page) !== null && _j !== void 0 ? _j : 0) + 1;
                return [3 /*break*/, 12];
            case 11:
                sendCallbackQueryResponse(ctx, "This is the last, no more left!");
                _m.label = 12;
            case 12: return [2 /*return*/];
            case 13:
                if (!(callbackData_1.startsWith("prev") ||
                    qualities.some(function (quality) { return callbackData_1 === null || callbackData_1 === void 0 ? void 0 : callbackData_1.startsWith(quality); }))) return [3 /*break*/, 16];
                if (!(((_k = sessionData.page) !== null && _k !== void 0 ? _k : 0) > 0)) return [3 /*break*/, 15];
                return [4 /*yield*/, editResultsReply(ctx, sessionData.reqest || "user request", aIOData[sessionData.page], sessionData, aIOData.length, sessionData.page)];
            case 14:
                _m.sent();
                sessionData.page = ((_l = sessionData.page) !== null && _l !== void 0 ? _l : 0) - 1;
                _m.label = 15;
            case 15: return [2 /*return*/];
            case 16: return [3 /*break*/, 18];
            case 17:
                sendCallbackQueryResponse(ctx, "No more data available!");
                _m.label = 18;
            case 18: return [2 /*return*/];
        }
    });
}); }));
export default paginationWizard;
function batchResults(results) {
    var batchSize = 10;
    var batches = [];
    var extractedData = results.map(function (item) { return ({
        caption: item.caption,
        shareId: item.shareId.toString(),
        messageIds: item.messageIds,
        aioShortUrl: "",
    }); });
    for (var i = 0; i < extractedData.length; i += batchSize) {
        var batch = extractedData.slice(i, i + batchSize);
        batches.push(batch);
    }
    return batches;
}
function batchResultsAndFilter(results, quality) {
    var batchSize = 10;
    var batches = [];
    var filteredResults = [];
    if (quality.toLowerCase() === "all") {
        filteredResults = results;
    }
    else {
        filteredResults = results.filter(function (item) { return item.caption.includes(quality); });
    }
    var extractedData = filteredResults.map(function (item) { return ({
        caption: item.caption,
        shareId: item.shareId.toString(),
        messageIds: item.messageIds,
    }); });
    for (var i = 0; i < extractedData.length; i += batchSize) {
        var batch = extractedData.slice(i, i + batchSize);
        batches.push(batch);
    }
    return batches;
}
