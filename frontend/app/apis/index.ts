import { AffiliateDto, CreateAffiliateDto, EstimateRevenueDto, EstimateRevenueResponse } from "~/types";
import { baseApi } from "./apiHelper";

export const getAffiliate = async () => {
    const res = await baseApi.get("/affiliate");
    return res.data as AffiliateDto;
}

export const saveAffiliate = async (data: CreateAffiliateDto) => {
    const res = await baseApi.put("/affiliate", data);
    return res.data as AffiliateDto;
}

export const estimateRevenue = async (data: EstimateRevenueDto) => {
    const res= await baseApi.post("/affiliate/estimate-revenue", data) 
    return res.data as EstimateRevenueResponse[];
}