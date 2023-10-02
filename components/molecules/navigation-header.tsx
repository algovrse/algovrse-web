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
import { Button } from "@algovrse/components/ui/button";
import { Separator } from "@algovrse/components/ui/separator";

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
							<Button variant="navigation">home</Button>
						</Link>
					</NavigationMenuItem>

					<Separator orientation="vertical" />

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
							<Button variant="navigation">about</Button>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};
