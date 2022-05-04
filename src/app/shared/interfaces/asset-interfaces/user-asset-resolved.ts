import { UserAsset } from "./user-asset";

type Nullable<T> = T | null;

export interface UserAssetResolved {
    userAsset:Nullable<UserAsset>;
    error?: any;
} 
