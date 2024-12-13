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
  Space,
} from "@mantine/core";
import { AppContext } from "@/providers/AppProvider";
import { getProducts } from "@/api";
import { ProductI, ReviewI } from "@/types/interfaces";
import { IconChartFunnel, IconFilter, IconSearch, IconSort09, IconSort90 } from "@tabler/icons-react";
import { CategoriesSelect } from "./CategoriesSelect";

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
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%", justifyContent: "space-between" }}>
      <Card.Section>
        <Image src={thumbnail} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        {discountPercentage > 0 && <Badge color="pink">On Sale</Badge>}
      </Group>

      <Text size="sm" c="dimmed">
        {description.substring(0, 100) + `${description.length > 99 ? "..." : ""}`}
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

const getSortOrderObjectFromString = (type: string): { sortBy: string; order: string } => {
  const [s, o] = type.split(" ");
  return {
    sortBy: s.toLocaleLowerCase(),
    order: o === "descending" ? "desc" : "asc",
  };
};

const ProductsGrid: FC = () => {
  const [filters, setFilters] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(20);
  const [sort, setSort] = useState<string>("Title ascending");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const { selected, setSelected, products, queryProducts, totalProducts } = useContext(AppContext)!;

  useEffect(() => {
    queryProducts({ limit, skip: (page - 1) * limit, q: search, ...getSortOrderObjectFromString(sort) });
  }, [limit, page, sort]);

  useEffect(() => {
    console.log(totalProducts / page);
    console.log({ totalProducts, productPerPage: page });
    console.log(Math.ceil(totalProducts / page));
  }, [page, totalProducts, sort]);

  return (
    <>
      <Card mb={rem(20)}>
        {/* <Input.Wrapper label="Search" description="Input description"> */}
        {/* <TextInput placeholder="Input component" styles={{section: { pointerEvents: 'none' }, root: {pointerEvents: 'none'}}} rightSection={} /> */}
        {/* <Button>Search</Button> */}
        {/* </Input.Wrapper> */}
        <Center>
          <Center display={"flex"} w={{ base: "100%", md: "50%" }}>
            <TextInput
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              w={"100%"}
              mr={rem(8)}
            />

            <ActionIcon
              onClick={() => {
                setFilters(!filters);
              }}
              size={"lg"}
              variant={filters ? "filled" : "light"}
              mr={rem(4)}
            >
              <IconFilter style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                setPage(1);
                queryProducts({ limit, q: search, ...getSortOrderObjectFromString(sort) });
              }}
              size={"lg"}
            >
              <IconSearch style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Center>
        </Center>
        <Center>
          <Center w={{ base: "100%", md: "50%" }}>
            {filters && (
              <Card style={{ display: "flex", flexDirection: "row", gap: rem(20) }}>
                <NativeSelect
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                  label="Sort by"
                  description="Product placement"
                  defaultValue={"Title ascending"}
                  data={["Price ascending", "Price descending", "Title ascending", "Title descending"]}
                />

                <NativeSelect
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                  }}
                  label="Items per page"
                  description="Products shown per page"
                  defaultValue={"20"}
                  data={["10", "20", "40"]}
                />

                <CategoriesSelect />
              </Card>
            )}
          </Center>
        </Center>
        <Center mt={rem(4)}>
          <Text>Query returned {totalProducts} results.</Text>
        </Center>
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
