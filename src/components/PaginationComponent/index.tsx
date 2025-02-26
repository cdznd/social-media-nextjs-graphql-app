'use client'

import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation';

// TODO: Fix the update of the pagination currentPage based on the page param
export default function PaginationComponent({ totalPages }: { totalPages: number }) {
    const router = useRouter();
    const setQueryParam = (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set(key, value);
      router.push(`?${params.toString()}`, { scroll: false }); // Updates the URL without reloading
    };
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        setQueryParam('page', value.toString());
    };
    return (
        <Pagination count={totalPages} variant="outlined" onChange={handlePaginationChange} />
    )
}

