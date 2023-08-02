// import ExportBtn from "../components/exportBtn/exportBtn"
import { useState } from "react"
import Header from "../components/header"


function Card({ index }: { index: number }) {
  return <div className="w-[17rem] bg-orange-300 h-40 rounded flex items-center justify-center text-black shadow bg-white">{index}</div>
}

export default function Library() {
  const data: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

  const [units, setUnits] = useState(0);

  const prev = () => {
    if(units <= 120)
      setUnits(0)
    else
      setUnits((units) => units + 17)
  
  }

  const next = () => {
    if(units <= -120)
      setUnits(0)
    else
      setUnits((units) => units - 17)
  }

  return (
    <div>
      <Header title="Library" />
      <div className="mt-5 px-10">
        <div className="flex items-center justify-end">
          <button className="px-3 mx-1 bg-main rounded text-white" onClick={prev}>prev</button>
          <button className="px-3 mx-1 bg-main rounded text-white" onClick={next}>next</button>
        </div>
        <div className="flex items-center border-2 border-purple-500 h-44 overflow-hidden">
          <div id="slider" className="flex relative duration-300 h-40 space-x-4" style={{ transform: `translateX(${units}rem)` }}>
            {
              data.map((value) => (
                <Card index={value} />
              ))
            }
          </div>
        </div>
        {units}
      </div>
    </div>
  )
}
