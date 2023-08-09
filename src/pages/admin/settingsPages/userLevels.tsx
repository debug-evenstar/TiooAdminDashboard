import { ChangeEvent, useState } from "react";
import PlusIcon from "../../../assets/icons/components/settingsNav/plus";
import studentImage from '../../../assets/images/student.png';
import searchImage from '../../../assets/images/search-md.png';





type TUserLevel = {
    name: string;
    email: string;
    type: string;
    level: string;
}

const samples: TUserLevel[] = [
    { name: "David micheal", email: "david@gmail.com", type: 'Super Admin', level: "Manage Freelancers" },
];


type TCheckListProps = {
    id: number;
    value: any;
}

function CheckList({ data, search }: { search?: boolean, data: TCheckListProps[] }) {

    const [list, setList] = useState<string[]>([]);

    const [searchInput, setSearchInput] = useState<string>('');

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const handleSelection = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setList([...list, value]);
    }



    return (
        <div className="p-4 shadow">
            {
                search &&
                <div className="w-full border-b py-3 flex items-center space-x-2">
                    <img src={searchImage} alt="" className='w-4 h-4' />
                    <input
                        onChange={handleSearchChange}
                        type="text" value={searchInput} placeholder="Search"
                        className="outline-none text-sm w-full" />
                </div>
            }
            <ul>
                {
                    data.map(({ id, value }: TCheckListProps) => (
                        <li key={id} className="my-2 rounded-sm py-1.5 px-3 shadow flex items-center space-x-3">
                            <input onChange={handleSelection} type="checkbox" value={value} />
                            <span className="text-gray-500">{value}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

function OptionsMenu({ options, search = false }: { search?: boolean, options: TCheckListProps[] }) {
    const [active, setActive] = useState(false);

    return (
        <>
            <div onClick={() => setActive(!active)} className="mt-2 cursor-pointer  outline-none rounded w-full px-3 py-2 border flex justify-end">
                <div
                    className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
                cursor-pointer ${!active ? "rotate-180" : ""}`}
                >
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z" fill="#030036" fillOpacity="0.74" />
                    </svg>

                </div>
            </div>
            {active && <CheckList search={search} data={options} />}
        </>
    );
}



const accessOptions: TCheckListProps[] = [
    { id: 1, value: "Manage Schools" },
    { id: 2, value: "Manage Freelancers" },
    { id: 3, value: "Manage Teachers" },
    { id: 4, value: "Manage Students" },
    { id: 5, value: "Manage Library" },
    { id: 6, value: "Manage Marketplace" },
];

const statusOptions: TCheckListProps[] = [
    { id: 1, value: "Super Admin" },
    { id: 2, value: "Normal" },

];



function AddUserModal({ modal, setModal }: { modal: boolean, setModal: (state: boolean) => void }) {
    return (
        <div className={`fixed text-primary z-[90] bg-[#00000044] transition inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
            <div className={`${modal ? "translate-y-[5rem]" : "translate-y-0"} z-[100] bg-white rounded duration-1000 h-[500px] w-[380px] mx-auto `}>
                <div className="p-2 border-b px-4 flex items-center justify-between">
                    <h1>Add Users</h1>
                    <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
                </div>
                <div className=" px-4 mt-4 h-[24rem] overflow-y-auto">
                    <div className="text-xs mb-3">
                        <label htmlFor="" className="">Full Name</label>
                        <input type="text" className="mt-2 outline-none rounded w-full px-3 py-2 border" />
                    </div>
                    <div className="text-xs mb-3">
                        <label htmlFor="" className="">Email</label>
                        <input type="text" className="mt-2 outline-none rounded w-full px-3 py-2 border" />
                    </div>
                    <div className="text-xs mb-3">
                        <label htmlFor="" className="">Status</label>
                        <OptionsMenu options={statusOptions} />
                    </div>
                    <div className="text-xs mb-3">
                        <label htmlFor="" className="">Role</label>
                        <input type="text" className="mt-2 outline-none rounded w-full px-3 py-2 border" />
                    </div>
                    <div className="text-xs mb-3">
                        <label htmlFor="" className="">Access Level</label>
                        <OptionsMenu search options={accessOptions} />
                    </div>
                </div>
                <div className="px-4 w-full h-[3rem] mt-[2px] flex items-center">
                    <button className="bg-main w-full text-sm text-center py-1.5 rounded text-white font-[500]">Invite</button>
                </div>
            </div>
        </div>
    );
}


function DeleteUserModal({ modal, setModal }: { modal: boolean, setModal: (state: boolean) => void }) {
    return (
        <div className={`fixed text-primary z-[90] bg-[#00000044] transition inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
            <div className={`${modal ? "translate-y-[5rem]" : "translate-y-0"} justify-between flex flex-col z-[100] bg-white rounded duration-1000 h-[300px] w-[300px] mx-auto `}>
                <div className="flex justify-end py-2 px-4 border-b">
                    <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
                </div>
                <div className="flex px-4 items-center space-y-3 flex-col  py-10">
                    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.7 15.6335L12.5016 1.39569C12.2967 1.04687 12.0042 0.757642 11.6532 0.556681C11.3021 0.35572 10.9046 0.25 10.5 0.25C10.0955 0.25 9.69798 0.35572 9.3469 0.556681C8.99581 0.757642 8.70334 1.04687 8.49847 1.39569L0.300029 15.6335C0.102907 15.9709 -0.000976562 16.3546 -0.000976562 16.7454C-0.000976562 17.1361 0.102907 17.5199 0.300029 17.8572C0.502276 18.2082 0.794251 18.499 1.14599 18.6998C1.49773 18.9006 1.89658 19.0043 2.30159 19.0001H18.6985C19.1032 19.0039 19.5016 18.9001 19.853 18.6993C20.2044 18.4985 20.4961 18.2079 20.6982 17.8572C20.8956 17.52 20.9998 17.1364 21.0001 16.7456C21.0004 16.3549 20.8969 15.9711 20.7 15.6335ZM19.3997 17.1063C19.3282 17.2282 19.2256 17.3289 19.1024 17.3981C18.9792 17.4673 18.8398 17.5025 18.6985 17.5001H2.30159C2.16029 17.5025 2.02088 17.4673 1.89765 17.3981C1.77442 17.3289 1.67181 17.2282 1.60034 17.1063C1.5356 16.9967 1.50145 16.8717 1.50145 16.7444C1.50145 16.6171 1.5356 16.4922 1.60034 16.3826L9.79878 2.14475C9.87169 2.02341 9.97477 1.92301 10.098 1.8533C10.2212 1.7836 10.3603 1.74696 10.5019 1.74696C10.6435 1.74696 10.7826 1.7836 10.9058 1.8533C11.029 1.92301 11.1321 2.02341 11.205 2.14475L19.4035 16.3826C19.4676 16.4925 19.5011 16.6177 19.5005 16.7449C19.4998 16.8722 19.465 16.997 19.3997 17.1063ZM9.75003 11.5001V7.75006C9.75003 7.55115 9.82905 7.36038 9.9697 7.21973C10.1104 7.07908 10.3011 7.00006 10.5 7.00006C10.6989 7.00006 10.8897 7.07908 11.0304 7.21973C11.171 7.36038 11.25 7.55115 11.25 7.75006V11.5001C11.25 11.699 11.171 11.8897 11.0304 12.0304C10.8897 12.171 10.6989 12.2501 10.5 12.2501C10.3011 12.2501 10.1104 12.171 9.9697 12.0304C9.82905 11.8897 9.75003 11.699 9.75003 11.5001ZM11.625 14.8751C11.625 15.0976 11.559 15.3151 11.4354 15.5001C11.3118 15.6851 11.1361 15.8293 10.9305 15.9144C10.725 15.9996 10.4988 16.0219 10.2806 15.9784C10.0623 15.935 9.86187 15.8279 9.70453 15.6706C9.5472 15.5132 9.44005 15.3128 9.39665 15.0945C9.35324 14.8763 9.37552 14.6501 9.46066 14.4445C9.54581 14.239 9.69001 14.0633 9.87501 13.9397C10.06 13.816 10.2775 13.7501 10.5 13.7501C10.7984 13.7501 11.0845 13.8686 11.2955 14.0796C11.5065 14.2905 11.625 14.5767 11.625 14.8751Z" fill="#030036" fill-opacity="0.74"/>
                    </svg>
                    <p className="text-center">Are you sure you want to remove this user?</p>
                </div>
                <div className="px-4 w-full border-t h-[3.5rem] mt-[2px] flex items-center">
                    <button className="bg-main w-full text-sm text-center py-2 outline-none rounded text-white font-[500]">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}





function UserAccordion({ data }: { data: any }) {

    const [active, setActive] = useState(false);
    const [ modal,setModal ] = useState(false);

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
                <h1 className="text-primary w-[15rem] ">{data.type}</h1>

                <div onClick={() => setActive(!active)}
                    className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
                    cursor-pointer ${!active ? "rotate-180" : ""}`}
                >
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z" fill="#030036" fillOpacity="0.74" />
                    </svg>

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
                            <span className="text-gray-400">Role: </span>
                            <span>Add</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setModal(true)}
                        className="text-red-600 flex space-x-2 items-center hover:shadow px-2 py-1 rounded">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.66658 2.83333H8.33325C8.33325 2.47971 8.19278 2.14057 7.94273 1.89052C7.69268 1.64048 7.35354 1.5 6.99992 1.5C6.6463 1.5 6.30716 1.64048 6.05711 1.89052C5.80706 2.14057 5.66658 2.47971 5.66658 2.83333ZM4.66659 2.83333C4.66659 2.52692 4.72694 2.2235 4.8442 1.94041C4.96146 1.65731 5.13333 1.40009 5.35 1.18342C5.56667 0.966748 5.8239 0.794875 6.10699 0.677614C6.39008 0.560353 6.6935 0.5 6.99992 0.5C7.30634 0.5 7.60975 0.560353 7.89285 0.677614C8.17594 0.794875 8.43316 0.966748 8.64983 1.18342C8.8665 1.40009 9.03838 1.65731 9.15564 1.94041C9.2729 2.2235 9.33325 2.52692 9.33325 2.83333H13.1666C13.2992 2.83333 13.4264 2.88601 13.5201 2.97978C13.6139 3.07355 13.6666 3.20073 13.6666 3.33333C13.6666 3.46594 13.6139 3.59312 13.5201 3.68689C13.4264 3.78066 13.2992 3.83333 13.1666 3.83333H12.2866L11.5066 11.9073C11.4468 12.526 11.1586 13.1002 10.6984 13.5179C10.2381 13.9356 9.63879 14.1669 9.01725 14.1667H4.98258C4.36116 14.1667 3.76199 13.9354 3.30188 13.5177C2.84178 13.1 2.55374 12.5259 2.49392 11.9073L1.71325 3.83333H0.833252C0.700644 3.83333 0.573467 3.78066 0.479698 3.68689C0.38593 3.59312 0.333252 3.46594 0.333252 3.33333C0.333252 3.20073 0.38593 3.07355 0.479698 2.97978C0.573467 2.88601 0.700644 2.83333 0.833252 2.83333H4.66659ZM5.99992 6C5.99992 5.86739 5.94724 5.74022 5.85347 5.64645C5.7597 5.55268 5.63253 5.5 5.49992 5.5C5.36731 5.5 5.24013 5.55268 5.14637 5.64645C5.0526 5.74022 4.99992 5.86739 4.99992 6V11C4.99992 11.1326 5.0526 11.2598 5.14637 11.3536C5.24013 11.4473 5.36731 11.5 5.49992 11.5C5.63253 11.5 5.7597 11.4473 5.85347 11.3536C5.94724 11.2598 5.99992 11.1326 5.99992 11V6ZM8.49992 5.5C8.63253 5.5 8.7597 5.55268 8.85347 5.64645C8.94724 5.74022 8.99992 5.86739 8.99992 6V11C8.99992 11.1326 8.94724 11.2598 8.85347 11.3536C8.7597 11.4473 8.63253 11.5 8.49992 11.5C8.36731 11.5 8.24013 11.4473 8.14637 11.3536C8.0526 11.2598 7.99992 11.1326 7.99992 11V6C7.99992 5.86739 8.0526 5.74022 8.14637 5.64645C8.24013 5.55268 8.36731 5.5 8.49992 5.5ZM3.48925 11.8113C3.52521 12.1824 3.69808 12.5268 3.97416 12.7774C4.25025 13.028 4.60975 13.1667 4.98258 13.1667H9.01725C9.39009 13.1667 9.74959 13.028 10.0257 12.7774C10.3018 12.5268 10.4746 12.1824 10.5106 11.8113L11.2826 3.83333H2.71725L3.48925 11.8113Z" fill="#F1350C" />
                        </svg>

                        <span>Remove user</span>
                    </button>
                    {
                        modal && <DeleteUserModal {...{modal,setModal}}/>
                    }
                </div>
            }
        </div>

    );
}



export default function UserLevels() {
    const [modal, setModal] = useState<boolean>(false);
    const toggleModal = (): void => setModal(!modal);

    return (
        <div className="mt-2">
            <AddUserModal {...{ modal, setModal }} />
            
            <div className="flex items-center justify-between ">
                <h1 className="text-xl text-primary">User Levels</h1>
                <button
                    onClick={toggleModal}
                    className="cursor-pointer w-7 h-7 rounded-full bg-main flex items-center justify-center">
                    <PlusIcon fill="white" />
                </button>
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
