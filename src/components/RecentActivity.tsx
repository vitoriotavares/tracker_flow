// src/components/RecentActivity.tsx
import { 
  Box,
  Typography, 
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function RecentActivity() {
  const router = useRouter();
  
  const activities = [
    {
      id: "1",
      action: "Nova conversa iniciada",
      time: "Há 5 minutos",
      description: "Cliente: João Silva"
    },
    {
      id: "2",
      action: "Ticket resolvido",
      time: "Há 15 minutos",
      description: "Suporte técnico finalizado"
    },
    {
      id: "3",
      action: "Follow-up agendado",
      time: "Há 30 minutos",
      description: "Agendado para amanhã às 14h"
    }
  ];

  const handleItemClick = (id: string) => {
    router.push(`/conversation/${id}`);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Atividade Recente</Typography>
        <Typography variant="body2" color="text.secondary">
          Últimas 24 horas
        </Typography>
      </Box>
      <List sx={{ flex: 1, overflow: 'auto' }}>
        {activities.map((activity, index) => (
          <Box key={activity.id}>
            <ListItem 
              button 
              onClick={() => handleItemClick(activity.id)}
              sx={{ 
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                }
                secondary={activity.description}
              />
            </ListItem>
            {index < activities.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
}