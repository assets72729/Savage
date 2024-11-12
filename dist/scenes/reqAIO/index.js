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
import { makeAIOCaption } from "../../utils/caption/makeCaption.js";
import getRandomId from "../../extra/getRandomId.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import { makeButtons } from "../../utils/markupButton/permanantButton/keyboard.js";
import { cleanString } from "./cleanReq.js";
import { sortEpisodesByCaption } from "./sortdata.js";
import telegram from "../../services/telegram.js";
// Create a Wizard Scene
var paginationWizard = new Scenes.WizardScene("reqAIO", Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var request, searchCriteria, finalResult, _a, random, batchedResults, firstBatch, _b;
    var _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!("text" in ctx.message)) return [3 /*break*/, 11];
                ctx.session.page = 0;
                request = ctx.message.text.replace("/m", "").trim();
                if (!(request.length > 2)) return [3 /*break*/, 9];
                searchCriteria = {
                    caption: cleanString(request.toLowerCase()),
                };
                _f.label = 1;
            case 1:
                _f.trys.push([1, 7, , 8]);
                _a = sortEpisodesByCaption;
                return [4 /*yield*/, database.searchAIO(searchCriteria)];
            case 2:
                finalResult = _a.apply(void 0, [(_f.sent()) || []]);
                ctx.session.result = finalResult;
                random = getRandomId();
                ctx.session.prev = "prev".concat(random);
                ctx.session.next = "next".concat(random);
                ctx.session.sendAll = "sendall".concat(random);
                ctx.session.reqestBy = "".concat((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id);
                batchedResults = batchResults(finalResult);
                ctx.session.aioBatches = batchedResults;
                firstBatch = (_e = (_d = ctx.session) === null || _d === void 0 ? void 0 : _d.aioBatches) === null || _e === void 0 ? void 0 : _e[0];
                if (!(finalResult.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, ctx
                        .reply("```\n".concat(request, "\n```"), {
                        reply_markup: makeButtons(firstBatch || [], ctx.session.next || "", ctx.session.prev || "", ctx.session.sendAll || "", "eng", batchedResults.length, 0),
                        parse_mode: "MarkdownV2",
                        reply_to_message_id: ctx.message.message_id,
                    })
                        .then(function (sentMessage) {
                        try {
                            var messageIdToDelete_1 = sentMessage.message_id;
                            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, ctx.deleteMessage(messageIdToDelete_1)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 5 * 60 * 1000);
                        }
                        catch (error) {
                            console.error(error);
                        }
                    })
                        .catch(function (error) {
                        console.error(error);
                    })];
            case 3:
                _f.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, ctx.scene.leave()];
            case 5:
                _f.sent();
                _f.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                _b = _f.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/, ctx.wizard.next()];
            case 9: return [4 /*yield*/, ctx.scene.leave()];
            case 10:
                _f.sent();
                _f.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var result, reqestBy, qualities, callbackData_1, aIOData, page, error_1, page, requestBy, newresult, newresult, newresult, newresult, aIOData, error_2, error_3;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                result = ctx.session.result;
                reqestBy = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString()) === ctx.session.reqestBy;
                qualities = ["480p", "720p", "1080p", "540p"];
                if (!("data" in ctx.callbackQuery && reqestBy)) return [3 /*break*/, 38];
                callbackData_1 = (_b = ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.data;
                if (!("data" in ctx.callbackQuery &&
                    ctx.session.sendAll === ctx.callbackQuery.data)) return [3 /*break*/, 5];
                aIOData = ctx.session.aioBatches;
                page = ctx.session.page;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, telegram.forwardMessages(ctx.from.id, env.dbAIOChannelId, aIOData[page].map(function (item) { return item.messageIds; }), true, [], ctx)];
            case 2:
                _d.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 7];
            case 5:
                if (!("data" in ctx.callbackQuery && ctx.callbackQuery.data.startsWith("sendall"))) return [3 /*break*/, 7];
                return [4 /*yield*/, ctx.answerCbQuery("Its Not Your Request Search Yourself !", {
                        show_alert: true,
                        cache_time: 2,
                    })];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7:
                if (!("data" in ctx.callbackQuery &&
                    (ctx.session.next === ctx.callbackQuery.data ||
                        ctx.session.prev === ctx.callbackQuery.data ||
                        qualities.some(function (res) { return callbackData_1.startsWith(res); })))) return [3 /*break*/, 35];
                page = ctx.session.page;
                requestBy = ctx.session.reqestBy;
                if (!ctx.callbackQuery.data.startsWith("480p")) return [3 /*break*/, 10];
                newresult = batchResultsAndFilter(result, "480p");
                ctx.session.aioBatches = newresult;
                if (!(result.length === 0)) return [3 /*break*/, 9];
                return [4 /*yield*/, sendCallbackQueryResponse(ctx, "not found")];
            case 8:
                _d.sent();
                _d.label = 9;
            case 9:
                page = 1;
                return [3 /*break*/, 19];
            case 10:
                if (!ctx.callbackQuery.data.startsWith("720p")) return [3 /*break*/, 13];
                newresult = batchResultsAndFilter(result, "720p");
                ctx.session.aioBatches = newresult;
                if (!(result.length === 0)) return [3 /*break*/, 12];
                return [4 /*yield*/, sendCallbackQueryResponse(ctx, "not found")];
            case 11:
                _d.sent();
                _d.label = 12;
            case 12:
                page = 1;
                return [3 /*break*/, 19];
            case 13:
                if (!ctx.callbackQuery.data.startsWith("1080p")) return [3 /*break*/, 16];
                newresult = batchResultsAndFilter(result, "1080p");
                ctx.session.aioBatches = newresult;
                if (!(result.length === 0)) return [3 /*break*/, 15];
                return [4 /*yield*/, sendCallbackQueryResponse(ctx, "not found")];
            case 14:
                _d.sent();
                _d.label = 15;
            case 15:
                page = 1;
                return [3 /*break*/, 19];
            case 16:
                if (!ctx.callbackQuery.data.startsWith("540p")) return [3 /*break*/, 19];
                newresult = batchResultsAndFilter(result, "540p");
                ctx.session.aioBatches = newresult;
                if (!(result.length === 0)) return [3 /*break*/, 18];
                return [4 /*yield*/, sendCallbackQueryResponse(ctx, "not found")];
            case 17:
                _d.sent();
                _d.label = 18;
            case 18:
                page = 1;
                _d.label = 19;
            case 19:
                aIOData = ctx.session.aioBatches;
                if (!aIOData) return [3 /*break*/, 32];
                if (!ctx.callbackQuery.data.startsWith("next")) return [3 /*break*/, 27];
                _d.label = 20;
            case 20:
                _d.trys.push([20, 25, , 26]);
                if (!(page + 1 < aIOData.length)) return [3 /*break*/, 22];
                ctx.session.page =
                    ((_c = ctx.session.page) !== null && _c !== void 0 ? _c : 0) + 1;
                console.log(page, aIOData.length);
                return [4 /*yield*/, ctx.editMessageText("```\n".concat(makeAIOCaption(aIOData[page + 1]), "\n```"), {
                        reply_markup: makeButtons(aIOData[page + 1], ctx.session.next || "", ctx.session.prev || "", ctx.session.sendAll || "", "eng", aIOData.length, page + 1),
                        parse_mode: "MarkdownV2",
                    })];
            case 21:
                _d.sent();
                return [3 /*break*/, 24];
            case 22: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "This is the last no more there !! ")];
            case 23:
                _d.sent();
                _d.label = 24;
            case 24: return [3 /*break*/, 26];
            case 25:
                error_2 = _d.sent();
                return [3 /*break*/, 26];
            case 26: return [3 /*break*/, 31];
            case 27:
                if (!(ctx.callbackQuery.data.startsWith("prev") ||
                    qualities.some(function (res) { return callbackData_1.startsWith(res); }))) return [3 /*break*/, 31];
                ctx.session.page = Math.max(page - 1, 0);
                _d.label = 28;
            case 28:
                _d.trys.push([28, 30, , 31]);
                return [4 /*yield*/, ctx.editMessageText("```\n ".concat(makeAIOCaption(aIOData[page - 1]), "\n```"), {
                        reply_markup: makeButtons(aIOData[page - 1], ctx.session.next || "", ctx.session.prev || "", ctx.session.sendAll || "", "eng", aIOData.length, page - 1),
                        parse_mode: "MarkdownV2",
                    })];
            case 29:
                _d.sent();
                return [3 /*break*/, 31];
            case 30:
                error_3 = _d.sent();
                return [3 /*break*/, 31];
            case 31: return [3 /*break*/, 34];
            case 32: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "No more data there !!!")];
            case 33:
                _d.sent();
                _d.label = 34;
            case 34: return [3 /*break*/, 37];
            case 35: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "you need to search again this  !!!")];
            case 36:
                _d.sent();
                _d.label = 37;
            case 37: return [3 /*break*/, 40];
            case 38: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "its not your request request yourself !!!")];
            case 39:
                _d.sent();
                _d.label = 40;
            case 40: return [2 /*return*/];
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
    var filteredResults = results.filter(function (item) { return item.caption.includes(quality); });
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
