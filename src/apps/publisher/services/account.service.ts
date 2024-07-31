import Request from "@/api/request";

const GET_ACCOUNT_URL = () => `/account/read`;

export const getAccount = async () => {
    return Request.get(GET_ACCOUNT_URL());
}
