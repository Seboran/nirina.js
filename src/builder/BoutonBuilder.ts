import BoutonHtml from '../model/html/bouton.model'
import AbstractBuilder from './AbstractBuilder'
import IBuilder from './IBuilder'

type AnyFunction = (...args: any[]) => any

export class BoutonBuilder
  extends AbstractBuilder
  implements IBuilder<BoutonHtml>
{
  onClick: AnyFunction = () => {}
  texte: string = ''

  static init() {
    return new BoutonBuilder()
  }

  setOnClick(cb: AnyFunction) {
    this.onClick = cb
    return this
  }

  setText(text: string) {
    this.texte = text
    return this
  }

  build() {
    return new BoutonHtml(this.onClick, this.texte).setStyle(this.style)
  }
}

export default () => new BoutonBuilder()
