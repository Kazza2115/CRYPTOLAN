# Crypto Lan — Direction artistique

**Style : Neon Flat** · Référence principale : Keep On Mining (EagleEye Games)

---

## 1. Philosophie

Flat design 2D, minimaliste mais vivant. Le style repose sur trois principes :
les couleurs font le travail (pas les textures), les animations créent la satisfaction
(pas le détail graphique), et la lisibilité prime sur tout (le joueur a beaucoup
d'info à l'écran en permanence).

Zéro pixel art. Zéro esthétique rétro. Zéro texture lourde. Tout est lisse,
géométrique, et smooth.

---

## 2. Palette & couleurs

### Fond
- Fond principal : bleu-gris très foncé `#1a1a2e`
- Fond secondaire (panneaux) : `#16213e` ou `#0f0f1a`
- Jamais de noir pur `#000000` — toujours un bleu/violet très sombre

### Couleurs de rareté (langage visuel central)
| Rareté | Couleur | Hex | Usage |
|---|---|---|---|
| Noob | Gris doux | `#8a8a9a` | Fond terne, pas de glow |
| Gamer | Vert menthe | `#4ade80` | Légère luminosité |
| Pro | Bleu électrique | `#3b82f6` | Glow subtil |
| E-Sport | Violet néon | `#a855f7` | Glow marqué |
| Legend | Orange doré | `#f59e0b` | Glow animé permanent, particules |

### Couleurs fonctionnelles
| Fonction | Couleur | Hex |
|---|---|---|
| Gains / monnaie | Cyan | `#22d3ee` |
| Pertes / BUST | Rouge | `#ef4444` |
| Texte principal | Blanc | `#f8fafc` |
| Texte secondaire | Gris clair | `#94a3b8` |
| Bouton primaire | Bleu vif | `#6366f1` |
| Bouton succès | Vert | `#22c55e` |
| Bouton danger | Rouge | `#dc2626` |

### Règle d'or
Les couleurs vives sont **réservées aux éléments interactifs et aux données**.
Le fond et les conteneurs restent sombres et sobres. Si l'écran paraît trop
coloré, c'est qu'il y a trop d'éléments — simplifier le layout, pas les couleurs.

---

## 3. Personnages

### Style
Persos flat stylisés : formes simples, pas de contour noir épais, silhouettes
arrondies et expressives. Chaque perso est reconnaissable par trois éléments :
1. Sa **silhouette** (posture unique)
2. Sa **couleur dominante** (liée à sa rareté)
3. Son **accessoire signature** (casque, lunettes, hoodie, canette, etc.)

Les persos sont petits à l'écran dans la LAN-House. Le détail facial est
minimal — l'expression passe par la posture et l'animation, pas par les traits.

### Animations idle
Chaque perso a une animation idle en boucle qui exprime sa personnalité :
- Grinder : avachi sur le clavier, se frotte les yeux
- Fragger : tape frénétiquement, mouvements saccadés
- Strategist : immobile, boit son café, tourne une page
- Speedrunner : bouge constamment, regarde sa montre
- Laner : posture détendue, clics espacés et précis

Les animations utilisent du **easing ease-out-back** (léger dépassement puis retour).
Jamais de mouvement linéaire. Tout doit rebondir légèrement.

### Évolutions visuelles par étoiles
Les upgrades ne redessinent PAS le perso entièrement. Elles ajoutent :
- **1★** : base, pas de glow
- **3★** : glow léger de la couleur de rareté autour du perso
- **5★** : glow plus marqué + détail ajouté à l'accessoire signature
- **6★** : aura de particules permanent + accessoire transformé + couleurs plus saturées

Le 6★ doit faire envie quand on le voit chez quelqu'un d'autre.

---

## 4. La LAN-House (hub visuel)

### Layout
Vue du dessus légèrement inclinée (pseudo-isométrique flat) ou vue de face
simplifiée. Les PCs sont des blocs rectangulaires arrondis disposés en rangées.

### Les PCs
Chaque PC est un bloc stylisé dont l'écran brille de la couleur de rareté du
perso qui y est assis. Quand un PC grind, son écran pulse légèrement (opacity
oscillation). Quand une partie se termine : pop de particules (vert si victoire,
rouge si défaite).

### Tiers visuels des PCs
| Tier | Apparence |
|---|---|
| PC poubelle | Petit bloc gris terne, écran faible |
| PC gamer | Bloc plus large, écran plus lumineux, une LED |
| Rig RGB | Bloc large, LEDs qui changent de couleur en boucle |
| Station pro | Bloc premium, glow ambiant, stickers, double écran |

### Navigation entre zones
Les étages de la LAN-House sont des **onglets ou tabs scrollables** (pas un
bâtiment à parcourir). Plus adapté au mobile, plus proche du pattern UX de KOM.
Les onglets : Garage → Sous-sol → RDC → VIP → Toit → Bureau.

---

## 5. UI — principes

### Panneaux et cartes
- Fond semi-transparent ou couleur très sombre avec léger bord lumineux
- Coins arrondis (border-radius 12-16px)
- Pas de bordures lourdes ni de double-bordures
- Drop shadow subtil ou bord glow pour la hiérarchie

