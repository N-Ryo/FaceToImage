// import * as PIXI from 'pixi.js'
const PIXI = require('pixi-shim-v4');
const Canvas = require('canvas');
const BaseLayerCommand = require('./base-layer-command');

/**
 * テキスト生成コマンド
 */
class SpriteCommand extends BaseLayerCommand {
  /**
   * @param  {string} spritePath スプライトのパス
   */
  setSpritePath(spritePath) {
    this.spritePath = spritePath
  }

  /**
   * 実行メソッド
   */
  execute() {
    this.spritePathUpdated = false
    const r = `?r=${Math.random()}`
    const fileName = this.spritePath.substring(this.spritePath.lastIndexOf("/") + 1)
    Canvas.loadImage('/tmp/assets/' + fileName).then((img) => {
      const canvas = Canvas.createCanvas(img.naturalWidth, img.naturalHeight);
      canvas.getContext('2d').drawImage(img,0,0);
      const sprite = PIXI.Sprite.from(PIXI.Texture.fromCanvas(canvas));
      this.createLayer(sprite)
      this.appendLayerToArtBoard()
      this.artBoard.updateLoadProgress(this.layerName + r, 100)
    })

    this.artBoard.addLoadList(this.layerName + r)
  }
}

module.exports = SpriteCommand
