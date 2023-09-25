import React, { FC, useEffect } from 'react'
import { SuccessCheck } from '../../../../../../components/AlertCheck'
import { PrimaryButton } from '../../../../../../components/Buttons'

interface Props {
  close: () => void
  item: any
  refetch: (val: any, filter: any) => void;
}
const AddLessonSuccess: FC<Props> = ({ close, refetch, item }) => {
  useEffect(() => {
    refetch(item[0]?.SubjectId, item[0]?.GroupId)
  }, [])
  return (
    <div className="h-[370px] flex items-center justify-center">
      <div className="text-center w-10/12">
        <SuccessCheck />
        <p className="text-lg">Lessons added successfully</p>
        <p className="mt-6 text-[#6C7C8C] text-[14px]">
          You lessons has been uploaded successfully and is undergoing review.
          Please check back in 24 hours
        </p>
        <div className="mt-4">
          <PrimaryButton text="Continue" onClick={close} />
        </div>
      </div>
    </div>
  )
}

export default AddLessonSuccess