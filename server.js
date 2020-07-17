const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        'name':'nithin',
        'age': 20
    })
});

app.listen(4000, () => console.log('app listening on port 4000!'));