import {classNames} from '../../helpers/classNames';
import cls from './Loader.module.css'; // Import the CSS file for styling

export const Loader = (props: {className?: string}) => {
    return (
        <div className={classNames(cls.loaderContainer, props.className)}>
            <div className={cls.loader}></div>
        </div>
    );
};
