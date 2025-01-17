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
// Create a Wizard Scene
var paginationWizard = new Scenes.WizardScene("reqAIO", Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var session, request, searchCriteria, messageIdLink, searchResults, finalResult, batchedResults, firstBatch, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
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
                searchResults = (_a.sent()) || [];
                if (!((searchResults === null || searchResults === void 0 ? void 0 : searchResults.length) === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, ctx.scene.leave()];
            case 2:
                _a.sent();
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
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, ctx.scene.leave()];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, ctx.wizard.next()];
            case 8: return [4 /*yield*/, ctx.scene.leave()];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionData, result, requestBy, qualities, callbackData_1, aIOData, page, isValidToken, firstItem, botLink, userLink, error_2, page, data_1, quality, newResult, aIOData, error_3, error_4;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                sessionData = ctx.session;
                result = sessionData.result;
                requestBy = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString()) === sessionData.reqestBy;
                if (!!requestBy) return [3 /*break*/, 2];
                return [4 /*yield*/, ctx.answerCbQuery("It's not your request, search yourself!", {
                        show_alert: true,
                        cache_time: 5,
                    })];
            case 1:
                _f.sent();
                return [2 /*return*/];
            case 2:
                qualities = ["480p", "720p", "1080p", "540p", "all"];
                if (!("data" in ctx.callbackQuery && requestBy)) return [3 /*break*/, 35];
                callbackData_1 = (_b = ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.data;
                if (!(callbackData_1 === sessionData.sendAll)) return [3 /*break*/, 13];
                aIOData = sessionData.aioBatches;
                page = sessionData.page;
                _f.label = 3;
            case 3:
                _f.trys.push([3, 12, , 13]);
                return [4 /*yield*/, database.verifyAndValidateToken((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id.toString())];
            case 4:
                isValidToken = _f.sent();
                if (!!isValidToken) return [3 /*break*/, 9];
                return [4 /*yield*/, database.getFirstSortItem()];
            case 5:
                firstItem = _f.sent();
                if (!firstItem) return [3 /*break*/, 8];
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
                        }, 5 * 60 * 1000);
                    })];
            case 6:
                _f.sent();
                return [4 /*yield*/, telegram.app.telegram.sendMessage(ctx.from.id, "Hello ".concat((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.first_name, ", your token has expired. You can generate a new token once a day. After that, you can make unlimited requests within 24 hours."), {
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
            case 7:
                _f.sent();
                _f.label = 8;
            case 8: return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, telegram.forwardMessages(ctx.from.id, env.dbAIOChannelId, aIOData[page].map(function (item) { return item.messageIds; }), true, [], ctx)];
            case 10:
                _f.sent();
                _f.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                error_2 = _f.sent();
                console.error(error_2);
                return [3 /*break*/, 13];
            case 13:
                if (!(callbackData_1 === sessionData.next ||
                    callbackData_1 === sessionData.prev ||
                    qualities.some(function (quality) { return callbackData_1 === null || callbackData_1 === void 0 ? void 0 : callbackData_1.startsWith(quality); }))) return [3 /*break*/, 32];
                page = sessionData.page;
                data_1 = (_e = ctx.callbackQuery) === null || _e === void 0 ? void 0 : _e.data;
                if (!data_1) return [3 /*break*/, 16];
                quality = qualities.find(function (q) { return data_1.startsWith(q); });
                if (!quality) return [3 /*break*/, 16];
                newResult = batchResultsAndFilter(result, quality);
                sessionData.aioBatches = newResult;
                if (!(result.length === 0)) return [3 /*break*/, 15];
                return [4 /*yield*/, sendCallbackQueryResponse(ctx, "Not found")];
            case 14:
                _f.sent();
                _f.label = 15;
            case 15:
                page = 1;
                _f.label = 16;
            case 16:
                aIOData = sessionData.aioBatches;
                if (!aIOData) return [3 /*break*/, 29];
                if (!callbackData_1.startsWith("next")) return [3 /*break*/, 24];
                _f.label = 17;
            case 17:
                _f.trys.push([17, 22, , 23]);
                if (!(page + 1 < aIOData.length)) return [3 /*break*/, 19];
                sessionData.page = page + 1;
                return [4 /*yield*/, editResultsReply(ctx, sessionData.reqest || "user request", aIOData[page + 1], sessionData, aIOData.length, page + 1)];
            case 18:
                _f.sent();
                return [3 /*break*/, 21];
            case 19: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "This is the last, no more left!")];
            case 20:
                _f.sent();
                _f.label = 21;
            case 21: return [3 /*break*/, 23];
            case 22:
                error_3 = _f.sent();
                console.error(error_3);
                return [3 /*break*/, 23];
            case 23: return [3 /*break*/, 28];
            case 24:
                if (!(callbackData_1.startsWith("prev") ||
                    qualities.some(function (quality) { return callbackData_1 === null || callbackData_1 === void 0 ? void 0 : callbackData_1.startsWith(quality); }))) return [3 /*break*/, 28];
                sessionData.page = Math.max(page - 1, 0);
                _f.label = 25;
            case 25:
                _f.trys.push([25, 27, , 28]);
                return [4 /*yield*/, editResultsReply(ctx, sessionData.reqest || "user request", aIOData[page - 1], sessionData, aIOData.length, page - 1)];
            case 26:
                _f.sent();
                return [3 /*break*/, 28];
            case 27:
                error_4 = _f.sent();
                console.error(error_4);
                return [3 /*break*/, 28];
            case 28: return [3 /*break*/, 31];
            case 29: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "No more data available!")];
            case 30:
                _f.sent();
                _f.label = 31;
            case 31: return [3 /*break*/, 34];
            case 32: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "You need to search again!")];
            case 33:
                _f.sent();
                _f.label = 34;
            case 34: return [3 /*break*/, 37];
            case 35: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "It's not your request, request yourself!")];
            case 36:
                _f.sent();
                _f.label = 37;
            case 37: return [2 /*return*/];
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
