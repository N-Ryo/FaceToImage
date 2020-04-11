const BaseLayerCommand = require('./base-layer-command');
const { registerFont } = require('canvas');

/**
 * テキスト生成コマンド
 */
class FontCommand extends BaseLayerCommand {
  /**
   * @param  {string} fontName フォント名
   */
  setFontName(fontName) {
    this.fontName = fontName
  }

  /**
   * @param  {string} fontFormat フォントフォーマット
   */
  setFontFormat(fontFormat) {
    this.fontFormat = fontFormat
  }

  /**
   * @param  {string} fontPath フォントのパス
   */
  setFontPath(fontPath) {
    this.fontPath = fontPath
  }

  /**
   * 実行メソッド
   */
  execute() {
    this.executed = true
    const splitedFontPath = this.fontPath.split('/')
    registerFont( '/tmp/assets/' + splitedFontPath[splitedFontPath.length - 1], { family: this.fontName } );
  }
}

module.exports = FontCommand
