const express = require('express');
const app =express();

app.get('/api/users', (req, res) => {
  res.send(['user 1', 'user 2']);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
