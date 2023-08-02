import ExportBtn from "../components/exportBtn/exportBtn"
import Header from "../components/header"
export default function Library() {
  return (
    <div>
      <Header title="Library" />
      <div className="mt-5 pl-10 flex justify-end">
        Library
        <ExportBtn>Click me</ExportBtn>
      </div>
    </div>
  )
}
