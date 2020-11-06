import { blockedList, globalEvents, popupComponent } from 'site-killer-common';

globalEvents.rerun.register(async () => {
    const tabs = await new Promise<chrome.tabs.Tab[]>(resolve =>
        chrome.tabs.query({}, resolve));

    let killed = 0;
    for (const tab of tabs) {
        const url = new URL(tab.url);
        if (blockedList.contains(url.hostname)) {
            await new Promise(resolve =>
                chrome.tabs.remove(tab.id, resolve));
            killed++;
        }
    }

    await new Promise(resolve =>
        chrome.notifications.create({
            message: `Killed ${killed} tabs`,
            title: 'Site Killer',
            iconUrl: 'icon.png',
            type: 'basic'
        }, resolve));
});

document.body.appendChild(popupComponent());