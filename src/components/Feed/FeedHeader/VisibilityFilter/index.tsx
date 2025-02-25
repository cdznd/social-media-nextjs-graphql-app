'use client'
import { Stack, Chip } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { gray } from "@/components/common/themePrimitives";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VisibilityFilter() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedVisibility = searchParams.get("visibility");

    const handleVisibilityClick = (visibility: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (selectedVisibility === visibility) {
            params.delete("page");
            params.delete("visibility");
        } else {
            params.delete("page");
            params.set("visibility", visibility);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Stack direction="row" spacing={2}>
            <Chip
                icon={<PublicIcon />}
                color={'success'}
                variant='outlined'
                label={'Public'}
                sx={{
                    p: 1,
                    border: '1px solid',
                    borderColor: selectedVisibility === 'public' ? `${gray[200]} !important` : 'none'
                }}
                onClick={() => {
                    handleVisibilityClick('public')
                }}
            />
            <Chip
                icon={<LockIcon />}
                color={'info'}
                variant='outlined'
                label={"Private"}
                sx={{
                    p: 1,
                    border: '1px solid',
                    borderColor: selectedVisibility === 'private' ? `${gray[200]} !important` : 'none'
                }}
                onClick={() => {
                    handleVisibilityClick('private')
                }}
            />
        </Stack>
    )

}