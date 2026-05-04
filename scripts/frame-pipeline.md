# Frame Pipeline Commands

Source video in this repo:
`DirTyBreakfast_Website_Scroll_Video.MOV`

## One-command pipeline
./scripts/extract-frames.sh

## Or run commands manually

### Desktop (24fps)
ffmpeg -i DirTyBreakfast_Website_Scroll_Video.MOV -vf "fps=24,scale=1920:-1:flags=lanczos" -q:v 70 public/assets/frames/desktop/frame_%04d.webp

### Mobile (12fps)
ffmpeg -i DirTyBreakfast_Website_Scroll_Video.MOV -vf "fps=12,scale=1080:-1:flags=lanczos" -q:v 75 public/assets/frames/mobile/frame_%04d.webp

### Poster
ffmpeg -i DirTyBreakfast_Website_Scroll_Video.MOV -vf "select=eq(n\,30),scale=1600:-1" -vframes 1 public/assets/hero-poster.webp
