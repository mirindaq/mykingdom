import { path } from '@/constants/path'
import React from 'react'
import { Link } from 'react-router-dom'

export default function PaySuccess() {
  return (
    <div>
        <div className='pt-40 pb-30'>
            <div className='flex justify-center'><img src="/images/tick.png" className='w-40' alt="" /></div>
            <p className='text-center mt-10 font-bold text-4xl text-red-600'>Thanh toán thành công</p>
            <div className='flex justify-center mt-18'>
                <Link to={path.homepage}><button className='bg-red-600 text-2xl text-white font-medium px-20 py-5 rounded-2xl hover:cursor-pointer'>Quay về trang chủ</button></Link>
            </div>
        </div>
    </div>
  )
}
