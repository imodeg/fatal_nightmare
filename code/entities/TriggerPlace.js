class TriggerPlace_Win extends Phaser.Sprite
{
  constructor(levelState, x, y, levelStateName)
  {
    super(game, x, y, '');
    this.levelState = levelState;
    this.player = levelState.player;
    this.levelStateName = levelStateName;
    this.isIntresected = false;
    this.isActive = true;
  }

  update()
  {
    this.isIntresected = Phaser.Rectangle.intersects(this.getBounds(), this.player.displayObject.getBounds());
    if(this.isIntresected && this.isActive)
    {
      this.isActive = false;
      this.levelState.soundController.playerYawn.play();
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


class TriggerPlace_Kill extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    this.levelState = levelState;
    this.player = levelState.player;
    this.isIntresected = false;
    this.isActive = true;
  }

  update()
  {
    this.isIntresected = Phaser.Rectangle.intersects(this.getBounds(), this.player.displayObject.getBounds());
    if(this.isIntresected && this.isActive)
    {
      this.isActive = false;
      this.player.setState(this.player.playerState_Death);

      //game.camera.fade(0x000000, 2000, true, 1);
      //game.camera.onFadeComplete.addOnce(
      //  ()=>
      //  {
      //    game.state.start(this.levelStateName);
      //  });
      this.kill();
      //TODO lay to sleep
    }
  }
}

class TriggerPlace_Finale extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    //this.anchor.setTo(1,1);
    this.scale.setTo(-1,-1);
    this.levelState = levelState;
    this.player = levelState.player;
    this.isIntresected = false;
    this.isActive = false;
  }

  update()
  {
    this.isIntresected = Phaser.Rectangle.intersects(this.getBounds(), this.player.displayObject.getBounds());
    //this.isIntresected = this.getBounds().contains(this.player.x, this.player.y);
    if(this.isIntresected && this.isActive)
    {
      this.isActive = false;

      this.player.setState(this.player.playerState_Empty);
      this.player.displayObject.state.setAnimation(0, 'Idle', true);
      this.kill();
      if(GameCfg.itemsArray.length > 0)
      {
        this.scriptBad();
      }
      else
      {
        this.scriptGood();
      }
      //TODO lay to sleep
    }
  }

  scriptGood()
  {
    console.log('good');
    let tween = game.add.tween(this.levelState.player.cameraFollowObj).to( { x: 300, y: -200 }, 300, Phaser.Easing.Sinusoidal.Out, true, 0);
    this.levelState.visualText.setNewText('Oh kitty! i will get you outa here!', 1000);
    this.levelState.visualText.vanishText(4000, 1000);
  }

  scriptBad()
  {
    console.log('bad');
    this.levelState.player.body.setZeroVelocity();
    let tween = game.add.tween(this.levelState.player.cameraFollowObj).to( { x: 300, y: -200 }, 300, Phaser.Easing.Sinusoidal.Out, true, 0);

    this.levelState.visualText.setNewText('Oh ki tty! i  will get you outa here!', 500);
    this.levelState.visualText.vanishText(2500, 1000);

    game.time.events.add(3500,
      () =>
      {
        this.levelState.visualText.cameraOffset.x += 400;
      }, this);

    this.levelState.visualText.setNewText('Why you get all thi s stuff? Meou?', 4000, true);
    this.levelState.visualText.vanishText(6000, 1000);


    game.time.events.add(6500,
      () =>
      {
        this.levelState.boss.displayObject.state.setAnimation(0, 'kitten_mutation', false);
      }, this);

    this.levelState.visualText.setNewText('get your stuff i f you need i t!', 8000, true);
    this.levelState.visualText.vanishText(9500, 1000);

    game.time.events.add(8500,
      () =>
      {
        this.levelState.gui_ItemsBar.hitPlayer();
      }, this);

    this.levelState.visualText.setNewText('         get all of your staff!', 11500, true);
    this.levelState.visualText.vanishText(13500, 1000);

    game.time.events.add(12000,
      () =>
      {
        this.levelState.gui_ItemsBar.hitPlayerCell();
      }, this);

    this.levelState.visualText.setNewText('The more you have, the worse i t i s', 14000, true);
    this.levelState.visualText.vanishText(16000, 1000);

    game.time.events.add(14500,
      () =>
      {
          this.levelState.gui_HealthBar.hitPlayer();
      }, this);
  }
}
