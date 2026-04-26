# Crypto Lan — Production des assets

> Ce document liste tous les assets graphiques nécessaires pour reproduire la
> DA "Isometric Cozy Cybercafé" (voir `docs/ART_DIRECTION.md`) et fournit les
> prompts standardisés à utiliser avec Gemini / Midjourney / Stable Diffusion.

---

## 1. Workflow de production

1. **Tu génères** un asset via Gemini (ou autre outil image) en utilisant le prompt fourni dans ce doc.
2. **Tu vérifies** que le rendu est cohérent avec la DA (cosy, chibi, isométrique, palette chaude). Sinon, régénère.
3. **Tu sauvegardes** l'image au format PNG avec **fond transparent** dans le dossier indiqué (`public/assets/<categorie>/<nom>.png`).
4. **Tu commit + push** sur la branche `claude/realtime-game-progress-66KUd` (ou tu m'envoies le fichier et je le commit).
5. **Je l'intègre** dans le code Phaser dès qu'il est dans le repo.

> **Important** : pour que les assets s'intègrent proprement, ils doivent être
> en **fond transparent** (PNG avec canal alpha), **vue isométrique stricte**
> (angle 30°, ratio 2:1), et avec une **résolution suffisante** (idéalement
> 2x la taille d'affichage prévue, pour rester net sur écrans HiDPI).

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

## 4. Prompts Gemini standardisés

### 4.1 Style consigne (à inclure dans tous les prompts)

```
Style: 2D cartoon shaded illustration, cozy isometric cybercafé aesthetic,
similar to Cookie Run Kingdom and AFK Journey character art mixed with
Stardew Valley warmth. Clean outlines, soft shadows, warm color palette
(brown wood, red rug, cream walls, warm lighting). NO pixel art, NO 3D
render, NO realistic textures, NO photorealism. Fond transparent (PNG
with alpha channel). Strict isometric projection, 30 degree angle, 2:1
tile ratio. No background, no shadow on the floor.
```

### 4.2 Background pièce (P0)

```
Isometric cozy cybercafé empty room, viewed from front-left corner.
Two visible walls (back and right), wooden parquet floor with a large
red persian rug in the center, cream-colored walls. String lights with
small golden bulbs hanging along the upper edges of both walls.
Decorative LED hexagons on the back wall (cyan, magenta, lime green
glow). Wooden baseboards. The room is empty: no furniture, no
characters. Warm cozy lighting. Negative space outside the room is
dark navy blue (#1f2541).

Style: 2D cartoon shaded illustration, cozy isometric cybercafé
aesthetic, similar to Cookie Run Kingdom mixed with Stardew Valley.
Clean outlines, soft shadows, warm palette. NO pixel art, NO 3D
render, NO photorealism. Strict isometric projection 30 degrees.

Resolution: 2560x1440.
```

### 4.3 Mobilier — Chaise gaming

```
A single isometric gaming chair, viewed from 3/4 back angle (back of
chair facing the camera), green and black color scheme, sleek modern
shape with side wings, headrest, 5-spoke wheeled base. Cartoon shaded
2D illustration with clean outline and soft shadows. Transparent
background. Strict isometric projection 30 degrees. NO pixel art, NO
3D render. Style similar to Cookie Run Kingdom furniture assets.

Resolution: 512x512. PNG with transparent background.
```

(Régénérer en remplaçant "green and black" par "brown / red / grey / blue" pour les variantes de couleur.)

### 4.4 Mobilier — Bureau gaming

```
A single isometric gaming desk, viewed in strict isometric 30 degrees
projection. Light wood top, black metal frame, soft RGB underglow on
the front edge. Empty top (no monitor, no keyboard, just the desk).
Cartoon shaded 2D illustration with clean outline and soft shadows.
Transparent background. NO pixel art, NO 3D render.

Resolution: 512x512. PNG with transparent background.
```

(Pour la version "right-wall", ajouter : *"oriented so its long edge runs front-to-back (depth-aligned), perpendicular to the back-wall version"*.)

### 4.5 Mobilier — Tour PC

```
A single isometric PC tower (vertical computer case), black with a
glowing red LED stripe on the front. Slim modern design, sitting on
the floor. Cartoon shaded 2D illustration, clean outline, soft shadow
on the body. Transparent background. NO pixel art, NO 3D render.
Strict isometric 30 degrees.

Resolution: 256x384. PNG with transparent background.
```

### 4.6 Mobilier — Écran allumé

```
A single isometric computer monitor (flat screen, 24"), the screen
displaying a colorful pixel-game-style scene (forest with mountains,
small character, like a parody of a video game). Black bezel, on a
small stand. Cartoon shaded 2D illustration, clean outline.
Transparent background. NO pixel art on the body, the screen content
can have a stylized "in-game" look. Strict isometric 30 degrees.

Resolution: 384x384. PNG with transparent background.
```

### 4.7 Personnage chibi assis (template par archétype)

```
A single chibi-style character sitting on a gaming chair, viewed from
3/4 back angle (so we see the back of their head and shoulders).
[ARCHETYPE_DESCRIPTION]. Big head, small body, hands resting on a
keyboard or mouse. Cartoon shaded 2D illustration, clean outline,
soft shadows. Transparent background (no chair visible, just the
character — the chair will be a separate sprite). NO pixel art, NO
3D render. Style similar to Cookie Run Kingdom characters.

Resolution: 256x256. PNG with transparent background.
```

Remplacements pour `[ARCHETYPE_DESCRIPTION]` :

| Archétype | Description à coller |
|---|---|
| Fragger | `young man wearing a red gaming hoodie, headset with mic, intense expression, fingerless gloves, twitching shoulders mid-action` |
| Laner | `young woman with long hair tied in a low ponytail, blue oversized hoodie, calm focused expression, sipping a coffee mug` |
| Strategist | `older man with glasses and a knit cardigan, gray hair, thoughtful expression, hand on chin like a chess player` |
| Speedrunner | `androgynous young person wearing a yellow tracksuit jacket, headband, energetic posture, mouth open in concentration` |
| Grinder | `bulky man with messy brown hair, oversized brown hoodie, tired expression with dark circles under eyes, holding an energy drink can` |

### 4.8 Le gérant (avatar joueur)

```
A single chibi-style character standing behind a counter, viewed from
front (facing the camera, slight 3/4 turn). Friendly young adult,
brown messy hair, white t-shirt under an open denim jacket, smiling
softly, one arm leaning on the counter. The counter is NOT in the
image, only the character from the waist up. Cartoon shaded 2D
illustration, clean outline, soft shadows. Transparent background.
NO pixel art, NO 3D render. Style similar to Cookie Run Kingdom.

Resolution: 384x512. PNG with transparent background.
```

### 4.9 Plante en pot

```
A single isometric potted plant (monstera deliciosa, with several
large fenestrated leaves) in a terracotta pot. Cartoon shaded 2D
illustration, clean outline, soft shadows. Transparent background.
Strict isometric 30 degrees. NO pixel art, NO 3D render.

Resolution: 256x384. PNG with transparent background.
```

### 4.10 Comptoir central

```
A single isometric reception/management counter for a gaming café,
medium height, light wood with a darker top, viewed from 3/4 angle
showing front and one side. Has a small cash register, a glowing
monitor, and a pizza box on top. NO character behind the counter.
Cartoon shaded 2D illustration, clean outline, soft shadows.
Transparent background. Strict isometric 30 degrees.

Resolution: 768x512. PNG with transparent background.
```

### 4.11 Icônes HUD

```
A single isometric icon of [ICON_DESCRIPTION], slightly tilted forward
(15 degrees), with a soft glow around it. Cartoon shaded 2D
illustration. Transparent background. NO pixel art, NO 3D render.

Resolution: 256x256. PNG with transparent background.
```

Remplacements `[ICON_DESCRIPTION]` :
- LanCoin : `a stylized golden coin with a "LAN" letter etched on the front, cyan glow`
- Energy Drink : `a small can of "Energy" drink, purple/violet color, lightning bolt logo, violet glow`
- Street Cred : `a graffiti-style golden star with sharp edges, gold glow`

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

## 6. Si Gemini ne suit pas la consigne "isométrique strict"

C'est la difficulté #1 avec les IA d'image : elles dévient souvent de la projection isométrique vers du 3/4 cinématographique ou du flat 2D pur. Astuces :

- **Réessayer plusieurs fois** : la même prompt peut donner 5 résultats différents.
- **Insister dans le prompt** : `"strict 30-degree isometric projection, 2:1 tile ratio, like a Stardew Valley screenshot"`.
- **Référencer un jeu connu** : `"in the visual style of Tiny Tower / Pocket City / Stardew Valley"`.
- **Editer l'image après** : si l'angle est légèrement off, on peut compenser au montage en CSS transform ou redresser le sprite dans Phaser.

Si Gemini dérive trop, **Midjourney v6** ou **Stable Diffusion XL** avec un LoRA "isometric" sont des alternatives à essayer.

---

## 7. Tracking

Liste des assets reçus / intégrés (à mettre à jour au fil des livraisons) :

- [ ] `bg-room-garage.png`
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
