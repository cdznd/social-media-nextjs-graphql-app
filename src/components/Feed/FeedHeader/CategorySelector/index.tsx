'use client'
import { Box, Chip } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategorySelectorProps } from '@/types/category';
import { brand } from '@/components/common/themePrimitives';

export default function CategorySelector(
    { 
        categories = []
    }: CategorySelectorProps
) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (selectedCategory === category) {
            params.delete("page");
            params.delete("category");
        } else {
            params.delete("page");
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
            {categories.map((category) => {
                const isChecked = selectedCategory === category.name
                return (
                    <Chip
                        key={category.id}
                        onClick={() => handleCategoryClick(category.name)}
                        size="medium"
                        variant="filled"
                        label={category.name}
                        sx={{
                            border: isChecked ? "2px solid" : "none",
                            borderColor: `${brand[500]} !important`,
                        }}
                    /> 
                )
            })}
        </Box>
    )
}