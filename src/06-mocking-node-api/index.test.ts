import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import fs from 'fs';
import path from 'path';

const TIME = 200;
const TIME_COUNT = 3;
const callback = jest.fn();
const PATH_TO_FILE = 'text.txt';
const CONTENT_TO_FILE = 'I`am so tired! Move on!';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutMock = jest.fn();
    jest.spyOn(global, 'setTimeout').mockImplementation(setTimeoutMock);

    doStuffByTimeout(callback, TIME);

    jest.advanceTimersByTime(TIME);
    expect(setTimeoutMock).toHaveBeenCalledWith(callback, TIME);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, TIME);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalMock = jest.fn();
    jest.spyOn(global, 'setInterval').mockImplementation(setIntervalMock);

    doStuffByInterval(callback, TIME);
    jest.advanceTimersByTime(TIME);
    expect(setIntervalMock).toHaveBeenCalledWith(callback, TIME);

    setIntervalMock.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, TIME);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME * TIME_COUNT);
    expect(callback).toHaveBeenCalledTimes(TIME_COUNT);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathJoinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(PATH_TO_FILE);
    expect(pathJoinSpy).toHaveBeenCalledWith(expect.anything(), PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const content = await readFileAsynchronously(PATH_TO_FILE);

    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    const fsPromisesReadFileSpy = jest.spyOn(fs.promises, 'readFile');
    fsPromisesReadFileSpy.mockResolvedValue(CONTENT_TO_FILE);
    const content = await readFileAsynchronously(PATH_TO_FILE);

    expect(content).toBe(CONTENT_TO_FILE);
  });
});
