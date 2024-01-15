import LeafHtml from '../model/html/leaf.model'
import AbstractBuilder from './AbstractBuilder'
import IBuilder from './IBuilder'

class TextBuilder extends AbstractBuilder implements IBuilder<LeafHtml> {
  constructor(private text: string) {
    super()
  }
  build(): LeafHtml {
    return new LeafHtml(this.text).setStyle(this.style)
  }
}

export default (text: string) => new TextBuilder(text)
