class Enemy_FlyerStateBase
{
  constructor(monster)
  {
    this.monster = monster;
  }

  start()
  {

  }

  update()
  {

  }

  clear()
  {

  }

  clearHitShape()
  {
      this.monster.kickContactShape.position[0] = 0;
      this.monster.kickContactShape.position[1] = 3.5;
      this.monster.kickContactShape.radius = 0.5;
      this.monster.body.shapeChanged();
  }
}


class Enemy_FlyerStateIdle extends Enemy_FlyerStateBase
{
  constructor(monster)
  {
    super(monster);
  }

  start()
  {
    this.clearHitShape();
    this.monster.displayObject.state.setAnimation(0, 'idle_fly', true);
  }

  update()
  {
    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) < 900)
    {
      this.monster.setState(this.monster.enemyFlyerState_Run);
    }
  }

  clear()
  {

  }
}

class Enemy_FlyerStateRun extends Enemy_FlyerStateBase
{
  constructor(monster)
  {
    super(monster);
  }

  start()
  {
    this.clearHitShape();
    this.monster.displayObject.state.setAnimation(0, 'idle_fly', true);
    if(this.monster.levelState.player.body.x > this.monster.body.x)
    {
      this.monster.displayObject.scale.setTo(-1,1);
    }
    else
    {
      this.monster.displayObject.scale.setTo(1,1);
    }
  }

  update()
  {
    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) < 900)
    {
      if(this.monster.levelState.player.body.x > this.monster.body.x)
      {
        this.monster.body.moveRight(200);
      }
      else
      {
        this.monster.body.moveLeft(200);
      }
    }
    else
    {
      this.monster.setState(this.monster.enemyFlyerState_Idle);
    }

    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) < 400)
    {
      this.monster.setState(this.monster.enemyFlyerState_Kick);
    }

    if(((this.monster.levelState.player.body.y - this.monster.body.y) < -200))  //&& ((this.monster.levelState.player.body.y - this.monster.body.y) > -100)
    {
      this.monster.body.moveUp(300);
    }
    else if(((this.monster.levelState.player.body.y - this.monster.body.y) > 200)) //&&((this.monster.levelState.player.body.y - this.monster.body.y) < 100)
    {
      this.monster.body.moveDown(300);
    }
  }

  clear()
  {

  }
}


class Enemy_FlyerStateKick extends Enemy_FlyerStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timerSetIdle = null;
    this.timer = null;
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'attack', false);

    this.monster.levelState.layerEntities.add(new Enemy_Flyer_Bullet(this.monster.levelState, this.monster.x, this.monster.y-80));


    this.timerSetIdle = game.time.events.add(2000,
      () =>
      {
        this.monster.displayObject.state.setAnimation(0, 'idle_fly', true);
      }, this);

    this.timer = game.time.events.add(3000,
      () =>
      {
        this.monster.setState(this.monster.enemyFlyerState_Kick);
      }, this);
  }

  update()
  {
    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) >400)
    {
      this.monster.setState(this.monster.enemyFlyerState_Run);
    }

    if(Math.abs(this.monster.levelState.player.body.x - this.monster.body.x) < 50)
    {
      if(this.monster.levelState.player.body.x > this.monster.body.x)
      {
        this.monster.displayObject.scale.setTo(-1,1);
      }
      else
      {
        this.monster.displayObject.scale.setTo(1,1);
      }
    }
  }

  clear()
  {
    this.clearHitShape();
    game.time.events.remove(this.timer);
    game.time.events.remove(this.timerSetIdle);
  }
}

class Enemy_FlyerStateHit extends Enemy_FlyerStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timer = null;
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'damage', false);
    this.timer = game.time.events.add(600,
      () =>
      {
        this.monster.setState(this.monster.enemyFlyerState_Idle);
      });
  }

  update()
  {

  }

  clear()
  {
    game.time.events.remove(this.timer);
  }

}

class Enemy_FlyerStateDeath extends Enemy_FlyerStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timer = null;
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'death', false);
    this.timer = game.time.events.add(200,
      () =>
      {
        this.deathShapeApply();
      });

  }

  update()
  {

  }

  clear()
  {
  }

  deathShapeApply()
  {
    this.monster.body.clearShapes();
    this.monster.mainBodyShape = this.monster.body.addRectangle(10, 10, 0, 0, 0); //main body shape
    this.monster.body.data.gravityScale = 2;
  }
}
