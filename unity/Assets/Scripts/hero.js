#pragma strict

var scale : double;

private var thisTransform : Transform;
private var character : CharacterController;
private var velocity : Vector3;

function Start () {
	thisTransform = GetComponent(Transform);
	character = GetComponent(CharacterController);
}

function Update () {
	var movement = Vector3(Input.GetAxis('Horizontal'), Input.GetAxis('Vertical'), 0);
	movement.Normalize();
	
	velocity = character.velocity;
	movement += velocity;
	movement *= Time.deltaTime;
	movement *= scale;
	
	character.Move( movement );
}