import {DataTable} from 'mantine-datatable';
import {Button, Group, Loader} from "@mantine/core";
import {useState} from "react";
import RowActions from "@/pages/posts-categories/table/RowActions.tsx";
import {IconUserPlus} from "@tabler/icons-react";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import 'mantine-datatable/styles.css';
import {Link} from "react-router-dom";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {PostCategory} from "@/pages/posts-categories";

//const PAGE_SIZES = [10, 15, 20];

export const PostsCategoriesTable = () => {
  //const [page, setPage] = useState(1);
  //const [pageSize, setPageSize] = useState(10);
  //const [query, setQuery] = useState('');
  // const [sortStatus, setSortStatus] =
  //   useState<DataTableSortStatus<PostCategory>>({
  //     columnAccessor: 'id',
  //     direction: 'asc',
  //   });
  const [selectedRecords, setSelectedRecords] = useState<PostCategory[]>([]);
  const getPostsCategoriesApi = async () => {
    //await new Promise(resolve => setTimeout(resolve, 100)); // for loader testing
    return await axiosInstance.get(
      `/api/v1/posts-categories`
    );
  }
  const useGetPostsCategories = () => {
    return useQuery({
      queryKey: ["posts-categories"],
      queryFn: () => getPostsCategoriesApi(),
      placeholderData: keepPreviousData,
      staleTime: 15 * 1000,
      gcTime: 5 * 60 * 1000
    })
  }
  let {data, error, isFetching} = useGetPostsCategories();
  console.log(data);
  if (error) {
    return "Error: " + error.message;
  }
  if (isFetching) {
    return <Loader/>;
  }

  const categories: PostCategory[] = data?.data.postCategories
  //const totalItems = data?.data.totalItems
  return (
    <>
      <Group justify={"space-between"}>
        <h2>Categories</h2>
        <Link to={"/admin/posts-categories/create"}><Button><IconUserPlus/><span>New category</span></Button></Link>
      </Group>
      <DataTable
        records={categories}
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
          {accessor: 'title'},//, sortable: true},
          {accessor: 'slug'},//, sortable: true},
          {accessor: 'actions', render: (item) => (<RowActions item={item}/>)},
        ]}
      />
    </>
  );
}
