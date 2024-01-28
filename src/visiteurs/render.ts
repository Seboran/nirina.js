import type { NoeudModel } from '..'
import HtmlOrchestrateur from './impl/generator/html/HtmlOrchestrateur'

export const mount = function (selector: string, element: NoeudModel) {
  const documentMount = document.querySelector(selector)

  if (!documentMount) {
    throw new Error("Can't find element to mount onto")
  }

  const component = element.accept(new HtmlOrchestrateur())
  documentMount.innerHTML = component.template
  component.script()
}
