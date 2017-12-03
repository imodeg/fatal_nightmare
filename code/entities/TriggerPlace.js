class TriggerPlace_WinLevel01 extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, 'block');
    this.levelState = levelState;
    this.player = levelState.player;

    this.isIntresected = false;
    this.isActive = true;
  }

  update()
  {
    this.isIntresected = Phaser.Rectangle.intersects(this.getBounds(), this.player.getBounds());
    if(this.isIntresected && this.isActive)
    {
      this.isActive = false;
      this.kill();

      //TODO next level
    }
  }
}
