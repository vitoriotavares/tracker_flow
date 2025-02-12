// src/components/PriorityOverview.tsx
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Alta', value: 4 },
  { name: 'Média', value: 6 },
  { name: 'Baixa', value: 10 },
];

const COLORS = ['#ff1744', '#ffab00', '#00e676'];

export default function PriorityOverview() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Visão por Prioridade</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}