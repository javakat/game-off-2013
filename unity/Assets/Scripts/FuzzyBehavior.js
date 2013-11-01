#pragma strict

var xscale : double;
var yscale : double;
var zscale : double; //likely will never NOT be 0

private var velocity : Vector3;

function Start () {
	xscale = 1.6;
	yscale = 1.6;
	zscale = 0;
	this.rigidbody.detectCollisions = true;
}

function Update () {
	this.transform.position.z = -0.15;
	
	
	velocity = Vector3(0,0,0);
	
	if(Input.GetKey(KeyCode.UpArrow) == true)
	{		
		//this.transform.position.y += Time.deltaTime * 5;
		velocity.y += yscale;
	}
	if(Input.GetKey(KeyCode.DownArrow) == true)
	{
		velocity.y -= yscale;
	}
	if(Input.GetKey(KeyCode.LeftArrow) == true)
	{
		velocity.x -= xscale;
	}
	if(Input.GetKey(KeyCode.RightArrow) == true)
	{
		velocity.x += xscale;
	}
	
	
	
	this.rigidbody.velocity = velocity;
	
		
	//Debug.Log("Xscale: " + xscale);
	//Debug.Log("Yscale: " + yscale);
	//Debug.Log("Zscale: " + zscale);
	Debug.Log("Velocity velocity: " + velocity);
	Debug.Log("Rigidbody velocity: " + this.rigidbody.velocity);
		
	//GameObject.Find("watcher-base").transform.position.x += Time.deltaTime;

}
function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag=="watcher-base"){
		this.audio.Play(0);
	}
}