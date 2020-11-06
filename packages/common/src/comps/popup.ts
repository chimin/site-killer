import { blockedListComponent } from './blocked-list';
import { visitedListComponent } from './visited-list';
import { globalEvents } from '../utils/global-events';

export function popupComponent() {
    const div = document.createElement('div');

    function refresh() {
        div.innerHTML = '';
        div.appendChild(blockedListComponent());
        div.appendChild(visitedListComponent());
    }

    globalEvents.blockedList.register(() => refresh());
    globalEvents.visitedList.register(() => refresh());

    refresh();

    return div;
}
