import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Switch,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CategoryIcon from '@mui/icons-material/Category';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Link from 'next/link';
import { useThemeMode } from '../../context/ThemeContext';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/' },
  { text: 'Products', icon: CategoryIcon, path: '/products' },
  { text: 'Warehouses', icon: WarehouseIcon, path: '/warehouses' },
  { text: 'Stock Levels', icon: InventoryIcon, path: '/stock' },
  { text: 'Transfers', icon: TransferWithinAStationIcon, path: '/transfers' },
  { text: 'Alerts', icon: NotificationsIcon, path: '/alerts' },
];

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleTheme } = useThemeMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand Section */}
      <Toolbar
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          minHeight: 64,
        }}
      >
        <InventoryIcon sx={{ mr: 1.5, fontSize: 28 }} />
        <Box>
          <Typography variant="h6" noWrap component="div" fontWeight={700}>
            GreenSupply Co
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Inventory System
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ px: 1, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: mode === 'dark' ? 'primary.contrastText' : 'primary.dark',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive 
                      ? (mode === 'dark' ? 'primary.contrastText' : 'primary.dark')
                      : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Theme Toggle Section */}
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            <Typography variant="body2">
              {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </Typography>
          </Box>
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              color="primary"
            />
          </Tooltip>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Footer */}
        <Typography variant="caption" color="text.secondary" display="block">
          Version 1.0.0
        </Typography>
        <Typography variant="caption" color="text.secondary">
          © 2026 GreenSupply Co
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar (Top bar for mobile) */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            GreenSupply Co
          </Typography>
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {/* Spacer for mobile app bar */}
        <Toolbar sx={{ display: { xs: 'block', md: 'none' } }} />
        
        {children}
      </Box>
    </Box>
  );
};

export default Layout;