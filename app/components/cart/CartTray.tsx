import { Button } from "../ui/button";
import { Weight } from "lucide-react";
import { Input } from "~/app/components/ui/input"
import { Label } from "~/app/components/ui/label"
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/components/ui/sheet"
import { Price } from '~/app/components/products/Price';
import { CartLoaderData } from '~/app/routes/api.active-order/route';
import { CurrencyCode } from '~/app/generated/graphql';
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
    <Sheet open={open} onOpenChange={onClose}>
      <SheetTrigger asChild>
      </SheetTrigger>
      <SheetContent  className="w-[100%] sm:w-[50%] xl:w-[30%]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-y-auto relative pt-20 py-8">
                      {activeOrder?.totalQuantity ? (
                        <CartContents
                          orderLines={activeOrder?.lines ?? []}
                          currencyCode={currencyCode!}
                          editable={editable}
                          removeItem={removeItem}
                          adjustOrderLine={adjustOrderLine}
                        ></CartContents>
                      ) : (
                        <div className="flex items-center justify-center h-48 text-xl text-gray-500">
                          Your cart is empty
                        </div>
                      )}
                    </div>


                  {activeOrder?.totalQuantity && editable && (
                    <div className="border-t-[1px] border-gray-500 py-6">
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
                          className="bg-[#954eff3b] uppercase tracking-wider text-sm flex justify-center items-center px-6 py-3 border border-gray-500 shadow-sm hover:opacity-70"
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
