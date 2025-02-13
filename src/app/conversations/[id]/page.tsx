import { ConversationDetailWrapper } from './ConversationDetailWrapper';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Conversation ${params.id}`,
  };
}

export default async function ConversationDetailPage({ params }: Props) {
  return <ConversationDetailWrapper conversationId={params.id} />;
}
