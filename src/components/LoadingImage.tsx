import { Box, Center, Image, Loader } from "@mantine/core";
import React, { FC, useEffect } from "react";
import { useState } from "react";

const LoadingImage: FC<{ src: string; h?: number; alt?: string }> = ({ src, h, alt }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <Center h={h}>
      <Image
        src={src}
        alt={alt}
        h={h}
        w={"auto"}
        style={{ display: loading ? "none" : "block" }}
        onLoad={(e) => {
          setLoading(false);
        }}
      />
      {loading && <Loader color="blue" type="dots" />}
    </Center>
  );
};

export { LoadingImage };
