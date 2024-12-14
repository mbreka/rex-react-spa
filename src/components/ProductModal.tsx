import React, { FC, useContext, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Image, ActionIcon, Badge, Box, Card, Group, rem } from "@mantine/core";
import { AppContext } from "@/providers/AppProvider";
import { getProducts } from "@/api";
import { CartMeta, ProductI, ReviewI } from "@/types/interfaces";
import { Carousel } from "@mantine/carousel";
import { IconEye, IconChevronDown, IconChevronUp } from "@tabler/icons-react";

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
    // console.log({ productMeta });

    setProductMeta(getProductCartMeta(product));
  }, [product, cart]);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%", justifyContent: "space-between" }}>
        <Card.Section>
          <Carousel withIndicators height={"auto"}>
            {images.map((src, index) => {
              return (
                <Carousel.Slide key={src}>
                  <Image key={index} src={src} />;
                </Carousel.Slide>
              );
            })}
          </Carousel>
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
          <Text size="xl" fw={500}>{price}$</Text>
          {discountPercentage > 0 && <Badge color="pink">-{discountPercentage}%</Badge>}
        </Group>

        <Text
          onClick={() => {
            setSelected(product);
          }}
          size="sm"
          c="dimmed"
        >
          {description}
        </Text>

        <Box
          mt={rem(20)}
          w={"100%"}
          style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          {/* <ActionIcon
            color="blue"
            radius="md"
            onClick={() => {
              setSelected(product);
            }}
          >
            <IconEye />
          </ActionIcon> */}

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

          <Group justify="space-between" mt="md" mb="xs">
            <Box></Box>
            <Box></Box>
          </Group>
          {/* <Box>
            <Text>{title}</Text>
            <Text>{description}</Text>
            <Text>{category}</Text>
            <Text>{price}$</Text>
            <Text>{discountPercentage}</Text>
            <Text>{rating}</Text>
            <Text>{stock}</Text>
            <Text>{tags}</Text>
            <Text>{brand}</Text>
            <Text>{sku}</Text>
            <Text>{weight}</Text>
            <Text>{warrantyInformation}</Text>
            <Text>{shippingInformation}</Text>
            <Text>{availabilityStatus}</Text>
            <Text>{returnPolicy}</Text>
            <Text>{minimumOrderQuantity}</Text>
          </Box>

          {reviews.map((review, index) => {
            return <ReviewCard key={index} review={review} />;
          })} */}
        </Box>
      </Card>
    </>
  );
};

const ProductModal: FC = () => {
  const { selected, setSelected } = useContext(AppContext)!;

  return (
    <>
      <Modal opened={!!selected} size={"xl"} onClose={() => setSelected(undefined)} title="Product Description">
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
