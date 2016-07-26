#!/bin/bash
REPO_NAME=IntegrationTest.git
ORIGIN_URL=git@github.com:Kmcelyea/IntegrationTest.git
REPO1_URL=git@bitbucket.org:KmcElyea/integrationtest.git
if [ -d "$REPO_NAME" ];
then
cd $REPO_NAME
git fetch origin --tags
git fetch origin master:master
git push repo1 master
git fetch origin production:production
git push repo1 production
git push repo1 --tags
else
git clone --bare $ORIGIN_URL
cd $REPO_NAME
git remote add --mirror=fetch repo1 $REPO1_URL
git fetch origin --tags
git push repo1 master
git push repo1 production
git push repo1 --tags
fi
# cd ..
# rm -rf $REPO_NAME
