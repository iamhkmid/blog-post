import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import styles from "./Pagination.module.css";
import PaginationLoading from "../../Loading/PaginationLoading";

type PaginationProps = {
  count: number;
  onChange: (page: number) => void;
  value: number;
  isLoading: boolean;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const pages = React.useMemo(() => {
    const pages = Array.from({ length: props.count }, (_, i) => i + 1);
    if (pages.length <= 5) {
      return {
        left: pages,
        right: [],
      };
    } else if (props.value < 6) {
      return {
        left: pages.slice(0, 6),
        right: [pages.length],
      };
    } else {
      const startFrom =
        props.value > 4
          ? props.value > pages.length - 5
            ? pages.length - 6
            : props.value - 2
          : 4;
      const endTo =
        props.value + 3 > pages.length ? pages.length : props.value + 3;
      const newPages = [...pages.slice(startFrom, endTo), pages.length];
      return {
        left: [1],
        right: newPages.filter((page, idx) => {
          return newPages.indexOf(page) === idx;
        }),
      };
    }
  }, [props.value, props.count]);

  return (
    <div className="flex w-full flex-col rounded-lg bg-white px-4 py-3">
      {props.isLoading && <PaginationLoading />}
      {!props.isLoading && (
        <div className="flex w-full items-center justify-center md:justify-between">
          <p className="hidden text-sm font-semibold text-slate-600 md:flex">{`Page ${props.value}/${props.count}`}</p>
          <div className="flex gap-[5px]">
            <button
              className={styles.paginationBtn + " bg-blue-50 text-slate-600"}
              onClick={() => props.onChange(props.value - 1)}
              disabled={props.value - 1 < 1}
            >
              <ChevronLeftIcon className="h-[20px]" />
            </button>
            {pages.left.map((page) => (
              <button
                className={`${styles.paginationBtn} ${
                  props.value === page
                    ? "bg-blue-500 text-white"
                    : "bg-blue-50 text-slate-600"
                }`}
                key={page}
                onClick={() => props.onChange(page)}
              >
                {page}
              </button>
            ))}
            {!!pages.right.length && (
              <div className="mx-[5px] box-content flex h-full items-end text-base font-semibold text-slate-600">
                ...
              </div>
            )}
            {pages.right.map((page) => (
              <button
                className={`${styles.paginationBtn} ${
                  props.value === page
                    ? "bg-blue-500 text-white"
                    : "bg-blue-50 text-slate-600"
                }`}
                key={page}
                onClick={() => props.onChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={styles.paginationBtn + " bg-blue-50 text-slate-600"}
              onClick={() => props.onChange(props.value + 1)}
              disabled={props.value + 1 > props.count}
            >
              <ChevronRightIcon className="h-[20px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
