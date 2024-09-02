export interface AffiliateDto {
    id: string,
    monthlyRefferals: number,
    averageNewProjectPerMonth: number,
    existingProjectPerMonth: number
}

export interface CreateAffiliateDto {
    id?: string,
    monthlyRefferals: number,
    averageNewProjectPerMonth: number,
    existingProjectPerMonth: number
}

export interface EstimateRevenueDto {
    affiliate: AffiliateDto,
    pricePerProject: number,
    affiliatePayout: number,
    monthlyFee: number
}

export interface EstimateRevenueResponse {
    label: string,
    revenue: number,
    referralPayout: number
}