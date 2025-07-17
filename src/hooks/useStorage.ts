import { useState, useEffect } from 'react';
import { BlockedSitesData } from '../types';

export function useBlockedSites() {
  const [blockedSites, setBlockedSites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlockedSites = async () => {
    try {
      const data = await chrome.storage.sync.get('blockedSites') as BlockedSitesData;
      setBlockedSites(data.blockedSites || []);
    } catch (error) {
      console.error('Error fetching blocked sites:', error);
      setBlockedSites([]);
    } finally {
      setLoading(false);
    }
  };

  const addBlockedSite = async (site: string) => {
    try {
      const currentSites = [...blockedSites];
      if (!currentSites.includes(site)) {
        currentSites.push(site);
        await chrome.storage.sync.set({ blockedSites: currentSites });
        setBlockedSites(currentSites);
      }
    } catch (error) {
      console.error('Error adding blocked site:', error);
    }
  };

  const removeBlockedSite = async (site: string) => {
    try {
      const updatedSites = blockedSites.filter(s => s !== site);
      await chrome.storage.sync.set({ blockedSites: updatedSites });
      setBlockedSites(updatedSites);
    } catch (error) {
      console.error('Error removing blocked site:', error);
    }
  };

  const clearAllBlockedSites = async () => {
    try {
      await chrome.storage.sync.clear();
      setBlockedSites([]);
    } catch (error) {
      console.error('Error clearing blocked sites:', error);
    }
  };

  useEffect(() => {
    fetchBlockedSites();
  }, []);

  return {
    blockedSites,
    loading,
    addBlockedSite,
    removeBlockedSite,
    clearAllBlockedSites,
    refetch: fetchBlockedSites,
  };
}