import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  LocalHospital,
  AttachMoney,
  Warning,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const patientVisitsData = [
  { name: 'Mon', visits: 45 },
  { name: 'Tue', visits: 52 },
  { name: 'Wed', visits: 48 },
  { name: 'Thu', visits: 61 },
  { name: 'Fri', visits: 55 },
  { name: 'Sat', visits: 38 },
  { name: 'Sun', visits: 25 },
];

const revenueByDepartmentData = [
  { name: 'Cardiology', revenue: 45000 },
  { name: 'Neurology', revenue: 38000 },
  { name: 'Orthopedics', revenue: 42000 },
  { name: 'Pediatrics', revenue: 35000 },
  { name: 'General', revenue: 28000 },
];

const recentActivities = [
  {
    id: 1,
    type: 'login',
    user: 'Dr. Sarah Johnson',
    action: 'Logged in to the system',
    time: '2 minutes ago',
    avatar: 'SJ',
  },
  {
    id: 2,
    type: 'prescription',
    user: 'Dr. Michael Chen',
    action: 'Created prescription for Patient #2847',
    time: '15 minutes ago',
    avatar: 'MC',
  },
  {
    id: 3,
    type: 'login',
    user: 'Dr. Emily Rodriguez',
    action: 'Logged in to the system',
    time: '23 minutes ago',
    avatar: 'ER',
  },
  {
    id: 4,
    type: 'prescription',
    user: 'Dr. David Kim',
    action: 'Updated prescription for Patient #1923',
    time: '1 hour ago',
    avatar: 'DK',
  },
  {
    id: 5,
    type: 'login',
    user: 'Admin User',
    action: 'Generated monthly report',
    time: '2 hours ago',
    avatar: 'AU',
  },
];

const lowStockMedicines = [
  { name: 'Amoxicillin 500mg', stock: 45, minStock: 100, status: 'Low' },
  { name: 'Ibuprofen 400mg', stock: 23, minStock: 150, status: 'Critical' },
  { name: 'Metformin 850mg', stock: 78, minStock: 100, status: 'Low' },
  { name: 'Lisinopril 10mg', stock: 15, minStock: 80, status: 'Critical' },
];

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

function KPICard({ title, value, change, isPositive, icon, color }: KPICardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
            {title}
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '10px',
              bgcolor: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#111827' }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {isPositive ? (
            <TrendingUp sx={{ fontSize: 18, color: '#10B981' }} />
          ) : (
            <TrendingDown sx={{ fontSize: 18, color: '#EF4444' }} />
          )}
          <Typography
            variant="body2"
            sx={{ color: isPositive ? '#10B981' : '#EF4444', fontWeight: 500 }}
          >
            {change}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>
            vs last week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
        Dashboard Overview
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Total Patients Today"
            value="247"
            change="+12.5%"
            isPositive={true}
            icon={<People />}
            color="#1976D2"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Active Doctors"
            value="48"
            change="+2.1%"
            isPositive={true}
            icon={<LocalHospital />}
            color="#7C3AED"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Revenue (Month)"
            value="$188K"
            change="+8.3%"
            isPositive={true}
            icon={<AttachMoney />}
            color="#10B981"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Low Stock Alerts"
            value="4"
            change="+2"
            isPositive={false}
            icon={<Warning />}
            color="#EF4444"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
                Patient Visits Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientVisitsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#1976D2"
                    strokeWidth={3}
                    dot={{ fill: '#1976D2', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#111827' }}>
                Low Stock Medicines
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {lowStockMedicines.map((medicine, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: '8px',
                      bgcolor: medicine.status === 'Critical' ? '#FEF2F2' : '#FEF9C3',
                      border: `1px solid ${
                        medicine.status === 'Critical' ? '#FCA5A5' : '#FDE047'
                      }`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}
                        >
                          {medicine.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280' }}>
                          Stock: {medicine.stock} / Min: {medicine.minStock}
                        </Typography>
                      </Box>
                      <Chip
                        label={medicine.status}
                        size="small"
                        sx={{
                          bgcolor:
                            medicine.status === 'Critical' ? '#EF4444' : '#F59E0B',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '11px',
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue Chart and Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
                Revenue by Department
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueByDepartmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#1976D2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#111827' }}>
                Recent Activity
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentActivities.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: '#1976D2',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {activity.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}
                      >
                        {activity.user}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                        {activity.action}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '11px' }}>
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
