import React from "react";
import ContentLoader from "react-content-loader";
import { Skeleton } from "@mantine/core";

export const SkeletonCard = () => (
  <div>
    <Skeleton height={500} mb="md" radius={"md"} />
  </div>
);
