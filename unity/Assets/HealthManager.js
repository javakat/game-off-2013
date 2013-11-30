#pragma strict

var startingHeroHealth = 50;
var startingBaseHealth = 200;

private var heroHealth : int;
private var baseHealth : int;

function Start () {
	heroHealth = startingHeroHealth;
	baseHealth = startingBaseHealth;
}

function Update () {
	if(heroHealth <= 0 || baseHealth <= 0) Debug.Log("dead");
}

function Damage(amt : int, target : String) {
	if(target.Equals("Player")) heroHealth -= amt;
	else if (target.Equals("Base")) baseHealth -= amt;
	Debug.Log("==== amt ====");
	Debug.Log(amt);
	Debug.Log("");
	Debug.Log("==== target ====");
	Debug.Log(target);
	Debug.Log("");
	Debug.Log("==== heroHealth ====");
	Debug.Log(heroHealth);
	Debug.Log("");
	Debug.Log("==== baseHealth ====");
	Debug.Log(baseHealth);
	Debug.Log("");
	
	
}