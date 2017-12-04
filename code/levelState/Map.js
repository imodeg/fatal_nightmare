class Map
{
  constructor(mapJSON, levelState)
  {
    this.mapJSON = mapJSON;
    this.levelState = levelState;
    this.imagePathArray = [];
    this.spawnerArray = [];
    //console.log(this.getLayer('Collision'));
  }

  initLevel()
  {
    game.world.setBounds(0, 0, this.mapJSON.tilewidth, this.mapJSON.tileheight);
    this.initImagesName();

    this.loadStaticColorGeometry('BackColor', this.levelState.layerBack);
    this.loadParallaxImages('Back_Parallax_03', this.levelState.layerBack_Parallax_03);
    this.loadParallaxImages('Back_Parallax_02', this.levelState.layerBack_Parallax_02);
    this.loadParallaxImages('Back_Parallax_01', this.levelState.layerBack_Parallax_01);
    this.loadStaticImages('Back_04', this.levelState.layerBack);
    this.loadStaticImages('Back_03', this.levelState.layerBack);
    this.loadStaticImages('Back_02', this.levelState.layerBack);
    this.loadStaticImages('Back_01', this.levelState.layerBack);
    this.loadStaticImages('Front_03', this.levelState.layerFront);
    this.loadStaticImages('Front_02', this.levelState.layerFront);
    this.loadStaticImages('Front_01', this.levelState.layerFront);
    this.loadParallaxImages('Front_Parallax_03', this.levelState.layerFront_Parallax_03);
    this.loadParallaxImages('Front_Parallax_02', this.levelState.layerFront_Parallax_02);
    this.loadParallaxImages('Front_Parallax_01', this.levelState.layerFront_Parallax_01);
    this.loadStaticCollision('Collision', this.levelState.layerCollision); // static collision layer

    this.loadEntities('Entity', this.levelState.layerEntities);
  }

  //load static collision
  loadStaticCollision(layerName, collisionGroup)
  {
    let layer = this.getLayer(layerName);
    let objects = layer.objects;

    let shape = [];
    for (let i = 0; i < objects.length; i++)
    {
      shape[i] = {};
      shape[i].density = 2;
      shape[i].friction = 0;
      shape[i].bounce = 0;
      shape[i].filter = {};
      shape[i].filter.categoryBits = 1;
      shape[i].filter.maskBits = 65535;
      shape[i].shape = [];

      for (let j = 0; j < objects[i].polygon.length; j++)
      {
        let pointX = objects[i].polygon[j].x + objects[i].x +16; //FIX BUG move 16 to correct pos (find why +16)?
        let pointY = objects[i].polygon[j].y + objects[i].y +16;
        shape[i].shape[(j*2)] = pointX;
        shape[i].shape[(j*2)+1] = pointY;
      }
    }

    let collisionObject = new Phaser.Sprite(game, 0, 0, '');
    collisionObject.anchor.setTo(1,1);
    game.physics.p2.enable([collisionObject], GameCfg.isDebug);
    collisionObject.body.clearShapes();
    let newPolyShape = collisionObject.body.loadPolygon(null, shape);
    collisionObject.body.entityType = 'Evironment_Collision';
    collisionObject.body.static = true;

    collisionObject.body.setMaterial(this.levelState.physMaterials.landscapeMaterial);

    collisionGroup.add(collisionObject);
  }

  loadStaticImages(layerName, imageGroup)
  {
    let layer = this.getLayer(layerName);
    let objects = layer.objects;

    for (let i = 0; i < objects.length; i++)
    {
      let imageKey = this.imagePathArray[objects[i].gid];
      let object = new Phaser.Sprite(game, objects[i].x, objects[i].y, imageKey);
      object.anchor.setTo(0,1);
      object.angle = objects[i].rotation;
      object.width = objects[i].width;
      object.height = objects[i].height;
      imageGroup.add(object);
    }
  }

  loadParallaxImages(layerName, imageGroup)
  {
    let layer = this.getLayer(layerName);
    let objects = layer.objects;

    if(layer.properties.speed)
    {
      imageGroup.parallaxSpeed = layer.properties.speed;

    }

    for (let i = 0; i < objects.length; i++)
    {
      let imageKey = this.imagePathArray[objects[i].gid];
      let object = new Phaser.Sprite(game, objects[i].x, objects[i].y, imageKey);
      object.anchor.setTo(0,1);
      object.angle = objects[i].rotation;
      object.width = objects[i].width;
      object.height = objects[i].height;
      imageGroup.add(object);
    }
  }

  loadStaticColorGeometry(layerName, graphicsGroup)
  {
    let layer = this.getLayer(layerName);
    let objects = layer.objects;

    for (let i = 0; i < objects.length; i++)
    {
      let newPoly = new Phaser.Polygon();
      let pointsArray = [];
      for (let j = 0; j < objects[i].polygon.length; j++)
      {
        let pointX = objects[i].polygon[j].x + objects[i].x ; //FIX BUG move 16 to correct pos (find why +16)?
        let pointY = objects[i].polygon[j].y + objects[i].y ;

        pointsArray.push(new Phaser.Point(pointX, pointY));
      //shape[i].shape[(j*2)] = pointX;
      //shape[i].shape[(j*2)+1] = pointY;
      }
      newPoly.setTo(pointsArray);
      let color = objects[i].properties.color;
      let newColor = color.slice(3, 9);
      newColor = '0x' + newColor;

      let newGraphics = new Phaser.Graphics(game, 0, 0);
      newGraphics.beginFill(newColor);
      newGraphics.drawPolygon(newPoly.points);
      newGraphics.endFill();
      graphicsGroup.add(newGraphics);
    }
  }

  loadEntities(layerName, entitiesGroup)
  {
    let layer = this.getLayer(layerName);
    let objects = layer.objects;

    for (let i = 0; i < objects.length; i++)
    {
      this.addEntity(objects[i], entitiesGroup);
    }
  }

  addEntity(object, entitiesGroup)
  {
    let newEntity;
    switch (object.type)
    {
      case 'Player':
        let armored = false;
        if(object.properties)
        {
          armored = object.properties.armored;
        }
        newEntity = new Player(this.levelState, object.x, object.y, armored);
        this.levelState.player = newEntity;
        entitiesGroup.add(newEntity);
        break;

      case 'Enemy_Tumbler':
        newEntity = new Enemy_Tumbler(this.levelState, object.x, object.y);
        entitiesGroup.add(newEntity);
        break;

      case 'Enemy_Spider':
        newEntity = new Enemy_Spider(this.levelState, object.x, object.y);
        entitiesGroup.add(newEntity);
        break;

      case 'Enemy_Flyer':
        newEntity = new Enemy_Flyer(this.levelState, object.x, object.y);
        entitiesGroup.add(newEntity);
        break;

      case 'Enemy_Cat':
        newEntity = new Enemy_Cat(this.levelState, object.x, object.y);
        this.levelState.boss = newEntity;
        entitiesGroup.add(newEntity);
        break;

      case 'MonsterSpawner':
        newEntity = new MonsterSpawner(this.levelState, object.x, object.y, object.name);
        this.spawnerArray.push(newEntity);
        break;

      case 'TriggerPlace_Win':
        //newEntity = new Enemy_Tumbler(this.levelState, object.x, object.y);
        //newEntity = new Phaser.Sprite(game, object.x, object.y, 'block');
        newEntity = new TriggerPlace_Win(this.levelState, object.x, object.y, object.name);
        newEntity.width = object.width;
        newEntity.height = object.height;

        entitiesGroup.add(newEntity);
        break;
      case 'TriggerPlace_Kill':
        //newEntity = new Enemy_Tumbler(this.levelState, object.x, object.y);
        //newEntity = new Phaser.Sprite(game, object.x, object.y, 'block');
        newEntity = new TriggerPlace_Kill(this.levelState, object.x, object.y);
        newEntity.width = object.width;
        newEntity.height = object.height;
        entitiesGroup.add(newEntity);
        break;

      case 'TriggerPlace_Finale':
        newEntity = new TriggerPlace_Finale(this.levelState, object.x, object.y);
        newEntity.width = object.width;
        newEntity.height = object.height;
        newEntity.isActive = true;
        entitiesGroup.add(newEntity);
        break;


      case 'Weapon_Katana':
        newEntity = new Weapon_Katana(this.levelState, object.x, object.y);
        entitiesGroup.add(newEntity);
        break;

      case 'ItemObject':
        let create = true;
        for(let i = 0; i < GameCfg.itemsArray.length; i++)
        {
          if(GameCfg.itemsArray[i] == object.name)
          {
            create = false;
          }
        }
        if(create)
        {
          newEntity = new ItemObject(this.levelState, object.x, object.y, object.name);
          entitiesGroup.add(newEntity);
        }
        break;

      default:

        break;
    }
  }

  //Get layer from json by name
  getLayer(layerName)
  {
    for(let i = 0; i < this.mapJSON.layers.length; i++)
    {
      if(this.mapJSON.layers[i].name == layerName)
      {
        return this.mapJSON.layers[i];
      }
    }
    return null;
  }

  //init array with images name to get by gid
  initImagesName()
  {
    let tileSet = this.mapJSON.tilesets;
    //console.log(tileSet);
    for(let i = 0; i < tileSet.length; i++)
    {
      let firstgid = tileSet[i].firstgid;
      let tileSetImages = tileSet[i].tiles;

      for (let key in tileSetImages)
      {
        let gid = firstgid + parseInt(key);
        this.imagePathArray[gid] = tileSetImages[key].image;
      }

    }
    //console.log(this.imagePathArray);
  }

  update()
  {
    for(let i = 0; i< this.spawnerArray.length; i++)
    {
      this.spawnerArray[i].update();
    }
  }
}
