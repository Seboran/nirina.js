import { NoeudModel } from '../model'
import NativeModel from '../model/html/native.model'
import AbstractBuilder from './AbstractBuilder'
import IBuilder from './IBuilder'

class NativeBuilder extends AbstractBuilder implements IBuilder<NativeModel> {
  children: NoeudModel[] = []
  constructor(private name: string) {
    super()
  }
  build(): NativeModel {
    return new NativeModel(this.name, this.children).setStyle(this.style)
  }

  addChild(child: NoeudModel | IBuilder<NoeudModel>): this {
    if (child instanceof NoeudModel) {
      this.children.push(child)
    } else {
      this.children.push(child.build())
    }
    return this
  }
}

export default (name: 'div' | 'span') => new NativeBuilder(name)

export const Div = () => new NativeBuilder('div')
export const Span = () => new NativeBuilder('span')
