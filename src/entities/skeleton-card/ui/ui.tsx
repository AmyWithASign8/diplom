import React from "react";
import ContentLoader from "react-content-loader";
import { Skeleton } from "@mantine/core";

export const SkeletonCard = () => (
  <div>
    <Skeleton height={300} mb="md" radius={"md"} />
    <Skeleton height={220} radius="md" />
  </div>
);
