
!(function(global){

/**
* @constructor
*/
var Application = global["Application"] || function(){

/*
* Assure gapi is loaded
*/
if(!global["gapi"]) {
throw "Unable to load application, gapi not available";
}

/*
* Bind gapi ready handler.
*/
gapi.hangout.onApiReady.add(this.onApiReady.bind(this));
};

/**
* @onApiReady - Fired by gapi when RPC layer is ready.
* @private
*/
Application.prototype.onApiReady = function(event) {
if(event.isApiReady == true)
{
/*
* Ready to start our application.
*/
console.log("Application is ready to run!");

/*
* Montor for client changes
*/
gapi.hangout.onParticipantsChanged.add(this.refreshParticipantsList.bind(this));

/*
* Initially draw the participants
*/
this.displayParticipants();
}
};

/*
* refreshParticipantsList
*/
Application.prototype.refreshParticipantsList = function(event)
{
/*
* Remove the UL Container
*/
document.getElementById("container").innerHTML = "";

/*
* recall the draw method
*/
this.displayParticipants();
}

/*
* Display participants
*/
Application.prototype.displayParticipants = function()
{
/*
* Get enabled participants
*/
var clients = gapi.hangout.getParticipants();

/*
* Ul Container
*/
var container = document.createElement("ul");

/*
* Loop the participants
*/
for(var i = 0; i < clients.length; i++)
{
var currentClient = clients[i];
var li = document.createElement("li");

if(currentClient.hasAppEnabled == true)
{
var image = "<img src=\"" + currentClient.person.image.url + "\" width=\"32\" height=\"32\" />";
li.innerHTML = image + " " + currentClient.person.displayName;
}
else
{
li.innerHTML = "Unknown Participant";
li.setAttribute("class", "unknown");
}

container.appendChild(li);
}

document.getElementById("container").appendChild(container);
}

/*
* Return the instance
*/
return new Application();
})(window || {})