import { useEffect, useState } from "react";
import FilterPanel from "../../components/filterPanel"
import Header from "../../components/header"
import { IListProps } from "../../components/list/list";
import PaginatedList from "../../components/paginatedList/paginatedList";
import SearchBar from "../../components/searchBar"
import { Link } from "react-router-dom";
import axiosInstance from "../../services/api";
import { TSchoolsProps, setSchools } from "../../redux/slices/schools";
import { useDispatch } from "react-redux";



function SchoolContextMenu({ selectedId }: any): JSX.Element {
  const menuData: { route: string, name: string }[] = [
    { route: `/schools/profile/${selectedId}`, name: 'View School Profile' },
    { route: `/schools/${selectedId}`, name: 'Enter School Dashboard' },
  ];
  return (
    <div className={`py-5 text-[#030036] l-0 text-sm text-left z-[10000] border bg-white w-fit rounded-[8px] shadow-lg`}>
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

  const [schools, setSchoolsState] = useState<IListProps[]>([]);
  const [rows, setRows] = useState<IListProps[]>([]);
  const [selectedRow, setSelectedRow] = useState('')

  const dispatch = useDispatch()

  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];

  const getSelectedSchool = (id: string): void => {
    setSelectedRow(id)
  }

  useEffect(() => {
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
        setSchoolsState(parsedList.reverse());
        // parsed list already reversed here
        setRows(parsedList);
      })
      .catch(error => console.log(error))
  }, []);





  return (
    <div>
      <Header title="Manage Schools" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar className="w-[24rem]" name="schools" placeholder="Search Schools" />
          <FilterPanel {...{ schools, setRows, panels }} />
        </div>
        <div>
          <PaginatedList menu={<SchoolContextMenu selectedId={selectedRow} />} dataPerPage={10} data={rows} selectRow={getSelectedSchool} />
        </div>
        <div className="py-20"></div>
      </div>
    </div>)
}
