import Request from "@/api/request";

const LOGIN_URL = () => `/account/signin`;

const REGISTER_URL = () => `/account/signup`;

const VERIFY_ACCOUNT_URL = () => `/account/verify`;


/* ------------------------------ REGISTRATION ------------------------------ */

export const registerPublisher = async (payload : any) => {
    return Request.post(REGISTER_URL(), payload);
}

/* ---------------------------------- LOGIN --------------------------------- */

export const loginPublisher = async (payload : any) => {
    return Request.post(LOGIN_URL(), payload);
}

/* --------------------------------- VERIFY --------------------------------- */

export const verifyAccount = async (payload : any) => {
    return Request.post(VERIFY_ACCOUNT_URL(), payload);
}