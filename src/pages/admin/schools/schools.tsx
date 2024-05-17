import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../../components/AppHeader";
import axiosInstance from "../../../services/api";
import SearchBar from "../../../components/searchBar";
import FilterPanel from "../../../components/filterPanel";
import { IListProps } from "../../../components/list/list";
import { TSchoolsProps, setSchools } from "../../../redux/slices/schools";
import PaginatedList from "../../../components/paginatedList/paginatedList";
import { Load } from "../../../components/loader/loader";
import { RootState } from "../../../redux/store";

function SchoolContextMenu({ selectedId }: any): JSX.Element {
  // custom school context menu for each school item
  const menuData: { route: string; name: string }[] = [
    { route: `/schools/profile/${selectedId}`, name: "View School Profile" },
    { route: `/schools/${selectedId}/home`, name: "Enter School Dashboard" },
  ];
  return (
    <div
      className={`py-5 text-primary l-0 text-sm text-left z-[1000] border bg-[#fff] w-fit rounded-[8px] shadow-lg`}
    >
      <ul>
        {menuData.map((menu, index) => (
          <Link to={menu.route} key={index}>
            <li className="cursor-pointer py-3 px-8 mr-2 hover:bg-light">
              {menu.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default function Schools() {
  /**
   *  Schools Page Component
   *  List out the schools and show their status
   *
   *  First try to render the list using the schools located in the store.
   *  When the updated schools are fetched from the api,
   *  call the updateSchools fxn after dispatching an update to the schools reducer state
   *  the updateSchools fxn receives a schools parameter
   *  At the first instance of calling updateSchools: Pass in the inital Schools (RootState)
   *  At the second instance: Pass in the schools response from the api (respone.data.data)
   *
   */

  const [schoolsData, setSchoolsData] = useState<IListProps[]>([]);
  const [rows, setRows] = useState<IListProps[]>([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const schools = useSelector(
    (state: RootState) => state.praise.school.schools
  );

  const panels: string[] = ["All", "Recently Joined", "Active"];

  const getSelectedSchool = (id: string): void => {
    setSelectedRow(id);
  };

  if (schoolsData.length > 0 && loading) {
    setLoading(false);
  }

  const updateSchools = (newSchools: any) => {
    const parsedList: IListProps[] = newSchools.map(
      (school: TSchoolsProps) => ({
        name: school.school.school_name,
        email: school.school.email,
        subscription: school.school.status === "active",
        id: school.school.id,
      })
    );

    setSchoolsData(parsedList);
    setRows(parsedList);
  };

  useEffect(() => {
    updateSchools(schools);

    axiosInstance
      .get("/schools")
      .then((response) => {
        dispatch(setSchools(response.data.data));
        updateSchools(response.data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header title="Manage Schools" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar
            items={schoolsData}
            setRows={setRows}
            className="w-[24rem]"
            name="schools"
            placeholder="Search Schools"
          />
          <FilterPanel {...{ data: schoolsData, setRows, panels }} />
        </div>
        <div>
          {loading ? (
            <div className="w-full mt-40 flex justify-center ">
              <Load />
            </div>
          ) : (
            <PaginatedList
              menu={<SchoolContextMenu selectedId={selectedRow} />}
              dataPerPage={10}
              data={rows}
              selectRow={getSelectedSchool}
            />
          )}
        </div>
        <div className="py-20"></div>
      </div>
    </div>
  );
}
