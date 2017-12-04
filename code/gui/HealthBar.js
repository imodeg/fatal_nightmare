class HealthBar extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    this.fixedToCamera = true;
    this.levelState = levelState;

    this.healthBar_line = new Phaser.Sprite(game, 0, 0, 'healthBar_line');
    this.addChild(this.healthBar_line);

    //this.healthBar_line.scale.x = 0.5;

    this.healthBar_front = new Phaser.Sprite(game, -4, -11, 'healthBar_front');
    this.addChild(this.healthBar_front);

    //his
    //(character.health / character.maxHealth) * healthbar.width;
    //game.load.image('healthBar_front', 'graphics/Gui/healthBar_front.png');
    //game.load.image('healthBar_flare', 'graphics/Gui/healthBar_flare.png');
    //game.load.image('healthBar_line', 'graphics/Gui/healthBar_line.png');
  }

  setHealth(health)
  {
    health = health/100;
    if(health < 0)
    {
      health = 0;
    }
    this.healthBar_line.scale.x = health;
  }

  hitPlayer()
  {
    let playerPosX = this.levelState.player.x - this.x;
    let playerPosY = this.levelState.player.y - this.y-40;
    let tween1 = game.add.tween(this.healthBar_front.anchor).to( { x: 0.2, y: 0.5}, 400, Phaser.Easing.Sinusoidal.InOut, true)

    let tween2 = game.add.tween(this.healthBar_front).to( { angle: 80}, 700, Phaser.Easing.Sinusoidal.InOut, false)
                                                     .to( { angle: 60}, 700, Phaser.Easing.Sinusoidal.InOut, true);


    let tween3 = game.add.tween(this.healthBar_front).to( { x: playerPosX, y: playerPosY}, 700, Phaser.Easing.Sinusoidal.In, true, 1400);
    tween3.onComplete.addOnce(
      ()=>
      {
        this.levelState.player.hitStatic(1);
        this.healthBar_front.kill();
      });
  }

  update()
  {

  }
}
