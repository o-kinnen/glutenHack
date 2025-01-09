import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import axios from 'axios';
import ResetPassword from '../src/views/ResetPassword.vue';

// Mock d'axios
jest.mock('axios');

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

  it('should display an error if the password field is empty', async () => {
    await wrapper.find('#password').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ correctement.');
  });

  it('should display an error if the password does not meet the requirements', async () => {
    await wrapper.find('#password').setValue('short');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#password + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Veuillez remplir ce champ avec au moins 8 caractères.');
  });

  it('should display an error if the passwords do not match', async () => {
    await wrapper.find('#password').setValue('Password1!');
    await wrapper.find('#confirmPassword').setValue('DifferentPassword!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const errorMessage = wrapper.find('#confirmPassword + .text-danger');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Les mots de passe ne correspondent pas.');
  });

  it('should display a success message if password reset is successful', async () => {
    axios.post.mockResolvedValueOnce({
      data: { success: true }
    });
  
    await wrapper.find('#password').setValue('Password1!');
    await wrapper.find('#confirmPassword').setValue('Password1!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
  
    const successMessage = wrapper.find('.alert.alert-success');
    expect(successMessage.exists()).toBe(true);
    expect(successMessage.text()).toContain('Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.');
  });
  

  it('should display an error message if the token is invalid or expired', async () => {
    axios.get.mockResolvedValueOnce({
      data: { success: false, message: 'Le lien de réinitialisation est invalide ou a expiré.' }
    });

    wrapper = mount(ResetPassword, {
      global: {
        mocks: {
          $route: {
            query: { token: 'invalid-token' }
          }
        }
      }
    });

    await flushPromises();

    const message = wrapper.vm.message;
    expect(message).toBe('Le lien de réinitialisation est invalide ou a expiré.');
  });

  it('should display an error message if there is a server error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Server error'));

    await wrapper.find('#password').setValue('Password1!');
    await wrapper.find('#confirmPassword').setValue('Password1!');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    const message = wrapper.vm.message;
    expect(message).toBe('Erreur lors de la réinitialisation du mot de passe.');
  });
});

