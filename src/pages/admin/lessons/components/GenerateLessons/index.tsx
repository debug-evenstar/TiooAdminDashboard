import React, {FC, useState} from 'react'
import { LessonButton } from '../../../../../components/Buttons'
import FirstGenerate from './FirstGenerate'
import GeneratingLesson from './Generating'

interface Props {
  id: number
  upload: any
  generate: any
}
const GenerateLessons:FC<Props> = ({id, upload, generate}) => {
  const [open, setOpen] = useState<number>(1);
    const handleOpen = (value:number) => {
        setOpen(open === value ? value : value);
      };
  return (
    <>
        <div className=''>
        {open === 1? <FirstGenerate id={id} upload={upload} generate={generate}/> : ""}
        {/* {open === 2? <GeneratingLesson id={id}/> : ""} */}
        </div>
    </>
  )
}

export default GenerateLessons