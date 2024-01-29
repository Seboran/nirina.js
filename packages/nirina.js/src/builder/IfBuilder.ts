import { NoeudModel } from '../model'
import type { ComputableValue } from '../model/ComputedValue'
import IfHtml from '../model/html/if.model'
import AbstractBuilder from './AbstractBuilder'
import type IBuilder from './IBuilder'

type Element = NoeudModel | IBuilder<NoeudModel>

class IfBuilder extends AbstractBuilder implements IBuilder<IfHtml> {
  elseElement: Element | undefined
  constructor(
    private condition: ComputableValue,
    private then: Element,
  ) {
    super()
  }

  else(e: Element): this {
    this.elseElement = e
    return this
  }

  build(): IfHtml {
    let then: NoeudModel
    if (this.then instanceof NoeudModel) {
      then = this.then
    } else {
      then = this.then.build()
    }

    let elseElement: NoeudModel | undefined
    if (this.elseElement instanceof NoeudModel) {
      elseElement = this.elseElement
    } else {
      elseElement = this.elseElement?.build()
    }
    return new IfHtml(this.condition, then, elseElement)
  }
}

export default (condition: ComputableValue, then: Element) =>
  new IfBuilder(condition, then)
