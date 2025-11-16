import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    turnSpeed: number;
    controls: Phaser.Cameras.Controls.SmoothedKeyControl;
    currentLayer: integer;

    constructor ()
    {
                super('Game');
                this.turnSpeed = 0.15;
    }

    create ()
    {
        const map = this.add.tilemap('map');
        const tileset = map.addTilesetImage('tileset', 'tiles');
        if(!tileset)
            return;

        map.createLayer('Layer 1', tileset);
        map.createLayer('Layer 2', tileset);
        this.currentLayer = 1;        

        if(!this.input.keyboard)
            return;
        
        this.cursors = this.input.keyboard.createCursorKeys();  

        this.camera = this.cameras.main;
        this.camera.setZoom(2);
        this.camera.centerOn(200,100);

        const cursors = this.cursors;
        const controlConfig = {
                camera: this.cameras.main,
                left: cursors.left,
                right: cursors.right,
                up: cursors.up,
                down: cursors.down,
                acceleration: 0.02,
                drag: 0.0005,
                maxSpeed: 0.7
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        
        this.input.addListener('pointerdown', () => {
            if(this.currentLayer === 1)
                this.currentLayer = 2;
            else
                this.currentLayer = 1;

            map.layers[1].visible = (this.currentLayer === 2);
            map.shuffle(3,3,3,3);            
        });  
       
    }

    update(_time: number, _delta: number) {
       
    }

}
