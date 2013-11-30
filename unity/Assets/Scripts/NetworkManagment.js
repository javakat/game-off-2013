#pragma strict
import System.Net;

private var playerCount: int = 0;
private var connecting = false;
public var playerSphere: GameObject;

function Awake() {
		
	if(Network.player.ipAddress == "172.17.9.137")
	{
		// Use NAT punchthrough if no public IP present
		Network.InitializeServer(32, 25002, !Network.HavePublicAddress());
		MasterServer.RegisterHost("NetworkTestGame", "Main Game Instance", "I luv this show");
		
		GameObject.Find("Number").guiText.text = "Server Instance";
	}
	else
	{	
		MasterServer.RequestHostList("NetworkTestGame");
	}
}

function OnGUI() {

	if(!connecting && !Network.isServer)
	{	
		var data : HostData[] = MasterServer.PollHostList();
		// Go through all the hosts in the host list
		
		//Debug.Log(!connecting);
		//Debug.Log(!Network.isServer);
		//Debug.Log(data.Length);
    	  	    	
		for (var element in data)
		{	
			GameObject.Find("Number").guiText.text = "Client Instance";	
			connecting = true;
			Network.Connect(element);
			break;
		}
	}

	if (Network.isServer){
		//Debug.Log("Running as a server");
	}
	else if (Network.isClient){
		//Debug.Log("Running as a client");
	}
	
} 

//function OnPlayerConnected(player: NetworkPlayer) {	             
//	GameObject.Find("Number").guiText.text += "     \n" + player.ipAddress + ":" + player.port;
//}

@RPC
function LogEvent (text : String)
{
	GameObject.Find("Number").guiText.text += "     \nPlayer from " + text + " has connected";
}

function OnServerInitialized() {
    Debug.Log("Server initialized and ready");
    SpawnPlayer();
}

function OnConnectedToServer()
{
    Debug.Log("Successfully connected to the server");
	networkView.RPC ("LogEvent", RPCMode.All, Network.player.ipAddress);
    SpawnPlayer();
}
 
function OnPlayerConnected(player: NetworkPlayer) {
    Debug.Log("Player " + " connected from " + player.ipAddress);
}

function OnPlayerDisconnected(player: NetworkPlayer) {
	Debug.Log("Clean up after player " +  player);
	Network.RemoveRPCs(player);
	Network.DestroyPlayerObjects(player);
}

function SpawnPlayer()
{
	var x = -20;
	var y = 17.37577;
	var z = 151.464;
	var posit = new Vector3(x,y,z);
    Network.Instantiate(playerSphere, posit, Quaternion.identity, 0);
}






