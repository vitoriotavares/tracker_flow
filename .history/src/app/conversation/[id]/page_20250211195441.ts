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

// Dados de exemplo
const mockConversation: ConversationDetails = {
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
};

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

export default function ConversationPage() {
  const params = useParams();
  const conversation = mockConversation; // Em produção, buscar dados reais usando o ID

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
                  <div key={message.id}>
                    <ListItem alignItems="flex-start" sx={{
                      justifyContent: message.sender === 'user' ? 'flex-start' : 'flex-end'
                    }}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ 
                              color: message.sender === 'user' ? 'primary.main' : 'secondary.main'
                            }}
                          >
                            {message.sender === 'user' ? 'Cliente' : 'AI'}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {message.content}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption" color="text.secondary">
                              {new Date(message.timestamp).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < conversation.messages.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}