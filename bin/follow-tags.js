#!/usr/bin/env node

const Git = require('simple-git/promise');

Git().pushTags('origin')
    .then((status) => console.log('push tags', status))
    .catch((error) => console.error('something went wrong', error));