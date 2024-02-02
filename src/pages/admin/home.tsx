import Header from "../../components/AppHeader";
import HomeTabs from "../../components/homeTabs";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header title="Home"/>
      <div className="mt-5 pl-10">
        <HomeTabs/>  
      </div>
    </div>
  )
}
