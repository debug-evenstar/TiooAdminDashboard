import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import Header from "../../components/header"
import SearchBar from "../../components/searchBar";
import axiosInstance from "../../services/api";

export type TCategoryCardProps = { title?: string, name?: string, value?: number };
type TOptionProps = {
  id: number, name: string,
}


type TLessonError = {
  class?: string,
  age?: string,
  name?: string,
  description?: string,
}

function OptionsMenu({ selection, setSelection, options }: { selection: number, setSelection: any, options: TOptionProps[] }) {
  const [active, setActive] = useState(false);

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {

  }

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute('data-value');
    if(value){

      const id: number  = Number.parseInt(value);
      setSelection(id);
    }
  }

  return (
    <>
      <div onClick={() => setActive(!active)} className="mt-2 cursor-pointer  outline-none rounded w-[21.9rem] px-3 py-2 border flex justify-end">
        <div
          className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
              cursor-pointer ${!active && "rotate-180"}`}
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z" fill="#030036" fillOpacity="0.74" />
          </svg>

        </div>
      </div>
      {active &&
        <div className="absolute bg-white p-4 shadow w-[21.9rem] z-[50]">
          <ul className="">
            {
              options.map((option, index) => (
                <li key={index} onClick={handleClick} data-value={option.id} className="flex items-center mb-2 cursor-pointer2 space-x-3 shadow p-2">
                  <input onChange={handleCheckChange} type="checkbox" checked={option.id === selection} className=" w-4 h-4 rounded-full outline-none" />
                  <span>{option.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </>
  );
}

const classOptions = [
  { id: 1, name: 'primary 1' },
  { id: 2, name: 'primary 2' },
  { id: 3, name: 'primary 3' },
  { id: 4, name: 'primary 4' },
];

const ageOptions = [
  { id: 1, name: "1 - 5" },
  { id: 2, name: "6 - 8" },
  { id: 3, name: "9 - 11" },
  { id: 4, name: "12 - 18" },
];

function AddLessonModal({ modal, setModal }: { modal: boolean, setModal: (state: boolean) => void }) {

  const [formData, setFormData] = useState<{ name: string, description: string }>({
    name: '',
    description: '',
  })

  const [klass, setClass] = useState<number>(1);
  const [age, setAge] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validate = () => {
    const newErrors: TLessonError = {};

    return newErrors;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // const newErrors = validate();
    // if (Object.keys(newErrors).length === 0) {
    //   setErrors({});
    //   const payload = { campaign, code, status, amount, users };

    // } else {
    //   setErrors(newErrors);
    //   setLoading(false);
    // }
  }

  return (
    <div className={`fixed text-primary z-[90] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
      <div className={`${modal ? "translate-y-[3rem]" : "translate-y-0"} z-[100] bg-white rounded duration-1000 h-[530px] w-[380px] mx-auto `}>
        <div className="p-2 border-b px-4 flex items-center justify-between">
          <h1>Add Lesson Material</h1>
          <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
        </div>
        <div onSubmit={handleSubmit}>
          <div className=" px-4 mt-4 h-[25.9rem] overflow-y-auto">
            <div className="text-xs mb-3">
              <label htmlFor="" className="text-sm">Class</label>
              <OptionsMenu selection={klass} options={classOptions} setSelection={setClass} />
              {/* <p className="text-red-500 mt-1">{errors?.users}</p> */}
            </div>

            <div className="text-xs mb-3">
              <label htmlFor="" className="text-sm">Age</label>
              <OptionsMenu selection={age} options={ageOptions} setSelection={setAge} />
              {/* <p className="text-red-500 mt-1">{errors?.users}</p> */}
            </div>

            <div className="text-xs mb-3">
              <label htmlFor="" className="text-sm">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" />
              {/* <p className="text-red-500 mt-1">{errors?.campaign}</p> */}
            </div>
            <div className="text-xs mb-3">
              <label htmlFor="" className="text-sm">Description</label>
              <textarea rows={4} style={{ resize: "none" }} name="description" value={formData.description} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" />
              {/* <p className="text-red-500 mt-1">{errors?.code}</p> */}
            </div>
            <div className="flex flex-col">
              <UploadFile />
              <span className="text-xs mt-[2px] text-gray-500">Your attached file should be in PDF or Word Format</span>
            </div>

          </div>
          <div className="px-4 w-full h-[3rem] mt-[2px] flex border-t items-center">
            <button onClick={handleSubmit} className="bg-main focus:shadow-lg outline-none w-full text-sm text-center py-1.5 rounded text-white font-[500]">
              {
                loading ?
                  <div className="w-6 h-6 mx-auto rounded-full border-2 border-gray-400 border-r-gray-100 animate-spin"></div>
                  :
                  <span>
                    Upload
                  </span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}












function CategoryCard({ title, name, value }: TCategoryCardProps) {
  return (
    <div className="flex mb-5 flex-col justify-between hover:bg-light cursor-pointer w-full h-[140px] rounded-[8px] shadow border">
      <div className="w-full p-3 h-[65%]">
        <h1 className="w-[60%] text-lg">{title}</h1>
      </div>
      <div className="w-full relative border-t border-gray-300 flex items-center px-3 text-gray-400 justify-between h-[35%]">
        <h2>{value} {name}</h2> <div className="w-2 h-2 rounded-full bg-main"></div>
      </div>
    </div>
  );
}

function Categories() {
  const categories: TCategoryCardProps[] = [
    { title: "Student's Curricula", name: "Subjects", value: 52 },
    { title: "Co-Curricula Content", name: "Subjects", value: 15 },
    { title: "Games", name: "Games", value: 12 },
  ];

  return (
    <div className="w-[22%] overflow-y-auto h-[calc(100vh_-_80px)] p-4 border-l">
      <div className="py-2">
        <h1 className="font-[400] text-primary">Categories</h1>
      </div>
      <div className="mt-4">
        {
          categories.map((catProps, index) => (
            <CategoryCard key={index} {...catProps} />
          ))
        }
      </div>
    </div>

  );
}

export type TLessonCardProps = { title: string, color?: string, description: string, date: string };

function LessonsCard({ color, title, description, date }: TLessonCardProps) {
  return (
    // <div className="w-[260px] border h-[175px] flex flex-col justify-between rounded-[8px]">
    <div className="w-full border h-[175px] flex flex-col justify-between rounded-[8px]">
      <div className={`${color} h-[110px] p-3 text-left text-white rounded-t-[8px]`}>
        <h1 className="font-[500] text-lg">{title}</h1>
        <p className="mt-3 text-xs">{description}</p>
      </div>
      <span className="px-5 text-xs text-gray-400 py-3">
        uploaded {date} ago
      </span>
    </div>
  );
}
function AllLessons() {
  const lessons: TLessonCardProps[] = [
    { title: "Public Speaking", description: "Learn conversation skills and develop strong relationship with others", date: "5 days" },
    { title: "Budgeting", description: "Learn money management skills and the value of money.", date: "10 days" },
    { title: "Entrepreneurship", description: "Explore and discover personal strengths and areas for development", date: "two weeks" },
  ];

  const colors: string[] = [
    'bg-[#AE1E56]',
    'bg-[#86A94B]',
    'bg-[#776DB4]',
  ];

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="w-[78%] overflow-y-auto max-h-[calc(100vh_-_95px)] px-[24px]">
      <AddLessonModal {...{ modal, setModal }} />
      <div className="flex items-center justify-between py-7">
        <h1 className="text-primary text-lg">All Lessons</h1>
        <SearchBar className="w-[23rem] " name="search-lesson" placeholder="Search" variant="normal" />
      </div>
      <div className="grid gap-x-2 grid-cols-3">
        {
          lessons.map((lessonProp, index) => (
            <LessonsCard key={index} {...lessonProp} color={colors[index]} />
          ))
        }
      </div>
      <div className="mt-5">
        <button
          onClick={() => setModal(!modal)}
          className="w-[221px] h-[170px] px-[52px] py-[35px] border shadow rounded-[8px]
            flex items-center justify-center flex-col text-main">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 8C32.822 8 40 15.178 40 24C40 32.822 32.822 40 24 40C15.178 40 8 32.822 8 24C8 15.178 15.178 8 24 8ZM24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM34 22H26V14H22V22H14V26H22V34H26V26H34V22Z" fill="#4F46E5" />
          </svg>
          <p className="text-center font-[500]">Add a lesson material</p>
        </button>
      </div>
    </div>
  );
}


