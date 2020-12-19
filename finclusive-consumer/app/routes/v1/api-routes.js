
const router = require('express').Router();
const consumerHandler = require('../../handlers/ConsumerHandler');
router.get('/consumer/:firstNameSent', consumerHandler.consumerSearch);
router.get('/auth/:firstNameSent', consumerHandler.auth);
module.exports = router;