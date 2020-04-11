/**
 * レイヤー
 */
class Layer {
  /**
   * コンストラクタ
   * @param  {string} name        レイヤー名
   * @param  {object} pixiElement レイヤーとして追加可能なPIXI要素
   */
  constructor(name, pixiElement) {
    this.name = name
    this.pixiElement = pixiElement
    this.parent = undefined
  }
}

module.exports = Layer
