import React, {FC, useState} from 'react'
import FirstUploadForm from './FirstUpload';
import SecondUploadForm from './SecondUpload';
import ThirdUpload from './ThirdUpload';

interface Props {
    id: number
    upload: any
}
const UploadLessonIndex:FC<Props> = ({id, upload}) => {
    const [open, setOpen] = useState<number>(1);
    const handleOpen = (value:number) => {
        setOpen(open === value ? value : value);
      };
  return (
    <>
        <div className=''>
        {open === 1? <FirstUploadForm id={id} next={() => handleOpen(2)}/> : ""}
        {open === 2? <SecondUploadForm id={id} next={upload}/> : ""}
        </div>
    </>
  )
}

export default UploadLessonIndex