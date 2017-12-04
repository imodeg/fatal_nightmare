class TriggerPlace_Win extends Phaser.Sprite
{
  constructor(levelState, x, y, levelStateName)
  {
    super(game, x, y, '');
    this.levelState = levelState;
    this.player = levelState.player;
    this.levelStateName = levelStateName
    this.isIntresected = false;
    this.isActive = true;
  }

  update()
  {
    this.isIntresected = Phaser.Rectangle.intersects(this.getBounds(), this.player.displayObject.getBounds());
    if(this.isIntresected && this.isActive)
    {
      this.isActive = false;

      this.player.setState(this.player.playerState_Empty);
      this.player.displayObject.state.setAnimation(0, 'Sleep', false);

      game.camera.fade(0x000000, 2000, true, 1);
      game.camera.onFadeComplete.addOnce(
        ()=>
        {
          game.state.start(this.levelStateName);
        });
      this.kill();
      //TODO lay to sleep
    }
  }
}
