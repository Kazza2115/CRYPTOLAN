# Crypto Lan

**Idle RPG gacha en flat design 2D** — Gère un cybercafé clandestin, recrute des gamers, fais-les grinder sur tes PCs, et transforme ton sous-sol miteux en empire e-sport mondial.

PC (Steam) · iOS · Free-to-play · Pas de NFT

---

## Statut

🟢 **Phase 1 — Prototype vertical en cours.** Premier rendu visible : LAN-House du Garage avec 5 PCs.

## Documents de design

| Document | Contenu |
|---|---|
| [GDD](docs/GDD.md) | Game Design Document complet (v0.2) |
| [Direction artistique](docs/ART_DIRECTION.md) | Style "Neon Flat", palette, animations, UI, sound |
| [Roster](docs/ROSTER.md) | Personnages (WIP — 8/50 définis) |

## Stack technique

- **TypeScript** strict (typage partout, JSON pour les données de jeu)
- **Vite** (dev server avec hot-reload, build de prod)
- **Phaser 3** (moteur 2D, rendu Canvas/WebGL)
- **GitHub Pages** (déploiement auto à chaque push via GitHub Actions)

Choix : web-first pour permettre une boucle de feedback rapide — chaque push déploie une nouvelle version visible dans un navigateur, sans rien à installer côté observateur.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:5173](http://localhost:5173).

## Voir l'avancement en ligne

Une fois GitHub Pages activé sur le repo (**Settings → Pages → Source : *GitHub Actions***), chaque push sur `main` ou sur la branche de dev déclenche un déploiement.

URL une fois activé : `https://kazza2115.github.io/CRYPTOLAN/`

## Structure du projet

```
src/
  config/        # palette de couleurs, fonts (Neon Flat)
  types/         # interfaces TS (Character, Pc, PcGame...)
  data/          # JSON sources (jamais hardcodés en code)
  systems/       # chargeurs et systèmes (DataLoader...)
  entities/      # vues Phaser (PcView...)
  scenes/        # BootScene, LanHouseScene
  main.ts        # bootstrap Phaser
```

Conventions : un système = un fichier, pas de god objects, données toujours en JSON externe.

## Travailler avec Claude Code

Ce repo contient un `CLAUDE.md` à la racine qui donne à Claude Code tout le contexte nécessaire pour contribuer. Clone le repo, ouvre un terminal dedans, et lance `claude`.

## Références visuelles

- [Keep On Mining](https://store.steampowered.com/app/3769130/Keep_on_Mining/) — style flat, UI minimaliste, juice
- [AFK Journey](https://store.steampowered.com/app/2685720/) — système gacha, synergies
- [Legend of Mushroom](https://play.google.com/store/apps/details?id=com.joymax.mushroom) — idle loop, progression
- [Cookie Run: Kingdom](https://www.cookierun-kingdom.com/) — personnages, humour, art style

## Licence

Projet privé. Tous droits réservés.
