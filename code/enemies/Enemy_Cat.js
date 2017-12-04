class Enemy_Cat extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    this.levelState = levelState;

    this.health = 60;
    this.alive = true;

    game.physics.p2.enable(this, GameCfg.isDebug);
    this.body.clearShapes();

    this.mainBodyShape = this.body.addRectangle(500, 400, -40, -230, 0); //main body shape
    //this.mainBodyShape = this.body.addCircle(0, 0, -100, 0);
    this.body.setMaterial(this.levelState.physMaterials.floorContactMaterial, this.mainBodyShape);
    this.body.entityType = 'Enemy_Cat';

    this.kickContactShape = this.body.addCircle(15, 0, -60, 0);
    this.kickContactShape.sensor = true;
    this.body.setMaterial(this.levelState.physMaterials.kickMaterial, this.kickContactShape);


    this.body.fixedRotation = true;
    this.body.mass = 100000;
    this.body.damping = 0.9;
    //this.body.static = true;

    this.displayObject = new PhaserSpine.Spine(game, 0, 0, 'EnemyCat');
    this.displayObject.state.setAnimation(0, 'kitten_idle', true);
    this.displayObject.skeleton.setSkinByName('healthy');
    this.addChild(this.displayObject);

    this.dirrection = 'right';

    this.enemyCatState_Empty = new Enemy_CatStateBase(this);
    this.enemyCatState_Idle = new Enemy_CatStateIdle(this);
    this.enemyCatState_IdleCat = new Enemy_CatStateIdleCat(this);
    this.enemyCatState_KickLow = new Enemy_CatStateKickLow(this);
    this.enemyCatState_KickHigh = new Enemy_CatStateKickHigh(this);
    this.enemyCatState_Hit = new Enemy_CatStateHit(this);
    this.enemyCatState_Death = new Enemy_CatStateDeath(this);

    this.state = this.enemyCatState_IdleCat;
    this.setState(this.enemyCatState_IdleCat);
  }

  setState(state)
  {
    this.state.clear();
    this.clearKeysSignals();
    this.state = state;
    this.state.start();
  }

  clearKeysSignals()
  {

  }

  hit(damage)
  {
    if(this.alive )
    {
      this.health -= damage;
      this.setState(this.enemyCatState_Hit);
      if(this.health < 20 && this.health > 0)
      {
        this.displayObject.skeleton.setSkinByName('damaged');
      }
      if(this.health <= 0)
      {
        this.alive = false;
        this.setState(this.enemyCatState_Death);
      }
    }
  }

  update()
  {
    this.displayObject.update();
    this.state.update();
    this.body.moveDown(500);
  }
}
