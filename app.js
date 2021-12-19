/**
 * Superclass
 */
class SpaceShip {
    attack(enemy) {
        if (Math.random() < this.accuracy) {
            enemy.hull -= this.firepower;
            log(`${this.name} hit ${enemy.name} on ${this.firepower}`)
        } else {
            log(`${this.name} missed`)
        }
        return enemy.hull;
    }
}
/**
 * The USS Schwarzenegger should have the following properties:
 *  - hull      : 20
 *  - firepower : 5
 *  - accuracy  : 0.7
 */
class USS extends SpaceShip {
    constructor(name) {
        super();
        this.name = name;
        this.hull = 20;
        this.firepower = 5;
        this.accuracy = 0.7;
    }
}
/**
 * The alien ships should each have the following ranged properties determined randomly: 
 *  - hull      : between 3 and 6
 *  - firepower : between 2 and 4 
 *  - accuracy  : between 0.6 and 0.8
 */
class Alien extends SpaceShip {
    constructor(name) {
        super();
        this.name = name;
        this.hull = 3 + Math.round((6 - 3) * Math.random());
        this.firepower = 2 + Math.round((4 - 2) * Math.random());
        this.accuracy = 0.6 + Math.round((0.8 - 0.6) * Math.random() * 10) / 10;
    }
}

/**
 * @param {USS} hero
 * @param {number} enemies
 * @return  1: Hero won
 *          0: Hero lose
 *         -1: Hero retreated
 */
const battle = (hero, enemies) => {
    while (enemies > 0) {
        const target = new Alien('Alien');
        while (target.hull > 0) {

            log(`[Current Health: ${hero.hull}] [Target's Health: ${target.hull}] [Enemies Remaining:${enemies}]`)

            // hero attacs
            if (hero.attack(target) <= 0) {
                enemies--;
                log(`${target.name} is destroyed!`)
            } else if (target.attack(hero) <= 0) {
                //game over
                log(`Game over`);
                return 0;
            }

            // next round
            log(`next round`)
        }
        // next round
        log(`next target`)

    }
    return 1;
}

const log = str => console.log(str);

const schwarzenegger = new USS('USS Schwarzenegger');

let enemies = 6;

battle(schwarzenegger, enemies);