function UploadFile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file || null);
  }

  const handleUpload = () => {
    fileRef.current && fileRef.current.click();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axiosInstance.post('/upload', formData)
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  }

  return (
    <>
      <input className="hidden" ref={fileRef} type="file" onChange={handleFileSelect} accept=".pdf, .doc, .docx" />
      <button onClick={handleUpload} className="text-main outline-none flex items-center w-[120px] text-sm h-[30px] border border-main px-3 space-x-2 py-2 rounded-full ">
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 16.5C3.60606 16.5 2.42424 16.0733 1.45455 15.22C0.484848 14.3667 0 13.3267 0 12.1V3.7C0 2.82 0.356061 2.06667 1.06818 1.44C1.7803 0.813333 2.63636 0.5 3.63636 0.5C4.63636 0.5 5.49242 0.813333 6.20455 1.44C6.91667 2.06667 7.27273 2.82 7.27273 3.7V11.3C7.27273 11.86 7.05303 12.3333 6.61364 12.72C6.17424 13.1067 5.63636 13.3 5 13.3C4.36364 13.3 3.82576 13.1067 3.38636 12.72C2.94697 12.3333 2.72727 11.86 2.72727 11.3V3.7H4.09091V11.3C4.09091 11.5267 4.17818 11.7168 4.35273 11.8704C4.52727 12.024 4.74303 12.1005 5 12.1C5.25758 12.1 5.47364 12.0232 5.64818 11.8696C5.82273 11.716 5.9097 11.5261 5.90909 11.3V3.7C5.90909 3.14 5.68939 2.66667 5.25 2.28C4.81061 1.89333 4.27273 1.7 3.63636 1.7C3 1.7 2.46212 1.89333 2.02273 2.28C1.58333 2.66667 1.36364 3.14 1.36364 3.7V12.1C1.36364 12.98 1.7197 13.7333 2.43182 14.36C3.14394 14.9867 4 15.3 5 15.3C6 15.3 6.85606 14.9867 7.56818 14.36C8.2803 13.7333 8.63636 12.98 8.63636 12.1V3.7H10V12.1C10 13.3267 9.51515 14.3667 8.54545 15.22C7.57576 16.0733 6.39394 16.5 5 16.5Z" fill="#4F46E5" />
        </svg>
        <span>Upload file</span>
      </button>
    </>
  );
}

export default function Library() {
  return (
    <div>
      <Header title="Library" />
      <div className="flex h-full overflow-y-auto  text-primary h-[calc(100vh_-_95px)]">
        <AllLessons />
        <Categories />
      </div>
    </div>
  )
}
