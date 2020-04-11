const BaseCommand = require('./base-command');
const BridgeDestination = require('./bridge-destination');

/**
 * BridgeCommand class
 * 複数のコマンドの間で、値をやり取りする
 */
class BridgeCommand extends BaseCommand {
  /**
   * つなぐ元のコマンドを設定
   * @param {BaseCommand} sourceCommand [description]
   */
  setSourceCommand(sourceCommand) {
    this.sourceCommand = sourceCommand
  }

  /**
   * ソースコマンドからデータを取得するための関数
   * @param {Function<BaseCommand>} sourceGetter [description]
   */
  setSourceGetter(sourceGetter) {
    this.sourceGetter = sourceGetter
  }

  /**
   *  ソースから得られた情報を渡す先を設定
   * @param  {BaseCommand} command [description]
   * @param  {Function<BaseCommand, any>} setter [description]
   * @param  {Function} modifier           [description]
   */
  setDestination(command, setter, modifier) {
    this.bridgeDestination = new BridgeDestination(command, setter, modifier)
  }

  /**
   * 実行メソッド
   */
  execute() {
    const sourceValue = this.sourceGetter(this.sourceCommand)
    const modifiedValue = this.bridgeDestination.modifier(sourceValue)
    this.bridgeDestination.setter(this.bridgeDestination.command, modifiedValue)
  }
}

module.exports = BridgeCommand
