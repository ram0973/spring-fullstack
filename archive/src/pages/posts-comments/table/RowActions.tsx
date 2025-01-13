import {ActionIcon, Group, Text} from '@mantine/core';
import React from 'react';
import {IconEdit, IconEye, IconTrash} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {modals} from "@mantine/modals";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";
import {AxiosError} from "axios";

export const RowActions = ({item}) => {
  const deletePostCommentApi = async (id: number) => {
    return await axiosInstance.delete(`/api/v1/posts-comments/${id}`)
  }

  const useDeletePostCommentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['deletePostComment'],
      mutationFn: deletePostCommentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["posts-comments"]}).catch((error) => console.log(error));
        console.info("Deleted post comment");
        notifications.show({
          title: 'Success',
          message: 'Post comment deleted',
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

  const deletePostCommentMutation = useDeletePostCommentMutation();

  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        Are you sure to delete comment ?<br/>
      </Text>
    ),
    labels: {confirm: 'Confirm', cancel: 'Cancel'},
    onConfirm: () => deletePostCommentMutation.mutate(item.id),
  });
  return (
    <>
      <Group gap={4} justify="left" wrap="nowrap">
        <ActionIcon size="sm" variant="subtle" color="blue">
          <IconEye size={16}/>
        </ActionIcon>
        <Link to={`/admin/posts-comments/update/${item.id}`}>
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
