class Weapon_Katana extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, 'catana_back');
    this.levelState = levelState;
    this.player = levelState.player;

    this.anchor.setTo(0.5, 1);
    this.katanaImage = new Phaser.Sprite(game, 0, 0, 'catana_front');
    this.katanaImage.anchor.setTo(0.5, 1);
    this.addChild(this.katanaImage);

    this.isIntresected = false;
    this.isActive = true;
  }

  update()
  {
    this.isIntresected = Phaser.Rectangle.intersects(this.getBounds(), this.player.getBounds());
    if(this.isIntresected && this.isActive)
    {
      this.isActive = false;
      game.time.events.add(1200,
        () =>
        {
          this.katanaImage.kill();
        }, this);
      this.player.giveWeapon();
    }
  }
}
