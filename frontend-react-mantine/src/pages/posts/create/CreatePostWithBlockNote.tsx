import {
  Breadcrumbs,
  Button,
  Container,
  FileInput,
  Input,
  Paper,
  Select,
  Switch,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import {Link, useNavigate, useParams} from 'react-router-dom';
import classes from "@/pages/posts/create/CreatePost.module.css";
import {useEffect, useState} from 'react';
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {postCreateSchema} from "@/pages/posts/create/zod.ts";
import {useCreatePost} from "@/pages/posts/create/useCreatePost.ts";
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';
import {useGetCategories} from "@/pages/posts/update/useGetCategories.ts";
import {notifications} from "@mantine/notifications";
import {useGetTags} from "@/pages/posts/update/useGetTags.ts";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);
  const ret = await fetch("/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url;
}

import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
} from "@blocknote/react";

export const CreatePostWithBlockNote = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const createPostMutation = useCreatePost()
  const errorData = (createPostMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const tags = useGetTags().data?.postTags.map(item => item.title);
  const allCategories = useGetCategories().data?.postCategories
  const categories = useGetCategories().data?.postCategories.map(item => item.title);
  console.log(useGetCategories().data?.postCategories)
  //const lowlight = createLowlight();
  //lowlight.register({ts});

  const editor = useCreateBlockNote({
    initialContent: [
    {
      type: "paragraph",
      content: "Welcome to this demo!",
    },
    {
      type: "paragraph",
      content: "Upload an image using the button below",
    },
    {
      type: "image",
    },
    {
      type: "paragraph",
    },
  ],
    uploadFile,
  });

  const onSubmitHandler = async () => {
    //event.preventDefault();

    form.setFieldValue("content", await editor.blocksToFullHTML());
    const formData = form.getValues();
    // TODO: convert to DTO
    // @ts-ignore
    const category = allCategories.find(obj => obj.title === formData['category']);
    formData['category'] = category.id;
    formData['tags'] = ([].concat(selectedTags)).toString();
    const response = createPostMutation.mutateAsync(formData)
      .catch(
        (error) => {
          console.log(error);
          notifications.show({
              color: 'red',
              title: 'Error',
              message: (error as AxiosError)?.response?.data?.message
            }
          );
        }
      )
    //navigate(`/admin/posts/view/${response.data?.id}`);
    // TODO: server validation, handle errors
    console.log(formData);
    navigate('/admin/posts');
  }

  const form = useForm<z.infer<typeof postCreateSchema>>(
    {
      mode: 'uncontrolled',
      validate: zodResolver(postCreateSchema),
      validateInputOnChange: true,
      //initialValues: {"enabled": false}
    }
  );

  useEffect(() => {
    form.setFieldValue('image', null);
    form.resetDirty();
  }, [tags, categories]);

  const items = [
    {title: 'Posts', href: '/admin/posts'},
    {title: 'Create', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  //const [content, setContent] = useState<string>("");

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container>
        <Title ta="center" className={classes.title}>
          Create post
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmitHandler}>
            <TextInput {...form.getInputProps('title')} key={form.key('title')}
                       label="Title" placeholder="Title"/>
            <TextInput {...form.getInputProps('slug')} key={form.key('slug')}
                       label="Slug" placeholder="Slug"/>
            <Select {...form.getInputProps('category')} key={form.key('category')}
                    label="Category"
                    placeholder="Pick value"
                    data={categories}/>
            <FileInput {...form.getInputProps('image')} key={form.key('image')}
                       accept="image/png,image/jpeg,image/webp"
                       clearable label="Post image" placeholder="Upload post image file"/>
            <Textarea {...form.getInputProps('excerpt')} key={form.key('excerpt')}
                      autosize resize="vertical" minRows={2} label="Post excerpt" placeholder="Post excerpt"/>
            <Input.Wrapper withAsterisk label="Post content">
              <BlockNoteView editor={editor} formattingToolbar={true}>
                {/*<FormattingToolbarController*/}
                {/*  formattingToolbar={() => (*/}
                {/*    <FormattingToolbar>*/}
                {/*      <BlockTypeSelect key={"blockTypeSelect"} />*/}

                {/*      /!* Extra button to toggle blue text & background *!/*/}


                {/*      <FileCaptionButton key={"fileCaptionButton"} />*/}
                {/*      <FileReplaceButton key={"replaceFileButton"} />*/}

                {/*      <BasicTextStyleButton*/}
                {/*        basicTextStyle={"bold"}*/}
                {/*        key={"boldStyleButton"}*/}
                {/*      />*/}
                {/*      <BasicTextStyleButton*/}
                {/*        basicTextStyle={"italic"}*/}
                {/*        key={"italicStyleButton"}*/}
                {/*      />*/}
                {/*      <BasicTextStyleButton*/}
                {/*        basicTextStyle={"underline"}*/}
                {/*        key={"underlineStyleButton"}*/}
                {/*      />*/}
                {/*      <BasicTextStyleButton*/}
                {/*        basicTextStyle={"strike"}*/}
                {/*        key={"strikeStyleButton"}*/}
                {/*      />*/}
                {/*      /!* Extra button to toggle code styles *!/*/}
                {/*      <BasicTextStyleButton*/}
                {/*        key={"codeStyleButton"}*/}
                {/*        basicTextStyle={"code"}*/}
                {/*      />*/}

                {/*      <TextAlignButton*/}
                {/*        textAlignment={"left"}*/}
                {/*        key={"textAlignLeftButton"}*/}
                {/*      />*/}
                {/*      <TextAlignButton*/}
                {/*        textAlignment={"center"}*/}
                {/*        key={"textAlignCenterButton"}*/}
                {/*      />*/}
                {/*      <TextAlignButton*/}
                {/*        textAlignment={"right"}*/}
                {/*        key={"textAlignRightButton"}*/}
                {/*      />*/}

                {/*      <ColorStyleButton key={"colorStyleButton"} />*/}

                {/*      <NestBlockButton key={"nestBlockButton"} />*/}
                {/*      <UnnestBlockButton key={"unnestBlockButton"} />*/}

                {/*      <CreateLinkButton key={"createLinkButton"} />*/}
                {/*    </FormattingToolbar>*/}
                {/*  )}*/}
                {/*/>*/}
              </BlockNoteView>
            </Input.Wrapper>
            <TagsInput
              label="Post tags"
              placeholder="Pick value or enter anything"
              data={tags}
              comboboxProps={{position: 'top', middlewares: {flip: false, shift: false}}}
              value={selectedTags}
              onChange={event => setSelectedTags(event)}/>
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
            <Button type={"submit"} mt="xl" key={"button"}>Create</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
