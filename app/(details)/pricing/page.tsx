import { Asterisk, Check } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface TiersInterface {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  description: string;
  features: string[];
  offer?: string;
}

const tier: TiersInterface = {
  name: 'Monthly',
  id: 'base_tier',
  href: '#', // route to checkout if user is logged in
  priceMonthly: '$5',
  description: 'Essentials for when you need them.',
  features: [
    'Instant Search',
    'Drag and Drop',
    'New Objects Added Monthly',
    'Access to 500+ Objects',
  ],
  offer: 'save this amount!',
};

function Pricing() {
  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      {/* background gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      {/* title bar */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="light:text-indigo-900 text-base/7 font-semibold">Pricing</h2>
        <p className="light:text-gray-900 mt-2 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
          Essential 2D Objects
        </p>
      </div>
      <p className="light:text-gray-600 light:text-gray-600 mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium dark:text-gray-400 sm:text-xl/8">
        2d designs shouldnt be hard to find. Get all the essential objects you need.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-xl">
        <div
          key={tier.id}
          className="light:bg-white/90 rounded-3xl p-8 ring-1 ring-foreground/10 dark:bg-black/60 sm:p-10"
        >
          <h3 id={tier.id} className="light:text-indigo-600 text-base/7 font-semibold">
            {tier.name}
          </h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span className="text-5xl font-semibold tracking-tight">{tier.priceMonthly}</span>
            <span className="text-base">/month</span>
          </p>
          <p className="mt-6 text-base/7">{tier.description}</p>
          <ol className="mt-8 space-y-3 text-sm/6 sm:mt-10">
            {tier.features.map(feature => (
              <li key={feature} className="flex gap-x-3">
                <Check
                  aria-hidden="true"
                  className="light:text-indigo-600 h-6 w-5 flex-none dark:text-white"
                />
                {feature}
              </li>
            ))}
          </ol>
          <Button className="mt-8 w-full" size={'lg'}>
            Get All Access
            <Asterisk strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
