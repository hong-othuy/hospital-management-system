import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './components/AdminDashboard';
import { DoctorManagement } from './components/DoctorManagement';
import { PharmacyManagement } from './components/PharmacyManagement';
import { VietnameseMedicalSystem } from './components/VietnameseMedicalSystem';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A0E3',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'doctors':
        return <DoctorManagement />;
      case 'pharmacy':
        return <PharmacyManagement />;
      case 'examination':
        return <VietnameseMedicalSystem />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage === 'examination' ? (
        <VietnameseMedicalSystem />
      ) : (
        <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
          {renderPage()}
        </AdminLayout>
      )}
    </ThemeProvider>
  );
}