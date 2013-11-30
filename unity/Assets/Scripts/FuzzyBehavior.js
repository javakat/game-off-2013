#pragma strict

var xscale : double;
var yscale : double;
var zscale : double; //likely will never NOT be 0
var damage : int;

private var velocity : Vector3;
private var healthManager : HealthManager;

function Start () {	
	xscale = 0.1;
	yscale = 0.1;
	zscale = 0.1;
	damage = 5;

	this.rigidbody.detectCollisions = true;
	healthManager = GameObject.FindGameObjectWithTag("GameController").GetComponent(HealthManager);
}

function Update () {
	this.transform.position.z = -0.15;
	
	velocity = Vector3(0,0,0);
	
	var base = GameObject.Find("watcher-base").transform.position;
	if(this.transform.position.x < base.x) velocity.x += xscale;
	else if(this.transform.position.x > base.x) velocity.x -= xscale;
	if(this.transform.position.y < base.y) velocity.y += yscale;
	else if (this.transform.position.y > base.y) velocity.y -= yscale;
	
	this.rigidbody.velocity = velocity;
		
	//GameObject.Find("watcher-base").transform.position.x += Time.deltaTime;

}
function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag != "EnemyBase" && collision.gameObject.tag != "Fuzzy") Debug.Log(collision.gameObject.tag);
	if(collision.gameObject.tag == "Base" || collision.gameObject.tag == "Player"){
		healthManager.Damage(damage, collision.gameObject.tag);
	}
}