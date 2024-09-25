# nirina.js

## Archivé

Ce projet est archivé car créer son propre framework c'est so 2010, et je suis très déçu du fonctionnement de bun avec du front-end... Depuis quelques mois j'ai une incompatibilité avec happy dom qui ne se résout pas, la contribution à l'écosystème js est quasi nulle de leur part et je n'arrive pas à faire des choses simples comme choisir ma version de bun (rétrogradage)

Pour l'instant, Bun reste à l'état de gadget.

-------------

Ce projet permet est un démonstrateur de création d'un framework front JS à partir du concept d'AST

## Comment lancer ce projet ? (TODO)

Modifier son projet à partir de `src/playground.ts`

Lancer ensuite

```bash
pnpm run build
pnpm run serve
```

## Encore un framework js ???

Promis, celui-là n'a que pour but d'enseigner les concepts pédagogiques suivants :

1. À partir de logique formelle (d'un AST autrement dit), on peut générer assez facilement une application rudimentaire
2. Il est possible de créer n'importe quel parser pour générer ensuite un AST, pour générer ensuite son appli web.
3. Comment peut-on créer un langage spécifique à un problème, et le parser pour générer son AST ?
