import { mount, RouterLinkStub } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import SignupPage from '../src/views/SignupPage.vue';

describe('SignupPage.vue - Form Validation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SignupPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
  });

  it('should display error if username is empty', async () => {
    await wrapper.find('#username').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#username + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ correctement.');
  });

  it('should display error if username is too short', async () => {
    await wrapper.find('#username').setValue('ab');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#username + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ avec au moins 3 caractères.');
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
    await wrapper.find('#email').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ correctement.');
  });

  it('should display error if password is shorter than the minimum length', async () => {
    await wrapper.find('#password').setValue('Pass1!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ avec au moins 8 caractères.');
  });

  it('should display error if password does not contain an uppercase letter', async () => {
    await wrapper.find('#password').setValue('password1!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Le mot de passe doit contenir au moins une lettre majuscule.');
  });

  it('should display error if password does not contain a lowercase letter', async () => {
    await wrapper.find('#password').setValue('PASSWORD1!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Le mot de passe doit contenir au moins une lettre minuscule.');
  });

  it('should display error if password does not contain a number', async () => {
    await wrapper.find('#password').setValue('Password!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Le mot de passe doit contenir au moins un chiffre.');
  });

  it('should display error if password does not contain a special character', async () => {
    await wrapper.find('#password').setValue('Password1');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Le mot de passe doit contenir au moins un caractère spécial.');
  });

  it('should display error if password contains spaces', async () => {
    await wrapper.find('#password').setValue('Password 1!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain("Le mot de passe ne doit pas contenir d'espaces.");
  });

  it('should display error if password is empty', async () => {
    await wrapper.find('#confirmPassword').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#confirmPassword + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ correctement.');
  });

  it('should display error if passwords do not match', async () => {
    await wrapper.find('#password').setValue('Password1!');
    await wrapper.find('#confirmPassword').setValue('Password2!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#confirmPassword + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Les mots de passe ne correspondent pas.');
  });

  it('should display error if terms and conditions are not accepted', async () => {
    await wrapper.find('#username').setValue('ValidUser');
    await wrapper.find('#email').setValue('valid@email.com');
    await wrapper.find('#password').setValue('Password1!');
    await wrapper.find('#confirmPassword').setValue('Password1!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('.alert.alert-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain("Vous devez accepter les conditions d'utilisation.");
  });

  it('should display error if all fields are empty when form is submitted', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessages = wrapper.findAll('.text-danger');
    expect(errorMessages.length).toBeGreaterThan(0);
    expect(errorMessages.at(0).text()).toContain('Veuillez remplir ce champ correctement.');
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

  it('should display success message if signup is successful', async () => {
    await wrapper.setData({
      successMessage: 'Inscription réussie ! Redirection vers la page de connexion...'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const successMessage = wrapper.find('.alert.alert-success');
    expect(successMessage.exists()).toBe(true);
    expect(successMessage.text()).toContain('Inscription réussie ! Redirection vers la page de connexion...');
  });

  it('should navigate to /conditions when the conditions link is clicked', async () => {
    const link = wrapper.findAllComponents(RouterLinkStub).find(link => link.props().to === '/conditions');
    expect(link.exists()).toBe(true);
    expect(link.props().to).toBe('/conditions');
  });

  it('should navigate to /connexion when the login link is clicked', async () => {
    const link = wrapper.findAllComponents(RouterLinkStub).find(link => link.props().to === '/connexion');
    expect(link.exists()).toBe(true);
    expect(link.props().to).toBe('/connexion');
  });
});