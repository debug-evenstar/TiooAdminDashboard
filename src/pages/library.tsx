import Header from "../components/header"
import SearchBar from "../components/searchBar";

export type TCategoryCardProps = { title?: string, name?: string, value?: number };

function CategoryCard({ title, name, value }: TCategoryCardProps) {
  return (
    <div className="flex mb-5 flex-col justify-between hover:bg-light cursor-pointer w-full h-[140px] rounded-[8px] shadow border">
      <div className="w-full p-3 h-[65%]">
        <h1 className="w-[60%] text-lg">{title}</h1>
      </div>
      <div className="w-full relative border-t border-gray-300 flex items-center px-3 text-gray-400 justify-between h-[35%]">
        <h2>{value} {name}</h2> <div className="w-2 h-2 rounded-full bg-main"></div>
      </div>
    </div>
  );
}

function Categories() {
  const categories: TCategoryCardProps[] = [
    { title: "Student's Curricula", name: "Subjects", value: 52 },
    { title: "Co-Curricula Content", name: "Subjects", value: 15 },
    { title: "Games", name: "Games", value: 12 },
  ];

  return (
    <div className="w-[22%] overflow-y-auto h-[calc(100vh_-_95px)] p-4 border-l">
      <div className="py-2">
        <h1 className="font-[400] text-primary">Categories</h1>
      </div>
      <div className="mt-4">
        {
          categories.map((catProps, index) => (
            <CategoryCard key={index} {...catProps} />
          ))
        }
      </div>
    </div>

  );
}

export type TLessonCardProps = { title: string, color?: string, description: string, date: string };

function LessonsCard({ color, title, description, date }: TLessonCardProps) {
  return (
    // <div className="w-[260px] border h-[175px] flex flex-col justify-between rounded-[8px]">
    <div className="w-full border h-[175px] flex flex-col justify-between rounded-[8px]">
      <div className={`${color} h-[110px] p-3 text-left text-white rounded-t-[8px]`}>
        <h1 className="font-[500] text-lg">{title}</h1>
        <p className="mt-3 text-xs">{description}</p>
      </div>
      <span className="px-5 text-xs text-gray-400 py-3">
        uploaded {date} ago
      </span>
    </div>
  );
}
function AllLessons() {
  const lessons: TLessonCardProps[] = [
    { title: "Public Speaking", description: "Learn conversation skills and develop strong relationship with others", date: "5 days" },
    { title: "Budgeting", description: "Learn money management skills and the value of money.", date: "10 days" },
    { title: "Entrepreneurship", description: "Explore and discover personal strengths and areas for development", date: "two weeks" },
  ];

  const colors: string[] = [
    'bg-[#AE1E56]',
    'bg-[#86A94B]',
    'bg-[#776DB4]',
  ];

  return (
    <div className="w-[78%] overflow-y-auto max-h-[calc(100vh_-_95px)] px-[24px]">
      <div className="flex items-center justify-between py-7">
        <h1 className="text-primary text-lg">All Lessons</h1>
        <SearchBar className="w-[23rem] " name="search-lesson" placeholder="Search" variant="normal" />
      </div>
      <div className="grid gap-x-2 grid-cols-3">
        {
          lessons.map((lessonProp, index) => (
            <LessonsCard key={index} {...lessonProp} color={colors[index]} />
          ))
        }
      </div>
    </div>
  );
}

export default function Library() {
  return (
    <div>
      <Header title="Library" />
      <div className="flex h-full overflow-y-auto  text-primary h-[calc(100vh_-_95px)]">
        <AllLessons />
        <Categories />
      </div>
    </div>
  )
}
