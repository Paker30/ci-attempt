#!/usr/bin/env node

const Git = require('simple-git/promise');

const gitUser = process.argv[2];
const gitToken = process.argv[3];
const gitRepo = process.argv[4];
const repoUrl = `https://${gitToken}@github.com/${gitUser}/${gitRepo}.git`;

Git().branch()
    .then(({current}) => Promise.all([
        Git().push(repoUrl, `release/${current}`)
        , Git().pushTags(repoUrl)
    ]))
    .then((status) => console.log('push tags', status))
    .catch((error) => console.error('something went wrong', error));

