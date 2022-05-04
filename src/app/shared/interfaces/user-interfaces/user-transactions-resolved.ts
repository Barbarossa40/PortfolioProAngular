import { UserTransaction } from "./user-transaction";


export interface UserTransactionsResolved {
    
    userTransactionArray: UserTransaction[]
    error?: any;
} 
