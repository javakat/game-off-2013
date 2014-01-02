#pragma strict
import System.Net;


//**************************************************************************************
//
// 			Variables, have you heard of them
//
//**************************************************************************************

//server
private var playerCount: int = 0;
public var playerMan: GameObject;

//all clients
private var playerType: String = "none";
private var connecting = false;

//watchers
private var numberTimesClicked: int = 0;
private var lastHeathManaDataSend: Date = new Date();


//**************************************************************************************
//
// 			All that sick default Unity Function S***
//
//**************************************************************************************

//if you the server machine it starts up dat server
//else it grabs that server info bra!
function Awake() {
		
	//Network.natFacilitatorPort = 25003;	
	//Network.natFacilitatorIP = "saintfactorstudios.com";
	//MasterServer.ipAddress = "saintfactorstudios.com";
	//MasterServer.port = 25004;
		
	Debug.Log(Network.player.ipAddress);
		
	/************************************************
				SUPER NOTE
				
		if you are building the server version
		of the app, the condition should be 
		TRUE, else it should be FALSE.
		
		This is so important I dropped all 
		pretense of slang.  Please for the 
		love of God remember this!!!!!!!!
			
	************************************************/
		
	if(false)
	{
		// the first number in initialize server is max player count, the next is the port number, dont worry about the third
		// Use NAT punchthrough if no public IP present
		Network.InitializeServer(32, 25002, !Network.HavePublicAddress());
		
		//GameObject.Find("Number").guiText.text = "Server Instance";
	}
	else
	{	
		Network.Connect("saintfactorstudios.com", 25002);
		//MasterServer.RequestHostList("NetworkTestGame");
	}
	
}

//if you aint the server and you floatin, it hooks you up
//else special s*** for all them clients.
function OnGUI() {

	if (Network.isServer){
		//Debug.Log("Running as a server");
	}
	else if (Network.isClient){
		//Debug.Log("Running as a client");
		
		if(playerType == "Watcher")
		{
			var t = new Date();
			t.AddSeconds(-10);
			if(t > lastHeathManaDataSend)
			{				
				//numberTimesClicked isnt getting updated anywhere yet.  Please advise
				networkView.RPC ("updateHeroHealthMana", RPCMode.Server, numberTimesClicked);
				numberTimesClicked = 0;	
			}
		}
		
	}
	
} 


//**************************************************************************************
//
// 			RPC's MoFo
//
//**************************************************************************************

//This is a leftover from the network test.  I left it here to illustrate stuff I guess
@RPC
function LogEvent (text : String)
{
	GameObject.Find("Number").guiText.text += "     \nPlayer from " + text + " has connected";
}

//the next 2 rpc's set the player count on all machines to the server amount
//the broadcastplayercount option should only ever be called with a server rpc call
@RPC
function RequestBroadcastPlayerCount (text : String)
{
	networkView.RPC ("SetPlayerCount", RPCMode.All, playerCount);
}
@RPC
function SetPlayerCount (pcVal : int)
{
	playerCount = pcVal;
}

//this updates the heros mana and whatnot
//this should only be called with a server rpc
@RPC
function updateHeroHealthMana (pcVal : int)
{
	//I dont know what kinda crap needs to go in this hizzle, but I'm already callin it anyway
}

//The Following 2 Rpc's select a new hero upon the old mans death
//requestheroupdate should only ever be called with a server rpc call, which should be fired on hero's death
@RPC
function RequestHeroUpdate (text : String)
{
	var playerSelected = Mathf.FloorToInt(Random.value * Network.connections.length);
	var iptogive = Network.connections[playerSelected].ipAddress.ToString();
	networkView.RPC ("SelectNewHero", RPCMode.All, iptogive);
}
@RPC
function SelectNewHero (ipNum : String)
{
	//note this only creates a new hero.  The hero object should be destroyed upon health running out (that shouldn't be handeled here)
	if(ipNum == Network.player.ipAddress.ToString())
	{
	    SpawnPlayerOverRide();
	}
}

//***************************************************************************************
//
//			Network Events AMIRITE
//
//***************************************************************************************

function OnServerInitialized() {
	
	//MasterServer.RegisterHost("NetworkTestGame", "Main Game Instance");

    Debug.Log("Server initialized and ready");
    //SpawnPlayer();
    
    // you can make the server spawn a player if you uncomment the line below.  just a heads up.  
    // not that you would want that. unless you are testing.  like a dummy.  dummy.
    //SpawnPlayer();
}

function OnConnectedToServer()
{
    Debug.Log("Successfully connected to the server");
	//networkView.RPC ("LogEvent", RPCMode.All, Network.player.ipAddress);
	networkView.RPC ("RequestBroadcastPlayerCount", RPCMode.Server, "ThisStringIsMeaninglessButIThinkNecessary");	
    SpawnPlayer();
}
 
function OnPlayerConnected(player: NetworkPlayer) {
    Debug.Log("Player " + " connected from " + player.ipAddress);
    
    playerCount++;
}

function OnPlayerDisconnected(player: NetworkPlayer) {
	Debug.Log("Clean up after player " +  player);
	Network.RemoveRPCs(player);
	Network.DestroyPlayerObjects(player);
    
    playerCount--;
}

/*
function OnMasterServerEvent( message: MasterServerEvent )
{	
	if (message == MasterServerEvent.HostListReceived)
	{
		processHostList();
	}	
}
*/

//***************************************************************************************
//
//			All them Helper Functions
//
//***************************************************************************************

//this checks if there is currently a hero
//if no, make that man a hero
//if yes, that man becomin a watcha, know what im sayin
function SpawnPlayer()
{
	//for testing only.  this is bad
	var x = 0;
	var y = 1;
	var z = -0.55;
	var posit = new Vector3(x,y,z);
    Network.Instantiate(playerMan, posit, Quaternion.identity, 0);

	if(playerCount == 0)
	{
		//these lines should be uncommented in production
		//var x = 0;
		//var y = 1;
		//var z = -0.55;
		//var posit = new Vector3(x,y,z);
	    //Network.Instantiate(playerMan, posit, Quaternion.identity, 0);
	    
		playerType = "Hero";
    }
    else
    {
    	//add the overlay buttons
    	
    	playerType = "Watcher";
    }
}

//this is for the server to promote someone, its not tied down by your petty rules
function SpawnPlayerOverRide()
{
	var x = 0;
	var y = 1;
	var z = -0.55;
	var posit = new Vector3(x,y,z);
    Network.Instantiate(playerMan, posit, Quaternion.identity, 0);
    
	playerType = "Hero";
}

/*
//processes them hosts brah!
function processHostList()
{	
	//Generates the hostlist
	var data : HostData[] = MasterServer.PollHostList();
	    	  	    	
	for (var element in data)
	{	
		//GameObject.Find("Number").guiText.text = "Client Instance";
		Network.Connect(element);
		break;
	}
}
*/




