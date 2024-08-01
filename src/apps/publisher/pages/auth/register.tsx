import tioo from '@/assets/images/tioo-login.png';
import illustration from '@/assets/images/backgrounds/publisher.jpg';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { update } from '@/redux/slices/user';
import { useDispatch } from 'react-redux';
import WhiteSpinner from '@/components/whiteSpinner/spinner';
import { toast } from 'react-toastify';
import { registerPublisher } from '../../services/auth.service';
import { authUser } from '@/apps/administrator/services/auth.service';

interface RegisterError {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    company?: string;
}

export default function Register() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [errors, setErrors] = useState<RegisterError>({});
    const [active, setActive] = useState(false);

    const handleRegister = async (data: any) => {
        setActive(true);
        try {
            data = {
                ...data,
                account_type : "publisher"
            };
            const response = await registerPublisher(data);
            const token: string = response.token;
            localStorage.setItem('token', token);
            localStorage.setItem('email', data.email);
            toast.success("Registered Successfully",{
                className : "text-[14px]",
                autoClose : 3000
            })
            setTimeout(()=>{
                navigate('/verify')
            },2500);

        } catch (e) {
            console.log(e);
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

    const validateForm = (): RegisterError => {
        const newErrors: RegisterError = {};
        if (!email) {
            newErrors.email = "Email field is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }
        if (!password)
            newErrors.password = "Password is required"
        if (!(password == confirmPassword))
            newErrors.confirmPassword = "Passwords do not match"
        return newErrors;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            handleRegister({ 
                email, 
                password,
                first_name : firstName,
                last_name : lastName,
                phone
            });
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
                <h1 className="text-primary text-xl font-[500]">Create an account</h1>
                <p className='text-[13px] text-primary'>Fill in all details</p>
                <form action="" onSubmit={handleSubmit} noValidate className="mt-10 w-full sm:md:w-[85%]">
                    <div className="mb-3 flex justify-between gap-4">
                        <div>
                            <label className="text-sm text-primary">First Name</label>
                            <input
                                name="firstName"
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                            <span className="text-red-500 text-xs mt-2">{errors?.firstName}</span>
                        </div>
                        <div>
                            <label className="text-sm text-primary">Last Name</label>
                            <input
                                name="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                            <span className="text-red-500 text-xs mt-2">{errors?.lastName}</span>
                        </div>

                    </div>
                    <div className="mb-3">
                        <label className="text-sm text-primary">Email</label>
                        <input
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                        <span className="text-red-500 text-xs mt-2">{errors?.email}</span>
                    </div>
                    <div className="mb-3">
                        <label className="text-sm text-primary">Phone Number</label>
                        <input
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                        <span className="text-red-500 text-xs mt-2">{errors?.phone}</span>
                    </div>
                    <div className="mb-3">
                        <label className="text-sm text-primary">Company</label>
                        <input
                            name="company"
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                        <span className="text-red-500 text-xs mt-2">{errors?.company}</span>
                    </div>
                    <div className="mb-3 flex justify-between gap-4">
                        <div>
                            <label className="text-sm text-primary">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                            <span className="text-red-500 text-xs mt-2">{errors?.password}</span>
                        </div>
                        <div>
                            <label className="text-sm text-primary">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-[14px] text-primary" />
                            <span className="text-red-500 text-xs mt-2">{errors?.confirmPassword}</span>
                        </div>

                    </div>
                    <a href="/login" className='text-primary text-[13px] hover:text-[#bb7b58]'>Already have an account? Login</a>
                    <button className="w-full text-center shadow-xl outline-none hover:bg-hover shadow-light py-3 rounded-[8px] text-white font-[500] bg-[#bb7b58] mt-5 text-sm">
                        {!active ? <span>Create Account</span> : <WhiteSpinner/>}
                    </button>
                </form>
            </div>
        </div>
    )
}
