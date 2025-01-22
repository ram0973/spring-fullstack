import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import AdminLayout from "../components/admin-layout";
import UsersLayout from "@/components/users-layout";

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      <UsersLayout>{page}</UsersLayout>
    </AdminLayout>
  )
}

export default Page
