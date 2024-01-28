import type { NoeudModel } from '..'
import type { ComputedList } from '../model/ComputedList'
import ForHtml from '../model/html/for.model'
import AbstractBuilder from './AbstractBuilder'
import type IBuilder from './IBuilder'

class ForBuilder extends AbstractBuilder implements IBuilder<ForHtml> {
  constructor(private forElt: ComputedList<NoeudModel>) {
    super()
  }
  build(): ForHtml {
    return new ForHtml(this.forElt)
  }
}

export default (dynList: ComputedList<NoeudModel>) => new ForBuilder(dynList)
