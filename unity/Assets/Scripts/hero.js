#pragma strict

@script RequireComponent(CharacterController);

var scale : double;

var barDisplay : float = 0;
var barPos : Vector2 = new Vector2(20, 40);
var barSize : Vector2 = new Vector2(60, 20);
var barEmpty : Texture2D;
var barFull : Texture2D;

private var thisTransform : Transform;
private var character : CharacterController;
private var velocity : Vector3;

function Start () {
	thisTransform = GetComponent(Transform);
	character = GetComponent(CharacterController);
}

function OnGUI () {
	// draw the background:
    GUI.BeginGroup (new Rect (barPos.x, barPos.y, barSize.x, barSize.y));
        GUI.Box (Rect (0,0, barSize.x, barSize.y),barEmpty);
 
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, barSize.x * barDisplay, barSize.y));
            GUI.Box (Rect (0,0, barSize.x, barSize.y),barFull);
        GUI.EndGroup ();
 
    GUI.EndGroup ();
}

function Update () {
	var movement = Vector3(Input.GetAxis('Horizontal'), Input.GetAxis('Vertical'), 0);
	var cursor = Vector3();
	
	movement.Normalize();
	
	velocity = character.velocity;
	movement += velocity;
	movement *= Time.deltaTime;
	movement *= scale;
	
	this.transform.position.z = -0.15;
	character.Move( movement );
	
	cursor = Input.mousePosition.normalized / 5;
	GameObject.Find("punchfists").rigidbody.position = cursor + this.transform.position;
	
	if(Input.GetKeyDown("e")) {
		GameObject.Find("punchfists").rigidbody.velocity = Vector3(4, 0, 0);
	}
	
}
