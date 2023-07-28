import ActiveUsers from "./activeUsers";

import Users from "./users";
import WeeklyReport from "./weeklyReport";


export default function UserTabComponent(): JSX.Element{

    return (
        <>
            <WeeklyReport/>
            <Users/>
            <ActiveUsers />
            <div className="py-20">

            </div>
        </>
    );
}