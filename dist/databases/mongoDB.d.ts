/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
import mongoose, { Model } from "mongoose";
import { MessageDocument } from "./models/messageModel.js";
import { UserDocument } from "./models/userModel.js";
import { AIODocument } from "./interfaces/aIO.js";
import { AIOSearchCriteria } from "./interfaces/searchCriteria.js";
declare class MongoDB {
    db: typeof mongoose;
    MessageModel: Model<MessageDocument>;
    UserModel: Model<UserDocument>;
    AIOModel: Model<AIODocument>;
    databaseUrl: string;
    constructor();
    initialize(): Promise<void>;
    saveMessages(shareId: number, messageIds: number[]): Promise<number>;
    saveUser(user: UserDocument): Promise<UserDocument>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    getAIOMessages(shareId: number): Promise<number | undefined>;
    saveAIO(aio: AIODocument): Promise<AIODocument>;
    searchAIO(criteria: AIOSearchCriteria): Promise<AIODocument[] | undefined>;
    addAIO(shareId: number, messageIds: number[]): Promise<boolean>;
    deleteAIO(shareId: number): Promise<boolean>;
    updateAIOAttribute(shareId: number, updateQuery: any): Promise<boolean>;
    getAllUserIds(): Promise<number[]>;
}
declare const mongoDB: MongoDB;
export default mongoDB;
