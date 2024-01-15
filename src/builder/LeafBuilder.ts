import LeafHtml from '../model/html/leaf.model'
import AbstractBuilder from './AbstractBuilder'
import IBuilder from './IBuilder'

class LeafBuilder extends AbstractBuilder implements IBuilder<LeafHtml> {
  private text: string = ''

  setText(text: string): this {
    this.text = text
    return this
  }
  build(): LeafHtml {
    return new LeafHtml(this.text)
  }
}

export default () => new LeafBuilder()
