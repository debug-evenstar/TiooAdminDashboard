import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Library from "../pages/library/library";
import { ROUTES } from "@/global/routes";
import Lessons from "../pages/library/lessons";
import Textbooks from "../pages/library/textbooks";
import UploadedLesson from "../pages/library/lessons/uploaded-lessons";
import ChapterLesson from "../pages/library/lessons/chapter-lessons";
import { ReactElement } from "react";
import EditSlides from "../pages/library/tabs/editSlides";
import LibraryCategories from "../pages/library/categories";
import LibrarySubCategory from "../pages/library/categories/subCategory";
import ExamSet from "../pages/examSet";
import LibraryExams from "../pages/library/exams";
import UniversityAdmissions from "../pages/library/exams/universityAdmissions";
import UniversityExams from "../pages/library/exams/universityExams";
import UniversityExamsPage from "../pages/library/exams/universityExamsPage";

type SharedRoute = {
  path: string;
  Element: React.FunctionComponent;
  pathName: string;
  group?: RouteGroupInterface;
};
type SharedRoutesInterface = SharedRoute[];

type RouteGroupInterface = {
  path: string;
};

const ROUTE_GROUPS: { [key: string]: RouteGroupInterface } = {
  library: { path: "library" },
};

const SHARED_ROUTES: SharedRoutesInterface = [
  { path: `/library`, Element: LibraryCategories, pathName: "library" },
  { path: `/library/categories/exams`, Element: LibraryExams, pathName: "library" },
  { path: `/library/categories/exams/university-admissions`, Element: UniversityAdmissions, pathName: "library" },
  { path: `/library/categories/exams/university-exams`, Element: UniversityExams, pathName: "library" },
  { path: `/library/categories/university/:id/exams`, Element: UniversityExamsPage, pathName: "library" },
  { path: `/library/category/:id`, Element: LibrarySubCategory, pathName: "library" },
  // { path: `/library/categories/textbooks/:id`, Element: Library, pathName: "library" },
  { path: `/library/textbooks/:exam_id/`, Element: Library, pathName: "library" },
  {
    path: `/library/${ROUTES.LESSONS}`,
    Element: Lessons,
    pathName: "library.lessons",
  },
  {
    path: `/library/${ROUTES.TEXTBOOKS}`,
    Element: Textbooks,
    pathName: "library.textbooks",
  },
  {
    path: `/library/${ROUTES.UPLOADED_LESSONS}`,
    Element: UploadedLesson,
    pathName: "library.uploadedLesson",
  },
  {
    path: `/library/${ROUTES.TEXTBOOK_LESSONS}`,
    Element: ChapterLesson,
    pathName: "library.chapterLesson",
  },
  {
    path: `/library/${ROUTES.EDIT_SLIDES}`,
    Element: EditSlides,
    pathName: "library.lesson.editSlides",
  },
  { path: `/exam_set`, Element: ExamSet, pathName: "exam_set" },

];

function SharedRoutes(props: any) {
  return (
    <>
      {SHARED_ROUTES.map((route: SharedRoute) =>
        ROUTE_GROUPS[route.pathName.split(".")[0]] ? (
          <Route path={route.pathName.split(".")[0]}>
            <Route
              path={route.path}
              element={<route.Element {...(props[route.pathName] ?? {})} />}
            />
          </Route>
        ) : (
          <Route
            path={route.path}
            element={<route.Element {...(props[route.pathName] ?? {})} />}
          />
        )
      )}
    </>
  );
}

export default SharedRoutes;

// function SharedRoutes() {
//     return (
//         <>
//             <Route path="/library" element={<Library />} />
//             <Route path={"/library/" + ROUTES.LESSONS} element={<Lessons />} />
//             <Route
//                 path={"/library/" + ROUTES.TEXTBOOKS}
//                 element={<Textbooks />}
//             />
//             <Route
//                 path={"/library/" + ROUTES.UPLOADED_LESSONS}
//                 element={<UploadedLesson />}
//             />
//             <Route
//                 path={"/library/" + ROUTES.TEXTBOOK_LESSONS}
//                 element={<ChapterLesson />}
//             />
//         </>
//     );
// }
