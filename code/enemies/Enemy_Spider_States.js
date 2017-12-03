class Enemy_SpiderStateBase
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


class Enemy_SpiderStateIdle extends Enemy_SpiderStateBase
{
  constructor(monster)
  {
    super(monster);
  }

  start()
  {
    this.clearHitShape();
    this.monster.displayObject.state.setAnimation(0, 'idle1', true);
  }

  update()
  {
    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) < 500)
    {
      this.monster.setState(this.monster.enemySpiderState_Run);
    }
  }

  clear()
  {

  }
}

class Enemy_SpiderStateRun extends Enemy_SpiderStateBase
{
  constructor(monster)
  {
    super(monster);
  }

  start()
  {
    this.clearHitShape();
    this.monster.displayObject.state.setAnimation(0, 'walk', true);
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
    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) < 500)
    {
      if(this.monster.levelState.player.body.x > this.monster.body.x)
      {
        this.monster.body.moveRight(300);
      }
      else
      {
        this.monster.body.moveLeft(300);
      }
    }
    else
    {
      this.monster.setState(this.monster.enemySpiderState_Idle);
    }

    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) < 220)
    {
      this.monster.setState(this.monster.enemySpiderState_Kick);
    }
  }

  clear()
  {

  }
}


class Enemy_SpiderStateKick extends Enemy_SpiderStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timerClearHitShape = null;
    this.timerSetHitShape = null;
    this.timer = null;
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'attack', false);
    console.log('1111');

    this.timerSetHitShape = game.time.events.add(200,
      () =>
      {
        if(this.monster.displayObject.scale.x == -1)
        {
          this.monster.kickContactShape.position[0] = -6.5;
          this.monster.kickContactShape.position[1] = 4;
          this.monster.kickContactShape.radius = 3;
        }
        else
        {
          this.monster.kickContactShape.position[0] = 6.5;
          this.monster.kickContactShape.position[1] = 4;
          this.monster.kickContactShape.radius = 3;
        }
      }, this);

    this.monster.body.shapeChanged();
    this.timerClearHitShape = game.time.events.add(300,
      () =>
      {
        this.clearHitShape();
      }, this);

    this.timer = game.time.events.add(1000,
      () =>
      {
        this.monster.setState(this.monster.enemySpiderState_Kick);
      }, this);
  }

  update()
  {
    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) >220)
    {
      this.monster.setState(this.monster.enemySpiderState_Run);
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
    game.time.events.remove(this.timer);
    game.time.events.remove(this.timerClearHitShape);
    game.time.events.remove(this.timerSetHitShape);
  }
}

class Enemy_SpiderStateHit extends Enemy_SpiderStateBase
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
        this.monster.setState(this.monster.enemySpiderState_Idle);
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

class Enemy_SpiderStateDeath extends Enemy_SpiderStateBase
{
  constructor(monster)
  {
    super(monster);
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'death', false);
    this.deathShapeApply();

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
  }
}
