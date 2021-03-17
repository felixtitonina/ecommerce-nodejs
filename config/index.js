module.exports = {
    secret: process.env.NODE_ENV === "production"? process.env: "felixtitonina",
    api: process.env.NODE_ENV  === "production"? "https://api.loja.com": "http://localhost:3000",
    loja: process.env.NODE_ENV  === "production"? "https://loja.com": "http://localhost:8000",

}