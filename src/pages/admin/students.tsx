import Header from "../../components/header"
import SearchBar from "../../components/searchBar"
import FilterPanel from "../../components/filterPanel"
import { IListProps } from "../../components/list/list"
import PaginatedList from "../../components/paginatedList/paginatedList";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { TStudentsProps, setStudents } from "../../redux/slices/student";
import axiosInstance from "../../services/api";
import { Load } from "../../components/loader/loader";

function StudentContextMenu(): JSX.Element {
  const menuData = [
    { route: '/students/profile', name: 'View Student Profile' },
    { route: '/students/dashboard', name: 'View Student Profile' },
  ];
  return (
    <div className={`py-5 text-[#030036] l-0 text-sm text-left z-[10000] border bg-white w-fit rounded-[8px] shadow-lg`}>
      <ul>
        {
          menuData.map((menu) => (
            <NavLink to={menu.route}>
              <li className="cursor-pointer py-3 px-8 mr-2 hover:bg-light">{menu.name}</li>
            </NavLink>
          ))
        }
      </ul>
    </div>
  );
}

export default function Students() {
  /**
   *  Students Page Component
   *  List out the students and show their status
   * 
   *  First try to render the list using the students located in the store.
   *  When the updated students are fetched from the api,
   *  call the updateStudents fxn after dispatching an update to the students reducer state
   *  the updateStudents fxn receives a students parameter
   *  At the first instance of calling updateStudents: Pass in the inital Students (RootState)
   *  At the second instance: Pass in the students response from the api (respone.data.data)
   *  
   */

  const [studentsData, setStudentsData] = useState<IListProps[]>([]);
  const [rows, setRows] = useState<IListProps[]>([]);
  // const [selectedRow, setSelectedRow] = useState('')
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const students = useSelector((state: RootState) => state.student.students);

  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];

  // const getSelectedSchool = (id: string): void => {
  //   setSelectedRow(id)
  // }

  if (studentsData.length > 0 && loading) {
    setLoading(false);
  }

  const updateStudents = (newStudents: any) => {
    const parsedList: IListProps[] = newStudents.map((student: TStudentsProps) => ({
      name: student.name,
      email: student.email,
      subscription: student.status === 'registered',
      id: student.Student.id
    }))

    setStudentsData(parsedList);
    setRows(parsedList);
  }
  
  useEffect(() => {
    
    updateStudents(students);

    console.log("getting students again");
    axiosInstance.get('https://api.hellotioo.com/students/readall')
      .then(response => {
        dispatch(setStudents(response.data.data))
        updateStudents(response.data.data);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <div>
      <Header title="Manage Students" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar items={studentsData} setRows={setRows} className="w-[24rem]" name="students" variant="" placeholder="Search Students" />
          <FilterPanel {...{ data: studentsData, setRows, panels }} />
        </div>
        <div>
          {loading ?
            <div className="w-full mt-40 flex justify-center ">
              <Load />
            </div>
            :
            <PaginatedList
              menu={<StudentContextMenu  />}
              dataPerPage={10}
              data={rows}
              selectRow={() => null}
            />
          }
        </div>
        <div className="py-20"></div>
      </div>
    </div>)
}
