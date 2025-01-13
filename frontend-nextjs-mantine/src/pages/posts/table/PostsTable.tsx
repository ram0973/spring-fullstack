import {DataTable, DataTableSortStatus} from 'mantine-datatable';
import {ActionIcon, Badge, Button, Group, Image, Loader, TextInput} from "@mantine/core";
import {useState} from "react";
import RowActions from "@/pages/posts/table/RowActions.tsx";
import {IconSearch, IconUserPlus, IconX} from "@tabler/icons-react";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import 'mantine-datatable/styles.css';
import {Link} from "react-router-dom";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {Post} from "@/pages/posts";

const PAGE_SIZES = [10, 15, 20];

export const PostsTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');
  const [sortStatus, setSortStatus] =
    useState<DataTableSortStatus<Post>>({
      columnAccessor: 'id',
      direction: 'asc',
    });
  const [selectedRecords, setSelectedRecords] = useState<Post[]>([]);
  const getPostsApi = async () => {
    //await new Promise(resolve => setTimeout(resolve, 100)); // for loader testing
    return await axiosInstance.get(
      `/api/v1/posts?page=${page - 1}&size=${pageSize}&sort=${sortStatus.columnAccessor},${sortStatus.direction}`
    );
  }
  const useGetPosts = () => {
    return useQuery({
      queryKey: ["posts", page, pageSize, query, sortStatus],
      queryFn: () => getPostsApi(),
      placeholderData: keepPreviousData,
      staleTime: 15 * 1000,
      gcTime: 5 * 60 * 1000
    })
  }
  let {data, error, isFetching} = useGetPosts();
  if (error) {
    return "Error: " + error.message;
  }
  if (isFetching) {
    return <Loader/>;
  }
  const posts: Post[] = data?.data.posts;
  const totalItems = data?.data.totalItems;

  return (
    <>
      <Group justify={"space-between"}>
        <h2>Posts</h2>
        <Link to={"/admin/posts/create"}><Button><IconUserPlus/><span>New post</span></Button></Link>
      </Group>
      <DataTable
        records={posts}
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
            accessor: 'title', sortable: true,
            render: (item) => (item.title.slice(0, 150) + (item.title.length > 150 ? "..." : " ")),
            filter: (
              <TextInput
                label="Title"
                description="Show posts wuth titles include the specified text"
                placeholder="Search posts..."
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
          // {accessor: 'category', render: (item) => item.category?.title, sortable: true},
          {accessor: 'image', render: (item) => (<Image src={item.image} h={50} w="auto" fit="contain" />)},
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
