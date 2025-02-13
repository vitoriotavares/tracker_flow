'use client';

import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  CircularProgress, 
  Card, 
  CardContent
} from '@mui/material';
import { 
  ArrowForward,
  ChatBubbleOutline,
  AttachMoney,
  Inventory2Outlined,
  ShowChartOutlined
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import PriorityOverview from '../components/PriorityOverview';
import PendingTasks from '../components/PendingTasks';
import RecentActivity from '../components/RecentActivity';

function MetricCard({ 
  title, 
  value, 
  percentageChange, 
  isPositive,
  icon
}: { 
  title: string;
  value: string;
  previousValue: string;
  percentageChange: number;
  isPositive: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Card sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        {icon}
      </Box>
      
      <Box sx={{ mt: 'auto' }}>
        <Typography variant="h4" component="div" sx={{ 
          fontWeight: 'bold',
          mb: 1
        }}>
          {value}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            vs último mês
          </Typography>
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            bgcolor: isPositive ? 'success.soft' : 'error.soft',
            color: isPositive ? 'success.main' : 'error.main',
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {isPositive ? '+' : ''}{percentageChange}%
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mt: 2,
        pt: 2,
        borderTop: 1,
        borderColor: 'divider'
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontWeight: 'medium',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Ver Detalhes
          <ArrowForward sx={{ fontSize: 16 }} />
        </Typography>
      </Box>
    </Card>
  );
}

function PerformanceCard() {
  const score = 82;
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Performance da Equipe</Typography>
        <Typography variant="body2" color="text.secondary">
          de 100 pontos
        </Typography>
      </Box>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
      }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={160}
            thickness={12}
            sx={{ 
              color: 'grey.100',
              position: 'absolute',
              left: 0,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <CircularProgress
            variant="determinate"
            value={score}
            size={160}
            thickness={12}
            sx={{ 
              color: '#FF4B55',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                transition: 'all 0.4s ease-in-out',
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
              flexDirection: 'column'
            }}
          >
            <Typography variant="h2" component="div" sx={{ 
              fontWeight: 'bold',
              color: '#FF4B55',
              lineHeight: 1
            }}>
              {score}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              pontos
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 'medium',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            color: '#FF4B55'
          }}>
            Sua equipe está indo muito bem! <span role="img" aria-label="star">⭐</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Continue mantendo o alto padrão de atendimento
          </Typography>
        </Box>
      </Box>
    </Box>
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
                icon={<ChatBubbleOutline sx={{ color: 'text.secondary' }} />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MetricCard
                title="Receita do Produto"
                value="$15,490"
                previousValue="$14,200"
                percentageChange={9}
                isPositive={true}
                icon={<AttachMoney sx={{ color: 'text.secondary' }} />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MetricCard
                title="Produtos Vendidos"
                value="2,355"
                previousValue="2,200"
                percentageChange={7}
                isPositive={true}
                icon={<Inventory2Outlined sx={{ color: 'text.secondary' }} />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MetricCard
                title="Taxa de Conversão"
                value="12.5%"
                previousValue="12.2%"
                percentageChange={2}
                isPositive={false}
                icon={<ShowChartOutlined sx={{ color: 'text.secondary' }} />}
              />
            </Grid>

            {/* Performance e Gráfico */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <PerformanceCard />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <PriorityOverview />
                </CardContent>
              </Card>
            </Grid>

            {/* Atividades Recentes e Pendências */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <PendingTasks />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
