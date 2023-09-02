import { Pagination, PaginationItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
interface CustomPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}
function CustomPagination({
  setPage,
  page,
  totalPages,
}: CustomPaginationProps) {
  const {
    i18n: { language },
  } = useTranslation();
  const arrows =
    language === "en"
      ? {
          previous: BsFillArrowLeftSquareFill,
          next: BsFillArrowRightSquareFill,
        }
      : {
          previous: BsFillArrowRightSquareFill,
          next: BsFillArrowLeftSquareFill,
        };
  return (
    <Pagination
      renderItem={(item) => (
        <PaginationItem
          components={{
            previous: arrows.previous,
            next: arrows.next,
          }}
          {...item}
          className="text-primary"
        />
      )}
      onChange={(_, value) => setPage(value)}
      page={page}
      count={totalPages}
      shape="rounded"
    />
  );
}

export default CustomPagination;
