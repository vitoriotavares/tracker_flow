'use client';

import { ConversationList } from '@/components/ConversationList';
import DashboardLayout from '@/components/DashboardLayout';

export default function ConversationsPage() {
  return (
    <DashboardLayout>
      <ConversationList />
    </DashboardLayout>
  );
}
