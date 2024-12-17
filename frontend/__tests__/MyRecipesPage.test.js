import { shallowMount } from '@vue/test-utils';
import MyRecipesPage from '../src/views/MyRecipesPage.vue';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  window.alert = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('MyRecipesPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MyRecipesPage, {
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

  it('fetches user recipes on mount', async () => {
    const recipesMock = [
      { recipe_id: 1, recipe_name: 'Recipe 1', preparation_time: '30 min', difficulty: 'Easy', number_of_person: 4, cuisine_type: 'Italian', category_type: 'Main', allergens_list: [], ingredients: [], instructions: 'Step 1\nStep 2' },
      { recipe_id: 2, recipe_name: 'Recipe 2', preparation_time: '45 min', difficulty: 'Medium', number_of_person: 2, cuisine_type: 'French', category_type: 'Dessert', allergens_list: ['Nuts'], ingredients: [], instructions: 'Step A\nStep B' }
    ];
    axios.get.mockResolvedValue({ data: recipesMock });

    await wrapper.vm.fetchUserRecipes();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/recipes/user`, { withCredentials: true });
    expect(wrapper.vm.recipes).toEqual(recipesMock);
    expect(wrapper.vm.errorMessage).toBe('');
  });

  it('handles error while fetching user recipes', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchUserRecipes();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération des recettes utilisateur :', expect.any(Error));
    expect(wrapper.vm.errorMessage).toBe('Une erreur est survenue lors de la récupération de vos recettes. Veuillez réessayer plus tard.');
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

  it('adds recipe to shopping list successfully', async () => {
    wrapper.setData({
      currentRecipe: { recipe_id: 1, recipe_name: 'Recipe 1' }
    });

    axios.post.mockResolvedValue({ data: { message: 'Ajouté avec succès' } });

    await wrapper.vm.addToShoppingList();

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/shopping-list/add`, {
      recipeId: 1
    }, { withCredentials: true });
    expect(window.alert).toHaveBeenCalledWith('Ajouté avec succès');
  });

  it('handles error while adding recipe to shopping list', async () => {
    wrapper.setData({
      currentRecipe: { recipe_id: 1, recipe_name: 'Recipe 1' }
    });

    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.addToShoppingList();

    expect(console.error).toHaveBeenCalledWith("Erreur lors de l'ajout à la liste des courses:", expect.any(Error));
    expect(window.alert).toHaveBeenCalledWith('Une erreur est survenue.');
  });

  it('displays error message when errorMessage is set', () => {
    wrapper.setData({ errorMessage: 'Une erreur est survenue lors de la récupération de vos recettes. Veuillez réessayer plus tard.' });

    expect(wrapper.find('.error-message').exists()).toBe(true);
    expect(wrapper.find('.error-message').text()).toBe('Une erreur est survenue lors de la récupération de vos recettes. Veuillez réessayer plus tard.');
  });

  it('displays no recipes message when recipes list is empty', () => {
    wrapper.setData({ recipes: [] });

    expect(wrapper.find('.no-recipes').exists()).toBe(true);
    expect(wrapper.find('.no-recipes').text()).toBe("Aucune recette n'a été enregistrée pour le moment.");
  });
});
