// src/components/PriorityOverview.tsx
import { Box, Typography, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label, Tooltip } from 'recharts';

const data = [
  { name: 'Alta', value: 45, color: '#FF4B55' },
  { name: 'Média', value: 35, color: '#FF8C42' },
  { name: 'Baixa', value: 20, color: '#98A2B3' },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const CustomLabel = ({ viewBox }: any) => {
  const { cx, cy } = viewBox;
  return (
    <>
      <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {total}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '14px', fill: '#98A2B3' }}>
        Total
      </text>
    </>
  );
};

const CustomLegend = ({ payload }: any) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
    {payload.map((entry: any, index: number) => (
      <Box key={`legend-${index}`} sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {entry.payload.name}
        </Typography>
        <Typography variant="h6" sx={{ color: entry.payload.color, fontWeight: 'medium' }}>
          {entry.payload.value}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default function PriorityOverview() {
  const theme = useTheme();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Visão por Prioridade</Typography>
        <Typography variant="body2" color="text.secondary">
          Total de conversas
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
              <Label content={<CustomLabel />} position="center" />
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} (${Math.round(value/total * 100)}%)`, 'Conversas']}
              contentStyle={{ background: theme.palette.background.paper, border: 'none', borderRadius: 8, boxShadow: theme.shadows[3] }}
            />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}