import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, Warning } from '@mui/icons-material';

interface Medicine {
  id: number;
  name: string;
  batchNo: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  expiryDate: string;
}

interface Prescription {
  id: number;
  patientName: string;
  patientId: string;
  diagnosis: string;
  icdCode: string;
  date: string;
  medicines: {
    name: string;
    dosage: string;
    duration: string;
  }[];
}

const medicinesData: Medicine[] = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    batchNo: 'BT2024-001',
    unit: 'Pill',
    quantity: 45,
    minQuantity: 100,
    expiryDate: '2025-08-15',
  },
  {
    id: 2,
    name: 'Ibuprofen 400mg',
    batchNo: 'BT2024-002',
    unit: 'Pill',
    quantity: 23,
    minQuantity: 150,
    expiryDate: '2025-06-20',
  },
  {
    id: 3,
    name: 'Metformin 850mg',
    batchNo: 'BT2024-003',
    unit: 'Pill',
    quantity: 78,
    minQuantity: 100,
    expiryDate: '2026-01-10',
  },
  {
    id: 4,
    name: 'Lisinopril 10mg',
    batchNo: 'BT2024-004',
    unit: 'Pill',
    quantity: 15,
    minQuantity: 80,
    expiryDate: '2025-09-30',
  },
  {
    id: 5,
    name: 'Omeprazole 20mg',
    batchNo: 'BT2024-005',
    unit: 'Capsule',
    quantity: 150,
    minQuantity: 100,
    expiryDate: '2025-12-15',
  },
  {
    id: 6,
    name: 'Cough Syrup 100ml',
    batchNo: 'BT2024-006',
    unit: 'Bottle',
    quantity: 34,
    minQuantity: 50,
    expiryDate: '2025-05-20',
  },
  {
    id: 7,
    name: 'Aspirin 75mg',
    batchNo: 'BT2024-007',
    unit: 'Pill',
    quantity: 200,
    minQuantity: 150,
    expiryDate: '2026-03-10',
  },
  {
    id: 8,
    name: 'Vitamin D3 1000IU',
    batchNo: 'BT2024-008',
    unit: 'Capsule',
    quantity: 92,
    minQuantity: 100,
    expiryDate: '2026-02-28',
  },
];

const prescriptionsData: Prescription[] = [
  {
    id: 1,
    patientName: 'John Smith',
    patientId: 'PT-2847',
    diagnosis: 'Hypertension',
    icdCode: 'I10',
    date: '2026-01-05',
    medicines: [
      { name: 'Lisinopril 10mg', dosage: '1 tablet daily', duration: '30 days' },
      { name: 'Aspirin 75mg', dosage: '1 tablet daily', duration: '30 days' },
    ],
  },
  {
    id: 2,
    patientName: 'Mary Johnson',
    patientId: 'PT-1923',
    diagnosis: 'Type 2 Diabetes Mellitus',
    icdCode: 'E11',
    date: '2026-01-05',
    medicines: [
      { name: 'Metformin 850mg', dosage: '1 tablet twice daily', duration: '30 days' },
    ],
  },
  {
    id: 3,
    patientName: 'Robert Williams',
    patientId: 'PT-3051',
    diagnosis: 'Acute Upper Respiratory Infection',
    icdCode: 'J06.9',
    date: '2026-01-04',
    medicines: [
      { name: 'Amoxicillin 500mg', dosage: '1 tablet three times daily', duration: '7 days' },
      { name: 'Cough Syrup 100ml', dosage: '10ml three times daily', duration: '7 days' },
    ],
  },
  {
    id: 4,
    patientName: 'Sarah Davis',
    patientId: 'PT-4129',
    diagnosis: 'Gastroesophageal Reflux Disease',
    icdCode: 'K21.9',
    date: '2026-01-04',
    medicines: [
      { name: 'Omeprazole 20mg', dosage: '1 capsule daily', duration: '30 days' },
    ],
  },
];

