"use client";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import React from "react";

const Footer = () => {
	return (
		<footer className="px-10 py-12">
			<div className="flex flex-col gap-6 md:gap-8">
				{/* title */}
				<div className="flex justify-between">
					<div className="flex flex-col">
						<text className="text-4xl font-black">UWU ARCH</text>
						<text className="text-md font-extralight">
							LOS ANGELES CALIFORNIA
						</text>
					</div>
					{/* social */}
					<div>
						<a
							href="https://www.inst3agram.com/architecture"
							className="transition-colors duration-200 hover:opacity-70"
							aria-label="Follow us on Instagram"
						>
							<InstagramLogoIcon height={40} width={40} />
						</a>
					</div>
				</div>
			</div>

			{/* rights */}
			<div className="mt-4 pt-8 text-sm text-neutral-400">
				<p>
					&copy; {new Date().getFullYear()} Uwu Architecture Studio. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
