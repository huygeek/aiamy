import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { ChatInput } from './components/ChatInput';
import { UIView } from './components/UIView';
import { UserProfile } from './components/UserProfile';
import { ModelSelectionSidebar } from './components/ModelSelectionSidebar';
import { Settings } from './components/Settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { 
  Bot, 
  MessageSquare, 
  BarChart3, 
  ArrowUp, 
  Upload, 
  Image, 
  Zap, 
  Brain, 
  Sparkles as SparklesIcon, 
  ChevronDown,
  Cpu,
  Database,
  Globe,
  MessageCircle,
  Code,
  FileText,
  Layers
} from 'lucide-react';

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

// Mock chat history data
const mockChatHistory: ChatHistoryItem[] = [
  {
    id: '1',
    title: 'Kiểm tra đơn hàng ORD-001',
    timestamp: '2 hours ago',
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'Kiểm tra trạng thái đơn hàng ORD-001',
        timestamp: '14:30'
      },
      {
        id: '2',
        type: 'assistant',
        content: 'Đơn hàng ORD-001 hiện đang ở trạng thái "Chờ xử lý". Khách hàng: Nguyễn Văn A, Tổng tiền: 1,250,000 VNĐ. Bạn có muốn cập nhật trạng thái không?',
        timestamp: '14:31'
      }
    ]
  },
  {
    id: '2',
    title: 'Cập nhật tồn kho SP-003',
    timestamp: '1 day ago',
    messages: []
  },
  {
    id: '3',
    title: 'Tạo đơn hàng mới',
    timestamp: '2 days ago',
    messages: []
  },
];

