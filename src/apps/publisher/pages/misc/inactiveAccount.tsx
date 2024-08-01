import tioo from '@/assets/images/tioo-login.png';
import illustration from '@/assets/images/backgrounds/publisher.jpg';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '@/redux/store';


export default function InactiveAccount() {

    return (
        <div className="flex items-center justify-between h-screen w-full overflow-hidden">
            <div className="sm:md:lg:block w-auto bg-main h-screen">
                <div className='px-10 absolute'>
                    <img src={tioo} className="w-[100px]" alt="" />
                </div>
                <img className="mx-auto h-full" src={illustration} alt="" />
            </div>
            <div className="sm:md:w-1/2 h-screen px-4 sm:md:px-10 flex flex-col justify-center pb-5">
                <h1 className="text-center text-primary text-xl font-[500]">Activation Pending</h1>
                <p className='text-[13px] text-primary text-center'>This account is yet to be activated. Kindly reach out to support at support@hellotioo.com for further assistance.</p>
            </div>
        </div>
    )
}
