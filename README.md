# DirTy Breakfast Scroll Cinematic Site

## Run
npm install
npm run dev

## Build
npm run build

## Frame generation
- Source video already present in repo root: `DirTyBreakfast_Website_Scroll_Video.MOV`
- Run full pipeline: `./scripts/extract-frames.sh`
- Manual FFmpeg commands: `scripts/frame-pipeline.md`
- Output folders:
  - `public/assets/frames/desktop`
  - `public/assets/frames/mobile`
