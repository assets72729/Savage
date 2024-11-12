import { AIODocument } from "../../databases/interfaces/aIO.js";
interface AIODetails {
    caption?: string;
    backupChannel?: string;
    messageIds?: number;
}
export default function getDramadata(dramaDetails: AIODetails, messageIds: number): Promise<AIODocument | null>;
export {};
