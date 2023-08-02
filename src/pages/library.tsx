import Header from "../components/header"

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
      <div>
        {
          categories.map((catProps, index) => (
            <CategoryCard key={index} {...catProps} />
          ))
        }
      </div>
    </div>
    
  );
}

function AllLessons() {
  return (
    <div className="w-[78%] overflow-y-auto max-h-[calc(100vh_-_95px)]">
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
