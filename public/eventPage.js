
var contextMenuItem ={
    "id": "tutorial02",
    "title": "My Chrome context menu 👆", /* what appears in the menu */
    "contexts": ['page']  /* to make this appear only when user selects something on page */
}

//let queryOptions = { active: true, currentWindow: true };
//let [tab] = await chrome.tabs.query(queryOptions);
async function getCurrentTab() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        var tabURL = tabs[0].url;
        alert(tabURL);
    });
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener( (clickData) => {
    if(clickData.menuItemId == "tutorial02"){
        getCurrentTab()
    }
})
