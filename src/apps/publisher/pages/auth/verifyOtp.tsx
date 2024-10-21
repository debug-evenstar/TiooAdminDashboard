import tioo from '@/assets/images/tioo-login.png';
import illustration from '@/assets/images/backgrounds/publisher.jpg';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { update } from '@/redux/slices/user';
import { useDispatch } from 'react-redux';
import WhiteSpinner from '@/components/whiteSpinner/spinner';
import { toast } from 'react-toastify';
import { registerPublisher, verifyAccount } from '../../services/auth.service';
import OtpInput from 'react-otp-input';

export default function VerifyOTP() {

    const navigate = useNavigate()

    const [otp, setOtp] = useState('');
    const [active, setActive] = useState(false);

    const submitOTP = async (otp : string) => {
        setActive(true);
        try {
            const email = localStorage.getItem('email');
            const response = await verifyAccount({otp, email});
            let profile = response.data;
            toast.success("Verified Successfully",{
                className : "text-[14px]",
                autoClose : 2500
            })
            setTimeout(()=>{
                navigate('/login')
            },2500);
        } catch (e) {
            setActive(false);
            if (axios.isAxiosError(e)) {
                if (e.response?.data.error || (e.response?.data.errors && e.response?.data.errors.length)) {
                    const errorMsg = e.response.data.message ?? e.response?.data.errors[0].msg ?? "";
                    toast.error(errorMsg, {
                        className : "text-[14px]",
                        autoClose : 4000
                    });
                }
            }
        }
    }


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        submitOTP(otp);
    }

    return (
        <div className="flex items-center justify-between h-screen w-full overflow-hidden">
            <div className="sm:md:lg:block w-auto bg-main h-screen">
                <div className='px-10 absolute'>
                    <img src={tioo} className="w-[100px]" alt="" />
                </div>
                <img className="mx-auto h-full" src={illustration} alt="" />
            </div>
            <div className="sm:md:w-1/2 h-screen px-4 sm:md:px-10 flex flex-col justify-center pb-5">
                <h1 className="text-center text-primary text-xl font-[500]">Verify OTP</h1>
                <p className='text-[13px] text-primary text-center'>A one time password has been sent to your email.</p>
                <form action="" onSubmit={handleSubmit} noValidate className="mt-10 w-full">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span className='w-2'></span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={{ justifyContent : "center"}}
                        inputStyle={{
                            width : "10%",
                            border: "1px solid black",
                            aspectRatio: 1
                        }}
                    />
                    <button className="w-full text-center shadow-xl outline-none hover:bg-hover shadow-light py-3 rounded-[8px] text-white font-[500] bg-[#bb7b58] mt-5 text-sm">
                        {!active ? <span>Verify</span> : <WhiteSpinner/>}
                    </button>
                </form>
            </div>
        </div>
    )
}
