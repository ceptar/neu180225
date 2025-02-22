import { FormEvent, useState } from 'react';
import { Lock as LockClosedIcon } from 'lucide-react';
import {
  Form,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from '@remix-run/react';
import { OutletContext } from '~/app/types';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import {
  getAvailableCountries,
  getEligibleShippingMethods,
} from '~/app/providers/checkout/checkout';
import { shippingFormDataIsValid } from '~/app/utils/validation';
import { getSessionStorage } from '~/app/sessions';
import { classNames } from '~/app/utils/class-names';
import { getActiveCustomerAddresses } from '~/app/providers/customer/customer';
import { AddressForm } from '~/app/components/account/AddressForm';
import { ShippingMethodSelector } from '~/app/components/checkout/ShippingMethodSelector';
import { ShippingAddressSelector } from '~/app/components/checkout/ShippingAddressSelector';
import { getActiveOrder } from '~/app/providers/orders/order';

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSessionStorage().then((sessionStorage) =>
    sessionStorage.getSession(request?.headers.get('Cookie')),
  );

  const activeOrder = await getActiveOrder({ request });

  //check if there is an active order if not redirect to homepage
  if (
    !session ||
    !activeOrder ||
    !activeOrder.active ||
    activeOrder.lines.length === 0
  ) {
    return redirect('/');
  }
  const { availableCountries } = await getAvailableCountries({ request });
  const { eligibleShippingMethods } = await getEligibleShippingMethods({
    request,
  });
  const { activeCustomer } = await getActiveCustomerAddresses({ request });
  const error = session.get('activeOrderError');
  return json({
    availableCountries,
    eligibleShippingMethods,
    activeCustomer,
    error,
  });
}

export default function CheckoutShipping() {
  const { availableCountries, eligibleShippingMethods, activeCustomer, error } =
    useLoaderData<typeof loader>();
  const { activeOrderFetcher, activeOrder } = useOutletContext<OutletContext>();
  const [customerFormChanged, setCustomerFormChanged] = useState(false);
  const [addressFormChanged, setAddressFormChanged] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  let navigate = useNavigate();
  // const { t } = useTranslation();

  const { customer, shippingAddress } = activeOrder ?? {};
  const isSignedIn = !!activeCustomer?.id;
  const addresses = activeCustomer?.addresses ?? [];
  const defaultFullName =
    shippingAddress?.fullName ??
    (customer ? `${customer.firstName} ${customer.lastName}` : ``);
  const canProceedToPayment =
    customer &&
    ((shippingAddress?.streetLine1 && shippingAddress?.postalCode) ||
      selectedAddressIndex != null) &&
    activeOrder?.shippingLines?.length &&
    activeOrder?.lines?.length;

  const submitCustomerForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const { emailAddress, firstName, lastName } = Object.fromEntries<any>(
      formData.entries(),
    );
    const isValid = event.currentTarget.checkValidity();
    if (
      customerFormChanged &&
      isValid &&
      emailAddress &&
      firstName &&
      lastName
    ) {
      activeOrderFetcher.submit(formData, {
        method: 'post',
        action: '/api/active-order',
      });
      setCustomerFormChanged(false);
    }
  };
  const submitAddressForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const isValid = event.currentTarget.checkValidity();
    if (addressFormChanged && isValid) {
      setShippingAddress(formData);
    }
  };
  const submitSelectedAddress = (index: number) => {
    const selectedAddress = activeCustomer?.addresses?.[index];
    if (selectedAddress) {
      setSelectedAddressIndex(index);
      const formData = new FormData();
      Object.keys(selectedAddress).forEach((key) =>
        formData.append(key, (selectedAddress as any)[key]),
      );
      formData.append('countryCode', selectedAddress.country.code);
      formData.append('action', 'setCheckoutShipping');
      setShippingAddress(formData);
    }
  };

  function setShippingAddress(formData: FormData) {
    if (shippingFormDataIsValid(formData)) {
      activeOrderFetcher.submit(formData, {
        method: 'post',
        action: '/api/active-order',
      });
      setAddressFormChanged(false);
    }
  }

  const submitSelectedShippingMethod = (value?: string) => {
    if (value) {
      activeOrderFetcher.submit(
        {
          action: 'setShippingMethod',
          shippingMethodId: value,
        },
        {
          method: 'post',
          action: '/api/active-order',
        },
      );
    }
  };

  function navigateToPayment() {
    navigate('./payment');
  }

  return (
    <div className="pt-8 md:px-8">
      <div>
        <h2 className="text-md text-center font-bold font-discogray uppercase tracking-[0.05em] ">
          Checkout Details
        </h2>

        {isSignedIn ? (
          <div className="bg-discogray">
            <p className="mt-2 text-discogray-700">
              {customer?.firstName} {customer?.lastName}
            </p>
            <p>{customer?.emailAddress}</p>
          </div>
        ) : (
          <Form
            method="post"
            action="/api/active-order"
            onBlur={submitCustomerForm}
            onChange={() => setCustomerFormChanged(true)}
            hidden={isSignedIn}
          >
            <input type="hidden" name="action" value="setOrderCustomer" />
            <div className="mt-4">
              <label
                htmlFor="emailAddress"
                className="text-sm  text-gray-700 hidden"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  autoComplete="email"
                  defaultValue={customer?.emailAddress}
                  placeholder="Email Address"
                  className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
                />
              </div>
              {error?.errorCode === 'EMAIL_ADDRESS_CONFLICT_ERROR' && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {error.message}
                </p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm  text-gray-700 hidden"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    defaultValue={customer?.firstName}
                    placeholder="First Name"
                    className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow  sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="hidden text-sm  text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    defaultValue={customer?.lastName}
                    placeholder="Last Name"

                    className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow  sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>

      <Form
        method="post"
        action="/api/active-order"
        onBlur={submitAddressForm}
        onChange={() => setAddressFormChanged(true)}
      >
        <input type="hidden" name="action" value="setCheckoutShipping" />
        <div className="mt-4 pt-4">
          <h2 className="text-md text-center font-bold font-discogray uppercase tracking-[0.05em] ">
           Shipping
          </h2>
        </div>
        {isSignedIn && activeCustomer.addresses?.length ? (
          <div>
            <ShippingAddressSelector
              addresses={activeCustomer.addresses}
              selectedAddressIndex={selectedAddressIndex}
              onChange={submitSelectedAddress}
            />
          </div>
        ) : (
          <AddressForm
            availableCountries={activeOrder ? availableCountries : undefined}
            address={shippingAddress}
            defaultFullName={defaultFullName}
          ></AddressForm>
        )}
      </Form>

      <div className="mt-4 pt-4">
        <ShippingMethodSelector
          eligibleShippingMethods={eligibleShippingMethods}
          currencyCode={activeOrder?.currencyCode}
          shippingMethodId={
            activeOrder?.shippingLines[0]?.shippingMethod.id ?? ''
          }
          onChange={submitSelectedShippingMethod}
        />
      </div>

      <button
        type="button"
        disabled={!canProceedToPayment}
        onClick={navigateToPayment}
        className={classNames(
          canProceedToPayment
            ? 'bg-discoyellow-300 hover:bg-discoyellow-400'
            : 'bg-gray-400',
          'flex w-full items-center justify-center space-x-2 mt-4 py-3 border border-transparent text-base   shadow-sm text-discogray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-discopurple-500',
        )}
      >
        <LockClosedIcon className="w-5 h-5"></LockClosedIcon>
        <span>Proceed to Payment</span>
      </button>
    </div>
  );
}