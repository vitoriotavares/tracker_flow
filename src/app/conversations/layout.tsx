import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversations | AI Conversation Tracker',
  description: 'Track and manage AI-assisted conversations across multiple platforms',
}

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
