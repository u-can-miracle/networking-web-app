module.exports = {
	client: {
		url: process.env.WEB_CLIENT_URL || 'localhost',
		port: process.env.WEB_CLIENT_PORT || 5000
	},
	api: {
		url: process.env.API_URL || 'localhost',
		port: process.env.API_PORT || 5001,
		protocol: 'http'
	},
	internalUrls: [
		'/get-app-html',
		'/get-default-state'
	]
}
