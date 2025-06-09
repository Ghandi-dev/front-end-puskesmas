import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Users",
	description: "Halaman untuk mengelola data profil user",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<h1>Profile</h1>
		</div>
	);
}
