# Crypto Lan — Game Design Document

Version 0.2 · Document de travail · Avril 2026

---

## 1. Pitch & vision

### Le pitch en une phrase

Tu gères un cybercafé clandestin des années 2000 : tu recrutes des joueurs du Noob asocial au pro e-sport, tu les fais grinder 24/7 sur tes PCs, tu pulls des loots, tu montes des équipes pour les tournois, et tu transformes ton sous-sol miteux en empire e-sport mondial.

### Identité

- **Genre** : Idle RPG avec mécaniques gacha
- **Plateformes** : PC (Steam) et iOS en priorité, Android en second temps
- **Cible** : Joueurs 18-35 ans, profondeur moyenne (15-30 min actives/jour)
- **Art** : Flat design 2D "Neon Flat", fond sombre, couleurs vives, animations smooth (ref: Keep On Mining)
- **Monétisation** : Free-to-play, pas de NFT, pas de crypto réelle
- **Références gameplay** : AFK Journey, Legend of Mushroom, Watcher of Realms, Cookie Run Kingdom
- **Références visuelles** : Keep On Mining (EagleEye Games), Idle Miner Tycoon, Cookie Run Kingdom

### Les 3 piliers d'accroche

1. **Boucle idle sur plusieurs horizons.** PCs qui produisent en continu (cap 12h offline), parties courtes 15-30 min, parties longues 4-8h, tournois tous les 2 jours, events hebdo, saisons mensuelles. Le joueur a toujours une raison de revenir.

2. **Gacha profond avec théoricraft accessible.** 5 raretés × 5 archétypes = 25 niches de persos. Kit unique par perso (passif, signature, actif, ultimate), débloqué via dupes. Synergies d'équipe (archétype + lore caché) = vrais choix de compo. F2P optimisé peut rivaliser avec whale non-optimisé.

3. **Gambling honnête et satisfaisant.** Roulette de multiplicateurs sur les gains, loot boxes d'équipement, prestige wheel, Casino de la LAN. Chaque action contient une composante de hasard visible. Taux exposés.

### Ce qui nous différencie

La majorité des idles sont en univers fantasy ou sci-fi génériques. Crypto Lan est un idle sur le gaming lui-même : références assumées, persos parodiques de streamers, jeux-PC fictifs qui singent les vrais (SurvivCrypto, LeagueOfCryptos, CryCounter-Strike, HearthScam). Mémétique par construction.

---

## 2. Boucle de jeu principale

### La LAN-House (hub central)

Vue pixel art du cybercafé. Le joueur voit ses persos assis aux PCs en temps réel avec des animations idle (click souris, rire, rage, soda). À l'écran : PCs actifs et timers, ressources en haut, notifications de fin de partie sur le côté.

### Actions typiques par session

- Collecter les gains des parties terminées
- Choisir quoi relancer sur chaque PC (perso + jeu + roulette oui/non)
- Pull sur le banner actif
- Équiper les drops, upgrade un perso si dupe reçue
- Dailies et hebdos
- Éventuellement une action saisonnière (tournoi, raid, event)

### Trois échelles de temps

- **Micro (5-30 s)** : chaque clic produit un feedback — collecter, regarder une roulette, ouvrir une loot box. Dopamine drip.
- **Meso (15-30 min)** : session type. Entrée (3 min) collecte → action (10 min) gestion → sortie (5 min) relance + fermeture.
- **Macro (jours/semaines/saisons)** : monter un Legend à 6★, compléter une synergie, prestige, rang ladder, nouvel étage.

---

## 3. Progression & méta-structure

### La LAN-House évolutive

Le cybercafé commence avec 5 PCs pourris dans un garage. Il évolue visuellement au fil de la progression — c'est la récompense visuelle principale.

**Upgrades de PCs** : 4 tiers visibles par PC — PC poubelle → PC gamer → rig RGB → station pro. Plus de gains et de drops rares à chaque tier. Coût : LanCoin + matériaux droppés.

**Nombre de PCs** : démarre à 5, peut monter jusqu'à 20-30 à l'endgame. Chaque nouveau PC = ligne de farm supplémentaire.

### Zones débloquables

| Zone | Déblocage | Contenu |
|---|---|---|
| Garage | Tuto | 5 PCs de base |
| Sous-sol | Niv 10 | Zone gambling, Casino de la LAN |
| Rez-de-chaussée | Niv 20 | LAN-House standard, jusqu'à 15 PCs |
| 1er étage VIP | Niv 35 | PCs haut de gamme, buffs permanents |
| Toit | Niv 50 | Training camp, boost XP équipe |
| Bureau du patron | Niv 70 | Hub gestion, automations avancées |

