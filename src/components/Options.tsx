import { useBlockedSites } from '../hooks/useStorage';

export default function Options() {
  const { blockedSites, removeBlockedSite, clearAllBlockedSites, loading } = useBlockedSites();

  const handleDeleteSite = async (site: string) => {
    await removeBlockedSite(site);
  };

  const handleClearAll = async () => {
    await clearAllBlockedSites();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="relative text-center mb-12">
          <div className="absolute top-0 left-0 text-sm text-gray-500">
            Version - 0.1.0
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Focused Extension
          </h1>
          <h2 className="text-lg text-gray-600">
            Block sites and get working!
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Blocked Sites Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-center mb-6">
              Unblock currently blocked websites
            </h3>
            <hr className="mb-6" />

            {blockedSites.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                <p>You'll be able to track your blocked websites here!</p>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {blockedSites.map((site) => (
                  <div key={site} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <span className="text-gray-800 flex-1">{site}</span>
                    <button
                      onClick={() => handleDeleteSite(site)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors ml-3"
                      aria-label={`Delete ${site}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {blockedSites.length > 0 && (
              <div className="text-center">
                <button
                  onClick={handleClearAll}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition-colors"
                >
                  Reset Blocked Sites List
                </button>
              </div>
            )}
          </div>

          {/* Pomodoro Timer Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-center mb-6">
              Pomodoro Timer Settings
            </h3>
            <hr className="mb-6" />
            <div className="text-center text-gray-600 py-8">
              <p>Feature coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}