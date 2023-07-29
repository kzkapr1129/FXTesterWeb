import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from '../components/page/HomePage';
import { LoginPage } from '../components/page/LoginPage';
import { UploadPage } from '../components/page/UploadPage';
import { VerificationPage } from '../components/page/VerificationPage';
import { NotFoundPage } from '../components/page/NotFoundPage';
import { DashboardLayout } from '../components/template/DashboardLayout';
import { RouteAuthGuard } from './RouteAuthGuard';
import { Path } from '../common/defines';

export const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.LOGIN} element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<RouteAuthGuard element={<HomePage />} />} />
          <Route
            path={Path.UPLOAD}
            element={<RouteAuthGuard element={<UploadPage />} />}
          />
          <Route
            path={Path.VERIFICATION}
            element={<RouteAuthGuard element={<VerificationPage />} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
