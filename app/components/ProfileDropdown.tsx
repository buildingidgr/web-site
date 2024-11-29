'use client';

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  ChevronRight,
  Cloud,
  CreditCard,
  Keyboard,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react";
import React from "react";

const menuItems = [
  {
    label: "My Account",
    type: "label",
  },
  {
    group: [
      { icon: User, label: "Profile", shortcut: "⌘P" },
      { icon: Settings, label: "Preferences", shortcut: "⌘," },
      { icon: Keyboard, label: "Keyboard shortcuts", shortcut: "⌘K" },
    ],
  },
  {
    group: [
      { icon: Users, label: "Team" },
      { icon: Plus, label: "Invite users", hasSubmenu: true },
      { icon: CreditCard, label: "Billing", shortcut: "⌘B" },
    ],
  },
  {
    label: "Log out",
    icon: LogOut,
    shortcut: "⌘Q",
    type: "single",
  },
];

export default function ProfileDropdown(): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.type === "label" && (
              <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
            )}
            {item.group && (
              <DropdownMenuGroup>
                {item.group.map((groupItem, groupIndex) => (
                  <DropdownMenuItem
                    key={groupIndex}
                    disabled={groupItem.disabled}
                  >
                    {groupItem.icon && (
                      <groupItem.icon className="mr-2 h-4 w-4" />
                    )}
                    <span className="flex-1">{groupItem.label}</span>
                    {groupItem.hasSubmenu && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                    {groupItem.shortcut && (
                      <DropdownMenuShortcut>
                        {groupItem.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            )}
            {item.type === "single" && (
              <DropdownMenuItem>
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            )}
            {index < menuItems.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 