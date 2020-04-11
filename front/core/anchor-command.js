const BaseLayerCommand = require('./base-layer-command');

/**
 * テキスト生成コマンド
 */
class AnchorCommand extends BaseLayerCommand {
  /**
   * @param  {number} x
   * @param  {number} y
   */
  setAnchor(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * 実行メソッド
   */
  execute() {
    this.fetchLayerFromArtBoard()
    this.layer.pixiElement.anchor.x = this.x
    this.layer.pixiElement.anchor.y = this.y
  }
}

module.exports = AnchorCommand
