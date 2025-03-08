import { CategoryType } from "@/types/category"
import { Chip } from "@mui/material"

type PostCategoryChipProps = {
    category: CategoryType
}

export default function PostCategoryChip(
    { category }: PostCategoryChipProps
) {
    return (
        <Chip
            key={category?.name}
            variant="filled"
            label={category?.name}
            size='medium'
        />
    )
}