import { mount, RouterLinkStub } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import LoginPage from '../src/views/LoginPage.vue';

describe('LoginPage.vue - Form Validation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
  });

  it('should display error if email is empty', async () => {
    await wrapper.find('#email').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#email + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ correctement.');
  });

  it('should display error if email format is incorrect', async () => {
    await wrapper.find('#email').setValue('test@');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#email + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain("Le format de l'adresse mail est invalide.");
  });

  it('should display error if password is empty', async () => {
    await wrapper.find('#password').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ correctement.');
  });

  it('should display error message if email or password is incorrect', async () => {
    wrapper.setData({
      errorMessage: 'Mot de passe incorrect.'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('.alert.alert-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Mot de passe incorrect.');
  });

  it('should display error message if account is not found', async () => {
    wrapper.setData({
      errorMessage: 'Compte non trouvé.'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('.alert.alert-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Compte non trouvé.');
  });

  it('should display error message if server communication fails', async () => {
    wrapper.setData({
      errorMessage: 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('.alert.alert-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.');
  });

  it('should navigate to /password when the password link is clicked', async () => {
    const link = wrapper.findAllComponents(RouterLinkStub).find(link => link.props().to === '/password');
    expect(link.exists()).toBe(true);
    expect(link.props().to).toBe('/password');
  });

  it('should navigate to /signup when the signup link is clicked', async () => {
    const link = wrapper.findAllComponents(RouterLinkStub).find(link => link.props().to === '/signup');
    expect(link.exists()).toBe(true);
    expect(link.props().to).toBe('/signup');
  });
});
