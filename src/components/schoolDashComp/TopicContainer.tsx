import { FC } from "react";
import TopicItem from "./TopicItem";

interface Props {
    lesson: any
    refetch: () => void
}
const TopicContainer:FC<Props> = ({lesson, refetch}) => {
   
  return (
    <>
      <div className="grid grid-cols-3 lg:gap-12 lg:gap-y-8">
        {
            lesson && lesson[0].Lessons.map((item:any, i:number) => (
                <TopicItem items={item} index={i} name={lesson[0].naming} refetch={refetch}/>
            ))
        }
      </div>
    </>
  );
};

export default TopicContainer;
