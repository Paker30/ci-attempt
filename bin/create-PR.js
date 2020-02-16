#!/usr/bin/env node

const Git = require('simple-git/promise');
const repoUrl = `https://${$GIT_USER}:${$GIT_PASSWORD}@github.com/${GIT_USER}/${$REPO}`; 

Git.addRemote('origin', repoUrl);

Git().raw(['request-pull', '-p', 'master', './'])
    .then((status) => console.log('create PR', status))
    .catch((error) => console.error('something went wrong', error));