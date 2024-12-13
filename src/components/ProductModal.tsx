import React, { FC, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Image } from "@mantine/core";
import { AppContext } from "@/providers/AppProvider";
import { getProducts } from "@/api";
import { ProductI, ReviewI } from "@/types/interfaces";
import { Carousel } from "@mantine/carousel";

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

const ProductDetails: FC<{ product: ProductI }> = ({
  product: {
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
  },
}) => {
  return (
    <>
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


      <Carousel withIndicators height={"auto"}>
        {images.map((src, index) => {
          return (
            <Carousel.Slide>
              <Image key={index} src={src} />;
            </Carousel.Slide>
          );
        })}
      </Carousel>


      {reviews.map((review, index) => {
        return <ReviewCard key={index} review={review} />;
      })}
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
