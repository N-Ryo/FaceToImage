// import * as PIXI from 'pixi.js'
const PIXI = require('pixi-shim-v4');
const BaseLayerCommand = require('./base-layer-command');

/**
 * レイヤーをグループ化するコンテナを作る
 */
class ContainerCommand extends BaseLayerCommand {
  /**
   * @param  {Array<string>} layerNames 内包するレイヤー名
   */
  setContainLayerNames(layerNames) {
    this.layerNames = layerNames
  }

  /**
   * 実行メソッド
   */
  execute() {
    const container = new PIXI.Container()
    this.createLayer(container)
    this.appendLayerToArtBoard()
    this.layerNames.forEach(layerName => {
      const layer = this.artBoard.findLayer(layerName)
      container.addChild(layer.pixiElement)
      layer.parent = this.layer
    })
  }
}

module.exports = ContainerCommand
