import Header from "@/components/AppHeader";
import SearchBar from "@/components/searchBar";
import FilterPanel from "@/components/filterPanel";
import { IListProps } from "@/components/list/list";
import PaginatedList from "@/components/paginatedList/paginatedList";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance} from "@/api/request";
import { Load } from "@/components/loader/loader";
import {
  TFreelancersProps,
  setFreelancers,
} from "@/redux/slices/freelancer";

function FreelancerContextMenu({ selectedId }: any): JSX.Element {
  const menuData: { route: string; name: string }[] = [
    {
      route: `/freelancers/profile/${selectedId}`,
      name: "View Freelancer Profile",
    },
    // { route: `/students/${selectedId}/home`, name: 'Enter Student Dashboard' },
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
export default function Freelancers() {
  /**
   *  Freelancers Page Component
   *  List out the freelancers and show their status
   *
   *  First try to render the list using the freelancers located in the store.
   *  When the updated freelancers are fetched from the api,
   *  call the updateFreelancers fxn after dispatching an update to the freelancers reducer state
   *  the updateFreelancers fxn receives a freelancers parameter
   *  At the first instance of calling updateFreelancers: Pass in the inital Freelancers (RootState)
   *  At the second instance: Pass in the freelancers response from the api (respone.data.data)
   *
   */

  const [freelancersData, setFreelancersData] = useState<IListProps[]>([]);
  const [rows, setRows] = useState<IListProps[]>([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const freelancers = useSelector(
    (state: RootState) => state.freelancer.freelancers
  );

  const panels: string[] = ["All", "Recently Joined", "Active"];

  const getSelectedFreelancer = (id: string): void => {
    setSelectedRow(id);
  };

  if (freelancersData.length > 0 && loading) {
    setLoading(false);
  }

  const updateFreelancers = (newFreelancers: any) => {
    const parsedList: IListProps[] = newFreelancers.map(
      (freelancer: TFreelancersProps) => ({
        name: freelancer.freelancer.name,
        email: freelancer.freelancer.email,
        subscription: freelancer.freelancer.status === "active",
        id: freelancer.freelancer.id,
      })
    );

    setFreelancersData(parsedList);
    setRows(parsedList);
  };

  useEffect(() => {
    updateFreelancers(freelancers);

    axiosInstance
      .get("/freelancer")
      .then((response) => {
        dispatch(setFreelancers(response.data.data));
        updateFreelancers(response.data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header title="Manage Freelancers" />
      <div className="mt-5 px-10">
        <div className="flex mt-11 items-center justify-between">
          <SearchBar
            items={freelancersData}
            setRows={setRows}
            className="w-[24rem]"
            name="freelancers"
            variant=""
            placeholder="Search Freelancers"
          />
          <FilterPanel {...{ data: freelancersData, setRows, panels }} />
        </div>
        <div>
          {loading ? (
            <div className="w-full mt-40 flex justify-center ">
              <Load />
            </div>
          ) : (
            <PaginatedList
              menu={<FreelancerContextMenu selectedId={selectedRow} />}
              dataPerPage={10}
              data={rows}
              selectRow={getSelectedFreelancer}
            />
          )}
        </div>
        <div className="py-20"></div>
      </div>
    </div>
  );
}
