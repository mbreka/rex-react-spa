import React, { FC, useContext, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Grid, Card, Image, Badge, Group, Pagination, Box, Center, MenuDropdown, NativeSelect } from "@mantine/core";
import { AppContext } from "@/providers/AppProvider";
import { getProducts } from "@/api";
import { ProductI, ReviewI } from "@/types/interfaces";

const ProductCard: FC<{ product: ProductI }> = ({
  product,
}) => {

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
    const { selected, setSelected } = useContext(AppContext)!;

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

      <Button color="blue" fullWidth mt="md" radius="md" onClick={()=>{
        setSelected(product)
      }}>
        View details
      </Button>
    </Card>
  );
};

const ProductsGrid: FC = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
  const { selected, setSelected, products, queryProducts } = useContext(AppContext)!;

  useEffect(() => {
    queryProducts({limit,skip: (page-1)*limit});
  }, [limit, page]);

  return (
    <>
<NativeSelect value={limit} onChange={(e)=>{
setLimit(Number(e.target.value))
}} label="Show per page" description="Products shown per page" data={['5', '10', '20']} />

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
        
      <Pagination value={page} onChange={(v)=>setPage(v)} total={10} />
      </Center>
    </>
  );
};

export { ProductsGrid };
