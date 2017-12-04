//text appeared wuth animation
class BitmapTextAnimated extends Phaser.BitmapText
{
  constructor(x, y, text, size)
  {
    super(game, x, y, 'mainfont', '', size);
    this.finalText = text;
    this.fixedToCamera = true;

    this.onComplete = new Phaser.Signal();

    this.textAppearScaleTime = 500;
    this.textAppearAlphaTime = 200;

    this.reservCharPos = [];
    this.evilEffectTime = 40; //pause between noise
    this.evilEffectAmplitude = 1;

    this.endAppearTime;
  }

  vanishText(delay = 0, time = 100)
  {
    this.timerVanish = game.time.events.add(delay,
      () =>
      {
        let appearAlphaTween = game.add.tween(this);
        appearAlphaTween.to({alpha: 0}, time, Phaser.Easing.Sinusoidal.Out, true);
      }, this);
  }

  setNewText(text, delay = 0, isEvil = false)
  {
    this.timer = game.time.events.add(delay,
      () =>
      {
        this.alpha = 1;
        if(this.nextCharTimer)
        {
          this.nextCharTimer.removeAll();
        }
        this.setText(text);
        for(let i = 0; i < this.children.length; i++)
        {
          this.children[i].alpha = 0;
          this.children[i].scale.setTo(0,0);
        }
        this.startAppearText();
        if(isEvil)
        {

          this.evilTextEffect();
        }
      }, this);

  }

  //text start
  startAppearText()
  {
    let charTime = 15;
    this.endAppearTime = game.time.create(true);
    for(let i = 0; i < this.children.length; i++)
    {
      let reservPos = {};
      reservPos.x = this.children[i].x;
      reservPos.y = this.children[i].y;
      this.reservCharPos[i] = reservPos;

      this.children[i].alpha = 0;
      this.children[i].anchor.setTo(0.5,0.5);
      this.children[i].scale.setTo(0,0);

      let appearAlphaTween = game.add.tween(this.children[i]);
      this.children[i].appearAlphaTween = appearAlphaTween;
      appearAlphaTween.to({alpha: 1}, this.textAppearAlphaTime, Phaser.Easing.Sinusoidal.Out, true , i*charTime);

      let appearScaleTween = game.add.tween(this.children[i].scale);
      this.children[i].appearScaleTween = appearScaleTween;
      appearScaleTween.to({x: 1.4, y: 1.4}, this.textAppearScaleTime/2, Phaser.Easing.Sinusoidal.Out, false , i*charTime)
                      .to({x: 1, y: 1}, this.textAppearScaleTime/2, Phaser.Easing.Sinusoidal.Out, true);
    }

    this.endAppearTime.add(this.children.length*charTime + this.textAppearScaleTime,
      () =>
      {
        this.onComplete.dispatch();
      },this);
    this.endAppearTime.start();

  }

  //full text appear
  startFullAppearText()
  {
    this.endAppearTime.stop();
    for(let i = 0; i < this.children.length; i++)
    {
      this.children[i].appearAlphaTween.stop();
      this.children[i].appearScaleTween.stop();
      this.children[i].alpha = 1;
      this.children[i].scale.setTo(1,1);
    }
    this.onComplete.dispatch();
  }

  //do text evil
  evilTextEffect()
  {
    this.nextCharTimer = game.time.create(true);

    for(let i = 0; i < this.children.length; i++)
    {
      //if(this.reservCharPos[i].x && this.children[i].x)
      //{
        this.nextCharTimer.add(this.evilEffectTime,
          () =>
          {
            this.children[i].x = this.reservCharPos[i].x + game.rnd.integerInRange(-this.evilEffectAmplitude, this.evilEffectAmplitude);
            this.children[i].y = this.reservCharPos[i].y + game.rnd.integerInRange(-this.evilEffectAmplitude, this.evilEffectAmplitude);
          },this);
      //}
      //else
      //{
      //  return;
      //}
    }

    this.nextCharTimer.add(this.evilEffectTime,
      () =>
      {
        this.evilTextEffect();
      },this);

    this.nextCharTimer.start();
  }

  //do text extra evil
  evilExtraTextEffect()
  {
    let nextCharTimer = game.time.create(true);

    for(let i = 0; i < this.children.length; i++)
    {
      nextCharTimer.add(20,
        () =>
        {
          this.children[i].x = this.children[i].x + game.rnd.integerInRange(-3, 3);
          this.children[i].y = this.children[i].y + game.rnd.integerInRange(-3, 3);
        },this);
    }

    nextCharTimer.add(20,
      () =>
      {
        this.evilExtraTextEffect();
      },this);

    nextCharTimer.start();

  }
}
