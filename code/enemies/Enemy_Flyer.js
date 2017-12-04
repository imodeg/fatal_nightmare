class Enemy_Flyer extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    this.levelState = levelState;

    this.health = 14;
    this.alive = true;

    game.physics.p2.enable(this, GameCfg.isDebug);
    this.body.clearShapes();

    //this.bottomContactShape = this.body.addCircle(20, 0, -16, 0); //bottom floor collide shape
    //this.body.setMaterial(this.levelState.physMaterials.floorContactMaterial, this.bottomContactShape);

    this.mainBodyShape = this.body.addRectangle(140, 150, 0, -90, 0); //main body shape
    this.body.setMaterial(this.levelState.physMaterials.mainBodyMaterial, this.mainBodyShape);
    this.body.entityType = 'Enemy_Flyer';

    //this.kickContactShape = this.body.addCircle(15, 0, -60, 0);
    //this.kickContactShape.sensor = true;
    //this.body.setMaterial(this.levelState.physMaterials.kickMaterial, this.kickContactShape);


    this.body.fixedRotation = true;
    this.body.mass = 500;
    this.body.data.gravityScale = 0;
    this.body.damping = 0.9;

    this.displayObject = new PhaserSpine.Spine(game, 0, 0, 'EnemyFlyer');
    this.displayObject.state.setAnimation(0, 'idle_fly', true);
    this.displayObject.skeleton.setSkinByName('healthy');
    this.addChild(this.displayObject);

    this.dirrection = 'right';


    this.enemyFlyerState_Run = new Enemy_FlyerStateRun(this);
    this.enemyFlyerState_Empty = new Enemy_FlyerStateBase(this);
    this.enemyFlyerState_Idle = new Enemy_FlyerStateIdle(this);
    this.enemyFlyerState_Kick = new Enemy_FlyerStateKick(this);
    this.enemyFlyerState_Hit = new Enemy_FlyerStateHit(this);
    this.enemyFlyerState_Death = new Enemy_FlyerStateDeath(this);

    this.state = this.enemyFlyerState_Idle;
    this.setState(this.enemyFlyerState_Idle);
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
      this.setState(this.enemyFlyerState_Hit);
      if(this.health < 8 && this.health > 0)
      {
        this.displayObject.skeleton.setSkinByName('damaged');
      }
      if(this.health <= 0)
      {
        this.alive = false;
        this.setState(this.enemyFlyerState_Death);
      }
    }
  }

  update()
  {
    this.displayObject.update();
    this.state.update();
    //console.log(Phaser.Point.distance(this.position, this.levelState.player.position));
  }
}

class Enemy_Flyer_Bullet extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, 'enemyBullet');
    this.levelState = levelState;

    game.physics.p2.enable(this, GameCfg.isDebug);
    this.body.clearShapes();

    this.kickContactShape = this.body.addCircle(30, 0, 0, 0);
    this.kickContactShape.sensor = true;
    this.body.setMaterial(this.levelState.physMaterials.kickMaterial, this.kickContactShape);
    this.body.entityType = 'Enemy_Flyer_Bullet';
  }

  update()
  {
    if(this.levelState.player.body.x > this.body.x)
    {
      this.body.moveRight(300);
    }
    else
    {
      this.body.moveLeft(300);
    }

    if(this.levelState.player.body.y > this.body.y+80)
    {
      this.body.moveDown(300);
    }
    else
    {
      this.body.moveUp(300);
    }
    let point = new Phaser.Point(this.x, this.y);
    let bodies = game.physics.p2.hitTest(point, [ this.levelState.layerCollision.children[0].body ]);
    if (bodies.length)
    {
      this.destroyBullet();
    }
  }

  destroyBullet()
  {
    this.kill();
    this.body.clearShapes();
  }
}
