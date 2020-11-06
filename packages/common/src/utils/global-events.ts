export namespace globalEvents {

    class Event {

        private readonly callbacks: (() => void)[] = [];

        register(callback: () => void) {
            this.callbacks.push(callback);
        }

        notify() {
            this.callbacks.forEach(e => e());
        }

    }

    export const blockedList = new Event();
    export const visitedList = new Event();
    export const rerun = new Event();

}