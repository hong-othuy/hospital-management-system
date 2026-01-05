import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  LocalHospital,
  AttachMoney,
  CalendarMonth,
  Person,
  Medication,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const patientVisitsData = [
  { name: 'T2', visits: 45, revenue: 12500 },
  { name: 'T3', visits: 52, revenue: 15200 },
  { name: 'T4', visits: 48, revenue: 13800 },
  { name: 'T5', visits: 61, revenue: 18400 },
  { name: 'T6', visits: 55, revenue: 16100 },
  { name: 'T7', visits: 38, revenue: 9800 },
  { name: 'CN', visits: 25, revenue: 6200 },
];

const departmentData = [
  { name: 'Tim mạch', value: 30, color: '#00A0E3' },
  { name: 'Nội khoa', value: 25, color: '#7C3AED' },
  { name: 'Nhi khoa', value: 20, color: '#F59E0B' },
  { name: 'Sản khoa', value: 15, color: '#10B981' },
  { name: 'Khác', value: 10, color: '#6B7280' },
];

const recentPatients = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    age: 45,
    doctor: 'BS. Trần Thị B',
    status: 'Đang khám',
    time: '09:30',
    avatar: 'NVA',
  },
  {
    id: 2,
    name: 'Trần Thị C',
    age: 32,
    doctor: 'BS. Lê Văn D',
    status: 'Chờ khám',
    time: '10:00',
    avatar: 'TTC',
  },
  {
    id: 3,
    name: 'Lê Hoàng E',
    age: 28,
    doctor: 'BS. Phạm Minh F',
    status: 'Hoàn thành',
    time: '08:45',
    avatar: 'LHE',
  },
  {
    id: 4,
    name: 'Phạm Thị G',
    age: 55,
    doctor: 'BS. Ngô Văn H',
    status: 'Chờ khám',
    time: '10:30',
    avatar: 'PTG',
  },
];

const topDoctors = [
  {
    name: 'BS. Trần Thị B',
    specialty: 'Tim mạch',
    patients: 45,
    rating: 4.8,
    avatar: 'TTB',
  },
  {
    name: 'BS. Lê Văn D',
    specialty: 'Nội khoa',
    patients: 38,
    rating: 4.7,
    avatar: 'LVD',
  },
  {
    name: 'BS. Phạm Minh F',
    specialty: 'Nhi khoa',
    patients: 42,
    rating: 4.9,
    avatar: 'PMF',
  },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

function StatCard({ title, value, change, isPositive, icon, color, bgColor }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.06)',
        height: '100%',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {isPositive ? (
                <TrendingUp sx={{ fontSize: 16, color: '#10B981' }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: '#EF4444' }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: isPositive ? '#10B981' : '#EF4444',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                {change}
              </Typography>
              <Typography variant="body2" sx={{ color: '#999', fontSize: '13px' }}>
                vs tuần trước
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '14px',
              bgcolor: bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export function AdminDashboard() {
  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Tổng bệnh nhân hôm nay"
            value="247"
            change="+12.5%"
            isPositive={true}
            icon={<People sx={{ fontSize: 28 }} />}
            color="#00A0E3"
            bgColor="#E3F2FD"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Bác sĩ đang làm việc"
            value="48"
            change="+2.1%"
            isPositive={true}
            icon={<LocalHospital sx={{ fontSize: 28 }} />}
            color="#7C3AED"
            bgColor="#F3E8FF"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Doanh thu tháng"
            value="₫188M"
            change="+8.3%"
            isPositive={true}
            icon={<AttachMoney sx={{ fontSize: 28 }} />}
            color="#10B981"
            bgColor="#D1FAE5"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Lịch hẹn hôm nay"
            value="64"
            change="+5.2%"
            isPositive={true}
            icon={<CalendarMonth sx={{ fontSize: 28 }} />}
            color="#F59E0B"
            bgColor="#FEF3C7"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Patient Visits Chart */}
        <Grid item xs={12} lg={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 0.5 }}>
                    Lượt khám & Doanh thu
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Thống kê 7 ngày qua
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Tuần này" size="small" color="primary" />
                  <Chip label="Tháng này" size="small" variant="outlined" />
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientVisitsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#999"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#999" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #f0f0f0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#00A0E3"
                    strokeWidth={3}
                    dot={{ fill: '#00A0E3', r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Lượt khám"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Doanh thu (k)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Department Distribution */}
        <Grid item xs={12} lg={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 3 }}>
                Phân bổ chuyên khoa
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                {departmentData.map((dept, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '3px',
                          bgcolor: dept.color,
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#666', fontSize: '13px' }}>
                        {dept.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                      {dept.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Patients and Top Doctors */}
      <Grid container spacing={3}>
        {/* Recent Patients */}
        <Grid item xs={12} lg={7}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 3 }}>
                Bệnh nhân gần đây
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentPatients.map((patient) => (
                  <Box
                    key={patient.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: '#FAFBFC',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: '#F5F7FA',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: '#00A0E3',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      {patient.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 600, color: '#1a1a1a', mb: 0.5 }}>
                        {patient.name} • {patient.age} tuổi
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', fontSize: '13px' }}>
                        {patient.doctor}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={patient.status}
                        size="small"
                        sx={{
                          mb: 0.5,
                          bgcolor:
                            patient.status === 'Đang khám'
                              ? '#E3F2FD'
                              : patient.status === 'Chờ khám'
                              ? '#FEF3C7'
                              : '#D1FAE5',
                          color:
                            patient.status === 'Đang khám'
                              ? '#00A0E3'
                              : patient.status === 'Chờ khám'
                              ? '#F59E0B'
                              : '#10B981',
                          fontWeight: 600,
                          fontSize: '11px',
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                        {patient.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Doctors */}
        <Grid item xs={12} lg={5}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 3 }}>
                Bác sĩ nổi bật
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {topDoctors.map((doctor, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: '#7C3AED',
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        {doctor.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600, color: '#1a1a1a', mb: 0.5 }}>
                          {doctor.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: '13px' }}>
                          {doctor.specialty}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontWeight: 700, color: '#00A0E3', fontSize: '18px' }}>
                          {doctor.patients}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          bệnh nhân
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(doctor.rating / 5) * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: '#F0F0F0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#F59E0B',
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#F59E0B' }}>
                        {doctor.rating}
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
