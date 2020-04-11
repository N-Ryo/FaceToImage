const JSZip = require('jszip');
const saveAs = require('file-saver');
const AlphaCommand = require('../core/alpha-command');
const AnchorCommand = require('../core/anchor-command');
const BridgeCommand = require('../core/bridge-command');
const BridgeDestination = require('../core/bridge-destination');
const ContainerCommand = require('../core/container-command');
const FontCommand = require('../core/font-command');
const MoveCommand = require('../core/move-command');
const ScaleCommand = require('../core/scale-command');
const RotateCommand = require('../core/rotate-command');
const SpriteCommand = require('../core/sprite-command');
const TextCommand = require('../core/text-command');
const ArtBoard = require('../core/art-board');
const XSVModel = require('./xsv-model');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
/**
 *
 */
class SmartPictureModel {
  /**
   * @param  {[type]} data [description]
   * 第二引数baseExecContextは現在使われていない
   * 拡張時のために
   */
  constructor(data, baseExecContext, callback) {
    this.execContext = {
      name: data.name,
      index: 0,
      assetsPath: data.assetsPath,
      imagePath: '',
      extension: data.extension || 'png',
      previewMode: data.preview,
      xsvModel: new XSVModel(data.xsv),
      saveAs,
      classes: {
        AlphaCommand,
        AnchorCommand,
        BridgeCommand,
        BridgeDestination,
        ContainerCommand,
        FontCommand,
        MoveCommand,
        ScaleCommand,
        RotateCommand,
        SpriteCommand,
        TextCommand,
        ArtBoard
      },
      commands: {}
    }
    this.execContext.zip = new JSZip()
    this.execContext.outputsFolder = this.execContext.zip.folder(data.name)
    this.execContext.artBoard = new ArtBoard(
      data.artBoard.width,
      data.artBoard.height
    )
    if (baseExecContext) {
      const becKeys = Object.keys(baseExecContext)
      const ecKeys = Object.keys(this.execContext)
      becKeys.forEach(k => {
        if (ecKeys.indexOf(k) === -1) {
          this.execContext[k] = baseExecContext[k]
        }
      })
    }
    this.buildCommands(data.commands)

    this.execContext.artBoard.onExecuted.push(
      function() {
        this.artBoard.draw()
        const targetReplace = `data:image/${this.extension === 'jpeg' ? this.extension : 'png'};base64,`
        const canvasData = this.artBoard.toImg(this.extension).replace(targetReplace, '');
        const binary = Buffer.from(canvasData, 'base64');
        const backetName = this.assetsPath.split('/')[3]
        const sliceIndex = Math.max(this.assetsPath.indexOf('feed/'), this.assetsPath.indexOf('appdata/'))
        const basekey = this.assetsPath.slice(sliceIndex, this.assetsPath.indexOf('/assets'))
        this.imagePath = `https://s3-ap-northeast-1.amazonaws.com/${backetName}/${basekey}/images/gen/${this.name}/${this.xsv.file || this.xsv.id || this.index}.${this.extension === 'jpeg' ? 'jpg' : 'png'}`
        const params = {Bucket: backetName, Key: `${basekey}/images/gen/${this.name}/${this.xsv.file || this.xsv.id || this.index}.${this.extension === 'jpeg' ? 'jpg' : 'png'}`, Body: binary}
        s3.putObject(params, (err, data)=>{
          if (err) {
            console.log(err + '-' + data);
            return;
          }
          this.index++
          if (!this.previewMode && this.xsvModel.isGetByIndex(this.index)) {
            this.xsv = this.xsvModel.getByIndex(this.index)
            this.artBoard.reset()
            this.execEach.forEach(eef => eef(this))
            this.artBoard.commandExecute()
          }else if(!this.previewMode){
            // singleの場合のみプレビュー用のimagePathを返す
            callback(this.index === 1 ? this.imagePath : '');
          }
        });
      }.bind(this.execContext)
    )
  }

  /**
   * @param  {[type]} commands [description]
   *
   */
  buildCommands(commands) {
    this.execContext.execEach = []
    commands.forEach(command => {
      const TargetClass = this.execContext.classes[command.className]
      const newCommand = new TargetClass(this.execContext.artBoard)
      this.execContext.commands[command.name] = newCommand
      this.execContext.artBoard.commands.push(newCommand)
      Object.keys(command.methods).forEach(method => {
        this.execContext.execEach.push(function(execContext) {
          const args = []
          command.methods[method].forEach(argv => {
            /* eslint no-new-func: 0 */
            // 実行に必ず必要
            const argf = new Function(`return ${argv};`)
            args.push(argf.call(execContext))
          })
          newCommand[method](...args)
        })
      })
    })
  }

  /**
   *
   */
  render() {
    ;(function() {
      // const selector = '#PreviewArea'
      this.xsv = this.xsvModel.getByIndex(this.index)
      // this.artBoard.appendPreviewArea(selector)
      this.execEach.forEach(eef => eef(this))
      this.artBoard.commandExecute()
    }.bind(this.execContext)())
  }
}

module.exports = SmartPictureModel
