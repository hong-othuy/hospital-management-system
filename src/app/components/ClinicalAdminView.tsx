import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  List,
  ListItemButton,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Autocomplete,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

interface Patient {
  id: number;
  name: string;
  time: string;
  status: 'Waiting' | 'Examining' | 'Done';
}

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const patientQueue: Patient[] = [
  { id: 1, name: 'John Smith', time: '09:00 AM', status: 'Examining' },
  { id: 2, name: 'Mary Johnson', time: '09:15 AM', status: 'Waiting' },
  { id: 3, name: 'Robert Williams', time: '09:30 AM', status: 'Waiting' },
  { id: 4, name: 'Sarah Davis', time: '09:45 AM', status: 'Waiting' },
  { id: 5, name: 'Michael Brown', time: '10:00 AM', status: 'Waiting' },
  { id: 6, name: 'Jennifer Wilson', time: '10:15 AM', status: 'Waiting' },
];

const icdCodes = [
  { code: 'I10', label: 'I10 - Essential (primary) hypertension' },
  { code: 'E11', label: 'E11 - Type 2 diabetes mellitus' },
  { code: 'J06.9', label: 'J06.9 - Acute upper respiratory infection' },
  { code: 'K21.9', label: 'K21.9 - Gastro-esophageal reflux disease' },
  { code: 'M79.3', label: 'M79.3 - Panniculitis, unspecified' },
  { code: 'R50.9', label: 'R50.9 - Fever, unspecified' },
];

const availableMedicines = [
  'Amoxicillin 500mg',
  'Ibuprofen 400mg',
  'Metformin 850mg',
  'Lisinopril 10mg',
  'Omeprazole 20mg',
  'Aspirin 75mg',
  'Paracetamol 500mg',
  'Vitamin D3 1000IU',
];

