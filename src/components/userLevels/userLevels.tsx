import { useState } from "react";
import PlusIcon from "../../assets/icons/components/settingsNav/plus";
import studentImage from '../../assets/images/student.png';





function UserAccordion({ data }: { data: any }) {

    const [active, setActive] = useState(false);

    return (
        <div className="w-full mb-5 shadow px-4 py-2 rounded-[8px] transition duration-300">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4 items-center">
                    <img className="w-[48px] h-[48px]" src={studentImage} alt="" />
                    <div className="flex flex-col space-y-1 justify-between">
                        <h1 className="text-primary text-sm font-[500]">{data.name}</h1>
                        <p className="text-gray-400 text-xs">{data.email}</p>
                    </div>
                </div>
                <div className="flex items-center w-1/2">
                    <h1 className="text-primary w-[15rem] ">{data.type}</h1>
                    <div className="flex w-full justify-between ">
                        <h1 className={data.active ? "text-green-600" : "text-red-600"}>
                            {data.active ? "Active" : "Inactive"}
                        </h1>
                        <div onClick={() => setActive(!active)}
                            className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
                            cursor-pointer ${active ? "rotate-180" : ""}`}
                        >
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z" fill="#030036" fillOpacity="0.74" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
            {
                active &&
                <div className="border-t pt-4 mt-3 ml-16 text-sm duration-300 flex justify-between items-end">
                    <div className="">
                        <div className="mb-2">
                            <span className="text-gray-400">Access Level: </span>
                            <span>{data.level}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-gray-400">Password: </span>
                            <span>{data.password}</span>
                        </div>
                    </div>
                    <button className="text-red-600 flex space-x-2 items-center hover:shadow px-2 py-1 rounded">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.66658 2.83333H8.33325C8.33325 2.47971 8.19278 2.14057 7.94273 1.89052C7.69268 1.64048 7.35354 1.5 6.99992 1.5C6.6463 1.5 6.30716 1.64048 6.05711 1.89052C5.80706 2.14057 5.66658 2.47971 5.66658 2.83333ZM4.66659 2.83333C4.66659 2.52692 4.72694 2.2235 4.8442 1.94041C4.96146 1.65731 5.13333 1.40009 5.35 1.18342C5.56667 0.966748 5.8239 0.794875 6.10699 0.677614C6.39008 0.560353 6.6935 0.5 6.99992 0.5C7.30634 0.5 7.60975 0.560353 7.89285 0.677614C8.17594 0.794875 8.43316 0.966748 8.64983 1.18342C8.8665 1.40009 9.03838 1.65731 9.15564 1.94041C9.2729 2.2235 9.33325 2.52692 9.33325 2.83333H13.1666C13.2992 2.83333 13.4264 2.88601 13.5201 2.97978C13.6139 3.07355 13.6666 3.20073 13.6666 3.33333C13.6666 3.46594 13.6139 3.59312 13.5201 3.68689C13.4264 3.78066 13.2992 3.83333 13.1666 3.83333H12.2866L11.5066 11.9073C11.4468 12.526 11.1586 13.1002 10.6984 13.5179C10.2381 13.9356 9.63879 14.1669 9.01725 14.1667H4.98258C4.36116 14.1667 3.76199 13.9354 3.30188 13.5177C2.84178 13.1 2.55374 12.5259 2.49392 11.9073L1.71325 3.83333H0.833252C0.700644 3.83333 0.573467 3.78066 0.479698 3.68689C0.38593 3.59312 0.333252 3.46594 0.333252 3.33333C0.333252 3.20073 0.38593 3.07355 0.479698 2.97978C0.573467 2.88601 0.700644 2.83333 0.833252 2.83333H4.66659ZM5.99992 6C5.99992 5.86739 5.94724 5.74022 5.85347 5.64645C5.7597 5.55268 5.63253 5.5 5.49992 5.5C5.36731 5.5 5.24013 5.55268 5.14637 5.64645C5.0526 5.74022 4.99992 5.86739 4.99992 6V11C4.99992 11.1326 5.0526 11.2598 5.14637 11.3536C5.24013 11.4473 5.36731 11.5 5.49992 11.5C5.63253 11.5 5.7597 11.4473 5.85347 11.3536C5.94724 11.2598 5.99992 11.1326 5.99992 11V6ZM8.49992 5.5C8.63253 5.5 8.7597 5.55268 8.85347 5.64645C8.94724 5.74022 8.99992 5.86739 8.99992 6V11C8.99992 11.1326 8.94724 11.2598 8.85347 11.3536C8.7597 11.4473 8.63253 11.5 8.49992 11.5C8.36731 11.5 8.24013 11.4473 8.14637 11.3536C8.0526 11.2598 7.99992 11.1326 7.99992 11V6C7.99992 5.86739 8.0526 5.74022 8.14637 5.64645C8.24013 5.55268 8.36731 5.5 8.49992 5.5ZM3.48925 11.8113C3.52521 12.1824 3.69808 12.5268 3.97416 12.7774C4.25025 13.028 4.60975 13.1667 4.98258 13.1667H9.01725C9.39009 13.1667 9.74959 13.028 10.0257 12.7774C10.3018 12.5268 10.4746 12.1824 10.5106 11.8113L11.2826 3.83333H2.71725L3.48925 11.8113Z" fill="#F1350C" />
                        </svg>

                        <span>Remove user</span>
                    </button>
                </div>
            }
        </div>

    );
}

const samples = [
    { name: "David micheal", email: "david@gmail.com", type: 'Super Admin', level: "Developer", password: "somepassword", active: true },
    { name: "David micheal", email: "david@gmail.com", type: 'normal', level: "Developer", password: "somepassword", active: false },
    { name: "David micheal", email: "david@gmail.com", type: 'normal', level: "Developer", password: "somepassword", active: true },

];


export default function UserLevels() {
    return (
        <div className="mt-10">
            <div className="flex items-center justify-between ">
                <h1 className="text-xl text-primary">User Levels</h1>
                <div className="cursor-pointer w-7 h-7 rounded-full bg-main flex items-center justify-center">
                    <PlusIcon fill="white" />
                </div>
            </div>
            <div className="mt-10">
                {
                    samples.map((sample, index) => (
                        <UserAccordion key={index} data={sample} />
                    ))
                }
            </div>
        </div>
    )
}
