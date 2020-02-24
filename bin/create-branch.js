#!/usr/bin/env node

const Git = require('simple-git/promise');
const Axios = require('axios');

Git().revparse(['--short', 'HEAD']).then((sha) => {
    return Axios.post(`https://api.github.com/repos/${gitUser}/${gitRepo}/refs`, {
        ref: `refs/heads/release${sha}`,
        sha: sha
    }, {
        headers: { 'Authorization': `token ${gitToken}` }
    })
        .then(() => console.log(`create branch release/${sha}`))
})
    .catch((error) => console.error('something went wrong', error));
