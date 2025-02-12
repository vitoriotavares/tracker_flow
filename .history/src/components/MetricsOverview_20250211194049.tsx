// src/components/MetricsOverview.tsx
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function MetricsOverview() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Métricas</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4">20</Typography>
          <Typography color="text.secondary">Conversas Ativas</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4">85%</Typography>
          <Typography color="text.secondary">Taxa de Resolução</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}