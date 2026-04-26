# Crypto Lan — Direction artistique

**Style : Isometric Cozy Cybercafé** · Référence principale : visuel "Plan de salle LAN — CryptoLan (Active Hub)" généré en avril 2026.

> Cette direction remplace définitivement les essais précédents (Neon Flat,
> Iso Line-Art). Elle est **validée comme DA officielle** du jeu.

---

## 1. Philosophie

Crypto Lan est un cybercafé clandestin **chaleureux** vu en isométrie. L'ambition visuelle est celle d'un mix entre :

- **AFK Journey** / **Cookie Run: Kingdom** pour les personnages chibi colorés,
- **Stardew Valley** pour la chaleur cosy et les détails du décor,
- **Idle Miner Tycoon** pour la lisibilité d'un idle / management.

Le joueur doit avoir envie de **rester dans la pièce** parce qu'elle est belle et vivante, pas seulement parce qu'elle produit des LanCoin.

Trois piliers :

1. **Cosy avant tout** : palette chaude (bois, tapis, lumières tamisées), guirlandes lumineuses, plantes vertes, posters au mur. La pièce est un cocon, pas un open-space froid.
2. **Cartoon shaded 2D** : silhouettes franches avec ombres douces et léger highlight. Pas de réalisme, pas de pixel art, pas de cell-shading dur. On vise la rondeur sympathique de Cookie Run.
3. **Détails mémétiques** : posters parodiques (films d'horreur des persos, références gaming), goodies sur les bureaux (canettes d'energy drink, paquets de chips, mug fumant), expressions faciales caricaturales. L'humour passe par les détails.

---

## 2. Palette

### Décor (chaud)
| Rôle | Hex approximatif | Usage |
|---|---|---|
| Bois clair | `#d4a574` | Bureaux, comptoir |
| Bois foncé | `#7a4f2a` | Murs, parquet |
| Tapis central | `#a64545` | Tapis / runner au sol |
| Or doux | `#e8b96b` | Guirlandes, liserés posters |
| Vert plante | `#4a7c4a` | Feuilles, foliage |
| Crème | `#f4e4c1` | Murs derrière posters |

### Tech / écrans (froid, contraste)
| Rôle | Hex approximatif | Usage |
|---|---|---|
| Écran allumé | `#1d2444` | Fond d'écran in-game |
| Hex lumineux cyan | `#7ee8e8` | Décoration murale, accents |
| Hex lumineux magenta | `#d774d4` | Accents secondaires |
| Hex lumineux vert acide | `#a8e84a` | Accents tertiaires |
| LED tour PC | `#ff6b6b` | Détail RGB sur tours |

### Fond hors-pièce
| Rôle | Hex approximatif |
|---|---|
| Espace négatif | `#1f2541` (bleu nuit) |

### Personnages
- Couleurs vives unies pour les vêtements (sweats, hoodies). Une dominante par perso pour la reconnaissance instantanée.
- **Les couleurs de rareté restent encodées** dans la lueur émise par le perso (cf. §4) : gris pour Noob, vert menthe pour Gamer, bleu pour Pro, violet pour E-Sport, doré pour Legend.

---

## 3. Projection & composition

- **Vraie isométrie** ratio tile 2:1, angle 30°.
- **Caméra fixe** : le coin avant-gauche de la pièce le plus proche du joueur, deux murs visibles (arrière + droit).
- La pièce flotte dans l'espace négatif bleu nuit, **sans plafond** ni quatrième mur.
- **Vignette / cadrage** : la pièce occupe environ 75 % de la largeur et 80 % de la hauteur de l'écran, centrée. Le reste est de l'espace négatif où peuvent flotter le HUD et des notifications.

---

## 4. Personnages

### Style
- **Chibi 2D** : tête grosse (~⅓ de la hauteur totale), corps trapu, pas de cou.
- Visages expressifs avec yeux ronds simples et bouche minimaliste. **Pas d'anime détaillé.**
- Posture assise par défaut, mains sur le clavier ou la souris. Animation idle (souffle, micro-mouvement, occasionnel sip de canette).
- Une silhouette + une couleur de hoodie + un accessoire signature = identité visuelle complète.

### Évolutions par étoiles
- **1★** : forme de base.
- **3★** : léger glow autour du perso (couleur de rareté).
- **5★** : aura plus marquée + accessoire évolué (ex : casque qui devient RGB).
- **6★** : aura permanente avec particules douces, skin "final form" (couleur de hoodie repeinte, posture plus confiante).

### Le gérant (Active Hub)
Personnage non-pullable derrière le comptoir central. C'est l'avatar du joueur, customisable au démarrage (cheveux, peau, hoodie, lunettes). Il observe la pièce et réagit aux événements (lève le pouce sur jackpot, soupire sur défaite).

---

## 5. Décor

### Sol
- **Parquet bois foncé** vu de dessus, planches orientées dans le sens de la profondeur.
- **Tapis central** rouge/orange motif persan stylisé qui occupe le centre de la pièce. Donne la chaleur principale.

