import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';
import * as lodash from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(100);
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(100);
    expect(() => bankAccount.withdraw(101)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(100);
    const anotherBankAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(101, anotherBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(101, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.deposit(101);
    expect(bankAccount.getBalance()).toBe(201);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.withdraw(1);
    expect(bankAccount.getBalance()).toBe(99);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(100);
    const anotherBankAccount = getBankAccount(100);
    bankAccount.transfer(51, anotherBankAccount);
    expect(bankAccount.getBalance()).toBe(49);
    expect(anotherBankAccount.getBalance()).toBe(151);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);

    (lodash.random as jest.Mock).mockImplementationOnce(() => 30);
    (lodash.random as jest.Mock).mockImplementationOnce(() => 1);

    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(30);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(100);

    (lodash.random as jest.Mock).mockImplementationOnce(() => 30);
    (lodash.random as jest.Mock).mockImplementationOnce(() => 1);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(30);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);

    (lodash.random as jest.Mock).mockImplementationOnce(() => 99);
    (lodash.random as jest.Mock).mockImplementationOnce(() => 0);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
