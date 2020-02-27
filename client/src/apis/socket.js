import io from 'socket.io-client';

const socket = io('https://ecommerce-cms.herokuapp.com');

export default socket;
