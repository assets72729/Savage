import { WizardSessionData } from "telegraf/typings/scenes";
import { AIODocument } from "../../databases/interfaces/aIO";
export default interface PageSessionData extends WizardSessionData {
    page?: number;
    prev?: string;
    next?: string;
    editDelete?: string;
    tracker?: string;
    messageIds?: number[];
    genres?: string[];
    done?: boolean;
    selectedShareId?: number;
    aIOData?: AIODocument[];
}
