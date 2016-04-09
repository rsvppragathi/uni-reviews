module.exports = {
	db: {
		url: 'mongodb://unireviews:reviewwithme@ds019990.mlab.com:19990/uni-reviews',
		options: {
            server: {
                socketOptions: {
                    // Keep connection alive while server is running
                    keepAlive: 1
                }
            },
            // Attempt to reconnect if connection is lost
            auto_reconnect: true
        }
	}
}
