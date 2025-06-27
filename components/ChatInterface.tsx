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
        /* Premium Empty State */
        <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-premium">
          <div className="max-w-2xl text-center space-y-8">
            {/* Premium Operations Agent Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-premium-2xl shadow-premium-lg hover-lift transition-premium">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <Badge variant="premium" className="border-0 px-2 py-1 text-xs shadow-premium-sm">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-high-contrast">
                  Operations Agent
                </h1>
                <p className="text-lg text-medium-contrast max-w-xl mx-auto leading-relaxed">
                  Your intelligent assistant for warehouse management and sales operations. Ask me anything about orders, inventory, or operational tasks.
                </p>
              </div>
            </div>

            {/* Premium Suggestions Grid */}
            <div className="space-y-4">
              <p className="text-sm text-subtle font-medium">Try these suggestions:</p>
              <div className="grid grid-cols-2 gap-3 max-w-2xl">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => onSuggestionClick?.(suggestion.text)}
                    className="group flex items-center gap-3 px-4 py-3 rounded-premium-xl border border-border hover:border-slate-300 bg-background hover:bg-accent transition-premium text-sm shadow-premium-xs hover:shadow-premium-sm hover-lift interactive"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-premium-lg group-hover:bg-accent-foreground/10 transition-premium">
                      <suggestion.icon className="h-4 w-4 text-low-contrast group-hover:text-high-contrast transition-premium" />
                    </div>
                    <span className="text-low-contrast group-hover:text-high-contrast transition-premium font-medium">
                      {suggestion.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Status Indicators */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Badge variant="success" className="text-xs shadow-premium-xs">
                <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
                System Active
              </Badge>
              <Badge variant="premium" className="text-xs shadow-premium-xs">
                Premium AI
              </Badge>
            </div>
          </div>
        </div>
      ) : (
        /* Premium Messages */
        <ScrollArea className="h-full radix-scrollbar">
          <div className="max-w-4xl mx-auto p-6 space-y-8 pt-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-fade-in ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-10 w-10 shrink-0 shadow-premium-sm transition-premium">
                  {message.type === 'assistant' ? (
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  ) : (
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  )}
                </Avatar>
                
                <div className={`flex-1 space-y-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-premium-2xl max-w-[85%] shadow-premium-sm transition-premium ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                      : 'bg-muted text-high-contrast border border-border'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-inherit">{message.content}</p>
                  </div>
                  <p className="text-xs text-subtle px-2 transition-premium">
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