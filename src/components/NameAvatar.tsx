import React, {FC} from 'react'

interface Props{
    name:string
}

const NameAvatar:FC<Props> = ({name}) => {
    const nameRow = name?.split(' ')
    const firstLetter = nameRow[0]?.charAt(0)
    const lastLetter = nameRow[1]?.charAt(0)
  return (
    <div className='w-full h-full grid place-content-center bg-[#4F46E5] rounded-[50%]'>
        <div className='flex'>
        <p className='text-semibold text-white capitalize'>{firstLetter}</p>
        <p className='text-semibold text-white capitalize'>{lastLetter}</p>
        </div>
    </div>
  )
}

export default NameAvatar