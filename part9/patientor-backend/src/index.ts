import http from 'http';
import app from './app';

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
