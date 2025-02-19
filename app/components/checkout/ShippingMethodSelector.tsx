import { RadioGroup } from '@headlessui/react';
import { classNames } from '~/utils/class-names';
import { Price } from '~/app/components/products/Price';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  CurrencyCode,
  EligibleShippingMethodsQuery,
} from '~/generated/graphql';
// import { useTranslation } from 'react-i18next';

export function ShippingMethodSelector({
  eligibleShippingMethods,
  currencyCode,
  shippingMethodId,
  onChange,
}: {
  eligibleShippingMethods: EligibleShippingMethodsQuery['eligibleShippingMethods'];
  shippingMethodId: string | undefined;
  onChange: (value?: string) => void;
  currencyCode?: CurrencyCode;
}) {
  // const { t } = useTranslation();

  return (
    <div>
    <div className="text-md text-center font-bold font-discogray uppercase tracking-[0.05em]">
    Shipping Method
  </div>
    <RadioGroup value={shippingMethodId} onChange={onChange}>
      <RadioGroup.Label className="hidden text-md text-center font-bold font-discogray uppercase tracking-[0.05em]">
        Shipping Method
      </RadioGroup.Label>
      <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
        {eligibleShippingMethods.map((shippingMethod) => (
          <RadioGroup.Option
            key={shippingMethod.id}
            value={shippingMethod.id}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'ring-2 ring-primary-500' : '',
                'relative bg-white border  shadow-sm p-4 flex cursor-pointer focus:outline-none',
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex-1 flex justify-between">
                  <span className="flex flex-row w-full">
                    <RadioGroup.Label
                      as="span"
                      className="flex text-sm  text-gray-900"
                    >
                      {shippingMethod.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="flex-grow text-sm text-right  text-gray-900"
                    >
                      <Price
                        priceWithTax={shippingMethod.priceWithTax}
                        currencyCode={currencyCode}
                      ></Price>
                    </RadioGroup.Description>
                  </span>
                </span>
                {checked ? (
                  <CheckCircleIcon
                    className="h-5 w-5 text-primary-600"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-primary-500' : 'border-transparent',
                    'absolute -inset-px  pointer-events-none',
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
    </div>
  );
}
