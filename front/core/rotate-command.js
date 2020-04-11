const BaseLayerCommand = require('./base-layer-command');

/**
 * テキスト生成コマンド
 */
class ScaleCommand extends BaseLayerCommand {
  /**
   * @param  {number} angle
   */
  setAngle(angle) {
    this.angle = angle
  }

  /**
   * 実行メソッド
   */
  execute() {
    this.fetchLayerFromArtBoard()
    this.layer.pixiElement.rotation = (this.angle / 180) * Math.PI
  }
}

module.exports = ScaleCommand
