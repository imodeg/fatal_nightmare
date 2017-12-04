//play level State
class LevelFinalState extends Phaser.State
{
  constructor()
  {
    super();
    this.layerBackground;
    this.layerBack;
    this.layerEntities;
    this.layerFront;
    this.layerCollision;

    this.map;
    this.physMaterials;
    this.player;

    this.gui_HealthBar;
  }

  preload()
  {

  }

  create()
  {
    game.stage.disableVisibilityChange = true;
    game.physics.startSystem(Phaser.Physics.P2JS);
    this.physMaterials = new PhysMaterials();
    game.physics.p2.gravity.y = 1000;

    this.layerBackground = game.add.group();

    let backgroundImage = new Phaser.Image(game, 0, 0, 'BackgroundCloudy');
    backgroundImage.fixedToCamera = true;
    this.layerBackground.add(backgroundImage);

    this.layerCollision = game.add.group();
    this.layerBack_Parallax_03 = game.add.group();
    this.layerBack_Parallax_02 = game.add.group();
    this.layerBack_Parallax_01 = game.add.group();
    this.layerBack = game.add.group();
    this.layerEntities = game.add.group();
    this.layerFront = game.add.group();
    this.layerFront_Parallax_03 = game.add.group();
    this.layerFront_Parallax_02 = game.add.group();
    this.layerFront_Parallax_01 = game.add.group();
    this.guiGroup = game.add.group();

    let mapJSON = game.cache.getJSON('mapFinal');
    this.map = new Map(mapJSON, this);
    this.map.initLevel();

    this.layerEntities.swap(this.player, this.layerEntities.children[this.layerEntities.children.length-1]); //make player front

    //gui
    this.gui_HealthBar = new HealthBar(this, 20, 20);
    this.guiGroup.add(this.gui_HealthBar);

    this.gui_ItemsBar = new ItemsBar(this, GameCfg.width-30, 30);
    this.guiGroup.add(this.gui_ItemsBar);

    this.fade = game.add.graphics(0, 0);
    this.fade.fixedToCamera = true;
    this.fadeOut();

    let text = new BitmapTextAnimated(60, 580, 'asdassdasd', 32);
    this.guiGroup.add(text);
    //text.setNewText('loooolllllllllllllllllllllllllll',500, true);
    //text.setNewText('ddsdsdsd',2500, false);
    //text.setNewText('loooolllllllllllllllllllllllllll',4500, true);
    //let text = game.add.bitmapText(200, 100, 'mainfont','Bitmap Fonts!',32);

    /*
    var box = game.add.sprite(1000, 200, 'block');
    game.physics.p2.enable(box);
    box.body.mass = 10;
    box.body.setMaterial(this.physMaterials.objectsMaterial);
    */
    //temp add to editor
    //BackCloud_01
    //let delay = 0;
    //for (var i = 0; i < 50; i++)
    //{
    //    //game.add.sprite(game.world.randomX, game.world.randomY, 'BackCloud_01');
    //    let cloudNum = game.rnd.integerInRange(1, 3);
    //    let imgKey = 'BackCloud_0' + cloudNum;
    //    let cloudObj = this.layerBackground.create(-800, game.world.randomY/3, imgKey);

    //    game.add.tween(cloudObj).to({ x: 1900 }, 50000, Phaser.Easing.Linear.InOut, true, delay, 1000, false);
    //    delay += 20000;
    //}
  }

  fadeOut()
  {
    this.fade.clear();
    this.fade.beginFill(0x000000, 1);
    //graphics.drawCircle(470, 200, 200);
    this.fade.drawRect(0, 0, GameCfg.width, GameCfg.height);
    this.fade.endFill();
    let tween = game.add.tween(this.fade).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.Out, true);
    tween.start();
  }

  update()
  {
    if(this.layerFront_Parallax_01.parallaxSpeed)
    {
      this.layerFront_Parallax_01.x = (game.camera.x/10) * this.layerFront_Parallax_01.parallaxSpeed;
      this.layerFront_Parallax_01.y = (game.camera.y/10) * this.layerFront_Parallax_01.parallaxSpeed;
    }

    if(this.layerFront_Parallax_02.parallaxSpeed)
    {
      this.layerFront_Parallax_02.x = (game.camera.x/10) * this.layerFront_Parallax_02.parallaxSpeed;
      this.layerFront_Parallax_02.y = (game.camera.y/10) * this.layerFront_Parallax_02.parallaxSpeed;
    }

    if(this.layerFront_Parallax_03.parallaxSpeed)
    {
      this.layerFront_Parallax_03.x = (game.camera.x/10) * this.layerFront_Parallax_03.parallaxSpeed;
      this.layerFront_Parallax_03.y = (game.camera.y/10) * this.layerFront_Parallax_03.parallaxSpeed;
    }

    if(this.layerBack_Parallax_01.parallaxSpeed)
    {
      this.layerBack_Parallax_01.x = (game.camera.x/10) * this.layerBack_Parallax_01.parallaxSpeed;
      this.layerBack_Parallax_01.y = (game.camera.y/10) * this.layerBack_Parallax_01.parallaxSpeed;
    }

    if(this.layerBack_Parallax_02.parallaxSpeed)
    {
      this.layerBack_Parallax_02.x = (game.camera.x/10) * this.layerBack_Parallax_02.parallaxSpeed;
      this.layerBack_Parallax_02.y = (game.camera.y/10) * this.layerBack_Parallax_02.parallaxSpeed;
    }

    if(this.layerBack_Parallax_03.parallaxSpeed)
    {
      this.layerBack_Parallax_03.x = (game.camera.x/10) * this.layerBack_Parallax_03.parallaxSpeed;
      this.layerBack_Parallax_03.y = (game.camera.y/10) * this.layerBack_Parallax_03.parallaxSpeed;
    }
  }

  shutdown()
  {
    this.player.stopPlayer();
  }
}

var levelFinalState = new LevelFinalState();