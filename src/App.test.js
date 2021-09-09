import { render } from '@testing-library/react';
import App from './App';

test('App Render Successfully', () => {
  const { container } = render(<App />);
  expect(container).toBeDefined();
});
