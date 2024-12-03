import { shallowMount } from '@vue/test-utils';
import AllRecipesPage from '../src/views/AllRecipesPage.vue';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  window.alert = jest.fn();
});

describe('AllRecipesPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AllRecipesPage, {
      data() {
        return {
          recipes: [],
          showModal: false,
          currentRecipe: null,
          errorMessage: ''
        };
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('fetches recipes on mount', async () => {
    const recipesMock = [
      { recipe_id: 1, recipe_name: 'Recipe 1', ingredients: [], instructions: '' },
      { recipe_id: 2, recipe_name: 'Recipe 2', ingredients: [], instructions: '' }
    ];
    axios.get.mockResolvedValue({ data: recipesMock });

    await wrapper.vm.fetchRecipes();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/recipes/all`, { withCredentials: true });
    expect(wrapper.vm.recipes).toEqual(recipesMock);
    expect(wrapper.vm.errorMessage).toBe('');
  });

  it('handles error while fetching recipes', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchRecipes();

    expect(wrapper.vm.errorMessage).toBe('Une erreur est survenue lors de la récupération des recettes. Veuillez réessayer plus tard.');
  });

  it('opens and closes modal correctly', async () => {
    wrapper.setData({
      recipes: [{ recipe_id: 1, recipe_name: 'Recipe 1', ingredients: [], instructions: '' }],
    });

    wrapper.vm.openModal(0);
    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.vm.currentRecipe.recipe_name).toBe('Recipe 1');

    wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);
    expect(wrapper.vm.currentRecipe).toBe(null);
  });

  it('displays error message when errorMessage is set', () => {
    wrapper.setData({ errorMessage: 'Une erreur est survenue lors de la récupération des recettes. Veuillez réessayer plus tard.' });

    expect(wrapper.find('.error-message').exists()).toBe(true);
    expect(wrapper.find('.error-message').text()).toBe('Une erreur est survenue lors de la récupération des recettes. Veuillez réessayer plus tard.');
  });

  it('displays no recipes message when recipes list is empty', () => {
    wrapper.setData({ recipes: [] });

    expect(wrapper.find('.no-recipes').exists()).toBe(true);
    expect(wrapper.find('.no-recipes').text()).toBe("Aucune recette n'a été enregistrée pour le moment.");
  });

  it('adds recipe to shopping list successfully', async () => {
    wrapper.setData({
      currentRecipe: { recipe_id: 1, recipe_name: 'Recipe 1' }
    });

    axios.post.mockResolvedValue({ data: { message: 'Ajouté avec succès' } });

    await wrapper.vm.addToShoppingList();

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/shopping-list/add`, {
      recipeId: 1
    }, { withCredentials: true });
  });

  it('handles error while adding to shopping list', async () => {
    wrapper.setData({
      currentRecipe: { recipe_id: 1, recipe_name: 'Recipe 1' }
    });

    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.addToShoppingList();

    expect(wrapper.vm.errorMessage).toBe('Une erreur est survenue lors de la récupération des recettes. Veuillez réessayer plus tard.');
  });
});
