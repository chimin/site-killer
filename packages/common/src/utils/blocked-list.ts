import { globalEvents } from "./global-events";

export namespace blockedList {

    export function get() {
        const list = JSON.parse(localStorage.getItem('blockedList'));
        return Array.isArray(list) ? list as string[] : [];
    }

    export function update(list: string[]) {
        localStorage.setItem('blockedList', JSON.stringify(list));
    }

    export function add(hostname: string) {
        const list = get();
        const newList = list.filter(e => e != hostname).concat(hostname).sort();
        update(newList);
        globalEvents.blockedList.notify();
    }

    export function remove(hostname: string) {
        update(get().filter(e => e != hostname));
        globalEvents.blockedList.notify();
    }

    export function clear() {
        update([]);
        globalEvents.blockedList.notify();
    }

    export function contains(hostname: string) {
        return !!get().find(e => e == hostname);
    }

}