module.exports = {
	db: {
		dev: '',
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
