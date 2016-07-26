#!/bin/bash
REPO_NAME=IntegrationTest.git 
ORIGIN_URL=git@github.com:Kmcelyea/IntegrationTest.git
REPO1_URL=git@bitbucket.org:KmcElyea/integrationtest.git 
rm -rf $REPO_NAME 
git clone --bare $ORIGIN_URL 
cd $REPO_NAME 
git remote add --mirror=fetch repo1 $REPO1_URL 
git fetch origin --tags 
git push repo1 --all 
git push repo1 --tags