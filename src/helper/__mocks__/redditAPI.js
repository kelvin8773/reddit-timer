import mockPosts from './mockPosts_javascript.json';

console.log('use mock api');

const getPosts = () => Promise.resolve(mockPosts);

export default getPosts;

