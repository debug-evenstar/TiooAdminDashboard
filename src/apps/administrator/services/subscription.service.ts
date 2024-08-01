import Request from "@/api/request";

const GET_PRICING_SETTINGS = () => "/settings/pricing";

export const fetchPricing = () => {
    return Request.get(GET_PRICING_SETTINGS());
};
