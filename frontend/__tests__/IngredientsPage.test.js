import { shallowMount } from '@vue/test-utils';
import IngredientsPage from '../src/views/IngredientsPage.vue';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'mock-url'); // Mock URL.createObjectURL
  window.alert = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
  global.URL.createObjectURL.mockRestore();
});

describe('IngredientsPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(IngredientsPage, {
      data() {
        return {
          newIngredient: '',
          newQuantity: '',
          newUnit: '',
          searchIngredient: '',
          ingredients: [],
          imageFile: null,
          imageUrl: '',
          analysisResult: [],
          isLoading: false,
          errorMessage: '',
          showModal: false,
        };
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('fetches ingredients from the fridge on created', async () => {
    const ingredientsMock = [
      { food_name: 'Pomme', quantity: '5', category: 'Fruits' },
      { food_name: 'Lait', quantity: '1 l', category: 'Produits laitier' },
    ];
    axios.get.mockResolvedValue({ data: ingredientsMock });

    await wrapper.vm.fetchIngredientsFromFridge();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge`, { withCredentials: true });
    expect(wrapper.vm.ingredients).toEqual([
      { name: 'Pomme', quantity: '5', category: 'Fruits', updateQuantity: 0 },
      { name: 'Lait', quantity: '1 l', category: 'Produits laitier', updateQuantity: 0 },
    ]);
  });

  it('handles error while fetching ingredients', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchIngredientsFromFridge();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération des ingrédients', expect.any(Error));
  });

  it('adds a new ingredient successfully', async () => {
    wrapper.setData({
      newIngredient: 'Carotte',
      newQuantity: '3',
      newUnit: 'kg',
    });

    axios.post.mockResolvedValue({ status: 200 });

    await wrapper.vm.addIngredient();

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/add`, {
      foodName: 'Carotte',
      quantity: '3 kg',
    }, { withCredentials: true });
    expect(wrapper.vm.newIngredient).toBe('');
    expect(wrapper.vm.newQuantity).toBe('');
    expect(wrapper.vm.newUnit).toBe('');
  });

  it('handles error while adding a new ingredient', async () => {
    wrapper.setData({ newIngredient: 'Carotte', newQuantity: '3', newUnit: 'kg' });

    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.addIngredient();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de l\'ajout de l\'aliment', expect.any(Error));
  });

  it('updates ingredient quantity successfully', async () => {
    wrapper.setData({
      ingredients: [{ name: 'Pomme', quantity: '5', category: 'Fruits', updateQuantity: 0 }],
    });
    wrapper.vm.ingredients[0].updateQuantity = 2;

    axios.put.mockResolvedValue({ status: 200 });

    await wrapper.vm.updateIngredientQuantity(0, 'Pomme', 2, 'add');

    expect(axios.put).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/update`, {
      foodName: 'Pomme',
      quantity: 7,
      unit: '',
    }, { withCredentials: true });
    expect(wrapper.vm.ingredients[0].quantity).toBe('7');
  });

  it('handles error while updating ingredient quantity', async () => {
    wrapper.setData({
      ingredients: [{ name: 'Pomme', quantity: '5', category: 'Fruits', updateQuantity: 0 }],
    });
    wrapper.vm.ingredients[0].updateQuantity = 2;

    axios.put.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.updateIngredientQuantity(0, 'Pomme', 2, 'add');

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la mise à jour de l\'aliment', expect.any(Error));
  });

  it('removes an ingredient successfully', async () => {
    wrapper.setData({
      ingredients: [{ name: 'Pomme', quantity: '5', category: 'Fruits', updateQuantity: 0 }],
    });

    axios.delete.mockResolvedValue({ status: 200 });

    await wrapper.vm.removeIngredient(0, 'Pomme');

    expect(axios.delete).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/delete`, {
      params: { foodName: 'Pomme' },
      withCredentials: true,
    });
    expect(wrapper.vm.ingredients.length).toBe(0);
  });

  it('handles error while removing an ingredient', async () => {
    wrapper.setData({
      ingredients: [{ name: 'Pomme', quantity: '5', category: 'Fruits', updateQuantity: 0 }],
    });

    axios.delete.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.removeIngredient(0, 'Pomme');

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la suppression de l\'aliment', expect.any(Error));
  });

  it('analyzes an image and updates the analysis result', async () => {
    const analysisMock = [
      { name: 'Banane', probability: 0.98 },
      { name: 'Pomme', probability: 0.75 },
    ];
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    const mockEvent = { target: { files: [file] } };

    wrapper.vm.onFileChange(mockEvent);
    expect(wrapper.vm.imageFile).toBe(file);

    axios.post.mockResolvedValue({ data: { data: analysisMock } });

    await wrapper.vm.analyzeImage();

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/analyzeImage`, expect.any(FormData), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    expect(wrapper.vm.analysisResult).toEqual([
      { name: 'Banane', probability: 0.98, selected: false, quantity: '', unit: '' },
      { name: 'Pomme', probability: 0.75, selected: false, quantity: '', unit: '' },
    ]);
  });

  it('handles error during image analysis', async () => {
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    const mockEvent = { target: { files: [file] } };

    wrapper.vm.onFileChange(mockEvent);
    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.analyzeImage();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de l\'analyse de l\'image', expect.any(Error));
  });

  it('validates the selection of analyzed ingredients', async () => {
    wrapper.setData({
      analysisResult: [
        { name: 'Banane', selected: true, quantity: '3', unit: 'kg' },
        { name: 'Pomme', selected: false, quantity: '', unit: '' },
      ],
    });

    axios.post.mockResolvedValue({ status: 200 });

    await wrapper.vm.validateSelection();

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/add`, {
      foodName: 'Banane',
      quantity: '3 kg',
    }, { withCredentials: true });
    expect(wrapper.vm.analysisResult.length).toBe(0);
  });
});
