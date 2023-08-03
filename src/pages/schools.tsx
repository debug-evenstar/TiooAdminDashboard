import { useState } from "react";
import FilterPanel from "../components/filterPanel"
import Header from "../components/header"
import { IListProps } from "../components/list/list";
import { TMenuProps } from "../components/menu/menu";
import PaginatedList from "../components/paginatedList/paginatedList";
import SearchBar from "../components/searchBar"
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

  const menuList: TMenuProps[] = [
    { id: 1, name: 'Show User' },
    { id: 2, name: 'Goto Dashboard' },
    { id: 3, name: 'Check out stuff' },
  ];

  const [rows, setRows ] = useState<IListProps[]>(data);

  return (
    <div>
      <Header title="Manage Schools" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar className="w-[24rem]" name="schools" placeholder="Search Schools" />
          <FilterPanel {...{data,setRows,panels}} />
        </div>
        <div>
          <PaginatedList menuList={menuList} dataPerPage={5} data={rows} />
        </div>
        <div className="py-20"></div>
      </div>
    </div>)
}
