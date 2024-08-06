import { DataTable } from 'mantine-datatable';
import data from './users.json';

export const UsersTable = () => {
  return (
    <DataTable
      withTableBorder
      striped
      highlightOnHover
      columns={[
        { accessor: 'email', sortable: true },
        { accessor: 'enabled' },
      ]}
      totalRecords={data.totalItems}
      recordsPerPage={1}
      page={data.currentPage}
      records={data.users}
      onPageChange={()=>{}}
    />
  );
}