### Personnel du cybercafé

- **Coach** : réduit le temps de jeu et augmente un peu le taux de victoire
- **Manager** : auto-collect des gains pendant que le joueur est offline
- **Technicien** : auto-upgrade des PCs selon priorité configurée
- **Streameuse** : génère des revenus passifs en monnaie premium selon réputation

### Prestige (rejouabilité infinie)

Après 3-4 semaines de jeu actif, le joueur peut "Fermer boutique et déménager". Il perd tout (persos, coins, équipement, PCs) mais gagne des **Street Cred points** qui donnent des bonus permanents cumulables :

- +5 % gains passifs (cap +100 %)
- +2 % chance drop rare (cap +50 %)
- Nouveaux jeux PC cosmétiques
- Skins LAN exclusifs (cyberpunk, 80s, Japon)
- Slots de persos conservés entre prestiges (1 au début, puis 2, 3...)

Chaque prestige est plus rapide que le précédent — super-progression.

---

## 4. Gacha & système de personnages

### Les 5 raretés

| Rang | Couleur | Taux | Pity | Au lancement |
|---|---|---|---|---|
| Noob | Gris | 60 % | — | 15 persos |
| Gamer | Vert | 27 % | — | 15 persos |
| Pro | Bleu | 10 % | Garanti tous les 10 pulls | 12 persos |
| E-Sport | Violet | 2,5 % | — | 6 persos |
| Legend | Orange animé | 0,5 % | Garanti au 80e pull | 2 persos |

Soft pity à partir du 65e pull : les taux de Legend montent progressivement jusqu'au pity garanti au 80e.

### Les 5 archétypes

| Archétype | Jeux favoris | Rôle |
|---|---|---|
| Fragger | CryCounter-Strike, OverMeme | Dégâts directs, crits, parties courtes |
| Laner | LeagueOfCryptos, Dota Free | Scaling, OP en late |
| Strategist | HearthScam, ChessBase 3000 | Buffs équipe, réduction temps |
| Speedrunner | SonicCoin, MarioRunner64 | Vitesse pure, daily challenges |
| Grinder | SurvivCrypto, WoW Classic Ultra | Loot x2, drops rares boostés |

Chaque perso = rareté × archétype. Même un Noob a sa place s'il est du bon archétype pour le bon contexte.

### Kit de skills (4 slots)

- **Slot 1 — Passif de classe** : fixe selon archétype
- **Slot 2 — Signature** : fixe, unique au perso, sa personnalité gameplay
- **Slot 3 — Skill actif** : débloqué à 3★, se proc pendant la partie
- **Slot 4 — Ultimate** : débloqué à 5★, effet dramatique, long cooldown

Règle d'écriture : chaque skill doit avoir du flavor, pas juste des chiffres. "+15 % dégâts" = mort. "Quand un allié Fragger perd, Kévin tape sa souris sur la table et gagne +25 % dégâts pendant 30s" = vivant.

### Système d'étoiles (1★ à 6★)

| Étoiles | Effet |
|---|---|
| 1★ | Base, slots 1 et 2 |
| 2★ | +15 % stats, nouvelle tenue |
| 3★ | Débloque skill actif |
| 4★ | +25 % stats, animation idle unique |
| 5★ | Débloque ultimate |
| 6★ | +50 % cumulé, skin complet, voice lines, forme finale |

Les dupes ne sont jamais perdues. Noob commun → 6★ en ~6 dupes. Legend → beaucoup plus, comblé via fragments F2P.

### Les 2 Legends de lancement

#### Viktor « LegendaryGrind » Volkov

Archétype : Grinder. Ex-mineur de bitcoin reconverti en farmeur pro, n'a pas vu la lumière du soleil depuis 2017.

- **Passif** : *Patience infinie* — parties sans limite de temps, génèrent jusqu'au stop manuel (cap 24h)
- **Signature** : *L'homme qui murmure aux drops* — double les drops d'équipement de l'équipe, rares ont +1 tier garanti
- **Actif (3★)** : *Mode Zombie* — après 6h de grind continu, gains x1,5
- **Ultimate (5★)** : *Addiction chronique* — joue 3 parties en parallèle sur un seul PC (mécanique unique qui brise la règle 1 perso = 1 PC)
- **Skin 6★** : cernes bleues qui brillent dans le noir, stickers sur la chaise

