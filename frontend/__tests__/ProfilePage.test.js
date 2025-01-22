import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import ProfilePage from '../src/views/ProfilePage.vue';

describe('ProfilePage.vue - Tests des fonctionnalités', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProfilePage, {
      data() {
        return {
          username: '',
          email: '',
          errorMessage: '',
          showModal: false,
          userId: 1,
          restrictions: [
            { name: 'Gluten', selected: false },
            { name: 'Lait', selected: false },
            { name: 'Oeufs', selected: false },
            { name: 'Arachide', selected: false }
          ],
        };
      },
      global: {
        mocks: {
          $store: {
            dispatch: jest.fn(),
          },
          $router: {
            push: jest.fn(),
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('fetches profile data successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ username: 'Olivia', email: 'olivia@example.com' }),
      })
    );

    await wrapper.vm.fetchProfile();
    await flushPromises();

    expect(wrapper.vm.username).toBe('Olivia');
    expect(wrapper.vm.email).toBe('olivia@example.com');
    expect(wrapper.find('h2').text()).toContain('Bienvenue Olivia !');
    expect(wrapper.find('p strong').text()).toBe('olivia@example.com');
  });

  it('displays error message if profile fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Erreur lors de la récupération des informations du profil.' }),
      })
    );

    await wrapper.vm.fetchProfile();
    await flushPromises();

    expect(wrapper.vm.errorMessage).toBe('Erreur lors de la récupération des informations du profil.');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/login');
  });

  it('logs out successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    await wrapper.vm.logout();
    await flushPromises();

    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('logout');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/login');
  });

  it('displays error message if logout fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await wrapper.vm.logout();
    await flushPromises();

    expect(wrapper.vm.errorMessage).toBe('Erreur lors de la déconnexion. Veuillez réessayer.');
  });

  it('deletes account successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );
    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();

    await wrapper.vm.deleteAccount();
    await flushPromises();

    expect(window.confirm).toHaveBeenCalledWith(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible'
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/delete'),
      expect.objectContaining({ method: 'DELETE' })
    );
    expect(window.alert).toHaveBeenCalledWith('Votre compte a été supprimé avec succès.');
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('logout');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
  });

  it('displays error message if delete account fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    window.confirm = jest.fn(() => true);

    await wrapper.vm.deleteAccount();
    await flushPromises();

    expect(wrapper.vm.errorMessage).toBe('Erreur lors de la suppression du compte. Veuillez réessayer.');
  });

  it('shows modal when "Modifier mes allergènes" button is clicked', async () => {
    expect(wrapper.vm.showModal).toBe(false);
    await wrapper.find('button.btn.mb-2').trigger('click');
    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.find('.modal-content').exists()).toBe(true);
  });

  it('displays restriction options in modal', async () => {
    wrapper.setData({ showModal: true });
    await flushPromises();

    const restrictionOptions = wrapper.findAll('.checkbox-group label');

    expect(restrictionOptions.at(0).text()).toContain('Gluten');
    expect(restrictionOptions.at(1).text()).toContain('Lait');
    expect(restrictionOptions.at(2).text()).toContain('Oeufs');
    expect(restrictionOptions.at(3).text()).toContain('Arachide');
  });

  it('submits selected restrictions', async () => {
    wrapper.setData({ showModal: true });
    wrapper.vm.restrictions[0].selected = true;
    wrapper.vm.restrictions[3].selected = true;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    await wrapper.vm.submitForm();
    await flushPromises();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/update-preferences/1'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ restrictions: ['Gluten', 'Arachide'] }),
      })
    );
    expect(wrapper.vm.showModal).toBe(false);
  });
});

