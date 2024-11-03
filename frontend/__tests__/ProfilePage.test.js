import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import ProfilePage from '../src/views/ProfilePage.vue';

describe('ProfilePage.vue - Fetch Profile and Actions', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProfilePage, {
      data() {
        return {
          username: '',
          email: '',
          errorMessage: '',
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

  it('should fetch profile data successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ username: 'John Doe', email: 'john.doe@example.com' }),
      })
    );

    await wrapper.vm.fetchProfile();
    await flushPromises();

    expect(wrapper.vm.username).toBe('John Doe');
    expect(wrapper.vm.email).toBe('john.doe@example.com');
  });

  it('should display error message if profile fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.' }),
      })
    );

    await wrapper.vm.fetchProfile();
    await flushPromises();

    expect(wrapper.vm.errorMessage).toBe('Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/login');
  });

  it('should call logout and redirect to login page', async () => {
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

  it('should display error message if logout fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await wrapper.vm.logout();
    await flushPromises();

    expect(wrapper.vm.errorMessage).toBe('Erreur lors de la déconnexion.');
  });

  it('should delete account successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );
    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();
  
    await wrapper.vm.deleteAccount();
    await flushPromises();
  
    expect(window.confirm).toHaveBeenCalledWith('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/users/delete'), expect.objectContaining({ method: 'DELETE' }));
    expect(window.alert).toHaveBeenCalledWith('Votre compte a été supprimé avec succès.');
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('logout');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/login');
  });
  
  it('should display error message if delete account fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    window.confirm = jest.fn(() => true);
  
    await wrapper.vm.deleteAccount();
    await flushPromises();
  
    expect(wrapper.vm.errorMessage).toBe('Erreur lors de la suppression du compte.');
  });
  
});

