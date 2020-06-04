import mockPosts from './mockPosts.json';

console.log('use mock api');

export default {
  getPosts: () => Promise.resolve(mockPosts),
};
