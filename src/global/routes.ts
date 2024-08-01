export const ROUTES = {
    HOME : "/",
    AUTH_TOKEN : "/auth/:token",
    SUBJECTS : "/subjects",
    TEACHER_SUBJECTS : "/teacher/subjects",
    STUDENTS : "/students",
    STUDENT : "/student/:id",
    TEACHER_STUDENTS : "/teacher/students",
    TEACHERS : "/teachers",
    TEACHER : "/teacher/:id",
    LESSONS : "/lessons",
    TEXTBOOKS: "/chapters/:id",
    TEXTBOOK_LESSONS : "/chapter/lessons/:textbookId/:chapterId",
    TEACHER_LESSONS : "/teacher/lessons",
    UPLOADED_LESSONS : "/lessons/:id/:classid",
    EDIT_LESSON_NOTE: "/lessons/note/:id",
    TEACHER_LESSON : "/teacher/lessons/:id",
    EDIT_SLIDES : "lesson/editSlides/:id"
}
