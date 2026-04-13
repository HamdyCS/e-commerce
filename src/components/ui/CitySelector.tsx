import type { SelectHTMLAttributes } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useGetAllCities from "../../hooks/city";

interface CitySelectorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export default function CitySelector(props: CitySelectorProps) {
  const { data: cities } = useGetAllCities();
  const { i18n } = useTranslation();


  const cityElements = useMemo(() => {
    return cities?.map((city) => (
      <option className="p-2 bg-transparent" key={city.id} value={city.id}>
        {i18n.language === "ar" ? city.nameAr : city.nameEn}
      </option>
    ));
  }, [cities]);

  return (
    <select
      {...props}
      className={`border border-black/20 dark:border-white/20 p-2 rounded-lg ${props.className}`}
    >
      {cityElements}
    </select>
  );
}
