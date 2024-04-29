// This event is fired when the extension is first installed,
// when the extension is updated to a new version,
// and when Chrome is updated to a new version.
chrome.runtime.onInstalled.addListener(function(details) {
    console.log('Extension installed or updated', details.reason);
  });
  
  // Example of using Storage API to set default settings
  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: 'blue', likesColor: true}, function() {
      console.log("Default settings saved.");
    });
  });
  
  // Listen for messages sent from other parts of the extension.
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // Process request or send a response
      sendResponse({result: "response from background"});
      // Return true to indicate you wish to send a response asynchronously
      return true;
    }
  );
  
  