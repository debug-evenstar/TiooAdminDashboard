import Header from "../../components/header"
import SearchBar from "../../components/searchBar"
import FilterPanel from "../../components/filterPanel"
import { IListProps } from "../../components/list/list"
import PaginatedList from "../../components/paginatedList/paginatedList";

import { useState } from "react";
import { NavLink } from "react-router-dom";



function FreelancerContextMenu(): JSX.Element {
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

export default function Freelancers() {
  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];



  const data: IListProps[] = [
    { name: "David Jones", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Chris Michael", email: "Praiseike123@gmail.com", subscription: false },
    { name: "Joshua Karl", email: "Praiseike123@gmail.com", subscription: true },
    { name: "HJohn Brandson", email: "Praiseike123@gmail.com", subscription: false },
    { name: "Brad Montiago", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Josh Smith", email: "Praiseike123@gmail.com", subscription: false },
    { name: "Michael Jordan", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Some Weird Name", email: "Praiseike123@gmail.com", subscription: false },
    { name: "And another Name", email: "Praiseike123@gmail.com", subscription: true },
  ];

  const [rows, setRows] = useState<IListProps[]>(data);
  return (
    <div>
      <Header title="Manage Freelancers" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar variant="normal" className="w-[24rem]" name="schools" placeholder="Search Freelancers" />
          <FilterPanel {...{ data, setRows, panels }} />
        </div>
        <div>
          <PaginatedList menu={<FreelancerContextMenu />} dataPerPage={5} data={rows} selectRow={() => false}/>
        </div>
        <div className="py-20"></div>
      </div>
    </div>
  )
}
