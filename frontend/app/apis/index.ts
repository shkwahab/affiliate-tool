import { AffiliateDto, CreateAffiliateDto, EstimateRevenueDto, EstimateRevenueResponse } from "~/types";
import { baseApi } from "./apiHelper";

export const getAffiliate = async () => {
    return await baseApi.get("/affiliate") as AffiliateDto;
}

export const saveAffiliate = async (data: CreateAffiliateDto) => {
    return await baseApi.put("/affiliate", data) as AffiliateDto;
}

export const estimateRevenue = async (data: EstimateRevenueDto) => {
    return await baseApi.post("/affiliate/estimate-revenue", data) as EstimateRevenueResponse[];
}