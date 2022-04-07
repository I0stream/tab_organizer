    /*global chrome*/

var contextMenuItem ={
    "id": "tutorial02",
    "title": "Add tab", /* what appears in the menu */
    "contexts": ['page']
}



//add link via localstorage and then update popup with chrome event
function addlink(linkstruct){
    //add to groups

    let fgroups = JSON.parse(localStorage.getItem('groups'))
    let fselected = JSON.parse(localStorage.getItem('selected'))
    fgroups[fselected].links.push(linkstruct)
    
    localStorage.setItem('groups', JSON.stringify(fgroups))
  }

async function getCurrentTab() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        
        var tabURL = tabs[0].url;
        var fav = tabs[0].favIconUrl
        var title = tabs[0].title
        if (tabURL == null){
            return;
        } else{
            //.toString()
            addlink({"title" : title, "url" : tabURL, "favicon" : fav})
            //update popup if it is open 
            chrome.runtime.sendMessage({
                msg: "newLink"
            });
        }
    });
}


//context menu button
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener( (clickData) => {
    if(clickData.menuItemId == "tutorial02"){
        getCurrentTab()
    }
})




//open in new tab event listener
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "openInTab") {
            //  To do something
            openInNewTab(request.data.url)
        }
    }
);
function openInNewTab (myurl){
    //let TheURL = "http://" + myurl
    chrome.tabs.create({url: myurl, selected:false});
};


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "openGroup") {
            //  To do something
            OpenGroup()
        }
    }
);

async function OpenGroup(){
    let fgroups = JSON.parse(localStorage.getItem('groups'))
    let fselected = JSON.parse(localStorage.getItem('selected'))

    const glinks = fgroups[fselected].links
    let mytitle = fgroups[fselected].title
    let gcolor = fgroups[fselected].color
    var gIDs =[]
    //open tabs sequentially and save the tab id
    let promise = new Promise(function(resolve, reject) {
        glinks.forEach(function (linkstruct, index){
            chrome.tabs.create({url: linkstruct["url"], selected:false},function(newTab) {
                gIDs.push(newTab.id)
            });
        })
        setTimeout(() => resolve(gIDs), 500);
      });
      
      promise.then(
            result =>{ 
                chrome.tabs.group({ tabIds: gIDs }, groupid => {
                    //update to mv3
                    chrome.tabGroups.update(groupid, { collapsed: true, title: mytitle.toString(), color: gcolor })
                });
            }
      )
    //using tab id make them into a group
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "save") {
            //  To do something
            SaveJson()
        }
    }
);
function SaveJson(){
    let fgroups = JSON.parse(localStorage.getItem('groups'))
    // Convert object to a string.
    var result = JSON.stringify(fgroups);
    
    // Save as file
    var url = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(result)));
    chrome.downloads.download({
        url: url,
        filename: 'groups.json'
    });
}

/*function getExistingGroups(){
    chrome.tabGroups.get)
}*/

