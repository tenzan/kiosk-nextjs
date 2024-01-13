// pages/api/logout.js

export default function handler(req, res) {
    res.setHeader('Set-Cookie', 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.redirect('/');
}
