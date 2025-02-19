import { Price } from './Price';

export function ProductCardCarousel({
  productAsset,
  productName,
  priceWithTax,
  currencyCode,
}) {
  return (
    <div className="break-inside-avoid flex flex-col h-full">
        <img
          className="object-cover "
          alt=""
          src={productAsset?.preview + '?w=full'}
        ></img>
        <div className="relative w-full mx-auto bottom-0 left-0">
          <div className="text-center absolute bottom-0 left-0 w-fit h-fit bg-discogray text-white text-md p-1 font-light">
            <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
          </div>
        </div>
        <div className="text-xl p-1 text-discogray uppercase tracking-wider font-light whitespace-nowrap overflow-hidden">
          {productName}
        </div>

        <div className="text-lg p-1 font-bold text-discogray"></div>

    </div>
  );
}
