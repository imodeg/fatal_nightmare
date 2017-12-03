var GameCfg =
{
  width: 1024,
  height: 640,
  isDebug: false
}

var game = new Phaser.Game(GameCfg.width, GameCfg.height, Phaser.CANVAS, 'LudumDare');

game.state.add('PlayLevelState', playLevelState);
game.state.start('PlayLevelState');
