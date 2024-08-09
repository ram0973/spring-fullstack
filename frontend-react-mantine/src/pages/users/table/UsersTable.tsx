import {DataTable} from 'mantine-datatable';
import data from './users.json';
import {Center, Container, Loader, Pagination} from "@mantine/core";
import {useState} from "react";
import useSWR from "swr";

enum SortOrder {
  UNSORTED, ASC, DESC
}

export const UsersTable = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(15);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState(SortOrder.ASC);
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    //await new Promise(resolve => setTimeout(resolve, 100)); // for testing
    return response.json();
  };
  const {data, error} = useSWR(
    //`https://dummyjson.com/users/?skip=${first}&limit=${rows}&sortBy=${sortField}` +
    `http://localhost:8000/api/v1/users/?skip=${first}&limit=${rows}&sortBy=${sortField}` +
    `&order=${sortOrder === SortOrder.UNSORTED ? "" : sortOrder === SortOrder.ASC ? "asc" : "desc"}`, fetcher);
  const [page, setPage] = useState(0);
  //return <Center h={"100vh"} w={"100vw"}><Loader color="blue" /></Center>;

  return (
    <>
      {data}
      <DataTable
        withTableBorder
        striped
        highlightOnHover
        columns={[
          {accessor: 'email', sortable: true},
          {accessor: 'enabled'},
        ]}
        //totalRecords={data.totalItems}
        totalRecords={50}
        recordsPerPage={1}
        //page={data.currentPage}
        page={1}
        records={null}
        onPageChange={() => {
        }}
      />
      <Pagination total={50} value={page} onChange={setPage} mt="sm"/>
    </>
  );
}
