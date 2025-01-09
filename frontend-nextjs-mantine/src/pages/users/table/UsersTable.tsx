import {DataTable, DataTableSortStatus} from 'mantine-datatable';
import {ActionIcon, Avatar, Badge, Button, Group, Stack, TextInput, Loader} from "@mantine/core";
import {useState} from "react";
import {User} from "@/pages/users";
import RowActions from "@/pages/users/table/RowActions.tsx";
import {IconSearch, IconUserPlus, IconX} from "@tabler/icons-react";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import 'mantine-datatable/styles.css';
import {Link} from "react-router-dom";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

const PAGE_SIZES = [10, 15, 20];

export const UsersTable = () => {
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
  const totalItems: number = data?.data.totalItems
  return (
    <>
      <Group justify={"space-between"}>
        <h2>Users</h2>
        <Link to={"/admin/users/create"}><Button><IconUserPlus/><span>New user</span></Button></Link>
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
            // TODO: remove badges
            accessor: 'roles', sortable: true, render: item => {
              return (<Stack gap={"3"}>{item.roles.map(item => (
                  <Badge variant={item === "ADMIN" || item === "MODERATOR" ? "danger" : "default"}
                         mr={4}>{item}</Badge>))}</Stack>
              );
            }
          },
          {
            accessor: 'enabled', sortable: true, render: (item) => (
              <Badge variant={!item.enabled ? "danger" : "default"}>{item.enabled ? "Yes" : "No"}</Badge>
            )
          },
          {accessor: 'actions', render: (item) => (<RowActions item={item}/>)},
        ]}
      />
    </>
  );

}
