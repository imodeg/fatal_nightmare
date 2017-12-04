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
    this.boss;
  }

  preload()
  {

  }

  create()
  {
    this.soundController = new SoundController();
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

    this.visualText = new BitmapTextAnimated(60, 560, 'asdassdasd', 32);
    this.guiGroup.add(this.visualText);
    this.visualText.setNewText('I t i s really dark here', 1000);
    this.visualText.vanishText(4000, 1000);

    this.darkScreen = new Phaser.Sprite(game, 0, 0, 'darkScreen');
    this.darkScreen.fixedToCamera = true;
    this.guiGroup.add(this.darkScreen);
    this.darkScreen.alpha = (GameCfg.itemsArray.length * 12)/100;


    this.finalMusic = game.add.audio('finalMusic');
    this.ambientMusic = game.add.audio('ambient');
    this.ambientMusic.onDecoded.add(
      ()=>
      {
        this.ambientMusic.loopFull(1);
      }, this);
    //this.startMusic.onDecoded.add(
    //  ()=>
    //  {
    //    this.startMusic.loopFull(0.4);
    //    //this.startMusic.fadeIn(2000);
    //  }, this);
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

    this.map.update();
  }

  shutdown()
  {
    this.soundController.kill();
    this.player.stopPlayer();
    this.finalMusic.stop();
    this.ambientMusic.stop();
  }
}

var levelFinalState = new LevelFinalState();
