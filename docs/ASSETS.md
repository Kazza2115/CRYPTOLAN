# Crypto Lan — Production des assets

> Ce document décrit le workflow officiel de production d'assets pour Crypto Lan.
> Pipeline principal : **modélisation 3D dans Spline → export PNG iso 2D → intégration Phaser**.

---

## 1. Workflow de production (Spline)

1. **Tu modélises** l'objet (pièce, mobilier, perso) dans [Spline](https://spline.design) avec une scène dédiée.
2. **Tu configures la caméra iso** une fois pour toutes (cf. §1.1 ci-dessous) — c'est le paramètre critique pour que tous les assets s'alignent dans Phaser.
3. **Tu exportes en PNG** avec fond transparent et résolution 2x (cf. §1.2).
4. **Tu déposes le PNG** dans `public/assets/<categorie>/<nom>.png` selon le naming conventionnel.
5. **Tu commit + push** sur la branche `claude/realtime-game-progress-66KUd`.
6. **J'intègre** dans le code Phaser dès que le fichier est dans le repo.

### 1.1 Paramètres caméra iso (à régler dans Spline)

Pour matcher exactement la projection iso utilisée dans Phaser (`TILE_W=96, TILE_H=48`, ratio 2:1) :

| Paramètre | Valeur |
|---|---|
| Type de caméra | **Orthographic** (pas Perspective !) |
| Rotation X (pitch / down-tilt) | **30°** |
| Rotation Y (yaw / horizontal) | **45°** |
| Rotation Z | 0° |
| Position | n'importe où sur la diagonale, pointée vers l'origine |
| Zoom / Ortho size | à ajuster selon l'objet |

**Astuce** : dans Spline, crée une scène-modèle avec cette caméra déjà configurée et duplique-la pour chaque nouvel asset. Comme ça, l'angle est strictement identique pour tous les exports → cohérence visuelle parfaite.

### 1.2 Paramètres d'export

| Paramètre | Valeur |
|---|---|
| Format | **PNG** |
| Background | **Transparent** (toggle dans les options d'export) |
| Résolution | **2x** la taille d'affichage cible (cf. tableau §3) |
| Anti-aliasing | activé |
| Shadow plane | désactivé (sinon le sprite a une ombre intégrée moche, on en dessine en code) |

### 1.3 Conseils de modélisation pour cohérence visuelle

- **Lighting unifié** : utilise la **même config de lumières** dans toutes tes scènes (1 ambient + 1 directional inclinée à -45° en Y, intensité ~0.8). Sans ça, chaque objet aura un éclairage différent et ne fittera pas dans la pièce.
- **Material shading** : reste sur des **toon shaders** ou des matériaux flat-shaded simples. Évite les PBR réalistes — ça ne colle pas avec le style cartoon de la DA.
- **Échelle uniforme** : définis une **unité de référence** (ex : 1 mètre Spline = 1 tile Phaser). Note-la quelque part. Toutes tes modélisations doivent respecter cette échelle pour que les proportions soient correctes en jeu.
- **Pas d'ombre portée modélisée** : laisse Phaser dessiner les ombres au sol. Désactive le shadow plane à l'export.
- **Centre du sprite** : positionne ton modèle avec son **point d'ancrage au sol au centre de la scène Spline** (origine 0,0,0). Comme ça, en Phaser je peux placer le sprite à des coordonnées iso précises sans calculer d'offset.

---

## 2. Conventions techniques

### Format
- **PNG** avec fond transparent (sauf le background de pièce qui peut être JPEG).
- **Pas de bordure noire** ajoutée par l'IA (à supprimer si nécessaire).
- **Pas d'ombre portée incluse** dans le sprite (l'ombre sera ajoutée en code par-dessus).

### Tailles cibles (résolution source)
| Type | Largeur × Hauteur source |
|---|---|
| Background pièce | 2560 × 1440 |
| Mobilier (chaise, bureau, tour PC, écran) | 512 × 512 |
| Personnage chibi (corps entier debout) | 384 × 512 |
| Personnage chibi (assis sur chaise) | 256 × 256 |
| Plante / déco | 256 × 256 |
| Poster mural | 256 × 384 |
| Goodie de bureau (canette, mug, chips…) | 128 × 128 |
| Icône HUD (LanCoin, Energy, Street Cred) | 128 × 128 |

Les sprites seront downscalés en runtime selon le besoin du jeu.

### Nommage
`<categorie>-<sous-categorie>-<descriptif>.png`

Exemples :
- `bg-room-garage.png`
- `furniture-chair-gaming-green.png`
- `furniture-desk-default.png`
- `character-archetype-grinder-idle.png`
- `decor-plant-monstera.png`
- `poster-mockup-survivcrypto.png`

