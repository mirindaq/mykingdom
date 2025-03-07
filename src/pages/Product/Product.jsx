import { Link } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import PriceProduct from '@/components/PriceProduct/PriceProduct';
import { Button } from '@/components/ui/button'
import QuantityInput from '@/components/QuantityInput/QuantityInput';
import StoreInformation from '@/components/StoreInformation/StoreInformation';
import TableInforProduct from '@/components/TableInforProduct/TableInforProduct';
import DescriptionProcuct from '@/components/DescriptionProcuct/DescriptionProcuct';
import CarouselProduct from '@/components/CarouselProduct/CarouselProduct';
import { Heart } from 'lucide-react';

export default function Product() {

    const images = [
        "/images/con-quay-xanh.webp",
        "/images/con-quay-xanh-box.webp",
        "/images/con-quay-xanh-big.webp",
        "/images/con-quay-xanh-inner.webp",
    ];

    const [mainImage, setMainImage] = useState(images[0]);

    const stores = [
        {
            id: "CHA098",
            name: "MYKINGDOM QUẢNG NGÃI - 12 có sẵn",
            address: "Số 632 Quang Trung Phường Chánh Lộ, Thành phố Quảng Ngãi Tỉnh Quảng Ngãi,",
            phone: "+842553729222",
        },
        {
            id: "CHB089",
            name: "MYKINGDOM LÀO CAI - 9 có sẵn",
            address: "Số 192 Hoàng Liên, Phường Cốc Lếu, Thành phố Lào Cai, Tỉnh Lào Cai,",
            phone: "+842143855010",
        },
        {
            id: "CHA185",
            name: "MYKINGDOM LÊ HỒNG PHONG NHA TRANG - 8 có sẵn",
            address: "116 Lê Hồng Phong Phường Phước Hải, Thành phố Nha Trang Nha Trang, 650000",
            phone: "+842583811166",
        },
        {
            id: "CHA107",
            name: "MYKINGDOM NGUYỄN HỮU THỌ - ĐÀ NẴNG - 11 có sẵn",
            address: "Số 275 Nguyễn Hữu Thọ Phường Hòa Cường Bắc, Quận Hải Châu Thành phố Đà Nẵng,",
            phone: "+842363662219",
        },
        {
            id: "CHB087",
            name: "MYKINGDOM HÀ TĨNH - 5 có sẵn",
            address: "Số 129 Trần Phú Phường Trần Phú Hà Tĩnh,",
            phone: "+842393633363",
        },
    ];

    return (
        <div>

            <div className="grid grid-flow-col items-center">
                <div className='py-4 bg-gray-200 px-50'>
                    <Link to="/" className='text-gray-500 pr-4 text-sm'>Trang chủ</Link>
                    <Link to="/" className='text-gray-500 text-sm'>&#62;</Link>
                    <Link to="/collections/:id" className='pl-4 text-sm'>Con quay B-160 Booster King Helios.Zn 1B BEYBLADE 5 157199</Link>
                </div>
            </div>

            <div className="grid grid-cols-3 mx-50 mb-5 border-b-1">
                <div className='items-center col-span-2'>
                    <div className="flex justify-around items-center">
                        <img src={mainImage} className='w-180' />
                    </div>

                    <div className="flex justify-center items-center">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                className={`w-50 h-auto m-3 ${mainImage === img ? "shadow-2xl" : "opacity-50"}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className='mt-8'>
                    <div className='flex'>
                        <p className='text-2xl font-medium mb-4'>Con quay B-160 Booster King Helios.Zn 1B BEYBLADE 5 157199</p>
                        <Heart className="h-9 w-9 text-red-600" />
                    </div>
                    <div className='flex mb-4'><p className='pr-5'>Thương hiệu</p> <a href="#" className='text-blue-900 underline font-medium'>BEYBLADE 5</a> <p className='pl-10'>SKU 157119</p> </div>
                    <PriceProduct priceType="Giá thành viên" currentPrice="175000" oldPrice="349000" discount="50" />
                    <PriceProduct priceType="Giá bán" currentPrice="175000" oldPrice="349000" discount="50" />

                    <div className='mt-12'>
                        <p className='py-2'>&#10003; &nbsp;&nbsp; Hàng chính hãng</p>
                        <p className='py-2'>&#10003; &nbsp;&nbsp; Miễn phí giao hàng toàn quốc đơn trên 500k</p>
                        <p className='py-2'>&#10003; &nbsp;&nbsp; Giao hàng hỏa tốc 4 tiếng</p>
                    </div>

                    <div className='mt-7'>
                        <p className='font-bold text-2xl mb-4'>Số lượng</p>
                        <div className='items-center flex justify-between'>
                            <QuantityInput />
                            <Button variant='addToCart' className="py-6 text-lg px-15">Thêm vào giỏ hàng</Button>
                        </div>
                    </div>

                    <div className='mt-5 flex'>
                        <img src="/images/store-icon.svg" alt="" />
                        <p className='ml-4 font-medium text-lg'>Dự kiến các cửa hàng đang còn sản phẩm</p>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto border rounded-lg mt-4">
                        {stores.map((store) => (
                            <StoreInformation key={store.id} s={store} />
                        ))}
                    </div>

                    <div className='mt-5 w-full pb-10'>
                        <p className='font-bold text-2xl mb-4'>Thông tin sản phẩm</p>
                        <TableInforProduct />
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 items-center px-50'>
                <DescriptionProcuct/>
            </div>

            <div className='grid grid-cols-1 items-center px-50 mt-20 mb-40'>
                <p className='text-center text-5xl font-medium text-blue-900'>Sản Phẩm Liên Quan</p>
                <CarouselProduct/>
            </div>

        </div>
    )
}