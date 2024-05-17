import Header from "../../../components/AppHeader";
import SearchBar from "../../../components/searchBar";

import market1 from "../../../assets/images/market/market-1.png";
import market2 from "../../../assets/images/market/market-2.png";

type TMarketCardProps = {
  title: string;
  amount: number;
  description: string;
  rating: number;
  image: string;
};

function MarketCard({
  title,
  amount,
  image,
  description,
  rating,
}: TMarketCardProps) {
  return (
    <div className="rounded-[8px] w-[230px] h-[300px] border cursor-pointer">
      <div className="w-full rounded-t-[8px] overflow-hidden">
        <img src={image} alt="" />
      </div>
      <div className="p-2 py-3">
        <h1 className="text-gray-600 font-[500]">{title}</h1>
        <h2 className=" mt-2 text-gray-600">
          ₦{" "}
          <span className="font-[600] text-black">
            {amount.toLocaleString()}
          </span>
        </h2>
        <p className="text-gray-400 my-3 text-xs">{description}</p>
        <span className="py-[3px] text-white px-4 text-xs bg-[#F9D934] rounded-full">
          <sup className="font-[900]">*</sup>
          {rating}
        </span>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const products: TMarketCardProps[] = [
    {
      title: "Marketing basics for kids",
      amount: 1000,
      description:
        "Students will understand the basic marketing principles and....",
      rating: 4.2,
      image: market1,
    },

    {
      title: "Modern mathematics",
      amount: 2500,
      description:
        "Students will understand the basic marketing principles and....",
      rating: 4.2,
      image: market2,
    },

    {
      title: "Marketing basics for kids",
      amount: 1000,
      description:
        "Students will understand the basic marketing principles and....",
      rating: 4.2,
      image: market1,
    },

    {
      title: "Marketing basics for kids",
      amount: 1000,
      description:
        "Students will understand the basic marketing principles and....",
      rating: 4.2,
      image: market1,
    },
  ];

  return (
    <div>
      <Header title="Market Place" />
      <div className="mt-5 px-10">
        <div className="mt-10">
          <SearchBar
            placeholder="Search Schools"
            className=""
            name="market-search"
            variant="filter"
          />
        </div>
        <div className="mt-10 grid grid-cols-4 gap-x-3">
          {products.map((props, index) => (
            <MarketCard {...props} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
