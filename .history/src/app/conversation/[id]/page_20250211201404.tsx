'use client';

import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Chip, 
  Avatar, 
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface ConversationDetails {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  status: 'active' | 'resolved' | 'pending';
  priority: 'high' | 'medium' | 'low';
  startedAt: string;
  messages: Message[];
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const mockConversations: Record<string, ConversationDetails> = {
  '1': {
    id: '1',
    customer: {
      name: 'João Silva',
      email: 'joao.silva@email.com'
    },
    status: 'active',
    priority: 'high',
    startedAt: '2024-02-11T14:30:00',
    messages: [
      {
        id: '1',
        content: 'Olá, preciso de ajuda com meu pedido',
        sender: 'user',
        timestamp: '2024-02-11T14:30:00'
      },
      {
        id: '2',
        content: 'Claro! Por favor, me informe o número do seu pedido',
        sender: 'ai',
        timestamp: '2024-02-11T14:31:00'
      },
      {
        id: '3',
        content: 'O número é #123456',
        sender: 'user',
        timestamp: '2024-02-11T14:32:00'
      }
    ]
  }
};

function MessageBubble({ message }: { message: Message }) {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '80%',
          backgroundColor: message.sender === 'user' ? 'grey.100' : 'primary.light',
          color: message.sender === 'user' ? 'text.primary' : 'white'
        }}
      >
        <Typography variant="body1" gutterBottom>
          {message.content}
        </Typography>
        <Typography 
          variant="caption" 
          color={message.sender === 'user' ? 'text.secondary' : 'inherit'}
          suppressHydrationWarning
        >
          {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Typography>
      </Paper>
    </Box>
  );
}

export default function ConversationPage() {
  const params = useParams() as { id: string };
  const conversationId = params?.id || '1';
  
  const conversation = useMemo(() => 
    mockConversations[conversationId] || mockConversations['1'],
    [conversationId]
  );

  return (
    <DashboardLayout>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Informações do Cliente */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Conversa com {conversation.customer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {conversation.customer.email}
                  </Typography>
                </Box>
                <Box>
                  <Chip 
                    label={`Prioridade ${conversation.priority}`}
                    color={getPriorityColor(conversation.priority)}
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    label={conversation.status}
                    variant="outlined"
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Histórico de Mensagens */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Histórico da Conversa
                  </Typography>
                  <List>
                    {conversation.messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}