// import { useState } from "react";
// import { AddLessonModal } from "../../pages/admin/library";

// type TLessonCardProps = { title: string, color?: string, description: string, date?: string };

// function LessonsCard({ color, title, description }: TLessonCardProps) {
//   return (
//     // <div className="w-[260px] border h-[175px] flex flex-col justify-between rounded-[8px]">
//     <div className="w-full border min-h-[175px] flex flex-col justify-between rounded-[8px]">
//       <div className={`${color} h-[110px] p-4 text-left text-white rounded-t-[8px]`}>
//         <h1 className="font-[500] text-lg">{title}</h1>
//         <p className="mt-3 text-xs">{description}</p>
//       </div>
//       <div className="px-4 mb-2 mt">
//         <span className="text-xs text-gray-400">Lessons uploaded</span><br />
//         <div className="text-xs mb-2 font-semibold">0</div>
//         <div className="w-full grid grid-cols-2 gap-x-4">
//           <button className="px-4 py-1.5 text-sm font-semibold rounded border border-main text-main">View Lesson</button>
//           <button className="px-4 py-1.5 text-sm font-semibold rounded border border-main bg-main text-white">View Lesson</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function LibraryCoCurricula() {
//   const lessons: TLessonCardProps[] = [
//     { title: "Public Speaking", description: "Learn conversation skills and develop strong relationship with others", date: "5 days" },
//     { title: "Budgeting", description: "Learn money management skills and the value of money.", date: "10 days" },
//     { title: "Entrepreneurship", description: "Explore and discover personal strengths and areas for development", date: "two weeks" },
//   ];

//   const colors: string[] = [
//     'bg-[#AE1E56]',
//     'bg-[#86A94B]',
//     'bg-[#776DB4]',
//   ];

//   const [modal, setModal] = useState<boolean>(false);

//   return (
//     <div className="w-full overflow-y-auto max-h-[calc(100vh_-_95px)] px-[24px]">
//       <AddLessonModal {...{ modal, setModal }} />
//       <div className="grid gap-x-2 grid-cols-3">
//         {
//           lessons.map((lessonProp, index) => (
//             <LessonsCard key={index} {...lessonProp} color={colors[index]} />
//           ))
//         }
//       </div>
//       <div className="mt-5">
//         <button
//           onClick={() => setModal(!modal)}
//           className="w-[221px] h-[170px] px-[52px] py-[35px] border shadow rounded-[8px]
//               flex items-center justify-center flex-col text-main">
//           <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M24 8C32.822 8 40 15.178 40 24C40 32.822 32.822 40 24 40C15.178 40 8 32.822 8 24C8 15.178 15.178 8 24 8ZM24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM34 22H26V14H22V22H14V26H22V34H26V26H34V22Z" fill="#4F46E5" />
//           </svg>
//           <p className="text-center font-[500]">Add a lesson material</p>
//         </button>
//       </div>
//     </div>
//   );
// }
