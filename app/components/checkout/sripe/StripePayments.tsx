import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CheckoutForm } from './CheckoutForm';

const appearance = {
  // labels: 'floating',

  theme: 'stripe',
  variables: {
    fontWeightNormal: '300',
    colorPrimary: '#000',
    tabIconSelectedColor: '#000',
    gridRowSpacing: '16px'
  },
  rules: {
    '.Input': {
      borderColor: '#fff',
      backgroundColor: 'rgba(254, 243, 199, 0.5)',
      borderRadius: '0px'
    },
    '.Tab, .Block, .CheckboxInput, .CodeInput': {
      borderColor: '#fff',
      backgroundColor: '#fff',
      borderRadius: '0px'
    },
    '.Block': {
      borderColor: 'transparent'
    },
    '.BlockDivider': {
      backgroundColor: '#000'
    },
    '.Tab, .Tab:hover, .Tab:focus': {
      border: '0'
    },
    '.Tab--selected, .Tab--selected:hover': {
      backgroundColor: 'rgba(254, 243, 199, 0.8)',
      color: '#000'
    },
  }
};

let _stripe: Promise<Stripe | null>;
function getStripe(publishableKey: string) {
  if (!_stripe) {
    _stripe = loadStripe(publishableKey);
  }
  return _stripe;
}

export function StripePayments({
  clientSecret,
  publishableKey,
  orderCode,
}: {
  clientSecret: string;
  publishableKey: string;
  orderCode: string;
}) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
    appearance,
  };
  const stripePromise = getStripe(publishableKey);

  return (
    <Elements stripe={stripePromise} options={options} >
      <CheckoutForm orderCode={orderCode} />
    </Elements>
  );
}