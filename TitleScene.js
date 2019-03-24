class TitleScene extends Phaser.Scene {
    constructor(){
        super({key: 'TitleScene'});
    }

    

    preload() {
        this.load.image('background_image', 'assets/space.jpg');
    }

    create(){
        let background = this.add.sprite(0, 0, 'background_image');
        background.setOrigin(0, 0);

        this.input.manager.enabled = true;  
        this.input.once('pointerdown', function(){
            this.scene.start('main');
        }, this)
    }
}

export default TitleScene;