import { NoeudModel } from '../model'
import NativeModel from '../model/html/native.model'
import AbstractBuilder from './AbstractBuilder'
import type IBuilder from './IBuilder'

class NativeBuilder extends AbstractBuilder implements IBuilder<NativeModel> {
  children: NoeudModel[] = []
  uniqueId: string = ''
  className: string = ''
  attrs: [string, string][] = []
  constructor(private name: string) {
    super()
  }
  build(): NativeModel {
    return new NativeModel(this.name, this.children, {}, ...this.attrs)
      .setStyle(this.style)
      .setClass(this.className)
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

  addClass(className: string): this {
    this.className = className
    return this
  }

  addAttrs(attrs: [string, string][]): this {
    this.attrs = attrs
    return this
  }
}

export default (name: 'div' | 'span' | string) => new NativeBuilder(name)

export const Div = () => new NativeBuilder('div')
export const Span = () => new NativeBuilder('span')
