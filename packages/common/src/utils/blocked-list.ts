export namespace blockedList {

    const observeCallbacks: (() => void)[] = [];

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

    export function contains(hostname: string) {
        return !!get().find(e => e == hostname);
    }

    export function observe(callback: () => void) {
        observeCallbacks.push(callback);
    }

    function notifyObservers() {
        observeCallbacks.forEach(e => e());
    }

}