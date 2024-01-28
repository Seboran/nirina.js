import { NoeudModel } from '../model'
import NativeModel from '../model/html/native.model'
import AbstractBuilder from './AbstractBuilder'
import type IBuilder from './IBuilder'

class NativeBuilder extends AbstractBuilder implements IBuilder<NativeModel> {
  children: NoeudModel[] = []
  uniqueId: string = ''
  constructor(private name: string) {
    super()
  }
  build(): NativeModel {
    return new NativeModel(this.name, this.children)
      .setStyle(this.style)
      .setUniqueId(this.uniqueId)
  }

  addChild(child: NoeudModel | IBuilder<NoeudModel>): this {
    if (child instanceof NoeudModel) {
      this.children.push(child)
    } else {
      this.children.push(child.build())
    }
    return this
  }

  addId(id: string): this {
    this.uniqueId = id
    return this
  }
}

export default (name: 'div' | 'span' | string) => new NativeBuilder(name)

export const Div = () => new NativeBuilder('div')
export const Span = () => new NativeBuilder('span')
