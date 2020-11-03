import { arrayKeepLast } from "./arrays";
import { blockedList } from "./blocked-list";

export namespace visitedList {

    const observeCallbacks: (() => void)[] = [];

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
        notifyObservers();
    }

    export function remove(hostname: string) {
        update(get().filter(e => e != hostname));
        notifyObservers();
    }

    export function clear() {
        update([]);
        notifyObservers();
    }

    export function observe(callback: () => void) {
        observeCallbacks.push(callback);
    }

    function notifyObservers() {
        observeCallbacks.forEach(e => e());
    }

}