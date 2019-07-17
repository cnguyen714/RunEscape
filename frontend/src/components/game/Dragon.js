
import enemies from '../../assets/game/enemies.png';
import hitsound from '../../assets/game/hit.wav';
import pointSound from '../../assets/game/sfx_point.wav';

class Dragon {
  constructor(canvas, context) {
    this.ctx = context;
    this.cvs = canvas;
    this.fg = {
      h: 59
    }

    // this.position = [];
    this.sprite = new Image();
    this.sprite.src = enemies;
    this.x = this.cvs.width;
    this.y = this.cvs.height - 220;

    this.frameTicks = 0;
    this.animationFrame = 0;
    this.animation = [
      { sX: 0, sY: 0, w: 147, h: 155 },
      { sX: 168, sY: 0, w: 145, h: 155 },
      { sX: 339, sY: 0, w: 147, h: 155 },
      { sX: 169, sY: 182, w: 145, h: 142 },
      { sX: 357, sY: 189, w: 133, h: 135 },
    ];
    this.passed = false;
    this.point_sound = new Audio();
    this.hitSfx = new Audio();
    this.hitSfx.src = hitsound;
    this.point_sound.src = pointSound;
  }

  draw() {
    let dragon = this.animation[this.animationFrame];

    this.ctx.drawImage(this.sprite, dragon.sX, dragon.sY, dragon.w, dragon.h, this.x, this.y, dragon.w, dragon.h );
  }

  update(state) {
    let dragon = this.animation[this.animationFrame];
    if (state.current !== state.game) return;

    this.period = state.current === state.getReady ? 6 : 5;

    this.frameTicks++;
    if (this.frameTicks % this.period === 0) {
      this.frameTicks = 0;
      this.animationFrame++;
    }

    this.animationFrame = this.animationFrame % this.animation.length;

    let players = state.entities.filter(entity => typeof Player)
    let player = players.filter(player => state.localPlayerId === player.playerId);
    player = player[0];
    if (player.sliding) {
      if (player.x > this.x &&
        player.x < this.x + dragon.w &&
        player.slidingHitBox > this.y &&
        player.slidingHitBox < this.y + dragon.h) {
        this.hitSfx.play();
        state.gameOver();
      }
    } else {
      if (player.x > this.x &&
        player.x < this.x + dragon.w/2 &&
        player.y > this.y &&
        player.y < this.y + dragon.h) {
        this.hitSfx.play();
        state.gameOver();
      }
    }

    if (player.x > (this.x + (dragon.w / 2)) && !this.passed) {
      this.passed = true;
      this.point_sound.play();
      state.gameScore.addObstacleScore(100);
    }

    this.x -= state.dx;
  }
}

export default Dragon;