export function ClinicalAdminView() {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(patientQueue[0]);
  const [vitals, setVitals] = useState({
    hr: '72',
    bp: '120/80',
    temp: '98.6',
    weight: '70',
    height: '170',
  });
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [medicalHistory, setMedicalHistory] = useState('');
  const [prescribedMedicines, setPrescribedMedicines] = useState<Medicine[]>([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
  });

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dosage && newMedicine.frequency && newMedicine.duration) {
      setPrescribedMedicines([
        ...prescribedMedicines,
        { id: Date.now(), ...newMedicine },
      ]);
      setNewMedicine({ name: '', dosage: '', frequency: '', duration: '' });
    }
  };

  const handleDeleteMedicine = (id: number) => {
    setPrescribedMedicines(prescribedMedicines.filter((med) => med.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Examining':
        return { bgcolor: '#DBEAFE', color: '#1E40AF' };
      case 'Waiting':
        return { bgcolor: '#FEF3C7', color: '#92400E' };
      case 'Done':
        return { bgcolor: '#D1FAE5', color: '#065F46' };
      default:
        return { bgcolor: '#F3F4F6', color: '#6B7280' };
    }
  };

  const calculateBMI = () => {
    const weight = parseFloat(vitals.weight);
    const height = parseFloat(vitals.height) / 100; // convert cm to m
    if (weight && height) {
      const bmi = (weight / (height * height)).toFixed(1);
      return bmi;
    }
    return '-';
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
        Clinical Admin View (Doctor Interface)
      </Typography>

      <Grid container spacing={3}>
        {/* Column 1: Patient Queue */}
        <Grid item xs={12} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              height: '800px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
              <Typography sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                Patient Queue
              </Typography>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>
                {patientQueue.length} patients today
              </Typography>
            </Box>
            <List sx={{ overflow: 'auto', flex: 1, p: 1 }}>
              {patientQueue.map((patient) => {
                const statusColor = getStatusColor(patient.status);
                return (
                  <ListItemButton
                    key={patient.id}
                    selected={selectedPatient.id === patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    sx={{
                      borderRadius: '8px',
                      mb: 1,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      '&.Mui-selected': {
                        bgcolor: '#E3F2FD',
                        borderLeft: '3px solid #1976D2',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        width: '100%',
                        mb: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: '#1976D2',
                          fontSize: '13px',
                        }}
                      >
                        {patient.name.split(' ').map((n) => n[0]).join('')}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}
                        >
                          {patient.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280' }}>
                          {patient.time}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={patient.status}
                      size="small"
                      sx={{
                        ...statusColor,
                        fontWeight: 600,
                        fontSize: '11px',
                        height: '22px',
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Card>
        </Grid>

        {/* Column 2: Patient Info & Vitals */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Personal Info */}
            <Card
              elevation={0}
              sx={{
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
              }}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
                <Typography sx={{ fontWeight: 600, color: '#111827' }}>
                  Personal Information
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      value={selectedPatient.name}
                      disabled
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Age"
                      fullWidth
                      value="45"
                      disabled
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: '#E3F2FD',
                        borderRadius: '8px',
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#1976D2', display: 'block' }}>
                        BMI
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976D2' }}>
                        {calculateBMI()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>

            {/* Vital Signs */}
            <Card
              elevation={0}
              sx={{
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
              }}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
                <Typography sx={{ fontWeight: 600, color: '#111827' }}>
                  Vital Signs
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Heart Rate (bpm)"
                      fullWidth
                      value={vitals.hr}
                      onChange={(e) => setVitals({ ...vitals, hr: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Blood Pressure"
                      fullWidth
                      value={vitals.bp}
                      onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Temperature (°F)"
                      fullWidth
                      value={vitals.temp}
                      onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Weight (kg)"
                      fullWidth
                      value={vitals.weight}
                      onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Height (cm)"
                      fullWidth
                      value={vitals.height}
                      onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
        </Grid>

        {/* Column 3: Examination */}
        <Grid item xs={12} md={5}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              height: '800px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
              <Typography sx={{ fontWeight: 600, color: '#111827' }}>
                Examination & Prescription
              </Typography>
            </Box>
            <Box sx={{ p: 3, overflow: 'auto', flex: 1 }}>
              {/* Diagnosis Input */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280' }}>
                  Diagnosis (ICD-10)
                </Typography>
                <Autocomplete
                  options={icdCodes}
                  getOptionLabel={(option) => option.label}
                  value={icdCodes.find((code) => code.code === diagnosis) || null}
                  onChange={(event, newValue) => {
                    setDiagnosis(newValue ? newValue.code : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search ICD-10 code..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Medical History */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280' }}>
                  Medical History & Notes
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter medical history, symptoms, examination findings..."
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>

              {/* Prescribe Medicine */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280' }}>
                  Prescribe Medicine
                </Typography>

                <Grid container spacing={1.5} sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={availableMedicines}
                      value={newMedicine.name}
                      onChange={(event, newValue) => {
                        setNewMedicine({ ...newMedicine, name: newValue || '' });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Medicine name"
                          size="small"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Dosage"
                      value={newMedicine.dosage}
                      onChange={(e) =>
                        setNewMedicine({ ...newMedicine, dosage: e.target.value })
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Frequency"
                      value={newMedicine.frequency}
                      onChange={(e) =>
                        setNewMedicine({ ...newMedicine, frequency: e.target.value })
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Duration"
                      value={newMedicine.duration}
                      onChange={(e) =>
                        setNewMedicine({ ...newMedicine, duration: e.target.value })
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleAddMedicine}
                      startIcon={<Add />}
                      sx={{
                        bgcolor: '#1976D2',
                        borderRadius: '8px',
                        textTransform: 'none',
                        height: '40px',
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>

                {/* Medicine Table */}
                {prescribedMedicines.length > 0 && (
                  <TableContainer
                    sx={{
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      mb: 2,
                    }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, fontSize: '12px' }}>
                            Medicine
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '12px' }}>
                            Dosage
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '12px' }}>
                            Frequency
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '12px' }}>
                            Duration
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {prescribedMedicines.map((medicine) => (
                          <TableRow key={medicine.id}>
                            <TableCell sx={{ fontSize: '13px' }}>{medicine.name}</TableCell>
                            <TableCell sx={{ fontSize: '13px' }}>{medicine.dosage}</TableCell>
                            <TableCell sx={{ fontSize: '13px' }}>{medicine.frequency}</TableCell>
                            <TableCell sx={{ fontSize: '13px' }}>{medicine.duration}</TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteMedicine(medicine.id)}
                                sx={{
                                  color: '#EF4444',
                                  '&:hover': { bgcolor: '#FEE2E2' },
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                p: 3,
                borderTop: '1px solid #E5E7EB',
                display: 'flex',
                gap: 2,
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  borderColor: '#E5E7EB',
                  color: '#6B7280',
                }}
              >
                Save Draft
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  bgcolor: '#1976D2',
                  '&:hover': {
                    bgcolor: '#1565C0',
                  },
                }}
              >
                Complete & Next Patient
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
