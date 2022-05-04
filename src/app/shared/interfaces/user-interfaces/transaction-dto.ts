export interface TransactionDto{

    transactionTime: Date;
    transactionAmount: number;
    totalAmount: number;
    assetId?: number;
    userId: string;
    priceSnapshot: number;

}
