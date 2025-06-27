import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  User, 
  Palette, 
  Shield, 
  Lock, 
  CreditCard, 
  Puzzle, 
  X,
  ExternalLink,
  Plus,
  Check
} from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'profile' | 'appearance' | 'account' | 'privacy' | 'billing' | 'integrations';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  color: string;
}

const sidebarItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'account', label: 'Account', icon: Shield },
  { id: 'privacy', label: 'Privacy', icon: Lock },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
] as const;

const integrations: Integration[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect your GitHub repositories',
    icon: '🐙',
    connected: false,
    color: 'bg-gray-900'
  },
  {
    id: 'googledrive',
    name: 'Google Drive',
    description: 'Access your Google Drive files',
    icon: '📁',
    connected: false,
    color: 'bg-blue-500'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Connect your Gmail account',
    icon: '📧',
    connected: false,
    color: 'bg-red-500'
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Sync with your calendar',
    icon: '📅',
    connected: false,
    color: 'bg-green-500'
  },
];

const workRoles = [
  'Engineering',
  'Design',
  'Product Management',
  'Marketing',
  'Sales',
  'Operations',
  'Human Resources',
  'Finance',
  'Other'
];

export function Settings({ isOpen, onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [profileData, setProfileData] = useState({
    fullName: 'Henry',
    displayName: 'Pham',
    workRole: 'Engineering',
    preferences: ''
  });
  const [connectedIntegrations, setConnectedIntegrations] = useState<Set<string>>(new Set());

  const handleConnect = (integrationId: string) => {
    setConnectedIntegrations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(integrationId)) {
        newSet.delete(integrationId);
      } else {
        newSet.add(integrationId);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl elevation-4 flex overflow-hidden animate-fade-in">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-200 smooth-transition"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left smooth-transition ${
                  activeTab === item.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'profile' && (
            <div className="p-8 max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full name
                    </Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="h-10 bg-gray-50 border-gray-300 focus:bg-white smooth-transition"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                      What should we call you?
                    </Label>
                    <Input
                      id="displayName"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                      className="h-10 bg-gray-50 border-gray-300 focus:bg-white smooth-transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workRole" className="text-sm font-medium text-gray-700">
                    What best describes your work?
                  </Label>
                  <Select value={profileData.workRole} onValueChange={(value) => setProfileData(prev => ({ ...prev, workRole: value }))}>
                    <SelectTrigger className="h-10 bg-gray-50 border-gray-300 focus:bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {workRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferences" className="text-sm font-medium text-gray-700">
                    What personal preferences should Claude consider in responses?
                    <Badge variant="outline" className="ml-2 text-xs">BETA</Badge>
                  </Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Your preferences will apply to all conversations, within Anthropic's guidelines. 
                    <button className="text-blue-600 hover:underline ml-1">Learn about preferences</button>
                  </p>
                  <Textarea
                    id="preferences"
                    value={profileData.preferences}
                    onChange={(e) => setProfileData(prev => ({ ...prev, preferences: e.target.value }))}
                    className="min-h-24 bg-gray-50 border-gray-300 focus:bg-white smooth-transition resize-none"
                    placeholder="Tell Claude about your preferences, style, or any context that would help personalize responses..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="p-8 max-w-4xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Integrations</h3>
              
              <div className="space-y-8">
                {/* Integrations Section */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-2">Integrations</h4>
                  <p className="text-sm text-gray-600 mb-6">
                    Allow Claude to reference other apps and services for more context.
                  </p>
                  
                  <div className="space-y-4">
                    {integrations.map((integration) => (
                      <div
                        key={integration.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 smooth-transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded text-center text-sm ${integration.color} text-white flex items-center justify-center`}>
                            {integration.icon}
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">{integration.name}</h5>
                            <p className="text-xs text-gray-600">{integration.description}</p>
                          </div>
                        </div>
                        
                        <Button
                          variant={connectedIntegrations.has(integration.id) ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleConnect(integration.id)}
                          className={`h-8 px-3 smooth-transition ${
                            connectedIntegrations.has(integration.id)
                              ? 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                              : 'bg-gray-900 hover:bg-gray-800 text-white'
                          }`}
                        >
                          {connectedIntegrations.has(integration.id) ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Connected
                            </>
                          ) : (
                            <>
                              Connect
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      className="w-full h-12 border-dashed border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 smooth-transition"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add integration
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="p-8 max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Appearance</h3>
              <div className="space-y-6">
                <div className="text-sm text-gray-600">
                  Appearance settings will be available in a future update.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="p-8 max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account</h3>
              <div className="space-y-6">
                <div className="text-sm text-gray-600">
                  Account settings will be available in a future update.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="p-8 max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy</h3>
              <div className="space-y-6">
                <div className="text-sm text-gray-600">
                  Privacy settings will be available in a future update.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="p-8 max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing</h3>
              <div className="space-y-6">
                <div className="text-sm text-gray-600">
                  Billing settings will be available in a future update.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}