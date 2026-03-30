import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

interface SellerProductRateProps {
  rate: number;
  reviewCount: number;
}

export default function SellerProductRate({
  rate,
  reviewCount,
}: SellerProductRateProps) {
  const { t } = useTranslation();

  const starElements = Array.from({
    length: 5,
  }).map((_, i) => (
    <FontAwesomeIcon
      icon={faStar}
      key={i}
      color={i < Math.round(rate || 0) ? "gold" : "gray"}
    />
  ));
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">{starElements}</div>
      <p>
        ({reviewCount}) {t("Reviews")}
      </p>
    </div>
  );
}
