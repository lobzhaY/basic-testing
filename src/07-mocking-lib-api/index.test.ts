import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const PATH = '/posts';
const POSTS_DATA = {
  id_1: {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  id_2: {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
};

jest.mock('lodash', () => ({
  throttle: (callback: () => void) => callback,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(PATH);
    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: POSTS_DATA });

    axios.create = jest.fn().mockReturnValue({
      get: getMock,
    });
    await throttledGetDataFromApi(PATH);

    expect(getMock).toHaveBeenCalledWith(PATH);
  });

  test('should return response data', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: POSTS_DATA });
    axios.create = jest.fn().mockReturnValue({
      get: getMock,
    });
    const response = await throttledGetDataFromApi(PATH);

    expect(response).toStrictEqual(POSTS_DATA);
  });
});
