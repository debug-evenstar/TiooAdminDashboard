import FilterPanel from "../components/filterPanel"
import Header from "../components/header"
import SearchBar from "../components/searchBar"
export default function Schools() {
  const panels: string[] = [
    'All','Recently Joined','Active'
  ];
  return (
    <div>
      <Header title="Manage Schools" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar className="" name="schools" placeholder="Search Schools"/>
          <FilterPanel panels={panels}/>
        </div>
      </div>
    </div>)
}
