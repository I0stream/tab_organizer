#What is Tab Organizer
Tab organizer is a way to save tabs in a group. intentially cumbersome if the groups get too large, 
I think that this is a happy middle ground between multiple windows of tabs and an overflowing bookmarks folder.

I intend it to easily open those groups into actual tab groups but am currently too busy
to switch the entire project to Manifest V3. There is a single function that is required from MV3, I am pleased

##how to install
currently you have to download the project and build it yourself with npm. 
Once built, switch your chrome://extensions/ to developer mode.
Then select "Load unpacked" in chrome://extensions/
Navigate to the tab organizer build folder, and select the manifest.json file (I think).
it should install to your extensions from there

##How to use
In the extension start by creating a group, select "+Group".
then in the dropdown arrow \/ navigate to "edit", which will allow you to write whatever you want in the title and description boxes
Hit enter with the text boxes focused.

Now in your browser navigate to a tab that you wish to add to the 'current group' ie the group you just made.
And right click on a blank spot on the webpage, there will be a dropdown item that says "add tab"
Simply select "add tab" and the current web page will be added to your group.

