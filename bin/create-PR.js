#!/usr/bin/env node

const Git = require('simple-git/promise');
const Axios = require('axios');

const gitUser = process.argv[2];
const gitRepo = process.argv[3];

Git().revparse(['--abbrev-ref', 'HEAD'])
    .then((currentBranch) =>
        Axios.post(`https://api.github.com/repos/${gitUser}/${gitRepo}/pulls`, {
            title: 'chore: bump version [skip ci]',
            body: 'this is a release PR, check version and changelog have been updated',
            base: 'master',
            head: currentBranch
        }))
    .then((status) => console.log('pull request created', status))
    .catch((error) => console.error('something went wrong creating the pull request', error);
