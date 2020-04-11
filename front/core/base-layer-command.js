const BaseCommand = require('./base-command');
const Layer = require('./layer');

/**
 * テキスト生成コマンド
 */
class BaseLayerCommand extends BaseCommand {
  /**
   * コンストラクタ
   * @param  {ArtBoard} artBoard アートボード
   */
  constructor(artBoard) {
    super(artBoard)
    this.layer = null
  }

  /**
   * レイヤー名設定
   * @param {string} layerName レイヤー名
   */
  setLayerName(layerName) {
    this.layerName = layerName
  }

  /**
   * レイヤーの取得
   */
  fetchLayerFromArtBoard() {
    this.layer = this.artBoard.findLayer(this.layerName)
  }

  /**
   * レイヤーの追加
   */
  appendLayerToArtBoard() {
    this.artBoard.addLayer(this.layer)
  }

  /**
   * レイヤーの作成
   * @param  {object} pixiElement レイヤーとして追加可能なPIXI要素
   */
  createLayer(pixiElement) {
    this.layer = new Layer(this.layerName, pixiElement)
  }
}

module.exports = BaseLayerCommand
