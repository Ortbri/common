import { CheckIcon } from "@radix-ui/react-icons";

interface TiersInterface {
	name: string;
	id: string;
	href: string;
	priceMonthly: string;
	description: string;
	features: string[];
	featured: boolean;
	offer?: string;
}

const tier: TiersInterface = {
	name: "Monthly",
	id: "tier-enterprise",
	href: "#",
	featured: false,
	priceMonthly: "$4",
	description: "Dedicated support and infrastructure for your company.",
	features: [
		"Unlimited products",
		"Unlimited subscribers", 
		"Advanced analytics",
		"Dedicated support representative",
		"Marketing automations",
		"Custom integrations",
	],
	offer: "save this amount!",
};


export default function PricingSection() {
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
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
				/>
			</div>
			{/* title bar */}
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="light:text-indigo-900 text-base/7 font-semibold">
					Pricing
				</h2>
				<p className="light:text-gray-900 mt-2 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
					Drawlings 2D Drawings Access
				</p>
			</div>
			<p className="light:text-gray-600 light:text-gray-600 mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium dark:text-gray-400 sm:text-xl/8">
				Start with 2D drawing access monthly, all xxx drawings for ...
			</p>
			<div className="mx-auto mt-16 grid max-w-lg items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-xl">
				<div
					key={tier.id}
					className="light:bg-white/90 dark:bg-black/60 rounded-3xl p-8 ring-1 ring-blue-900 sm:p-10"
				>
					<h3
						id={tier.id}
						className="light:text-indigo-600 text-base/7 font-semibold"
					>
						{tier.name}
					</h3>
					<p className="mt-4 flex items-baseline gap-x-2">
						<span className="text-5xl font-semibold tracking-tight">
							{tier.priceMonthly}
						</span>
						<span className="text-base">/month</span>
					</p>
					<p className="mt-6 text-base/7">{tier.description}</p>
					<ul
						role="list"
						className="mt-8 space-y-3 text-sm/6 sm:mt-10"
					>
						{tier.features.map((feature) => (
							<li key={feature} className="flex gap-x-3">
								<CheckIcon
									aria-hidden="true"
									className="light:text-indigo-600 dark:text-white h-6 w-5 flex-none"
								/>
								{feature}
							</li>
						))}
					</ul>
					<a
						href={tier.href}
						aria-describedby={tier.id}
						className="mt-8 block rounded-3xl bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
					>
						Get started today
					</a>
				</div>
			</div>
		</div>
	);
}
