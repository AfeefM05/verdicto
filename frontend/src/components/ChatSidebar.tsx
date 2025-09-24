'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Search, 
  Clock, 
  Star, 
  MoreVertical,
  Bot,
  User,
  Calendar,
  Filter
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { listConversations, toggleStar, snippet, type Conversation, createConversation, deleteConversation, findDraftConversation, notifyConversationsUpdated } from '@/services/chat';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ChatSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const data = await listConversations(user.id);
        setConversations(data);
        if (data.length && !selectedChat) {
          setSelectedChat(data[0].id);
          window.dispatchEvent(new CustomEvent<{ id: string }>('conversation:selected', { detail: { id: data[0].id } }));
        }
      } catch {
        // If schema missing, show empty quietly
        // Optional: console.debug('Chat list load error', e);
        setConversations([]);
      }
    };
    load();
    const handler = () => load();
    window.addEventListener('conversations:updated', handler as EventListener);
    return () => window.removeEventListener('conversations:updated', handler as EventListener);
  }, [user, selectedChat]);

  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.last_message || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const starredChats = filtered.filter(c => c.is_starred);
  const recentChats = filtered.filter(c => !c.is_starred);

  const onToggleStar = async (chat: Conversation) => {
    const updated = await toggleStar(chat.id, !chat.is_starred);
    setConversations(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  return (
    <div className="w-full flex flex-col h-full bg-card">
      {/* Content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
            <Button
              size="sm"
              className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
              onClick={async () => {
                if (!user) return;
                const draft = await findDraftConversation(user.id);
                if (draft) {
                  setSelectedChat(draft.id);
                  window.dispatchEvent(new CustomEvent<{ id: string }>('conversation:selected', { detail: { id: draft.id } }));
                } else {
                  const created = await createConversation({
                    user_id: user.id,
                    title: 'New Conversation',
                    is_starred: false,
                    unread_count: 0,
                    last_message: '',
                    last_message_at: new Date().toISOString(),
                  });
                  setConversations(prev => [created, ...prev]);
                  setSelectedChat(created.id);
                  window.dispatchEvent(new CustomEvent<{ id: string }>('conversation:selected', { detail: { id: created.id } }));
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Filter className="h-3 w-3 mr-1" />
              All
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Star className="h-3 w-3 mr-1" />
              Starred
            </Button>
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {/* Starred Chats */}
            {starredChats.length > 0 && (
              <div className="space-y-1.5 ">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Starred
                </h3>
                {starredChats.map((chat) => (
                  <Card
                    key={chat.id}
                    className={`cursor-pointer max-w-72 transition-all duration-200 hover:shadow-md ${
                      selectedChat === chat.id 
                        ? 'ring-2 ring-primary bg-primary/10' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => {
                      setSelectedChat(chat.id);
                      window.dispatchEvent(new CustomEvent<{ id: string }>('conversation:selected', { detail: { id: chat.id } }));
                    }}
                  >
                    <CardContent className="p-2 ">
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-0.5">
                          {true ? (
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-primary-foreground" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-secondary-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <h4 className="text-xs font-medium text-foreground truncate">
                              {chat.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); onToggleStar(chat); }}>
                                <Star className={`w-2.5 h-2.5 ${chat.is_starred ? 'text-yellow-500 fill-current' : ''}`} />
                              </button>
                              {Number(chat.unread_count) > 0 && (
                                <Badge className="h-4 w-4 p-0 text-xs bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                                  {chat.unread_count}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-0.5 line-clamp-1">
                            {snippet(chat.last_message || '')}
                          </p>
                          <div className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {chat.last_message_at ? new Date(chat.last_message_at).toLocaleString() : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Recent Chats */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recent
              </h3>
              {recentChats.map((chat) => (
                <Card
                  key={chat.id}
                  className={`group cursor-pointer max-w-72 transition-all duration-300 hover:shadow-md ${
                    selectedChat === chat.id 
                      ? 'ring-2 ring-primary bg-primary/10' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => {
                    setSelectedChat(chat.id);
                    window.dispatchEvent(new CustomEvent<{ id: string }>('conversation:selected', { detail: { id: chat.id } }));
                  }}
                >
                  <CardContent className="p-2">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        {true ? (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-primary-foreground" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-medium text-foreground truncate">
                            {chat.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            {Number(chat.unread_count) > 0 && (
                              <Badge className="h-4 w-4 p-0 text-xs bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                              {chat.unread_count}
                              </Badge>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <MoreVertical className="w-2.5 h-2.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={async (e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); await onToggleStar(chat); }}>
                                  <Star className={`h-3 w-3 mr-2 ${chat.is_starred ? 'text-yellow-500 fill-current' : ''}`} />
                                  {chat.is_starred ? 'Unfavorite' : 'Favorite'}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={async (e: React.MouseEvent<HTMLDivElement>) => {
                                  e.stopPropagation();
                                  try {
                                    await deleteConversation(chat.id);
                                    // Reload list from DB to stay in sync
                                    if (user) {
                                      const refreshed = await listConversations(user.id);
                                      setConversations(refreshed);
                                      const next = refreshed[0]?.id || null;
                                      setSelectedChat(next);
                                      if (next) {
                                        window.dispatchEvent(new CustomEvent<{ id: string }>('conversation:selected', { detail: { id: next } }));
                                      }
                                      notifyConversationsUpdated();
                                    }
                                  } catch (err) {
                                    console.error('Delete failed', err);
                                    alert('Failed to delete conversation. You may not have permission or it may not exist.');
                                  }
                                }}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-0.5 line-clamp-1">
                          {snippet(chat.last_message || '')}
                        </p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {chat.last_message_at ? new Date(chat.last_message_at).toLocaleString() : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last active: 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;