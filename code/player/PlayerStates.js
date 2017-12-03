class PlayerStateBase
{
  constructor(player)
  {
    this.player = player;
    this.isMovable = false;
  }

  start()
  {

  }

  hitEntity(entityBody)
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
      this.player.kickContactShape.position[0] = 0;
      this.player.kickContactShape.position[1] = 3.5;
      this.player.kickContactShape.radius = 0.5;
      this.player.body.shapeChanged();
  }
}

class PlayerStateIdle
{
  constructor(player)
  {
    this.player = player;
    this.isMovable = false;
    this.timer = null;
  }

  start()
  {
    this.player.displayObject.state.setAnimation(0, 'Idle', true);


    this.player.onPressRight.addOnce(
      ()=>
      {
        this.player.dirrection = 'right';
        this.player.setState(this.player.playerState_Run);
      });

    this.player.onPressLeft.addOnce(
      ()=>
      {
        this.player.dirrection = 'left';
        this.player.setState(this.player.playerState_Run);
      });

    this.player.onPressJump.addOnce(
      ()=>
      {
        this.player.setState(this.player.playerState_Jump);
      });


    this.player.onPressKick.addOnce(
      ()=>
      {
        if(this.player.isArmed)
        {
          this.player.setState(this.player.playerState_KickWeapon_01);
        }
      });

    if (this.player.isDownLeft)
    {
      this.player.dirrection = 'left';
      this.player.setState(this.player.playerState_Run);
    }
    else if (this.player.isDownRight)
    {
      this.player.dirrection = 'right';
      this.player.setState(this.player.playerState_Run);
    }


    this.endContactTest();
  }

