import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Package, BarChart3, Edit, Upload, Bot, Sparkles, Search, FileText, Truck, FileCheck } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSuggestionClick?: (text: string) => void;
}

const suggestions = [
  { 
    icon: Edit, 
    text: 'Cập nhật đơn: Sửa thông tin đơn', 
    id: 'update-order'
  },
  { 
    icon: Search, 
    text: 'Tìm đơn hàng', 
    id: 'find-order'
  },
  { 
    icon: BarChart3, 
    text: 'Theo dõi trạng thái đơn', 
    id: 'track-order'
  },
  { 
    icon: Package, 
    text: 'Kiểm tra tồn kho', 
    id: 'check-inventory'
  },
  { 
    icon: FileText, 
    text: 'Tạo phiếu nhập kho', 
    id: 'create-import'
  },
  { 
    icon: Truck, 
    text: 'Tạo phiếu xuất kho', 
    id: 'create-export'
  },
];

export function ChatInterface({ messages, onSuggestionClick }: ChatInterfaceProps) {
  const isEmpty = messages.length === 0;

  return (
    <div className="h-full overflow-hidden pb-32">
      {isEmpty ? (
        /* Compact Empty State */
        <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-2xl text-center space-y-6">
            {/* Smaller Operations Agent Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-2xl shadow-3 hover-lift smooth-transition">
                    <Bot className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <Badge className="bg-success text-white border-0 px-1.5 py-0.5 text-xs shadow-2">
                      <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                      AI
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-high-contrast">
                  Operations Agent
                </h1>
                <p className="text-base text-low-contrast max-w-xl mx-auto leading-relaxed">
                  Your intelligent assistant for warehouse management and sales operations. Ask me anything about orders, inventory, or operational tasks.
                </p>
              </div>
            </div>

            {/* Tag-style Suggestions */}
            <div className="space-y-3">
              <p className="text-sm text-subtle">Try these suggestions:</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => onSuggestionClick?.(suggestion.text)}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-radix border border-border hover:border-gray-8 bg-background hover:bg-accent smooth-transition text-sm shadow-1 hover:shadow-2 hover-lift interactive"
                  >
                    <suggestion.icon className="h-4 w-4 text-low-contrast group-hover:text-high-contrast smooth-transition" />
                    <span className="text-low-contrast group-hover:text-high-contrast smooth-transition">
                      {suggestion.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Status Indicators */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <Badge variant="secondary" className="bg-green-3 text-success border-green-6 text-xs">
                <div className="w-1.5 h-1.5 bg-success rounded-full mr-1.5"></div>
                System Active
              </Badge>
              <Badge variant="outline" className="text-xs">
                Premium AI
              </Badge>
            </div>
          </div>
        </div>
      ) : (
        /* Messages */
        <ScrollArea className="h-full radix-scrollbar">
          <div className="max-w-4xl mx-auto p-6 space-y-8 pt-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-fade-in ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-10 w-10 shrink-0 shadow-2 smooth-transition">
                  {message.type === 'assistant' ? (
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  ) : (
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  )}
                </Avatar>
                
                <div className={`flex-1 space-y-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-radix-lg max-w-[85%] shadow-2 smooth-transition ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-high-contrast'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-inherit">{message.content}</p>
                  </div>
                  <p className="text-xs text-subtle px-2 smooth-transition">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}