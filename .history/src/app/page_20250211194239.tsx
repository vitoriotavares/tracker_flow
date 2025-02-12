'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import PriorityOverview from '../components/PriorityOverview';
import PendingTasks from '../components/PendingTasks';
import RecentActivity from '../components/RecentActivity';
import MetricsOverview from '../components/MetricsOverview';

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <PriorityOverview />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricsOverview />
        </Grid>
        <Grid item xs={12} md={6}>
          <PendingTasks />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Container>
  );
}
