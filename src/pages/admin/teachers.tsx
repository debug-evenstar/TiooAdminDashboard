import Header from "../../components/header"
import SearchBar from "../../components/searchBar"
import FilterPanel from "../../components/filterPanel"
import PaginatedList from "../../components/paginatedList/paginatedList";
import { IListProps } from "../../components/list/list";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/api";
import { Load } from "../../components/loader/loader";
import { TTeachersProps, setTeachers } from "../../redux/slices/teachers";

function TeacherContextMenu({selectedId}: any): JSX.Element {

  const menuData: { route: string, name: string }[] = [
    { route: `/teachers/profile/${selectedId}`, name: 'View Teacher Profile' },
    // { route: `/teachers/${selectedId}/home`, name: 'Enter Teacher Dashboard' },
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


export default function Teachers() {
  /**
   *  Teachers Page Component
   *  List out the teachers and show their status
   * 
   *  First try to render the list using the teachers located in the store.
   *  When the updated teachers are fetched from the api,
   *  call the updateTeachers fxn after dispatching an update to the teachers reducer state
   *  the updateTeachers fxn receives a teachers parameter
   *  At the first instance of calling updateTeachers: Pass in the inital Teachers (RootState)
   *  At the second instance: Pass in the teachers response from the api (respone.data.data)
   *  
   */

  const [teachersData, setTeachersData] = useState<IListProps[]>([]);
  const [rows, setRows] = useState<IListProps[]>([]);
  const [selectedRow, setSelectedRow] = useState('')
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const teachers = useSelector((state: RootState) => state.teacher.teachers);

  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];

  const getSelectedTeacher = (id: string): void => {
    setSelectedRow(id)
  }

  if (teachersData.length > 0 && loading) {
    setLoading(false);
  }

  const updateTeachers = (newTeachers: any) => {
    const parsedList: IListProps[] = newTeachers.map((teacher: TTeachersProps) => ({
      name: teacher.name,
      email: teacher.email,
      subscription: teacher.status === 'registered',
      id: teacher.id
    }))

    setTeachersData(parsedList);
    setRows(parsedList);
  }
  
  useEffect(() => {
    
    updateTeachers(teachers);

    console.log("getting teachers again");
    axiosInstance.get('https://api.hellotioo.com/teacher/readall')
      .then(response => {
        dispatch(setTeachers(response.data.data))
        updateTeachers(response.data.data);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <div>
      <Header title="Manage Teachers" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar items={teachersData} setRows={setRows} className="w-[24rem]" name="teachers" variant="" placeholder="Search Teachers" />
          <FilterPanel {...{ data: teachersData, setRows, panels }} />
        </div>
        <div>
          {loading ?
            <div className="w-full mt-40 flex justify-center ">
              <Load />
            </div>
            :
            <PaginatedList
              menu={<TeacherContextMenu  selectedId={selectedRow}/>}
              dataPerPage={10}
              data={rows}
              selectRow={getSelectedTeacher}
            />
          }
        </div>
        <div className="py-20"></div>
      </div>
    </div>
  );
}
