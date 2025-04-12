var _a, _b, _c, _d, _e;
import "dotenv/config";
var env = process.env;
// Bot Authentication
var token = env.TELEGRAM_BOT_TOKEN;
var jwtSecret = env.JWT_SECRET || "randomSecretString";
// Bot Identification
var botUserName = env.BOT_USERNAME;
var ownerId = Number(env.OWNER_ID) || 0;
// Channel and Group IDs
var logGroupId = Number(env.LOG_GROUP);
var dbAIOChannelId = Number(env.DB_AIO_CHANNEL_ID);
var dbOGChannelId = Number(env.DB_OG_CHANNEL_ID);
var dbPosterID = Number(env.DB_POSTER_ID);
var collectionAIO = Number(env.COLLECTION_AIO) || "";
var collectionAIO2 = Number(env.COLLECTION_AIO_2) || "";
// Access Control
var adminIds = (_a = env.ADMIN_IDS) === null || _a === void 0 ? void 0 : _a.split(" ").map(Number);
var allowGroups = ((_b = env.ALLOW_GROUPS) === null || _b === void 0 ? void 0 : _b.split(" ").map(Number)) || [];
var onlyCmdAllow = ((_c = env.ONLYCMDALLOW) === null || _c === void 0 ? void 0 : _c.split(" ").map(Number)) || [];
var forceGroupIds = ((_d = env.FORCE_GROUP_IDS) === null || _d === void 0 ? void 0 : _d.split(" ").map(Number)) || [];
var forceChannelIds = ((_e = env.FORCE_CHANNEL_IDS) === null || _e === void 0 ? void 0 : _e.split(" ").map(Number)) || [];
// Links and Messages
var howToDownload = env.HOW_TO_DOWNLOAD_MSG_LINK || "";
var howToGenerateToken = env.HOW_TO_GENERATE_TOKEN;
var botSupportLink = env.BOT_SUPPORT_LINK;
var noBtnLink = env.NO_BTN_LINK;
var mainGroupLink = env.MAIN_GROUP_LINK;
var premiumPlansLink = env.PREMIUM_PLANS_LINK;
// Server Configuration
var development = env.DEVELOPMENT;
var webhookDomain = env.WEBHOOK_DOMAIN;
var otherDomain = env.OTHER_DOMAIN || "";
var port = env.PORT || 8080;
// Database and Backup
var databaseUrl = env.DATABASE_URL;
var backup = env.BACKUP || "";
// API Configuration
var apiBaseUrl = env.API_BASE_URL || "";
var apiFetchToken = env.API_FETCH_TOKEN || "";
//payment
var upiId = env.UPI_ID || "";
// promotion
var join = env.JOIN || "";
//Other
var RequestLimit = Number(env.REQUEST_LIMIT) || 10;
// Validation Checks
if (!token) {
    throw Error("Provide TELEGRAM_BOT_TOKEN");
}
if (!adminIds) {
    throw Error("Provide ADMIN_IDS");
}
// Export Configuration
export default {
    token: token,
    mainGroupLink: mainGroupLink,
    ownerId: ownerId,
    botUserName: botUserName,
    dbPosterID: dbPosterID,
    development: development,
    webhookDomain: webhookDomain,
    port: port,
    join: join,
    backup: backup,
    noBtnLink: noBtnLink,
    premiumPlansLink: premiumPlansLink,
    jwtSecret: jwtSecret,
    howToDownload: howToDownload,
    howToGenerateToken: howToGenerateToken,
    logGroupId: logGroupId,
    dbAIOChannelId: dbAIOChannelId,
    dbOGChannelId: dbOGChannelId,
    collectionAIO: collectionAIO,
    collectionAIO2: collectionAIO2,
    allowGroups: allowGroups,
    onlyCmdAllow: onlyCmdAllow,
    forceGroupIds: forceGroupIds,
    forceChannelIds: forceChannelIds,
    adminIds: adminIds,
    databaseUrl: databaseUrl,
    otherDomain: otherDomain,
    apiBaseUrl: apiBaseUrl,
    apiFetchToken: apiFetchToken,
    botSupportLink: botSupportLink,
    upiId: upiId,
    RequestLimit: RequestLimit,
};
