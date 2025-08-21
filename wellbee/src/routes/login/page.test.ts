import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

test('renders login form', () => {
  render(Page);
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

