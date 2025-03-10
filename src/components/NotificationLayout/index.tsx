
import { ListItem, Stack } from "@mui/material"
import { gray } from "../common/themePrimitives"

export default function NotificationLayout({ children }: { children: React.ReactNode }) {
    return (
        <ListItem
            sx={{
                border: '1px solid',
                borderColor: gray[300],
                borderRadius: 2,
                backgroundColor: 'background.default',
                mb: 2,
                p: 2,
                '&:last-child': {
                    mb: 0
                }
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: 1
                }}
            >
                {children}
            </Stack>
        </ListItem>
    )
}