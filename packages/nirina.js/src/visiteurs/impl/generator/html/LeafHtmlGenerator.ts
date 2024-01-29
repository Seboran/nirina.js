import type LeafHtml from '../../../../model/html/leaf.model'
import type VisiteurNoeud from '../../../VisiteurNoeud'
import type { NirinaComponent } from './NirinaComponent'

export default class LeafHtmlGenerator
  implements VisiteurNoeud<NirinaComponent, LeafHtml>
{
  visit({ contenu }: LeafHtml): NirinaComponent {
    return { template: contenu, script: () => {} }
  }
}
