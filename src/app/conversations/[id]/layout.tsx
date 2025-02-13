import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversation Details | AI Conversation Tracker',
  description: 'View and manage conversation details and follow-ups',
}

export default function ConversationDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
