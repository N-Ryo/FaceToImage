const BaseLayerCommand = require('./base-layer-command');

/**
 * テキスト生成コマンド
 */
class MoveCommand extends BaseLayerCommand {
  /**
   * @param  {number} x
   * @param  {number} y
   */
  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * @param  {number} x
   * @param  {number} y
   */
  setMove(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * 実行メソッド
   */
  execute() {
    this.fetchLayerFromArtBoard()
    this.layer.pixiElement.x = this.x
    this.layer.pixiElement.y = this.y
  }
}

module.exports = MoveCommand