---

## 3. Liste des assets — Phase 1 (proto vertical)

### 3.1 Décor de pièce

| Asset | Fichier | Priorité | Remarques |
|---|---|---|---|
| Background pièce vide (Garage) | `public/assets/bg/bg-room-garage.png` | **P0** | Sol parquet + tapis central + 2 murs vides + guirlandes. **Pas** de mobilier ni perso. |
| Décoration murale hexagones | `public/assets/decor/decor-hex-wall.png` | P1 | Grappe d'hexagones lumineux cyan/magenta/vert pour le mur arrière |
| Plante en pot (monstera) | `public/assets/decor/decor-plant-monstera.png` | P1 | Pour les coins |
| Plante en pot (cactus) | `public/assets/decor/decor-plant-cactus.png` | P2 | Variante |

### 3.2 Mobilier

| Asset | Fichier | Priorité |
|---|---|---|
| Bureau gaming (vue back-wall) | `public/assets/furniture/furniture-desk-back.png` | **P0** |
| Bureau gaming (vue right-wall) | `public/assets/furniture/furniture-desk-right.png` | **P0** |
| Chaise gaming verte | `public/assets/furniture/furniture-chair-green.png` | **P0** |
| Chaise gaming marron | `public/assets/furniture/furniture-chair-brown.png` | P1 |
| Chaise gaming rouge | `public/assets/furniture/furniture-chair-red.png` | P1 |
| Chaise gaming grise | `public/assets/furniture/furniture-chair-grey.png` | P1 |
| Tour PC (LED rouge) | `public/assets/furniture/furniture-tower-red.png` | **P0** |
| Tour PC (LED cyan) | `public/assets/furniture/furniture-tower-cyan.png` | P1 |
| Écran allumé (générique) | `public/assets/furniture/furniture-screen-on.png` | **P0** |
| Écran éteint | `public/assets/furniture/furniture-screen-off.png` | P1 |
| Comptoir central | `public/assets/furniture/furniture-counter-central.png` | **P0** |

### 3.3 Personnages

| Asset | Fichier | Priorité |
|---|---|---|
| Gérant (avatar joueur, debout derrière comptoir) | `public/assets/character/character-manager-default.png` | **P0** |
| Persona Fragger (assis idle) | `public/assets/character/character-fragger-idle.png` | **P0** |
| Persona Laner (assis idle) | `public/assets/character/character-laner-idle.png` | **P0** |
| Persona Strategist (assis idle) | `public/assets/character/character-strategist-idle.png` | **P0** |
| Persona Speedrunner (assis idle) | `public/assets/character/character-speedrunner-idle.png` | **P0** |
| Persona Grinder (assis idle) | `public/assets/character/character-grinder-idle.png` | **P0** |

> Pour la Phase 1, on utilise **un sprite par archétype** comme placeholder.
> Les 50 persos individuels seront produits ensuite avec des variations
> (couleur de hoodie, accessoire signature) à partir de ces 5 templates.

### 3.4 Goodies de bureau (détails)

| Asset | Fichier | Priorité |
|---|---|---|
| Canette energy drink | `public/assets/goodie/goodie-energy-can.png` | P1 |
| Mug fumant | `public/assets/goodie/goodie-mug.png` | P1 |
| Paquet de chips | `public/assets/goodie/goodie-chips.png` | P1 |
| Pizza part | `public/assets/goodie/goodie-pizza.png` | P1 |
| Souris RGB | `public/assets/goodie/goodie-mouse-rgb.png` | P2 |

### 3.5 Posters muraux (parodiques)

| Asset | Fichier | Priorité |
|---|---|---|
| Poster "Holiday Camares" | `public/assets/poster/poster-holiday-camares.png` | P1 |
| Poster "Mémétique" | `public/assets/poster/poster-memetique.png` | P1 |
| Poster "Travel" | `public/assets/poster/poster-travel.png` | P2 |
| Poster "SurvivCrypto" | `public/assets/poster/poster-survivcrypto.png` | P2 |

### 3.6 Icônes HUD

| Asset | Fichier | Priorité |
|---|---|---|
| Icône LanCoin | `public/assets/ui/ui-icon-lancoin.png` | **P0** |
| Icône Energy Drink | `public/assets/ui/ui-icon-energy.png` | **P0** |
| Icône Street Cred | `public/assets/ui/ui-icon-streetcred.png` | **P0** |

---

## 4. Specs par asset (Spline)

> Pour chaque asset, modélise la scène, place ton modèle au centre (0,0,0)
> avec son ancre au sol au point central, applique la caméra iso (cf. §1.1),
> applique le lighting unifié (cf. §1.3), et exporte en PNG transparent à la
> résolution indiquée.

