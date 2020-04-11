/**
 * BridgeCommandに渡す、宛先、セット関数、モディファイア(値の変更関数)をまとめるクラス
 */
class BridgeDestination {
  /**
   * [constructor description]
   * @param  {BaseCommand} command [description]
   * @param  {Function<BaseCommand, any>} setter [description]
   * @param  {Function} modifier           [description]
   */
  constructor(command, setter, modifier = v => v) {
    this.command = command
    this.modifier = modifier
    this.setter = setter
  }
}

module.exports = BridgeDestination
