import { classNames} from '../../helpers/classNames';
import cls from './Footer.module.css';
import { memo } from 'react';

interface FooterPrors {
    className?: string;
}

export const FooterComponent = (props: FooterPrors) => {
    const {
        className
    } = props;

    return (
        <p className={classNames(cls.Footer, className)}>
            © Все права и планета защищены
        </p>
    );
};
export const Footer = memo(FooterComponent)
