#pragma strict

@script RequireComponent(CharacterController);

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
	
	this.transform.position.z = -0.15;
	character.Move( movement );
}
