# Crypto Lan

**Idle RPG gacha en flat design 2D** — Gère un cybercafé clandestin, recrute des gamers, fais-les grinder sur tes PCs, et transforme ton sous-sol miteux en empire e-sport mondial.

PC (Steam) · iOS · Free-to-play · Pas de NFT

---

## Statut

🟡 **Phase 0 → Phase 1** — Pré-production, pas encore de code.

## Documents de design

| Document | Contenu |
|---|---|
| [GDD](docs/GDD.md) | Game Design Document complet (v0.2) |
| [Direction artistique](docs/ART_DIRECTION.md) | Style "Neon Flat", palette, animations, UI, sound |
| [Roster](docs/ROSTER.md) | Personnages (WIP — 8/50 définis) |

## Stack technique

**Pas encore figé.** À trancher avant le premier scaffolding.

Options :
- Godot 4 (GDScript ou C#)
- Unity 6 (C#)
- Web-first (TypeScript + Phaser/Pixi)

## Travailler avec Claude Code

Ce repo contient un `CLAUDE.md` à la racine qui donne à Claude Code tout le
contexte nécessaire pour contribuer au projet. Clone le repo, ouvre un terminal
dedans, et lance `claude`.

### Premiers prompts suggérés

**Discussion tech :**
> Lis le CLAUDE.md, le GDD et l'ART_DIRECTION. Donne-moi ton analyse des 3
> options de stack au regard des priorités du projet. Recommande-en une.

**Structure de projet :**
> Propose-moi une structure de dossiers pour le prototype vertical (section 10
> Phase 1 du GDD). Ne scaffolde rien encore.

**Modélisation des données :**
> Propose un schéma de données pour les entités centrales : Character, Archetype,
> Skill, Equipment, PC, Game, Match. En interfaces TypeScript.

**Démarrer le proto :**
> On démarre le prototype. Stack : [TA STACK]. Commence par scaffolder le projet
> et afficher la LAN-House avec 5 PCs vides.

## Références visuelles

- [Keep On Mining](https://store.steampowered.com/app/3769130/Keep_on_Mining/) — style flat, UI minimaliste, juice
- [AFK Journey](https://store.steampowered.com/app/2685720/) — système gacha, synergies
- [Legend of Mushroom](https://play.google.com/store/apps/details?id=com.joymax.mushroom) — idle loop, progression
- [Cookie Run: Kingdom](https://www.cookierun-kingdom.com/) — personnages, humour, art style

## Licence

Projet privé. Tous droits réservés.