const mockUser = {
  name: 'Henry Pham',
  email: 'dev@bubobot.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

// Complete AI Models configuration - matches ModelSelectionSidebar
const aiModels = [
  // Favorites
  {
    id: 'operations-pro',
    name: 'Operations Pro',
    description: 'Advanced model for complex warehouse operations and inventory management',
    icon: Brain,
    badge: 'Premium'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    description: 'Advanced reasoning model for complex problem solving',
    icon: Cpu,
    badge: 'Official'
  },
  {
    id: 'claude-4-sonnet',
    name: 'Claude 4 Sonnet',
    description: 'Balanced model with strong analytical capabilities',
    icon: SparklesIcon,
    badge: 'Official'
  },
  
  // Official Models
  {
    id: 'operations-standard',
    name: 'Operations Standard',
    description: 'Balanced performance for daily warehouse tasks',
    icon: Bot,
    badge: 'Standard'
  },
  {
    id: 'operations-fast',
    name: 'Operations Fast',
    description: 'Quick responses for simple queries and routine operations',
    icon: Zap,
    badge: 'Fast'
  },
  {
    id: 'claude-4-opus',
    name: 'Claude 4 Opus',
    description: 'Most capable model for complex reasoning and analysis',
    icon: Layers,
    badge: 'Official'
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    description: 'Powerful model for technical and analytical tasks',
    icon: Database,
    badge: 'Official'
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    description: 'Real-time information and conversational AI',
    icon: Globe,
    badge: 'Official'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Multimodal model with vision and text capabilities',
    icon: MessageCircle,
    badge: 'Official'
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    description: 'Latest version with improved reasoning capabilities',
    icon: Code,
    badge: 'Official'
  },
  {
    id: 'claude-4-sonnet-thinking',
    name: 'Claude 4 Sonnet Thinking',
    description: 'Enhanced reasoning with visible thought process',
    icon: Brain,
    badge: 'Official'
  },
  {
    id: 'claude-4-opus-thinking',
    name: 'Claude 4 Opus Thinking',
    description: 'Most powerful reasoning with transparent thinking',
    icon: Layers,
    badge: 'Official'
  },
  {
    id: 'claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    description: 'Previous generation with reliable performance',
    icon: FileText,
    badge: 'Official'
  }
];

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [selectedModel, setSelectedModel] = useState('operations-pro');
  const [isModelSidebarOpen, setIsModelSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(mockChatHistory);
  const [currentMessages, setCurrentMessages] = useState<Message[]>(
    mockChatHistory.find(chat => chat.id === activeChatId)?.messages || []
  );

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatHistoryItem = {
      id: newChatId,
      title: 'New conversation',
      timestamp: 'Just now',
      messages: []
    };
    
    setChatHistory([newChat, ...chatHistory]);
    setActiveChatId(newChatId);
    setCurrentMessages([]);
    setActiveTab('chat');
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    setCurrentMessages(selectedChat?.messages || []);
    setActiveTab('chat');
  };

  const handleEditChatName = (chatId: string, newTitle: string) => {
    setChatHistory(prevHistory => 
      prevHistory.map(chat => 
        chat.id === chatId 
          ? { ...chat, title: newTitle }
          : chat
      )
    );
  };

  const handleDeleteChat = (chatId: string) => {
    setChatHistory(prevHistory => prevHistory.filter(chat => chat.id !== chatId));
    
    // If deleting the active chat, switch to the first remaining chat or clear messages
    if (chatId === activeChatId) {
      const remainingChats = chatHistory.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        const newActiveChatId = remainingChats[0].id;
        setActiveChatId(newActiveChatId);
        setCurrentMessages(remainingChats[0].messages);
      } else {
        // No chats left, create a new one
        handleNewChat();
      }
    }
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    const newMessages = [...currentMessages, userMessage];
    setCurrentMessages(newMessages);

    // Update chat history
    setChatHistory(prevHistory => 
      prevHistory.map(chat => 
        chat.id === activeChatId 
          ? { 
              ...chat, 
              messages: newMessages,
              title: chat.title === 'New conversation' ? content.slice(0, 50) + '...' : chat.title
            }
          : chat
      )
    );

    // Simulate assistant response
    setTimeout(() => {
      const selectedModelInfo = aiModels.find(model => model.id === selectedModel);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `[${selectedModelInfo?.name}] Tôi đã nhận được yêu cầu của bạn. Đây là phản hồi mẫu từ Operations Agent. Trong thực tế, tôi sẽ xử lý yêu cầu cụ thể của bạn và cung cấp thông tin chính xác về đơn hàng, tồn kho hoặc các tác vụ vận hành khác.`,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setCurrentMessages(updatedMessages);

      setChatHistory(prevHistory => 
        prevHistory.map(chat => 
          chat.id === activeChatId 
            ? { ...chat, messages: updatedMessages }
            : chat
        )
      );
    }, 1500);
  };

  const handleUploadImage = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle file upload logic here
        console.log('File selected:', file.name);
        // You can add image processing logic here
      }
    };
    input.click();
  };

  const handleSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      alert('Signed out successfully!');
    }
  };

  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const currentModel = aiModels.find(model => model.id === selectedModel);

  return (
    <div className="h-screen flex bg-surface">
      {/* Sidebar */}
      <div className="transition-premium-transform">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onEditChatName={handleEditChatName}
          onDeleteChat={handleDeleteChat}
          activeChatId={activeChatId}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with Premium styling */}
        <header className="border-b border-border bg-background/80 glass-effect shadow-premium-sm">
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Operations Agent Logo & Title */}
              <div className="flex items-center gap-4 animate-fade-in">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-violet-600 rounded-premium-xl shadow-premium-sm hover-lift-subtle transition-premium">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-high-contrast">Operations Agent</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="success" className="text-xs">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
                      Active
                    </Badge>
                    <Badge variant="premium" className="text-xs">Premium AI</Badge>
                  </div>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="h-10">
                  <TabsTrigger 
                    value="chat" 
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Chat Assistant
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dashboard" 
                    className="flex items-center gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Data Dashboard
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* User Profile */}
            <div className="animate-slide-in">
              <UserProfile 
                user={mockUser}
                onSettings={handleSettings}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden bg-surface">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="chat" className="h-full m-0 animate-fade-in">
              <ChatInterface 
                messages={currentMessages}
                onSuggestionClick={handleSendMessage}
              />
            </TabsContent>
            <TabsContent value="dashboard" className="h-full m-0 overflow-auto pb-32 animate-fade-in">
              <UIView />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Chat Input - Fixed at bottom, only visible on chat tab */}
      {activeTab === 'chat' && (
        <div 
          className="fixed bottom-0 bg-background/95 glass-effect border-t border-border z-40 shadow-premium-lg"
          style={{
            left: isSidebarCollapsed ? '64px' : '288px',
            right: '0'
          }}
        >
          <div className="p-6">
            {/* Model Selection Button */}
            <div className="max-w-4xl mx-auto mb-4 animate-fade-in">
              <Button
                variant="outline"
                onClick={() => setIsModelSidebarOpen(true)}
                className="h-9 px-3"
              >
                <div className="flex items-center gap-2">
                  {currentModel && (
                    <>
                      <currentModel.icon className="h-3.5 w-3.5" />
                      <span className="text-sm font-medium">{currentModel.name}</span>
                      <Badge variant="outline" className="text-xs px-1.5 py-0 ml-1">
                        {currentModel.badge}
                      </Badge>
                    </>
                  )}
                  <ChevronDown className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                </div>
              </Button>
            </div>

            {/* Chat Input Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const message = formData.get('message') as string;
              if (message?.trim()) {
                handleSendMessage(message.trim());
                e.currentTarget.reset();
              }
            }} className="max-w-4xl mx-auto animate-fade-in">
              <div className="premium-elevated">
                <div className="flex items-end gap-3 p-4">
                  <textarea
                    name="message"
                    placeholder="Message Operations Agent..."
                    className="flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-h-[24px] max-h-32 leading-6 transition-premium px-0 py-3"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        const target = e.currentTarget;
                        if (target.value.trim()) {
                          handleSendMessage(target.value.trim());
                          target.value = '';
                        }
                      }
                    }}
                  />
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Upload Image Button */}
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={handleUploadImage}
                    >
                      <Image className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    
                    {/* Send Button */}
                    <Button
                      type="submit"
                      size="icon-sm"
                      variant="premium"
                      className="shadow-premium-sm"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-low-contrast text-center mt-3">
                Operations Agent can make mistakes. Please verify important information.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Model Selection Sidebar */}
      <ModelSelectionSidebar
        isOpen={isModelSidebarOpen}
        onClose={() => setIsModelSidebarOpen(false)}
        selectedModel={selectedModel}
        onSelectModel={handleSelectModel}
      />

      {/* Settings Modal */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}