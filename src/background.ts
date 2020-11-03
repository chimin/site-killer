import { visitedList } from './utils/visited-list';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const url = new URL(tab.url);
    visitedList.add(url);
});
