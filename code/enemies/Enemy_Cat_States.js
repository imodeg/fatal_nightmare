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


class Enemy_CatStateIdle extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
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


class Enemy_CatStateKick extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timerSetIdle = null;
    this.timer = null;
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'kitten_idle', false);

    this.monster.levelState.layerEntities.add(new Enemy_Cat_Bullet(this.monster.levelState, this.monster.x, this.monster.y-80));

    this.timer = game.time.events.add(3000,
      () =>
      {
        this.monster.setState(this.monster.enemyCatState_Kick);
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
    this.monster.displayObject.state.setAnimation(0, 'kitten_idle', false);
    this.timer = game.time.events.add(600,
      () =>
      {
        this.monster.setState(this.monster.enemyCatState_Idle);
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

class Enemy_CatStateDeath extends Enemy_CatStateBase
{
  constructor(monster)
  {
    super(monster);
    this.timer = null;
  }

  start()
  {
    this.monster.displayObject.state.setAnimation(0, 'kitten_idle', false);
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
