class Enemy_Spider extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    this.levelState = levelState;

    this.health = 20;
    this.alive = true;

    game.physics.p2.enable(this, GameCfg.isDebug);
    this.body.clearShapes();

    this.bottomContactShape = this.body.addCircle(20, 0, -16, 0); //bottom floor collide shape
    this.body.setMaterial(this.levelState.physMaterials.floorContactMaterial, this.bottomContactShape);

    this.mainBodyShape = this.body.addRectangle(140, 150, 0, -90, 0); //main body shape
    this.body.setMaterial(this.levelState.physMaterials.mainBodyMaterial, this.mainBodyShape);
    this.body.entityType = 'Enemy_Spider';

    console.log(this.mainBodyShape);
    this.kickContactShape = this.body.addCircle(15, 0, -60, 0);
    this.kickContactShape.sensor = true;
    this.body.setMaterial(this.levelState.physMaterials.kickMaterial, this.kickContactShape);


    this.body.fixedRotation = true;
    this.body.mass = 500;

    this.displayObject = new PhaserSpine.Spine(game, 0, 0, 'EnemySpider');
    this.displayObject.state.setAnimation(0, 'idle1', true);
    this.displayObject.skeleton.setSkinByName('healthy');
    this.addChild(this.displayObject);

    this.dirrection = 'right';


    this.enemySpiderState_Run = new Enemy_SpiderStateRun(this);
    this.enemySpiderState_Empty = new Enemy_SpiderStateBase(this);
    this.enemySpiderState_Idle = new Enemy_SpiderStateIdle(this);
    this.enemySpiderState_Kick = new Enemy_SpiderStateKick(this);
    this.enemySpiderState_Hit = new Enemy_SpiderStateHit(this);
    this.enemySpiderState_Death = new Enemy_SpiderStateDeath(this);
    //this.enemySpiderState_Jump = new PlayerStateJump(this);
    //this.enemySpiderState_Fall = new PlayerStateFall(this);

    //this.enemySpiderState_KickWeapon_01 = new PlayerStateKickWeapon_01(this);
    //this.enemySpiderState_KickWeapon_02 = new PlayerStateKickWeapon_02(this);
    //this.enemySpiderState_KickWeapon_03 = new PlayerStateKickWeapon_03(this);


    this.state = this.enemySpiderState_Idle;
    this.setState(this.enemySpiderState_Idle);
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
      this.setState(this.enemySpiderState_Hit);
      if(this.health < 8 && this.health > 0)
      {
        this.displayObject.skeleton.setSkinByName('damaged');
      }
      if(this.health <= 0)
      {
        this.alive = false;
        this.setState(this.enemySpiderState_Death);
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
