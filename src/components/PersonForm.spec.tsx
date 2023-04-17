import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { IPerson, PersonGender } from '@/models/IPerson';
import { makeStore } from '@/store';
import { PersonForm } from './PersonForm';

const noop = () => {};

const person: IPerson = {
  id: '1',
  birth_year: '19BBY',
  eye_color: 'blue',
  gender: PersonGender.Male,
  hair_color: 'blond',
  height: 172,
  mass: 77,
  name: 'Luke Skywalker',
  skin_color: 'fair',
};

describe('<PersonForm />', () => {
  it('renders component', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <PersonForm value={person} onSave={noop} onClose={noop} />
      </Provider>
    );
    expect(screen.getByText(person.name)).toBeInTheDocument();
  });

  it('shows error', async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <PersonForm value={person} onSave={noop} onClose={noop} />
      </Provider>
    );
    await user.clear(screen.getByRole('name'));
    await user.click(screen.getByRole('submit'));
    expect(screen.getByText('Invalid value')).toBeInTheDocument();
  });

  it('updates data', async () => {
    const newName = 'Darth Vader';
    const onSaveMock = jest.fn();
    const store = makeStore();
    render(
      <Provider store={store}>
        <PersonForm value={person} onSave={onSaveMock} onClose={noop} />
      </Provider>
    );
    await user.clear(screen.getByRole('name'));
    await user.type(screen.getByRole('name'), newName);
    await user.click(screen.getByRole('submit'));
    expect(onSaveMock).toHaveBeenCalledWith(expect.objectContaining({ name: newName }));
  });
});
