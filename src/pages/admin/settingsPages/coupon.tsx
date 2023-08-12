import Popup from "reactjs-popup";
import PlusIcon from "../../../assets/icons/components/settingsNav/plus";
import { FormEvent, useState } from "react";
import UserChecklist, { TUserChecklistProps } from "../../../components/userChecklist/userChecklist";

type TCouponProps = {
  name: string;
  code: string;
  status: boolean;
  amount: number;
  users: number;
}

const coupons: TCouponProps[] = [
  { name: 'FRENZY', code: 'XJE4529EL', status: true, users: 12, amount: 2000 },
  { name: 'ANYTIME', code: 'SFFAJ55LA', status: false, users: 0, amount: 0 },
  { name: '4 KIDS', code: 'W5649E545', status: true, users: 0, amount: 500 },
];


const couponMenu: string[] = [
  'Edit Coupon',
  'Activate Coupon',
  'Deactivate Coupon',
  'Renew Coupon',
  'Delete Coupon',
];

const samples: TUserChecklistProps[] = [
  { id: 1, value: { name: "Montesorri Gownsill", email: "montesorri@gmail.com" } },
  { id: 2, value: { name: "Brainy Hive", email: "brainyhive@gmail.com" } },
  { id: 3, value: { name: "Imao Obong Schools", email: "imaoboon@gmail.com" } },
  { id: 4, value: { name: "Teeves Academy", email: "teevesacademy@gmail.com" } },
  { id: 5, value: { name: "Manjaro Academy", email: "mangaroo@gmail.com" } },
  { id: 6, value: { name: "Fedora Schools", email: "fedoraschools@gmail.com" } },
];

function OptionsMenu({ options }: { options: TUserChecklistProps[] }) {
  const [active, setActive] = useState(false);
  const [selection, setSelection] = useState<TUserChecklistProps[]>([]);

  return (
    <>
      <div onClick={() => setActive(!active)} className="mt-2 cursor-pointer  outline-none rounded w-full px-3 py-2 border flex justify-end">
        <div
          className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
              cursor-pointer ${!active ? "rotate-180" : ""}`}
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z" fill="#030036" fillOpacity="0.74" />
          </svg>

        </div>
      </div>
      {active && <UserChecklist className="w-full" onApply={() => null} {...{ selection, setSelection }} close={() => null} data={options} />}
    </>
  );
}


function ApplyCouponModal({ modal, setModal }: { modal: boolean, setModal: (state: boolean) => void }) {

  const [campaign, setCampaign] = useState('');
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('Active');
  const [users, setUsers] = useState([1, 2, 3, 4]);

  const validate = () => {

  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("submitting coupon data");
  }

  return (
    <div className={`fixed text-primary z-[90] bg-[#00000044] transition inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
      <div className={`${modal ? "translate-y-[5rem]" : "translate-y-0"} z-[100] bg-white rounded duration-1000 h-[500px] w-[380px] mx-auto `}>
        <div className="p-2 border-b px-4 flex items-center justify-between">
          <h1>Add Users</h1>
          <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <div className=" px-4 mt-4 h-[24rem] overflow-y-auto">
            <div className="text-xs mb-6">
              <label htmlFor="" className="">Campaign</label>
              <input type="text" value={campaign} onChange={(e) => setCampaign(e.target.value)} className="mt-2 outline-none rounded w-full px-3 py-2 border" />
            </div>
            <div className="text-xs mb-6">
              <label htmlFor="" className="">Code</label>
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="mt-2 outline-none rounded w-full px-3 py-2 border" />
            </div>
            <div className="text-xs mb-6">
              <label htmlFor="" className="">Amount</label>
              <input type="text" value={code} onChange={(e) => setAmount(e.target.value)} name="amount" className="mt-2 outline-none rounded w-full px-3 py-2 border" />
            </div>
            <div className="text-xs mb-6">
              <label htmlFor="" className="">Add Students</label>
              <OptionsMenu options={samples} />
            </div>
          </div>
          <div className="px-4 w-full h-[3rem] mt-[2px] flex items-center">
            <button className="bg-main focus:shadow-lg outline-none w-full text-sm text-center py-1.5 rounded text-white font-[500]">Apply</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default function CouponTab() {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="mt-2">
      {<ApplyCouponModal {...{ modal, setModal }} />}
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-[500] text-primary">Coupons</h1>
        <button onClick={() => setModal(true)} className="cursor-pointer w-7 h-7 rounded-full bg-main flex items-center justify-center">
          <PlusIcon fill="white" />
        </button>
      </div>
      <div className="mt-7 text-sm">
        <div className="w-full">
          <div className="font-[400] px-2 py-2 font-[500] rounded-[8px] text-primary bg-neutral-100 flex items-center justify-between">
            <div className="w-[10rem]">Campaign</div>
            <div className="w-[6rem]">Code</div>
            <div className="w-[7rem]">Status</div>
            <div className="w-[7rem]">Amount</div>
            <div className="w-[6rem]">All users</div>
          </div>
          <div>
            {
              coupons.map((item: TCouponProps, index) => (
                <div key={index} className="font-[400] my-3 px-2 py-2 font-[500] rounded-[8px] text-primary flex items-center justify-between">
                  <div className="w-[10rem]">{item.name}</div>
                  <div className="w-[6rem]">
                    <span className="p-1 bg-light">{item.code}</span>
                  </div>
                  <div className="w-[7rem]">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${item.status ? "bg-green-500" : "bg-red-500"}`}></div>
                      <span>{item.status ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                  <div className="w-[7rem]">{item.amount > 0 ? '₦ ' + item.amount.toLocaleString() : "..."}</div>
                  <div className="w-[6rem] flex items-center justify-around">
                    <div className="flex items-center space-x-2">
                      <span className="w-4">{item.users}</span>
                      <div className="bg-neutral-200 w-6 h-6 rounded-full"></div>
                    </div>
                    <Popup
                      trigger={
                        <button className="outline-none px-2">
                          <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" stroke="#030036" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#030036" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" stroke="#030036" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      }
                      on="click"
                      position="bottom center"
                    >
                      <ul className="bg-white py-4 rounded-[8px] shadow">
                        {
                          couponMenu.map((item, index) => (
                            <li key={index} className="py-2.5 cursor-pointer px-4 text-primary text-sm hover:bg-neutral-100 hover:text-main">{item}</li>
                          ))
                        }
                      </ul>
                    </Popup>
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
