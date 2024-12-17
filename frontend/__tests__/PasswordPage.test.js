import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import PasswordPage from '../src/views/PasswordPage.vue';

describe('PasswordPage.vue - Password Reset Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(PasswordPage);
  });
  
  it('should display an error if email is empty', async () => {
    await wrapper.find('#email').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#email + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ correctement.');
  });

  it('should display an error if email format is incorrect', async () => {
    await wrapper.find('#email').setValue('invalid-email');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#email + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain("Le format de l'adresse mail est invalide.");
  });

  it('should display a success message if email is valid and request is successful', async () => {
    await wrapper.setData({
      successMessage: 'Email de réinitialisation envoyé.'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const successMessage = wrapper.find('.alert.alert-success');
    expect(successMessage.exists()).toBe(true);
    expect(successMessage.text()).toContain('Email de réinitialisation envoyé.');
  });

  it('should display an error message if email is not found', async () => {
    wrapper.setData({
      errorMessage: 'Compte non trouvé.'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('.alert.alert-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Compte non trouvé.');
  });

  it('should display an error message if there is a server error', async () => {
    wrapper.setData({ 
      errorMessage: 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('.alert.alert-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.');
  });
});
