import classNames from 'classnames';
import styles from './cart-icon.module.scss';
import { invert } from 'lodash';

interface CartIconProps {
    className?: string;
    count: number;
    headerOpacity: number;
    rootRouteOpacity: number;
}

export const CartIcon = (props: CartIconProps) => {
    return (
        <div className={classNames(styles.root, props.className)}>
            <div className={styles.handle}
style={{
    border: `rgba(${255 * (1 - props.headerOpacity - props.rootRouteOpacity)}, ${
      255 * (1 - props.headerOpacity - props.rootRouteOpacity)
    }, ${255 * (1 - props.headerOpacity - props.rootRouteOpacity)}) 1.5px solid`,
    transition: 'background-color 0.3s, color 0.3s',
  }}

            ></div>
            <div className={styles.bag}
style={{
    border: `rgba(${255 * (1 - props.headerOpacity - props.rootRouteOpacity)}, ${
      255 * (1 - props.headerOpacity - props.rootRouteOpacity)
    }, ${255 * (1 - props.headerOpacity - props.rootRouteOpacity)}) 1.5px solid`,
    transition: 'background-color 0.3s, color 0.3s',
  }}
            >{props.count}</div>
        </div>
    );
};
