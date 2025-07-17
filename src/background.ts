import { BlockedSitesData } from './types';

let blockedSites: string[] = [];

// Initialize extension on startup
chrome.runtime.onStartup.addListener(() => {
  fetchBlockedSitesList();
});

chrome.runtime.onInstalled.addListener(() => {
  fetchBlockedSitesList();
});

// Monitor tab updates for blocking
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  await fetchBlockedSitesList();
  
  if (changeInfo && changeInfo.status === "loading" && tab.url) {
    try {
      const url = new URL(tab.url);
      if (blockedSites && blockedSites.includes(url.host)) {
        // Get the extension's URL for the blocked page
        const blockedPageUrl = chrome.runtime.getURL('blocked.html');
        await chrome.tabs.update(tabId, { url: blockedPageUrl });
      }
    } catch (error) {
      console.error('Error processing URL:', error);
    }
  }
});

async function fetchBlockedSitesList(): Promise<void> {
  try {
    const data = await chrome.storage.sync.get('blockedSites') as BlockedSitesData;
    
    if (!data.blockedSites) {
      await chrome.storage.sync.set({ 'blockedSites': [] });
      console.log("Initialized blocked sites memory");
      blockedSites = [];
    } else {
      blockedSites = data.blockedSites;
      console.log('Current blocked sites:', blockedSites);
    }
  } catch (error) {
    console.error('Error fetching blocked sites:', error);
    blockedSites = [];
  }
}