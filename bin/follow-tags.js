#!/usr/bin/env node

const Git = require('simple-git/promise');

const gitUser = process.argv[2];
const gitToken = process.argv[3];
const gitRepo = process.argv[4];
const repoUrl = `https://${gitToken}@github.com/${gitUser}/${gitRepo}.git`;

Git().branch()
    .then(({ current }) => Git().push(repoUrl, `release/${current}`))
    .then(() => {
        console.log('push files');
        return Git().pushTags(repoUrl);
    })
    .then(() => console.log('push tags'))
    .catch((error) => console.error('something went wrong', error));
