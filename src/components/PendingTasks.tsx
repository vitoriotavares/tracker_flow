// src/components/PendingTasks.tsx
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Assignment } from '@mui/icons-material';

export default function PendingTasks() {
  const pendingTasks = [
    {
      id: 1,
      title: "Follow-up #1",
      description: "Aguardando resposta do cliente",
      status: "pending"
    },
    {
      id: 2,
      title: "Follow-up #2",
      description: "Aguardando resposta do cliente",
      status: "pending"
    },
    {
      id: 3,
      title: "Follow-up #3",
      description: "Aguardando resposta do cliente",
      status: "pending"
    }
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Pendências</Typography>
        <Typography variant="body2" color="text.secondary">
          {pendingTasks.length} itens pendentes
        </Typography>
      </Box>
      <List sx={{ flex: 1, overflow: 'auto' }}>
        {pendingTasks.map((task) => (
          <ListItem 
            key={task.id}
            sx={{ 
              borderRadius: 1,
              mb: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <ListItemIcon>
              <Assignment color="action" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {task.title}
                </Typography>
              }
              secondary={task.description}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}