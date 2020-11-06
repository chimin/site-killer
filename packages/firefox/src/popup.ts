import { blockedList, globalEvents, popupComponent } from 'site-killer-common';

globalEvents.rerun.register(async () => {
    const tabs = await browser.tabs.query({});

    let killed = 0;
    for (const tab of tabs) {
        const url = new URL(tab.url);
        if (blockedList.contains(url.hostname)) {
            await browser.tabs.remove(tab.id);
            killed++;
        }
    }

    await browser.notifications.create({
        message: `Killed ${killed} tabs`,
        title: 'Site Killer',
        iconUrl: 'icon.png',
        type: 'basic'
    });
});

document.body.appendChild(popupComponent());