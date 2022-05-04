export interface StockDetails{

    slug: string;
    name:string;
    extransaction?:string;
    companyName?: string;
    equityType?: string;
    bookValue?: number;
    cash?:  number;
    debt?:  number;
    debtEq?: number;
    divRate?:  number;
    divYield?:  number;
    divYield4y?:  number;
    earningsGrowth?:  number;
    earningsGrowth3?:  number;
    marketCap?: number;
    open?:  number;
    shares?:  number;
    divGrowRate?:  number;
    lastDivDate?: string;
    description?: string;
   

}
