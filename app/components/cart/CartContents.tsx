import { Form, Link, useFetcher, useOutletContext } from '@remix-run/react';
import { Price } from '~/app/components/products/Price';
import { ActiveOrderQuery, CurrencyCode } from '~/app/generated/graphql';

export function CartContents({
  orderLines,
  currencyCode,
  editable = true,
  adjustOrderLine,
  removeItem,
}: {
  orderLines: NonNullable<ActiveOrderQuery['activeOrder']>['lines'];
  currencyCode: CurrencyCode;
  editable: boolean;
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {
  const isEditable = editable !== false;
  return (
    <div className="flow-root">
      <ul role="list" className="-my-4 ">
        {(orderLines ?? []).map((line) => (
          <li key={line.id} className="py-4 flex">
            <div className="flex-shrink-0 w-24 h-32 border-[1px] border-gray-500 object-center object-cover items-center justify-center overflow-hidden">
              <img
                src={line.featuredAsset?.preview + '?q=95&w=150&h=210&mode=crop&fpx=0.5&fpy=0.5'}
                alt={line.productVariant.name}
                className="flex w-full h-auto object-center object-cover"
              ></img>
            </div>

            <div className="ml-4 flex-1 flex flex-col">
              <div>
                <div className="flex justify-between uppercase tracking-[0.02em]">
                  <h3>
                    <Link to={`/products/${line.productVariant.product.slug}`}>
                      {line.productVariant.name}
                    </Link>
                  </h3>
                  <p className="ml-4">
                    <Price
                      priceWithTax={line.linePriceWithTax}
                      currencyCode={currencyCode}
                    ></Price>
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center text-sm py-4">
              <div className="flex flex-row items-start text-sm h-full w-full">
                {editable ? (
                  <Form>
                    <label htmlFor={`quantity-${line.id}`} className="mr-2">
                      Quantity
                    </label>
                    <select
                      disabled={!isEditable}
                      id={`quantity-${line.id}`}
                      name={`quantity-${line.id}`}
                      value={line.quantity}
                      onChange={(e) =>
                        adjustOrderLine &&
                        adjustOrderLine(line.id, +e.target.value)
                      }
                      className="max-w-full border  border-gray-500 bg-[#954eff3b] py-1 px-2 rounded-full text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                    </select>
                  </Form>
                ) : (
                  <div className="text-gray-800">
                    <span className="mr-1">Quantity</span>
                    <span className="font-medium">{line.quantity}</span>
                  </div>
                )}
                           </div>

                <div className="flex">
                  {isEditable && (
                    <button
                      type="submit"
                      name="removeItem"
                      value={line.id}
                      className="bg-[#954eff3b] font-medium border-gray-500 border hover:opacity-70 rounded-full py-1 px-2"
                      onClick={() => removeItem && removeItem(line.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>

            </div>
            <div className="flex flex-row items-start text-sm h-full w-full">
                </div>

            </div>
          </li>
         
        ))}
        
      </ul>
    </div>
  );
}