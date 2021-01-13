const express = require('express');
const app = express();
app.use(express.static('./dist/communicate-ui'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/communicate-ui/'});
});
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
