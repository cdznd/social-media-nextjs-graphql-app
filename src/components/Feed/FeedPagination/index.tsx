'use client'

import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation';

export default function FeedPagination() {
    const router = useRouter();
    const setQueryParam = (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set(key, value);
      router.push(`?${params.toString()}`, { scroll: false }); // Updates the URL without reloading
    };
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setQueryParam('page', value.toString());
    };
    return (
        <Pagination count={50} variant="outlined" onChange={handlePaginationChange} />
    )
}