### 4.1 Background pièce (Garage)

- **But** : pièce vide (sol + 2 murs visibles), sans mobilier ni perso.
- **Spline** : modélise un cube creux, soustrais le mur avant et le mur gauche pour ne garder que back-wall + right-wall + sol. Ajoute néons / texture béton / petits détails (fissures, cailloux, sticker).
- **Résolution export** : 2560 × 1440 (couvre largement les écrans HD).
- **Background** : transparent.
- **Référence actuelle** : `public/assets/bg/bg-room-garage.png` (1344×768, à régénérer en plus haute résolution si besoin).

### 4.2 Mobilier — Chaise gaming

- **But** : une chaise standalone, sans bureau, sans perso assis dessus.
- **Spline** : tu modélises une chaise gaming générique (dossier haut, ailes latérales, assise, pied 5 branches avec roulettes). Une seule fois.
- **Variantes de couleur** : duplique la scène, change le matériau du dossier (vert, marron, rouge, gris, bleu), re-render. Tu obtiens 5 PNG en 5 minutes.
- **Résolution export** : 512 × 512.
- **Ancre** : pied central de la chaise au sol = origine 0,0,0.

### 4.3 Mobilier — Bureau gaming

- **But** : bureau seul, sans tour PC ni écran ni accessoires.
- **Spline** : top en bois clair, structure métal noir, RGB strip optionnel.
- **Deux variantes nécessaires** :
  - `furniture-desk-back.png` : bureau orienté pour s'adosser au mur arrière (le côté long est parallèle à l'axe X iso).
  - `furniture-desk-right.png` : même bureau orienté pour s'adosser au mur droit (le côté long est parallèle à l'axe Y iso).
  - Dans Spline : modélise une fois, exporte deux fois en tournant la caméra autour du modèle de 90° (ou en tournant le modèle).
- **Résolution export** : 512 × 512.

### 4.4 Mobilier — Tour PC

- **But** : tour seule, posée au sol à droite/gauche du bureau.
- **Spline** : boîtier vertical noir, LED frontale colorée (rouge, cyan, ou autre selon variante).
- **Résolution export** : 256 × 384.

### 4.5 Mobilier — Écran

- **But** : moniteur sur stand, écran allumé sur scène générique de jeu.
- **Spline** : modélise un écran 24" sur stand. Pour le contenu de l'écran, plusieurs options :
  - Texture appliquée sur la dalle (tu peux importer une image de placeholder)
  - Plan luminescent simple si tu veux un look "écran allumé sans détail"
- **Résolution export** : 384 × 384.

### 4.6 Personnages chibi (template par archétype)

> Spline n'est pas l'outil idéal pour des personnages organiques : il est plus
> orienté primitives géométriques. Pour les persos chibi, plusieurs options.

**Option A — Modéliser dans Spline avec primitives**
- Capsules + sphères + cylindres pour faire un perso très stylisé (très géométrique, à la Voodoo Apps / Bonfire). Marche bien si tu acceptes un look ultra-cartoon minimaliste.

**Option B — Modéliser dans Blender, importer en GLTF dans Spline**
- Tu utilises un base mesh chibi tout fait (asset libre sur Sketchfab, Itch.io, Mixamo) et tu l'importes dans Spline. Plus complexe mais beaucoup plus joli.

**Option C — Garder les persos en IA d'image (Midjourney avec --sref pointant vers une image générée Spline)**
- Tu utilises Spline pour le décor + mobilier (où la cohérence est critique) et tu gardes Midjourney pour les persos (où la variété est désirable).

→ **Recommandation** : démarre avec l'option A (Spline primitives) pour un placeholder. Quand tu seras prêt à produire les 50 persos, on rebasculera sur option B ou C selon ton budget temps.

- **Résolution export** : 256 × 256 (assis) / 384 × 512 (debout).
- **Ancre** : pieds du perso à 0,0,0.

Variantes par archétype (gestes / accessoires distinctifs) :
| Archétype | Geste / accessoire |
|---|---|
| Fragger | mains crispées, casque audio + micro, posture tendue |
| Laner | posture détendue, mug à la main, lunettes |
| Strategist | menton sur la main, posture pensive, cardigan / vieux pull |
| Speedrunner | bouge constamment, bandeau, montre visible |
| Grinder | avachi, cernes, canette d'energy drink à portée |

### 4.7 Comptoir central

- **But** : comptoir de gestion, plus haut qu'un bureau standard.
- **Spline** : volume cubique en bois clair avec top contrasté. Sur le top : caisse enregistreuse, écran de gestion, boîte de pizza.
- **Résolution export** : 768 × 512.

