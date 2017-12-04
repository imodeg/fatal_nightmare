class MonsterSpawner
{
  constructor(levelState, x, y, monsterName)
  {
    this.levelState = levelState;
    this.monsterName = monsterName;
    this.position = new Phaser.Point(x, y);
    this.isActive = true;
  }

  addEntity(position, monstername)
  {
    let newEntity;
    switch (monstername)
    {
      case 'Enemy_Tumbler':
        newEntity = new Enemy_Tumbler(this.levelState, position.x, position.y);
        this.levelState.layerEntities.add(newEntity);
        break;

      case 'Enemy_Spider':
        newEntity = new Enemy_Spider(this.levelState, position.x, position.y);
        this.levelState.layerEntities.add(newEntity);
        break;

      case 'Enemy_Flyer':
        newEntity = new Enemy_Flyer(this.levelState, position.x, position.y);
        this.levelState.layerEntities.add(newEntity);
        break;

      default:

        break;
    }
  }

  update()
  {
    if(this.isActive)
    {
      if(Phaser.Point.distance(this.position, this.levelState.player.position) < 600)
      {
        this.isActive = false;
        this.addEntity(this.position, this.monsterName)
      }
    }
  }
}
