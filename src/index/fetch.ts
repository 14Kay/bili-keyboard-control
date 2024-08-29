const scriptNode = document.createElement('script');
scriptNode.src = chrome.runtime.getURL('js/fetch_injected.js');
document.documentElement.appendChild(scriptNode);