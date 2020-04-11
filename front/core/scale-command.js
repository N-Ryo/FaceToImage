const BaseLayerCommand = require('./base-layer-command');

/**
 * テキスト生成コマンド
 */
class ScaleCommand extends BaseLayerCommand {
  /**
   * @param  {number} x
   * @param  {number} y
   */
  setScale(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * 実行メソッド
   */
  execute() {
    this.fetchLayerFromArtBoard()
    this.layer.pixiElement.scale.x = this.x
    this.layer.pixiElement.scale.y = this.y
  }
}

module.exports = ScaleCommand
