---
id: macos
title: MacOS
---

## Introduction

Applications are installed either via [Homebrew](https://brew.sh), through the [Apple App Store](https://www.apple.com/app-store/) or by downloading directly from the apps website.

Below are the popular packages which are used on a frequent basis.

## Getting Started

Install homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Security

```bash
brew install --cask authy
brew install --cask keybase
brew install rsc_2fa
```

## Productivity

```bash
brew install --cask raycast
brew install --cask loom
brew install --cask chromium
brew install --cask google-chrome
brew install --cask microsoft-outlook
brew install --cask notion
brew install --cask skype
brew install --cask drawio
brew install slack
```

## Development Tools

```bash
brew install --cask iterm2
brew install zsh
brew install --cask intellij-idea
brew install --cask goland
brew install --cask pycharm
brew install --cask datagrip
brew install --cask multipass
brew install --cask virtualbox
brew install --cask docker
brew install --cask visual-studio-code
brew install --cask postman
brew install go@1.17
brew install openjdk@11
brew install node@16
brew install azure-cli
brew install git
brew install docker
brew install docker-compose
brew install podman
brew install graphviz
brew install jq
brew install gh
brew tap adoptopenjdk/openjdk
brew install --cask adoptopenjdk11
brew install --cask microsoft-azure-storage-explorer
brew install terraform
brew install superfly/tap/flyctl
brew tap heroku/brew 
brew install heroku
brew install upx
brew install mysql
brew install rust
brew install rustup
brew install wasm-pack
brew install rustup-init
brew install awscli
brew install --cask google-cloud-sdk
brew install gcutil
brew tap tinygo-org/tools
brew install tinygo
brew install postgresql
brew install postgrest
brew install golang-migrate
brew install tmux
brew install overmind
brew install ffmpeg  
brew install youtube-dl
brew install yt-dlp/taps/yt-dlp
brew install --cask ngrok
brew install sqlc
brew install atlas
brew install k9s
brew install mkcert
brew install cocoapods
brew install --cask flutter
brew install helm@2
```

## Extras

Install zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Install Node Red

```bash
npm install -g node-red
```

### Applications

- Postgress.app
- Postico
- Raycast
- Keybase
- Magnet
- Metabase
- Multipass
- Azure Data Studio
- draw.io
- iTerm
- Loom
- GoLand
- PyCharm
- IntelliJ