### 4.8 Plantes en pot

- **Spline** : pot terracotta + feuilles primitives (plans courbés ou meshes simples).
- Variantes : monstera, cactus, palmier nain.
- **Résolution export** : 256 × 384.

### 4.9 Posters muraux

- **Hors Spline** : un poster est une image plate. Tu peux les générer avec **Ideogram** (qui gère bien le texte parodique) puis les coller comme texture sur un plan dans Spline (au moment du render de pièce complète) OU les afficher directement comme overlay 2D sur le mur dans Phaser (plus flexible).
- **Résolution export** : 256 × 384 chaque.

### 4.10 Goodies de bureau (canette, mug, chips, pizza)

- **Spline** : primitives simples avec texture/couleur, parfait pour ces objets.
- **Résolution export** : 128 × 128 chaque.

### 4.11 Icônes HUD (LanCoin, Energy, Street Cred)

- **Spline** : tu peux modéliser une pièce 3D, une canette ou une étoile en primitive, render avec léger glow.
- **Alternative** : icônes 2D vectorielles (Figma, Illustrator) pour un rendu plus propre / cohérent en UI.
- **Résolution export** : 128 × 128.

---

## 5. Ordre de production recommandé

Pour avoir le proto vertical jouable le plus vite possible :

**Sprint 1 (priorité P0 — minimum viable)**
1. Background Garage (pièce vide)
2. Bureau gaming back-wall + right-wall
3. Chaise gaming verte (couleur de référence pour le proto)
4. Tour PC (LED rouge)
5. Écran allumé (générique)
6. Comptoir central
7. Gérant (avatar joueur)
8. 5 personas archétype (Fragger, Laner, Strategist, Speedrunner, Grinder)
9. Icônes HUD (LanCoin, Energy, Street Cred)

→ Avec ces 14 assets, on a une LAN-House complète et jouable dans le bon style.

**Sprint 2 (priorité P1 — variantes et richesse)**
- Chaises gaming dans les autres couleurs (marron, rouge, gris, bleu)
- Tour PC LED cyan
- Écran éteint
- Plantes (monstera, cactus)
- Goodies (canette, mug, chips, pizza)
- Posters muraux (Holiday Camares, Mémétique)
- Décoration murale hexagones (si pas inclus dans le background)

**Sprint 3 (priorité P2 — détails et expansion)**
- Variations de persos (50 individuels à partir des 5 archétypes)
- Posters supplémentaires
- Goodies supplémentaires
- Autres zones (Sous-sol, RDC, VIP, Toit, Bureau du patron)

---

## 6. Vérification d'un asset avant intégration

Avant de pousser un PNG dans le repo, vérifier :

- [ ] **Format** : PNG, fond **transparent** (canal alpha présent — vérifie avec un outil ou en l'ouvrant sur un fond coloré).
- [ ] **Angle iso** : le modèle est bien en 2:1 (les bords horizontaux du dessus sont 2x plus larges que les bords verticaux). Si la caméra Spline est correctement réglée, c'est automatique.
- [ ] **Pas d'ombre portée** modélisée dans le sprite (sinon on en aura deux : celle du sprite + celle dessinée par Phaser).
- [ ] **Centre / ancre** : le point (0,0,0) de la scène Spline correspond au point d'ancrage souhaité (généralement le sol au centre).
- [ ] **Lighting** : cohérent avec les autres assets (même direction de lumière, même intensité). Sinon le mobilier ne s'intégrera pas dans la pièce.
- [ ] **Résolution** : conforme au tableau §3 (2x cible HiDPI).

Si un asset ne passe pas ces checks, mieux vaut le re-render proprement dans Spline que de tenter de le rattraper en post-prod.

---

## 7. Tracking

Liste des assets reçus / intégrés (à mettre à jour au fil des livraisons) :

- [x] `bg-room-garage.png` (1344×768, sous-sol béton avec néons — livré)
- [ ] `furniture-desk-back.png`
- [ ] `furniture-desk-right.png`
- [ ] `furniture-chair-green.png`
- [ ] `furniture-tower-red.png`
- [ ] `furniture-screen-on.png`
- [ ] `furniture-counter-central.png`
- [ ] `character-manager-default.png`
- [ ] `character-fragger-idle.png`
- [ ] `character-laner-idle.png`
- [ ] `character-strategist-idle.png`
- [ ] `character-speedrunner-idle.png`
- [ ] `character-grinder-idle.png`
- [ ] `ui-icon-lancoin.png`
- [ ] `ui-icon-energy.png`
- [ ] `ui-icon-streetcred.png`
