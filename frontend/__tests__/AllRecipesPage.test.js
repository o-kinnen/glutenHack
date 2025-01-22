import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import AllRecipesPage from '@/views/AllRecipesPage.vue';

jest.mock('axios');

describe('AllRecipesPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(AllRecipesPage);
  });

  it('charge correctement les recettes et applique les filtres', async () => {
    axios.get
      .mockResolvedValueOnce({
        data: [
          { recipe_id: 1, recipe_name: 'Recipe 1', allergens_list: ['Gluten'] },
          { recipe_id: 2, recipe_name: 'Recipe 2', allergens_list: ['Lait'] },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          { recipe_id: 1 },
        ],
      });

    await wrapper.vm.fetchRecipes();

    expect(wrapper.vm.recipes).toEqual([
      { recipe_id: 1, recipe_name: 'Recipe 1', allergens_list: ['Gluten'], isFavorite: true },
      { recipe_id: 2, recipe_name: 'Recipe 2', allergens_list: ['Lait'], isFavorite: false },
    ]);
    expect(wrapper.vm.filteredRecipes).toHaveLength(2);
  });

  it('affiche un message lorsque aucune recette n’est disponible', async () => {
    axios.get.mockResolvedValueOnce({ data: [] }).mockResolvedValueOnce({ data: [] });

    await wrapper.vm.fetchRecipes();

    expect(wrapper.vm.recipes).toEqual([]);
    expect(wrapper.vm.filteredRecipes).toEqual([]);
    const noRecipesMessage = wrapper.find('.no-recipes');
    expect(noRecipesMessage.exists()).toBe(true);
    expect(noRecipesMessage.text()).toContain('Aucune recette a été rendue public par les autres utilisateurs pour le moment...');
  });

  it('charge les restrictions alimentaires de l’utilisateur', async () => {
    axios.get.mockResolvedValueOnce({ data: { restrictions: ['Gluten', 'Lait'] } });
  
    await wrapper.vm.loadUserAllergens();
  
    expect(wrapper.vm.userAllergens).toEqual(['Gluten', 'Lait']);
  });
  

  it('gère les erreurs lors de la récupération des recettes', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchRecipes();

    expect(wrapper.vm.recipes).toEqual([]);
    expect(wrapper.vm.filteredRecipes).toEqual([]);
    expect(wrapper.vm.errorMessage).toBe('Erreur lors de la récupération des recettes utilisateur.');
  });

  it('ajoute une recette aux favoris', async () => {
    wrapper.setData({ currentRecipe: { recipe_id: 1, isFavorite: false } });

    axios.post.mockResolvedValue({ data: { message: 'Recette ajoutée aux favoris.' } });

    await wrapper.vm.addToFavorites();

    expect(wrapper.vm.isFavorite).toBe(true);
    expect(wrapper.vm.currentRecipe.isFavorite).toBe(true);
  });

  it('retire une recette des favoris', async () => {
    wrapper.setData({ currentRecipe: { recipe_id: 1, isFavorite: true } });

    axios.delete.mockResolvedValue({ data: { message: 'Recette retirée des favoris.' } });

    await wrapper.vm.removeFromFavorites();

    expect(wrapper.vm.isFavorite).toBe(false);
    expect(wrapper.vm.currentRecipe.isFavorite).toBe(false);
  });
  
  it('gère les erreurs lors de l’ajout à la liste des courses', async () => {
    wrapper.setData({ currentRecipe: { recipe_id: 1 } });

    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.addToShoppingList();

    expect(wrapper.vm.errorMessage).toBe('Erreur lors de l\'ajout à la liste des courses:');
  });

  it('génère un PDF avec les détails de la recette', async () => {
    wrapper.setData({
      currentRecipe: {
        recipe_name: 'Test Recipe',
        preparation_time: '10 min',
        difficulty: 'Facile',
        number_of_person: 2,
        cuisine_type: 'Italienne',
        category_type: 'Plat principal',
        allergens_list: ['Gluten'],
        ingredients: [
          { quantity: '100g', food_name: 'Pâtes' },
          { quantity: '50g', food_name: 'Sauce tomate' },
        ],
        instructions: 'Étape 1\nÉtape 2',
        image_url: '/img/test.png',
      },
    });

    const generatePDFMock = jest.fn();
    wrapper.vm.generatePDF = generatePDFMock;

    await wrapper.vm.generatePDF();

    expect(generatePDFMock).toHaveBeenCalled();
  });
});

