import { Button } from "../ui/button";
import { Weight } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Price } from '~/components/products/Price';
import { CartLoaderData } from '~/routes/api/active-order';
import { CurrencyCode } from '~/generated/graphql';
import { Link, useLocation } from '@remix-run/react';
import { CartContents } from './CartContents';

export default function CartTray({
    open,
    onClose,
    activeOrder,
    adjustOrderLine,
    removeItem,
  }: {
    open: boolean;
    onClose: (closed: boolean) => void;
    activeOrder: CartLoaderData['activeOrder'];
    adjustOrderLine?: (lineId: string, quantity: number) => void;
    removeItem?: (lineId: string) => void;
  }) {
    const currencyCode = activeOrder?.currencyCode || CurrencyCode.Usd;
    const location = useLocation();
    const editable = !location.pathname.startsWith('/checkout');
    
    return (
    <Sheet>
      <SheetTrigger asChild>
        <Weight className="w-[26px] h-[26px] p-1 isolate z-[100]" />
      </SheetTrigger>
      <SheetContent className="left w-[100%] sm:w-[50%] xl:w-[30%]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto px-4 py-8">
                      {activeOrder?.totalQuantity ? (
                        <CartContents
                          orderLines={activeOrder?.lines ?? []}
                          currencyCode={currencyCode!}
                          editable={editable}
                          removeItem={removeItem}
                          adjustOrderLine={adjustOrderLine}
                        ></CartContents>
                      ) : (
                        <div className="flex items-center justify-center h-48 text-xl text-gray-400">
                          Your cart is empty
                        </div>
                      )}
                    </div>


                  {activeOrder?.totalQuantity && editable && (
                    <div className="border-t-[2px] border-discogray py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          {currencyCode && (
                            <Price
                              priceWithTax={activeOrder?.subTotalWithTax ?? 0}
                              currencyCode={currencyCode}
                            />
                          )}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping will be calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          onClick={() => onClose(false)}
                          className="uppercase tracking-wider text-sm flex justify-center items-center px-6 py-3 border border-transparent shadow-sm font-medium text-discogray bg-discoyellow-200 hover:bg-discoyellow-400"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  )}
        <SheetFooter>
          <SheetClose asChild>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
