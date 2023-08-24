import Link from 'next/link';
import {memo} from 'react';

interface CustomLinkPrors {
    className?: string;
    href: string;
    label: string;
}

export const CustomLink = memo((props: CustomLinkPrors) => {
    const {
        className, href, label
    } = props;

    return (
        <Link className={className} href={href}>
            {label}
        </Link>
    );
});
