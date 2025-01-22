import { shallowMount } from '@vue/test-utils';
import RecipePage from '../src/views/RecipePage.vue';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  window.alert = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('RecipePage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RecipePage, {
      data() {
        return {
          recipe: null,
          isLoading: false,
          showModal: false,
          showIARecipeModal: false,
          showAllergenAlert: false,
          selectedTime: 'Rapide',
          selectedDifficulty: 'Facile',
          selectedCuisine: 'Européenne',
          selectedPeople: '1',
          selectedType: 'Petit-déjeuner',
          availableIngredients: [],
        };
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('fetches available ingredients on mount', async () => {
    const mockIngredients = [
      { food_name: 'Tomate', quantity: '3 kg' },
      { food_name: 'Oignon', quantity: '1.5 kg' },
    ];
    axios.get.mockResolvedValue({ data: mockIngredients });

    await wrapper.vm.fetchAvailableIngredients();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge`, { withCredentials: true });
    expect(wrapper.vm.availableIngredients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ food_name: 'Tomate', maxQuantity: 3, unit: 'kg' }),
        expect.objectContaining({ food_name: 'Oignon', maxQuantity: 1.5, unit: 'kg' }),
      ])
    );
  });

  it('fetches recipe based on user restrictions', async () => {
    axios.get.mockResolvedValue({ data: { restrictions: ['Gluten'] } });
    axios.post.mockResolvedValue({ data: {
      title: 'Salade',
      ingredients: ['Laitue', 'Tomate'],
      instructions: ['Prenez les ingrédients', 'Mélangez'],
      quantity: [1, 2],
      time: 'Rapide',
      difficulty: 'Facile',
      cuisine: 'Mediterranéen',
      people: 2,
      type: 'Lunch',
    }});

    await wrapper.vm.fetchRecipe();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/restrictions`, { withCredentials: true });
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.VUE_APP_URL_BACKEND}/openai/recipe`,
      expect.objectContaining({
        time: 'Rapide',
        difficulty: 'Facile',
        cuisine: 'Européenne',
        people: '1',
        type: 'Petit-déjeuner',
      }),
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    expect(wrapper.vm.recipe.title).toBe('Salade');
  });

  it('displays allergen alert when no restrictions are set', async () => {
    axios.get.mockResolvedValue({ data: { restrictions: [] } });

    await wrapper.vm.fetchRecipe();

    expect(wrapper.vm.showAllergenAlert).toBe(true);
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('handles error during fetchAvailableIngredients gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchAvailableIngredients();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération des ingrédients en stock', expect.any(Error));
  });

  it('handles recipe modal open/close correctly', async () => {
    wrapper.vm.openModal();
    expect(wrapper.vm.showModal).toBe(true);

    wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);
  });

  it('handles ingredient stock modal interactions', async () => {
    wrapper.vm.toggleStockOption();
    expect(wrapper.vm.showStockModal).toBe(true);

    wrapper.vm.closeStockSelectionModal();
    expect(wrapper.vm.showStockModal).toBe(false);
  });

  it('saves a recipe successfully', async () => {
    wrapper.setData({
      recipe: {
        title: 'Salade',
        ingredients: [{ food_id: 1, quantity: 2 }],
        restrictionsList: [],
      },
    });
    axios.post.mockResolvedValue({ status: 200 });

    await wrapper.vm.saveRecipe();

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.VUE_APP_URL_BACKEND}/recipes/save`,
      expect.objectContaining({
        recipe: expect.objectContaining({ title: 'Salade' }),
        ingredients: expect.any(Array),
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(wrapper.vm.isSaved).toBe(true);
  });

  it('handles error during recipe save gracefully', async () => {
    wrapper.setData({
      recipe: {
        title: 'Salade',
        ingredients: [{ food_id: 1, quantity: 2 }],
      },
    });
    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.saveRecipe();

    expect(console.error).toHaveBeenCalledWith("Erreur lors de l'enregistrement de la recette", expect.any(Error));
    expect(window.alert).toHaveBeenCalledWith('Une erreur est survenue lors de l\'enregistrement de la recette.');
  });

  it('validates ingredient quantities correctly', () => {
    wrapper.setData({
      availableIngredients: [{ food_name: 'Tomate', maxQuantity: 3, selectedQuantity: 5 }],
    });

    wrapper.vm.validateQuantity(wrapper.vm.availableIngredients[0]);

    expect(wrapper.vm.availableIngredients[0].selectedQuantity).toBe(3);
  });
});
