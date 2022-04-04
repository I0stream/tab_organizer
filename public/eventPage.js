
var contextMenuItem ={
    "id": "tutorial02",
    "title": "Add tab", /* what appears in the menu */
    "contexts": ['page']
}


function addlink(linkstruct){
    //add to groups

    let fgroups = JSON.parse(localStorage.getItem('groups'))
    let fselected = JSON.parse(localStorage.getItem('selected'))
    fgroups[fselected].links.push(linkstruct)
    
    localStorage.setItem('groups', JSON.stringify(fgroups))
  }

//let queryOptions = { active: true, currentWindow: true };
//let [tab] = await chrome.tabs.query(queryOptions);
async function getCurrentTab() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        
        var tabURL = tabs[0].url;
        var fav = tabs[0].favIconUrl
        var title = tabs[0].title
        alert( title)
        if (tabURL == null){
            return;
        } else{
            addlink({"url" : tabURL.toString(), "title" : title, "favicon" : fav})
        }
    });
}
//chrome-extension://bhnhbbkncmdfpnnklchhollpcdfnnpoi/_generated_background_page.html

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener( (clickData) => {
    if(clickData.menuItemId == "tutorial02"){
        getCurrentTab()
    }
})

  
