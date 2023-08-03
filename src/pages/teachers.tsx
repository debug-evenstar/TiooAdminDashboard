import Header from "../components/header"
import SearchBar from "../components/searchBar"
import FilterPanel from "../components/filterPanel"
import PaginatedList from "../components/paginatedList/paginatedList";
import { IListProps } from "../components/list/list";
import { TMenuProps } from "../components/menu/menu";
import { useState } from "react";


export default function Teachers() {
  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];



  const data: IListProps[] = [
    { name: "David Jones",      email: "Praiseike123@gmail.com", subscription: true },
    { name: "Chris Michael",    email: "Praiseike123@gmail.com", subscription: false },
    { name: "Joshua Karl",      email: "Praiseike123@gmail.com", subscription: true },
    { name: "HJohn Brandson",   email: "Praiseike123@gmail.com", subscription: false },
    { name: "Brad Montiago",    email: "Praiseike123@gmail.com", subscription: true },
    { name: "Josh Smith",       email: "Praiseike123@gmail.com", subscription: false },
    { name: "Michael Jordan",   email: "Praiseike123@gmail.com", subscription: true },
    { name: "Some Weird Name",  email: "Praiseike123@gmail.com", subscription: false },
    { name: "And another Name", email: "Praiseike123@gmail.com", subscription: true },
  ];

  const menuList: TMenuProps[] = [
    { id: 1, name: 'Show User' },
    { id: 2, name: 'Goto Dashboard' },
    { id: 3, name: 'Check out stuff' },
  ];

  const [ rows, setRows ] = useState<IListProps[]>(data);

  return (
    <div>
      <Header title="Manage Teachers" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar variant="normal" className="w-[24rem]" name="schools" placeholder="Search Teachers" />
          <FilterPanel {...{data,setRows,panels}} />
        </div>
        <div>
          <PaginatedList menuList={menuList} dataPerPage={5} data={rows} />
        </div>
        <div className="py-20"></div>
      </div>
    </div>
  )
}
