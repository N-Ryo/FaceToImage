// import * as PIXI from 'pixi.js'
const PIXI = require('pixi-shim-v4');

/**
 * アートボード
 */
class ArtBoard {
  /**
   * コンストラクタ
   * @param  {number} width
   * @param  {number} height
   */
  constructor(width, height) {
    this.renderer = PIXI.autoDetectRenderer({
      width,
      height,
      preserveDrawingBuffer: true,
      transparent: true
    })
    this.container = undefined
    this.loadList = []
    this.onNextLoad = undefined
    this.onExecuted = []
    this.layers = []
    this.commands = []
    this.commandIndex = 0
  }

  /**
   * プレビューエリアに追加
   * @param  {[type]} selector [description]
   */
  // appendPreviewArea(selector = 'body') {
  //   this.renderer.view.style.width = '100%'
  //   this.renderer.view.style.height = '100%'
  //   document.querySelector(selector).appendChild(this.renderer.view)
  // }
// const renderer = PIXI.autoDetectRenderer(width, height, {preserveDrawingBuffer: true, transparent: true});
// const container = new PIXI.Container();

// const text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
// container.addChild(text);

// renderer.render(container);

// const canvasData = renderer.view.toDataURL('image/png').replace('data:image/png;base64,', '');

// const binary = new Buffer(canvasData, 'base64');
// // write buffer to file
// fs.writeFileSync('data.png', binary);
  /**
   * レイヤー取得
   * @param  {string} name レイヤー名
   * @return {Layer} レイヤー
   */
  findLayer(name) {
    return this.layers.find(e => e.name === name)
  }

  /**
   * レイヤー追加
   * @param {Layer} layer 追加するレイヤ
   */
  addLayer(layer) {
    this.layers.push(layer)
  }

  /**
   * 読み込み
   * @param {string} name [description]
   */
  addLoadList(name) {
    this.loadList.push({ name, progress: 0 })
  }

  /**
   * 読み込み
   * @param {string} name [description]
   * @param {number} progress [description]
   */
  updateLoadProgress(name, progress) {
    this.loadList.find(l => l.name === name).progress = progress
    this.checkLoadProgress()
  }

  /**
   * 読み込み完了のチェック
   */
  checkLoadProgress() {
    let loaded = true
    this.loadList.forEach(l => {
      loaded = loaded && l.progress === 100
    })
    if (loaded) {
      this.onNextLoad()
    }
  }

  /**
   * コマンドの実行
   */
  commandExecute() {
    if (this.commands.length > this.commandIndex) {
      this.onNextLoad = () => this.commandExecute()
      const command = this.commands[this.commandIndex++]
      // 実行済みであればスキップ
      if (!command.executed) {
        command.execute()
      }
      this.checkLoadProgress()
    } else {
      this.onExecuted.forEach(e => e())
    }
  }

  /**
   * 描画
   */
  draw() {
    this.container = new PIXI.Container()
    this.layers.forEach(l => {
      if (!l.parent) {
        this.container.addChild(l.pixiElement)
      }
    })
    this.renderer.render(this.container)
  }

  /**
   * 画像としてダウンロード
   * @return {string} octet-stream url
   */
  toImg(extension = 'jpeg') {
    return this.renderer.view.toDataURL('image/' + extension)
  }

  /**
   * リセット
   */
  reset() {
    this.layers = []
    this.commandIndex = 0
  }
}

module.exports = ArtBoard
