import { ThemeToggle } from "@/components/themeToggle";
import { logout } from "./logout/actions";

export default function Home() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<a
				href="/login"
				className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 active:bg-blue-700"
			>
				Testing route
			</a>

			<form action={logout}>
				<button type="submit" className="bordered p-4">
					logout
				</button>
			</form>
		</div>
	);
}
