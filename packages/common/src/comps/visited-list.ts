import { blockedList } from "../utils/blocked-list";
import { visitedList } from "../utils/visited-list";

export function visitedListComponent() {
    const div = document.createElement('div');

    div.appendChild(header());

    const ul = document.createElement('ul');
    div.appendChild(ul);

    const items = visitedList.get().reverse();
    if (items.length) {
        items.forEach(e => ul.appendChild(listItem(e)));
    } else {
        const li = document.createElement('li');
        li.textContent = 'Empty';
        ul.appendChild(li);
    }
    return div;
}

function header() {
    const header = document.createElement('h3');

    const span = document.createElement('span');
    span.textContent = 'Visited';
    span.style.marginRight = '.3em';
    header.appendChild(span);

    const clearButton = document.createElement('a');
    clearButton.textContent = '[Clear]';
    clearButton.href = "#";
    clearButton.onclick = () => {
        visitedList.clear();
        return false;
    };
    header.appendChild(clearButton);

    return header;
}

function listItem(item: string) {
    const li = document.createElement('li');

    const blockButton = document.createElement('a');
    blockButton.textContent = '[Block]';
    blockButton.href = "#";
    blockButton.onclick = () => {
        blockedList.add(item);
        visitedList.remove(item);
        return false;
    };
    li.appendChild(blockButton);

    const span = document.createElement('span');
    span.textContent = item;
    span.style.marginLeft = '.3em';
    li.appendChild(span);

    return li;
}
