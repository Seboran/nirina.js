import type { NoeudModel } from '../../../../model'
import {
  BOUTON_HTML_NAME,
  elements_name,
  ifName,
  leafName,
  spanName,
} from '../../../../model/html/node_constantes'
import type VisiteurNoeud from '../../../VisiteurNoeud'
import { AbstractVisiteurOrchestrateur } from '../../orchestrateur'
import BoutonHtmlGenerator from './BoutonHtmlGenerator'
import ElementsHtmlGenerator from './ElementsHtmlGenerator'
import ForHtmlGenerator from './ForHtmlGenerator'
import IfHtmlGenerator from './IfHtmlGenerator'
import LeafHtmlGenerator from './LeafHtmlGenerator'
import NativeGenerator from './NativeGenerator'
import type { NirinaComponent } from './NirinaComponent'

const visiteurMappings: Array<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [string, new (...args: any[]) => VisiteurNoeud<NirinaComponent, NoeudModel>]
> = [
  [BOUTON_HTML_NAME, BoutonHtmlGenerator],
  [elements_name, ElementsHtmlGenerator],
  [ifName, IfHtmlGenerator],
  [leafName, LeafHtmlGenerator],
  [spanName, NativeGenerator],
  ['div', NativeGenerator],
  ['a', NativeGenerator],
  ['img', NativeGenerator],
  ['p', NativeGenerator],
  ['h1', NativeGenerator],
  ['h2', NativeGenerator],
  ['h3', NativeGenerator],
  ['h4', NativeGenerator],
  ['for', ForHtmlGenerator],
]

export default class HtmlOrchestrateur extends AbstractVisiteurOrchestrateur<NirinaComponent> {
  constructor() {
    const orchestrateur: Record<
      string,
      VisiteurNoeud<NirinaComponent, NoeudModel>
    > = {}
    super(orchestrateur)
    visiteurMappings.forEach(([clazz, visiteurClass]) => {
      this.add(clazz, new visiteurClass(orchestrateur))
    })
  }

  add<T extends NoeudModel>(
    clazz: string,
    visiteur: VisiteurNoeud<NirinaComponent, T>,
  ) {
    this.orchestre[clazz] = visiteur
  }
}
