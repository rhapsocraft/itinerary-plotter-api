import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Activity = {
    id: string;
    displayName: Generated<string>;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Document = {
    id: string;
    content: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type DocumentFileReferences = {
    documentId: string;
    fileId: string;
};
export type File = {
    id: string;
    name: string;
    displayName: string;
    src: string;
    type: string;
    size: number;
    uploaderId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type GoogleAccount = {
    id: string;
    email: string;
    userId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    displayName: Generated<string>;
};
export type NativeUser = {
    id: string;
    displayName: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Trip = {
    id: string;
    displayName: Generated<string>;
    ownerId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type user_sessions = {
    sid: string;
    sess: unknown;
    expire: Timestamp;
};
export type DB = {
    activities: Activity;
    document_file_ref: DocumentFileReferences;
    documents: Document;
    files: File;
    google_accounts: GoogleAccount;
    trips: Trip;
    user_sessions: user_sessions;
    users: NativeUser;
};
