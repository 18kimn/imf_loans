#!/bin/sh
BASENAME="${1%.*}"

pandoc.exe  -V geometry:margin=1in \
  -f markdown \
  -o "rendered/$BASENAME.pdf" \
  --bibliography ../references/imf.bib \
  --csl ../references/chicago-note-bibliography-with-ibid.csl \
  --pdf-engine=xelatex.exe \
  -V 'mainfont:GARA.TTF' \
  -V 'mainfontoptions:Extension=.ttf, UprightFont=*, BoldFont=*BD, ItalicFont=*IT' \
  $1

echo "file render for $1 finished"


