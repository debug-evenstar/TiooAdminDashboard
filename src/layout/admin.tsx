import { Suspense, useEffect } from 'react';
import Sidebar from '../components/sidebar/';

import Loader from '../components/loader/loader';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { fetchUser } from '../services/api';
import { update } from '../redux/slices/user';



export default function AdminLayout() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && user.isAuthenticated) {
            fetchUser()
                .then(response => {
                    dispatch(update(response.data.profile));
                })
        } else {
            navigate('/login')
        }

    }, []);

    return (
        <main className="flex h-screen bg-white">
            <Sidebar />
            <div className="w-[81%] h-screen overflow-y-auto">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>
        </main>
    )
}
