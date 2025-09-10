import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Activity = {
    id: string;
    displayName: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Document = {
    id: string;
    content: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DocumentFileReferences = {
    documentId: string;
    fileId: string;
};
export type File = {
    id: string;
    data: string;
    type: string;
    uploaderId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type GoogleAccount = {
    id: string;
    displayName: Generated<string>;
    email: string;
    userId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type NativeUser = {
    id: string;
    displayName: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Trip = {
    id: string;
    displayName: string;
    ownerId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    activities: Activity;
    document_file_ref: DocumentFileReferences;
    documents: Document;
    files: File;
    google_accounts: GoogleAccount;
    trips: Trip;
    users: NativeUser;
};