#### Miyu « Queen AFK » Nakamura

Archétype : Strategist. Streameuse japonaise de 19 ans connue pour avoir gagné un tournoi en étant techniquement déconnectée.

- **Passif** : *Meta reader* — voit les compos des tournois adverses avant de valider la sienne
- **Signature** : *Pause café éternelle* — gains offline au-delà du cap de 12h (jusqu'à 24h)
- **Actif (3★)** : *Boost de stream* — toutes les 4h, double les stats d'un allié pour la prochaine partie
- **Ultimate (5★)** : *Raid de viewers* — débloque un 6e slot d'équipe pour tous les modes
- **Skin 6★** : setup gagne 3 écrans, couronne de chat virtuel

Viktor = meilleur farmeur. Miyu = meilleur compétiteur. Dilemme F2P pour choisir qui farmer en premier.

### Système de fragments F2P

Objectif : permettre à un F2P de compléter 1-2 Legends par saison. Fragments **choisis, pas aléatoires** — boutique dédiée. Contrat clair.

| Source | Fragments/semaine |
|---|---|
| Boutique hebdo LanCoin | ~15 |
| Boutique de tournoi | ~10 |
| Ladder PvP | 5-25 |
| Event saisonnier | 30-80 |
| Battle Pass gratuit | ~10 |
| Achievements long terme | variable |

Coût Legend complet : 300 frags pour débloquer + 600 pour 6★ = 900 total. Avec ~80 frags/semaine, Legend débloqué en 4 semaines, 6★ en 10 semaines (une saison).

### Synergies d'équipe

**Couche 1 — Synergies d'archétype (documentées)** :

| Compo | Nom | Effet |
|---|---|---|
| 3+ Fraggers | Full Rush | -20 % durée, +15 % dégâts |
| 3+ Laners | Scaling Comp | +50 % gains sur parties >2h |
| 3+ Strategists | Big Brain | 1 re-roll de résultat/partie |
| 3+ Speedrunners | Any% Run | -40 % durée, -20 % gains |
| 3+ Grinders | Loot Goblin | +60 % drops |
| 5 archétypes diff. | Balanced Team | +10 % à toutes les stats |
| 5 même archétype | Mono-Team | +35 % stat principale, -20 % défense |

**Couche 2 — Synergies de lore (cachées)** : non documentées in-game, découvertes par la communauté. Ex : Famille Volkov, Cybercafé de Casablanca, Rivalité Noob/Pro, ships canon avec dialogues spéciaux.

---

## 5. Systèmes de gameplay

### Les parties (grind de base)

Le joueur assigne un perso à un PC et choisit un jeu-PC disponible. Chaque jeu a durée + taux de victoire de base, modifiés par archétype et équipement.

Exemples :

- SurvivCrypto : 12h, 62 % de victoire — favorise Grinder
- LeagueOfCryptos : 17h, 74 % — favorise Laner
- CryCounter-Strike : 4h, 55 % — favorise Fragger, haute rotation
- HearthScam : 8h, 80 % — favorise Strategist, safe

Arbitrage durée × taux × gains attendus. Victoire = LanCoin promis - taxe. Défaite = pénalité.

### Taxe LAN-House

La LAN-House prélève 25 % des gains à la fin de chaque partie (victoire ou défaite). Cette taxe descend de 2 % par jour de fidélité continue jusqu'à un plancher de 7 %. Mécanisme rétention déguisé en flavor.

### La Roulette (gambling de gains)

Avant de lancer une partie, le joueur peut payer 2 LanCoin pour activer une Roulette qui multipliera les gains :

| Multi | Proba | Effet |
|---|---|---|
| x1 | 75 % | Rien |
| x2 | 19,9 % | Gains doublés |
| x3 | 4 % | Gains triplés |
| x5 | 1 % | Jackpot |
| x10 | 0,09 % | Jackpot ultime |
| BUST | 0,01 % | Gains perdus |

Le BUST à 0,01 % est crucial : sans perte possible, ce n'est pas du gambling mais une loterie gratuite peu addictive.

### Équipement (6 slots par perso)

- **Souris** — crit, vitesse d'action
- **Clavier** — dégâts, combos
- **Casque** — résistance, communication équipe
- **Chaise** — endurance, durée de grind
- **Écran** — précision, drops rares
- **Boisson énergisante** (consommable) — buff temporaire de session

Drop dans les parties, amélioré via enchantements, 5 tiers de rareté.

---

## 6. Modes de jeu

| Mode | Fréquence | Description |
|---|---|---|
| LAN-House | Permanent 24/7 | Farm de base |
| My Room | Permanent | Solo, 1 perso, sans taxe mais plafonné |
| Tournois E-Sport | Tous les 2 jours | 5 persos bloqués, jackpot jusqu'à x3 |
| Speedrun Challenges | Daily | Mini-défis chronométrés |
| Raid Boss Streamer | Weekly | Coop async, dégâts cumulés serveur |
| Ladder PvP Ranked | Saison mensuelle | Combat auto, skins exclusifs |
| Events saisonniers | Rotation 2 sem | Persos limités, nouveau banner |

### Tournois E-Sport (détail)

Minimum 10 persos pour participer. Le joueur sélectionne 5 persos qui sont bloqués dans la LAN-House pendant le tournoi (24-48h). Entrée coûte des tokens, victoire jusqu'à x3. Système de draft : voir compo adverse avant de valider.

### My Room (détail)

Le joueur paye un PC personnel pour y stacker un seul personnage sans frais de LAN-House. Mode de farm dédié sans taxe, plafonné en ressources par jour. Idéal pour main un perso spécifique.

---

## 7. Boucle de rétention

| Échelle | Mécanisme | Objectif |
|---|---|---|
| Toutes les 30 s | Clic collecte, micro-feedback | Dopamine drip |
| Toutes les 15 min | Fin de partie courte, roulette | Engagement actif |
| Toutes les 4-8 h | Fin de partie longue, gros drops | Raison de revenir |
| Daily | Connexion reward, 3 quêtes | Habitude quotidienne |
| Weekly | Raid boss, boutiques, 7 quêtes | Structure de semaine |
| Bi-hebdo | Event saisonnier, banner | Mini-FOMO |
| Mensuel | Saison PvP, nouveau Legend | Gros rendez-vous |

### Courbe de rétention J1-J30

- **J1** : tuto + 1er pull garanti E-Sport
- **J3** : 10 pulls gratuits distribués
- **J7** : mode tournoi débloqué, 2e E-Sport garanti
- **J14** : 1re saison démarre, découverte des fragments Legend
- **J21** : 1er Legend à portée, ladder PvP débloqué
- **J30** : fin de saison, récompenses, nouveau banner

---

## 8. Économie & monétisation

### Devises

| Monnaie | Type | Usage |
|---|---|---|
| LanCoin | Soft | Upgrades, enchantements, boutique hebdo, taxe |
| Energy Drink | Premium | Pulls sur les banners |
| Street Cred | Meta | Prestige, bonus permanents |
| Fragments | Ciblés | Spécifiques à un perso |
| Tournament Token | Event | Boutique de tournoi |
| Tickets VIP | Hybride | Entrée raids et events premium |

### Monétisation

**Principe** : pas de pay-to-win dur. Whales achètent de la vitesse et du style, pas de la puissance brute.

- **Packs Energy Drinks** : 5€, 15€, 50€ — pour les pulls
- **Battle Pass saisonnier** : ~10€/mois, track gratuit + premium
- **Starter packs ciblés** : offres à prix cassé post-milestones
- **Cosmétiques** : skins LAN, skins persos, emotes (achat direct, pas loot box cosmétique)
- **Pack fondateur** (launch only, 30 premiers jours) : 30€, un Legend au choix + skin exclusif

### Ce qu'on ne fait PAS

- Pas d'energy system qui bloque le gameplay
- Pas de timer payant pour skip les cooldowns critiques
- Pas de taux cachés
- Pas de NFT, pas de crypto réelle
- Pas de pop-ups intrusifs ni pub vidéo forcée

---

## 9. Direction artistique

> **Document détaillé** : voir `docs/ART_DIRECTION.md` pour les specs complètes
> (palette hex, principes d'animation, typographie, sound design).
>
> **Référence principale** : Keep On Mining (EagleEye Games).

### Style visuel — "Neon Flat"

Flat design 2D minimaliste. Fond sombre (`#1a1a2e`), éléments interactifs en couleurs vives saturées. Zéro pixel art, zéro texture lourde, zéro esthétique rétro. Tout est lisse, géométrique, et smooth. Les couleurs font le travail, pas les textures. La lisibilité prime sur le détail graphique.

Couleurs de rareté = langage visuel central : gris (Noob), vert menthe (Gamer), bleu électrique (Pro), violet néon (E-Sport), orange doré avec glow animé (Legend).

### Personnages

Persos flat stylisés : formes simples, silhouettes arrondies, pas de contour noir épais. Chaque perso = silhouette unique + couleur dominante + accessoire signature. L'expression passe par la posture et l'animation idle, pas par les traits faciaux. Évolutions visuelles par étoiles via glow et aura de particules, pas via redesign complet.

### Interface

UI dark mode, panneaux semi-transparents, coins arrondis (12-16px), pas de bordures lourdes. Nombres en smooth counter (rolling digits). Skill tree en nodes circulaires reliés par des lignes (style KOM). Popups de récompense avec bounce + flash + blur background.

### Animations & juice

Easing ease-out-back sur tout mouvement. Particules à chaque action satisfaisante (collecte, victoire, pull, upgrade). Screen shake léger sur les crits et jackpots. Glow permanent sur les éléments Legend. Rien n'apparaît d'un coup — tout glisse, rebondit, ou fade-in.

### Sound design

Lo-fi chill pour l'ambiance LAN-House, electronic/bass nerveux pour les moments de tension (tournois, gacha, raids). SFX clean et punchy : tink musical pour les coins, whoosh + impact pour les pulls, pop discret pour les boutons. Pas de sons vintage ou cracky.

---

## 10. Roadmap

### Phase 0 — Pré-production (en cours)

- GDD
- Économie chiffrée complète
- Roster détaillé des 50 persos
- Benchmarks techniques (engine, stack serveur)
- Recherche graphiste pixel art

### Phase 1 — Prototype vertical (2-3 mois)

- LAN-House fonctionnelle avec 5 PCs
- 10 persos (2 par archétype) codés
- Boucle gacha complète : pull → résultat → dupe → étoiles
- Un seul mode : LAN-House
- Jouable solo par l'équipe pour valider le fun

### Phase 2 — Alpha fermée (3-4 mois)

- Roster à 30 persos
- Tournois + My Room + Roulette
- Économie calibrée sur cohorte test
- Serveurs en ligne, comptes utilisateurs
- Tests fermés ~200 joueurs Discord

### Phase 3 — Beta ouverte (2-3 mois)

- Roster complet à 50 persos
- Tous les modes actifs
- Premier Battle Pass test
- Soft launch 1-2 pays
- Ajustements métriques rétention

### Phase 4 — Lancement global

- Launch Steam + App Store
- Marketing communautés gaming/idle
- Roadmap de saisons sur 12 mois

### Jalons critiques

- **Milestone 1 — Fun prouvé** : fin Phase 1, au moins 3 membres de l'équipe doivent vouloir rejouer chaque jour sans qu'on leur demande. Sinon, on ne passe pas en Phase 2.
- **Milestone 2 — Rétention D7 > 25 %** : fin Phase 2. Seuil industry qui indique que la boucle tient.
- **Milestone 3 — ARPDAU viable** : fin Phase 3 soft launch. Au moins 0,15 $/DAU pour valider le modèle avant launch.

---

## 11. Risques & questions ouvertes

### Risques

- **Créatif** : ton humoristique peut mal vieillir, références gaming peuvent dater. Mitigation : privilégier archétypes atemporels.
- **Technique** : idle multi-plateforme avec sync cloud = défi back-end. Mitigation : prototype back-end très tôt.
- **Économique** : équilibrer gacha + gambling + F2P viable + whales satisfaits. Mitigation : live-ops permanent.
- **Juridique** : loot boxes sous surveillance (Belgique, Pays-Bas, Chine). Mitigation : taux affichés, compliance avant soft launch.
- **Burnout dev** : gacha = live-ops constant. Mitigation : équipe content dès le lancement.

### Questions ouvertes

- Moteur : Godot / Unity / web-first ?
- Solo dev ou équipe recrutée ?
- Territoire de soft launch : francophone ou international ?
- Cross-save PC/iOS dès le lancement ou post-launch ?
- Saisons 30 jours (standard) ou 45 jours (breathing room) ?
- PvP ranked : auto-battler ou interactif ?
- Guildes au lancement ou post-launch ?

---

## Note de clôture

Ce document est une base de travail, pas un cahier des charges figé. L'idée originale — cybercafé, gamers, gambling honnête, progression satisfaisante — est solide. Ce GDD la structure pour qu'elle soit productible, équilibrable et scalable.

**Le fun se prouve avant que les chiffres soient équilibrés.** Tant qu'on ne tient pas un prototype où l'équipe a envie de revenir jouer chaque jour, tout le reste est théorique.
