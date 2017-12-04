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
      this.timer = game.time.events.add(2000,
        () =>
        {
          game.state.start(this.levelStateName);
        }, this);
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
      let wall = game.add.sprite(1686, 2900, '');
      wall.width = 360;
      wall.height = 958;
      game.physics.p2.enable(wall, GameCfg.isDebug);
      wall.body.static = true;

      this.levelState.ambientMusic.stop();
      this.levelState.finalMusic.loopFull(0.4);
      //TODO lay to sleep
    }
  }

  scriptGood()
  {
    console.log('good');
    let tween = game.add.tween(this.levelState.player.cameraFollowObj).to( { x: 300, y: -200 }, 300, Phaser.Easing.Sinusoidal.Out, true, 0);
    this.levelState.visualText.setNewText('Oh kitty! i will get you outa here!', 1000);
    this.levelState.visualText.vanishText(4000, 1000);

    this.timer = game.time.events.add(5500,
      () =>
      {
        game.camera.fade(0x000000, 2000, true);
      }, this);
    this.timer = game.time.events.add(8500,
      () =>
      {
        game.state.start('levelTheEndGood');
      }, this);
  }

  scriptBad()
  {
    console.log('bad');
    this.levelState.player.body.setZeroVelocity();
    let tween = game.add.tween(this.levelState.player.cameraFollowObj).to( { x: 300, y: -200 }, 300, Phaser.Easing.Sinusoidal.Out, true, 0);

    this.levelState.visualText.setNewText('Oh ki tty! i  will get you outa here!', 500);
    this.levelState.visualText.vanishText(3500, 1000);

    game.time.events.add(4500,
      () =>
      {
        this.levelState.visualText.cameraOffset.x += 380;
      }, this);

    this.levelState.visualText.setNewText('Why you get all thi s stuff? Meou?', 5000, true);
    this.levelState.visualText.vanishText(7000, 1000);


    game.time.events.add(7500,
      () =>
      {
        this.levelState.boss.displayObject.state.setAnimation(0, 'kitten_mutation', false);
      }, this);

    this.levelState.visualText.setNewText('get your stuff i f you need i t!', 9000, true);
    this.levelState.visualText.vanishText(11500, 1000);

    game.time.events.add(10500,
      () =>
      {
        this.levelState.gui_ItemsBar.hitPlayer();
      }, this);

    this.levelState.visualText.setNewText('         get all of your staff!', 13500, true);
    this.levelState.visualText.vanishText(15500, 1000);

    game.time.events.add(12000,
      () =>
      {
        this.levelState.boss.displayObject.state.setAnimation(0, 'monster_idle', true);
      }, this);

    game.time.events.add(14000,
      () =>
      {
        //this.levelState.boss.displayObject.state.setAnimation(0, 'monster_idle', true);
        this.levelState.gui_ItemsBar.hitPlayerCell();
      }, this);

    this.levelState.visualText.setNewText('The more you have, the worse  i t i s', 17000, true);
    this.levelState.visualText.vanishText(22500, 1000);

    game.time.events.add(17500,
      () =>
      {
          this.levelState.gui_HealthBar.hitPlayer();

      }, this);

    game.time.events.add(20500,
      () =>
      {
        this.player.setState(this.player.playerState_Idle);
        this.levelState.boss.setState(this.levelState.boss.enemyCatState_Idle);
        game.add.tween(this.levelState.boss.displayObject.scale).to( { x: 0.98, y: 1.02 }, 400, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
      }, this);
  }
}
