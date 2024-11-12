import { WizardSessionData } from "telegraf/typings/scenes";
export default interface PageSessionData extends WizardSessionData {
    page?: number;
    prev?: string;
    next?: string;
    aioBatches?: {
        aIOTitle: string;
        shareId: string;
        aioShortUrl: string;
    }[][];
}
