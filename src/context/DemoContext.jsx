// src/context/DemoContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useApp } from './AppContext';
import confetti from 'canvas-confetti';

const DemoContext = createContext();

export const DEMO_STEPS = [
  { id: 1, title: '1. Welcome Landing', desc: 'Explore campus-focused welcome screen and value proposition' },
  { id: 2, title: '2. Login as Anushka', desc: 'Mock campus authentication with privacy reassurance' },
  { id: 3, title: '3. Student Dashboard', desc: 'Overview of active reports, quick actions, and recovery stats' },
  { id: 4, title: '4. Report Lost Item (Step 1)', desc: 'Guided multi-step wizard: Item Category selection' },
  { id: 5, title: '5. Item Description (Step 2)', desc: 'Enter item brand, color, and distinguishing features' },
  { id: 6, title: '6. Location & Date (Step 3)', desc: 'Select campus location (Central Library) and time' },
  { id: 7, title: '7. Photo Upload (Step 4)', desc: 'Drag-and-drop image preview with validation' },
  { id: 8, title: '8. Review & Confirm (Step 5)', desc: 'Error prevention review summary before submission' },
  { id: 9, title: '9. Submission Success', desc: 'Generated Report #FI-2048 with reassurance feedback' },
  { id: 10, title: '10. Search & Discovery', desc: 'Filter lost & found reports with category and location tags' },
  { id: 11, title: '11. Match Notification', desc: 'Interactive alert: Potential match found near Central Library' },
  { id: 12, title: '12. Side-by-Side Comparison', desc: 'UX feature: Compare lost item vs found report side-by-side' },
  { id: 13, title: '13. Secure Contact Finder', desc: 'In-app chat simulation without exposing personal phone/email' },
  { id: 14, title: '14. Finder Reply Simulation', desc: 'Receive response: "ID card handed over to Library Desk"' },
  { id: 15, title: '15. Status Timeline Tracking', desc: 'Visual timeline updates: Searching → Match → Contacting' },
  { id: 16, title: '16. Safety Confirmation', desc: 'Confirm item ownership before resolving report' },
  { id: 17, title: '17. Item Recovered! 🎉', desc: 'Celebratory resolution confetti and status completion' },
];

export const DemoProvider = ({ children }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDemoBarExpanded, setIsDemoBarExpanded] = useState(true);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  const {
    setCurrentView,
    setIsLoggedIn,
    setMatchComparisonModal,
    reports,
    setChatModal,
    markAsRecovered,
    addToast,
    navigateToDetails,
  } = useApp();

  const executeStep = (stepNumber) => {
    setCurrentStepIndex(stepNumber - 1);
    const step = DEMO_STEPS[stepNumber - 1];
    addToast(`Executing Demo Step ${stepNumber}: ${step.title}`, 'info');

    switch (stepNumber) {
      case 1:
        setIsLoggedIn(false);
        setCurrentView('landing');
        break;
      case 2:
        setIsLoggedIn(true);
        setCurrentView('login');
        break;
      case 3:
        setIsLoggedIn(true);
        setCurrentView('dashboard');
        break;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        setIsLoggedIn(true);
        setCurrentView('report-lost');
        break;
      case 10:
        setIsLoggedIn(true);
        setCurrentView('search');
        break;
      case 11:
        setIsLoggedIn(true);
        setCurrentView('dashboard');
        break;
      case 12:
        setIsLoggedIn(true);
        const lost = reports.find((r) => r.id === 'FI-2048');
        const found = reports.find((r) => r.id === 'FI-2049');
        setMatchComparisonModal({ isOpen: true, lostItem: lost, foundItem: found });
        break;
      case 13:
        setIsLoggedIn(true);
        setMatchComparisonModal({ isOpen: false, lostItem: null, foundItem: null });
        setChatModal({ isOpen: true, reportId: 'FI-2048', finder: { name: 'Rahul Sharma' } });
        break;
      case 14:
        setIsLoggedIn(true);
        setChatModal({ isOpen: true, reportId: 'FI-2048', finder: { name: 'Rahul Sharma' } });
        addToast('Rahul Sharma: "Hey Anushka, I handed over your ID card to Mr. Patil at the Library Counter."', 'success');
        break;
      case 15:
        setIsLoggedIn(true);
        setChatModal({ isOpen: false, reportId: null, finder: null });
        navigateToDetails('FI-2048');
        break;
      case 16:
        setIsLoggedIn(true);
        navigateToDetails('FI-2048');
        break;
      case 17:
        setIsLoggedIn(true);
        navigateToDetails('FI-2048');
        markAsRecovered('FI-2048');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        break;
      default:
        break;
    }
  };

  const nextStep = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      executeStep(currentStepIndex + 2);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      executeStep(currentStepIndex);
    }
  };

  return (
    <DemoContext.Provider
      value={{
        currentStep: DEMO_STEPS[currentStepIndex],
        currentStepIndex,
        totalSteps: DEMO_STEPS.length,
        executeStep,
        nextStep,
        prevStep,
        isDemoBarExpanded,
        setIsDemoBarExpanded,
        isPlayingAuto,
        setIsPlayingAuto,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
