import React from "react";

const Footer = () => {
	return (
		<footer className="flex flex-col gap-5 px-10 py-12">
			<div className="flex flex-col">
				{/* title */}
				<div className="flex justify-between">
					{/* <div className="flex flex-col">
						<text className="text-4xl font-black">UWU ARCH</text>
						<text className="text-md font-extralight">
							LOS ANGELES CALIFORNIA
						</text>
					</div> */}
					{/* social */}
					{/* <div>
						<a
							href="https://www.instagram.com/uwu_arc/"
							className="transition-colors duration-200 hover:opacity-70"
							aria-label="Follow us on Instagram"
						>
							<InstagramLogoIcon height={40} width={40} />
						</a>
					</div> */}
				</div>
			</div>

			{/* <RecentInstagram /> */}
			{/* rights */}
			<div className="flex items-center justify-center text-sm text-neutral-400">
				<p>&copy; {new Date().getFullYear()} Drawlings. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
