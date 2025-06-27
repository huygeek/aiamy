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
          className="h-10 w-10 rounded-premium-xl p-0 hover:bg-muted transition-premium hover-lift-subtle focus-ring"
        >
          <Avatar className="h-10 w-10 shadow-premium-sm transition-premium">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-72 p-0 bg-popover border-border premium-floating transition-premium rounded-premium-2xl"
        align="end"
        sideOffset={8}
      >
        {/* User Info Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 shadow-premium-xs">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-high-contrast truncate">
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
            className="flex items-center gap-3 px-4 py-3 text-low-contrast hover:bg-accent hover:text-accent-foreground cursor-pointer transition-premium focus-ring mx-2 rounded-premium-lg"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">Settings</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2 bg-border" />

          <DropdownMenuItem 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-low-contrast hover:bg-accent hover:text-accent-foreground cursor-pointer transition-premium focus-ring mx-2 rounded-premium-lg"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}