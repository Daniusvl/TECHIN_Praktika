import React, { useCallback } from "react";

import Pagination from "react-bootstrap/Pagination";

export const TourPagination = ({page, setPage, lastPage}) => {

    const first = useCallback(() => setPage(1), [setPage]);
    const last = useCallback(() => setPage(lastPage), [setPage, lastPage]);

    const prev = useCallback(() => setPage(v => v-1), [setPage]);
    const next = useCallback(() => setPage(v => v+1), [setPage]);

    // const prevPrev = useCallback(() => setPage(v => v-2), [setPage]);
    // const nextNext = useCallback(() => setPage(v => v+2), [setPage]);

    const veryPrev = useCallback(() => setPage(v => v-5), [setPage]);
    const veryNext = useCallback(() => setPage(v => v+5), [setPage]);
    return (
        <Pagination>
            <Pagination.First onClick={first} disabled={page === 1} />
            <Pagination.Prev onClick={prev} disabled={page === 1} />

            {
                page > 5 && <Pagination.Item key={-5} onClick={veryPrev}>{page-5}</Pagination.Item>
            }
            {
                page > 3 && page <= 5 && <Pagination.Item key={-4} onClick={first}>{1}</Pagination.Item>
            }
            {
                page > 4 && <Pagination.Ellipsis />
            }
            {/* {
                page > 2 && <Pagination.Item key={-2} onClick={prevPrev}>{page-2}</Pagination.Item>
            }
            {
                page > 1 && <Pagination.Item key={-1} onClick={prev}>{page-1}</Pagination.Item>
            } */}

            <Pagination.Item key={0} active={true}>{page}</Pagination.Item>

            {/* {
                page < lastPage && <Pagination.Item key={1} onClick={next}>{page+1}</Pagination.Item>
            }
            {
                page < lastPage - 1 && <Pagination.Item key={2} onClick={nextNext}>{page+2}</Pagination.Item>
            } */}
            {
                page < lastPage - 3 && <Pagination.Ellipsis />
            }
            {
                page < lastPage - 2 && page >= lastPage - 4 && <Pagination.Item key={4} onClick={last}>{lastPage}</Pagination.Item>
            }
            {
                page < lastPage - 4 && <Pagination.Item key={5} onClick={veryNext}>{page+5}</Pagination.Item>
            }
            
            <Pagination.Next onClick={next} disabled={page === lastPage} />
            <Pagination.Last onClick={last} disabled={page === lastPage} />
        </Pagination>
    );
};
