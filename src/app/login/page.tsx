import { login, signup } from "./actions";

export default function Login() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="min-w-7xl flex min-h-full flex-col rounded-xl bg-white px-20 py-12 ring-1 ring-black/10 lg:px-14">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form action="#" method="POST" className="space-y-6">
						{/* email div */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									className="block w-full rounded-xl bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>
						{/* password div */}
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									required
									autoComplete="current-password"
									className="block w-full rounded-xl bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>
						{/* button options */}
						<div className="flex flex-col gap-3">
							<button
								type="submit"
								formAction={login}
								className="flex w-full justify-center rounded-3xl border border-indigo-600 bg-white px-3 py-1.5 text-sm/6 font-semibold text-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
							<button
								formAction={signup}
								type="submit"
								className="flex w-full justify-center rounded-3xl bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign up
							</button>
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>
						</div>
					</form>

					{/* <p className="mt-10 text-center text-sm/6 text-gray-500">
						Not a member?{" "}
						<a
							href="#"
							className="font-semibold text-indigo-600 hover:text-indigo-500"
						>
							Start a 14 day free trial
						</a>
					</p> */}
				</div>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*                              supabase example                              */
/* -------------------------------------------------------------------------- */
// export default function LoginPage() {
// 	return (
// 		<form className="flex flex-col bg-slate-100">
// 			<label htmlFor="email">Email:</label>
// 			<input id="email" name="email" type="email" required />
// 			<label htmlFor="password">Password:</label>
// 			<input id="password" name="password" type="password" required />
// 			<button formAction={login}>Log in</button>
// 			<button formAction={signup}>Sign up</button>
// 		</form>
// 	);
// }
