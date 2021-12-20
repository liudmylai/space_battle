## Space Battle (JS game)
### Overview
Earth has been attacked by a horde of aliens! You are the captain of the USS Schwarzenegger, on a mission to destroy every last alien ship. Battle the aliens as you try to destroy them with your lasers. 

### Live Preview
https://liudmylai.github.io/space_battle/

### 🚀 Specifications
Build a game of battling alien spaceships using Javascript. There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

A game round looks like this: 

You attack the first alien ship - If the ship survives, it attacks you - If you survive, you attack the ship again - If it survives, it attacks you again - Etc. - If you destroy the ship, you have the option to **attack** the next ship or to **retreat** - If you retreat, the game is over. - You win the game if you destroy all of the aliens. - You lose the game if you are destroyed.

Ship Properties:

**hull** is the same as health. If hull reaches `0` or less, the ship is destroyed.
**firepower** is the amount of damage done to the **hull** of the target with a successful hit.
**accuracy** is the chance between 0 and 1 that the ship will hit its target.

### 🚀 Bonuses 
- [ ] The aliens send a random number of ships to attack Earth. Think of a reasonable range and implement it. 
- [ ] Scientists have developed a super targeting computer for your lasers. You now are asked which of the aliens you would like to hit with your lasers. 
- [ ] Scientists have improved your ship's shields. They don't work that consistently, and only improve your hit points by a random number each time 
- [ ] Scientists have put missiles on your ship. You only have a limited number of them, but they do a lot of damage. You can say before each battle if you want to use one of your missles. 
- [ ] The aliens have gained emotions and now can attack more than one at a time. 
- [ ] Evil alien scientists have created an alien mega-ship. This mega-ship contains a number of "weapon pods" that each have their own individual hit points. These "weapon-pods" ( objects ) must all be destroyed before you can begin doing damage to the main ship, which also has its own hit points.
- [ ] When the game is over, prompt the user if they would like to play again, and make it so the user can play again with all the values set back to default. 
- [ ] So far the entire game is just one battle, with many aliens. implement a game that consists of multiple battles where enemies respawn for a new battle at the end of the old battle. Keep track of points for the number of wins the player has. 
- [ ] After every battle you are asked if you want to return to base and recharge your shields. 
- [ ] Make the players and enemies stronger after each battle 
- [ ] Distribute medals and power ups to the player depending on points