import AccountInfor from '@/components/AccountInfor/AccountInfor'
import { useAuth } from '@/hooks/AuthContext'
import React from 'react'

export default function AccountOverview() {
  const { user } = useAuth();
  return (
    <>
        <AccountInfor user = {user.user}></AccountInfor>
    </>
  )
}
