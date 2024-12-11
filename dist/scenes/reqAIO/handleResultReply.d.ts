import PageSessionData from "./pageSessionData.js";
declare function handleResultsReply(ctx: any, request: string, firstBatch: {
    caption: string;
    shareId: string;
}[], sessionData: PageSessionData, batchedResultsLength: number): Promise<void>;
export declare function editResultsReply(ctx: any, request: string, firstBatch: {
    caption: string;
    shareId: string;
    messageIds?: number;
}[], sessionData: PageSessionData, batchedResultsLength: number, pageNo: number): Promise<void>;
export default handleResultsReply;
