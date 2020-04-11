const BaseLayerCommand = require('./base-layer-command');

/**
 * テキスト生成コマンド
 */
class BaseDrawCommand extends BaseLayerCommand {
  /**
   * @param  {string} text 生成テキスト
   */
  setText(text) {
    this.text = text
  }

  /**
   * 描画パラメータ
   * @param {object} drawParameter 描画パラメータ
   */
  setDrawParameter(drawParameter) {
    this.drawParameter = drawParameter
  }
}

module.exports = BaseDrawCommand
