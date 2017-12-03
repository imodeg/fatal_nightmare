class Player extends Phaser.Sprite
{
  constructor(levelState, x, y, armored = false)
  {
    super(game, x, y, '');
    this.levelState = levelState;

    this.maxHealth = 100;
    this.health = 100;

    this.cameraFollowObj = new Phaser.Image(game, 0, -110, '');
    this.addChild(this.cameraFollowObj);
    game.camera.follow(this.cameraFollowObj , Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    game.camera.x = this.x - (GameCfg.width/2);
    game.camera.y = this.y - (GameCfg.height/2);

    game.physics.p2.enable(this, GameCfg.isDebug);

    this.body.clearShapes();
    this.bottomContactShape = this.body.addCircle(25, 0, -20, 0); //bottom floor collide shape
    this.body.setMaterial(this.levelState.physMaterials.floorContactMaterial, this.bottomContactShape);

    this.isOnGround = false;
    //this.body.setMaterial(this.levelState.physMaterials.floorContactMaterial, this.bottomContactShapeFix);

    this.mainBodyShape = this.body.addRectangle(50, 100, 0, -70, 0); //main body shape

    //this.kickContactShape = this.body.addRectangle(20, 20, 0, -60, 0); //kick collide shape
    this.kickContactShape = this.body.addCircle(15, 0, -60, 0);
    this.kickContactShape.sensor = true;
    this.body.setMaterial(this.levelState.physMaterials.kickMaterial, this.kickContactShape);

    //this.body.addCapsule(100, 20, 0, -70, Math.PI/2);
    this.body.fixedRotation = true;
    this.body.mass = 100;
    //display spine sprite

    this.displayObject = new PhaserSpine.Spine(game, 0, 0, 'player');
    this.displayObject.state.setAnimation(0, 'Idle', true);
    this.addChild(this.displayObject);

    this.isArmed = false;
    if(armored)
    {
      this.isArmed = true;
      this.displayObject.skeleton.setSkinByName('Katana');
    }
    //this.displayObject.skeleton.setSkinByName('Katana');

    this.dirrection = 'right'; // or 'left'

    this.onPressLeft = new Phaser.Signal();
    this.onReleaseLeft = new Phaser.Signal();
    this.isDownLeft = false;

    this.onPressRight = new Phaser.Signal();
    this.onReleaseRight = new Phaser.Signal();
    this.isDownRight = false;

    this.onPressJump = new Phaser.Signal();
    this.onReleaseJump = new Phaser.Signal();
    //this.isDownJump = false;

    this.onPressKick = new Phaser.Signal();
    this.onReleaseKick = new Phaser.Signal();

    this.onContactGround = new Phaser.Signal();
    this.onContactEndGround = new Phaser.Signal();

    this.initKeys();

    this.playerState_Empty = new PlayerStateBase(this);
    this.playerState_Idle = new PlayerStateIdle(this);
    this.playerState_Run = new PlayerStateRun(this);
    this.playerState_Jump = new PlayerStateJump(this);
    this.playerState_Fall = new PlayerStateFall(this);
    this.playerState_Hit = new PlayerStateHit(this);

    this.playerState_KickWeapon_01 = new PlayerStateKickWeapon_01(this);
    this.playerState_KickWeapon_02 = new PlayerStateKickWeapon_02(this);
    this.playerState_KickWeapon_03 = new PlayerStateKickWeapon_03(this);


    this.state = this.playerState_Idle;
    this.setState(this.playerState_Idle);

    this.body.onBeginContact.add(this.contactStart, this);
    this.body.onEndContact.add(this.contactEnd, this);
  }



  hit(damage, enemy)
  {
    game.camera.flash(0xBB0000, 500, true, 0.2);

    this.health -= damage;
    this.levelState.gui_HealthBar.setHealth(this.health);

    this.setState(this.playerState_Hit);
    if(enemy.x > this.x)
    {
      this.displayObject.scale.setTo(1, 1);
      this.body.moveLeft(400);
      this.body.moveUp(300);
    }
    else
    {
      this.displayObject.scale.setTo(-1, 1);
      this.body.moveRight(400);
      this.body.moveUp(300);
    }
  }

  contactEnd (body, bodyB, shapeA, shapeB)
  {
    if(shapeA == this.bottomContactShape && shapeB.sensor == false)
    {
      this.onContactEndGround.dispatch(); //signal if contact floor
    }
  }

  contactStart (body, bodyB, shapeA, shapeB, equation)
  {
    if(shapeA == this.bottomContactShape && shapeB.sensor == false)
    {
      this.onContactGround.dispatch(); //signal if contact floor
    }

    if(shapeA == this.kickContactShape && bodyB.parent.entityType) //kick collision
    {
      //console.log(bodyB);
      switch (bodyB.parent.entityType)
      {
        case 'Enemy_Tumbler':
          if (shapeB.sensor == false)
          {this.state.hitEntity(bodyB)}
        case 'Enemy_Spider':
          if (shapeB.sensor == false)
          {this.state.hitEntity(bodyB)}
        default:
          break;
      }
    }

    if(shapeA == this.mainBodyShape && shapeB.sensor == true) //kick collision
    {
      switch (bodyB.parent.entityType)
      {
        case 'Enemy_Tumbler':

        case 'Enemy_Spider':
            this.hit(5, bodyB.parent.sprite);
        default:
          break;
      }
    }
    //console.log(body);
    //console.log(bodyB);
    //console.log(equation);
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
    this.onPressLeft.removeAll();
    this.onReleaseLeft.removeAll();
    this.onPressRight.removeAll();
    this.onReleaseRight.removeAll();

    this.onPressJump.removeAll();
    this.onReleaseJump.removeAll();
    this.onPressKick.removeAll();
    this.onReleaseKick.removeAll();

    this.onContactGround.removeAll();
    this.onContactEndGround.removeAll();
  }

  giveWeapon()
  {
    this.isArmed = true;
    this.setState(this.playerState_Empty);
    this.displayObject.state.setAnimation(0, 'TakeWeapon', false);
    //this.displayObject.skeleton.setSkinByName('Katana');

    game.time.events.add(200,
      () =>
      {
        this.displayObject.skeleton.setSkinByName('Katana');
      }, this);

    game.time.events.add(2200,
      () =>
      {
        this.setState(this.playerState_Idle);
      }, this);
  }

  update()
  {
    this.displayObject.update();
    this.state.update();

    if(this.state.isMovable == true)
    {
      if (this.isDownLeft)
      {
        this.body.moveLeft(300);
      }
      else if (this.isDownRight)
      {
        this.body.moveRight(300);
      }
    }
  }

  initKeys()
  {
    game.input.gamepad.start();
    let pad = game.input.gamepad.pad1;
    pad.addCallbacks(this, { onConnect: this.initGamepad });

    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture
    ([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR,
      Phaser.Keyboard.Z,
      Phaser.Keyboard.X,
      Phaser.Keyboard.C
    ]);

    let key_moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    key_moveLeft.onDown.add(
      ()=>
      {
        this.isDownLeft = true;
        this.onPressLeft.dispatch();
      });
    key_moveLeft.onUp.add(
      ()=>
      {
        this.isDownLeft = false;
        this.onReleaseLeft.dispatch();
      });

    let key_moveRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    key_moveRight.onDown.add(
      ()=>
      {
        this.isDownRight = true;
        this.onPressRight.dispatch();
      });
    key_moveRight.onUp.add(
      ()=>
      {
        this.isDownRight = false;
        this.onReleaseRight.dispatch();
      });

    let key_jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    key_jump.onDown.add(()=>{ this.onPressJump.dispatch(); });
    key_jump.onUp.add(()=>{ this.onReleaseJump.dispatch(); });

    let key_kick = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    key_kick.onDown.add(()=>{ this.onPressKick.dispatch(); });
    key_kick.onUp.add(()=>{ this.onReleaseKick.dispatch(); });
  }

  initGamepad()
  {
    let pad = game.input.gamepad.pad1;

    let keyPad_moveLeft = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
    keyPad_moveLeft.onDown.add(
      ()=>
      {
        this.isDownLeft = true;
        this.onPressLeft.dispatch();
      });
    keyPad_moveLeft.onUp.add(
      ()=>
      {
        this.isDownLeft = false;
        this.onReleaseLeft.dispatch();
      });

    let keyPad_moveRight = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
    keyPad_moveRight.onDown.add(
      ()=>
      {
        this.isDownRight = true;
        this.onPressRight.dispatch();
      });
    keyPad_moveRight.onUp.add(
      ()=>
      {
        this.isDownRight = false;
        this.onReleaseRight.dispatch();
      });

    let keyPad_jump = pad.getButton(Phaser.Gamepad.XBOX360_A);
    keyPad_jump.onDown.add(()=>{ this.onPressJump.dispatch(); });
    keyPad_jump.onUp.add(()=>{ this.onReleaseJump.dispatch(); });

    let keyPad_kick = pad.getButton(Phaser.Gamepad.XBOX360_X);
    keyPad_kick.onDown.add(()=>{ this.onPressKick.dispatch(); });
    keyPad_kick.onUp.add(()=>{ this.onReleaseKick.dispatch(); });
  }
}
