// src/components/RecentActivity.tsx
import { 
  Card, 
  CardContent, 
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
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Atividade Recente
        </Typography>
        <List>
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <ListItem 
                button 
                onClick={() => handleItemClick(activity.id)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <ListItemText
                  primary={activity.action}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                      <br />
                      <Typography component="span" variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}