import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { CreateBotFlow } from './CreateBotFlow';
import { 
  X, 
  Search, 
  Plus, 
  Brain, 
  Bot, 
  Zap, 
  Sparkles,
  Cpu,
  Database,
  Globe,
  MessageCircle,
  Code,
  FileText,
  Layers
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  category: 'favorite' | 'official' | 'community';
  stats?: string;
}

interface ModelSelectionSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

const aiModels: AIModel[] = [
  // Favorites
  {
    id: 'operations-pro',
    name: 'Operations Pro',
    description: 'Advanced model for complex warehouse operations and inventory management',
    icon: Brain,
    badge: 'Premium',
    category: 'favorite'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    description: 'Advanced reasoning model for complex problem solving',
    icon: Cpu,
    badge: 'Official',
    category: 'favorite'
  },
  {
    id: 'claude-4-sonnet',
    name: 'Claude 4 Sonnet',
    description: 'Balanced model with strong analytical capabilities',
    icon: Sparkles,
    badge: 'Official',
    category: 'favorite'
  },
  
  // Official Models
  {
    id: 'operations-standard',
    name: 'Operations Standard',
    description: 'Balanced performance for daily warehouse tasks',
    icon: Bot,
    badge: 'Standard',
    category: 'official'
  },
  {
    id: 'operations-fast',
    name: 'Operations Fast',
    description: 'Quick responses for simple queries and routine operations',
    icon: Zap,
    badge: 'Fast',
    category: 'official'
  },
  {
    id: 'claude-4-opus',
    name: 'Claude 4 Opus',
    description: 'Most capable model for complex reasoning and analysis',
    icon: Layers,
    badge: 'Official',
    category: 'official'
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    description: 'Powerful model for technical and analytical tasks',
    icon: Database,
    badge: 'Official',
    category: 'official'
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    description: 'Real-time information and conversational AI',
    icon: Globe,
    badge: 'Official',
    category: 'official',
    stats: '43.6K Chats'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Multimodal model with vision and text capabilities',
    icon: MessageCircle,
    badge: 'Official',
    category: 'official'
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    description: 'Latest version with improved reasoning capabilities',
    icon: Code,
    badge: 'Official',
    category: 'official'
  },
  {
    id: 'claude-4-sonnet-thinking',
    name: 'Claude 4 Sonnet Thinking',
    description: 'Enhanced reasoning with visible thought process',
    icon: Brain,
    badge: 'Official',
    category: 'official'
  },
  {
    id: 'claude-4-opus-thinking',
    name: 'Claude 4 Opus Thinking',
    description: 'Most powerful reasoning with transparent thinking',
    icon: Layers,
    badge: 'Official',
    category: 'official'
  },
  {
    id: 'claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    description: 'Previous generation with reliable performance',
    icon: FileText,
    badge: 'Official',
    category: 'official'
  }
];

export function ModelSelectionSidebar({ isOpen, onClose, selectedModel, onSelectModel }: ModelSelectionSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateBotOpen, setIsCreateBotOpen] = useState(false);

  const filteredModels = aiModels.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteModels = filteredModels.filter(model => model.category === 'favorite');
  const officialModels = filteredModels.filter(model => model.category === 'official');

  const handleSelectModel = (modelId: string) => {
    onSelectModel(modelId);
    onClose();
  };

  const handleCreateBot = () => {
    setIsCreateBotOpen(true);
  };

  const handleCreateBotSuccess = (botData: any) => {
    console.log('Bot created:', botData);
    // Handle successful bot creation
    setIsCreateBotOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-60 smooth-transition"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-border z-70 glass-effect backdrop-blur-premium elevation-4 animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 bg-black rounded-lg">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <h2 className="font-medium">Bots</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleCreateBot}
              className="h-7 px-3 bg-black hover:bg-black/90 text-white smooth-transition hover-lift text-xs"
            >
              <Plus className="h-3 w-3 mr-1.5" />
              Create
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-7 w-7 p-0 hover:bg-gray-100 smooth-transition"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 bg-gray-50 border border-gray-200 focus:bg-white focus:border-gray-300 smooth-transition text-sm"
            />
          </div>
        </div>

        {/* Models List */}
        <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
          <div className="p-4 space-y-4">
            {/* Favorites Section */}
            {favoriteModels.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Favorites</h3>
                <div className="space-y-1.5">
                  {favoriteModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleSelectModel(model.id)}
                      className={`w-full text-left p-2.5 rounded-lg border smooth-transition hover:bg-gray-50 hover-lift ${
                        selectedModel === model.id 
                          ? 'border-black bg-gray-50 elevation-1' 
                          : 'border-border hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg smooth-transition hover-scale">
                          <model.icon className="h-4 w-4 text-gray-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-sm font-medium text-foreground">{model.name}</span>
                            <Badge variant="outline" className="text-xs px-1.5 py-0">
                              {model.badge}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {model.description}
                          </p>
                          {model.stats && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {model.stats}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Official Models Section */}
            {officialModels.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Official Models</h3>
                <div className="space-y-1.5">
                  {officialModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleSelectModel(model.id)}
                      className={`w-full text-left p-2.5 rounded-lg border smooth-transition hover:bg-gray-50 hover-lift ${
                        selectedModel === model.id 
                          ? 'border-black bg-gray-50 elevation-1' 
                          : 'border-border hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg smooth-transition hover-scale">
                          <model.icon className="h-4 w-4 text-gray-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-sm font-medium text-foreground">{model.name}</span>
                            <Badge variant="outline" className="text-xs px-1.5 py-0">
                              {model.badge}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {model.description}
                          </p>
                          {model.stats && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {model.stats}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {filteredModels.length === 0 && (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No models found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Create Bot Flow */}
      <CreateBotFlow
        isOpen={isCreateBotOpen}
        onClose={() => setIsCreateBotOpen(false)}
        onSuccess={handleCreateBotSuccess}
      />
    </>
  );
}