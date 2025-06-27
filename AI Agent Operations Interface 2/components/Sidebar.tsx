import React, { useState } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Plus, MessageSquare, PanelLeftClose, PanelLeft, Bot, MessageCircle, FileText, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  chatHistory: ChatHistoryItem[];
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onEditChatName?: (chatId: string, newTitle: string) => void;
  onDeleteChat?: (chatId: string) => void;
  activeChatId: string;
}

export function Sidebar({ 
  isCollapsed, 
  onToggleCollapse, 
  chatHistory, 
  onNewChat, 
  onSelectChat, 
  onEditChatName,
  onDeleteChat,
  activeChatId 
}: SidebarProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = () => {
    if (editingChatId && editTitle.trim() && onEditChatName) {
      onEditChatName(editingChatId, editTitle.trim());
    }
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleDelete = (chatId: string) => {
    if (onDeleteChat && confirm('Are you sure you want to delete this chat?')) {
      onDeleteChat(chatId);
    }
  };

  return (
    <div className={`h-full bg-sidebar border-r border-sidebar-border sidebar-transition flex flex-col ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-radix shadow-2">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-high-contrast">Agents</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                    Operations
                  </Badge>
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0 text-low-contrast hover:bg-accent focus-ring rounded-radix smooth-transition"
          >
            {isCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {!isCollapsed && (
        <div className="px-4 pb-3 space-y-2">
          <Card className="bg-background shadow-2 border-border">
            <CardContent className="p-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-subtle">Số đơn đã tạo từ Zalo, Mess</p>
                  <p className="text-base font-semibold text-high-contrast">247</p>
                </div>
                <MessageCircle className="h-4 w-4 text-low-contrast" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background shadow-2 border-border">
            <CardContent className="p-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-subtle">Số phiếu nhập kho</p>
                  <p className="text-base font-semibold text-high-contrast">156</p>
                </div>
                <FileText className="h-4 w-4 text-low-contrast" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={onNewChat}
          className="w-full bg-background hover:bg-accent text-high-contrast border border-border h-10 rounded-radix shadow-1 smooth-transition hover:shadow-2 hover-lift"
        >
          <Plus className="h-4 w-4 mr-2" />
          {!isCollapsed && "New Chat"}
        </Button>
      </div>

      {/* Chat History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden">
          <div className="px-4 pb-2">
            <p className="text-xs font-medium text-subtle uppercase tracking-wide">
              Recent Chats
            </p>
          </div>
          <ScrollArea className="flex-1 px-2 radix-scrollbar">
            <div className="space-y-1 pb-4">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative rounded-radix smooth-transition hover:bg-accent ${
                    activeChatId === chat.id 
                      ? 'bg-accent border border-border shadow-1' 
                      : ''
                  }`}
                >
                  <div className="flex items-center pr-2">
                    <button
                      onClick={() => onSelectChat(chat.id)}
                      className="flex-1 text-left p-3 rounded-radix smooth-transition"
                    >
                      {editingChatId === chat.id ? (
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          }}
                          onBlur={handleSaveEdit}
                          className="h-7 text-sm px-2 bg-background border-border focus:border-blue-8 rounded-radix"
                          autoFocus
                        />
                      ) : (
                        <p className="font-medium text-sm text-high-contrast truncate pr-8">
                          {chat.title}
                        </p>
                      )}
                    </button>
                    
                    {editingChatId !== chat.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-low-contrast hover:text-high-contrast hover:bg-accent rounded-radix smooth-transition focus-ring"
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          className="w-40 bg-popover border-border shadow-4 rounded-radix-lg"
                          align="end"
                          sideOffset={4}
                        >
                          <DropdownMenuItem
                            onClick={() => handleStartEdit(chat.id, chat.title)}
                            className="flex items-center gap-2 px-2 py-1.5 text-low-contrast hover:bg-accent hover:text-high-contrast cursor-pointer smooth-transition rounded-radix text-sm"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit name
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(chat.id)}
                            className="flex items-center gap-2 px-2 py-1.5 text-error hover:bg-red-3 hover:text-error cursor-pointer smooth-transition rounded-radix text-sm"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Collapsed Chat History */}
      {isCollapsed && (
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="flex-1 px-2 radix-scrollbar">
            <div className="space-y-2 pb-4">
              {chatHistory.slice(0, 8).map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full p-2 rounded-radix smooth-transition hover:bg-accent focus-ring ${
                    activeChatId === chat.id 
                      ? 'bg-accent border border-border shadow-1' 
                      : ''
                  }`}
                  title={chat.title}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-radix mx-auto">
                    <MessageSquare className="h-4 w-4 text-low-contrast" />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-subtle">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>Operations Active</span>
        </div>
      </div>
    </div>
  );
}