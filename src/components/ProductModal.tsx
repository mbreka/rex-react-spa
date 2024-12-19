import React, { FC, useContext, useEffect, useState } from "react";
import { Modal, Text, Image, ActionIcon, Badge, Box, Card, Group, rem, Table, Rating } from "@mantine/core";
import { AppContext } from "@/providers/AppProvider";
import { CartMeta, ProductI, ReviewI } from "@/types/interfaces";
import { Carousel } from "@mantine/carousel";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { formatCurrency } from "@/helpers";

const ReviewCard: FC<{ review: ReviewI }> = ({ review: { rating, comment, date, reviewerName, reviewerEmail } }) => {
  return (
    <>
      <Text>{rating}</Text>
      <Text>{comment}</Text>
      <Text>{date}</Text>
      <Text>{reviewerName}</Text>
      <Text>{reviewerEmail}</Text>
    </>
  );
};

const ProductDetails: FC<{ product: ProductI }> = ({ product }) => {
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
    setProductMeta(getProductCartMeta(product));
  }, [product, cart]);

  return (
    <>
      <Box style={{ height: "100%", justifyContent: "space-between" }}>
        <Box style={{ height: "100%", maxHeight: 400, display: "flex" }}>
          <Carousel
            withIndicators
            height="100%"
            style={{ flex: 1 }}
            slideGap={{ base: 0, sm: "md" }}
            slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          >
            {images.map((src, index) => {
              return (
                <Carousel.Slide key={src}>
                  <Image key={index} src={src} />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </Box>

        <Group justify="space-between" mt="md" mb="xs">
          <Text size="xl" fw={700}>
            {formatCurrency(price)}
          </Text>
          {discountPercentage > 0 && <Badge color="pink">-{discountPercentage}%</Badge>}
        </Group>

        <Group justify="space-between" mt="md" mb="xs"></Group>
        <Text
          onClick={() => {
            setSelected(product);
          }}
          size="sm"
          c="dimmed"
        >
          {description}
        </Text>
        <Group justify="space-between" my="xl" mb="xs">
          <Rating value={rating} size={"lg"} />
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
        </Group>

        <Group justify="space-between" mt="md" mb="xs">
          <Text size="lg" fw={500}>
            Details
          </Text>
          <Table>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Category</Table.Td>
                <Table.Td>{category}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Rating</Table.Td>
                <Table.Td>{rating}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Stock</Table.Td>
                <Table.Td>{stock}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Tags</Table.Td>
                <Table.Td>{tags.join(", ")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Brand</Table.Td>
                <Table.Td>{brand}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>SKU</Table.Td>
                <Table.Td>{sku}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Weight</Table.Td>
                <Table.Td>{weight}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Warranty Information</Table.Td>
                <Table.Td>{warrantyInformation}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Shipping Information</Table.Td>
                <Table.Td>{shippingInformation}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Availability Status</Table.Td>
                <Table.Td>{availabilityStatus}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Return Policy</Table.Td>
                <Table.Td>{returnPolicy}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Minimum Order Quantity</Table.Td>
                <Table.Td>{minimumOrderQuantity}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Group>
        <Group justify="space-between" mt="md" mb="xs">
          <Text size="lg" fw={500}>
            Dimensions
          </Text>
          <Table>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Width</Table.Td>
                <Table.Td>{width} m</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Height</Table.Td>
                <Table.Td>{height} m</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Depth</Table.Td>
                <Table.Td>{depth} m</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Group>

        <Box
          mt={rem(20)}
          w={"100%"}
          style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          {/* 
          {reviews.map((review, index) => {
            return <ReviewCard key={index} review={review} />;
          })} */}
        </Box>
      </Box>
    </>
  );
};

const ProductModal: FC = () => {
  const { selected, setSelected } = useContext(AppContext)!;

  return (
    <>
      <Modal opened={!!selected} size={"xl"} onClose={() => setSelected(undefined)} title={selected?.title}>
        {!!selected && <ProductDetails product={selected} />}
      </Modal>

      {/* <Button
        variant="default"
        onClick={async () => {
          const allP = await getProducts();
          setSelected(allP.products[1]);
        }}
      >
        Open modal
      </Button> */}
    </>
  );
};

export { ProductModal };
