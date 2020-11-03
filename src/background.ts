import { blockedList } from './utils/blocked-list';
import { visitedList } from './utils/visited-list';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const url = new URL(tab.url);
    if (blockedList.contains(url.hostname)) {
        chrome.tabs.remove(tabId, () => {
            if (!chrome.runtime.lastError) {
                chrome.notifications.create({
                    message: `Killed ${url}`,
                    title: 'Site Killer',
                    iconUrl: 'icon.png',
                    type: 'basic'
                });
            }
        });
    } else {
        visitedList.add(url);
    }
});
