export type Priority = 'high' | 'medium' | 'low';
export type ConversationStatus = 'active' | 'pending' | 'resolved' | 'archived';
export type Platform = 'telegram' | 'whatsapp' | 'direct';

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  preferences: {
    language?: string;
    timezone?: string;
    communicationChannel?: Platform;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  customerId: string;
  customer?: {
    name: string;
    email: string;
  };
  platform: Platform;
  priority: Priority;
  status: ConversationStatus;
  subject: string;
  lastMessage: string;
  hasAttachments: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationFile {
  id: string;
  conversationId: string;
  filename: string;
  fileType: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface FollowUp {
  id: string;
  conversationId: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed';
  priority: Priority;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  attachments?: ConversationFile[];
}
