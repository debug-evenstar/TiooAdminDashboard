import './loader.css';
export function Load(){
    return (
        <div className="w-[5rem] h-[2rem] flex items-center space-x-1 justify-center">
            <div id="one" className="stick-head w-1.5 bg-main rounded bg-gray-200 animate-tick duration-300 "></div>
            <div id="two" className="stick-head w-1.5 bg-main rounded bg-gray-200 delay-200"></div>
            <div id="three" className="stick-head w-1.5 bg-main rounded bg-gray-200 delay-500"></div>
        </div>
    );
}

export default function Loader() {
    return (
        <div className="w-full h-full bg-orange relative flex items-center justify-center">
            <h1 className="text-sm">
                <Load/>
            </h1>
        </div>
    );
}