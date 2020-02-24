#!/usr/bin/env node

const Git = require('simple-git/promise');
const Axios = require('axios');

const gitUser = process.argv[2];
const gitRepo = process.argv[3].split('.')[0];
const gitToken = process.argv[4];

Git().revparse(['HEAD']).then((sha) => {
    return Axios.post(`https://api.github.com/repos/${gitUser}/${gitRepo}/git/refs`, {
        ref: `refs/heads/release/${sha.slice(0,8)}`,
        sha: sha
    }, {
        headers: { 'Authorization': `token ${gitToken}` }
    })
        .then(() => console.log(`create branch release/${sha.slice(0,8)}`))
        .then(() => Git().fetch())
        .then(() => Git().checkout(`release/${sha.slice(0,8)}`));
})
    .catch((error) => console.error('something went wrong', error));
