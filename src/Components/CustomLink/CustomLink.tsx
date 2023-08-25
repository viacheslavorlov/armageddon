import Link from 'next/link';
import {memo} from 'react';

interface CustomLinkPrors {
    className?: string;
    href: string;
    label: string;
}

const CustLink = (props: CustomLinkPrors) => {
    const {
        className, href, label
    } = props;

    return (
        <Link className={className} href={href}>
            {label}
        </Link>
    );
};

export const CustomLink = memo(CustLink);
