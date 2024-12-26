import React from "react";

function Footer() {
	return (
		<footer className="bg-neutral-900 py-12 text-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div>
						<h3 className="mb-4 text-lg font-medium">Contact</h3>
						<p className="text-neutral-400">info@architecture.com</p>
						<p className="text-neutral-400">+1 (555) 123-4567</p>
					</div>
					<div>
						<h3 className="mb-4 text-lg font-medium">Location</h3>
						<p className="text-neutral-400">123 Design Street</p>
						<p className="text-neutral-400">New York, NY 10001</p>
					</div>
					<div>
						<h3 className="mb-4 text-lg font-medium">Follow Us</h3>
						<div className="flex gap-4">
							<a
								href="https://www.instagram.com/architecture"
								className="text-neutral-400 hover:text-white"
							>
								Instagram
							</a>
							<a
								href="https://www.linkedin.com/company/architecture"
								className="text-neutral-400 hover:text-white"
							>
								LinkedIn
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
