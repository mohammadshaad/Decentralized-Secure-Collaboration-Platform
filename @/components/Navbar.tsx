import * as React from "react";
import Link from "next/link";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { cn } from "../lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "File Upload & Sharing",
        href: "/files",
        description:
            "A platform for uploading and sharing your content with your team in a secure and decentralised manner.",
    },
    {
        title: "Chatting & Messaging",
        href: "/chat",
        description:
            "A platform for chatting and messaging with your team in a secure and decentralised manner.",
    },
];

export default function Navbar({ currentUser, connectWallet, disconnectWallet }: { currentUser: any; connectWallet: () => void; disconnectWallet: () => void }) {
    // Function to truncate the wallet address
    const truncateAddress = (address: string) => {
        if (address.length <= 10) return address;
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

    return (
        <div className="flex items-center justify-center "> 
            <div className="w-full rounded-full flex items-center justify-between mt-5 mx-10 px-10 fixed top-0 py-4 z-50 backdrop-blur-lg">
                <a href="/" className="text-2xl font-black ">
                    DECOL
                </a>

                <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Our Services</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Display truncated wallet address or connect wallet button */}
                        {currentUser ? (
                            <NavigationMenuItem>
                                {/* <Button className="">{truncateAddress(currentUser)} </Button> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">{truncateAddress(currentUser)}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuItem onSelect={disconnectWallet}>
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavigationMenuItem>
                        ) : (
                            <NavigationMenuItem>
                                <Button className="" onClick={connectWallet}>
                                    Connect Wallet
                                </Button>
                            </NavigationMenuItem>
                        )}

                        <NavigationMenuItem>
                            <div className="flex items-center space-x-2">
                                <ModeToggle />
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
