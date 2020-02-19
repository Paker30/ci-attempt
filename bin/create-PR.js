#!/usr/bin/env node

const Git = require('simple-git/promise');

const gitUser = process.argv[2];
const gitPassword = process.argv[3];
const gitRepo = process.argv[4];
const repoUrl = `https://${gitUser}:${gitPassword}@github.com/${gitUser}/${gitRepo}`;

Git().revparse(['--abbrev-ref', 'HEAD'])
    .then((currentBranch) => Git().raw(['request-pull', '-p', 'master', './']))
    .then((status) => console.log('create PR', status))
    .catch((error) => console.error('something went wrong', error));
