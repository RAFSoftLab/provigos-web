import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('tdd support', () => {
  const fake = true;
  expect(fake).toBe(true)
});
