import React, {FC} from 'react'

interface Props {
    item: any;
    viewClass?: Function;
    filter: (arm:string) => void;
    activeClass: string;
}


// const LessonClasses:FC<Props> = ({item, viewClass, filter, activeClass}) => {
//     const ClassItem = ({item}:{item:any}) => {
//         return (
//             <div className={`p-2 py-4 text-primary shadow rounded-[8px] hover:scale-105 duration-100 cursor-pointer ${activeClass === item.id && 'bg-[#E3E2FF66] border border-[#4F46E5]'}`} onClick={() => filter(item.id)}>
//                 <p className='py-3 fw-500'>{item.naming}</p>
//                 {/* <p className='text-[#87909EBD] py-3'>{item?.ClassArms?.map((item:any) => <span className='pr-2'>{item.naming}</span>)}</p> */}
//             </div>
//         )
//     }
//   return (
//     <>
//         <div className='grid gap-y-4'>
//             {
//                 !!item && item.map((item:any, index:number) => (
//                     <div className='' key={index}>
//                         <ClassItem item={item}/>
//                     </div>
//                 ))
//             }
//         </div>
//     </>
//   )
// }

const LessonClasses:FC<Props> = ({item, viewClass, filter, activeClass}) => {
    const ClassItem = ({item}:{item:any}) => {
        return (
            <div className={`p-2 shadow rounded-[8px] hover:scale-105 duration-100 cursor-pointer ${activeClass == item.id && 'bg-[#E3E2FF66] border border-[#4F46E5]'}`} onClick={() => filter(item.id)}>
                <p className='py-3 border-b fw-500'>{item.Class?.naming ?? item.naming}</p>
                <p className='text-[#87909EBD] py-3'>{item?.ClassArms?.map((item:any) => <span className='pr-2'>{item.naming}</span>)}</p>
            </div>
        )
    }
  return (
    <>
        <div className='grid gap-y-4'>
            {
                !!item && item.map((item:any, index:number) => (
                    <div className='' key={index}>
                        <ClassItem item={item}/>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default LessonClasses