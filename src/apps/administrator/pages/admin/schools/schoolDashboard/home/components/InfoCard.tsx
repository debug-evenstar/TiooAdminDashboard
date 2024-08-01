import React from 'react'
// import { book } from '../../../../../constants/images'

function InfoCard() {
  return (
    <div className="bg-[#fff] rounded-[8px] shadow-lg border border-black border-opacity-10 py-4 px-3 w-full">
      <div className='flex items-center'>
        <img
          // src={book}
          className="w-[84px] h-[72px] pointer-events-none"
          alt="Info"
        />
        <div className="flex flex-col items-start justify-start ml-3 w-full">
          <h3 className="text-lg font-normal leading-[27px] text-[#030036] opacity-70 w-[90%]">
            Advance your School’s curriculum by accessing our specialized
            library. This library is suitable for nursery, secondary and
            primary schools.
          </h3>
          <a
            href="#"
            className="text-lg text-[#4F46E5] font-bold py-1 underline"
          >
            Explore Library
          </a>
        </div>
      </div>
    </div>
  );
}

export default InfoCard