import filterImage from '../../assets/images/filter-lines.png';
import searchImage from '../../assets/images/search-md.png';

interface ISearchBarProps {
    placeholder: string;
    name: string;
    className: string;
    variant?:string
}

export default function SearchBar({ className, name, placeholder, variant="filter"}: ISearchBarProps) {
    return (
        <div className="flex">
            <img  className="relative w-5 h-5 left-9 top-2.5" src={searchImage} alt=""/>
            <input className={`bg-white border-gray-300 border w-[360px] duration-300 outline-none focus:border-main text-sm rounded-l-[8px] ${variant === 'normal' && "rounded-r-[8px] border-r"} text-gray-700 pl-10 px-3 py-2.5 w-full ${className}`} spellCheck={false} type="text" name={name} placeholder={placeholder} />
            {
                variant === 'filter' &&
                <button className="w-12 flex items-center justify-center border border-main rounded-r-[8px] text-white border bg-main">
                    <img src={filterImage} alt="" />
                </button>
            }
        </div>
    )
}
