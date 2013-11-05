#pragma strict

var rate : int; // in s
var needsToSpawn : boolean;
var fuzzy : Rigidbody;

private var time = 0;

function Start () {
	needsToSpawn = false;
	rate = 60;
}

function Update () {
	if(needsToSpawn) {
		needsToSpawn = trySpawn();
		if(needsToSpawn) return;
	}
	if(++time >= rate) {
		needsToSpawn = true;
		time = 0;
	}
}

function trySpawn() {
	var newFuzz : Rigidbody = Instantiate(fuzzy, transform.position, transform.rotation);
	return true;
}