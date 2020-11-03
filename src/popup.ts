import { blockedListComponent } from "./comps/blocked-list";
import { visitedListComponent } from "./comps/visited-list";
import { blockedList } from "./utils/blocked-list";
import { visitedList } from "./utils/visited-list";

function refresh() {
    document.body.innerHTML = '';
    document.body.appendChild(blockedListComponent());
    document.body.appendChild(visitedListComponent());
}

blockedList.observe(() => refresh());
visitedList.observe(() => refresh());

refresh();