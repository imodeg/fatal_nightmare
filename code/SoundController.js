class SoundController
{
  constructor()
  {
    this.swordSwing01 = game.add.audio('swordSwing01Sfx');
    this.swordSwing02 = game.add.audio('swordSwing02Sfx');
    this.hit01 = game.add.audio('hit01Sfx');
    this.hit02 = game.add.audio('hit02Sfx');
    this.takeItem = game.add.audio('takeItemSfx');
    this.monsterDeath = game.add.audio('monsterDeathSfx');
    this.playerJump01 = game.add.audio('playerJump01Sfx');
    this.playerJump02 = game.add.audio('playerJump02Sfx');
    this.playerHit01 = game.add.audio('playerHit01Sfx');
    this.playerHit02 = game.add.audio('playerHit02Sfx');
    this.playerYawn = game.add.audio('playerYawnSfx');
    this.playerTakeWeapon = game.add.audio('playerTakeWeaponSfx');
  }

  kill()
  {
    this.swordSwing01 = null;
    this.swordSwing02 = null;
    this.hit01 = null;
    this.hit02 = null;
    this.takeItem = null;
  }
}
