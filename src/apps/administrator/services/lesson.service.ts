import Request from "@/api/request";

/* --------------------------- SERVICE ROUTE PATHS -------------------------- */

const GET_LESSON_GROUP_URL = (id: string) =>
    `/management/subject/groups?subject_id=${id}`;

const GET_SCHOOL_LESSON_URL = (id: string) =>
    `/management/lesson/check?subject_id=${id}`;

const DOWNLOAD_LESSON_URL = (id: string) => `/management/lesson/${id}/download`;

const PUBLISH_LESSON_URL = (id: string, status: string) =>
    `/management/lesson/${id}/status?status=${status}`;

const UPLOAD_TEMPLATE_URL = (id: number) =>
    `/management/lessons/${id}/template`;




/* ---------------------------- SERVICE FUNCTIONS --------------------------- */

export const getLessonGroup = (id: string) => {
    return Request.get(GET_LESSON_GROUP_URL(id));
};

export const getSchoolLesson = (id: any) => {
    return Request.get(GET_SCHOOL_LESSON_URL(id));
};
export const downloadLessonFile = (id: any) => {
    return Request.get(DOWNLOAD_LESSON_URL(id), { responseType: "blob" });
};
export const publishLesson = (id: string, status: string) => {
    return Request.put(PUBLISH_LESSON_URL(id, status));
};
export const uploadTemplate = (id: number, payload: FormData) => {
    return Request.post(UPLOAD_TEMPLATE_URL(id), payload);
};
