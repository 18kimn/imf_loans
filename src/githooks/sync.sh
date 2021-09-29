#!/usr/bin/env bash

# This syncs to a google drive folder, so that my advisor 
#   can access docs easily (and without going through GitHub)  
# The folder can be accessed at https://drive.google.com/drive/folders/1MeRnSHJDeccUOv7GE7edb7IUO9qTVO0G

# This runs as a pre-push commit, e.g. whenever "git push"
#   is called it runs before files are pushed to Github
#   the hook can be found at src/githooks/pre-push,
#   and is set to only call this script if $USER == "nathan"
#   I'm still keeping it in this repository for my own sanity

# This takes around 7s on my computer, 
# which is a bit long but honestly alright

echo "Preparing to sync to Google Drive..."
rclone sync . \
  drive://_workspace/schoolwork/thesis/imf_loans \
  -L -P --fast-list \
  --exclude "node_modules/**" || {
  echo "something went wrong with rclone, so nothing was synced"
}
echo "Synced to Google Drive."
