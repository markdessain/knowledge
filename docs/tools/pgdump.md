---
id: pgdump
title: pgdump
---

## Introduction


## Create Backup

```bash
sudo apt-get update
sudo apt-get install --yes postgresql-client

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install --update
```

```bash
export AWS_BACKUP_KEY_ID=
export AWS_BACKUP_SECRET_KEY=
mkdir -p ~/.aws
echo "[default]" > ~/.aws/credentials
echo "aws_access_key_id = $AWS_BACKUP_KEY_ID" >> ~/.aws/credentials
echo "aws_secret_access_key = $AWS_BACKUP_SECRET_KEY" >> ~/.aws/credentials
```

```bash
export USER=
export DATABASE=
export HOST=
export PORT=
export PGPASSWORD=
pg_dump --username $USER --host $HOST --port $PORT --dbname $DATABASE > ./backup.sql
cat ./backup.sql | gzip - > ./backup.sql.gz
```

```bash
export AWS_EC2_METADATA_DISABLED=true
aws s3 cp ./backup.sql.gz s3://backup-bucket/database/$(date "+%Y%m%d").sql.gz
```

## Restore Backup

```bash
dropdb <DATABASE_NAME>
createdb <DATABASE_NAME>
psql <DATABASE_NAME> < <BACKUP_DATE>.sql
```