import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type GoogleAccount = {
    id: string;
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
export type DB = {
    google_accounts: GoogleAccount;
    users: NativeUser;
};
