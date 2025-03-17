import AccountInfor from '@/components/AccountInfor/AccountInfor'
import React from 'react'

export default function AccountOverview() {
  const user = {name: "Nguyễn Quốc Huy", phone: "0358734574", email: "nguyenquochuy@gmail.com"}
  return (
    <>
        <AccountInfor user = {user}></AccountInfor>
    </>
  )
}
