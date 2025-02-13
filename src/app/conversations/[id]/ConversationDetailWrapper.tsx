'use client';

import { ConversationDetail } from '@/components/ConversationDetail';
import DashboardLayout from '@/components/DashboardLayout';

interface Props {
  conversationId: string;
}

export const ConversationDetailWrapper = ({ conversationId }: Props) => {
  return (
    <DashboardLayout>
      <ConversationDetail conversationId={conversationId} />
    </DashboardLayout>
  );
};
