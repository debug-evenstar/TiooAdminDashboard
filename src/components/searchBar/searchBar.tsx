interface ISearchBarProps {
    placeholder: string;
    name: string;
    className: string;
}

export default function SearchBar({ className, name, placeholder }: ISearchBarProps) {
    return (
        <div className="flex">
            <input className={`bg-white border-gray-300 border w-[20rem] duration-300 outline-none focus:border-main text-sm border-r-0 rounded-l-[8px] text-gray-700 px-3 py-2.5 w-full ${className}`} spellCheck={false} type="text" name={name} placeholder={placeholder} />
            <button className="w-12 border border-main rounded-r-[8px] text-white border bg-main">
            </button>
        </div>
    )
}
