// src/components/PendingTasks.tsx
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Assignment } from '@mui/icons-material';

export default function PendingTasks() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Pendências</Typography>
        <List>
          {[1, 2, 3].map((item) => (
            <ListItem key={item}>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText
                primary={`Follow-up #${item}`}
                secondary="Aguardando resposta do cliente"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}