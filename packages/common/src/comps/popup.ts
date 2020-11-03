import { blockedListComponent } from './blocked-list';
import { visitedListComponent } from './visited-list';
import { blockedList } from '../utils/blocked-list';
import { visitedList } from '../utils/visited-list';

export function popupComponent() {
    const div = document.createElement('div');

    function refresh() {
        div.innerHTML = '';
        div.appendChild(blockedListComponent());
        div.appendChild(visitedListComponent());
    }

    blockedList.observe(() => refresh());
    visitedList.observe(() => refresh());

    refresh();

    return div;
}
