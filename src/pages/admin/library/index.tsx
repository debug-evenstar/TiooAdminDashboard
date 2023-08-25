import { ChangeEvent, FormEvent, MouseEvent, Suspense, useEffect, useRef, useState } from "react";
import Header from "../../../components/header";
import axiosInstance from "../../../services/api";
import LibrarySchoolsCurricula from "../../../components/librarySchools/librarySchools";
import LibraryCoCurricula from "../../../components/libraryCocurricula/libraryCocurricula";
import LibraryGames from "../../../components/libraryGames/libraryGames";


type TOptionProps = {
  id: number, name: number | string,
}

function OptionsMenu({ selection, setSelection, options }: { selection: number[], setSelection: any, options: TOptionProps[] }) {
  const [active, setActive] = useState(false);


  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute('data-value');
    if (value) {
      const id: number = Number.parseInt(value);
      if (!selection.includes(id))
        setSelection([...selection, id]);
      else {
        setSelection(selection.filter((number: number) => number != id));
      }
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
        <div className="bg-white p-4 shadow w-[21.9rem] z-[50]">
          <ul className="">
            {
              options.map((option, index) => (
                <li key={index} onClick={handleClick} data-value={option.id} className="flex items-center cursor-pointer space-x-3 py-1">
                  <input type="checkbox" checked={selection.includes(option.id)} onChange={() => null} className=" w-4 h-4 rounded-full outline-none" />
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

type classOptionProps = {
  SchoolManagementId: number;
  id: number;
  naming: string;
  type: string;
}

type TLibraryModalError = {
  name?: string;
  class?: string;
  age?: string;
  description?: string;
  file?: string;
}

const ageOptions = [...Array(18 - 5 + 1)].map(((_, index) => ({ id: index + 5, name: index + 5 })));

export function AddLessonModal({ modal, setModal }: { modal: boolean, setModal: (state: boolean) => void }) {

  const [klass, setClass] = useState<number[]>([]);
  const [age, setAge] = useState<number[]>([]);
  const [errors, setErrors] = useState<TLibraryModalError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [classOptions, setClassOptions] = useState<classOptionProps[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // probably wanted to try something sha
  const [formData, setFormData] = useState<{ name: string, description: string }>({
    name: '',
    description: '',
  });

  useEffect(() => {
    axiosInstance.get('https://api.hellotioo.com/tio/classes')
      .then((response) => {
        setClassOptions(response.data.data);
      })
      .catch((error => console.log(error)))
  }, []);




  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    if (name == 'age') {
      value = value.replace(/\D/g, '');
    }
    setFormData({
      ...formData,
      [name]: value
    })
  }



  const validate = () => {
    const newErrors: TLibraryModalError = {};
    if (!formData.name || formData.name.length == 0)
      newErrors.name = "Please Enter a valid title"

    if (klass.length == 0)
      newErrors.class = "Please select a class from the menu";

    if (age.length == 0)
      newErrors.age = "Please enter a valid age ";

    if (formData.description == '')
      newErrors.description = "Please fill in a description";

    if (!selectedFile)
      newErrors.file = "please select a file";

    if(selectedFile && selectedFile?.size > (50 * 1024 * 1024)) // 50mb
      newErrors.file = "File too large [max: 50mb]";

    return newErrors;
  }

  const sendRequest = () => {
    const payload = {
      naming: formData.name,
      class: klass,
      description: formData.description,
      age: age,
      size: selectedFile?.size
    }

    // axiosInstance.post('/management/classes/count')
    console.log(payload);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      sendRequest();
    } else {
      setErrors(newErrors);
      setLoading(false);
    }
  }

  return (
    <div className={`fixed text-primary z-[90] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
      <div className={`${modal ? "translate-y-[3rem]" : "translate-y-0"} z-[100] bg-white rounded duration-1000 h-[550px] w-[380px] mx-auto `}>
        <div className="p-2 border-b px-4 flex items-center justify-between">
          <h1>Add Lesson Material</h1>
          <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
        </div>
        <div onSubmit={handleSubmit}>
          <div className=" px-4 mt-4 h-[27.17rem] overflow-y-auto">

            <div className="text-sm mb-3">
              <label htmlFor="" className="text-sm">Lesson title</label>
              <input type="text" name="name" value={formData.name} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" />
              <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
            </div>
            <div className="text-sm mb-3">
              <label htmlFor="" className="text-sm">Class</label>
              <OptionsMenu selection={klass} options={classOptions.map((item) => ({ id: item.id, name: item.naming }))} setSelection={setClass} />
              <p className="text-red-500 text-xs mt-1">{errors?.class}</p>
            </div>

            <div className="text-sm mb-3">
              <label htmlFor="" className="text-sm">Age</label>
              <OptionsMenu selection={age} options={ageOptions} setSelection={setAge} />
              {/* <input type="text" name="age" value={formData.age} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" /> */}
              <p className="text-red-500 text-xs mt-1">{errors?.age}</p>
            </div>


            <div className="text-sm mb-3">
              <label htmlFor="" className="text-sm">Description</label>
              <textarea rows={3} style={{ resize: "none" }} name="description" value={formData.description} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" />
              <p className="text-red-500 text-xs mt-1">{errors?.description}</p>
            </div>
            <div className="flex flex-col">
              <UploadFile {...{ selectedFile, setSelectedFile }} />
              <p className="text-red-500 text-xs mt-1">{errors?.file}</p>
              {selectedFile &&
                <div className="text-main flex items-center space-x-2">
                  <span className="text-xs">{selectedFile.name}</span>
                  <button onClick={() => setSelectedFile(null)} className="text-red-500">&times;</button>
                </div>
              }
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





function UploadFile({ selectedFile, setSelectedFile }: { selectedFile: File | null, setSelectedFile: any }) {

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files?.[0];
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
      <div className="mt-4 h-full w-full text-primary pl-10">
        <LibraryTabs />
      </div>
    </div>
  )
}

const tabs: any[] = [
  { name: "Schools Curricular", component: <LibrarySchoolsCurricula /> },
  { name: "Co-curricula content", component: <LibraryCoCurricula /> },
  { name: "Games", component: <LibraryGames /> },
];

function LibraryTabs() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <ul className="border-b w-full flex space-x-4">
        {
          tabs.map((tab, key) => (
            <li
              key={key}
              onClick={() => setActive(key)}
              className={`py-2 pb-1 duration-300 rounded-t hover:text-gray-500 hover:bg-[#5A51E618] cursor-pointer px-4  border-b-2 ${(key == active) ? " text-[#5A51E6] border-[#5A51E6] font-[500]" : "text-gray-400 border-white"}`}>
              {tab.name}
            </li>
          ))
        }
      </ul>
      <div className="mt-14 text-gray-600 pr-10">
        <Suspense fallback={<h1>Loading</h1>}>
          {tabs.map((tab, key) => (active === key ? <div key={key}>{tab.component}</div> : null))}
        </Suspense>
      </div>

    </div>
  )
}