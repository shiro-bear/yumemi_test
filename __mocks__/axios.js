// __mocks__/axios.js
module.exports = {
  get: jest.fn(() => Promise.resolve({ data: [] })),
};
