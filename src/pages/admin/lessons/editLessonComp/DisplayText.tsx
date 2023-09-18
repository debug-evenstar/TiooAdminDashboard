import React, { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import {TextTyper} from "../../../../utilities/TypeWriter";

interface Props {
  data: any;
  lesson: any;
  getValue: any;
}
const DisplayText: FC<Props> = ({ data, lesson, getValue }) => {
  const [value, setValue] = useState("");
  const val = useSelector((state: any) => state.lesson.generatedNote.current);
  const [stop, setStop] = useState(false)
  useEffect(() => {
    if (val) {
      setValue(val);
    }
  }, [val]);
  useEffect(() => {
    if (lesson) {
      // setValue(lesson.generated)
      getValue(lesson.generated);
    }
  }, [lesson]);
  const handleChange = (value: any) => {
    setValue(value);
    getValue(value);
  };

  return (
    <>
      <div className="bg-white min-h-[500px] p-8 rounded-[4px] edit-shade">
        {stop && (
          <ReactQuill
            theme="bubble"
            value={value}
            onChange={(value) => handleChange(value)}
            modules={{ toolbar: [""] }}
            className="min-h-[500px]"
          />
        )}
        {(!stop && lesson) && <TextTyper text={val} interval={10} Markup={"code"} setStop={setStop} />}
      </div>
      <div className="pt-12 flex justify-end">
        {/* <button className='px-7 py-3 rounded-lg bg-[#4F46E5] text-white font-[500]'>Create Activity</button> */}
      </div>
    </>
  );
};

export default DisplayText;
