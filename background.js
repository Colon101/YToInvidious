let isRedirecting = true;

chrome.action.onClicked.addListener(function () {
  isRedirecting = !isRedirecting;
  chrome.storage.sync.set({ isRedirecting });
});

function extractYouTubeVideoId(url) {
  const regex = /[?&]v=([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.sync.get(["isRedirecting", "invidiousInstance"], function (data) {
    isRedirecting = data.isRedirecting === undefined ? true : data.isRedirecting;
    const selectedInstance = data.invidiousInstance || "vid.puffyan.us";

    if (!isRedirecting) return;

    if (tab.url && tab.url.includes('https://www.youtube.com/watch?')) {
      const redirectUrl = `${selectedInstance}/watch?v=${extractYouTubeVideoId(tab.url)}`;
      chrome.tabs.update(tabId, { url: redirectUrl });
    }
  });
});
