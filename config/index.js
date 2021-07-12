const config = {
    production: {
        SECRET: 'superMaNrUles!',
        DATABASE: 'mongodb+srv://users:iamawesome!@oheweb.kv9fa.mongodb.net/oheUsers?retryWrites=true&w=majority',
        DATABASE_NAME: process.env.MONGODB_NAME,
        SMTP_USER: 'oladipupooladokun@gmail.com',
        SMTP_PASS: 'jaacogchadqaneoc',
        CLIENT_ID: '826926910148-p5et9lgfph4htppnhbmlq07bhh29vhu0.apps.googleusercontent.com',
        CLIENT_SECRET: 'FEqvDS0Et_C0nnokmaviO8hF',
        FB_CLIENT_ID: '489171675556834',
        FB_CLIENT_SECRET: '591c9fa77a7698163f704240f8442092',
        PORT: '8800'
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
    return config[env] || config.default
}
