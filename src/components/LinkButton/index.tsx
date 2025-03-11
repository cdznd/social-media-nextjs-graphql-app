import Link from 'next/link';
import { Button } from '@mui/material';

export default function LinkButton({ label, href }: { label: string; href: string }) {
    return (
        <Link
            href={href}
            style={{ textDecoration: 'none', color: 'inherit' }}
            key={label}>
            <Button
                variant="text"
                size="small"
            >
                {label}
            </Button>
        </Link>
    )
}