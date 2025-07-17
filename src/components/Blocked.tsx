
export default function Blocked() {
  const handleOpenSettings = () => {
    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL('options.html')
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex flex-col">
      {/* Settings Button */}
      <div className="p-6">
        <button
          onClick={handleOpenSettings}
          className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded shadow transition-colors"
        >
          Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-black text-white mb-8 tracking-wider transform -rotate-2">
            BLOCKED!
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-md mx-auto">
            This website is blocked to help you stay focused. You can manage your blocked sites in the settings.
          </p>
          <button
            onClick={handleOpenSettings}
            className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Manage Blocked Sites
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-white/60 text-sm">
          Stay focused and achieve your goals!
        </p>
      </div>
    </div>
  );
}