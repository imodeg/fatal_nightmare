class ItemsBar extends Phaser.Sprite
{
  constructor(levelState, x, y)
  {
    super(game, x, y, '');
    this.fixedToCamera = true;
    this.levelState = levelState;

    this.cellArray = [];
    this.itemsArray = [];
    for(let i = 0; i < 8; i++)
    {
      let newCell = new Phaser.Sprite(game, i*-50, 0, 'item_cell');
      newCell.anchor.setTo(0.5,0.5);
      this.addChild(newCell);
      this.cellArray.push(newCell);
    }

    this.addItems(GameCfg.itemsArray);
  }

  //staticly add item
  addItems(array)
  {
    for(let i =0; i < array.length; i++)
    {
      let newObject = new Phaser.Sprite(game, this.cellArray[i].x, 0, array[i]);
      newObject.anchor.setTo(0.5,0.5);
      this.itemsArray.push(newObject);
      this.addChild(newObject);
    }
  }

  //dynamicly add item
  addItem(startPosition, itemName)
  {

    let newObject = new Phaser.Sprite(game, startPosition.x - this.x, startPosition.y - this.y, itemName);
    newObject.anchor.setTo(0.5,0.5);
    this.itemsArray.push(newObject);
    this.addChild(newObject);
    GameCfg.itemsArray.push(itemName);
    let newPosx = this.cellArray[GameCfg.itemsArray.length-1].x;
    let newPosy = 0;
    let tween = game.add.tween(newObject).to( { x: newPosx, y: newPosy}, 1000, Phaser.Easing.Sinusoidal.In, true, 0);
    let tween1 = game.add.tween(newObject.scale).to( { x: 0.8, y: 0.8}, 1000, Phaser.Easing.Sinusoidal.InOut, false, 0)
                                                .to( { x: 1.2, y: 1.2}, 300, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, true);
  }

  hitPlayer()
  {
    for(let i = 0; i < this.itemsArray.length; i++)
    {
      let playerPosX = this.levelState.player.x - this.x;
      let playerPosY = this.levelState.player.y - this.y-40;
      let tween1 = game.add.tween(this.itemsArray[i]).to( { x: playerPosX, y: playerPosY}, 700, Phaser.Easing.Sinusoidal.In, true, i*300);
      tween1.onComplete.addOnce(
        ()=>
        {
          this.levelState.player.hitStatic(5);
          this.itemsArray[i].kill();
        });
    }
  }

  hitPlayerCell()
  {
    for(let i = 0; i < this.cellArray.length; i++)
    {
      let playerPosX = this.levelState.player.x - this.x;
      let playerPosY = this.levelState.player.y - this.y-40;
      let tween1 = game.add.tween(this.cellArray[i]).to( { x: playerPosX, y: playerPosY}, 700, Phaser.Easing.Sinusoidal.In, true, i*300);
      tween1.onComplete.addOnce(
        ()=>
        {
          this.levelState.player.hitStatic(1);
          this.cellArray[i].kill();
        });
    }
  }
}
