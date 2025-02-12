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

export default function RecentActivity() {
  const activities = [
    {
      action: "Nova conversa iniciada",
      time: "Há 5 minutos",
      description: "Cliente: João Silva"
    },
    {
      action: "Ticket resolvido",
      time: "Há 15 minutos",
      description: "Suporte técnico finalizado"
    },
    {
      action: "Follow-up agendado",
      time: "Há 30 minutos",
      description: "Agendado para amanhã às 14h"
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Atividade Recente
        </Typography>
        <List>
          {activities.map((activity, index) => (
            <div key={index}>
              <ListItem>
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