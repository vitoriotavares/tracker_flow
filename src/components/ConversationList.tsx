'use client';

import { useEffect, useState, useCallback } from 'react';
import { conversationApi } from '@/lib/api/conversations';
import { Conversation, ConversationStatus, Priority } from '@/types/schema';
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Message as MessageIcon,
  AttachFile as AttachFileIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export function ConversationList() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filters, setFilters] = useState({
    status: undefined as ConversationStatus | undefined,
    priority: undefined as Priority | undefined,
  });

  const loadConversations = useCallback(async () => {
    try {
      const data = await conversationApi.list(filters);
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  }, [filters]);

  useEffect(() => {
    loadConversations();
  }, [filters, loadConversations]);

  const handleStatusChange = async (id: string, status: ConversationStatus) => {
    try {
      await conversationApi.update(id, { status });
      loadConversations();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handlePriorityChange = async (id: string, priority: Priority) => {
    try {
      await conversationApi.update(id, { priority });
      loadConversations();
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Conversations</Typography>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as ConversationStatus })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                value={filters.priority || ''}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value as Priority })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Message</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conversations.map((conv) => (
                <TableRow key={conv.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>{conv.subject}</Typography>
                      {conv.hasAttachments && (
                        <IconButton size="small" color="inherit">
                          <AttachFileIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>{conv.customer?.name}</TableCell>
                  <TableCell>
                    <Typography sx={{ textTransform: 'capitalize' }}>{conv.platform}</Typography>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        value={conv.priority}
                        onChange={(e) => handlePriorityChange(conv.id, e.target.value as Priority)}
                        size="small"
                      >
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        value={conv.status}
                        onChange={(e) => handleStatusChange(conv.id, e.target.value as ConversationStatus)}
                        size="small"
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="archived">Archived</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Typography noWrap>{conv.lastMessage}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        onClick={() => router.push(`/conversations/${conv.id}`)}
                      >
                        <MessageIcon />
                      </IconButton>
                      <IconButton
                        color="warning"
                        onClick={() => router.push(`/conversations/${conv.id}/edit`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          // Implement delete functionality
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
