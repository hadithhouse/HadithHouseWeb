#!/bin/bash

source "scripts/base.sh"

DEPLOYMENT_PATH='/var/www/HadithHouseWeb'
LOGS_PATH='/var/log/HadithHouseWeb'

# Ensure that the directory '$DEPLOYMENT_PATH' exists.
log "Ensure that the directory '$DEPLOYMENT_PATH' exists."
if [ ! -d "$DEPLOYMENT_PATH" ]; then
  log "Directory '$DEPLOYMENT_PATH' doesn't exist. Deployment cannot proceed."
  exit 1
fi
log "Directory '$DEPLOYMENT_PATH' exists."

# Ensure that the directory '$LOGS_PATH' exists.
log "Ensure that the directory '$LOGS_PATH' exists."
if [ ! -d "$LOGS_PATH" ]; then
  log "Directory '$LOGS_PATH' doesn't exist. Deployment cannot proceed."
  exit 1
fi
log "Directory '$LOGS_PATH' exists."

# Deleting the content of '${DEPLOYMENT_PATH}'
log "Deleting the content of '${DEPLOYMENT_PATH}'"
rm -rf $DEPLOYMENT_PATH/*

# Copy the project onto the deployment directory.
log "Copying `pwd`/dist/* to $DEPLOYMENT_PATH..."
cp -r ./dist/* $DEPLOYMENT_PATH/

# Change directory to deployment directory.
cd $DEPLOYMENT_PATH

# Give Apache2 ownership of the log files so it can write to them.
log "Give Apache2 ownership of the app files so it can write to them."
chgrp www-data $DEPLOYMENT_PATH
chgrp -R www-data $DEPLOYMENT_PATH/*

# Give Apache2 ownership of the log files so it can write to them.
log "Give Apache2 ownership of the log files so it can write to them."
chgrp www-data $LOGS_PATH
if find "$LOGS_PATH" -mindepth 1 -print -quit | grep -q .; then
  chgrp -R www-data $LOGS_PATH/*
fi

# Gracefully reloading Apache2.
log "Gracefully reloading Apache2..."
sudo /usr/sbin/apache2ctl graceful