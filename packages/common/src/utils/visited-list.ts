import { blockedList } from "./blocked-list";
import { globalEvents } from "./global-events";

export namespace visitedList {

    export function get() {
        const list = JSON.parse(localStorage.getItem('visitedList'));
        return Array.isArray(list) ? list as string[] : [];
    }

    export function update(list: string[]) {
        localStorage.setItem('visitedList', JSON.stringify(list));
    }

    export function add(url: URL) {
        if (!url.protocol.match(/^https?:$/) || blockedList.contains(url.hostname)) {
            return;
        }

        const list = get();
        const newList = list.filter(e => e != url.hostname).concat(url.hostname);
        arrayKeepLast(newList, 100);
        update(newList);
        globalEvents.visitedList.notify();
    }

    export function remove(hostname: string) {
        update(get().filter(e => e != hostname));
        globalEvents.visitedList.notify();
    }

    export function clear() {
        update([]);
        globalEvents.visitedList.notify();
    }

    function arrayKeepLast<T>(list: T[], keepCount: number) {
        const deleteCount = list.length - keepCount;
        if (deleteCount > 0) {
            list.splice(0, deleteCount);
        }
    }
}