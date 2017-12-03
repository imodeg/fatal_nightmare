class HealthBar extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    this.fixedToCamera = true;

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
    this.healthBar_line.scale.x = health;
  }

  update()
  {

  }
}
