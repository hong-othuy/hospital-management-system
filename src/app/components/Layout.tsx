import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Breadcrumbs,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard,
  LocalHospital,
  People,
  Medication,
  Assessment,
  Settings,
  Search,
  Notifications,
  Menu as MenuIcon,
} from '@mui/icons-material';

const drawerWidth = 260;

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Layout({ children, currentPage, breadcrumbs = [] }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, id: 'dashboard' },
    { text: 'Doctor Management', icon: <LocalHospital />, id: 'doctors' },
    { text: 'Patient Records', icon: <People />, id: 'patients' },
    { text: 'Pharmacy & Inventory', icon: <Medication />, id: 'pharmacy' },
    { text: 'Reports', icon: <Assessment />, id: 'reports' },
    { text: 'Settings', icon: <Settings />, id: 'settings' },
  ];

  const drawer = (
    <Box>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #1976D2 0%, #007AFF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <LocalHospital />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
          MediCare HMS
        </Typography>
      </Box>
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={currentPage === item.id}
            sx={{
              borderRadius: '8px',
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: '#E3F2FD',
                color: '#1976D2',
                '& .MuiListItemIcon-root': {
                  color: '#1976D2',
                },
                '&:hover': {
                  backgroundColor: '#BBDEFB',
                },
              },
              '&:hover': {
                backgroundColor: '#F3F4F6',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#6B7280' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: currentPage === item.id ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F4F6F8', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#111827' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Breadcrumbs */}
          <Box sx={{ flexGrow: 1 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                href="#"
                sx={{ fontSize: '14px', color: '#6B7280' }}
              >
                Home
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: '14px',
                    color: index === breadcrumbs.length - 1 ? '#111827' : '#6B7280',
                    fontWeight: index === breadcrumbs.length - 1 ? 500 : 400,
                  }}
                >
                  {crumb.label}
                </Typography>
              ))}
            </Breadcrumbs>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: '8px',
              backgroundColor: '#F3F4F6',
              '&:hover': {
                backgroundColor: '#E5E7EB',
              },
              marginRight: 2,
              width: 'auto',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              px: 2,
            }}
          >
            <Search sx={{ color: '#6B7280', mr: 1 }} />
            <InputBase
              placeholder="Search patients, doctors..."
              sx={{
                color: '#111827',
                width: '300px',
                '& input': {
                  padding: '8px 0',
                  fontSize: '14px',
                },
              }}
            />
          </Box>

          {/* Notifications */}
          <IconButton color="inherit" sx={{ color: '#6B7280' }}>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* User Profile */}
          <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#1976D2',
              }}
            >
              A
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
              borderRight: '1px solid #E5E7EB',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
