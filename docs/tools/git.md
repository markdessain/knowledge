---
id: git
title: git
---

## Introduction

## Setup Github CLI

Save multiple tokens for the cli in seperate text files. Use `--with-token` to authenticate.

```bash
gh auth status

gh auth login --with-token < ~/.config/github-work.txt
gh auth login --with-token < ~/.config/github-personal.txt

ssh-keygen -t rsa -C "<name>@<work>.com"
ssh-keygen -t rsa -C "<name>@<personal>.com"
```

## Multiple Git accounts

Seperate github accounts will require seperate ssh keys. We can add them all to the agent when we switch to that context.

Each repo will need the email and username to be set indipendently otherwise it'll use the global settings.

Inside the repo run:

```bash
git config user.email <email>
git config user.name <name>
```

## Switching Context

Account can either by `work` or `personal`

```bash
export GIT_ACCOUNT=<account>
gh auth login --with-token < ~/.markdessain/config/github-$GIT_ACCOUNT.txt
ssh-add -D
ssh-add ~/.ssh/id_rsa_$GIT_ACCOUNT
```
