# Crypto Lan — Direction artistique

**Style : Iso Line-Art** · Référence principale : schéma isométrique line-art du cybercafé fourni en avril 2026.

> Cette direction remplace la précédente DA "Neon Flat". On part d'un visuel
> épuré, monochrome, en perspective isométrique pure, pour valoriser la
> lisibilité de la gestion et la satisfaction de la construction.

---

## 1. Philosophie

Tout est dessiné en **traits noirs sur fond blanc**, en projection isométrique stricte. Les volumes existent uniquement par leurs arêtes — pas de remplissage coloré, pas de gradient, pas de glow, pas de particules d'ambiance. La satisfaction visuelle vient de :

1. La **cohérence physique** : tout objet a une assise réelle au sol, occupe un volume crédible, et ne chevauche jamais un autre objet.
2. La **construction progressive** : les emplacements vides sont visibles en pointillé, et chaque poste construit s'ajoute au plan comme un bâtiment qui prend forme.
3. La **clarté de lecture** : on voit en un coup d'œil ce qui est actif, ce qui est libre, ce qui produit, ce qui est en attente.

Zéro pixel art, zéro skeuomorphisme, zéro effet rétro. La référence est le rendu architectural / plan d'aménagement, pas le jeu vidéo flashy.

---

## 2. Palette

### Couleurs de base
| Rôle | Hex | Usage |
|---|---|---|
| Fond | `#ffffff` | Toute la scène, plein-écran |
| Encre principale | `#111111` | Tous les contours d'éléments construits / actifs |
| Encre douce | `#444444` | Texte secondaire |
| Encre muette | `#888888` | Labels d'état, mesures |
| Encre fantôme | `#cccccc` | Emplacements vides, pointillés |

### Accents (utilisés avec parcimonie)
| Rôle | Hex | Usage |
|---|---|---|
| Action positive | `#22c55e` | Bouton "Construire", validation |
| Alerte | `#dc2626` | Erreur, ressource manquante |

Les couleurs de rareté disparaissent du langage visuel des objets de la scène. Elles peuvent réapparaître dans la **fiche perso** ou les **popups de pull**, mais jamais sur le décor isométrique.

---

## 3. Projection

