#!/usr/bin/env node

const Git = require('simple-git/promise');
const Axios = require('axios');

const gitUser = process.argv[2];
const gitRepo = process.argv[3];
const gitToken = process.argv[4];

Git().revparse(['HEAD']).then((sha) => {
    const shortSha = sha.slice(0,7);
    return Axios.post(`https://api.github.com/repos/${gitUser}/${gitRepo}/git/refs`, {
        ref: `refs/heads/release/${shortSha}`,
        sha: sha
    }, {
        headers: { 'Authorization': `token ${gitToken}` }
    })
        .then(() => console.log(`create branch release/${shortSha}`))
        .then(() => Git().branch(['-a']))
        .then((branches) => console.log('branches', branches))
        .then(() => Git().fetch(`https://github.com/${gitUser}/${gitRepo}.git`, 'master'))
        .then(() => Git().checkout(`${shortSha}`));
})
    .catch((error) => console.error('something went wrong', error));
