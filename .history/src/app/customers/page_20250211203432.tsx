'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Stack,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  WhatsApp as WhatsAppIcon,
  Telegram as TelegramIcon,
  Instagram as InstagramIcon,
  Chat as ChatIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import DashboardLayout from '../../components/DashboardLayout';
import { useRouter } from 'next/navigation';

interface Customer {
  id: string;
  name: string;
  email: string;
  platform: 'whatsapp' | 'telegram' | 'instagram';
  lastContact: string;
  status: string;
  priority: string;
  waitTime: number;
}

// Mock data
const mockCustomers: Customer[] = Array.from({ length: 50 }, (_, index) => ({
  id: `${index + 1}`,
  name: `Cliente ${index + 1}`,
  email: `cliente${index + 1}@email.com`,
  platform: ['whatsapp', 'telegram', 'instagram'][Math.floor(Math.random() * 3)] as Customer['platform'],
  lastContact: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  status: ['Em Andamento', 'Aguardando', 'Finalizado'][Math.floor(Math.random() * 3)],
  priority: ['Alta', 'Média', 'Baixa'][Math.floor(Math.random() * 3)],
  waitTime: Math.floor(Math.random() * 60)
}));

function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'whatsapp':
      return <WhatsAppIcon color="success" />;
    case 'telegram':
      return <TelegramIcon color="primary" />;
    case 'instagram':
      return <InstagramIcon color="secondary" />;
    default:
      return null;
  }
}

function getPriorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case 'alta':
      return 'error';
    case 'média':
      return 'warning';
    case 'baixa':
      return 'success';
    default:
      return 'default';
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function CustomerCard({ customer, onClick }: { customer: Customer; onClick: () => void }) {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.hover'
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{customer.name}</Typography>
            <IconButton color="primary" onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}>
              <ChatIcon />
            </IconButton>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            {customer.email}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              size="small"
              icon={getPlatformIcon(customer.platform)}
              label={customer.platform.toUpperCase()}
            />
            <Chip
              size="small"
              label={customer.status}
              variant="outlined"
            />
            <Chip
              size="small"
              label={customer.priority}
              color={getPriorityColor(customer.priority)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              Último contato: {formatDate(customer.lastContact)}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Tempo de espera: {customer.waitTime} min
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function CustomersPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedCustomers = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredCustomers.slice(start, start + rowsPerPage);
  }, [filteredCustomers, page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleRowClick = (customerId: string) => {
    router.push(`/conversation/${customerId}`);
  };

  return (
    <DashboardLayout>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            {/* Header */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              sx={{ 
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' }
              }}
            >
              <Typography variant="h4">
                Clientes
              </Typography>
              <TextField
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={handleSearch}
                variant="outlined"
                size="small"
                fullWidth={isMobile}
                sx={{ maxWidth: { sm: 300 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Content */}
            {isMobile ? (
              // Mobile view - Cards
              <Box>
                {paginatedCustomers.map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onClick={() => handleRowClick(customer.id)}
                  />
                ))}
              </Box>
            ) : (
              // Desktop view - Table
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Plataforma</TableCell>
                      <TableCell>Último Contato</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Prioridade</TableCell>
                      <TableCell>Tempo de Espera</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCustomers.map((customer) => (
                      <TableRow 
                        key={customer.id}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleRowClick(customer.id)}
                      >
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getPlatformIcon(customer.platform)}
                            {customer.platform}
                          </Box>
                        </TableCell>
                        <TableCell>{formatDate(customer.lastContact)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={customer.status}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={customer.priority}
                            size="small"
                            color={getPriorityColor(customer.priority)}
                          />
                        </TableCell>
                        <TableCell>{customer.waitTime} min</TableCell>
                        <TableCell align="right">
                          <IconButton 
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(customer.id);
                            }}
                          >
                            <ChatIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredCustomers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Itens por página"
              labelDisplayedRows={({ from, to, count }) => 
                `${from}-${to} de ${count}`
              }
            />
          </Stack>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
