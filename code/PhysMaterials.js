class PhysMaterials
{
  constructor()
  {
    this.floorContactMaterial = game.physics.p2.createMaterial();
    this.mainBodyMaterial = game.physics.p2.createMaterial();
    this.kickMaterial = game.physics.p2.createMaterial();
    this.freeMaterial = game.physics.p2.createMaterial(); //material not collide with stuff

    this.landscapeMaterial = game.physics.p2.createMaterial();

    this.objectsMaterial = game.physics.p2.createMaterial();

    game.physics.p2.createContactMaterial(this.floorContactMaterial, this.landscapeMaterial, //for contac with floor
      {
        friction: 3,
        restitution: 0,
        stiffness: 100000000000000,
        relaxation: 2,
        frictionStiffness: 1000000,
        frictionRelaxation: 100
      });

    game.physics.p2.createContactMaterial(this.kickMaterial, this.landscapeMaterial, //for contac with floor
      {
        friction: 1,
        restitution: 0,
        stiffness: 1,
        relaxation: 20,
        frictionStiffness: 1000000,
        frictionRelaxation: 100
      });


      game.physics.p2.createContactMaterial(this.kickMaterial, this.objectsMaterial, //for contac with floor
        {
          friction: 1,
          restitution: 0,
          stiffness: 100,
          relaxation: 3,
          frictionStiffness: 1,
          frictionRelaxation: 1
        });

      game.physics.p2.createContactMaterial(this.freeMaterial, this.mainBodyMaterial, //for contac with floor
        {
          friction: 0,
          restitution: 0,
          stiffness: 0.1,
          relaxation: 0,
          frictionStiffness: 10000000,
          frictionRelaxation: 10000000000
        });

      game.physics.p2.createContactMaterial(this.freeMaterial, this.freeMaterial, //for contac with floor
        {
          friction: 0,
          restitution: 0,
          stiffness: 0.1,
          relaxation: 0,
          frictionStiffness: 10000000,
          frictionRelaxation: 10000000000
        });
  }
}
