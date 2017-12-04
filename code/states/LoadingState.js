class LoadingState extends Phaser.State
{
  constructor()
  {
    super();
  }

  preload()
  {
    game.stage.disableVisibilityChange = true;
    game.plugins.add(PhaserSpine.SpinePlugin,
      {
        debugRendering: false,
        triangleRendering: true
      });
    game.load.image('loadingBar', 'graphics/Gui/LoadingBar.png');
    game.load.image('logo', 'graphics/Gui/logo.png');
    game.load.image('mainBack', 'graphics/Gui/MainBack.png');
    game.load.audio('menuMusic', 'audio/menuMusic.mp3');
    game.load.image('EnemyGhost', 'graphics/Monster/Enemy_Ghost.png');
  }

  create()
  {
    game.stage.backgroundColor = '#330000'; //TODO black
    let backImage =  game.add.sprite(0, 640, 'mainBack');
    backImage.anchor.y = 1;

    let logo =  game.add.sprite(GameCfg.width/2, 20, 'logo');
    logo.anchor.setTo(0.5,0);
    logo.angle = -5;
    let tween = game.add.tween(logo).to( { angle: 5 }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

    this.startMusic = game.add.audio('menuMusic');
    //this.startMusic.play();
    this.startMusic.onDecoded.add(
      ()=>
      {
        this.startMusic.fadeIn(2000);
      }, this);


    this.addGhost();

    this.progressBar =  game.add.sprite(220, 380, 'loadingBar');
    game.load.onLoadStart.add(this.loadStart, this);
    game.load.onFileComplete.add(this.fileComplete, this);
    game.load.onLoadComplete.add(this.loadComplete, this);

    this.startLoad();
  }

  addGhost()
  {
    this.ghostMonster =  game.add.sprite(920, 700, 'EnemyGhost');
    this.ghostMonster.scale.setTo(-1,1);
    this.ghostMonster.anchor.setTo(0.5,1);
    this.ghostMonster.alpha = 0;
    this.animateGhost();
    let tween = game.add.tween(this.ghostMonster).to( { angle: 5 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

  }

  animateGhost()
  {
    let startTime = game.rnd.integerInRange(1000, 8000);
    game.time.events.add(startTime,
      ()=>
      {
        let tween = game.add.tween(this.ghostMonster).to( { alpha: 0.5 }, game.rnd.integerInRange(20, 200), Phaser.Easing.Sinusoidal.InOut, false)
                                                     .to( { alpha: 0 }, game.rnd.integerInRange(20, 200), Phaser.Easing.Sinusoidal.InOut, false)
                                                     .to( { alpha: 1 }, game.rnd.integerInRange(20, 200), Phaser.Easing.Sinusoidal.InOut, false)
                                                     .to( { alpha: 0 }, game.rnd.integerInRange(20, 200), Phaser.Easing.Sinusoidal.InOut, false)
                                                     .to( { alpha: 0.2 }, game.rnd.integerInRange(20, 400), Phaser.Easing.Sinusoidal.InOut, false)
                                                     .to( { alpha: 0 }, game.rnd.integerInRange(20, 400), Phaser.Easing.Sinusoidal.InOut, true);
          tween.onComplete.add(()=>
            {
              this.animateGhost();
            });
      }, this);
  }

  startLoad()
  {
    game.load.spine('player', 'graphics/Player/Player.json');

    game.load.spritesheet('start_button', 'graphics/Gui/startButton.png', 327, 84);
    game.load.image('controls_img', 'graphics/Gui/controlsImg.png');

    game.load.image('healthBar_front', 'graphics/Gui/healthBar_front.png');
    game.load.image('healthBar_flare', 'graphics/Gui/healthBar_flare.png');
    game.load.image('healthBar_line', 'graphics/Gui/healthBar_line.png');
    game.load.image('item_cell', 'graphics/Gui/item_cell.png');
    game.load.bitmapFont('mainfont', 'graphics/Gui/ludumFont_0.png', 'graphics/Gui/ludumFont.xml');
    game.load.image('darkScreen', 'graphics/Gui/darkScreen.png');

    game.load.spritesheet('blood_1', 'graphics/Elements/blood_1.png', 80, 80);
    game.load.image('catana_back', 'graphics/Elements/catana_back.png');
    game.load.image('catana_front', 'graphics/Elements/catana_front.png');

    game.load.image('item_1', 'graphics/Elements/item_dimond.png');
    game.load.image('item_2', 'graphics/Elements/item_money.png');
    game.load.image('item_3', 'graphics/Elements/item_perfume.png');
    game.load.image('item_4', 'graphics/Elements/item_ring.png');
    game.load.image('item_5', 'graphics/Elements/item_shoes.png');
    game.load.image('item_6', 'graphics/Elements/item_shoes_2.png');
    game.load.image('item_7', 'graphics/Elements/item_purse.png');
    game.load.image('item_8', 'graphics/Elements/item_pendant.png');
    game.load.image('star', 'graphics/Elements/star.png');

    game.load.image('EnemyTumbler', 'graphics/Monster/EnemyTumbler.png');
    game.load.image('EnemyTumbler_Prt1', 'graphics/Monster/EnemyTumbler_Prt1.png');
    game.load.image('EnemyTumbler_Prt2', 'graphics/Monster/EnemyTumbler_Prt2.png');
    game.load.image('EnemyTumbler_Prt3', 'graphics/Monster/EnemyTumbler_Prt3.png');

    game.load.spine('EnemySpider', 'graphics/Monster/spiderhead_animation.json');
    game.load.spine('EnemyFlyer', 'graphics/Monster/goblinsmall.json');
    game.load.spine('EnemyCat', 'graphics/Monster/Enemy_Cat.json');
    game.load.image('enemyBullet', 'graphics/Monster/enemyBullet.png');

    //game.load.json('map', 'levels/Level_final.json');
    game.load.json('map01', 'levels/Level_01.json');
    game.load.json('map02', 'levels/Level_02.json');
    game.load.json('map03', 'levels/Level_03.json');
    game.load.json('mapFinal', 'levels/Level_final.json');
    game.load.json('mapBed', 'levels/Level_TheEndBed.json');


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
    game.load.image('Background_lvl2', 'graphics/Background/Background_lvl2.png');
    game.load.image('Background_lvl3', 'graphics/Background/Background_lvl3.png');
    game.load.image('BackCloud_01', 'graphics/Background/Cloud_01.png');
    game.load.image('BackCloud_02', 'graphics/Background/Cloud_02.png');
    game.load.image('BackCloud_03', 'graphics/Background/Cloud_03.png');


    game.load.image('graphics/bed.png', 'levels/graphics/bed.png');
    game.load.image('graphics/bed2.png', 'levels/graphics/bed2.png');
    game.load.image('graphics/BadShadow.png', 'levels/graphics/BadShadow.png');
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

    game.load.image('graphics/3lvl_2back_06.png', 'levels/graphics/3lvl_2back_06.png');
    game.load.image('graphics/3lvl_2back_07.png', 'levels/graphics/3lvl_2back_07.png');
    game.load.image('graphics/3lvl_3back_08.png', 'levels/graphics/3lvl_3back_08.png');
    game.load.image('graphics/3lvl_3back_09.png', 'levels/graphics/3lvl_3back_09.png');
    game.load.image('graphics/3lvl_3back_10.png', 'levels/graphics/3lvl_3back_10.png');
    game.load.image('graphics/3lvl_3back_11.png', 'levels/graphics/3lvl_3back_11.png');
    game.load.image('graphics/3lvl_back_01.png', 'levels/graphics/3lvl_back_01.png');
    game.load.image('graphics/3lvl_back_02.png', 'levels/graphics/3lvl_back_02.png');
    game.load.image('graphics/3lvl_back_03.png', 'levels/graphics/3lvl_back_03.png');
    game.load.image('graphics/3lvl_back_04.png', 'levels/graphics/3lvl_back_04.png');
    game.load.image('graphics/3lvl_most1.png', 'levels/graphics/3lvl_most1.png');
    game.load.image('graphics/3lvl_most2.png', 'levels/graphics/3lvl_most2.png');
    game.load.image('graphics/3lvl_most3.png', 'levels/graphics/3lvl_most3.png');
    game.load.image('graphics/3lvl_2back_05.png', 'levels/graphics/3lvl_2back_05.png');
    game.load.image('graphics/badface01.png', 'levels/graphics/badface01.png');
    game.load.image('graphics/eye3.png', 'levels/graphics/eye3.png');
    game.load.image('graphics/eye.png', 'levels/graphics/eye.png');

    game.load.image('graphics/item_dimond.png', 'levels/graphics/item_dimond.png');
    game.load.image('graphics/item_money.png', 'levels/graphics/item_money.png');
    game.load.image('graphics/item_perfume.png', 'levels/graphics/item_perfume.png');
    game.load.image('graphics/item_ring.png', 'levels/graphics/item_ring.png');
    game.load.image('graphics/item_shoes.png', 'levels/graphics/item_shoes.png');
    game.load.image('graphics/item_shoes_2.png', 'levels/graphics/item_shoes_2.png');

    game.load.image('graphics/ground1.png', 'levels/graphics/ground1.png');
    game.load.image('graphics/ground2.png', 'levels/graphics/ground2.png');
    game.load.image('graphics/ground3.png', 'levels/graphics/ground3.png');

    game.load.audio('finalMusic', 'audio/finalMusic.mp3');
    game.load.audio('startGameSfx', 'audio/startGame.mp3');
    game.load.audio('hit01Sfx', 'audio/hit01.mp3');
    game.load.audio('hit02Sfx', 'audio/hit01.mp3');
    game.load.audio('swordSwing01Sfx', 'audio/swordSwing01.mp3');
    game.load.audio('swordSwing02Sfx', 'audio/swordSwing02.mp3');
    game.load.audio('takeItemSfx', 'audio/takeItem.mp3');
    game.load.audio('monsterDeathSfx', 'audio/monsterDeath.mp3');

    game.load.audio('playerJump01Sfx', 'audio/PlayerJump01.mp3');
    game.load.audio('playerJump02Sfx', 'audio/PlayerJump02.mp3');
    game.load.audio('playerHit01Sfx', 'audio/PlayerHit01.mp3');
    game.load.audio('playerHit02Sfx', 'audio/PlayerHit02.mp3');
    game.load.audio('playerYawnSfx', 'audio/PlayerYawn.mp3');
    game.load.audio('playerTakeWeaponSfx', 'audio/takeWeapon.mp3');

    game.load.start();
  }

  loadStart()
  {
	   //text.setText("Loading ...");
  }


  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles)
  {

    this.progressBar.scale.x = (progress/100);
  	//text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
  }

  loadComplete()
  {
    game.add.tween(this.progressBar).to( { alpha: 0 }, 700, Phaser.Easing.Sinusoidal.InOut, true);

    this.startButton = game.add.button(GameCfg.width/2, GameCfg.height/2, 'start_button', this.actionOnClick, this, 1, 2, 2);
    this.startButton.alpha = 0;
    this.startButton.anchor.setTo(0.5,0.5);
    game.add.tween(this.startButton).to( { alpha: 1.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 500);

    let controlsImg =  game.add.sprite(20, 380, 'controls_img');
    controlsImg.alpha = 0;
    game.add.tween(controlsImg).to( { alpha: 0.5 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 500);
  }

  actionOnClick()
  {
    this.startMusic.fadeOut(1400);
    let startfx = game.add.audio('startGameSfx');
    startfx.play();
    this.startButton.inputEnabled = false;
    game.camera.flash(0xBB0000, 500, true, 0.8);
    game.camera.onFlashComplete.addOnce(
      ()=>
      {
        game.camera.fade(0x000000, 1000, true, 1);
      });

    game.camera.onFadeComplete.addOnce(
      ()=>
      {
        this.startMusic.stop();
        game.state.start('Level01State');
        //game.state.start('Level03State');
        //game.state.start('LevelFinalState');
        //game.state.start('levelTheEndBed');
      });

      game.load.onLoadStart.removeAll();
      game.load.onFileComplete.removeAll();
      game.load.onLoadComplete.removeAll();
  }
}

let loadingState = new LoadingState();
