module.exports = {
    middleware: {
        0: function (req, res, next) {
            const url = req.url;
            if (url.endsWith('.pdf')) {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'inline');
            }
            next();
        }
    }
};