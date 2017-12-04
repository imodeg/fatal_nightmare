var GameCfg =
{
  width: 1024,
  height: 640,
  isDebug: false,
  itemsArray: []
}

var game = new Phaser.Game(GameCfg.width, GameCfg.height, Phaser.CANVAS, 'LudumDare');
game.state.add('LoadingState', loadingState);

game.state.add('Level01State', level01State);
game.state.add('Level02State', level02State);
game.state.add('Level03State', level03State);
game.state.add('LevelFinalState', levelFinalState);
game.state.add('levelTheEndBed', levelTheEndBed);
game.state.add('levelTheEndGood', levelTheEndGood);


game.state.start('LoadingState');
