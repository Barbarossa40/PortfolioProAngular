import { UserAsset } from "../asset-interfaces/user-asset";

type Nullable<T> = T | null;
export interface UserTransaction{

    transactionId: number | undefined;
    transactionTime: Date;
    transactionAmount: number;
    totalAmount: number;
    assetId: number;
    asset: Nullable<UserAsset>;
    userId: string;
    priceSnapshot: number;

}
