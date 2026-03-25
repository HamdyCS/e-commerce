import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useGetAllCategories } from "../../../hooks/category";
import CustomSkeletonTheme from "../../ui/CustomSkeletonTheme";

interface CategoriesListProps {
  number: number;
}

export default function CategoriesList({ number }: CategoriesListProps) {
  const { i18n } = useTranslation();

  const { data, isLoading } = useGetAllCategories({
    pageNumber: number,
    pageSize: 10,
  });

  const skeltonElements = Array.from({ length: 4 }, (_, i) => (
    <Skeleton key={i} width={"200px"} height={"20px"} className="mb-5" />
  ));

  return (
    <div>
      <ul className="border-r border-r-black/20 dark:border-r-white/20 pr-8 pt-5 inline-block text-nowrap">
        {isLoading && (
          <CustomSkeletonTheme>{skeltonElements}</CustomSkeletonTheme>
        )}
        {!isLoading &&
          data?.map((category) => (
            <li key={category.id} className="mb-5">
              <Link
                to={`/categories/${category.id}`}
                className="hover:text-hover"
              >
                {i18n.language === "ar" ? category.nameAr : category.nameEn}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
