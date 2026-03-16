import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { useAppSelector } from "../../redux/hook/reduxHooks";

export default function CustomSkeletonTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkTheme } = useAppSelector((state) => state.theme);
  return (
    <SkeletonTheme
      baseColor={isDarkTheme ? "#1e0021" : ""}
      highlightColor={isDarkTheme ? "#2c466e" : ""}
    >
      {children}
    </SkeletonTheme>
  );
}
