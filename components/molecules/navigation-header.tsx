"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@algovrse/components/ui/navigation-menu";
import Link from "next/link";

export const NavigationHeader = () => {
	return (
		<div className="flex justify-center gap-2">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link
							href="/"
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className="">home</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuTrigger>Dropdown</NavigationMenuTrigger>
						<NavigationMenuContent>
							{/* Add your select dropdown component here */}
						</NavigationMenuContent>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link
							href="/about"
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								about
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};
