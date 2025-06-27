import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Settings, LogOut } from 'lucide-react';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface UserProfileProps {
  user: User;
  onSettings: () => void;
  onLogout: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function UserProfile({ user, onSettings, onLogout }: UserProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-10 w-10 rounded-radix p-0 hover:bg-muted smooth-transition hover-lift focus-ring"
        >
          <Avatar className="h-10 w-10 shadow-2 smooth-transition">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-sm font-medium bg-primary text-primary-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-72 p-0 bg-popover border-border elevation-4 smooth-transition rounded-radix-lg"
        align="end"
        sideOffset={8}
      >
        {/* User Info Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 shadow-1">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-high-contrast truncate">
                {user.name}
              </p>
              <p className="text-xs text-low-contrast truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuItem 
            onClick={onSettings}
            className="flex items-center gap-3 px-4 py-3 text-low-contrast hover:bg-accent hover:text-accent-foreground cursor-pointer smooth-transition focus-ring mx-2 rounded-radix"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">Settings</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2 bg-border" />

          <DropdownMenuItem 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-low-contrast hover:bg-accent hover:text-accent-foreground cursor-pointer smooth-transition focus-ring mx-2 rounded-radix"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}