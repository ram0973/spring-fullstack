import {DataTable, DataTableSortStatus} from 'mantine-datatable';
import {ActionIcon, Badge, Button, Group, Loader, TextInput} from "@mantine/core";
import {useState} from "react";
import {RowActions} from "@/pages/posts-comments/table/RowActions.tsx";
import {IconSearch, IconUserPlus, IconX} from "@tabler/icons-react";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import 'mantine-datatable/styles.css';
import {Link} from "react-router-dom";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {PostComment} from "@/pages/posts-comments";

const PAGE_SIZES = [10, 15, 20];

export const PostsCommentsTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');
  const [sortStatus, setSortStatus] =
    useState<DataTableSortStatus<PostComment>>({
      columnAccessor: 'id',
      direction: 'asc',
    });
  const [selectedRecords, setSelectedRecords] = useState<PostComment[]>([]);
  const getPostsCommentsApi = async () => {
    //await new Promise(resolve => setTimeout(resolve, 100)); // for loader testing
    return await axiosInstance.get(
      `/api/v1/posts-comments?page=${page - 1}&size=${pageSize}&sort=${sortStatus.columnAccessor},${sortStatus.direction}`
    );
  }
  const useGetPostsComments = () => {
    return useQuery({
      queryKey: ["posts-comments", page, pageSize, query, sortStatus],
      queryFn: () => getPostsCommentsApi(),
      placeholderData: keepPreviousData,
      staleTime: 15 * 1000,
      gcTime: 5 * 60 * 1000
    })
  }
  let {data, error, isFetching} = useGetPostsComments();
  if (error) {
    return "Error: " + error.message;
  }
  if (isFetching) {
    return <Loader/>;
  }
  const totalItems = data?.data.totalItems;

  return (
    <>
      <Group justify={"space-between"}>
        <h2>Comments</h2>
        <Link to={"/admin/posts-comments/create"}><Button><IconUserPlus/><span>New comment</span></Button></Link>
      </Group>
      <DataTable
        records={data?.data.postComments}
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
            accessor: 'content', sortable: true,
            render: (item) => (item.content?.slice(0, 150) + (item.content?.length > 150 ? "..." : "")),
            filter: (
              <TextInput
                label="Title"
                description="Show posts comments include the specified text"
                placeholder="Search comments..."
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
          {accessor: 'post', render: (item) => item.post?.id, sortable: true},
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
