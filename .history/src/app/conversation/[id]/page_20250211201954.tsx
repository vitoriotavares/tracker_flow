'use client';

import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Stack,
  Avatar,
  Divider
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import {
  WhatsApp as WhatsAppIcon,
  Telegram as TelegramIcon,
  Instagram as InstagramIcon,
  AccessTime as AccessTimeIcon,
  Description as DocumentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

interface Document {
  id: string;
  name: string;
  status: 'pending' | 'received';
  receivedAt?: string;
}

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isAi: boolean;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  platform: 'whatsapp' | 'telegram' | 'instagram';
  documents: Document[];
  waitTime: number; // em minutos
  firstContact: string;
  lastContact: string;
}

interface Conversation {
  id: string;
  customer: Customer;
  status: string;
  priority: string;
  messages: Message[];
}

const mockConversations: Record<string, Conversation> = {
  '1': {
    id: '1',
    customer: {
      id: '123',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      platform: 'whatsapp',
      waitTime: 12,
      firstContact: '2025-02-11T19:30:00',
      lastContact: '2025-02-11T20:15:00',
      documents: [
        { id: '1', name: 'RG', status: 'received', receivedAt: '2025-02-11T19:35:00' },
        { id: '2', name: 'CPF', status: 'received', receivedAt: '2025-02-11T19:35:00' },
        { id: '3', name: 'Comprovante de Residência', status: 'pending' },
        { id: '4', name: 'Declaração de Renda', status: 'pending' }
      ]
    },
    status: 'Em Andamento',
    priority: 'Alta',
    messages: [
      {
        id: '1',
        content: 'Olá, preciso de ajuda com meu cadastro',
        sender: 'João Silva',
        timestamp: '2025-02-11T19:30:00',
        isAi: false
      },
      {
        id: '2',
        content: 'Claro! Vou te ajudar com o cadastro. Primeiro, preciso de alguns documentos.',
        sender: 'AI Assistant',
        timestamp: '2025-02-11T19:31:00',
        isAi: true
      }
    ]
  }
};

function getPriorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case 'alta':
      return 'error';
    case 'média':
      return 'warning';
    case 'baixa':
      return 'success';
    default:
      return 'default';
  }
}

function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'whatsapp':
      return <WhatsAppIcon color="success" />;
    case 'telegram':
      return <TelegramIcon color="primary" />;
    case 'instagram':
      return <InstagramIcon color="secondary" />;
    default:
      return null;
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.isAi ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          bgcolor: message.isAi ? 'grey.100' : 'primary.main',
          color: message.isAi ? 'text.primary' : 'white',
          borderRadius: 2,
          p: 2
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
          {formatDate(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ConversationPage() {
  const params = useParams() as { id: string };
  const conversationId = params?.id || '1';
  
  const conversation = useMemo(() => 
    mockConversations[conversationId] || mockConversations['1'],
  [conversationId]);

  return (
    <DashboardLayout>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Informações do Cliente */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                {/* Card Principal */}
                <Paper sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 64, height: 64 }}>
                        {conversation.customer.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h5">
                          {conversation.customer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {conversation.customer.email}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        icon={getPlatformIcon(conversation.customer.platform)}
                        label={conversation.customer.platform.toUpperCase()}
                      />
                      <Chip 
                        label={`Prioridade ${conversation.priority}`}
                        color={getPriorityColor(conversation.priority)}
                      />
                      <Chip 
                        label={conversation.status}
                        variant="outlined"
                      />
                    </Box>
                  </Stack>
                </Paper>

                {/* Tempos de Atendimento */}
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Tempos de Atendimento
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Tempo de Espera"
                        secondary={`${conversation.customer.waitTime} minutos`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Primeiro Contato"
                        secondary={formatDate(conversation.customer.firstContact)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Último Contato"
                        secondary={formatDate(conversation.customer.lastContact)}
                      />
                    </ListItem>
                  </List>
                </Paper>

                {/* Documentos */}
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Documentos
                  </Typography>
                  <List>
                    {conversation.customer.documents.map((doc) => (
                      <ListItem key={doc.id}>
                        <ListItemIcon>
                          {doc.status === 'received' ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <CancelIcon color="error" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary={doc.name}
                          secondary={doc.status === 'received' 
                            ? `Recebido em ${formatDate(doc.receivedAt!)}`
                            : 'Pendente'
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Stack>
            </Grid>

            {/* Histórico de Mensagens */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Histórico da Conversa
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                  {conversation.messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}