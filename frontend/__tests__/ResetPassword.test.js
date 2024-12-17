import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import ResetPassword from '../src/views/ResetPassword.vue';

describe('ResetPassword.vue - Password Reset Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ResetPassword, {
      global: {
        mocks: {
          $route: {
            query: { token: 'valid-token' }
          }
        }
      }
    });
    wrapper.setData({ tokenValid: true });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display an error if password is empty', async () => {
    await wrapper.find('#password').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ correctement.');
  });

  it('should display an error if password does not meet requirements', async () => {
    await wrapper.find('#password').setValue('short');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ avec au moins 8 caractères.');
  });

  it('should display an error if passwords do not match', async () => {
    await wrapper.find('#password').setValue('Password1!');
    await wrapper.find('#confirmPassword').setValue('DifferentPassword!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#confirmPassword + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Les mots de passe ne correspondent pas.');
  });

  it('should display a success message if password reset is successful', async () => {
    await wrapper.setData({
        successMessage: 'Mot de passe réinitialisé avec succès.'
      });

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const successMessage = wrapper.find('.alert.alert-success');
    expect(successMessage.exists()).toBe(true);
    expect(successMessage.text()).toContain('Mot de passe réinitialisé avec succès.');
  });

  it('should display an error message if token is invalid or expired', async () => {
    wrapper = mount(ResetPassword, {
      global: {
        mocks: {
          $route: {
            query: { token: 'invalid-token' }
          }
        }
      }
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false, message: 'Le lien de réinitialisation est invalide ou a expiré.' })
      })
    );

    await flushPromises();

    const errorMessage = wrapper.find('.alert.alert-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Erreur lors de la vérification du token. Veuillez réessayer plus tard.');
  });

  it('should display an error message if there is a server error', async () => {
    wrapper.setData({ password: 'Password1!', confirmPassword: 'Password1!' });
    global.fetch = jest.fn(() => Promise.reject(new Error('Server error')));

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('.alert.alert-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Erreur lors de la vérification du token. Veuillez réessayer plus tard.');
  });
});
