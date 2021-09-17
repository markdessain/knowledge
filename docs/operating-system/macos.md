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

Install zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

## Security

brew install --cask authy
brew install --cask keybase
brew install rsc_2fa

## Productivity

brew install --cask raycast
brew install --cask loom

## Development Tools

brew install --cask iterm2
brew install zsh
brew install --cask intellij-idea
brew install --cask goland
brew install --cask pycharm
brew install --cask github
brew install --cask multipass
brew install --cask virtualbox
brew install --cask docker
brew install --cask visual-studio-code
brew install go@1.17
brew install openjdk@11
brew install azure-cli
brew install git
brew install docker
brew install docker-compose
brew install graphviz
brew install jq

## Previous Instructions

### Brew Packages

```bash
brew install <NAME>
```

- azure-cli
- docker
- docker-compose
- go
- goofys
- graphviz
- jq
- jenv
- maven
- node
- pyenv
- pyenv-virtualenv
- ruby
- sbt
- scala
- yarn
- vim
- sqlite
- postgresql

### Brew Casks

```bash
brew install --cask <NAME>
```

- java11
- java16

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
