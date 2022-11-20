export interface IPricingRule {
    customerName: string,
    specialDeals: ISpecialDeal[],
    fixedPriceDeals: IFixedPriceDeal[]
}

export interface ISpecialDeal {
    productName: string,
    discountType: string,
    description: string,
    paidItems: number,
    freeItems: number
}

export interface IFixedPriceDeal {
    productName: string,
    discountType: string,
    description: string,
    dsicountedPrice: number
}