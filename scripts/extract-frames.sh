#!/usr/bin/env bash
set -euo pipefail

SOURCE_VIDEO="${1:-DirTyBreakfast_Website_Scroll_Video.MOV}"

if [[ ! -f "$SOURCE_VIDEO" ]]; then
  echo "Source video not found: $SOURCE_VIDEO"
  exit 1
fi

mkdir -p public/assets/frames/desktop public/assets/frames/mobile

ffmpeg -y -i "$SOURCE_VIDEO" \
  -vf "fps=24,scale=1920:-1:flags=lanczos" \
  -q:v 70 public/assets/frames/desktop/frame_%04d.webp

ffmpeg -y -i "$SOURCE_VIDEO" \
  -vf "fps=12,scale=1080:-1:flags=lanczos" \
  -q:v 75 public/assets/frames/mobile/frame_%04d.webp

ffmpeg -y -i "$SOURCE_VIDEO" \
  -vf "select=eq(n\,30),scale=1600:-1" \
  -vframes 1 public/assets/hero-poster.webp

echo "Frames generated from $SOURCE_VIDEO"
