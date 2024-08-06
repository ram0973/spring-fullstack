import {Link, useRouteError} from "react-router-dom";

import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import image from './image.svg';
import classes from './ErrorPage.module.css';

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            <i>{error.message}</i>
          </Text>
          <Button variant="outline" size="md" mt="xl" className={classes.control}>
            <Link to={"/"}>Get back to home page</Link>
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
