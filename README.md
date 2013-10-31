watcher
===

Ideas:
* The game is the same for every participant playing from anywhere, hosted on the web
* There is an unrelenting Horde you must conquer, controlled by an AI, with no particular face to their army (unlike our "hero")
* The majority of players only have one means of input -- mashing the spacebar (or something similar) to give the "hero" "spirit power" with which the hero can use abilities
* In general, no one can do anything but mash the spacebar -- everyone starts as a lowly Watcher
* At random, when there is no Hero, one player is selected to be the new Hero
* The Hero has abilities that allow him/her/thon to summon other Watchers to be underlings of some sort (maybe they walk around, maybe they're turrets, maybe either) and his attack damage scales with the total number of participants
* There is a base the Hero must protect from the onslaught of the Horde. If this base is lost, the Hero loses and is shamed on whatever social media they entered when they became the Hero
e.g. YOU FAILED X PEOPLE (posted on social media wall thing)
* There are Horde Spawners the Hero must destroy (no one else can deal damage to them). If the Hero eliminates all the Spawners, then eliminates all of the Horde, then the Hero wins and is extolled on their social medium of choice
* Victory is rewarded by allowing the Hero to choose a new rule to force on the next game, divided into Good and Bad rules. Maybe the Hero can only choose from the Good ones?
* Failure is punished by giving the AI the chance to pick from the set of Bad rules, making the next game more difficult? we should be careful with this
* Horde units deal damage via unit collision; Spawners are far more dangerous (somehow). Also Spawners are immobile?
* Watchers can see the whole map, Heroes can toggle between the whole map and a local view, and normal Players can only see the local view. Watchers can maybe toggle like the Hero

ROUGH IDEAS FOR FORMULAE (pluralized like this because I'm an intolerable pedant)
=====
Key:
N (total number of participants)
n (number of Watchers)
p (number of summoned Players -- not the Hero)
h (boolean describing the hero's existence, true if he's there)

100N = number of Horde units on game start
N/100 = number of Spawners on game start (shouldn't increase over the course of a game)


