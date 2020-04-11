/**
 * BaseCommand class
 */
class BaseCommand {
  /**
   * コンストラクタ
   * @param  {ArtBoard} artBoard アートボード
   */
  constructor(artBoard) {
    this.artBoard = artBoard
    this.executed = false
  }
}

module.exports = BaseCommand
