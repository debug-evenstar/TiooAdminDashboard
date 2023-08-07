import PlusIcon from "../../../assets/icons/components/settingsNav/plus";

const coupons = [
  {name: 'FRENZY',code: 'XJE4529EL',status: true,users:12,discount: 80},
  {name: 'ANYTIME',code: 'SFFAJ55LA',status: false,users:0,discount: 0},
  {name: '4 KIDS',code: 'W5649E545',status: true,users:0,discount: 50},
];


export default function CouponTab() {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between ">
        <h1 className="text-xl text-primary">Coupons</h1>
        <div className="cursor-pointer w-7 h-7 rounded-full bg-main flex items-center justify-center">
          <PlusIcon fill="white" />
        </div>
      </div>
      <div className="mt-7 text-sm">
        <div className="w-full">
          <div className="font-[400] px-2 py-2 font-[500] rounded-[8px] text-primary bg-neutral-100 flex items-center justify-between">
            <input type="checkbox" />
            <div className="w-[10rem]">Name</div>
            <div className="w-[6rem]">Code</div>
            <div className="w-[7rem]">Status</div>
            <div className="w-[7rem]">Discount</div>
            <div className="w-[6rem]">All users</div>
          </div>
          <div>
          {
              coupons.map((item,index) => (
                <div key={index} className="font-[400] my-3 px-2 py-2 font-[500] rounded-[8px] text-primary flex items-center justify-between">
                  <input type="checkbox" />
                  <div className="w-[10rem]">{item.name}</div>
                  <div className="w-[6rem]">
                    <span className="p-1 bg-light">{item.code}</span>
                  </div>
                  <div className="w-[7rem]">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${item.status? "bg-green-500":"bg-red-500"}`}></div> 
                        <span>{item.status? "Active":"Inactive"}</span>
                      </div>
                  </div>
                  <div className="w-[7rem]">{item.discount > 0? item.discount+'%':"..."}</div>
                  <div className="w-[6rem] flex items-center justify-around">
                    <div className="flex items-center space-x-2">
                      <span className="w-4">{item.users}</span>
                      <div className="bg-neutral-200 w-6 h-6 rounded-full"></div>
                    </div>
                    <button className="outline-none px-2">
                      <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" stroke="#030036" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#030036" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" stroke="#030036" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
          }
          </div>
        </div>
      </div>
    </div>
  );
}
