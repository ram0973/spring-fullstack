import {DataTable, DataTableSortStatus} from 'mantine-datatable';
import {Button, Group, Loader} from "@mantine/core";
import {useState} from "react";
import RowActions from "@/pages/users-roles/table/RowActions.tsx";
import {IconUserPlus} from "@tabler/icons-react";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import 'mantine-datatable/styles.css';
import {Link} from "react-router-dom";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {UserRole} from "@/pages/users-roles";

//const PAGE_SIZES = [10, 15, 20];

export const UsersRolesTable = () => {
  //const [page, setPage] = useState(1);
  //const [pageSize, setPageSize] = useState(10);
  //const [query, setQuery] = useState('');
  // const [sortStatus, setSortStatus] =
  //   useState<DataTableSortStatus<UserRole>>({
  //     columnAccessor: 'id',
  //     direction: 'asc',
  //   });
  const [selectedRecords, setSelectedRecords] = useState<UserRole[]>([]);
  const getUsersRolesApi = async () => {
    //await new Promise(resolve => setTimeout(resolve, 100)); // for loader testing
    return await axiosInstance.get(
      `/api/v1/roles`
    );
  }
  const useGetUsersRoles = () => {
    return useQuery({
      queryKey: ["roles"],
      queryFn: () => getUsersRolesApi(),
      placeholderData: keepPreviousData,
      staleTime: 15 * 1000,
      gcTime: 5 * 60 * 1000
    })
  }
  let {data, error, isFetching} = useGetUsersRoles();
  if (error) {
    return "Error: " + error.message;
  }
  if (isFetching) {
    return <Loader />;
  }

  const roles: UserRole[] = data?.data
  //const totalItems = data?.data.totalItems
  return (
    <>
      <Group justify={"space-between"}>
        <h2>Roles</h2>
        <Link to={"/admin/roles/create"}><Button><IconUserPlus/><span>New role</span></Button></Link>
      </Group>
      <DataTable
        records={roles}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        withTableBorder
        //withColumnBorders
        highlightOnHover
        striped
        //totalRecords={totalItems}
        //recordsPerPage={pageSize}
        //page={page}
        //onPageChange={setPage}
        //sortStatus={sortStatus}
        //onSortStatusChange={handleSortStatusChange}
        //onSortStatusChange={setSortStatus}
        //recordsPerPageOptions={PAGE_SIZES}
        //onRecordsPerPageChange={setPageSize}
        pinLastColumn
        columns={[
          {accessor: 'id'},//, sortable: true},
          {accessor: 'role'},//, sortable: true},
          {accessor: 'actions', render: (item) => (<RowActions item={item}/>)},
        ]}
      />
    </>
  );
}
