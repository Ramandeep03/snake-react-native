# Snake Garden

A mobile-first Snake game built with Expo and React Native. The app has a full-screen illustrated home screen, themed settings, responsive gameplay, and a soft clay-inspired interface.

## Run the app

```sh
npx expo start
```

Use `npx expo start --ios` or `npx expo start --android` to open a platform-specific simulator or device.

## Features

- Responsive grid that fits the available screen space and has a maximum size.
- Random snake position, starting direction, and food for each run.
- Three speed settings.
- Solid wall mode or wraparound edges. Change this from Settings before starting a run.
- Snake self-collision, edge collision, and food placement rules.
- Current score and a saved best score.
- Forest, Ocean, and Sunset themes.
- Optional food, game-over, and turn sounds; looping music; and haptic feedback. Each can be switched off in Settings.
- Full-screen Pause and Game over overlays.

## Controls

Swipe on the play area to steer. Use the header buttons to pause or restart. From the home screen, open Settings to change speed, wall behavior, theme, music, sound effects, and haptics.

## Project layout

- `src/components/` contains the home screen, gameplay UI, settings dialog, and reusable controls.
- `src/game/` contains game state, movement, grid sizing, food placement, collisions, and feedback hooks.
- `src/preferences/` and `src/storage/` manage saved preferences and the best score.
- `assets/` contains app artwork and audio. Audio credits are in [`assets/audio/README.md`](assets/audio/README.md).

## Checks

```sh
npx expo lint
npx tsc --noEmit
```
