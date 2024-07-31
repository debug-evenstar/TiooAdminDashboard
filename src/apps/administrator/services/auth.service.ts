import Request from "@/api/request";

const GET_USER_URL = () => `/user`;

const LOGIN_USER_URL = () => `/login`;

export const fetchUser = () => {
    return Request.get(GET_USER_URL());
};

export const authUser = (data: any) => {
    return Request.post(LOGIN_USER_URL(), data);
};
