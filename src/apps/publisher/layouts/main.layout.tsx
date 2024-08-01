import { Suspense, useEffect } from 'react';
import Sidebar from './partials/sidebar';
import Loader from '@/components/loader/loader';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import store from '@/redux/store';


export default function PublisherLayout() {

    const navigate = useNavigate();

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
