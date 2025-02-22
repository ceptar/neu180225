import classNames from 'classnames';
import styles from './cart-icon.module.scss';
import { invert } from 'lodash';

interface CartIconProps {
    count: number;
}

export const CartIcon = (props: CartIconProps) => {
    return (
        <div className={classNames(styles.root)}>
            <div className={styles.handle}
            ></div>
            <div className={styles.bag}
            >{props.count}</div>
        </div>
    );
};