- **Vraie isométrie** : ratio tile 2:1 (largeur : hauteur), angle 30°.
- **Caméra fixe** orientée vers le coin Nord-Ouest de la pièce. Le coin avant-gauche de la pièce est le plus proche du joueur, le coin arrière-droit est le plus loin.
- **Deux murs visibles** : le mur arrière (au "fond" de l'écran) et le mur droit (sur le côté).
- **Pas de plafond visible** — uniquement la ligne d'arête supérieure des deux murs.
- **Pas de mouvement de caméra** au lancement.

---

## 4. Éléments physiques

### Règle d'or
**Chaque objet a un footprint au sol qui ne peut pas se superposer à un autre footprint.** Ni aux murs. Le moteur de positionnement doit garantir cette contrainte.

### Sol
- Losange iso plein, contour `#111`, pas de remplissage.
- Optionnel : grille subtile de tiles en `#cccccc` (alpha 0.3) pour donner l'échelle.

### Murs
- Deux quadrilatères iso (parallélogrammes) en contour `#111` uniquement.
- Une ligne d'arête en haut connectant les deux murs.

### Décoration murale
- Hexagones non remplis sur le mur arrière (référence visuelle vers le côté "tech"). Disposition irrégulière, en grappe.

### Postes PC
Chaque poste est composé de 4 éléments en line-art :
1. **Bureau** : volume rectangulaire, top losange visible + 1 face avant + 1 jambage latéral pour le pied.
2. **Tour PC** : petit cube vertical posé à droite ou à gauche du bureau (selon orientation du poste).
3. **Écran** : rectangle plein noir (`fill #111`) sur stand. C'est le seul élément qui ose un fill — il représente l'écran allumé/éteint.
4. **Chaise gaming** : silhouette galbée en courbes Bézier, vue de dos, avec ailes latérales, appui-tête, base à 5 branches et roulettes.

Les postes ont **deux orientations** :
- **Adossé au mur arrière** : profondeur du bureau pointe vers le sud (vers le centre), chaise au sud du bureau.
- **Adossé au mur droit** : profondeur du bureau pointe vers l'ouest (vers le centre), chaise à l'ouest du bureau.

Les deux orientations doivent être obtenues par **rotation 90° du repère local**, pas par un dessin custom différent.

### Emplacement vide ("à construire")
- Footprint du futur bureau dessiné en **pointillés gris clair** sur le sol.
- Cercle gris `#888` avec un `+` au centre.
- Label `Construire` au-dessous.
- Aucun élément vertical (pas de chaise fantôme).

### Comptoir central
- Cube rectangulaire plus haut qu'un bureau ordinaire.
- Petit écran de gestion noir et une caisse posée dessus.
- Placé à peu près au centre du sol, sans gêner la circulation des postes.

---

## 5. Typographie

- Une seule famille : **Nunito** (sans-serif ronde, lisible, gratuite).
- Tout en `#111111` ou nuances de gris.
- Hiérarchie :
  - Titre HUD (`CRYPTO LAN`) : 800, 18px, letter-spacing 3px, majuscules.
  - Titre de zone ("Garage") : 800, 26px.
  - Labels de compteurs : 700, 10-11px, majuscules, letter-spacing 1.2px, gris muté.
  - Valeurs numériques : **JetBrains Mono** 700, 17px, noir, pour la précision.
  - Sous-titres et hints : 600, 12-13px, gris.

Pas d'effet d'ombre, pas de halo, pas de stroke sur le texte.

---

## 6. Animations

Minimum vital — la DA est volontairement statique et architecturale.

- **Apparition** : fade-in léger des éléments à la création (300-400 ms, ease-out).
- **Hover** : aucun effet de scale ou de glow. Au mieux, le contour passe en `#000` plein.
- **Construction** : pop discret de l'élément qui se matérialise (scale 0.92 → 1, 250 ms, ease-out-back).
- **Pas de loop idle ambiante** sur les éléments du décor. Tout est figé sauf interaction.

L'idée : la pièce ressemble à un plan vivant, pas à une animation kawaii.

---

## 7. UI

### HUD top
- Bandeau blanc de ~64px, ligne fine de séparation `#111` en bas.
- Titre `CRYPTO LAN` centré.
- Compteurs (LanCoin, Energy, Street Cred) à gauche, en colonnes label/valeur.
- Pas de fond, pas de pill, pas de glow.

### Popups
- Cadre noir 1.5-2px sur fond blanc.
- Coin arrondi minimum (4px max).
- Aucun blur de fond.
- Boutons : rectangle avec contour, label en majuscules.

### Boutons
- Outline `#111` 2px, fill blanc, label noir.
- Hover : fill `#111`, label blanc.
- Disabled : outline `#cccccc`, label `#cccccc`.

---

## 8. Sound design

Inchangé sur le principe :
- Lo-fi chill pour l'ambiance.
- Bass plus nerveux pour les moments de tension.
- SFX clean et punchy (tink, pop, chime).

L'évolution visuelle vers le line-art ne demande pas de revoir le sound design — il reste le contrepoint chaud du visuel froid.

---

## 9. Ce que ce jeu n'est PAS visuellement

- Pas de pixel art, pas d'esthétique CRT, pas de scanlines.
- Pas de textures, pas de gradients, pas de glow, pas de particules d'ambiance.
- Pas de couleurs vives sur le décor (réservées aux popups de pull et fiches perso).
- Pas de fond sombre — tout part du blanc.
- Pas d'éléments qui flottent ou se chevauchent : la cohérence physique prime.
- Pas de néons, pas d'effets cyber, pas d'ambiance "espace".

Le jeu est **un plan de cybercafé qui prend vie**. Chaque ajout est une décision claire posée sur le sol.
