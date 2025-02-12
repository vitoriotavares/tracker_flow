// src/components/RecentActivity.tsx
import { Card, CardContent, Typography, Timeline, TimelineItem, TimelineContent } from '@mui/material';

export default function RecentActivity() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Atividade Recente</Typography>
        <Timeline>
          <TimelineItem>
            <TimelineContent>
              <Typography variant="body2">Nova conversa iniciada</Typography>
              <Typography variant="caption">Há 5 minutos</Typography>
            </TimelineContent>
          </TimelineItem>
          {/* Adicionar mais itens conforme necessário */}
        </Timeline>
      </CardContent>
    </Card>
  );
}