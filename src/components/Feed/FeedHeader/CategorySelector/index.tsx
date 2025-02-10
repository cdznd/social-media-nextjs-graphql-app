'use client'

import { Box, Chip } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategorySelector({ categories = [] }: { categories: any }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");

    const handleCategoryClick = (category: string) => {
        // TODO: Better understand this part here
        const params = new URLSearchParams(searchParams.toString());
        if (selectedCategory === category) {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Box
            sx={{
                display: "inline-flex",
                flexDirection: "row",
                gap: 3,
                overflow: "auto",
            }}
        >
            {categories.map((category) => (
                <Chip
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    size="medium"
                    variant="filled"
                    label={category.name}
                    sx={{
                        color: selectedCategory === category ? "white" : "inherit",
                        border: selectedCategory === category ? "1px solid red" : "none",
                    }}
                />
            ))}
        </Box>
    )
}