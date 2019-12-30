chrome.browserAction.onClicked.addListener(() => {
    pinTabs();
});

function pinTabs() {
    chrome.storage.sync.get(['pinned_options'], (res) => {
        res.pinned_options.forEach( tab => chrome.tabs.create(tab));
    })
}