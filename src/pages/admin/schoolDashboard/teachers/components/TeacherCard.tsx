interface TeacherCardProps {
  teacher: any;
}

const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
}) => {


  function getInitials(name: string | undefined): string {
    const parts: string[] | undefined = name?.split(" ");
    if (!parts || parts.length === 0) {
      return ""; // or any other desired behavior for empty or undefined name
    }
    return parts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  const initials: string = getInitials(teacher.name);
  return (
    <div className="w-full rounded-[8px] flex flex-col overflow-hidden shadow-md border border-black border-opacity-10 p-3">
      <div className="flex w-full items-center justify-between">
        <div
          className={`h-[48px] w-[48px] text-[18px]"
        } rounded-[50%] bg-[#E3E2FF] border-opacity-20 flex items-center justify-center font-mulish text-[#030036] opacity-70 font-medium`}
        >
          {initials}
        </div>

      </div>
      <div className="pt-2 pb-5 border-b border-gray-200">
        <h3 className="font-medium text-[#030036] opacity-70">
          {teacher.name}
        </h3>
      </div>
      <div className="bg-[#fff] w-full grid grid-cols-2 gap-2 pt-2">
        <div
          className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 cursor-pointer"

        >
          <h4 className="text-[14px] text-[#87909E] text-normal">Subjects</h4>
          <p className="py-1 text-black text-[14px] leading-[21px]">
            {/* {teacher.Subjects?.length} */}
          </p>
        </div>
        <div
          className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 cursor-pointer"

        >
          <h4 className="text-[14px] text-[#87909E] text-normal">Class</h4>
          <p className="py-1 text-black text-[14px] leading-[21px]">
            {/* {teacher.Classes?.length} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
