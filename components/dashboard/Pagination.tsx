"use client"
import styles from "./pagination.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  count: number;
}

const Pagination: React.FC<PaginationProps> = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page") || "1", 10);

  const params = new URLSearchParams(searchParams.toString());
  const ITEM_PER_PAGE = 5;

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type: 'prev' | 'next'): void => {
    type === "prev"
      ? params.set("page", (page - 1).toString())
      : params.set("page", (page + 1).toString());
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}>Previous</button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}>Next</button>
    </div>
  );
};

export default Pagination;
