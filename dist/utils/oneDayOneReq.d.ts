declare class OneRequestOneDayDb {
    private userData;
    constructor();
    addUser(userId: string): void;
    clearData(): void;
    hasReachedRequestLimit(userId: string): boolean;
    saveRequestData(userId: string): void;
    private checkAndReset;
}
export default OneRequestOneDayDb;
