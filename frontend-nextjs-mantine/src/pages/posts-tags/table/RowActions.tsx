import {ActionIcon, Group, Text} from '@mantine/core';
import React from 'react';
import {IconEdit, IconEye, IconTrash} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {modals} from "@mantine/modals";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";
import {AxiosError} from "axios";

const RowActions = ({item}) => {
  const deletePostTagApi = async (id: number) => {
    return await axiosInstance.delete(`/api/v1/posts-tags/${id}`)
  }

  const useDeletePostTagMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['deletePostTag'],
      mutationFn: deletePostTagApi,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["posts-tags"]}).catch((error) => console.log(error));
        console.info("Deleted post tag");
        notifications.show({
          title: 'Success',
          message: 'Post tag deleted',
        })
      },
      onError: (error: AxiosError) => {
        console.log(error);
        notifications.show({
          color: 'red',
          title: 'Error',
          message: error.response?.data?.message,
        })
      }
    });
  }

  const deletePostTagMutation = useDeletePostTagMutation();

  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        Are you sure to delete post tag with title: {item.title} ?<br/>
      </Text>
    ),
    labels: {confirm: 'Confirm', cancel: 'Cancel'},
    onConfirm: () => deletePostTagMutation.mutate(item.id),
  });
  return (
    <>
      <Group gap={4} justify="left" wrap="nowrap">
        <ActionIcon size="sm" variant="subtle" color="blue">
          <IconEye size={16}/>
        </ActionIcon>
        <Link to={`/admin/posts-tags/update/${item.id}`}>
          <ActionIcon size="sm" variant="subtle" color="blue">
            <IconEdit size={16}/>
          </ActionIcon>
        </Link>
        <ActionIcon size="sm" variant="subtle" color="red" onClick={
          (e: React.MouseEvent) => {
            e.stopPropagation();
            openModal();
          }}
        >
          <IconTrash size={16}/>
        </ActionIcon>
      </Group>
    </>
  );
};

export default RowActions;
