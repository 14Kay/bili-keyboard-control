const listenerScriptNode = document.createElement('script');
listenerScriptNode.src = chrome.runtime.getURL('js/listener_injected.js');
document.documentElement.appendChild(listenerScriptNode);