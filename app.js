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
            Battle.log(`${this.name} hit ${enemy.name} [${this.firepower}]`)
        } else {
            Battle.log(`${this.name} missed`)
        }
        return enemy.hull;
    }
    /**
     * Show ship's stats
     */
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
     * @param {string} name
     * @return {USS}
     */
    constructor(name) {
        super(name);
        this.hull = 20;
        this.firepower = 5;
        this.accuracy = 0.7;
        this.statsId = 'playerStats';
        this.showStats();
    }
}

// Alien Space Ship class
class Alien extends SpaceShip {
    /**
     * The alien ship has the following ranged properties determined randomly: 
     *  - hull      : between 3 and 6
     *  - firepower : between 2 and 4 
     *  - accuracy  : between 0.6 and 0.8
     * @param {string} name
     * @return {Alien}
     */
    constructor(name) {
        super(name);
        this.hull = 3 + Math.round((6 - 3) * Math.random());
        this.firepower = 2 + Math.round((4 - 2) * Math.random());
        this.accuracy = 0.6 + Math.round((0.8 - 0.6) * Math.random() * 10) / 10;
        this.statsId = 'enemyStats';
    }
    /**
     * Generate random number of ships to attack Earth
     * @param {number} min
     * @param {number} max
     * @return {Alien[]} Array of 'Alien' objects
     */
    static createArmada(min, max) {
        const numAlienShips = min + Math.round((max - min) * Math.random());
        const armada = [];
        for (let i = 0; i < numAlienShips; i++) {
            armada.push(new Alien(`Alien#${i + 1}`))
        }
        return armada;
    }
}

// Battle
class Battle {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.round = 0;
    }

    // static function to log into console
    static log(str) {
        console.log(str);
    }

    // static function to alert + log
    static alert(str) {
        console.log(str);
        alert(str);
    }

    /**
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
            } else if (options.toString().includes(input.toLowerCase())) {
                return input.toLowerCase();
            }
        } while (input !== null)
    }
    startBattle() {
        return this.nextTarget(this.enemies.pop());
    }
    nextTarget(target) {

        this.target = target;
        this.target.showStats();

        // use Promise to support delaying of user prompt
        new Promise((resolve) =>
            // use a timer to ask the user for a delay and get enough time to update  DOM
            setTimeout(() => resolve(this.prompt('[Current Health: ' + this.player.hull + '] [Target\'s Health: ' + target.hull + '] [Enemies Remaining: ' + (this.enemies.length + 1) + ']\n\nDo you want to attack the alien ship?', ['attack', 'retreat'])), 100))
            .then((playerAction) => {
                // If player selected 'retreat' return '-1' - player retreated
                if (playerAction === 'retreat' || playerAction === null) {
                    return -1;
                    // If player selected 'attack' then call 'nextRound()' recursively and check if either the target or the player is destroyed
                } else if (this.nextRound()) {
                    // if target is destroyed, then switch to next target recursively
                    // If no target left, then return 1 - player won
                    Battle.log(`${target.name} is DESTROYED!`)
                    return (this.enemies.length > 0) ? this.nextTarget(this.enemies.pop()) : 1;
                } else {
                    // if player ship is destroyed, then return '0' - player lose
                    return 0;
                }
            })
            // Process battle result if it was set on the previous step
            .then((result) => {
                switch (result) {
                    case 1:
                        Battle.alert(`:::[ ${this.player.name} WON ]:::`);
                        break;
                    case 0:
                        Battle.alert(`:::[ GAME OVER ]:::`);
                        break;
                    case -1:
                        Battle.alert(`${this.player.name} retreat! ===> :::[ GAME OVER ]:::`);
                        break;
                }
            })
    }
    nextRound() {
        Battle.log(`:::[ ROUND ${++this.round} ]:::`);
        // player attacks, return 'true' if target is destroyed
        if (this.player.attack(this.target) <= 0) {
            return true;
            // target attacks, return 'false' if player's ship is destroyed
        } else if (this.target.attack(this.player) <= 0) {
            return false;
            // otherwise play next round
        } else {
            return this.nextRound();
        }
    }

}

window.addEventListener('load', function () {
    // Start Game
    const player = new USS('USS Schwarzenegger');
    const enemies = Alien.createArmada(6, 10);
    const battle = new Battle(player, enemies);
    battle.startBattle();

});


