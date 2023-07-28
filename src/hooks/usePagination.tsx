import { useMemo } from "react"

type TPaginationProps = {
    pageSize: number,
    totalCount: number,
    currentPage: number,
    siblingCount: number,
}

export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }: TPaginationProps) => {
    const paginationRange = useMemo(() => {
        // implementation logic

        const range = (start: number, end: number) => {
            let length = end - start + 1;
            return Array.from({ length }, (_, index) => index + start);
        }

        const totalPageCount = Math.ceil(totalCount / pageSize);

    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
}