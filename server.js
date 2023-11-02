const express = require('express');
const app = express();

const PORT = 3000;

// body parse
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Api route
app.use('/api', require('./api'));

//error handling
app.use((err,req,res,next) => {
    const status = err.status ??500;
    const message = err.message ?? 'Internal server error.';
    res.status(status).json( {message} );
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})