import PlusIcon from "../../assets/icons/components/settingsNav/plus";

export default function UserLevels() {
    return (
        <div className="mt-10">
            <div className="flex items-center justify-between ">
                <h1 className="text-xl text-primary">User Levels</h1>
                <div className=" w-6 h-6 rounded-full bg-main flex items-center justify-center">
                    <PlusIcon fill="white" />
                </div>
            </div>
        </div>
    )
}
