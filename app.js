// Superclass
class SpaceShip {

    constructor(name) {
        this.name = name;
    }
    /**
     * Attack the enemy
     * @param {obj} enemy
     * @return {number} enemy hull
     */
    attack(enemy) {
        if (Math.random() < this.accuracy) {
            enemy.hull -= this.firepower;
            enemy.showStats();
            log(`${this.name} hit ${enemy.name} [${this.firepower}]`)
        } else {
            log(`${this.name} missed`)
        }
        return enemy.hull;
    }
    showStats() {
        document.getElementById(this.statsId).innerHTML = `Hull : ${this.hull}<br>FirePower : ${this.firepower}<br>Accuracy : ${this.accuracy}`;
    }
}

// USS Space Ship class
class USS extends SpaceShip {
    /**
     * The USS Schwarzenegger has the following properties:
     *  - hull      : 20
     *  - firepower : 5
     *  - accuracy  : 0.7
     * @param {string} name // spaces ship name
     * @return {USS} // USS space ship
     */
    constructor(name) {
        super(name);
        this.hull = 20;
        this.firepower = 5;
        this.accuracy = 0.7;
        this.statsId = 'playerStats';
    }
    /**
     * Attack the enemy
     * @param {string} message // prompt message
     * @param {string[]} options // prompt options
     * @return {string} // user input
     */
    prompt(message, options) {
        let input;
        do {
            input = prompt(message, options.join('/'));
            if (input === null) {
                return null;
            } else if (options.includes(input.toLowerCase())) {
                return input.toLowerCase();
            }
        } while (input !== null)
    }
}

// Alien Space Ship class
class Alien extends SpaceShip {
    /**
     * The alien ship has the following ranged properties determined randomly: 
     *  - hull      : between 3 and 6
     *  - firepower : between 2 and 4 
     *  - accuracy  : between 0.6 and 0.8
     * @param {string} name // spaces ship name
     * @return {Alien} // Alien space ship
     */
    constructor(name) {
        super(name);
        this.hull = 3 + Math.round((6 - 3) * Math.random());
        this.firepower = 2 + Math.round((4 - 2) * Math.random());
        this.accuracy = 0.6 + Math.round((0.8 - 0.6) * Math.random() * 10) / 10;
        this.statsId = 'enemyStats';
    }
    /**
     * @param {number} numAlienShips
     * @return {Alien[]} Array of 'Alien' objects
     */
    static createArmada(numAlienShips) {
        const armada = [];
        for (let i = 0; i < numAlienShips; i++) {
            armada.push(new Alien(`Alien#${i + 1}`))
        }
        return armada;
    }
}

/**
 * @param {USS} hero
 * @param {Alien[]} enemies
 * @return {-1|0|1} 1 - Hero won, 0 - Hero lose, -1 - Hero retreated
 */
const battle = (hero, enemies) => {

    let round = 0;
    // continue battle while number of enemies more than zero
    while (enemies.length > 0) {

        const target = enemies.pop();
        target.showStats();
        let heroAction = hero.prompt('[Current Health: ' + hero.hull + '] [Target\'s Health: ' + target.hull + '] [Enemies Remaining: ' + (enemies.length + 1) + ']\n\nDo you want to attack the first alien ship?', ['attack', 'retreat']);

        if (heroAction === 'retreat' || heroAction === null) {

            log(`${hero.name} retreat! ===> :::[ GAME OVER ]:::`);
            return -1;

        } else {

            while (target.hull > 0) {
                log(`:::[ ROUND ${++round} ]:::`);

                // hero attacs
                if (hero.attack(target) <= 0) {
                    log(`${target.name} is DESTROYED!`)
                } else if (target.attack(hero) <= 0) {
                    //game over
                    log(`:::[ GAME OVER ]:::`);
                    return 0;
                }

            }
        }
}
log(`:::[ ${hero.name} WON ]:::`);
return 1;
}
// function to log into console
const log = str => console.log(str);

window.addEventListener('load', function () {
    // Start Program
    const schwarzenegger = new USS('USS Schwarzenegger');
    schwarzenegger.showStats();
    const enemies = Alien.createArmada(6);
    battle(schwarzenegger, enemies);
});


