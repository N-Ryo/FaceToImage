const BaseLayerCommand = require('./base-layer-command');

/**
 * 透過コマンド
 */
class AlphaCommand extends BaseLayerCommand {
  /**
   * @param  {number} alpha
   */
  setAlpha(alpha) {
    this.alpha = alpha
  }

  /**
   * 実行メソッド
   */
  execute() {
    this.fetchLayerFromArtBoard()
    this.layer.pixiElement.alpha = this.alpha
  }
}

module.exports = AlphaCommand
