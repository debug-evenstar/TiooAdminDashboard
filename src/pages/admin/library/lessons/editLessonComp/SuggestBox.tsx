import React, {FC, useState} from 'react'
// import { LessonButton } from '../../../../components/Buttons'

interface Props {
    prompt: (value:any) => void
    isBusy: boolean
}
const SuggestBox:FC<Props> = ({prompt, isBusy}) => {
    const [message, setMessage] = useState('')
    const getPromt = () => {
        prompt(message)
        setMessage('')
    }
  return (
    <div className='bg-white sticky top-0 min-h-[400px] overflow-hidden edit-shade rounded-[4px] p-6'>
        <div>
            <input type='text' value={message} placeholder='e.g include a case study' onChange={(e:any) => setMessage(e.target.value)} className='p-3 w-full border border-[#87909E99] rounded-[8px]'/>
            
            <button className={`mt-4 w-full shadow rounded-[8px] py-3 font-[500] ${message || isBusy? "bg-[#4F46E5] text-white" : "bg-[#FBFBFE] text-[#87909E]"}`} onClick={message? getPromt : () => false}>{isBusy? "Updating..." : "Update"}</button>
        </div>
        <div className='m-8 grid gap-5'>
            {/* {
                suggestText.map((item, i) => (
                    <div className='w-full px-5 py-2 rounded-[44px] border border-[#4F46E5] cursor-pointer hover:scale-105 duration-100' key={i}>
                        <p className='text-[12px]'>{item.text}</p>
                    </div>
                ))
            } */}
            <img src='https://res.cloudinary.com/dic7regoe/image/upload/v1693764466/praxeum/emty_swi8qd.webp' alt='empty' className='w-full mx-auto'/>
        </div>
    </div>
  )
}

export default SuggestBox

const suggestText = [
    {
        id: 23,
        text: "Include a case study for students to facilitate class discussion "
    },
    {
        id: 24,
        text: "Modify guidelines to include a step where students can ask questions or express their doubts."
    },
    {
        id: 23,
        text: "Include a case study for students to facilitate class discussion "
    },
]