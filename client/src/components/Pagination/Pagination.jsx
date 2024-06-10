import React, { useCallback } from "react";

import BPagination from "react-bootstrap/Pagination";

export const Pagination = ({activePage, setPage, lastPage}) => {

    const first = useCallback(() => setPage(1), [setPage]);
    const last = useCallback(() => setPage(lastPage), [setPage, lastPage]);

    const prev = useCallback(() => setPage(v => v-1), [setPage]);
    const next = useCallback(() => setPage(v => v+1), [setPage]);

    const veryPrev = useCallback(() => setPage(v => v-5), [setPage]);
    const veryNext = useCallback(() => setPage(v => v+5), [setPage]);
    return (
        <BPagination>
            <BPagination.First onClick={first} disabled={activePage === 1} />
            <BPagination.Prev onClick={prev} disabled={activePage === 1} />

            {
                activePage > 5 && <BPagination.Item key={-5} onClick={veryPrev}>{activePage-5}</BPagination.Item>
            }
            {
                activePage > 3 && activePage <= 5 && <BPagination.Item key={-4} onClick={first}>{1}</BPagination.Item>
            }
            {
                activePage > 4 && <BPagination.Ellipsis />
            }

            <BPagination.Item key={0} active={true}>{activePage}</BPagination.Item>

            {
                activePage < lastPage - 3 && <BPagination.Ellipsis />
            }
            {
                activePage < lastPage - 2 && activePage >= lastPage - 4 && <BPagination.Item key={4} onClick={last}>{lastPage}</BPagination.Item>
            }
            {
                activePage < lastPage - 4 && <BPagination.Item key={5} onClick={veryNext}>{activePage+5}</BPagination.Item>
            }
            
            <BPagination.Next onClick={next} disabled={activePage === lastPage} />
            <BPagination.Last onClick={last} disabled={activePage === lastPage} />
        </BPagination>
    );
};
