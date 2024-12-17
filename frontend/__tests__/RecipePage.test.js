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
          showAllergenAlert: false,
          selectedTime: 'Rapide',
          selectedDifficulty: 'Facile',
          selectedCuisine: 'Européenne',
          selectedPeople: '1',
          selectedType: 'Petit-déjeuner',
          availableIngredients: []
        };
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('fetches recipe with user restrictions', async () => {
    const restrictionsMock = ['Nuts', 'Gluten'];
    axios.get.mockResolvedValue({ data: { restrictions: restrictionsMock } });
    axios.post.mockResolvedValue({ data: {
      title: 'Pancakes',
      ingredients: ['Flour', 'Eggs', 'Milk'],
      instructions: ['Mix ingredients', 'Cook on skillet'],
      quantity: [200, 2, 300],
      time: '20 min',
      difficulty: 'Easy',
      cuisine: 'American',
      people: 2,
      type: 'Breakfast',
      restrictionsList: restrictionsMock
    }});

    await wrapper.vm.fetchRecipe();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/restrictions`, { withCredentials: true });
    expect(wrapper.vm.recipe).toEqual({
      title: 'Pancakes',
      ingredients: ['Flour', 'Eggs', 'Milk'],
      instructions: ['Mix ingredients', 'Cook on skillet'],
      quantity: [200, 2, 300],
      time: '20 min',
      difficulty: 'Easy',
      cuisine: 'American',
      people: 2,
      type: 'Breakfast',
      image: undefined,
      restrictionsList: restrictionsMock
    });
  });

  it('handles error while fetching user restrictions', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchRecipe();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération des restrictions alimentaires :', expect.any(Error));
    expect(window.alert).toHaveBeenCalledWith('Impossible de récupérer les restrictions alimentaires. Veuillez réessayer.');
  });

  it('executes recipe logic and sets recipe data correctly', async () => {
    axios.post.mockResolvedValue({ data: {
      title: 'Pancakes',
      ingredients: ['Flour', 'Eggs', 'Milk'],
      instructions: ['Mix ingredients', 'Cook on skillet'],
      quantity: [200, 2, 300],
      time: '20 min',
      difficulty: 'Easy',
      cuisine: 'American',
      people: 2,
      type: 'Breakfast'
    }});

    await wrapper.vm.executeRecipeLogic();

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/openai/recipe`, {
      time: 'Rapide',
      difficulty: 'Facile',
      cuisine: 'Européenne',
      people: '1',
      type: 'Petit-déjeuner',
      availableIngredients: []
    }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
    expect(wrapper.vm.recipe.title).toBe('Pancakes');
  });

  it('handles error while executing recipe logic', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.executeRecipeLogic();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la recherche de la recette :', expect.any(Error));
    expect(window.alert).toHaveBeenCalledWith('Une erreur est survenue lors de la recherche de la recette. Veuillez réessayer plus tard.');
  });

  it('saves recipe successfully', async () => {
    wrapper.setData({
      recipe: {
        title: 'Pancakes',
        ingredients: [{ food_id: 1, quantity: 200 }],
        restrictionsList: []
      }
    });

    axios.post.mockResolvedValue({ status: 200 });

    await wrapper.vm.saveRecipe();

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/recipes/save`, {
      recipe: {
        title: 'Pancakes',
        ingredients: [{ food_id: 1, quantity: 200 }],
        restrictionsList: []
      },
      ingredients: [{ food_id: 1, quantity: 200 }]
    }, { headers: { 'Content-Type': 'application/json' } });
    expect(window.alert).toHaveBeenCalledWith('Recette enregistrée avec succès !');
  });

  it('handles error while saving recipe', async () => {
    wrapper.setData({
      recipe: {
        title: 'Pancakes',
        ingredients: [{ food_id: 1, quantity: 200 }]
      }
    });

    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.saveRecipe();

    expect(console.error).toHaveBeenCalledWith("Erreur lors de l'enregistrement de la recette :", expect.any(Error));
    expect(window.alert).toHaveBeenCalledWith("Une erreur est survenue lors de l'enregistrement de la recette.");
  });

  it('opens and closes modal correctly', async () => {
    wrapper.vm.openModal();
    expect(wrapper.vm.showModal).toBe(true);

    wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);
  });
});