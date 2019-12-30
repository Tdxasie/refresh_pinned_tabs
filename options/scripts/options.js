const tabs = document.getElementById('tabs');
let index = 0;

function addTab(data = undefined) {
    tabs.appendChild(document.getElementById('tab-template').cloneNode(true));
    let current = tabs.lastChild;
    current.style.display = "block";
    current.id = index;
    if (data) {
        current.childNodes[1].value = data.url;
        current.childNodes[3].checked = data.pinned;
    }
    index = index + 1;
    current.childNodes[5].addEventListener('click', e => {
        e.preventDefault();
        addTab();
    });
    current.childNodes[7].addEventListener('click', e => {
        e.preventDefault();
        if (tabs.childNodes.length > 2) {
            current.remove();
        }
    })
}

function saveOptions() {
    let options = [];
    for (let i = 1; i <= tabs.childElementCount; i++) {
        let tab = tabs.childNodes[i];
        if (tab.childNodes[1].value) {
            options.push({
                url: tab.childNodes[1].value,
                pinned: tab.childNodes[3].checked,
                index: i-1
            })
        }
    }
    chrome.storage.sync.set({
        pinned_options: options
    }, () => {
        let status = document.getElementById('status')
        status.textContent = "Options saved";
        setTimeout(() => status.textContent = '', 750);
    })
}

function restoreOptions() {
    chrome.storage.sync.get(['pinned_options'], (res) => {
        if (res.pinned_options.length == 0) {
            addTab();
        } else {
            res.pinned_options.forEach(el => addTab(el));
        }
    })
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);