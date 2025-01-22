import { shallowMount } from '@vue/test-utils';
import MyRecipesPage from '../src/views/MyRecipesPage.vue';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  window.alert = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
  Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
    value: () => ({
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      createImageData: jest.fn(),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
    }),
  });
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
      { recipe_id: 1, recipe_name: 'Recette 1', isFavorite: false, allergens_list: [] },
      { recipe_id: 2, recipe_name: 'Recette 2', isFavorite: false, allergens_list: [] }
    ];
    const favoritesMock = [];

    axios.get
      .mockResolvedValueOnce({ data: recipesMock }) // Mock pour `/recipes/user`
      .mockResolvedValueOnce({ data: favoritesMock }); // Mock pour `/recipes/favorites`

    await wrapper.vm.fetchUserRecipes();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/recipes/user`, { withCredentials: true });
    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/recipes/favorites`, { withCredentials: true });
    expect(wrapper.vm.recipes).toEqual(
      recipesMock.map(recipe => ({
        ...recipe,
        isFavorite: false,
      }))
    );
  });

  it('handles error while fetching user recipes', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error')); // Pour `/recipes/user`
    axios.get.mockRejectedValueOnce(new Error('Network Error')); // Pour `/recipes/favorites`

    await wrapper.vm.fetchUserRecipes();

    expect(console.error).toHaveBeenCalledWith(expect.any(String), expect.any(Error));
    expect(wrapper.vm.errorMessage).toBe('Erreur lors de la récupération des recettes utilisateur.');
  });

  it('opens and closes modal correctly', async () => {
    wrapper.setData({
      recipes: [{ recipe_id: 1, recipe_name: 'Recette 1', ingredients: [], instructions: '' }],
    });

    wrapper.vm.openModal(wrapper.vm.recipes[0]);
    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.vm.currentRecipe.recipe_name).toBe('Recette 1');

    wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);
    expect(wrapper.vm.currentRecipe).toBe(null);
  });

  it('adds recipe to shopping list successfully', async () => {
    wrapper.setData({
      currentRecipe: { recipe_id: 1, recipe_name: 'Recette 1' }
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
      currentRecipe: { recipe_id: 1, recipe_name: 'Recette 1' }
    });

    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.addToShoppingList();

    expect(console.error).toHaveBeenCalledWith("Erreur lors de l'ajout à la liste des courses:", expect.any(Error));
    expect(window.alert).toHaveBeenCalledWith('Une erreur est survenue.');
  });

  it('displays no recipes message when recipes list is empty', () => {
    wrapper.setData({ recipes: [] });

    expect(wrapper.find('.no-recipes').exists()).toBe(true);
    expect(wrapper.find('.no-recipes').text()).toBe("Aucune recette n'a été enregistrée pour le moment...");
  });

  it('filters recipes based on allergens', async () => {
    wrapper.setData({
      recipes: [
        { recipe_id: 1, recipe_name: 'Recette 1', allergens_list: ['Noix'] },
        { recipe_id: 2, recipe_name: 'Recette 2', allergens_list: [] },
      ],
      selectedAllergens: ['Noix']
    });

    wrapper.vm.filterRecipes();

    expect(wrapper.vm.filteredRecipes.length).toBe(1);
    expect(wrapper.vm.filteredRecipes[0].recipe_name).toBe('Recette 1');
  });
});
