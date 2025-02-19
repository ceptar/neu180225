import { products } from '@wix/stores';
import type { Product } from '~/app/generated/graphql';
import styles from './product-card.module.scss';
import { ProductPrice } from '../product-price/product-price';
import { ImagePlaceholderIcon } from '../icons';
import { Price } from '~/app/components/products/Price';
import { CurrencyCode } from '~/app/generated/graphql';

interface ProductCardProps {
    name: string;
    /** @format media-url */
    imageUrl?: string;
    /**
     * Product price formatted with the currency.
     */
    price?: number;
    /**
     * Discounted product price formatted with the currency.
     * It is displayed if it's not equal to the main price.
     */
    // discountedPrice?: string;
    // ribbon?: string;
    // inventoryStatus?: products.InventoryStatus;
    currencyCode?: string;
}

export const ProductCard = ({
    name,
    imageUrl,
    price,
    currencyCode,
    // discountedPrice,
    // ribbon,
    // inventoryStatus,
}: ProductCardProps) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.imageWrapper}>
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className={styles.image} />
                ) : (
                    <ImagePlaceholderIcon className={styles.imagePlaceholderIcon} />
                )}
                                     <div className="z-[20] absolute w-full mx-auto bottom-0 left-0">
                     <div className="text-center bg-neutral-800 bottom-0 left-0 w-fit h-fit text-white p-1 ">                

                      <Price priceWithTax={price} currencyCode={currencyCode as CurrencyCode} /> 
                      </div>
                      </div>

                {/* 
                {ribbon && <span className={styles.ribbon}>{ribbon}</span>} 
                */}
            </div>

            <div className={styles.name}>{name}</div>

            {/* 
            {inventoryStatus === products.InventoryStatus.OUT_OF_STOCK ? (
                <div className={styles.outOfStock}>Out of stock</div>
            ) : ( 
             */}
                {/*
                 <ProductPrice
                    className={styles.price}
                    price={price}
                    currencyCode=
                    // discountedPrice={discountedPrice}
                /> 
                */}
          
        </div>
    );
};

export const ProductCardSkeleton = () => (
    <div className={styles.skeleton}>
        <div className={styles.imageWrapper} />
        <div className={styles.name}>&nbsp;</div>
        <div className={styles.price}>&nbsp;</div>
    </div>
);