### Boutons
- Rectangles arrondis, fill de couleur pleine
- Léger gradient interne (top plus clair de 5-10 %)
- État hover : luminosité +10 %, scale 1.02
- État pressed : luminosité -5 %, scale 0.98
- Les boutons importants pulsent légèrement pour attirer l'œil

### Nombres et compteurs
Les nombres montent en temps réel avec un **smooth counter** (rolling digits).
Quand le joueur collecte 5 000 LanCoin, le compteur roule chiffre par chiffre
pendant 0.3-0.5s. Même principe pour les barres de progression (fill avec easing).

### Skill tree / arbre d'upgrades
Directement inspiré de KOM : nodes circulaires reliés par des lignes. Nodes
achetés allumés dans leur couleur, nodes verrouillés en gris. Les lignes entre
nodes s'illuminent quand le chemin est débloqué.

### Popups de récompense
- Centré, fond blur derrière
- L'objet/perso apparaît avec un bounce + flash de lumière
- Bouton "Collecter" en gros, couleur primaire
- Disparition en fade + scale-down

### Écran de gacha (pull)
Buildup : écran qui tremble légèrement → flash de la couleur de rareté →
perso qui apparaît avec son animation de présentation → confettis de sa couleur.
Le flash de couleur tease la rareté avant même que le perso soit visible.

---

## 6. Animations & juice

### Particules
À chaque action satisfaisante :
- **Collecte** : coins/orbes qui volent vers le compteur (courbe bézier)
- **Victoire** : explosion de confettis dans la couleur de rareté
- **Pull gacha** : trainée lumineuse + burst
- **Upgrade** : flash + pulse sur l'élément upgradé
- **Level up** : ring de lumière qui s'étend depuis le perso

Les particules sont simples : cercles, carrés, étoiles, losanges.
Toujours dans les couleurs du jeu. Pas de particules photoréalistes.

### Easing
Tout mouvement utilise `ease-out-back` (léger dépassement puis retour) ou
`ease-out-cubic` pour les transitions plus discrètes. Les éléments n'apparaissent
jamais d'un coup — ils glissent, rebondissent, ou fade-in.

### Screen shake
Léger tremblement d'écran (2-4px, 100-200ms) sur :
- Les crits
- Les BUST de roulette
- Les gros jackpots
- Les Legend pulls

Dosé avec parcimonie. Jamais plus de 1 shake par 5 secondes.

### Glow & bloom
- Les éléments Legend ont un glow permanent (box-shadow animé)
- Les roulettes qui tournent ont un blur radial
- Les boutons CTA pulsent (opacity 0.8 → 1.0, cycle 2s)

---

## 7. Typographie

### Font principale
Sans-serif ronde et lisible. Options recommandées :
- **Nunito** (gratuit, excellent pour les jeux)
- **Poppins** (plus géométrique)
- **Fredoka** (plus ronde et friendly)

Une seule famille de font pour tout le jeu. Cohérence totale.

### Hiérarchie
- Titres : Bold, taille grande
- Texte courant : Regular
- Stats et nombres : Semi-Bold
- Texte secondaire / descriptions : Regular, couleur gris clair

### Nombres
Les nombres utilisent une font **monospace arrondie** (pour que le smooth counter
ne décale pas les chiffres quand ils changent). Options : JetBrains Mono, Space
Mono, ou la font principale si elle a des chiffres tabulaires.

---

## 8. Sound design

### Ambiance
Lo-fi chill pour la LAN-House (type "lo-fi beats to study to"). Calme, répétitif
sans être ennuyeux, volumé bas par défaut. Le joueur doit pouvoir laisser le jeu
ouvert pendant 30 min sans que la musique devienne agaçante.

### Moments de tension
Electronic / bass plus nerveux pour les tournois, les gacha pulls, les raids.
Montée en intensité progressive, pas de transition brutale.

### SFX
Tous les sons sont **clean et punchy** :
- Collecte de coins : "tink" musical qui monte en pitch sur collecte multiple
- Victoire : son ascendant + chime
- Défaite : son descendant court, pas punitif
- Pull gacha : whoosh + impact selon rareté (plus grave = plus rare)
- Upgrade : "ding" satisfaisant + son de montée
- Boutons : pop discret

Pas de sons cracky, vintage, ou lo-fi dans les SFX (contrairement à la musique).
Les SFX doivent être nets et immédiats.

---

## 9. Ce que ce jeu n'est PAS visuellement

- Pas de pixel art
- Pas d'esthétique CRT, scanlines, glitch
- Pas de textures lourdes ou réalistes
- Pas d'UI style Windows XP/98
- Pas de néons comme thème d'ambiance global (les couleurs vives sont réservées aux éléments interactifs)
- Pas de voice acting ou de voice lines style Undertale
- Pas de contours noirs épais sur les persos
- Pas de style anime/manga détaillé

Le jeu est **lisse, clean, moderne, et coloré sur fond sombre**. Point.
