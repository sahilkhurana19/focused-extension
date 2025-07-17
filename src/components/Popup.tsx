import { useCurrentTab } from '../hooks/useCurrentTab';
import { useBlockedSites } from '../hooks/useStorage';

export default function Popup() {
  const { currentTab, hostname, loading: tabLoading } = useCurrentTab();
  const { blockedSites, addBlockedSite, loading: sitesLoading } = useBlockedSites();

  const isBlocked = hostname && blockedSites.includes(hostname);
  const loading = tabLoading || sitesLoading;

  const handleBlockSite = async () => {
    if (hostname) {
      await addBlockedSite(hostname);
      // Redirect to blocked page
      const blockedPageUrl = chrome.runtime.getURL('blocked.html');
      if (currentTab?.id) {
        await chrome.tabs.update(currentTab.id, { url: blockedPageUrl });
      }
    }
  };

  const handleOpenSettings = () => {
    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL('options.html')
    });
  };

  if (loading) {
    return (
      <div className="w-80 p-8 bg-white">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-80 p-8 bg-white border-4 border-blue-600">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleOpenSettings}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Settings"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Focused!
        </h1>
        <h2 className="text-sm text-gray-600">
          Block sites and get working
        </h2>
      </div>

      <div className="text-center">
        {isBlocked ? (
          <button
            disabled
            className="bg-gray-400 text-white px-6 py-2 rounded cursor-not-allowed"
          >
            The website is already blocked!
          </button>
        ) : (
          <button
            onClick={handleBlockSite}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
          >
            Block This Site!
          </button>
        )}
      </div>
    </div>
  );
}