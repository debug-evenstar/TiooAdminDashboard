import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: any;
  background: string;
  nextPage?: any;
}

const CategoryCard = ({ category, background, nextPage }: CategoryCardProps) => {

  return (
    <button
      onClick={() => nextPage(category)}
      style={{backgroundColor: background+'66'}}
      className={` h-[10rem] text-white font-bold rounded-xl flex items-center justify-center`}
    >
      <p className="px-4 py-1  rounded" style={{backgroundColor: background +'cc'}}>{category?.name}</p>
    </button>
  );
};
export default CategoryCard