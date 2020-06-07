console.log('use mock api');

const getPosts = jest.fn().mockResolvedValue([]);

export default getPosts;