export function PharmacyManagement() {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription>(
    prescriptionsData[0]
  );
  const [searchTerm, setSearchTerm] = useState('');

  const getStockStatus = (quantity: number, minQuantity: number) => {
    const percentage = (quantity / minQuantity) * 100;
    if (percentage < 20) return { label: 'Critical', color: '#EF4444', bgcolor: '#FEE2E2' };
    if (percentage < 50) return { label: 'Low', color: '#F59E0B', bgcolor: '#FEF3C7' };
    return { label: 'Good', color: '#10B981', bgcolor: '#D1FAE5' };
  };

  const filteredMedicines = medicinesData.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
        Pharmacy & Prescription Management
      </Typography>

      {/* Inventory Section */}
      <Card
        elevation={0}
        sx={{
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          mb: 3,
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
              Medicine Inventory
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mt: 2 }}
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
                  Drug Name
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Batch No
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Unit
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Quantity in Stock
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '13px' }}>
                  Expiry Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMedicines.map((medicine) => {
                const status = getStockStatus(medicine.quantity, medicine.minQuantity);
                return (
                  <TableRow
                    key={medicine.id}
                    sx={{
                      '&:hover': {
                        bgcolor: '#F9FAFB',
                      },
                    }}
                  >
                    <TableCell>
                      <Typography sx={{ fontWeight: 500, color: '#111827' }}>
                        {medicine.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        {medicine.batchNo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        {medicine.unit}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {medicine.quantity < medicine.minQuantity && (
                          <Warning sx={{ fontSize: 18, color: status.color }} />
                        )}
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: medicine.quantity < medicine.minQuantity ? status.color : '#111827',
                          }}
                        >
                          {medicine.quantity}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                          / {medicine.minQuantity}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={status.label}
                        size="small"
                        sx={{
                          bgcolor: status.bgcolor,
                          color: status.color,
                          fontWeight: 600,
                          fontSize: '12px',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        {medicine.expiryDate}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Prescription View - Split Screen */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              height: '600px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                Prescriptions
              </Typography>
            </Box>
            <List sx={{ overflow: 'auto', flex: 1 }}>
              {prescriptionsData.map((prescription, index) => (
                <React.Fragment key={prescription.id}>
                  <ListItemButton
                    selected={selectedPrescription.id === prescription.id}
                    onClick={() => setSelectedPrescription(prescription)}
                    sx={{
                      px: 3,
                      py: 2,
                      '&.Mui-selected': {
                        bgcolor: '#E3F2FD',
                        borderLeft: '3px solid #1976D2',
                        '&:hover': {
                          bgcolor: '#BBDEFB',
                        },
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                          {prescription.patientName}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ color: '#6B7280' }}>
                            ID: {prescription.patientId}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                            {prescription.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                  {index < prescriptionsData.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              height: '600px',
              overflow: 'auto',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 1 }}>
                Prescription Details
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                {selectedPrescription.date}
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
              {/* Patient Info */}
              <Box sx={{ mb: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: '8px' }}>
                <Typography variant="subtitle2" sx={{ color: '#6B7280', mb: 1 }}>
                  Patient Information
                </Typography>
                <Typography sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                  {selectedPrescription.patientName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>
                  Patient ID: {selectedPrescription.patientId}
                </Typography>
              </Box>

              {/* Diagnosis */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: '#6B7280', mb: 1 }}>
                  Diagnosis
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#FEF3C7',
                    borderRadius: '8px',
                    border: '1px solid #FDE047',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                    {selectedPrescription.diagnosis}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    ICD-10 Code: {selectedPrescription.icdCode}
                  </Typography>
                </Box>
              </Box>

              {/* Medicines */}
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#6B7280', mb: 2 }}>
                  Prescribed Medicines
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {selectedPrescription.medicines.map((medicine, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        bgcolor: 'white',
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1 }}>
                        {medicine.name}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                            Dosage
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#111827', fontWeight: 500 }}>
                            {medicine.dosage}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                            Duration
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#111827', fontWeight: 500 }}>
                            {medicine.duration}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
