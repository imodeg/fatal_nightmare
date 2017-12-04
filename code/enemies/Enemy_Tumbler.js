class Enemy_Tumbler extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    this.levelState = levelState;

    this.health = 15;

    this.displayObject = new Phaser.Image(game, 0, 5, 'EnemyTumbler');
    this.displayObject.anchor.setTo(0.5, 1);
    this.addChild(this.displayObject);

    game.physics.p2.enable(this, GameCfg.isDebug);
    this.body.clearShapes();

    this.bottomContactShape = this.body.addCircle(20, 0, -16, 0); //bottom floor collide shape
    this.body.setMaterial(this.levelState.physMaterials.floorContactMaterialTumbler, this.bottomContactShape);

    this.mainBodyShape = this.body.addRectangle(50, 100, 0, -70, 0); //main body shape
    this.body.setMaterial(this.levelState.physMaterials.mainBodyMaterial, this.mainBodyShape);
    this.body.entityType = 'Enemy_Tumbler';

    this.body.mass = 20;

    this.partsArray = [];

    for(let i = 0; i < 4; i++)
    {
      let RndomScale = (game.rnd.integerInRange(8, 12))/10;
      let imgKey = 'EnemyTumbler_Prt';
      imgKey += game.rnd.integerInRange(1, 2);
      let clawPart1 = game.add.sprite(this.x + 50, this.y - 20, imgKey);
      clawPart1.anchor.setTo(0.5, 0);
      clawPart1.scale.setTo(RndomScale,RndomScale);
      game.physics.p2.enable(clawPart1, GameCfg.isDebug);
      clawPart1.body.mass = 0.1;
      clawPart1.body.data.gravityScale = 2;
      clawPart1.body.clearShapes();
      let clawShape = clawPart1.body.addRectangle(10, 80, 0, -10, 0);
      clawPart1.body.setMaterial(this.levelState.physMaterials.freeMaterial, clawShape);

      let constraint = game.physics.p2.createRevoluteConstraint(clawPart1, [0, -(clawPart1.height/2)], this, [-10 + (5*i), -130], 20000);

      let part = {};
      part.object = clawPart1;
      part.constraint = constraint;
      this.partsArray.push(part);
    }

    this.particles = game.add.emitter(this.x, this.y-40, 1);
    this.particles.makeParticles('blood_1', [0,1,2], 10, true, true);
    this.particles.minAngle = 180;
    this.particles.maxAngle = 360;
    this.particles.minSpeed = 300;
    this.particles.maxSpeed = 600;
    this.particles.minParticleScale = 0.5;
    this.particles.maxParticleScale = 2;
    this.particles.gravity = 1500;
    this.particles.bounce.setTo(0.5, 0.5);
    this.particles.angularDrag = 30;
    this.particles.setAlpha(0.8, 0.0, 900);
    this.particles.setScale(0.8, 0.1, 0.8, 0.1, 500);
    //particles.start(true, 500, 600, 100);
  }

  hit(damage)
  {

    this.health -= damage;
    this.particles.x = this.x;
    this.particles.y = this.y-40;
    this.particles.start(true, 500, 600, 100);
    if(this.health <= 0)
    {
      game.physics.p2.removeConstraint(this.partsArray[0].constraint);
      game.physics.p2.removeConstraint(this.partsArray[1].constraint);
      game.physics.p2.removeConstraint(this.partsArray[2].constraint);
      game.physics.p2.removeConstraint(this.partsArray[3].constraint);

      this.partsArray[0].object.body.applyImpulse([0,2], 0, 0);
      this.partsArray[1].object.body.applyImpulse([0,2], 0, 0);
      this.partsArray[2].object.body.applyImpulse([0,2], 0, 0);
      this.partsArray[3].object.body.applyImpulse([0,2], 0, 0);
      this.kill();

      /*
      //blood particles
      let particles = game.add.emitter(this.x, this.y-40, 1);
      particles.makeParticles('blood_1', [0,1,2], 10, true, true);
      particles.minAngle = 180;
      particles.maxAngle = 360;
      particles.minSpeed = 300;
      particles.maxSpeed = 600;
      particles.minParticleScale = 0.5;
      particles.maxParticleScale = 2;
      particles.gravity = 1500;
      particles.bounce.setTo(0.5, 0.5);
      particles.angularDrag = 30;
      particles.setAlpha(0.8, 0.0, 900);
      particles.setScale(0.8, 0.1, 0.8, 0.1, 500);
      particles.start(true, 500, 600, 100);*/
    }
  }

  update()
  {
    if(Phaser.Point.distance(this.position, this.levelState.player.position) < 500)
    {
      if(this.levelState.player.body.x > this.body.x)
      {
        this.body.moveRight(50);
      }
      else
      {
        this.body.moveLeft(50);
      }
    }
  }
}
