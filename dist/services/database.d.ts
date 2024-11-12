import { User } from "telegraf/typings/core/types/typegram.js";
import { DatabaseClient, RequestDBClient } from "../interfaces.js";
import { AIOSearchCriteria } from "../databases/interfaces/searchCriteria.js";
import { AIODocument } from "../databases/interfaces/aIO.js";
declare class Database {
    client: DatabaseClient;
    constructor();
    initialize(): Promise<void>;
    saveMessages(messageIds: number[]): Promise<number>;
    saveAIO(aIODocument: AIODocument): Promise<number>;
    searchAIO(searchCriteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    getAIOMessages(shareId: number): Promise<number | undefined>;
    saveUser(user: User): Promise<User>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    addAIO(shareId: number, eps: number[]): Promise<any>;
    deleteAIO(shareId: number): Promise<any>;
    updateAIOAttribute(shareId: number, attribute: any): Promise<any>;
    getAllUserIds(): Promise<number[] | undefined>;
}
declare class ReqDB {
    reqClient: RequestDBClient;
    constructor();
    initialize(): Promise<void>;
    addUserRequest(userId: string): Promise<any>;
    hasReachedRequestLimit(userId: string): Promise<any>;
    saveRequestData(userId: string): Promise<any>;
}
declare const reqDB: ReqDB;
export { reqDB };
declare const database: Database;
export default database;
