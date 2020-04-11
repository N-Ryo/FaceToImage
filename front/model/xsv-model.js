const separatorDefinitions = {
  tab: '\t',
  comma: ','
}

/**
 *
 */
class XSVModel {
  /**
   * @param  {[type]} xsvData [description]
   * @param  {[type]} maxLength [description]
   */
  constructor(xsvData, maxLength = undefined) {
    this.separator = separatorDefinitions[xsvData.separator] || '\t'
    // xsvData.characterRemover = s => s
    // if (xsvData.removeCharacter && xsvData.removeCharacter.length > 0) {
    //   const removeFromHead = new RegExp(`^${xsvData.removeCharacter}`, 'g')
    //   const removeFromTail = new RegExp(`${xsvData.removeCharacter}$`, 'g')
    //   xsvData.characterRemover = s =>
    //     s.replace(removeFromHead).replace(removeFromTail)
    // }
    this.mappings = xsvData.mappings

    this.lines = xsvData.rawData
      .replace('\r\n', '\n')
      .replace('\r', '\n')
      .split('\n')
    this.maxLength = maxLength || this.lines.length
  }

  /**
   * [getByIndex description]
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  getByIndex(index) {
    const o = {}
    const splitted = this.lines[index].split(this.separator)
    splitted.forEach((v, i) => {
      if (this.mappings[i]) {
        o[this.mappings[i]] = v
      }
    })
    return o
  }

  /**
   * [hasNext description]
   * @param  {[type]} index [description]
   * @return {Boolean} [description]
   */
  isGetByIndex(index) {
    return index < this.maxLength
  }
}

module.exports = XSVModel
