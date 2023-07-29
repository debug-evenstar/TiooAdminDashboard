import Header from "../components/header"
import SearchBar from "../components/searchBar"
import FilterPanel from "../components/filterPanel"
import { IListProps } from "../components/list/list"
import PaginatedList from "../components/paginatedList/paginatedList";


export default function Students() {
  const panels: string[] = [
    'All', 'Recently Joined', 'Active'
  ];



  const rows: IListProps[] = [
    { name: "David Jones", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Chris Michael", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Joshua Karl", email: "Praiseike123@gmail.com", subscription: true },
    { name: "HJohn Brandson", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Brad Montiago", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Josh Smith", email: "Praiseike123@gmail.com", subscription: false },
    { name: "Michael Jordan", email: "Praiseike123@gmail.com", subscription: true },
    { name: "Some Weird Name", email: "Praiseike123@gmail.com", subscription: false },
    { name: "And another Name", email: "Praiseike123@gmail.com", subscription: true },
  ];

  return (
    <div>
      <Header title="Manage Students" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar variant="normal" className="w-[24rem]" name="schools" placeholder="Search Schools" />
          <FilterPanel panels={panels} />
        </div>
        <div>
          <PaginatedList dataPerPage={5} data={rows} />
        </div>
        <div className="py-20"></div>
      </div>
    </div>
  )
}
