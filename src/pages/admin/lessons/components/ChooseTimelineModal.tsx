import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../../../../components/Buttons";
import { InputField, DateField } from "../../../../components/Inputs";
import { DateRange } from "react-date-range";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import dayjs from "dayjs";
import { updateTimeline } from "../../../../api";
import { alertActions } from "../../../../components/alertActions";

interface ChooseTimelineModalProps {
  close: () => void;
  item?: any;
  refetch: (val:any, filter:any) => void;
}

const ChooseTimelineModal: React.FC<ChooseTimelineModalProps> = ({
  close,
  item,
  refetch
}) => {
  const [isBusy, setIsBusy] = useState(false)
  const [weekTitle, setWeekTitle] = useState<string>(item.week)
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState<any>([
    {
      startDate:  item?.start_date? dayjs(item.start_date).toDate() : null,
      endDate: item?.end_date? dayjs(item.end_date).toDate() : null,
      key: "selection",
    },
  ]);

  const UpdateLesson = async() => {
    setIsBusy(true)
    const payload = {
      week: weekTitle,
      start_date: dayjs(date[0].startDate).toISOString(),
      end_date: dayjs(date[0].endDate).toISOString()
    }
    await updateTimeline(payload, item.id)
    .then((res:any) => {
      if(!res.error){
      alertActions.success(res.message)
      setIsBusy(false)
      refetch(item.SubjectId, item.GroupId)
      close()
      }else{
        alertActions.error(res.message)
        setIsBusy(false)
      }
    })
    .catch((err) => {
      setIsBusy(false)
      console.log(err);
    })
    
  }
  

  return (
    <div className="">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Choose Timeline
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <p className="py-5 font-normal text-[14px] text-[#87909E] px-[24px]">
        You can add lesson timeline
      </p>
      <div className="px-[24px] border-b-[1px] max-h-[300px] overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
        <InputField
          type="text"
          label="Week Title"
          placeholder=""
          name="week"
          variant="white"
          value={weekTitle}
          onChange={(e: any) => {
            setWeekTitle(e.target.value);
          }}
        />
        <div className="pb-3">
          <label className="font-normal text-[#87909E] text-base">Choose Dates</label>
          <div
            className=" w-full mt-2 rounded-[8px] border border-black cursor-pointer border-opacity-20 shadow overflow-hidden h-[40px] px-3 flex items-center justify-between"
            onClick={() => setShowDate(!showDate)}
          >
            <h3 className="text-[14px]">{date[0]?.startDate? dayjs(date[0]?.startDate).format('MMM-DD') : ""}  - {date[0]?.endDate? dayjs(date[0]?.endDate).format('MMM-DD') : ""}</h3>
            {showDate ? (
              <FaAngleUp className="text-[20px] text-black opacity-50" />
            ) : (
              <FaAngleDown className="text-[20px] text-black opacity-50" />
            )}
          </div>
        </div>
        {showDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            startDatePlaceholder='Starts'
            endDatePlaceholder='Ends'
          />
        )}
        {/* <DateField label="Choose dates" placeholder="" variant="white" /> */}
      </div>
      <div className="p-[24px]">
        <PrimaryButton text={isBusy? "Saving" : "Save"} variant="dash" onClick={UpdateLesson} invalid={!weekTitle && !date[0]?.endDate} />
      </div>
    </div>
  );
};

export default ChooseTimelineModal;
