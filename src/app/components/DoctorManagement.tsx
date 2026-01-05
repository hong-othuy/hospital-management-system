import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  CalendarMonth,
  Search,
  Phone,
  Email,
} from '@mui/icons-material';

interface Doctor {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
  phone: string;
  email: string;
  status: 'Active' | 'On Leave';
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    avatar: 'SJ',
    specialty: 'Cardiology',
    phone: '+1 (555) 123-4567',
    email: 'sarah.j@hospital.com',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    avatar: 'MC',
    specialty: 'Neurology',
    phone: '+1 (555) 234-5678',
    email: 'michael.c@hospital.com',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    avatar: 'ER',
    specialty: 'Pediatrics',
    phone: '+1 (555) 345-6789',
    email: 'emily.r@hospital.com',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Dr. David Kim',
    avatar: 'DK',
    specialty: 'Orthopedics',
    phone: '+1 (555) 456-7890',
    email: 'david.k@hospital.com',
    status: 'On Leave',
  },
  {
    id: 5,
    name: 'Dr. Jennifer Williams',
    avatar: 'JW',
    specialty: 'General Medicine',
    phone: '+1 (555) 567-8901',
    email: 'jennifer.w@hospital.com',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Dr. Robert Taylor',
    avatar: 'RT',
    specialty: 'Dermatology',
    phone: '+1 (555) 678-9012',
    email: 'robert.t@hospital.com',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Dr. Lisa Anderson',
    avatar: 'LA',
    specialty: 'Psychiatry',
    phone: '+1 (555) 789-0123',
    email: 'lisa.a@hospital.com',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Dr. James Martinez',
    avatar: 'JM',
    specialty: 'Emergency Medicine',
    phone: '+1 (555) 890-1234',
    email: 'james.m@hospital.com',
    status: 'Active',
  },
];

const specialties = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'General Medicine',
  'Dermatology',
  'Psychiatry',
  'Emergency Medicine',
];

export function DoctorManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: '', specialty: '', phone: '', email: '' });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDoctors = filteredDoctors.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          Doctor Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
          sx={{
            bgcolor: '#1976D2',
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            '&:hover': {
              bgcolor: '#1565C0',
            },
          }}
        >
          Add New Doctor
        </Button>
      </Box>

      <Card
        elevation={0}
        sx={{
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
          <TextField
            fullWidth
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#6B7280' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
                bgcolor: '#F9FAFB',
              },
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Doctor
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Specialty
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Contact
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDoctors.map((doctor) => (
                <TableRow
                  key={doctor.id}
                  sx={{
                    '&:hover': {
                      bgcolor: '#F9FAFB',
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: '#1976D2',
                          width: 40,
                          height: 40,
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        {doctor.avatar}
                      </Avatar>
                      <Typography sx={{ fontWeight: 500, color: '#111827' }}>
                        {doctor.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={doctor.specialty}
                      size="small"
                      sx={{
                        bgcolor: '#E3F2FD',
                        color: '#1976D2',
                        fontWeight: 500,
                        fontSize: '12px',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Phone sx={{ fontSize: 14, color: '#6B7280' }} />
                        <Typography variant="body2" sx={{ color: '#6B7280' }}>
                          {doctor.phone}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email sx={{ fontSize: 14, color: '#6B7280' }} />
                        <Typography variant="body2" sx={{ color: '#6B7280' }}>
                          {doctor.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={doctor.status}
                      size="small"
                      sx={{
                        bgcolor: doctor.status === 'Active' ? '#DCFCE7' : '#FEF3C7',
                        color: doctor.status === 'Active' ? '#16A34A' : '#CA8A04',
                        fontWeight: 600,
                        fontSize: '12px',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton
                        size="small"
                        sx={{
                          color: '#1976D2',
                          '&:hover': { bgcolor: '#E3F2FD' },
                        }}
                      >
                        <CalendarMonth fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: '#6B7280',
                          '&:hover': { bgcolor: '#F3F4F6' },
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: '#EF4444',
                          '&:hover': { bgcolor: '#FEE2E2' },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDoctors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid #E5E7EB',
          }}
        />
      </Card>

      {/* Add Doctor Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: '#111827' }}>
          Add New Doctor
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Full Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              label="Specialty"
              select
              fullWidth
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            >
              {specialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Phone Number"
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              textTransform: 'none',
              color: '#6B7280',
              borderRadius: '8px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              textTransform: 'none',
              bgcolor: '#1976D2',
              borderRadius: '8px',
              px: 3,
              '&:hover': {
                bgcolor: '#1565C0',
              },
            }}
          >
            Add Doctor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
