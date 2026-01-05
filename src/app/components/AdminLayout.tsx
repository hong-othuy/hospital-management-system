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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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
  AccountCircle,
  CalendarMonth,
  MonitorHeart,
  Logout,
  PersonAdd,
} from '@mui/icons-material';

const drawerWidth = 260;

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function AdminLayout({ children, currentPage, onPageChange }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotifMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifMenuClose = () => {
    setNotifAnchorEl(null);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, id: 'dashboard' },
    { text: 'Quản lý Bác sĩ', icon: <LocalHospital />, id: 'doctors' },
    { text: 'Quản lý Bệnh nhân', icon: <People />, id: 'patients' },
    { text: 'Lịch hẹn', icon: <CalendarMonth />, id: 'appointments' },
    { text: 'Khám bệnh', icon: <MonitorHeart />, id: 'examination' },
    { text: 'Nhà thuốc', icon: <Medication />, id: 'pharmacy' },
    { text: 'Báo cáo', icon: <Assessment />, id: 'reports' },
    { text: 'Cài đặt', icon: <Settings />, id: 'settings' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00A0E3 0%, #0080C0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <LocalHospital sx={{ fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>
            MediCare
          </Typography>
          <Typography variant="caption" sx={{ color: '#666', fontSize: '11px' }}>
            Hospital Management
          </Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 2, py: 2, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={currentPage === item.id}
            onClick={() => onPageChange(item.id)}
            sx={{
              borderRadius: '10px',
              mb: 0.5,
              transition: 'all 0.2s',
              '&.Mui-selected': {
                backgroundColor: '#E3F2FD',
                color: '#00A0E3',
                '& .MuiListItemIcon-root': {
                  color: '#00A0E3',
                },
                '&:hover': {
                  backgroundColor: '#BBDEFB',
                },
              },
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#666' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: currentPage === item.id ? 600 : 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* User Info at Bottom */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#00A0E3',
            }}
          >
            A
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#1a1a1a' }}>
              Admin User
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
              Quản trị viên
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F5F7FA', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: '70px !important' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#1a1a1a' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Page Title */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
              {menuItems.find(item => item.id === currentPage)?.text || 'Dashboard'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              Chào mừng trở lại, Admin
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: '10px',
              backgroundColor: '#F5F7FA',
              '&:hover': {
                backgroundColor: '#EEF1F6',
              },
              marginRight: 2,
              width: 'auto',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              px: 2,
            }}
          >
            <Search sx={{ color: '#999', mr: 1 }} />
            <InputBase
              placeholder="Tìm kiếm bệnh nhân, bác sĩ..."
              sx={{
                color: '#1a1a1a',
                width: '320px',
                '& input': {
                  padding: '10px 0',
                  fontSize: '14px',
                },
              }}
            />
          </Box>

          {/* Notifications */}
          <IconButton
            color="inherit"
            sx={{ color: '#666' }}
            onClick={handleNotifMenuOpen}
          >
            <Badge badgeContent={5} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleNotifMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: 320,
                maxHeight: 400,
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>
                Thông báo
              </Typography>
            </Box>
            <MenuItem onClick={handleNotifMenuClose} sx={{ py: 1.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: '13px', mb: 0.5 }}>
                  Bệnh nhân mới đăng ký
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Nguyễn Văn A vừa đăng ký khám - 5 phút trước
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleNotifMenuClose} sx={{ py: 1.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: '13px', mb: 0.5 }}>
                  Thuốc sắp hết hạn
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Amoxicillin 500mg còn 20 viên - 1 giờ trước
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleNotifMenuClose} sx={{ py: 1.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: '13px', mb: 0.5 }}>
                  Lịch hẹn sắp tới
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  3 lịch hẹn vào chiều nay - 2 giờ trước
                </Typography>
              </Box>
            </MenuItem>
          </Menu>

          {/* User Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>
                Admin User
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '11px' }}>
                Quản trị viên
              </Typography>
            </Box>
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#00A0E3',
                }}
              >
                A
              </Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Hồ sơ cá nhân
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Cài đặt
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
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
              borderRight: '1px solid rgba(0,0,0,0.08)',
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
          mt: '70px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
