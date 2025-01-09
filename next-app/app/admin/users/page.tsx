'use client';
import {DataTable, DataTableSortStatus} from 'mantine-datatable';
import {ActionIcon, Avatar, Badge, Button, Group, Stack, TextInput, Loader} from "@mantine/core";
import {useState} from "react";
import {IconSearch, IconUserPlus, IconX} from "@tabler/icons-react";
import 'mantine-datatable/styles.css';
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {User} from "@/app/admin/users/types";
import {axiosInstance} from "@/app/common/axios/axiosInstance";
import Link from 'next/link';
import RowActions from "@/app/admin/users/RowActions";

const PAGE_SIZES = [10, 15, 20];

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');
  const [sortStatus, setSortStatus] =
    useState<DataTableSortStatus<User>>({
      columnAccessor: 'id',
      direction: 'asc',
    });
  const [selectedRecords, setSelectedRecords] = useState<User[]>([]);
  const getUsersApi = async () => {
    //await new Promise(resolve => setTimeout(resolve, 100)); // for loader testing
    return await axiosInstance.get(
      `/api/v1/users?page=${page - 1}&size=${pageSize}&sort=${sortStatus.columnAccessor},${sortStatus.direction}`
    );
  }
  const useGetUsers = () => {
    return useQuery({
      queryKey: ["users", page, pageSize, query, sortStatus],
      queryFn: () => getUsersApi(),
      placeholderData: keepPreviousData,
      staleTime: 15 * 1000,
      gcTime: 5 * 60 * 1000
    })
  }
  let {data, error, isFetching} = useGetUsers();
  if (error) {
    return "Error: " + error.message;
  }
  if (isFetching) {
    return <Loader />;
  }
  const users: User[] = data?.data.users
  console.log(users);
  const totalItems = data?.data.totalItems
  return (
    <>
      <Group justify={"space-between"}>
        <h2>Users</h2>
        <Link href={"/admin/users/create"}><Button><IconUserPlus/><span>New user</span></Button></Link>
      </Group>
      <DataTable
        records={users}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        withTableBorder
        //withColumnBorders
        highlightOnHover
        striped
        totalRecords={totalItems}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={setPage}
        sortStatus={sortStatus}
        //onSortStatusChange={handleSortStatusChange}
        onSortStatusChange={setSortStatus}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        pinLastColumn
        columns={[
          {accessor: 'id', sortable: true},
          {
            accessor: 'email', sortable: true,
            filter: (
              <TextInput
                label="Email"
                description="Show users whose email include the specified text"
                placeholder="Search users..."
                leftSection={<IconSearch size={16}/>}
                rightSection={
                  <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery('')}>
                    <IconX size={14}/>
                  </ActionIcon>
                }
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
            ),
            filtering: query !== '',
          },
          {accessor: 'avatar', render: (item) => (<Avatar src={item.avatar} alt="avatar" />)},
          {accessor: 'firstName', sortable: true},

          {accessor: 'lastName', sortable: true},
          {
            accessor: 'roles', render: user => {
              return (<Stack gap={"3"}>{user.roles.map(role => (
                  <Badge variant={role.role === "ADMIN" || role.role === "MODERATOR" ? "danger" : "default"} mr={4}>{role.role}</Badge>))}</Stack>
              );
            }
          },
          {
            accessor: 'enabled', sortable: true, render: (item) => (
              <Badge variant={!item.enabled ? "danger" : "default"}>{item.enabled ? "Yes" : "No"}</Badge>
            )
          },
          {accessor: 'actions', render: (user) => (<RowActions user={user}/>)},
        ]}
      />
    </>
  );

}
