document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggle");
  const invidiousInstance = document.getElementById("invidiousInstance");
  const saveButton = document.getElementById("saveInstance");

  chrome.storage.sync.get(["isRedirecting", "invidiousInstance"], function (data) {
    toggle.checked = data.isRedirecting === undefined ? true : data.isRedirecting;
    invidiousInstance.value = data.invidiousInstance || "";
  });

  toggle.addEventListener("change", function () {
    chrome.storage.sync.set({ isRedirecting: toggle.checked });
  });

  saveButton.addEventListener("click", function () {
    chrome.storage.sync.set({ invidiousInstance: invidiousInstance.value });
  });
});
