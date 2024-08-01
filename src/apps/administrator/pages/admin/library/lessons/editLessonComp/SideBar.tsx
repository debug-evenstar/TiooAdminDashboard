import React, {FC} from 'react'

interface Props {
  data: any
  change: (value:any) => void
  active: any
}
const EditLessonSideBar:FC<Props> = ({data, change, active}) => {
  function createMarkup() {
    return {__html: data?.generated};
  }
  const SideItem = ({item}:any) => {
    return (
      <div className={`w-full h-44 overflow-hidden rounded-[4px] cursor-pointer hover:scale-105 duration-100 border border-[#4F46E5]`}>
        <p className='border-b px-2 py-2 font-medium'>{item?.topic}</p>
        <div dangerouslySetInnerHTML={createMarkup()}  className='text-[10px] p-2'/>
      </div>
    )
  }
  return (
    <>
        <div className='p-6 h-full overflow-y-auto edit-scroll'>
           <p className='text-center text-lg font-[600] text-[#87909E]'>Lesson</p>
           <div className='grid gap-6 mt-6'>
              {/* {
                data.map((item:any, index:number) => (
                  <SideItem item={item} key={index}/>
                ))
              } */}
              <SideItem item={data} />
           </div>
        </div>
    </>
  )
}

export default EditLessonSideBar

export const dummyText = [
  {
    titie: "Guildlines",
    text: "<p>This activity is designed for Primary 3 students studying English language, specifically focusing on the topic of concrete and abstract nouns</p>",
    id: 24
  },
  {
    titie: "Instructions",
    text: "Number 2 This activity is designed for Primary 3 students studying English language, specifically focusing on the topic of concrete and abstract nouns",
    id: 23
  },
  {
    titie: "Handout",
    text: "Number 3 This activity is designed for Primary 3 students studying English language, specifically focusing on the topic of concrete and abstract nouns",
    id: 22
  }
]