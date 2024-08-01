import tioo from '@/assets/images/tioo-login.png';
import illustration from '@/assets/images/backgrounds/publisher.jpg';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { update } from '@/redux/slices/user';
import { useDispatch } from 'react-redux';
import WhiteSpinner from '@/components/whiteSpinner/spinner';
import { toast } from 'react-toastify';
import { loginPublisher, registerPublisher } from '../../services/auth.service';

interface LoginError {
    email?: string;
    password?: string;
}

export default function Login() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<LoginError>({});
    const [active, setActive] = useState(false);

    const handleLogin = async (data: { email : string, password : string}) => {
        setActive(true);
        try {
            const response = await loginPublisher(data);
            const token: string = response.token;
            localStorage.setItem('token', token);
            let profile = response.profile;
            profile = JSON.stringify(profile);
            localStorage.setItem('profile', profile);
            dispatch(update(profile));
            toast.success("Login Successful",{
                className : "text-[14px]",
                autoClose : 2000
            })
            setTimeout(()=>{
                window.location.replace('/')
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

    const validateForm = (): LoginError => {
        const newErrors: LoginError = {};
        if (!email) {
            newErrors.email = "Email field is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }
        if (!password)
            newErrors.password = "Password is required"
        return newErrors;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            handleLogin({ email, password });
        } else {
            setErrors(newErrors);
        }

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
                <h1 className="text-primary text-xl font-[500]">Login</h1>
                <p className='text-[13px] text-primary'>Fill in all details</p>
                <form action="" onSubmit={handleSubmit} noValidate className="mt-5 w-full sm:md:w-[85%]">
                    <div className="mb-3">
                        <label className="text-sm text-primary">Email</label>
                        <input
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                        <span className="text-red-500 text-xs mt-2">{errors?.email}</span>
                    </div>
                    <div className="mb-3">
                        <div>
                            <label className="text-sm text-primary">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                            <span className="text-red-500 text-xs mt-2">{errors?.password}</span>
                        </div>
                    </div>
                    <a href="/register" className='text-primary text-[13px] hover:text-[#bb7b58]'>Don't have an account? Create an account</a>
                    <button className="w-full text-center shadow-xl outline-none hover:bg-hover shadow-light py-3 rounded-[8px] text-white font-[500] bg-[#bb7b58] mt-5 text-sm">
                        {!active ? <span>Login</span> : <WhiteSpinner/>}
                    </button>
                </form>
            </div>
        </div>
    )
}
