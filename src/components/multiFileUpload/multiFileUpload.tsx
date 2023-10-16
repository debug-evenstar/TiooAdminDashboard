import { ChangeEvent, useRef } from "react";

export default function MultiFileUpload({ accept, text, files, setSelectedFiles }: { accept?: string, text?: string, files: File[], setSelectedFiles: any }) {

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const collection = e.target.files;
    if (collection) {
      // setSelectedFiles([...files, ...Array.from(collection)]);
      setSelectedFiles([...files, ...collection]);
    }
  }

  const handleUpload = () => {
    fileRef.current && fileRef.current.click();
  }

  return (
    <div>
      <input className="hidden" ref={fileRef} type="file" onChange={handleFileSelect} accept={accept} multiple />
      <button onClick={handleUpload} className="text-main outline-none flex items-center w-[130px] text-sm h-[30px] border border-main px-3 space-x-2 py-2 rounded-full ">
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 16.5C3.60606 16.5 2.42424 16.0733 1.45455 15.22C0.484848 14.3667 0 13.3267 0 12.1V3.7C0 2.82 0.356061 2.06667 1.06818 1.44C1.7803 0.813333 2.63636 0.5 3.63636 0.5C4.63636 0.5 5.49242 0.813333 6.20455 1.44C6.91667 2.06667 7.27273 2.82 7.27273 3.7V11.3C7.27273 11.86 7.05303 12.3333 6.61364 12.72C6.17424 13.1067 5.63636 13.3 5 13.3C4.36364 13.3 3.82576 13.1067 3.38636 12.72C2.94697 12.3333 2.72727 11.86 2.72727 11.3V3.7H4.09091V11.3C4.09091 11.5267 4.17818 11.7168 4.35273 11.8704C4.52727 12.024 4.74303 12.1005 5 12.1C5.25758 12.1 5.47364 12.0232 5.64818 11.8696C5.82273 11.716 5.9097 11.5261 5.90909 11.3V3.7C5.90909 3.14 5.68939 2.66667 5.25 2.28C4.81061 1.89333 4.27273 1.7 3.63636 1.7C3 1.7 2.46212 1.89333 2.02273 2.28C1.58333 2.66667 1.36364 3.14 1.36364 3.7V12.1C1.36364 12.98 1.7197 13.7333 2.43182 14.36C3.14394 14.9867 4 15.3 5 15.3C6 15.3 6.85606 14.9867 7.56818 14.36C8.2803 13.7333 8.63636 12.98 8.63636 12.1V3.7H10V12.1C10 13.3267 9.51515 14.3667 8.54545 15.22C7.57576 16.0733 6.39394 16.5 5 16.5Z" fill="#4F46E5" />
        </svg>
        <span>{text}</span>
      </button>
    </div>
  );
}
