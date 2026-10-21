// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_USER, MOCK_REPORTS, INITIAL_NOTIFICATIONS, INITIAL_MESSAGES } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('landing');
  const [activeItemId, setActiveItemId] = useState('LI-1024');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(CURRENT_USER);

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('findit_reports');
    return saved ? JSON.parse(saved) : MOCK_REPORTS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('findit_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('findit_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [matchComparisonModal, setMatchComparisonModal] = useState({ isOpen: false, lostItem: null, foundItem: null });
  const [chatModal, setChatModal] = useState({ isOpen: false, reportId: null, finder: null });
  const [toasts, setToasts] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedLocationFilter, setSelectedLocationFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    localStorage.setItem('findit_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('findit_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('findit_messages', JSON.stringify(messages));
  }, [messages]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogin = (credentials) => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    addToast('Welcome back, Anushka! Connected to FindIt Campus network.', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
    addToast('Signed out safely.', 'info');
  };

  const createReport = (newReportData) => {
    const prefix = newReportData.type === 'lost' ? 'LI' : 'FI';
    const newId = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReport = {
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'Searching',
      statusStep: 2,
      ...newReportData,
      reporter: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        year: user.year,
        isCurrentUser: true,
      },
    };

    setReports((prev) => [newReport, ...prev]);

    const potentialMatch = reports.find(
      (r) =>
        r.type !== newReport.type &&
        r.category === newReport.category &&
        r.location === newReport.location
    );

    if (potentialMatch) {
      newReport.status = 'Potential Match';
      newReport.statusStep = 3;
      newReport.potentialMatchId = potentialMatch.id;
      newReport.matchConfidence = 94;

      setReports((prev) =>
        prev.map((item) =>
          item.id === potentialMatch.id
            ? { ...item, status: 'Potential Match', potentialMatchId: newReport.id, matchConfidence: 94 }
            : item
        )
      );

      const newNotif = {
        id: `NOTIF-${Date.now()}`,
        title: 'Potential Match Found! 🔔',
        message: `A matching report for your ${newReport.categoryLabel} was found on campus.`,
        type: 'match',
        timestamp: 'Just now',
        read: false,
        reportId: newReport.id,
        targetMatchId: potentialMatch.id,
        actionText: 'Review Match',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    addToast(`Report #${newId} published successfully!`, 'success');
    return newReport;
  };

  const updateReportStatus = (reportId, newStatus, newStep) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: newStatus, statusStep: newStep } : r))
    );
  };

  const markAsRecovered = (reportId) => {
    updateReportStatus(reportId, 'Resolved', 5);
    
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: 'Item Recovered & Closed 🎉',
      message: `Report #${reportId} has been successfully resolved.`,
      type: 'status',
      timestamp: 'Just now',
      read: false,
      reportId: reportId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Append system message into chat if active
    const systemMsg = {
      id: `MSG-${Date.now()}`,
      senderId: 'SYSTEM',
      senderName: 'FindIt System',
      text: `🎉 Item #${reportId} has been confirmed as successfully retrieved and recovered!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: true,
    };

    setMessages((prev) => ({
      ...prev,
      [reportId]: [...(prev[reportId] || []), systemMsg],
    }));

    addToast(`Report #${reportId} marked as recovered! 🎉`, 'success');
  };

  // Enhanced Send Message with Simulated Finder Replies
  const sendMessage = (reportId, text) => {
    const userMsg = {
      id: `MSG-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFinder: false,
    };

    setMessages((prev) => ({
      ...prev,
      [reportId]: [...(prev[reportId] || []), userMsg],
    }));

    updateReportStatus(reportId, 'Finder Contacted', 4);
    addToast('Message sent securely.', 'info');

    // Simulate Finder Reply after 1.5 seconds
    setTimeout(() => {
      let replyText = "Hey Anushka! Yes, I found your item and handed it over to Mr. Patil at the Central Library desk so it stays safe.";

      const lower = text.toLowerCase();
      if (lower.includes('meet') || lower.includes('where') || lower.includes('pickup') || lower.includes('location')) {
        replyText = "We can meet near the Central Library front counter or security office anytime before 5 PM!";
      } else if (lower.includes('thank') || lower.includes('thanks')) {
        replyText = "You're very welcome! Happy to help a fellow student get their belongings back! 🎉";
      } else if (lower.includes('confirm') || lower.includes('id') || lower.includes('card')) {
        replyText = "Yes, the name on the ID card matches 'Anushka Mali' (SE AI&DS). You can collect it at the library desk.";
      }

      const finderReply = {
        id: `MSG-${Date.now() + 1}`,
        senderId: 'USR-204',
        senderName: 'Rahul Sharma',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFinder: true,
      };

      setMessages((prev) => ({
        ...prev,
        [reportId]: [...(prev[reportId] || []), finderReply],
      }));

      // Send notification toast
      addToast('Rahul Sharma: "' + replyText.substring(0, 45) + '..."', 'match');
    }, 1500);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read.', 'info');
  };

  const navigateToDetails = (id) => {
    setActiveItemId(id);
    setCurrentView('item-details');
  };

  const openVrInspector = (id) => {
    if (id) setActiveItemId(id);
    setCurrentView('vr-inspector');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeItemId,
        setActiveItemId,
        navigateToDetails,
        openVrInspector,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        reports,
        setReports,
        createReport,
        updateReportStatus,
        markAsRecovered,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        messages,
        sendMessage,
        matchComparisonModal,
        setMatchComparisonModal,
        chatModal,
        setChatModal,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        selectedTypeFilter,
        setSelectedTypeFilter,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedLocationFilter,
        setSelectedLocationFilter,
        viewMode,
        setViewMode,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
