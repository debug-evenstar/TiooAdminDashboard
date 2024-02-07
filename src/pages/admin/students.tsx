import Header from "../../components/AppHeader"
import SearchBar from "../../components/searchBar"
import FilterPanel from "../../components/filterPanel"
import { IListProps } from "../../components/list/list"
import PaginatedList from "../../components/paginatedList/paginatedList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { TStudentsProps, setStudents } from "../../redux/slices/student";
import axiosInstance from "../../services/api";
import { Load } from "../../components/loader/loader";
import { BASE_URL } from "../../services/url";

function StudentContextMenu({ selectedId }: any): JSX.Element {
  // custom school context menu for each school item
  const menuData: { route: string, name: string }[] = [
    { route: `/students/profile/${selectedId}`, name: 'View Student Profile' },
    // { route: `/students/${selectedId}/home`, name: 'Enter Student Dashboard' },
  ];
  return (
    <div className={`py-5 text-primary l-0 text-sm text-left z-[1000] border bg-[#fff] w-fit rounded-[8px] shadow-lg`}>
      <ul>
        {
          menuData.map((menu, index) => (
            <Link to={menu.route} key={index}>
              <li className="cursor-pointer py-3 px-8 mr-2 hover:bg-light">{menu.name}</li>
            </Link>
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
  const [selectedRow, setSelectedRow] = useState('')
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const students = useSelector((state: RootState) => state.praise.student.students);

  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];

  const getSelectedStudent = (id: string): void => {
    setSelectedRow(id)
  }

  if (studentsData.length > 0 && loading) {
    setLoading(false);
  }

  const updateStudents = (newStudents: any) => {
    const parsedList: IListProps[] = newStudents.map((student: TStudentsProps) => ({
      name: student.name,
      email: student.email,
      subscription: student.status === 'registered',
      id: student.id
    }))

    setStudentsData(parsedList);
    setRows(parsedList);
  }

  useEffect(() => {

    updateStudents(students);
    axiosInstance.get(`${BASE_URL}/students/readall`)
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
              menu={<StudentContextMenu selectedId={selectedRow} />}
              dataPerPage={10}
              data={rows}
              selectRow={getSelectedStudent}
            />
          }
        </div>
        <div className="py-20"></div>
      </div>
    </div>)
}
