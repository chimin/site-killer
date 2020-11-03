/// <reference path="../node_modules/web-ext-types/global/index.d.ts" />

import { blockedList, visitedList } from "site-killer-common";

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const url = new URL(tab.url);
    if (blockedList.contains(url.hostname)) {
        await browser.tabs.remove(tabId);
        await browser.notifications.create({
            message: `Killed ${url}`,
            title: 'Site Killer',
            iconUrl: 'icon.png',
            type: 'basic'
        });
    } else {
        visitedList.add(url);
    }
});
