class Enemy_CatStateBase
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


class Enemy_CatStateIdleCat extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timer = null;
  }

  start()
  {
    this.clearHitShape();
    this.monster.displayObject.state.setAnimation(0, 'kitten_idle', true);
  }

  update()
  {
    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) < 900)
    {

    }
  }

  clear()
  {

  }
}

class Enemy_CatStateIdle extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timer = null;
  }

  start()
  {
    this.clearHitShape();
    this.monster.displayObject.state.setAnimation(0, 'monster_idle', true);
    let genereteTime = game.rnd.integerInRange(500, 900);
    let genereteNum = game.rnd.integerInRange(1, 2);
    if(genereteNum == 1)
    {
      this.timer = game.time.events.add(genereteTime,
        () =>
        {
          this.monster.setState(this.monster.enemyCatState_KickLow);
        }, this);
    }
    else
    {
      this.timer = game.time.events.add(genereteTime,
        () =>
        {
          this.monster.setState(this.monster.enemyCatState_KickHigh);
        }, this);
    }
  }

  update()
  {
    if(Phaser.Point.distance(this.monster.position, this.monster.levelState.player.position) < 900)
    {

    }
  }

  clear()
  {
    game.time.events.remove(this.timer);
  }
}

class Enemy_CatStateKickLow extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timerSetIdle = null;
    this.timer = null;
    this.timerSetHitShape = null;
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'attack_low', false);

    this.timer = game.time.events.add(1500,
      () =>
      {
        this.monster.setState(this.monster.enemyCatState_Idle);
      }, this);


    this.timerSetHitShape = game.time.events.add(100,
      () =>
      {
          this.monster.kickContactShape.position[0] = 24;
          this.monster.kickContactShape.position[1] = -5;
          this.monster.kickContactShape.radius = 13;
          this.monster.body.shapeChanged();
      }, this);
  }

  update()
  {

  }

  clear()
  {
    this.clearHitShape();
    game.time.events.remove(this.timer);
    game.time.events.remove(this.timerSetIdle);
    game.time.events.remove(this.timerSetHitShape);

  }
}

class Enemy_CatStateKickHigh extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timerSetIdle = null;
    this.timer = null;
    this.timerSetHitShape = null;
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'attack_high', false);

    this.timer = game.time.events.add(1500,
      () =>
      {
        this.monster.setState(this.monster.enemyCatState_Idle);
      }, this);

    this.timerSetHitShape = game.time.events.add(100,
      () =>
      {
          this.monster.kickContactShape.position[0] = 24;
          this.monster.kickContactShape.position[1] = 25;
          this.monster.kickContactShape.radius = 10;
          this.monster.body.shapeChanged();
      }, this);
  }

  update()
  {

  }

  clear()
  {
    this.clearHitShape();
    game.time.events.remove(this.timer);
    game.time.events.remove(this.timerSetIdle);
      game.time.events.remove(this.timerSetHitShape);
  }
}

class Enemy_CatStateHit extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timer = null;
  }

  start()
  {
    console.log(this.monster.health)
    this.monster.displayObject.state.setAnimation(0, 'damage', false);
    this.timer = game.time.events.add(600,
      () =>
      {
        this.monster.setState(this.monster.enemyCatState_Idle);
      });
    let genereteNum = game.rnd.integerInRange(1, 2);
    if(genereteNum == 1)
    {
      this.monster.levelState.player.body.moveLeft(1200);
    }
  }

  update()
  {

  }

  clear()
  {
    game.time.events.remove(this.timer);
  }

}

class Enemy_CatStateDeath extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timer = null;
  }

  start()
  {
    this.monster.levelState.soundController.boss_death.play();
    this.monster.displayObject.state.setAnimation(0, 'death', false);

      this.monster.levelState.visualText.setNewText('i t i s not good', 500);
      this.monster.levelState.visualText.vanishText(2500, 1000);

    this.timer = game.time.events.add(5500,
      () =>
      {
        game.camera.fade(0x000000, 2000, true);
      }, this);
    this.timer = game.time.events.add(8500,
      () =>
      {
        game.state.start('levelTheEndBed');
      }, this);
  }

  update()
  {

  }

  clear()
  {
  }
}
