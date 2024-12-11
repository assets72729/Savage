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
import env from "../services/env.js";
export function sendTokenExpiredMessage(ctx, user, shortUrl, payload) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var firstName, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    message = "Hello ".concat(firstName, ", your token has expired.  \nYou can generate a new token once a day, which takes just 30\u201340 seconds. After that, you\u2019ll enjoy unlimited requests for the next 24 hours!\n");
                    if (env.howToGenerateToken) {
                        message += "Tutorial:\n[TO KNOW HOW TO GENERATE NEW TOKEN](".concat(env.howToGenerateToken, ")");
                    }
                    message += "\nANY PROBLEM CONTACT: [ADMIN](tg://user?id=".concat(env.adminIds[0], ")");
                    return [4 /*yield*/, ctx.reply(message, {
                            reply_to_message_id: ctx.message.message_id,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: "Click Me To Generate New Token",
                                            url: shortUrl,
                                        },
                                    ],
                                    [
                                        {
                                            text: "Try Again",
                                            url: "https://t.me/".concat(env.botUserName, "?start=").concat(payload).replace(" ", ""),
                                        },
                                    ],
                                ],
                            },
                            parse_mode: "Markdown",
                            disable_web_page_preview: true,
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendWelcomeMessage(ctx, user) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var firstName, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    message = "Hello ".concat(firstName, "!\n Use:\n/m movie name : for movies \n");
                    return [4 /*yield*/, ctx.reply(message, {
                            reply_to_message_id: ctx.message.message_id,
                            parse_mode: "HTML",
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: "❣️❣️ Join ❣️❣️",
                                            url: "https://t.me/".concat(env.join),
                                        },
                                    ],
                                ],
                            },
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendInviterWelcomeMessage(ctx, inviterId) {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = "Welcome! You were invited by a user with ID ".concat(inviterId, ".\nJoin our main channel for unlimited movies, dramas, and more. Stay updated with the latest releases and exclusive content.\nClick the link to join and start enjoying now!\n").concat(env.join, "\n\n");
                    return [4 /*yield*/, ctx.reply(message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendRateLimitMessage(ctx, user) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var firstName, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    message = "Hello ".concat(firstName, "!\nIn 6 hours, you can only make 3 requests. Please wait for some time before making another request.\n");
                    return [4 /*yield*/, ctx.reply(message, {
                            reply_to_message_id: ctx.message.message_id,
                            parse_mode: "HTML",
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: "❣️❣️Join KDL Official ❣️❣️",
                                            url: "https://t.me/".concat(env.join),
                                        },
                                    ],
                                ],
                            },
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function createDeepLinksList(items) {
    return items
        .map(function (item) {
        return "\u27A4 [".concat(editTitle(item.caption), "](https://t.me/").concat(env.botUserName, "?start=").concat(item.shareId, "-aio)");
    })
        .join("\n");
}
export function editTitle(caption) {
    return convertToTinySubscript(caption.length > 60 ? "".concat(caption.slice(0, 57), "...") : caption);
}
export function convertToTinySubscript(inputText) {
    var subscriptMapping = {
        a: "ᴀ",
        b: "ʙ",
        c: "ᴄ",
        d: "ᴅ",
        e: "ᴇ",
        f: "ғ",
        g: "ɢ",
        h: "ʜ",
        i: "ɪ",
        j: "ᴊ",
        k: "ᴋ",
        l: "ʟ",
        m: "ᴍ",
        n: "ɴ",
        o: "ᴏ",
        p: "ᴘ",
        q: "ǫ",
        r: "ʀ",
        s: "s",
        t: "ᴛ",
        u: "ᴜ",
        v: "ᴠ",
        w: "ᴡ",
        x: "x",
        y: "ʏ",
        z: "ᴢ",
        // Numbers
        // 0: "₀",
        // 1: "₁",
        // 2: "₂",
        // 3: "₃",
        // 4: "₄",
        // 5: "₅",
        // 6: "₆",
        // 7: "₇",
        // 8: "₈",
        // 9: "₉",
    };
    var tinySubscriptText = "";
    for (var _i = 0, _a = inputText.toLowerCase(); _i < _a.length; _i++) {
        var char = _a[_i];
        tinySubscriptText += subscriptMapping[char] || char;
    }
    return tinySubscriptText.replace(/[()\[\]\+\-]/g, " ").trim();
}
