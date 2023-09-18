import React, {FC} from 'react'
import ChapterItem from './ChapterItem'

interface Props {
    item: any
    data: any
    refetch: (val:any, filter:any) => void
}
const ChapterContainer:FC<Props> = ({item, data, refetch}) => {

  return (
    <>
        <div className='grid gap-y-6 lg:gap-y-10'>
        {/* {
            item && item.map((item:any, i:number) => (
                <ChapterItem index={i} item={item} data={data[0]}/>
            ))
        } */}
         <ChapterItem item={item} data={data[0]} refetch={refetch}/>
        </div>
    </>
  )
}

export default ChapterContainer