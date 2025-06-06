import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { Profile } from "@/types/Auth";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const session = await getServerSession(authOptions);
	const user = session?.user as Profile | undefined;
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<NavMain user={user} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
