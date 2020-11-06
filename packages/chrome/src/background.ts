import { blockedList, visitedList } from 'site-killer-common';

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const url = new URL(tab.url);
    if (blockedList.contains(url.hostname)) {
        await new Promise(resolve =>
            chrome.tabs.remove(tabId, resolve));

        if (!chrome.runtime.lastError) {
            await new Promise(resolve =>
                chrome.notifications.create({
                    message: `Killed ${url}`,
                    title: 'Site Killer',
                    iconUrl: 'icon.png',
                    type: 'basic'
                }, resolve));
        }
    } else {
        visitedList.add(url);
    }
});
