import * as React from "react";
import Link from "next/link";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { cn } from "../lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

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

export default function Navbar({ currentUser, connectWallet }: { currentUser: any; connectWallet: () => void }) {
    // Function to truncate the wallet address
    const truncateAddress = (address: string) => {
        if (address.length <= 10) return address;
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

    return (
        <div className="w-full flex items-center justify-between mt-5 px-10">
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

                    <NavigationMenuItem>
                        <div className="flex items-center space-x-2">
                            <ModeToggle />
                        </div>
                    </NavigationMenuItem>

                    {/* Display truncated wallet address or connect wallet button */}
                    {currentUser ? (
                        <NavigationMenuItem>
                            <Button className="">{truncateAddress(currentUser)}</Button>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem>
                            <Button className="text-blue-500" onClick={connectWallet}>
                                Connect Wallet
                            </Button>
                        </NavigationMenuItem>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
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
