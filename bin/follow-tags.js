#!/usr/bin/env node

const Git = require('simple-git/promise');

const gitUser = process.argv[2];
const gitRepo = process.argv[3];
const gitToken = process.argv[4];
const repoUrl = `https://github.com/${gitUser}/${gitRepo}.git`;

Git().revparse(['--abbrev-ref', 'HEAD'])
    .then((currentBranch) => Promise.all([
        Git().push(repoUrl, currentBranch)
        , Git().pushTags(repoUrl)
    ]))
    .then((status) => console.log('push tags', status))
    .catch((error) => console.error('something went wrong', error));

