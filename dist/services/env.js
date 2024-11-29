var _a, _b, _c, _d;
import "dotenv/config";
var env = process.env;
var token = env.TELEGRAM_BOT_TOKEN;
var logGroupId = Number(env.LOG_GROUP);
var dbAIOChannelId = Number(env.DB_AIO_CHANNEL_ID);
var dbOGChannelId = Number(env.DB_OG_CHANNEL_ID);
var dbPosterID = Number(env.DB_POSTER_ID);
var howToDownload = env.HOW_TO_DOWNLOAD_MSG_LINK || "";
var development = env.DEVELOPMENT;
var webhookDomain = env.WEBHOOK_DOMAIN;
var otherDomain = env.OTHER_DOMIAN || "";
var backup = env.BACKUP || "";
var howToGenerateToken = env.HOW_TO_GENERATE_TOKEN;
var botUserName = env.BOT_USERNAME;
var port = env.PORT || 8080;
// const forceChannelIds = env.FORCE_CHANNEL_IDS?.split(" ").map(Number) || [];
var forceGroupIds = ((_a = env.FORCE_GROUP_IDS) === null || _a === void 0 ? void 0 : _a.split(" ").map(Number)) || [];
var allowGroups = ((_b = env.ALLOW_GROUPS) === null || _b === void 0 ? void 0 : _b.split(" ").map(Number)) || [];
var onlyCmdAllow = ((_c = env.ONLYCMDALLOW) === null || _c === void 0 ? void 0 : _c.split(" ").map(Number)) || [];
var adminIds = (_d = env.ADMIN_IDS) === null || _d === void 0 ? void 0 : _d.split(" ").map(Number);
var databaseUrl = env.DATABASE_URL;
var join = env.JOIN || "";
var jwtSecret = env.JWT_SECRET || "randomSecretString";
var collectionAIO = Number(env.COLLECTION_AIO) || "";
var collectionAIO2 = Number(env.COLLECTION_AIO_2) || "";
if (!token) {
    throw Error("Provide TELEGRAM_BOT_TOKEN");
}
if (!adminIds) {
    throw Error("Provide ADMIN_IDS");
}
export default {
    token: token,
    botUserName: botUserName,
    dbPosterID: dbPosterID,
    development: development,
    webhookDomain: webhookDomain,
    port: port,
    join: join,
    backup: backup,
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
    adminIds: adminIds,
    databaseUrl: databaseUrl,
    otherDomain: otherDomain,
};
