import tioo from '../../assets/images/tioo-login.png';
import illustration from '../../assets/images/login-illustration.png';
import { FormEvent, useState } from 'react';
import { authUser } from '../../services/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { update } from '../../redux/slices/user';
import { useDispatch } from 'react-redux';
import WhiteSpinner from '../../components/whiteSpinner/spinner';

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

    const handleLogin = async (data: { email: string, password: string }) => {
        setActive(true);
        try {
            const response = await authUser(data);
            const token: string = response.data.token;
            localStorage.setItem('token', token);
            let profile = response.data.profile;
            profile = JSON.stringify(profile);
            localStorage.setItem('profile', profile);
            dispatch(update(profile))
            navigate('/')
        } catch (e) {
            setActive(false);
            if (axios.isAxiosError(e)) {
                if (e.response?.data.error)
                    setErrors({ email: "", password: e.response.data.message })
            }
        }
    }

    const validateForm = (): LoginError => {
        const newErrors: LoginError = {};
        if (!email) {
            newErrors.email = "Email field in required";
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
            <div className="sm:md:lg:block w-[50%] bg-main h-screen">
                <div className='px-16'>
                    <img src={tioo} className=" " alt="" />
                </div>
                <img className="w-[20rem] mx-auto mt-8" src={illustration} alt="" />
            </div>
            <div className="sm:md:w-1/2 h-screen px-4 sm:md:px-10 py-5 pt-24">
                <h1 className="text-primary text-xl font-[500]">Welcome back!</h1>
                <form action="" onSubmit={handleSubmit} noValidate className="mt-16 w-full sm:md:w-[85%]">
                    <div className="mb-4">
                        <label className="text-sm text-primary">Email</label>
                        <input
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-primary" />
                        <span className="text-red-500 text-xs mt-2">{errors?.email}</span>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm text-primary">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded outline-none border border-gray-400 px-3 py-1.5 text-primary" />
                        <span className="text-red-500 text-xs mt-2">{errors?.password}</span>
                    </div>

                    <button className="w-full text-center shadow-xl outline-none hover:bg-hover shadow-light py-3 rounded-[8px] text-white font-[500] bg-main mt-10 text-sm">
                        {!active ? <span>Log In</span> : <WhiteSpinner/>}
                    </button>
                </form>
            </div>
        </div>
    )
}
