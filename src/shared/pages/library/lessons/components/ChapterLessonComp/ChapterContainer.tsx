import React, {FC} from 'react'
import ChapterItem from './ChapterItem'

interface Props {
    item: any
    textbook: any
    refetch: (val:any, filter:any) => void
}
const ChapterContainer:FC<Props> = ({item, textbook, refetch}) => {

  return (
    <>
        <div className='grid gap-y-6 lg:gap-y-10'>
        {/* {
            item && item.map((item:any, i:number) => (
                <ChapterItem index={i} item={item} textbook={data[0]}/>
            ))
        } */}
         <ChapterItem item={item} textbook={textbook} refetch={refetch}/>
        </div>
    </>
  )
}

export default ChapterContainer