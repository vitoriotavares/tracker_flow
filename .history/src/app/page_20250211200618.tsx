'use client';

import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  CircularProgress 
} from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import PriorityOverview from '../components/PriorityOverview';
import PendingTasks from '../components/PendingTasks';
import RecentActivity from '../components/RecentActivity';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

function MetricCard({ 
  title, 
  value, 
  previousValue, 
  percentageChange, 
  isPositive 
}: { 
  title: string;
  value: string;
  previousValue: string;
  percentageChange: number;
  isPositive: boolean;
}) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        height: '100%',
        backgroundColor: 'background.default',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Typography color="text.secondary" variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ my: 2, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          vs último mês {previousValue}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          color: isPositive ? 'success.main' : 'error.main',
          bgcolor: isPositive ? 'success.lighter' : 'error.lighter',
          px: 1,
          py: 0.5,
          borderRadius: 1
        }}>
          {isPositive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {percentageChange}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

function PerformanceCard() {
  const score = 82;
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        height: '100%',
        backgroundColor: 'background.default',
        borderRadius: 2
      }}
    >
      <Typography variant="h6" gutterBottom>
        Performance da Equipe
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        my: 3
      }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
          <CircularProgress
            variant="determinate"
            value={score}
            size={160}
            thickness={4}
            sx={{ 
              color: 'primary.main',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
              {score}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" color="primary" sx={{ fontWeight: 'medium', mt: 2 }}>
          Sua equipe está indo muito bem!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          Continue mantendo o alto padrão de atendimento
        </Typography>
      </Box>
    </Paper>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Box sx={{ py: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Métricas */}
            <Grid item xs={12} md={3}>
              <MetricCard
                title="Conversas Ativas"
                value="24,064"
                previousValue="21,500"
                percentageChange={12}
                isPositive={true}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MetricCard
                title="Receita do Produto"
                value="$15,490"
                previousValue="$14,200"
                percentageChange={9}
                isPositive={true}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MetricCard
                title="Produtos Vendidos"
                value="2,355"
                previousValue="2,200"
                percentageChange={7}
                isPositive={true}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MetricCard
                title="Taxa de Conversão"
                value="12.5%"
                previousValue="12.2%"
                percentageChange={2}
                isPositive={false}
              />
            </Grid>

            {/* Performance e Gráfico */}
            <Grid item xs={12} md={4}>
              <PerformanceCard />
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  height: '100%',
                  backgroundColor: 'background.default',
                  borderRadius: 2
                }}
              >
                <PriorityOverview />
              </Paper>
            </Grid>

            {/* Atividades Recentes e Pendências */}
            <Grid item xs={12} md={6}>
              <RecentActivity />
            </Grid>
            <Grid item xs={12} md={6}>
              <PendingTasks />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
