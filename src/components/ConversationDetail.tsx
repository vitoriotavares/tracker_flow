'use client';

import { useEffect, useState, useCallback } from 'react';
import { conversationApi } from '@/lib/api/conversations';
import { followUpApi } from '@/lib/api/follow-ups';
import { Conversation, Message, FollowUp } from '@/types/schema';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  TextField,
  Paper,
  Avatar,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  Box,
} from '@mui/material';
import {
  Add as AddIcon,
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

interface Props {
  conversationId: string;
}

interface FormData {
  message: string;
}

export function ConversationDetail({ conversationId }: Props) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      message: '',
    },
  });

  const loadConversation = useCallback(async () => {
    try {
      const data = await conversationApi.getById(conversationId);
      setConversation(data);
      setMessages(data.messages);
      setFollowUps(data.follow_ups);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  }, [conversationId]);

  useEffect(() => {
    loadConversation();
  }, [conversationId, loadConversation]);

  const handleSendMessage = async (values: FormData) => {
    try {
      if (!conversation) return;

      // Upload file if present
      const attachments = [];
      if (file) {
        const fileData = await conversationApi.uploadFile(conversationId, file);
        attachments.push(fileData);
      }

      // Send message
      await conversationApi.addMessage({
        conversationId,
        content: values.message,
        sender: 'user',
        attachments,
      });

      // Reset form and reload conversation
      reset();
      setFile(null);
      loadConversation();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleCreateFollowUp = async () => {
    try {
      if (!conversation) return;

      await followUpApi.create({
        conversationId,
        description: 'New follow-up task',
        dueDate: new Date(),
        status: 'pending',
        priority: conversation.priority,
      });

      loadConversation();
    } catch (error) {
      console.error('Failed to create follow-up:', error);
    }
  };

  if (!conversation) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={1}>
              <Typography variant="h5">{conversation.subject}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={conversation.priority}
                  color={conversation.priority === 'high' ? 'error' : conversation.priority === 'medium' ? 'warning' : 'info'}
                />
                <Chip
                  label={conversation.status}
                  color={conversation.status === 'active' ? 'success' : 'default'}
                />
                <Typography variant="body2" color="text.secondary">
                  Platform: {conversation.platform}
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateFollowUp}
            >
              Create Follow-up
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2}>
        <Stack spacing={2} sx={{ flex: 2 }}>
          <Card sx={{ minHeight: '400px' }}>
            <CardContent>
              <Stack spacing={2}>
                {messages.map((message) => (
                  <Paper
                    key={message.id}
                    elevation={1}
                    sx={{
                      p: 2,
                      ml: message.sender === 'user' ? 'auto' : 0,
                      mr: message.sender === 'ai' ? 'auto' : 0,
                      maxWidth: '80%',
                    }}
                  >
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: message.sender === 'user' ? 'primary.main' : 'success.main',
                          }}
                        >
                          {message.sender === 'user' ? 'U' : 'AI'}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {message.sender === 'user' ? 'You' : 'AI Assistant'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(message.timestamp).toLocaleString()}
                        </Typography>
                      </Stack>
                      <Typography>{message.content}</Typography>
                      {message.attachments?.map((attachment) => (
                        <Button
                          key={attachment.id}
                          startIcon={<AttachFileIcon />}
                          href={attachment.url}
                          target="_blank"
                          size="small"
                          sx={{ alignSelf: 'flex-start' }}
                        >
                          {attachment.filename}
                        </Button>
                      ))}
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit(handleSendMessage)}>
            <Stack direction="row" spacing={2}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={2}
                    fullWidth
                    placeholder="Type your message..."
                  />
                )}
              />
              <Stack spacing={1}>
                <Button
                  component="label"
                  startIcon={<AttachFileIcon />}
                  variant="outlined"
                >
                  Attach File
                  <input
                    type="file"
                    hidden
                    accept="image/*, .pdf, .doc, .docx"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SendIcon />}
                >
                  Send
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Follow-ups</Typography>
            <Timeline>
              {followUps.map((followUp) => (
                <TimelineItem key={followUp.id}>
                  <TimelineSeparator>
                    <TimelineDot color={followUp.status === 'completed' ? 'success' : 'warning'} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="subtitle2">{followUp.description}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Due: {new Date(followUp.dueDate).toLocaleDateString()}
                    </Typography>
                    <Box mt={0.5}>
                      <Chip
                        size="small"
                        label={followUp.status}
                        color={followUp.status === 'completed' ? 'success' : 'warning'}
                      />
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
