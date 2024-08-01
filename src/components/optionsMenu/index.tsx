import { MouseEvent, useState } from "react";

type TOptionProps = {
  id: number;
  name: number | string;
};

export default function OptionsMenu({
  readonly,
  selection,
  setSelection,
  options,
}: {
  readonly?: boolean;
  selection: number[];
  setSelection: any;
  options: TOptionProps[];
}) {
  const [active, setActive] = useState(false);

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) {
      const id: number = Number.parseInt(value);
      if (!selection.includes(id)) setSelection([...selection, id]);
      else {
        setSelection(selection.filter((number: number) => number != id));
      }
    }
  };

  const min = Math.min(...selection);
  const minName = options?.find((i: any) => i.id == min)?.name;
  const max = Math.max(...selection);
  const maxName = options?.find((i: any) => i.id == max)?.name;
  return (
    <>
      <div
        onClick={() => setActive(!active)}
        className="mt-2 cursor-pointer relative outline-none rounded w-full px-3 py-2 border flex justify-between items-center"
      >
        {selection.length > 0 ? (
          <p className="text-xs">{minName + " - " + maxName}</p>
        ) : (
          <p></p>
        )}

        <div
          className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
            cursor-pointer ${
              !readonly ? !active && "rotate-180" : "rotate-180"
            }`}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z"
              fill="#030036"
              fillOpacity="0.74"
            />
          </svg>
        </div>
      </div>
      {active && !readonly && (
        <div className="bg-white relative p-4 border shadow w-full z-[50]">
          <ul className="">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={handleClick}
                data-value={option.id}
                className="flex items-center cursor-pointer space-x-3 py-1"
              >
                <input
                  type="checkbox"
                  checked={selection.includes(option.id)}
                  onChange={() => null}
                  className=" w-4 h-4 rounded-full outline-none"
                />
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}