  endContactTest()
  {
    this.player.onContactEndGround.addOnce(
      ()=>
      {
        this.timer = game.time.events.add(300,
          () =>
          {
            let point = new Phaser.Point(this.player.x, this.player.y+8);
            let bodies = game.physics.p2.hitTest(point, [ this.player.levelState.layerCollision.children[0].body ]);
            if (bodies.length)
            {
              this.endContactTest();
              //this.player.setState(this.player.playerState_Idle);
            }
            else
            {
              this.player.setState(this.player.playerState_Fall);
            }
          }, this);

        this.player.onContactGround.addOnce(
          ()=>
          {
            this.endContactTest();
            game.time.events.remove(this.timer);
          });
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

class PlayerStateRun
{
  constructor(player)
  {
    this.player = player;
    this.isMovable = true;
  }

  start()
  {
    this.player.displayObject.state.setAnimation(0, 'Run', true);

    this.player.onPressJump.addOnce(
      ()=>
      {
        this.player.setState(this.player.playerState_Jump);
      });

    if(this.player.dirrection == 'right')
    {
      this.player.displayObject.scale.x = 1;

      this.player.onReleaseRight.addOnce(
        ()=>
        {
          this.player.setState(this.player.playerState_Idle);
        });
    }
    else
    {
      this.player.displayObject.scale.x = -1;

      this.player.onReleaseLeft.addOnce(
        ()=>
        {
          this.player.setState(this.player.playerState_Idle);
        });
    }

    this.player.onPressKick.addOnce(
      ()=>
      {
        if(this.player.isArmed)
        {
          this.player.setState(this.player.playerState_KickWeapon_01);
        }
      });

    this.endContactTest();
  }

  endContactTest()
  {
    this.player.onContactEndGround.addOnce(
      ()=>
      {
        this.timer = game.time.events.add(300,
          () =>
          {
            let point = new Phaser.Point(this.player.x, this.player.y+8);
            let bodies = game.physics.p2.hitTest(point, [ this.player.levelState.layerCollision.children[0].body ]);
            if (bodies.length)
            {
              this.endContactTest();
              //this.player.setState(this.player.playerState_Idle);
            }
            else
            {
              this.player.setState(this.player.playerState_Fall);
            }
          }, this);

        this.player.onContactGround.addOnce(
          ()=>
          {
            this.endContactTest();
            game.time.events.remove(this.timer);
          });
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

class PlayerStateJump
{
  constructor(player)
  {
    this.player = player;
    this.isMovable = true;
  }

  start()
  {
    this.player.displayObject.state.setAnimation(0, 'JumpStart', false);

    this.player.onPressRight.add(
      ()=>
      {
        this.player.dirrection = 'right';
        this.player.displayObject.scale.x = 1;
      });

    this.player.onPressLeft.add(
      ()=>
      {
        this.player.dirrection = 'left';
        this.player.displayObject.scale.x = -1;
      });

    this.timerKick = game.time.events.add(300,
      () =>
      {
        this.player.onPressKick.addOnce(
          ()=>
          {
            if(this.player.isArmed)
            {
              this.player.setState(this.player.playerState_KickWeapon_03);
            }
          });
      }, this);


    this.player.onPressJump.addOnce(
      ()=>
      {
        this.player.displayObject.state.setAnimation(0, 'JumpStart', false);
        this.player.body.moveUp(600);
      });


    this.player.onContactGround.add(
      ()=>
      {
        this.player.setState(this.player.playerState_Idle);
      });

    this.player.body.moveUp(500);
  }

  update()
  {

  }

  clear()
  {

  }
}

class PlayerStateFall
{
  constructor(player)
  {
    this.player = player;
    this.isMovable = true;
    this.timer = null;
  }

  start()
  {
    this.player.displayObject.state.setAnimation(0, 'Fall', false);

    this.player.onPressRight.add(
      ()=>
      {
        this.player.dirrection = 'right';
        this.player.displayObject.scale.x = 1;
      });

    this.player.onPressLeft.add(
      ()=>
      {
        this.player.dirrection = 'left';
        this.player.displayObject.scale.x = -1;
      });

    this.player.onContactGround.add(
      ()=>
      {
        this.player.setState(this.player.playerState_Idle);
      });
  }

  update()
  {
    //let point = new Phaser.Point(this.player.x, this.player.y+8);
    //let bodies = game.physics.p2.hitTest(point, [ this.player.levelState.layerCollision.children[0].body ]);
    //console.log(bodies);
    //if (bodies.length)
    //{
    //  this.player.setState(this.player.playerState_Idle);
    //}
  }

  clear()
  {
    game.time.events.remove(this.timer);
  }
}

class PlayerStateKickWeapon_01 extends PlayerStateBase
{
  constructor(player)
  {
    super(player);
    this.isMovable = false;

    this.timer = null;
    this.timerClearHitShape = null;
    this.timerKick = null;
  }

  start()
  {
    this.timer = game.time.events.add(500,
      () =>
      {
        this.player.setState(this.player.playerState_Idle);
      }, this);

    this.player.displayObject.state.setAnimation(0, 'KickWeapon_01', false);

    this.timerKick = game.time.events.add(150,
      () =>
      {
        this.player.onPressKick.addOnce(
          ()=>
          {
            this.player.setState(this.player.playerState_KickWeapon_02);
          });
      }, this);


    if(this.player.dirrection == 'right')
    {
      this.player.kickContactShape.position[0] = -5;
      this.player.kickContactShape.radius = 2;
    }
    else
    {
      this.player.kickContactShape.position[0] = 5;
      this.player.kickContactShape.radius = 2;
    }
    this.player.body.shapeChanged();

    this.timerClearHitShape = game.time.events.add(100,
      () =>
      {
        this.clearHitShape();
      }, this);
  }

  hitEntity(entityBody)
  {
    let entity = entityBody.parent.sprite;
    if(this.player.dirrection == 'right')
    { //entityBody.parent.applyImpulse([-150,1000], 0, 0);
      entityBody.parent.moveRight(600);}
    else
    { entityBody.parent.moveLeft(600);}
    entity.hit(2);
  }

  update()
  {

  }

  clear()
  {
    //this.timer.removeAll();
    game.time.events.remove(this.timer);
    game.time.events.remove(this.timerClearHitShape);
    game.time.events.remove(this.timerKick);

    this.clearHitShape();
  }
}


class PlayerStateKickWeapon_02 extends PlayerStateBase
{
  constructor(player)
  {
    super(player);
    this.isMovable = false;

    this.timer = null;
    this.timerClearHitShape = null;
    this.timerKick = null;
  }

  start()
  {
    this.timer = game.time.events.add(120,
      () =>
      {
        if(this.player.dirrection == 'right')
        {
          this.player.body.moveRight(100);
        }
        else
        {
          this.player.body.moveLeft(100);
        }
        this.player.body.moveUp(500);
      }, this);

    this.timer = game.time.events.add(500,
      () =>
      {
        this.player.setState(this.player.playerState_Idle);
      }, this);

    this.player.displayObject.state.setAnimation(0, 'KickWeapon_02', false);

    this.timerKick = game.time.events.add(300,
      () =>
      {
        this.player.onPressKick.addOnce(
          ()=>
          {

            this.player.setState(this.player.playerState_KickWeapon_03);
          });
      }, this);


    if(this.player.dirrection == 'right')
    {
      this.player.kickContactShape.position[0] = -5;
      this.player.kickContactShape.position[1] = 4;
      this.player.kickContactShape.radius = 2;
    }
    else
    {
      this.player.kickContactShape.position[0] = 5;
      this.player.kickContactShape.position[1] = 4;
      this.player.kickContactShape.radius = 2;
    }
    this.player.body.shapeChanged();

    this.timerClearHitShape = game.time.events.add(100,
      () =>
      {
        this.clearHitShape();
      }, this);
  }

  hitEntity(entityBody)
  {
    let entity = entityBody.parent.sprite;
    this.timer = game.time.events.add(120,
      () =>
      {
        entity.hit(2);
        entityBody.parent.applyImpulse([0,600], 0, 0);
      }, this);
  }

  update()
  {

  }

  clear()
  {
    //this.timer.removeAll();
    game.time.events.remove(this.timer);
    game.time.events.remove(this.timerKick);
    game.time.events.remove(this.timerClearHitShape);
    this.clearHitShape();
  }
}


class PlayerStateKickWeapon_03 extends PlayerStateBase
{
  constructor(player)
  {
    super(player);
    this.isMovable = false;

    this.timer = null;
    this.timerKick = null;
  }

  start()
  {
    this.timer = game.time.events.add(200,
      () =>
      {
        if(this.player.dirrection == 'right')
        {
          this.player.body.moveRight(100);
        }
        else
        {
          this.player.body.moveLeft(100);
        }
        this.player.body.moveDown(700);
      });

    this.timer = game.time.events.add(600,
      () =>
      {
        this.player.setState(this.player.playerState_Idle);
      }, this);

    this.player.displayObject.state.setAnimation(0, 'KickWeapon_03', false);


    if(this.player.dirrection == 'right')
    {
      this.player.kickContactShape.position[0] = -4.5;
      this.player.kickContactShape.position[1] = 1;
      this.player.kickContactShape.radius = 2;
    }
    else
    {
      this.player.kickContactShape.position[0] = 4.5;
      this.player.kickContactShape.position[1] = 1;
      this.player.kickContactShape.radius = 2;
    }
    this.player.body.shapeChanged();
  }

  hitEntity(entityBody)
  {
    let entity = entityBody.parent.sprite;
    this.timer = game.time.events.add(120,
      () =>
      {
        entity.hit(2);
        entityBody.parent.applyImpulse([0,-800], 0, 0);
      }, this);
  }

  update()
  {

  }

  clear()
  {
    //this.timer.removeAll();
    game.time.events.remove(this.timer);
    game.time.events.remove(this.timerKick);

    this.clearHitShape();
  }
}

class PlayerStateHit
{
  constructor(player)
  {
    this.player = player;
    this.isMovable = false;
    this.timer = null;
  }

  start()
  {
    this.player.displayObject.state.setAnimation(0, 'Hit', false);
    //this.player.body.moveLeft(300);
    this.timer = game.time.events.add(500,
      () =>
      {
        this.player.setState(this.player.playerState_Idle);
      }, this);
  }

  update()
  {

  }

  clear()
  {
    game.time.events.remove(this.timer);
  }
}
