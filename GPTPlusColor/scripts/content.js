// Assuming tabId is available or obtained from context, e.g., chrome.tabs.query
let currentTabId = null; // Placeholder, ensure to set this with the actual tab ID

// Function to inject CSS file
function injectCSS(fileName) {
    chrome.scripting.insertCSS({
        target: {tabId: currentTabId},
        files: [fileName] // Use the fileName parameter
    });
}

// Function to remove injected CSS file
async function removeInjectedCSS(fileName) {
    await chrome.scripting.removeCSS({
        target: {tabId: currentTabId},
        files: [fileName] // Use the fileName parameter
    });
}

// Listen for changes in storage (user preferences)
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'preferredStyle' && newValue) {
            // Dynamic file path based on newValue
            injectCSS(`styles/${newValue}.css`);
            if (oldValue) {
                // Remove the old CSS file if it exists
                removeInjectedCSS(`styles/${oldValue}.css`);
            }
        }
    }
});

// Initial setup: check storage for existing preferences and apply them
chrome.storage.sync.get(['preferredStyle'], function(result) {
    if (result.preferredStyle) {
        // Inject the preferred style if it exists in storage
        injectCSS(`styles/${result.preferredStyle}.css`);
    } else {
        // Inject 'styles/style.css' by default if no user preference is stored
        injectCSS('styles/style.css');
    }
});
