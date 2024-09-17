const express=require('express')

const errhandler=((err, req, res, next) => {
    console.error(err);
    if (!res.headersSent) {
        res.status(500).json({ error: 'Something went wrong' });
    } else {
        console.warn('already sent')
    }
});

exports.module=errhandler