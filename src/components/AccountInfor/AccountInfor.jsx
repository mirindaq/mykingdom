import React from "react";
import BirthRegister from '@/components/BirthRegister/BirthRegister'
import img from '../../../public/images/FB_6.png'
import { useAuth } from "@/hooks/AuthContext";

export default function AccountInfor(props){
    return(
        <div>
            <div className="h-90 w-5/6 border rounded-2xl flex flex-col justify-around">
                <p className="ms-4 font-bold text-xl text-blue-900">Thông tin tài khoản</p>
                <div className="ms-4 ">
                    <p className="font-light text-gray-400">Họ và tên</p>
                    <p className="font-medium">{props.user.name}</p>
                </div>
                <div className="ms-4 ">
                    <p className="font-light text-gray-400">Điện thoại</p>
                    <p className="font-medium">{props.user.phone}</p>
                </div>
                <div className="ms-4 ">
                    <p className="font-light text-gray-400">Email</p>
                    <p className="font-medium">{props.user.email}</p>
                </div>
            </div>
            <div className="w-2/3 ms-15">
                <BirthRegister></BirthRegister>
            </div>
            <div>
             <img src={img} alt="" className='w-4/5 mt-10 rounded-2xl'/>
            </div>
        </div>
    )
} 