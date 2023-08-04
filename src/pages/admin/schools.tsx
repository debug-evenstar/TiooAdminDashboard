import { useState } from "react";
import FilterPanel from "../../components/filterPanel"
import Header from "../../components/header"
import { IListProps } from "../../components/list/list";
import PaginatedList from "../../components/paginatedList/paginatedList";
import SearchBar from "../../components/searchBar"
import { NavLink } from "react-router-dom";


function SchoolContextMenu(): JSX.Element {
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


export default function Schools() {

  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];


  const data: IListProps[] = [
    { name: "Flowinton Montessori Schools", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Ruby International schools", email: "Praiseike123@gmail.com", subscription: false },
    { name: "Imaobong group of schools", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Hope Waddell", email: "Praiseike123@gmail.com", subscription: false },
    { name: "Saint Johns", email: "Praiseike123@gmail.com", subscription: true },
    { name: "McGuyvre Schools", email: "Praiseike123@gmail.com", subscription: false },
    { name: "United Children Stand", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Some Weird School", email: "Praiseike123@gmail.com", subscription: false },
    { name: "And another School ", email: "Praiseike123@gmail.com", subscription: true },
  ];

  const [rows, setRows] = useState<IListProps[]>(data);

  return (
    <div>
      <Header title="Manage Schools" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar className="w-[24rem]" name="schools" placeholder="Search Schools" />
          <FilterPanel {...{ data, setRows, panels }} />
        </div>
        <div>
          <PaginatedList menu={<SchoolContextMenu />} dataPerPage={5} data={rows} />
        </div>
        <div className="py-20"></div>
      </div>
    </div>)
}
