var OneRequestOneDayDb = /** @class */ (function () {
    function OneRequestOneDayDb() {
        this.userData = new Map();
        this.checkAndReset();
    }
    OneRequestOneDayDb.prototype.addUser = function (userId) {
        if (!this.userData.has(userId)) {
            this.userData.set(userId, 0);
            // console.log(`Added user ${userId} to the database.`);
        }
        else {
            console.log("User ".concat(userId, " is already in the database."));
        }
    };
    OneRequestOneDayDb.prototype.clearData = function () {
        this.userData.clear();
        console.log("User data cleared.");
    };
    OneRequestOneDayDb.prototype.hasReachedRequestLimit = function (userId) {
        var requestCount = this.userData.get(userId) || 0;
        return requestCount >= 3;
    };
    OneRequestOneDayDb.prototype.saveRequestData = function (userId) {
        var requestCount = this.userData.get(userId) || 0;
        if (requestCount < 3) {
            this.userData.set(userId, requestCount + 1);
            // console.log(`Request data saved for user ${userId}. (${requestCount + 1}/3 requests made)`);
        }
        else {
            console.log("User ".concat(userId, " has already made three requests today."));
        }
    };
    OneRequestOneDayDb.prototype.checkAndReset = function () {
        var now = new Date();
        if (now.getHours() === 1 && now.getMinutes() === 0) {
            this.clearData(); // Reset user data if it's 1 AM
        }
    };
    return OneRequestOneDayDb;
}());
export default OneRequestOneDayDb;
