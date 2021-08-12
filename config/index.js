const config = {
    production: {
        SECRET: 'superMaNrUles!',
        DATABASE: process.env.MONGODB_URI,
        DATABASE_NAME: process.env.MONGODB_NAME,
        SMTP_USER: process.env.SERVER_USER,
        SMTP_PASS: process.env.SERVER_PASS,
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        FB_CLIENT_ID: process.env.FB_CLIENT_ID,
        FB_CLIENT_SECRET: process.env.FB_CLIENT_SECRET,
        PORT: process.env.PORT
    },
    default: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI_DEV,
        DATABASE_NAME: process.env.MONGODB_NAME,
        SMTP_USER: process.env.SERVER_USER,
        SMTP_PASS: process.env.SERVER_PASS,
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        FB_CLIENT_ID: process.env.FB_CLIENT_ID,
        FB_CLIENT_SECRET: process.env.FB_CLIENT_SECRET,
        PORT: process.env.PORT
    }
}


exports.get = function get(env) {
    return config[env] || config.production
}
