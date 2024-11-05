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
          showModal: false,
          intolerances: [
            { name: "Lactose", selected: false },
            { name: "Gluten", selected: false },
          ],
          allergies: [
            { name: "Lait", selected: false },
            { name: "Œufs", selected: false },
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
    expect(wrapper.find('h2').text()).toContain('Bienvenue John Doe !');
    expect(wrapper.find('p strong').text()).toBe('john.doe@example.com');
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

  it('should call modifyProfile and log to console', async () => {
    console.log = jest.fn();
    await wrapper.find('button.btn-primary').trigger('click');
    expect(wrapper.vm.showModal).toBe(true);
  });

  it('should render buttons correctly', () => {
    expect(wrapper.find('button.btn-primary').text()).toBe('Modifier le profil');
    expect(wrapper.find('button.btn-secondary').text()).toBe('Se déconnecter');
    expect(wrapper.find('button.btn-danger').text()).toBe('Supprimer le compte');
  });

  it('should show modal when "Modifier le profil" button is clicked', async () => {
    expect(wrapper.vm.showModal).toBe(false);
    await wrapper.find('button.btn-primary').trigger('click');
    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.find('.modal-content').exists()).toBe(true);
  });

  it('should display allergy and intolerance options in modal', async () => {
    wrapper.setData({ showModal: true });
    await flushPromises();
    
    const intoleranceOptions = wrapper.findAll('.section').at(0).findAll('label');
    const allergyOptions = wrapper.findAll('.section').at(1).findAll('label');
    
    expect(intoleranceOptions.at(0).text()).toContain('Lactose');
    expect(intoleranceOptions.at(1).text()).toContain('Gluten');
    expect(allergyOptions.at(0).text()).toContain('Lait');
    expect(allergyOptions.at(1).text()).toContain('Œufs');
  });

  it('should submit selected allergies and intolerances', async () => {
    wrapper.setData({ showModal: true });
    wrapper.vm.intolerances[0].selected = true; // Select Lactose
    wrapper.vm.allergies[1].selected = true; // Select Œufs

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    await wrapper.vm.submitForm();
    await flushPromises();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/update-preferences/'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ allergies: ['Œufs'], intolerances: ['Lactose'] }),
      })
    );
    expect(wrapper.vm.showModal).toBe(false);
  });
});

