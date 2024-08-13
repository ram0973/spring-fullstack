import {DataTable, DataTableSortStatus} from 'mantine-datatable';
import {ActionIcon, Button, Checkbox, Group, TextInput} from "@mantine/core";
import {useState} from "react";
import useSWR from "swr";
import {User} from "@/pages/users";
import RowActions from "@/pages/users/table/RowActions.tsx";
import {IconSearch, IconUserPlus, IconX} from "@tabler/icons-react";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import 'mantine-datatable/styles.css';

const PAGE_SIZES = [10, 15, 20];

export const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [query, setQuery] = useState('');
  const [sortStatus, setSortStatus] =
    useState<DataTableSortStatus<User>>({
      columnAccessor: 'id',
      direction: 'asc',
    });
  const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    //await new Promise(resolve => setTimeout(resolve, 100)); // for loader testing
    return response.data;
  };

  const {data, error, isLoading} = useSWR(
    `http://localhost:8000/api/v1/users?page=${page - 1}&size=${pageSize}&sort=${sortStatus.columnAccessor},${sortStatus.direction}`,
    fetcher
  );
  if (error) {
    return "Error: " + error;
  }
  if (isLoading) {
    return "Loading...";
  }
  if (data) {
    return (
      <>
        <Group justify={"space-between"}>
          <h2>Users</h2>
          <Button><IconUserPlus/><span>New user</span></Button>
        </Group>
        <DataTable
          records={data.users}
          withTableBorder
          //withColumnBorders
          highlightOnHover
          striped
          totalRecords={data?.totalItems}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={setPage}
          sortStatus={sortStatus}
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
            {accessor: 'firstName', sortable: true},
            {accessor: 'lastName', sortable: true},
            {accessor: 'enabled', sortable: true, render: (item) => (<Checkbox disabled checked={item.enabled}/>)},
            {accessor: 'actions', render: (item) => (<RowActions item={item}/>)},
          ]}
        />
      </>
    );
  }
}
