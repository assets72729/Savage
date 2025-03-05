import { WizardSessionData } from "telegraf/typings/scenes";
import { AIODocument } from "../../databases/interfaces/aIO.js";
export default interface PageSessionData extends WizardSessionData {
    page?: number;
    prev?: string;
    next?: string;
    sendAll?: string;
    reqestBy?: string;
    reqest?: string;
    sending?: boolean;
    lastActionTime?: {};
    aioBatches?: {
        caption: string;
        shareId: string;
        messageIds: number;
    }[][];
    result?: AIODocument[];
}
