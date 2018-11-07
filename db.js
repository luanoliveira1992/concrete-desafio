const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://rlfo:cF34DKcmzPv97v7@ds147073.mlab.com:47073/concrete-rlfo', {
	useNewUrlParser: true,
	useCreateIndex: true
});
