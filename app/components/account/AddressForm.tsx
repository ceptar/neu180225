import { AvailableCountriesQuery, OrderAddress } from '~/generated/graphql';
import { useTranslation } from 'react-i18next';

export function AddressForm({
  address,
  defaultFullName,
  availableCountries,
}: {
  address?: OrderAddress | null;
  defaultFullName?: string;
  availableCountries?: AvailableCountriesQuery['availableCountries'];
}) {
  // const { t } = useTranslation();

  return (
    <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
      <div>
        <label
          htmlFor="fullName"
          className="hidden text-sm  text-gray-700"
        >
          Full Name
        </label>
        <div className="mt-1">

          <input
            type="text"
            id="fullName"
            name="fullName"
            defaultValue={defaultFullName}
            autoComplete="given-name"
            placeholder='Full Name'
            className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
            />
        </div>
        </div>
        <div>
        <label
          htmlFor="company"
          className="hidden text-sm  text-gray-700"
        >
         Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            defaultValue={address?.company ?? ''}
            placeholder='Company'
            className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
            />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="streetLine1"
          className="hidden text-sm  text-gray-700"
        >
Street 1/2
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="streetLine1"
            id="streetLine1"
            defaultValue={address?.streetLine1 ?? ''}
            autoComplete="street-address"
            placeholder='Street'
            className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
          />
        </div>
      </div>

      {/* <div className="sm:col-span-2">
        <label
          htmlFor="streetLine2"
          className="block text-sm  text-gray-700"
        >
Street 2/2
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="streetLine2"
            id="streetLine2"
            defaultValue={address?.streetLine2 ?? ''}
            className="block w-full border-gray-300  shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div> */}
            <div className="grid grid-cols-2 gap-x-4">
      <div>
        <label
          htmlFor="city"
          className="hidden text-sm  text-gray-700"
        >
City
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="address-level2"
            defaultValue={address?.city ?? ''}
            placeholder='City'
            className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="countryCode"
          className="hidden text-sm  text-gray-700"
        >
Country
        </label>
        <div className="mt-1">
          {availableCountries && (
            <select
              id="countryCode"
              name="countryCode"
              defaultValue={address?.countryCode ?? 'AT'}
              aria-placeholder='Country'
              className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
            >
              {availableCountries.map((item) => (
                <option key={item.id} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
</div>
<div className="grid grid-cols-2 gap-x-4">
      <div>
        <label
          htmlFor="province"
          className="hidden text-sm  text-gray-700"
        >
Province
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="province"
            id="province"
            defaultValue={address?.province ?? ''}
            autoComplete="address-level1"
            placeholder='Province'
            className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="postalCode"
          className="hidden text-sm  text-gray-700"
        >
Zip Code
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            defaultValue={address?.postalCode ?? ''}
            autoComplete="postal-code"
            placeholder='ZIP'
            className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
          />
        </div>
      </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="phoneNumber"
          className="hidden text-sm  text-gray-700"
        >
Phone Number
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={address?.phoneNumber ?? ''}
            autoComplete="tel"
            placeholder='Phone Number'
            className="block w-full border-b-[2px] border-t-0 border-x-0 border-discogray  shadow-sm focus:ring-discogray focus:bg-discoyellow sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
