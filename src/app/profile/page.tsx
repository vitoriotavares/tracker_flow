'use client';

import { Box, Container, Paper, Typography, Avatar, Grid } from '@mui/material';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Paper sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: '#ff5722',
                    fontSize: '3rem',
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  gutterBottom
                  sx={{ color: '#ff5722', fontWeight: 'bold' }}
                >
                  {user?.name || 'Usuário'}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  gutterBottom
                >
                  {user?.email || 'email@exemplo.com'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Informações do Perfil
                </Typography>
                <Typography variant="body1" paragraph>
                  Este é um exemplo de página de perfil. Aqui você pode adicionar mais
                  informações sobre o usuário, como cargo, departamento, preferências
                  do sistema, etc.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
