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
    var request, searchCriteria, searchResults, finalResult, random, batchedResults, firstBatch, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!("text" in ctx.message)) return [3 /*break*/, 11];
                ctx.session.page = 0;
                request = ctx.message.text.replace("/m", "").trim();
                if (!(request.length > 2)) return [3 /*break*/, 9];
                searchCriteria = {
                    caption: cleanString(request.toLowerCase()),
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, database.searchAIO(searchCriteria)];
            case 2:
                searchResults = _b.sent();
                finalResult = sortEpisodesByCaption(searchResults || []);
                random = getRandomId();
                ctx.session.result = finalResult;
                ctx.session.prev = "prev".concat(random);
                ctx.session.next = "next".concat(random);
                ctx.session.sendAll = "sendall".concat(random);
                ctx.session.reqestBy = "".concat((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id);
                batchedResults = batchResults(finalResult);
                ctx.session.aioBatches = batchedResults;
                firstBatch = batchedResults === null || batchedResults === void 0 ? void 0 : batchedResults[0];
                if (!(finalResult.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, ctx
                        .reply("```\n".concat(request, "\n```"), {
                        reply_markup: makeButtons(firstBatch || [], ctx.session.next || "", ctx.session.prev || "", ctx.session.sendAll || "", "eng", batchedResults.length, 0),
                        parse_mode: "MarkdownV2",
                        reply_to_message_id: ctx.message.message_id,
                    })
                        .then(function (sentMessage) {
                        // Schedule message deletion after 5 minutes
                        var messageIdToDelete = sentMessage.message_id;
                        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, ctx.deleteMessage(messageIdToDelete)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_2 = _a.sent();
                                        console.error(error_2);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, 5 * 60 * 1000);
                    })
                        .catch(console.error)];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, ctx.scene.leave()];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                console.error(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/, ctx.wizard.next()];
            case 9: 
            // Leave the scene if the request is too short
            return [4 /*yield*/, ctx.scene.leave()];
            case 10:
                // Leave the scene if the request is too short
                _b.sent();
                _b.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var result, reqestBy, qualities, callbackData_1, aIOData, page, isValidToken, firstItem, botLink, userLink, error_3, page, data_1, quality, newresult, aIOData, error_4, error_5;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                result = ctx.session.result;
                reqestBy = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString()) === ctx.session.reqestBy;
                if (!!reqestBy) return [3 /*break*/, 2];
                return [4 /*yield*/, ctx.answerCbQuery("Its Not Your Request Search Yourself !", {
                        show_alert: true,
                        cache_time: 5,
                    })];
            case 1:
                _g.sent();
                _g.label = 2;
            case 2:
                qualities = ["480p", "720p", "1080p", "540p"];
                if (!("data" in ctx.callbackQuery && reqestBy)) return [3 /*break*/, 33];
                callbackData_1 = (_b = ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.data;
                if (!("data" in ctx.callbackQuery &&
                    ctx.session.sendAll === ctx.callbackQuery.data)) return [3 /*break*/, 11];
                aIOData = ctx.session.aioBatches;
                page = ctx.session.page;
                _g.label = 3;
            case 3:
                _g.trys.push([3, 10, , 11]);
                return [4 /*yield*/, database.verifyAndValidateToken((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id.toString())];
            case 4:
                isValidToken = _g.sent();
                if (!!isValidToken) return [3 /*break*/, 8];
                return [4 /*yield*/, database.getFirstSortItem()];
            case 5:
                firstItem = _g.sent();
                if (!firstItem) return [3 /*break*/, 8];
                botLink = "https://t.me/".concat(env.botUserName);
                userLink = "https://t.me/".concat(ctx.from.username);
                if (!ctx.from.username) {
                    userLink = "tg://user?id=".concat(ctx.from.id);
                }
                return [4 /*yield*/, ctx
                        .reply("Hello [".concat(ctx.from.first_name, "](").concat(userLink, ") \nYour Token Has Expired: [").concat("Generate New Token Once in 24 hours", "](").concat(botLink, ")"), {
                        parse_mode: "Markdown",
                        disable_web_page_preview: true,
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
                    })];
            case 6:
                _g.sent();
                return [4 /*yield*/, telegram.app.telegram.sendMessage(ctx.from.id, "Hello ".concat((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.first_name, ", your token has expired.\nYou can generate a new token once a day. After that, you can make unlimited requests within 24 hours.\nANY PROBLEM CONTACT: [ADMIN](tg://user?id=").concat(env.adminIds[0], ")"), {
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
            case 7: return [2 /*return*/, _g.sent()];
            case 8: return [4 /*yield*/, telegram.forwardMessages(ctx.from.id, env.dbAIOChannelId, aIOData[page].map(function (item) { return item.messageIds; }), true, [], ctx)];
            case 9:
                _g.sent();
                return [3 /*break*/, 11];
            case 10:
                error_3 = _g.sent();
                return [3 /*break*/, 11];
            case 11:
                if (!("data" in ctx.callbackQuery &&
                    (ctx.session.next === ctx.callbackQuery.data ||
                        ctx.session.prev === ctx.callbackQuery.data ||
                        qualities.some(function (res) { return callbackData_1.startsWith(res); })))) return [3 /*break*/, 30];
                page = ctx.session.page;
                data_1 = (_e = ctx.callbackQuery) === null || _e === void 0 ? void 0 : _e.data;
                if (!data_1) return [3 /*break*/, 14];
                quality = qualities.find(function (q) { return data_1.startsWith(q); });
                if (!quality) return [3 /*break*/, 14];
                newresult = batchResultsAndFilter(result, quality);
                ctx.session.aioBatches = newresult;
                if (!(result.length === 0)) return [3 /*break*/, 13];
                return [4 /*yield*/, sendCallbackQueryResponse(ctx, "not found")];
            case 12:
                _g.sent();
                _g.label = 13;
            case 13:
                page = 1;
                _g.label = 14;
            case 14:
                aIOData = ctx.session.aioBatches;
                if (!aIOData) return [3 /*break*/, 27];
                if (!ctx.callbackQuery.data.startsWith("next")) return [3 /*break*/, 22];
                _g.label = 15;
            case 15:
                _g.trys.push([15, 20, , 21]);
                if (!(page + 1 < aIOData.length)) return [3 /*break*/, 17];
                ctx.session.page =
                    ((_f = ctx.session.page) !== null && _f !== void 0 ? _f : 0) + 1;
                console.log(page, aIOData.length);
                return [4 /*yield*/, ctx.editMessageText("```\n".concat(makeAIOCaption(aIOData[page + 1]), "\n```"), {
                        reply_markup: makeButtons(aIOData[page + 1], ctx.session.next || "", ctx.session.prev || "", ctx.session.sendAll || "", "eng", aIOData.length, page + 1),
                        parse_mode: "MarkdownV2",
                    })];
            case 16:
                _g.sent();
                return [3 /*break*/, 19];
            case 17: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "This is the last no more there !! ")];
            case 18:
                _g.sent();
                _g.label = 19;
            case 19: return [3 /*break*/, 21];
            case 20:
                error_4 = _g.sent();
                return [3 /*break*/, 21];
            case 21: return [3 /*break*/, 26];
            case 22:
                if (!(ctx.callbackQuery.data.startsWith("prev") ||
                    qualities.some(function (res) { return callbackData_1.startsWith(res); }))) return [3 /*break*/, 26];
                ctx.session.page = Math.max(page - 1, 0);
                _g.label = 23;
            case 23:
                _g.trys.push([23, 25, , 26]);
                return [4 /*yield*/, ctx.editMessageText("```\n ".concat(makeAIOCaption(aIOData[page - 1]), "\n```"), {
                        reply_markup: makeButtons(aIOData[page - 1], ctx.session.next || "", ctx.session.prev || "", ctx.session.sendAll || "", "eng", aIOData.length, page - 1),
                        parse_mode: "MarkdownV2",
                    })];
            case 24:
                _g.sent();
                return [3 /*break*/, 26];
            case 25:
                error_5 = _g.sent();
                return [3 /*break*/, 26];
            case 26: return [3 /*break*/, 29];
            case 27: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "No more data there !!!")];
            case 28:
                _g.sent();
                _g.label = 29;
            case 29: return [3 /*break*/, 32];
            case 30: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "you need to search again this  !!!")];
            case 31:
                _g.sent();
                _g.label = 32;
            case 32: return [3 /*break*/, 35];
            case 33: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "its not your request request yourself !!!")];
            case 34:
                _g.sent();
                _g.label = 35;
            case 35: return [2 /*return*/];
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
