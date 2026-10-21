// src/App.jsx
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/common/Toast';
import { MatchComparisonModal } from './components/match/MatchComparisonModal';
import { InAppChatModal } from './components/chat/InAppChatModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportLostPage } from './pages/ReportLostPage';
import { ReportFoundPage } from './pages/ReportFoundPage';
import { SearchPage } from './pages/SearchPage';
import { ItemDetailsPage } from './pages/ItemDetailsPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { VrInspectorPage } from './pages/VrInspectorPage';

const MainContent = () => {
  const { currentView, isLoggedIn } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'report-lost':
        return <ReportLostPage />;
      case 'report-found':
        return <ReportFoundPage />;
      case 'search':
        return <SearchPage />;
      case 'item-details':
        return <ItemDetailsPage />;
      case 'vr-inspector':
        return <VrInspectorPage />;
      case 'my-reports':
        return <MyReportsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <LandingPage />;
    }
  };

  const isPublicPage = currentView === 'landing' || currentView === 'login';

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <Header />

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Desktop Navigation Sidebar (Only when logged in inside app) */}
        {isLoggedIn && !isPublicPage && (
          <div className="desktop-sidebar-container">
            <Sidebar />
          </div>
        )}

        {/* Main View Area */}
        <main className="main-content" style={{ marginLeft: isLoggedIn && !isPublicPage ? undefined : 0 }}>
          <div className="page-wrapper">{renderView()}</div>
        </main>
      </div>

      {/* Mobile Navigation Bar (Only when logged in inside app) */}
      {isLoggedIn && !isPublicPage && (
        <div className="mobile-nav-container">
          <BottomNav />
        </div>
      )}

      {/* Floating Modals & Toast Feedback */}
      <Toast />
      <MatchComparisonModal />
      <InAppChatModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
