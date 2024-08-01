import Request from "@/api/request";

const GET_SCHOOL_SUBJECTS = (id: string) =>
    `/school/dashboard/subjects/?school_id=${id}`;

export const getSchoolSubjects = (id: string) => {
    return Request.get(GET_SCHOOL_SUBJECTS(id));
};
