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
  Stack,
} from "@mantine/core";
import { AppContext } from "@/providers/AppProvider";
import { getProducts } from "@/api";
import { CartMeta, ProductI, ReviewI } from "@/types/interfaces";
import {
  IconChartFunnel,
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconFilter,
  IconSearch,
  IconSort09,
  IconSort90,
} from "@tabler/icons-react";
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
  const { selected, setSelected, totalProducts, cart, getProductCartMeta, removeProductFromCart, addProductToCart } =
    useContext(AppContext)!;
  const [productMeta, setProductMeta] = useState<CartMeta<ProductI>>();
  useEffect(() => {
    // console.log({ productMeta });

    setProductMeta(getProductCartMeta(product));
  }, [product, cart]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%", justifyContent: "space-between" }}>
      <Card.Section
        onClick={() => {
          setSelected(product);
        }}
      >
        <Image src={thumbnail} h={160} alt={"Image of " + title} />
      </Card.Section>

      <Group
        onClick={() => {
          setSelected(product);
        }}
        justify="space-between"
        mt="md"
        mb="xs"
      >
        <Text fw={500}>{title}</Text>
      </Group>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{price}$</Text>
        {discountPercentage > 0 && <Badge color="pink">-{discountPercentage}%</Badge>}
      </Group>

      <Text
        onClick={() => {
          setSelected(product);
        }}
        size="sm"
        c="dimmed"
      >
        {description.substring(0, 100) + `${description.length > 99 ? "..." : ""}`}
      </Text>

      <Box
        mt={rem(20)}
        w={"100%"}
        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
      >
        <ActionIcon
          color="blue"
          radius="md"
          onClick={() => {
            setSelected(product);
          }}
        >
          <IconEye />
        </ActionIcon>

        <ActionIcon.Group>
          <ActionIcon
            variant="default"
            size="md"
            radius="md"
            onClick={() => {
              if (!productMeta) {
                return;
              }
              removeProductFromCart(productMeta);
            }}
          >
            <IconChevronDown color="var(--mantine-color-red-text)" />
          </ActionIcon>
          <ActionIcon.GroupSection variant="default" size="md" bg="var(--mantine-color-body)" miw={60}>
            {/* {value} */}
            {productMeta?.quantity || 0}
          </ActionIcon.GroupSection>
          <ActionIcon
            variant="default"
            size="md"
            radius="md"
            onClick={() => {
              if (!productMeta) {
                return;
              }
              addProductToCart(productMeta);
            }}
          >
            <IconChevronUp color="var(--mantine-color-teal-text)" />
          </ActionIcon>
        </ActionIcon.Group>
      </Box>
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
  const [filterCategories, setFilterCategories] = useState<string[]>([]);

  const { selected, setSelected, products, queryProducts, totalProducts, categories } = useContext(AppContext)!;

  useEffect(() => {
    queryProducts({
      limit,
      skip: (page - 1) * limit,
      q: search,
      ...getSortOrderObjectFromString(sort),
      categories: filterCategories,
    });
  }, [limit, page, sort, filterCategories]);

  useEffect(() => {
    // console.log(totalProducts / page);
    // console.log({ totalProducts, productPerPage: page });
    // console.log(Math.ceil(totalProducts / page));
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
              onKeyDownCapture={(e) => {
                if (["Enter"].includes(e.key)) {
                  e.preventDefault();
                  setPage(1);
                  queryProducts({
                    limit,
                    q: search,
                    ...getSortOrderObjectFromString(sort),
                  });
                }
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
                queryProducts({
                  limit,
                  q: search,
                  ...getSortOrderObjectFromString(sort),
                });
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
              <Card>
                <Stack>
                  <CategoriesSelect
                    categories={categories}
                    onFilterChange={(v) => {
                      setFilterCategories(v);
                    }}
                  />
                  <Box style={{ display: "flex", flexDirection: "row", gap: rem(20) }}>
                    <NativeSelect
                      value={sort}
                      onChange={(e) => {
                        setSort(e.target.value);
                      }}
                      label="Sort by"
                      description="Product placement"
                      data={["Price ascending", "Price descending", "Title ascending", "Title descending"]}
                    />

                    <NativeSelect
                      value={limit}
                      onChange={(e) => {
                        setLimit(Number(e.target.value));
                      }}
                      label="Items per page"
                      description="Products shown per page"
                      data={["10", "20", "40"]}
                    />
                  </Box>
                </Stack>
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
