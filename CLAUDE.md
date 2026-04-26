# Crypto Lan — contexte projet

## Ce que c'est
Idle RPG gacha en flat design 2D, cible PC (Steam) et iOS. Le joueur gère un cybercafé
clandestin : recrutement de gamers (du Noob au Legend), farm 24/7 sur les PCs,
tournois e-sport, gambling honnête. Humour assumé, univers mémétique.

Pas de NFT, pas de crypto réelle. Économie 100 % interne.

## Référence visuelle principale
**Keep On Mining** par EagleEye Games. Style flat/minimaliste, fond sombre, couleurs
vives saturées, animations smooth et juicy, UI ultra-clean. Zéro pixel art, zéro rétro.

## Documents de référence
- `docs/GDD.md` — Game Design Document complet (v0.2)
- `docs/ROSTER.md` — Roster des persos (WIP)
- `docs/ART_DIRECTION.md` — Direction artistique détaillée (style Neon Flat)

**Lis le GDD et l'ART_DIRECTION avant de proposer quoi que ce soit de structurant.**

## Statut
Phase 0 → Phase 1. Pas encore de code. On démarre le prototype vertical.

## Priorités actuelles
1. Valider le **fun du core loop** avant d'équilibrer quoi que ce soit
2. Prototype vertical : LAN-House jouable avec 5 PCs et 10 persos
3. Une seule boucle : pull → assigner à un PC → partie → récompense → upgrade
4. Pas de serveurs, pas de compte, pas de monétisation au début — tout local

## Stack technique
**Pas encore figé.** Options à trancher avant de scaffolder :
- Godot 4 (GDScript ou C#)
- Unity 6 (C#)
- Web-first (TypeScript + Phaser/Pixi)

**Ne jamais scaffolder un projet sans avoir d'abord demandé et obtenu le choix de stack.**

## Conventions de code
- Typage strict partout (TS strict, C# nullable, GDScript typed)
- Données de jeu (persos, skills, équipement, jeux-PC) dans des fichiers de données
  (JSON/YAML/ressources), **jamais hardcodées**
- Un système = un fichier. Pas de god objects.
- Noms de persos, skills, dialogues : **français** (le jeu est francophone d'abord)
- Noms de variables, fonctions, classes : **anglais**
- Pas de commentaires excessifs. Le code se lit tout seul.

## Direction artistique — résumé (détail dans docs/ART_DIRECTION.md)
- Flat design 2D, fond sombre (#1a1a2e), couleurs vives pour les éléments interactifs
- Couleurs de rareté : gris (Noob), vert menthe (Gamer), bleu électrique (Pro),
  violet néon (E-Sport), orange doré avec glow (Legend)
- Animations smooth avec easing (ease-out-back), particules, juice
- UI dark mode, panneaux semi-transparents, coins arrondis, pas de bordures lourdes
- Typo sans-serif ronde (Nunito/Poppins/Fredoka), nombres en monospace arrondie
- Sound : lo-fi chill ambiance + electronic nerveux pour moments de tension

## Choses à ne PAS faire
- Ne pas coder de pixel art, sprites rétro, esthétique CRT ou Windows XP
- Ne pas coder de NFT, crypto, play-to-earn, marketplace externe
- Ne pas ajouter d'energy system bloquant
- Ne pas cacher les taux de gacha
- Ne pas créer de fichiers doc sans raison — mettre à jour les docs existants
