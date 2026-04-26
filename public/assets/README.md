# Crypto Lan — Assets

Dépôt des assets graphiques utilisés en runtime par le jeu.

Tout fichier dans `public/assets/` est servi en statique par Vite à l'URL `/assets/<chemin>`.

## Sous-dossiers

| Dossier | Contenu |
|---|---|
| `bg/` | Backgrounds de pièces (garage, sous-sol, RDC, VIP, toit, bureau patron) |
| `decor/` | Plantes, hexagones lumineux, autres déco fixes du décor |
| `furniture/` | Mobilier (bureaux, chaises, tours PC, écrans, comptoir) |
| `character/` | Personnages (gérant + 50 persos pullables, idle / animations) |
| `goodie/` | Petits objets posés sur les bureaux (canettes, mugs, chips…) |
| `poster/` | Posters parodiques accrochés aux murs |
| `ui/` | Icônes HUD, cadres de popup, éléments d'interface |

## Conventions

- Format : **PNG avec fond transparent** (sauf backgrounds JPEG OK)
- Projection : **isométrique 30°, ratio 2:1**
- Naming : `<categorie>-<sous-categorie>-<descriptif>.png`
- Pas d'ombre portée incluse dans le sprite (ajoutée en code)

Voir `docs/ASSETS.md` pour la liste complète, les tailles cibles et les prompts Gemini.
