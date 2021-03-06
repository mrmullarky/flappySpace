class MainGame extends Phaser.Scene {
    
    constructor() {
        super({key: 'Main'});
        
    let tileSprite;
    var ship;
    var cursors;
    var walls;
    var timedBuild;
    var score = 0;
    var scoreText;
    var style = { fontSize: '32px', fill: '#fff'};
    var gameOver = false;
    var gameOverText;
    }
    
    

    preload ()
    {
        this.load.image('mountains1', 'assets/space.jpg');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('wall', 'assets/platform.png');
    }

    create ()
    {
        this.tileSprite = this.add.tileSprite(400, 300, 2048, 770, 'mountains1');
        
        ship = this.physics.add.sprite(60, 300, 'ship');
        ship.setScale(.2);
        ship.setCollideWorldBounds(true);
 
        walls = this.physics.add.group();
        
        timedBuild = this.time.addEvent({ 
            delay: 3000, 
            callback: generateWalls, 
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(ship, walls, hitWall, null, this);

        cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'Score: 0', style);
    }

    generateWalls(){
        // Lower: -150; Upper: 200;
        let y = Math.floor(Math.random()* 300 - 150);
            
        walls.create(800, y,  'wall');
        walls.create(800, y + 550,  'wall');
    }

    update() {
        if(gameOver){
            timedBuild.remove();
            gameOverText = this.add.text(241, 273, 'GAME OVER', { fontSize: '64px' });
            return;
        }
        this.tileSprite.tilePositionX += 1;

        if(cursors.left.isDown){
            ship.setVelocityX(-160);
        } else if(cursors.right.isDown){
            ship.setVelocityX(160);
        } 
        
        if(cursors.up.isDown){
            ship.setVelocityY(-160);
        } else if(cursors.down.isDown){
            ship.setVelocityY(160);
        }
        if(cursors.up.isUp && cursors.down.isUp && cursors.left.isUp && cursors.right.isUp){
            ship.setVelocityY(0);
            ship.setVelocityX(0);
        }

        
            score += 1;
            scoreText.setText('Score: ' + score);
        
        walls.setVelocityX(-100);

    }

    hitWall(ship, wall) {
        this.physics.pause();
        ship.setTint(0xff0000);
        gameOver = true;
    }
}