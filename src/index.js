import app from './app.js';
import './database.js';

const port = app.get('port')
app.listen(port)

console.log('Server on port', port)