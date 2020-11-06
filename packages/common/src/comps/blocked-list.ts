import { blockedList } from "../utils/blocked-list";
import { globalEvents } from "../utils/global-events";

export function blockedListComponent() {
    const div = document.createElement('div');

    div.appendChild(header());

    const ul = document.createElement('ul');
    div.appendChild(ul);

    const items = blockedList.get();
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
    span.textContent = 'Blocked';
    span.style.marginRight = '.3em';
    header.appendChild(span);

    const clearButton = document.createElement('a');
    clearButton.textContent = '[Clear]';
    clearButton.href = "#";
    clearButton.onclick = () => {
        blockedList.clear();
        return false;
    };
    header.appendChild(clearButton);

    const rerunButton = document.createElement('a');
    rerunButton.textContent = '[Rerun]';
    rerunButton.href = "#";
    rerunButton.onclick = () => {
        globalEvents.rerun.notify();
        return false;
    };
    header.appendChild(rerunButton);

    return header;
}

function listItem(item: string) {
    const li = document.createElement('li');

    const removeButton = document.createElement('a');
    removeButton.textContent = '[Remove]';
    removeButton.href = "#";
    removeButton.onclick = () => {
        blockedList.remove(item);
        return false;
    };
    li.appendChild(removeButton);

    const span = document.createElement('span');
    span.textContent = item;
    span.style.marginLeft = '.3em';
    li.appendChild(span);

    return li;
}
