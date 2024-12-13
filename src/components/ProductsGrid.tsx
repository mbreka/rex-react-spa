import React, { FC, useContext, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Text,
  Grid,
  Card,
  Image,
  Badge,
  Group,
  Pagination,
  Box,
  Center,
  MenuDropdown,
  NativeSelect,
  Input,
  rem,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { AppContext } from "@/providers/AppProvider";
import { getProducts } from "@/api";
import { ProductI, ReviewI } from "@/types/interfaces";
import { IconSearch } from '@tabler/icons-react';

const ProductCard: FC<{ product: ProductI }> = ({ product }) => {
  const {
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions: { width, height, depth },
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    meta: { createdAt, updatedAt, barcode, qrCode },
    images,
    thumbnail,
  } = product;
  const { selected, setSelected, totalProducts } = useContext(AppContext)!;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={thumbnail} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        {discountPercentage > 0 && <Badge color="pink">On Sale</Badge>}
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => {
          setSelected(product);
        }}
      >
        View details
      </Button>
    </Card>
  );
};

const ProductsGrid: FC = () => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const { selected, setSelected, products, queryProducts, totalProducts } = useContext(AppContext)!;

  useEffect(() => {
    queryProducts({ limit, skip: (page - 1) * limit });
  }, [limit, page]);

  useEffect(() => {
    console.log(totalProducts / page);
    console.log({ totalProducts, productPerPage: page });
    console.log(Math.ceil(totalProducts / page));
  }, [page, totalProducts]);


  return (
    <>
    <Card>

      {/* <Input.Wrapper label="Search" description="Input description"> */}
        {/* <TextInput placeholder="Input component" styles={{section: { pointerEvents: 'none' }, root: {pointerEvents: 'none'}}} rightSection={} /> */}
        {/* <Button>Search</Button> */}
      {/* </Input.Wrapper> */}
      <ActionIcon onClick={()=>{console.log("HI")}}>
            <IconSearch onClick={()=>{console.log("HI")}} style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      <NativeSelect
        value={limit}
        onChange={(e) => {
            setLimit(Number(e.target.value));
        }}
        label="Items per page"
        description="Products shown per page"
        data={["5", "10", "20"]}
        />

        </Card>
      <Grid
        gutter={10}
        type="container"
        breakpoints={{ xs: "200px", sm: "300px", md: "500px", lg: "600px", xl: "700px" }}
      >
        {products &&
          products.map((product, index) => {
            return (
              <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
                <ProductCard product={product} />
              </Grid.Col>
            );
          })}
      </Grid>
      <Center w={"100%"} p={20}>
        <Pagination value={page} onChange={(v) => setPage(v)} total={Math.ceil(totalProducts / limit)} />
      </Center>
    </>
  );
};

export { ProductsGrid };
