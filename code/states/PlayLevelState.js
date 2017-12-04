//play level State
class PlayLevelState
{
  constructor()
  {
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
    game.plugins.add(PhaserSpine.SpinePlugin,
      {
        debugRendering: false,
        triangleRendering: true
      });

    //game.load.spine('player', 'CONTENT_SOURCES/PlayerTestExport/PlayerTest.json');
    game.load.spine('player', 'graphics/Player/Player.json');

    game.load.image('healthBar_front', 'graphics/Gui/healthBar_front.png');
    game.load.image('healthBar_flare', 'graphics/Gui/healthBar_flare.png');
    game.load.image('healthBar_line', 'graphics/Gui/healthBar_line.png');
    game.load.image('item_cell', 'graphics/Gui/item_cell.png');

    game.load.spritesheet('blood_1', 'graphics/Elements/blood_1.png', 80, 80);
    game.load.image('catana_back', 'graphics/Elements/catana_back.png');
    game.load.image('catana_front', 'graphics/Elements/catana_front.png');

    game.load.image('item_1', 'graphics/Elements/item_dimond.png');
    game.load.image('item_2', 'graphics/Elements/item_money.png');
    game.load.image('item_3', 'graphics/Elements/item_perfume.png');
    game.load.image('item_4', 'graphics/Elements/item_ring.png');
    game.load.image('item_5', 'graphics/Elements/item_shoes.png');
    game.load.image('item_6', 'graphics/Elements/item_shoes_2.png');
    game.load.image('star', 'graphics/Elements/star.png');

    game.load.image('EnemyTumbler', 'graphics/Monster/EnemyTumbler.png');
    game.load.image('EnemyTumbler_Prt1', 'graphics/Monster/EnemyTumbler_Prt1.png');
    game.load.image('EnemyTumbler_Prt2', 'graphics/Monster/EnemyTumbler_Prt2.png');
    game.load.image('EnemyTumbler_Prt3', 'graphics/Monster/EnemyTumbler_Prt3.png');

    game.load.spine('EnemySpider', 'graphics/Monster/spiderhead_animation.json');

    game.load.json('map', 'levels/Level_final.json');

    game.load.image('graphics/Dirt_01.png', 'levels/graphics/Dirt_01.png');
    game.load.image('graphics/Dirt_02.png', 'levels/graphics/Dirt_02.png');
    game.load.image('graphics/Dirt_03.png', 'levels/graphics/Dirt_03.png');
    game.load.image('graphics/DirtPurp_01.png', 'levels/graphics/DirtPurp_01.png');
    game.load.image('graphics/DirtPurp_02.png', 'levels/graphics/DirtPurp_02.png');
    game.load.image('graphics/Decor01.png', 'levels/graphics/Decor01.png');
    game.load.image('graphics/Decor02.png', 'levels/graphics/Decor02.png');
    game.load.image('graphics/Decor03.png', 'levels/graphics/Decor03.png');
    game.load.image('graphics/Decor04.png', 'levels/graphics/Decor04.png');
    game.load.image('graphics/Decor05.png', 'levels/graphics/Decor05.png');

    game.load.image('graphics/Rock_01.png', 'levels/graphics/Rock_01.png');
    game.load.image('graphics/Rock_02.png', 'levels/graphics/Rock_02.png');
    game.load.image('graphics/Rock_03.png', 'levels/graphics/Rock_03.png');
    game.load.image('graphics/Rock_04.png', 'levels/graphics/Rock_04.png');

    game.load.image('graphics/rock_05.png', 'levels/graphics/rock_05.png');
    game.load.image('graphics/rock_06.png', 'levels/graphics/rock_06.png');
    game.load.image('graphics/rock_07.png', 'levels/graphics/rock_07.png');
    game.load.image('graphics/rock_08.png', 'levels/graphics/rock_08.png');
    game.load.image('graphics/rock_09.png', 'levels/graphics/rock_09.png');
    game.load.image('graphics/rock_10.png', 'levels/graphics/rock_10.png');

    game.load.image('block', 'graphics/block.png');

    game.load.image('BackgroundCloudy', 'graphics/Background/Background_Cloudy.png');
    game.load.image('BackCloud_01', 'graphics/Background/Cloud_01.png');
    game.load.image('BackCloud_02', 'graphics/Background/Cloud_02.png');
    game.load.image('BackCloud_03', 'graphics/Background/Cloud_03.png');


    game.load.image('graphics/bed.png', 'levels/graphics/bed.png');
    game.load.image('graphics/bed2.png', 'levels/graphics/bed2.png');
    game.load.image('graphics/Cabinet.png', 'levels/graphics/Cabinet.png');
    game.load.image('graphics/Commode.png', 'levels/graphics/Commode.png');
    game.load.image('graphics/lamp1.png', 'levels/graphics/lamp1.png');
    game.load.image('graphics/Light1.png', 'levels/graphics/Light1.png');
    game.load.image('graphics/mirror.png', 'levels/graphics/mirror.png');
    game.load.image('graphics/bear_good.png', 'levels/graphics/bear_good.png');
    game.load.image('graphics/bear_evil.png', 'levels/graphics/bear_evil.png');
    game.load.image('graphics/carpet.png', 'levels/graphics/carpet.png');

    game.load.image('graphics/r_01.png', 'levels/graphics/r_01.png');
    game.load.image('graphics/r_02.png', 'levels/graphics/r_02.png');
    game.load.image('graphics/r_03.png', 'levels/graphics/r_03.png');
    game.load.image('graphics/r_04.png', 'levels/graphics/r_04.png');
    game.load.image('graphics/r_05.png', 'levels/graphics/r_05.png');
    game.load.image('graphics/r_06.png', 'levels/graphics/r_06.png');
    game.load.image('graphics/r_07.png', 'levels/graphics/r_07.png');
    game.load.image('graphics/r_08.png', 'levels/graphics/r_08.png');
    game.load.image('graphics/r_09.png', 'levels/graphics/r_09.png');
    game.load.image('graphics/r_10.png', 'levels/graphics/r_10.png');
    game.load.image('graphics/r_11.png', 'levels/graphics/r_11.png');
    game.load.image('graphics/r_12.png', 'levels/graphics/r_12.png');
    game.load.image('graphics/r_13.png', 'levels/graphics/r_13.png');
    game.load.image('graphics/r_14.png', 'levels/graphics/r_14.png');
    game.load.image('graphics/r_15.png', 'levels/graphics/r_15.png');
    game.load.image('graphics/r_16.png', 'levels/graphics/r_16.png');
    game.load.image('graphics/most1.png', 'levels/graphics/most1.png');
    game.load.image('graphics/most2.png', 'levels/graphics/most2.png');
    game.load.image('graphics/most3.png', 'levels/graphics/most3.png');
    game.load.image('graphics/kust1.png', 'levels/graphics/kust1.png');
    game.load.image('graphics/kust2.png', 'levels/graphics/kust2.png');
    game.load.image('graphics/kust3.png', 'levels/graphics/kust3.png');
    game.load.image('graphics/kust4.png', 'levels/graphics/kust4.png');
    game.load.image('graphics/kust_01.png', 'levels/graphics/kust_01.png');
    game.load.image('graphics/kust_02.png', 'levels/graphics/kust_02.png');
    game.load.image('graphics/kust_03.png', 'levels/graphics/kust_03.png');
    game.load.image('graphics/kust_04.png', 'levels/graphics/kust_04.png');
    game.load.image('graphics/Cloud_001.png', 'levels/graphics/Cloud_001.png');
    game.load.image('graphics/Cloud_002.png', 'levels/graphics/Cloud_002.png');
    game.load.image('graphics/back_01.png', 'levels/graphics/back_01.png');
    game.load.image('graphics/back_02.png', 'levels/graphics/back_02.png');
    game.load.image('graphics/back_03.png', 'levels/graphics/back_03.png');
    game.load.image('graphics/back_04.png', 'levels/graphics/back_04.png');

    game.load.image('graphics/3back_11.png', 'levels/graphics/3back_11.png');
    game.load.image('graphics/3back_10.png', 'levels/graphics/3back_10.png');
    game.load.image('graphics/3back_09.png', 'levels/graphics/3back_09.png');
    game.load.image('graphics/3back_08.png', 'levels/graphics/3back_08.png');
    game.load.image('graphics/2back_07.png', 'levels/graphics/2back_07.png');
    game.load.image('graphics/2back_06.png', 'levels/graphics/2back_06.png');
    game.load.image('graphics/2back_05.png', 'levels/graphics/2back_05.png');

    game.load.image('graphics/Tree01.png', 'levels/graphics/Tree01.png');
    game.load.image('graphics/Tree02.png', 'levels/graphics/Tree02.png');
    game.load.image('graphics/Tree03.png', 'levels/graphics/Tree03.png');
    game.load.image('graphics/Tree04.png', 'levels/graphics/Tree04.png');
    game.load.image('graphics/Tree05.png', 'levels/graphics/Tree05.png');
    game.load.image('graphics/Tree06.png', 'levels/graphics/Tree06.png');
    game.load.image('graphics/Tree07.png', 'levels/graphics/Tree07.png');
    game.load.image('graphics/Tree08.png', 'levels/graphics/Tree08.png');
    game.load.image('graphics/Tree09.png', 'levels/graphics/Tree09.png');
    game.load.image('graphics/Tree10.png', 'levels/graphics/Tree10.png');
    game.load.image('graphics/Tree11.png', 'levels/graphics/Tree11.png');
    game.load.image('graphics/tree12.png', 'levels/graphics/tree12.png');

    game.load.image('graphics/tree14.png', 'levels/graphics/tree14.png');
    game.load.image('graphics/tree15.png', 'levels/graphics/tree15.png');
    game.load.image('graphics/tree16.png', 'levels/graphics/tree16.png');
    game.load.image('graphics/tree17.png', 'levels/graphics/tree17.png');
    game.load.image('graphics/treeBig.png', 'levels/graphics/treeBig.png');

    game.load.image('graphics/Gress_01.png', 'levels/graphics/Gress_01.png');
    game.load.image('graphics/Gress_02.png', 'levels/graphics/Gress_02.png');
    game.load.image('graphics/Gress_03.png', 'levels/graphics/Gress_03.png');
    game.load.image('graphics/Gress_04.png', 'levels/graphics/Gress_04.png');
    game.load.image('graphics/Gress_05.png', 'levels/graphics/Gress_05.png');
    game.load.image('graphics/Gress_06.png', 'levels/graphics/Gress_06.png');
    game.load.image('graphics/Gress_07.png', 'levels/graphics/Gress_07.png');
    game.load.image('graphics/eyes.png', 'levels/graphics/eyes.png');

    game.load.image('graphics/darkblock_01.png', 'levels/graphics/darkblock_01.png');
    game.load.image('graphics/darkblock_02.png', 'levels/graphics/darkblock_02.png');
    game.load.image('graphics/darkblock_03.png', 'levels/graphics/darkblock_03.png');
    game.load.image('graphics/darkblock_04.png', 'levels/graphics/darkblock_04.png');
    game.load.image('graphics/darkblock_05.png', 'levels/graphics/darkblock_05.png');
    game.load.image('graphics/darkblock_06.png', 'levels/graphics/darkblock_06.png');
    game.load.image('graphics/darkblock_07.png', 'levels/graphics/darkblock_07.png');
    game.load.image('graphics/darkblock_08.png', 'levels/graphics/darkblock_08.png');
    game.load.image('graphics/darkblock_09.png', 'levels/graphics/darkblock_09.png');
    game.load.image('graphics/darkblock_10.png', 'levels/graphics/darkblock_10.png');
    game.load.image('graphics/darkblock_11.png', 'levels/graphics/darkblock_11.png');

    game.load.image('graphics/ground1.png', 'levels/graphics/ground1.png');
    game.load.image('graphics/ground2.png', 'levels/graphics/ground2.png');
    game.load.image('graphics/ground3.png', 'levels/graphics/ground3.png');

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

    let mapJSON = game.cache.getJSON('map');
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
}

var playLevelState = new PlayLevelState();
