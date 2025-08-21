import { render, screen, fireEvent } from '@testing-library/svelte';
import DayEntryForm from './DayEntryForm.svelte';

describe('DayEntryForm', () => {
  test('renders rating slider and saves entry', async () => {
    const { component } = render(DayEntryForm);

    const saveButton = await screen.findByRole('button', { name: /save entry/i });
    const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
    expect(dateInput).toBeInTheDocument();

    const handler = vi.fn();
    component.$on('submit', (e) => handler(e.detail));

    await fireEvent.click(saveButton);
    expect(handler).toHaveBeenCalledTimes(1);
    const payload = handler.mock.calls[0][0];
    expect(payload).toHaveProperty('date');
    expect(payload).toHaveProperty('rating');
    expect(payload).toHaveProperty('symptoms');
    expect(payload).toHaveProperty('journal');
  });
});