### Murs
- **Mur arrière** : crème clair, accueille **4-6 posters parodiques** alignés (films d'horreur des persos, références gaming type "TRAVEL: HOLIDAY CAMARES", "MÉMÉTIQUE", etc.) et la décoration en hexagones lumineux multicolores (cyan / magenta / vert acide).
- **Mur droit** : également crème, suite de la déco hexagones + emplacements pour plantes ou écrans secondaires.
- Plinthes et baguettes en bois foncé.

### Plafond visuel (hors pièce)
- **Guirlandes lumineuses** suspendues le long des arêtes hautes des deux murs visibles. Petites ampoules dorées qui clignotent doucement (loop d'animation).

### Éléments mobiliers
- **Bureau gaming** : top en bois clair, structure métal noir, RGB léger sur le devant.
- **Chaise gaming** : couleurs variées par poste (vert, marron, gris, rouge…). Forme galbée typique gaming chair, vue de 3/4 dos.
- **Tour PC** : posée à droite ou à gauche du bureau, LED rouge ou cyan visible.
- **Écran** : grand, allumé sur capture du jeu en cours (peut afficher SurvivCrypto, LeagueOfCryptos, etc.).
- **Goodies sur bureau** : canette energy drink, paquet de chips, mug, souris RGB, mousepad. Un ou deux détails par bureau, jamais identique.

### Comptoir central (Active Hub)
- Bureau plus haut, en bois clair, avec **caisse enregistreuse**, écran de gestion, paquet de pizza, mug.
- Le **gérant** est positionné derrière, debout ou assis selon le moment.

### Plantes
- Plantes vertes en pot dans les coins, près des murs. 2-3 par pièce maximum pour ne pas surcharger.

### Emplacements vides
- Représentés par un **rectangle pointillé clair** au sol, avec un cercle "+" central et le texte "Construire" au-dessus.
- Quand survol : le contour pulse doucement et un coût en LanCoin s'affiche en floating text.

---

## 6. UI / HUD

### HUD top
- **Bandeau bois clair** translucide en haut, ~70px, avec liserés or.
- **Compteurs** : LanCoin (cyan), Energy (violet), Street Cred (or). Chacun avec une icône stylisée + valeur en font monospace arrondie.
- **Titre de zone** au centre ("Garage", "Sous-sol"…) en serif arrondie chaude.

### Popups
- Cadre en bois clair, coins arrondis 16-20px, ombre portée douce.
- Background blur derrière (effet "le jeu se met en pause").
- Boutons : remplissage couleur fonctionnelle (vert succès, rouge danger, bleu primaire), texte en majuscules, ombre en bas.

### Pulls de gacha
- **Cinématique courte** : la pièce s'éteint, focus sur une roue de banner ou une boîte de loot, animation de buildup dépendante de la rareté tirée.
- Le perso obtenu apparaît plein-écran avec sa couleur de rareté en flash, puis se pose dans la LAN-House.

---

## 7. Animations

- **Personnages** : idle loop subtil (cycle 2-3s) — souffle, mouvement de souris, rare sip de canette.
- **Écrans** : capture du jeu en cours qui boucle, légère oscillation de luminosité.
- **Guirlandes** : cycle d'illumination des ampoules, toutes les 2-4s.
- **Hexagones muraux** : pulse doux (alpha) avec phases décalées, donne un rythme à la pièce.
- **Tapis** : statique.
- **Construction d'un nouveau poste** : le mobilier "tombe du ciel" avec un easing-back et un *poof* de poussière (sprite particules), 600 ms.
- **Pulls / récompenses** : confettis dans la couleur de rareté, screen shake léger sur Legend.

---

## 8. Sound design

(Inchangé par rapport aux versions précédentes — la DA visuelle ne demande pas de revoir le sound.)

- Lo-fi chill ambiance principale (loop tranquille, comme dans un vrai cybercafé chill).
- Bass / electronic plus nerveux pour les moments de tension (tournois, gacha pulls, jackpots).
- SFX clean et punchy : tink des coins, pop des boutons, whoosh des pulls.

---

## 9. Production des assets

**Le rendu programmatique (Phaser.Graphics) ne peut pas atteindre cette DA.** Tout le décor et les personnages doivent être **produits en amont sous forme d'images 2D** avec fond transparent, puis chargés comme sprites dans Phaser.

Les assets sont produits via :
- **IA d'image** (Gemini, Midjourney, Stable Diffusion) avec des prompts standardisés (cf. `docs/ASSETS.md`).
- À terme, possiblement par un graphiste pour harmoniser et compléter.

Voir `docs/ASSETS.md` pour la liste exhaustive des assets nécessaires et les prompts à utiliser.

---

## 10. Ce que ce jeu n'est PAS visuellement

- Pas de pixel art, pas d'esthétique CRT.
- Pas de réalisme 3D, pas de sprites pré-rendus 3D détaillés.
- Pas de fond sombre du genre cyberpunk dystopique : le cybercafé est cosy, pas glauque.
- Pas de plein-écran sombre noir profond : le fond hors-pièce reste un bleu nuit doux.
- Pas d'UI minimaliste blanche/noire : tout est habillé (bois, ombres, liserés).
- Pas de personnages hyper-détaillés : on reste chibi, simple, expressif.

Le jeu est **un cybercafé clandestin chaleureux qui sent la pizza et les guirlandes lumineuses**. Voilà.
