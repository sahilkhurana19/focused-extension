import { useState, useEffect } from 'react';
import { ChromeTab } from '../types';

export function useCurrentTab() {
  const [currentTab, setCurrentTab] = useState<ChromeTab | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        setCurrentTab(tab);
      } catch (error) {
        console.error('Error getting current tab:', error);
        setCurrentTab(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentTab();
  }, []);

  const getHostFromUrl = (url?: string): string | null => {
    if (!url) return null;
    try {
      return new URL(url).host;
    } catch {
      return null;
    }
  };

  return {
    currentTab,
    loading,
    hostname: getHostFromUrl(currentTab?.url),
  };
}