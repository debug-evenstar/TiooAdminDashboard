import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../components/header"
import axiosInstance from "../../services/api";
import SearchBar from "../../components/searchBar"
import FilterPanel from "../../components/filterPanel"
import { IListProps } from "../../components/list/list";
import { TSchoolsProps, setSchools } from "../../redux/slices/schools";
import PaginatedList from "../../components/paginatedList/paginatedList";
import { Load } from "../../components/loader/loader";



function SchoolContextMenu({ selectedId }: any): JSX.Element {
  // custom school context menu for each school item
  const menuData: { route: string, name: string }[] = [
    { route: `/schools/profile/${selectedId}`, name: 'View School Profile' },
    { route: `/schools/${selectedId}/home`, name: 'Enter School Dashboard' },
  ];
  return (
    <div className={`py-5 text-primary l-0 text-sm text-left z-[1000] border bg-white w-fit rounded-[8px] shadow-lg`}>
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



export default function Schools() {

  /**
   *  Schools Page
   *  List out the schools and show their status
   *  @param void
   */

  const [schools, setSchoolsState] = useState<IListProps[]>([]);
  const [rows, setRows] = useState<IListProps[]>([]);
  const [selectedRow, setSelectedRow] = useState('')
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch()

  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];

  const getSelectedSchool = (id: string): void => {
    setSelectedRow(id)
  }

  // updates the schools states and persist storage
  const updateSchoolsData = (newData: any) => {
    console.log("updating data");
    setSchoolsState(newData);
    setRows(newData);
    localStorage.setItem('schoolData', JSON.stringify(newData));
    setLoading(false);
  }

  useEffect(() => {

    const storedSchoolsData = localStorage.getItem('schoolData');

    if (storedSchoolsData) {
      console.log("restoring data");
      const parsedData = JSON.parse(storedSchoolsData);
      setSchoolsState(parsedData);
      setLoading(false);
    }
    
    axiosInstance.get('/schools')
      .then(response => {
        dispatch(setSchools(response.data.data))
        const parsedList: IListProps[] = response.data.data.map((school: TSchoolsProps) => ({
          name: school.school.school_name,
          email: school.school.email,
          subscription: school.school.status === 'active',
          id: school.school.id
        }))
        // console.log(response.data.data);
        updateSchoolsData(parsedList);

      })
      .catch(error => console.log(error))
  }, []);





  return (
    <div>
      <Header title="Manage Schools" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar items={schools} setRows={setRows} className="w-[24rem]" name="schools" placeholder="Search Schools" />
          <FilterPanel {...{ schools, setRows, panels }} />
        </div>
        <div>
          {loading ?
            <div className="w-full mt-40 flex justify-center ">
              <Load/>
            </div>
            :
            <PaginatedList
              menu={<SchoolContextMenu selectedId={selectedRow} />}
              dataPerPage={10}
              data={rows}
              selectRow={getSelectedSchool}
            />
          }
        </div>
        <div className="py-20"></div>
      </div>
    </div>)
}
