'use client';

import { useParams } from 'next/navigation';
import { 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Box
} from '@mui/material';
import { useMemo } from 'react';

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

// Mova os dados mock para fora do componente
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
  },
  // Adicione mais conversas conforme necessário
};

export default function ConversationPage() {
  const params = useParams();
  const conversationId = typeof params.id === 'string' ? params.id : '';
  
  // Use useMemo para evitar recálculos desnecessários
  const conversation = useMemo(() => 
    mockConversations[conversationId] || mockConversations['1'],
    [conversationId]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Cabeçalho */}
        <Grid item xs={12}>
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

        {/* Histórico da Conversa */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Histórico da Conversa
              </Typography>
              <List>
                {conversation.messages.map((message, index) => (
                  <Box 
                    key={message.id}
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
                      <Typography variant="caption" color={message.sender === 'user' ? 'text.secondary' : 'inherit'}>
                        {new Intl.DateTimeFormat('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }).format(new Date(message.timestamp))}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}