import { Suspense, useEffect } from 'react';

import Loader from '@/components/loader/loader';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';

import { update } from '@/redux/slices/user';
import SchoolSideBar from '@/components/schSidebar';
import Profile from '@/components/profile';



export default function AdminLayoutExt() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const profile = localStorage.getItem('profile');
        if (profile) {
            dispatch(update(JSON.parse(profile)));
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <main className="flex h-screen bg-white">
            <SchoolSideBar />
            <div className="w-[81%] h-screen overflow-y-auto">
                <div className='px-9 py-6 flex justify-between items-center shadow'>
                    <div className='flex gap-x-5 items-center'>
                        <div className='border px-5 lg:px-12 border-[#4F46E5] font-semibold text-[#4F46E5] rounded-lg py-2' onClick={() => navigate('/schools')}>
                            Back
                        </div>
                        <p className='text-xl font-semibold text-[#030036BD]'>Manage Schools</p>
                    </div>
                    <Profile />
                </div>
                <div className='lg:px-6 py-4'>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </main>
    )
}
