import {DataTable} from 'mantine-datatable';
import data from './users.json';
import {Center, Container, Loader, Pagination} from "@mantine/core";
import {useState} from "react";

export const UsersTable = () => {
  const [page, setPage] = useState(0);
  //return <Center h={"100vh"} w={"100vw"}><Loader color="blue" /></Center>;
  return (
    <>
      <DataTable
        withTableBorder
        striped
        highlightOnHover
        columns={[
          {accessor: 'email', sortable: true},
          {accessor: 'enabled'},
        ]}
        totalRecords={data.totalItems}
        recordsPerPage={1}
        page={data.currentPage}
        records={data.users}
        onPageChange={() => {
        }}
      />
      <Pagination total={data.totaItems} value={page} onChange={setPage} mt="sm"/>
    </>
  );
}
