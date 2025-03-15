import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    rocket: Phaser.Physics.Arcade.Image;
    rocketBody: Phaser.Physics.Arcade.Body;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    turnSpeed: number;

    constructor ()
    {
                super('Game');
                this.turnSpeed = 90;
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xffffff);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });

        this.rocket = this.physics.add.image(256, 172, 'rocket');
        this.rocket.setAngle(-90);
        //this.rocket = this.add.triangle(256,172, 0,60,25,0,50,60,0xaaaaaa);
        this.physics.add.existing(this.rocket, false);
        if(this.rocket.body instanceof Phaser.Physics.Arcade.Body)
        {
            this.rocketBody = this.rocket.body;
            this.rocketBody.setBounce(0.2);
            this.rocketBody.setCollideWorldBounds(true);
            this.rocketBody.allowGravity = true;            
            
        }

        if(this.input.keyboard)
            this.cursors = this.input.keyboard?.createCursorKeys();    
    }

    update(_time: number, delta: number) {
        const { left, right, up } = this.cursors;
        let rocketIsIdle = true;

        if (left.isDown)        {
            this.rocketTurnLeft(delta);        
            rocketIsIdle = false;
        }
        else if (right.isDown){
            this.rocketTurnRight(delta);
            rocketIsIdle = false;
        }
        else
            this.rocketNoTurn();

        if (up.isDown){
            this.rocketAccelerate();
            rocketIsIdle = false;
        }

        if(rocketIsIdle)
            this.rocketIdle();
    }

    rocketIdle() {
        this.rocketBody.setVelocityX(0);
        
        //this.rocket.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);
    }

    rocketAccelerate(){
        //this.rocketBody.setVelocityY(-300);
        this.physics.velocityFromRotation(
            Phaser.Math.DegToRad(this.rocketBody.rotation),
            200,
            this.rocketBody.velocity
        );
        
        //this.rocket.setTint(0xffffff, 0xffffff, 0xff0000, 0xff0000)
    }

    rocketTurnLeft(_delta: number) {
        this.rocketBody.setAngularVelocity(this.turnSpeed * -1);
        //this.rocket.setRotation(this.turnSpeed * delta * -1);
        //this.rocket.setTint(0xffffff, 0xffffff, 0xffffff, 0xff0000)
        //this.player.anims.play('left', true);
    }

    rocketTurnRight(_delta: number){
        console.log(this.turnSpeed);
                this.rocketBody.setAngularVelocity(this.turnSpeed);
                //this.rocket.setRotation(this.turnSpeed * delta);
                //this.rocket.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff)
        //this.player.anims.play('right', true);
    }

    rocketNoTurn(){
        this.rocketBody.setAngularVelocity(0);
    }
}
