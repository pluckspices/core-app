const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        'name':'nithin',
        'age': 20
    })
});

let server = app.listen(process.env.PORT || 4000, () => {
    let port = server.address().port;
    console.log('app listening on port ', port);
});
