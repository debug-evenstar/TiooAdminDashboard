import { Suspense, useEffect } from 'react';
import Sidebar from '../components/sidebar/';

import Loader from '../components/loader/loader';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';

import { update } from '../redux/slices/user';



export default function AdminLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            <Sidebar />
            <div className="w-[81%] h-screen overflow-y-auto">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
                {/* <Loader/> */}
            </div>
        </main>
    )
}
