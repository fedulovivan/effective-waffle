#/bin/bash

echo "view steps in this file"

#0 complete article
# https://www.keybits.net/post/automatically-use-correct-ssh-key-for-remote-git-repo/

#1 generate new private and public keys
# ssh-keygen -t rsa -C "fedulovivan" -f "fedulovivan"

#1.1 upload public key on page
# https://github.com/settings/keys

#2 create ~/.ssh/config with
# Host github.com-fedulovivan
#     HostName github.com
#     User git
#     IdentityFile /home/johnny/Desktop/Projects/effective-waffle/fedulovivan

#4 set repo props
# git config user.name "fedulovivan"
# git config user.email "fedulovivan@example.com"

#5 alter remote repository url to match ssh config from ~/.ssh/config
# git remote set-url origin git@github.com-fedulovivan:fedulovivan/effective-waffle.git
