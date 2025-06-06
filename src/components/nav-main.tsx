"use client";

import { ChevronRight } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 🔥 Gunakan `usePathname` bukan `useRouter`
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Profile } from "@/types/Auth";
import { MENU_LIST_ADMIN, MENU_LIST_SUPERADMIN } from "@/constant/menu.constants";
import { ROLES } from "@/constant/list.constants";

export function NavMain({ user }: { user?: Profile }) {
	const items = user?.role === ROLES.SUPERADMIN ? MENU_LIST_SUPERADMIN : MENU_LIST_ADMIN;
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Menu</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) =>
					item.items?.length ? (
						// Jika ada sub-items → tampilkan sebagai collapsible
						<Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={item.title}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items.map((subItem) => (
											<SidebarMenuSubItem key={subItem.title}>
												<Link href={subItem.url}>
													<SidebarMenuSubButton
														asChild
														className={cn(
															"hover:bg-primary hover:text-primary-foreground",
															pathname.includes(subItem.url) && "bg-primary text-primary-foreground"
														)}
													>
														<span>{subItem.title}</span>
													</SidebarMenuSubButton>
												</Link>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					) : (
						<SidebarMenuItem key={item.title}>
							{item.url === "/scanner" ? (
								// menuju scanner menggunakan anchor tag untuk menghindari masalah dengan Next.js
								<SidebarMenuButton
									tooltip={item.title}
									className={cn("hover:bg-primary hover:text-primary-foreground", pathname.includes(item.url) && "bg-primary text-primary-foreground")}
								>
									{item.icon && <item.icon />}
									<a href={item.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2">
										{item.title}
									</a>
								</SidebarMenuButton>
							) : (
								<Link href={item.url}>
									<SidebarMenuButton
										tooltip={item.title}
										className={cn("hover:bg-primary hover:text-primary-foreground", pathname.includes(item.url) && "bg-primary text-primary-foreground")}
									>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</Link>
							)}
						</SidebarMenuItem>
					)
				)}
			</SidebarMenu>
		</SidebarGroup>
	);
}
