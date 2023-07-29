import React from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'red' }}>
      <Outlet />
    </div>
  );
};
