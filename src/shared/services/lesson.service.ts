import Request from "@/api/request";

// lessons
const GET_LESSONS = (id: string) => `/lessons/check?subject_id=${id}`;
const GET_LESSON_DATA = (id: string) => `/lessons/${id}`;
const SAVE_FILE = (id: string) => `/open/lesson/templateimage/${id}`;
const EDIT_LESSON_SLIDE = (id: string) => `/lesson/template/${id}`;

// library
export const fetchLessons = async (id) => Request.get(GET_LESSONS(id));

export const fetchTemplate = async (id) => Request.get(GET_LESSON_DATA(id));

export const uploadFile = async (items: any, id: string) =>
    Request.put(SAVE_FILE(id), items);

export const editSlide = async (items: any, id: string) =>
    Request.put(EDIT_LESSON_SLIDE(id), items);
