'use client';
import { Asterisk, Calendar, Download, Key, LoaderCircle, Rocket, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/button';

const featureList = [
  {
    id: 1,
    title: 'Instant Search',
    icon: Search,
  },
  {
    id: 2,
    title: 'Quick download',
    icon: Download,
  },
  {
    id: 3,
    title: 'New Objects Added Monthly',
    icon: Calendar,
  },
  {
    id: 4,
    title: 'Access to 500+ Objects',
    icon: Key,
  },
  {
    id: 5,
    title: 'Download Multiple Objects',
    icon: Download,
  },
  {
    id: 6,
    title: 'Meant for increased productivity',
    icon: Rocket,
  },
];

const FeaturesList = () => {
  return useMemo(
    () => (
      <ul className="mt-8 space-y-3">
        {featureList.map(feature => (
          <li key={feature.id} className="flex gap-x-3">
            <feature.icon className="h-6 w-5 flex-none" />
            <span>{feature.title}</span>
          </li>
        ))}
      </ul>
    ),
    []
  );
};

export default function Offer() {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const monthlyPrice = 5;
  const yearlyPrice = 52;
  /* ------------------------------- handle sub ------------------------------- */
  const handleSub = async () => {
    try {
      setIsLoading(true);
      // console.log(!!isYearly, 'is yearly??');
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isYearly,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // ✅ If unauthorized, redirect to signup
          window.location.href = '/signup';
          return;
        }
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();

      if (data.url) {
        // ✅ Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Optimize animation config
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.1 }, // Reduced duration for better performance
  };

  return (
    <section className="relative">
      {/* title bar */}

      <div className="relative flex h-[50rem] w-full flex-col items-center justify-center bg-background bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {/* <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl"> */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Design like a Pro.</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Get full access to 500 dwg essential assets | Cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        {/* nitpick yearly is off center because the bg white is the widge of monthly */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex rounded-full bg-gray-100 p-1 dark:bg-gray-800">
            {/* Sliding background */}
            <motion.div
              className="absolute rounded-full bg-white shadow-sm dark:bg-gray-700"
              initial={false}
              animate={{
                x: isYearly ? 'calc(100% - 4px)' : '2px',
                opacity: 1,
              }}
              style={{
                width: 'calc(50% - 4px)',
                top: '6px',
                bottom: '6px',
              }}
              transition={{
                x: {
                  type: 'spring',
                  stiffness: 340,
                  damping: 30,
                },
              }}
            />
            <div className="relative z-10 grid grid-cols-2">
              <button
                type="button"
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
                  !isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="z-10 mx-auto mt-8 max-w-xl md:w-8/12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isYearly ? 'yearly' : 'monthly'}
              {...animationConfig}
              className="dark:ring-gray z-10 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-gray-200 dark:bg-black dark:ring-gray-900"
            >
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-semibold leading-8">
                  {isYearly ? 'Yearly' : 'Monthly'}
                </h3>
                {isYearly && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-700 dark:text-white">
                    Save 13%
                  </span>
                )}
              </div>
              <motion.p
                key={isYearly ? 'yearly-price' : 'monthly-price'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="mt-4 flex items-baseline gap-x-2"
              >
                <span className="text-5xl font-bold tracking-tight">
                  ${isYearly ? yearlyPrice : monthlyPrice}
                </span>
                <span className="text-base text-gray-600 dark:text-gray-400">
                  /{isYearly ? 'year' : 'month'}
                </span>
              </motion.p>
              <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
                Everything you need to create amazing designs.
              </p>
              <FeaturesList />

              <Button
                className="mt-8 w-full rounded-3xl"
                // onClick={}
                // type="submit"
                onClick={handleSub}
                size={'lg'}
                disabled={isLoading}
              >
                Get All Access
                <span className="relative">
                  {isLoading && <LoaderCircle strokeWidth={2} className="h-4 w-4 animate-spin" />}
                </span>
                {!isLoading && <Asterisk strokeWidth={2} className="h-4 w-4" />}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
