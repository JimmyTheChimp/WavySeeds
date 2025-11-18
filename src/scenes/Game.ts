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
    map: Phaser.Tilemaps.Tilemap;

    constructor ()
    {
                super('Game');
                this.turnSpeed = 0.15;
    }

    create ()
    {
        const map = this.map = this.add.tilemap('map');
        const tileset = map.addTilesetImage('tileset', 'tiles');
        if(!tileset)
            return;

        map.createLayer('Layer 1', tileset);
        //map.createLayer('Layer 2', tileset);
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
        
        // this.input.addListener('pointerdown', () => {
        //     const clickedTile = map.getTileAtWorldXY(this.input.mousePointer.x,
        //         this.input.mousePointer.y,
        //         false,this.camera);
           
        //         if(!clickedTile)
        //             return;
        //     map.putTileAt(1 , clickedTile.x, clickedTile.y);

        //     // if(this.currentLayer === 1)
        //     //     this.currentLayer = 2;
        //     // else
        //     //     this.currentLayer = 1;

        //     // map.layers[1].visible = (this.currentLayer === 2);
        //     // map.shuffle(3,3,3,3);            
        // });  
       
    }

    update(_time: number, _delta: number) {
       const worldPoint = this.input.activePointer.positionToCamera(this.camera);

       if(!("x" in worldPoint) || !("y" in worldPoint))
        return;

       const pointerTileXY = this.map.worldToTileXY(worldPoint.x, worldPoint.y);

       if(this.input.manager.activePointer.isDown){
        if(pointerTileXY)
            this.map.putTileAt(1, pointerTileXY.x, pointerTileXY.y);
       }
    }

}
