#pragma strict

var rate : int; // in s
var needsToSpawn : boolean;
var fuzzy : Rigidbody;

private var time = 0.0;

function Start () {

}

function Update () {
	if(needsToSpawn) {
		needsToSpawn = trySpawn();
		if(needsToSpawn) return;
	}
	time += 1*Time.deltaTime;
	if(time >= rate) {
		needsToSpawn = true;
		time = 0;
	}
}

function trySpawn() {
	var spawnspot = Random.insideUnitCircle * 2;
	// while(not on the map) spawnspot = Random.insideUnitCircle;
	var newFuzz : Rigidbody = Instantiate(fuzzy, this.transform.position + spawnspot, transform.rotation);
	return false;
}