import PlusIcon from "../../../assets/icons/components/settingsNav/plus";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../services/api";
import StudentsChecklist from "../../../components/studentsChecklist/studentsChecklist";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { clearCoupons, setCoupons } from "../../../redux/slices/coupon";

export type TCouponProps = {
  id: number;
  campaign: string;
  code: string;
  status: string;
  amount: number;
  users: number[];
  updatedAt?: string;
  createdAt?: string;

};

type TCouponError = {
  campaign?: string;
  code?: string;
  amount?: string;
  users?: string;
}

const couponMenu: string[] = [
  'Edit Coupon',
  'Activate Coupon',
  'Deactivate Coupon',
  'Renew Coupon',
  'Delete Coupon',
];


function OptionsMenu({ selection, setSelection }: { selection: number[], setSelection: any }) {
  const [active, setActive] = useState(false);
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
      {active && <StudentsChecklist className="w-full" onApply={() => { setActive(false) }} selection={selection} setSelection={setSelection} close={() => null} />}
    </>
  );
}


function ApplyCouponModal({ modal, setModal, data }: { modal: boolean, data?: TCouponProps, setModal: (state: boolean) => void }) {
  const [campaign, setCampaign] = useState(data?.campaign || '');
  const [code, setCode] = useState(data?.code || '');
  const [amount, setAmount] = useState(data?.amount || 0);
  const [status, _] = useState(data?.status || 'Active');
  const [users, setUsers] = useState<number[]>([]);
  const [errors, setErrors] = useState<TCouponError>();

  const dispatch = useDispatch();

  const handleAmountInput = (e: ChangeEvent<HTMLInputElement>) => {
    let amount = Number.parseInt(e.target.value);
    if (e.target.value === '')
      amount = 0;
    if (!isNaN(amount)) {
      setAmount(amount)
    }
  }

  const validate = () => {
    const newErrors: TCouponError = {};

    if (campaign.length == 0)
      newErrors.campaign = "Please Enter campaign string";
    if (code.length === 0)
      newErrors.code = 'Please enter coupon code';
    if (users.length == 0)
      newErrors.users = "please select atleast one user";

    return newErrors;

  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();


    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      const payload = { campaign, code, status, amount, users };

      if (data) {
        axiosInstance.put('/coupon', payload)
          .then(response => {
            if (!response.data.error) {
              dispatch(clearCoupons());
              setModal(false);
            }
          })
          .catch(error => console.log(error));

      } else {
        axiosInstance.post('/coupon', payload)
          .then(response => {
            if (!response.data.error) {
              dispatch(clearCoupons());
              setModal(false);
            }
          })
          .catch(error => console.log(error));
      }
    } else {
      setErrors(newErrors);
    }
  }

  return (
    <div className={`fixed text-primary z-[90] bg-[#00000044] transition inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
      <div className={`${modal ? "translate-y-[5rem]" : "translate-y-0"} z-[100] bg-white rounded duration-1000 h-[500px] w-[380px] mx-auto `}>
        <div className="p-2 border-b px-4 flex items-center justify-between">
          <h1>Apply Coupon</h1>
          <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
        </div>
        <div onSubmit={handleSubmit}>
          <div className=" px-4 mt-4 h-[24rem] overflow-y-auto">
            <div className="text-xs mb-6">
              <label htmlFor="" className="">Campaign</label>
              <input type="text" value={campaign} onChange={(e) => setCampaign(e.target.value)} className="mt-2 outline-none rounded w-full px-3 py-2 border" />
              <span className="text-red-500 mt-4">{errors?.campaign}</span>
            </div>
            <div className="text-xs mb-6">
              <label htmlFor="" className="">Code</label>
              <input readOnly={data? true: false} type="text" value={code} onChange={(e) => setCode(e.target.value)} className="mt-2 outline-none rounded w-full px-3 py-2 border" />
              <span className="text-red-500 mt-4">{errors?.code}</span>
            </div>
            <div className="text-xs mb-6">
              <label htmlFor="" className="">Amount</label>
              <input type="text" value={amount} onChange={handleAmountInput} name="amount" className="mt-2 outline-none rounded w-full px-3 py-2 border" />
              <span className="text-red-500 mt-4">{errors?.amount}</span>

            </div>
            <div className="text-xs mb-6">
              <label htmlFor="" className="">Add Students</label>
              <OptionsMenu selection={users} setSelection={setUsers} />
              <span className="text-red-500 mt-4">{errors?.users}</span>
            </div>
          </div>
          <div className="px-4 w-full h-[3rem] mt-[2px] flex items-center">
            <button onClick={handleSubmit} className="bg-main focus:shadow-lg outline-none w-full text-sm text-center py-1.5 rounded text-white font-[500]">{ data? 'Update':'Apply'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function CouponMenuBtn({ id,data}: { data: TCouponProps, id: number }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const menuRef = useRef<any>(null);

  const handleClickOutSide = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  }
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener('click', handleClickOutSide);
    return () => { document.removeEventListener('click', handleClickOutSide) }
  }, [])

  const handleMenuClick = (name: string, id: number) => {
    switch (name) {
      case 'Delete Coupon':
        axiosInstance.delete('/coupon?id=' + id)
          .then(response => {
            if (!response.data.error)
              dispatch(clearCoupons());
          })
          .catch(error => console.log(error))
        break;

      case 'Activate Coupon':
        axiosInstance.post('/coupon/activate', { id: id, activate: true })
          .then(response => {
            if (!response.data.error)
              dispatch(clearCoupons());
          })
          .catch(error => console.log(error))
        break;

      case 'Deactivate Coupon':
        axiosInstance.post('/coupon/activate', { id: id, activate: false })
          .then(response => {
            if (!response.data.error)
              dispatch(clearCoupons());
          })
          .catch(error => console.log(error))
        break;
      case 'Edit Coupon':
        setModal(true);
        break;
  
      default:
        return;
    }
  }

  return (
    <div ref={menuRef}>
      {<ApplyCouponModal {...{ modal, setModal }} data={data}/>}
      <button className="outline-none px-2" onClick={() => setMenuOpen(!menuOpen)}>
        <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" stroke="#030036" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#030036" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" stroke="#030036" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {
        menuOpen &&
        <ul className="bg-white py-4 rounded-[8px] absolute -ml-20 shadow">
          {
            couponMenu.map((menuName, index) => (
              <li key={index} onClick={() => { setMenuOpen(false); handleMenuClick(menuName, id) }} className="py-2.5 cursor-pointer px-4 text-primary text-sm hover:bg-neutral-100 hover:text-main">{menuName}</li>
            ))
          }
        </ul>
      }

    </div>
  );
}

export default function CouponTab() {
  const [modal, setModal] = useState<boolean>(false);

  const coupons = useSelector((state: RootState) => state.coupon.coupons);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.get('/coupon')
      .then(response => {
        dispatch(setCoupons(response.data.data))
      })
      .catch(error => console.log(error))
  }, [coupons])



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
              coupons?.length > 0 ?

                coupons?.map((item: TCouponProps, index: number) => (
                  <div key={index} className="font-[400] my-3 px-2 py-2 font-[500] rounded-[8px] text-primary flex items-center justify-between">
                    <div className="w-[10rem]">{item.campaign}</div>
                    <div className="w-[6rem]">
                      <span className="p-1 bg-light">{item.code}</span>
                    </div>
                    <div className="w-[7rem]">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${item.status === 'Activate' ? "bg-green-500" : "bg-red-500"}`}></div>
                        <span>{item.status === 'Activate' ? "Active" : "Inactive"}</span>
                      </div>
                    </div>
                    <div className="w-[7rem]">{item.amount > 0 ? '₦ ' + item.amount.toLocaleString() : "..."}</div>
                    <div className="w-[6rem] flex items-center justify-around">
                      <div className="flex items-center space-x-2">
                        <span className="w-4">{item.users}</span>
                        <div className="bg-neutral-200 w-6 h-6 rounded-full"></div>
                      </div>
                      <CouponMenuBtn id={item.id} data={item} />
                    </div>
                  </div>
                ))
                :
                <div className="w-full h-[20rem] flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full border-[.2rem] border-gray-200 border-r-gray-400 animate-spin"></div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
