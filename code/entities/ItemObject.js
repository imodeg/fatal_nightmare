class ItemObject extends Phaser.Sprite
{
  constructor(levelState, x, y, itemName)
  {
    super(game, x, y, itemName);
    this.levelState = levelState;
    this.itemName = itemName;
    this.player = levelState.player;
    this.anchor.setTo(0.5,0.5);
    //this.angle = -10;

    this.isIntresected = false;
    this.isActive = true;
    let tween = game.add.tween(this).to( { y: this.y-15 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    let tween1 = game.add.tween(this).to( { angle: 25 }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    //tween.start();

    this.particles = game.add.emitter(this.x, this.y, 1);
    this.particles.makeParticles('star', [0], 100, true, true);
    this.particles.minAngle = 0;
    this.particles.maxAngle = 360;
    this.particles.minSpeed = 100;
    this.particles.maxSpeed = 200;
    this.particles.minParticleScale = 0.5;
    this.particles.maxParticleScale = 2;
    this.particles.gravity = 0;
    this.particles.bounce.setTo(0.5, 0.5);
    this.particles.angularDrag = 30;
    this.particles.setAlpha(0.8, 0.0, 900);
    this.particles.setScale(0.8, 0.5, 0.8, 0.1, 900);
    this.particles.start(false, 500, 500);
  }

  update()
  {
    this.isIntresected = Phaser.Rectangle.intersects(this.getBounds(), this.player.displayObject.getBounds());
    if(this.isIntresected && this.isActive)
    {
      this.isActive = false;
      //this.kill();
      this.levelState.gui_ItemsBar.addItem(this.position, this.itemName);
      let tween = game.add.tween(this.scale).to( { x: 2, y: 2 }, 300, Phaser.Easing.Sinusoidal.Out, true, 0);
      let tween1 = game.add.tween(this).to( { alpha: 0 }, 300, Phaser.Easing.Sinusoidal.Out, true, 0);
      tween.onComplete.addOnce(()=>{this.kill();});
      this.particles.kill();
    }
  }
}
