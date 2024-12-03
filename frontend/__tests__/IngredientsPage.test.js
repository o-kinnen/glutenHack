import { shallowMount } from '@vue/test-utils';
import IngredientsPage from '../src/views/IngredientsPage.vue';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  window.alert = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
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
          isLoading: false,
          sortByCategory: false
        };
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('fetches ingredients from the fridge on created', async () => {
    const ingredientsMock = [
      { food_name: 'Apple', quantity: '5', category: 'Fruits' },
      { food_name: 'Milk', quantity: '1 l', category: 'Dairy' }
    ];
    axios.get.mockResolvedValue({ data: ingredientsMock });

    await wrapper.vm.fetchIngredientsFromFridge();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge`, { withCredentials: true });
    expect(wrapper.vm.ingredients).toEqual([
      { name: 'Apple', quantity: '5', category: 'Fruits', updateQuantity: 0 },
      { name: 'Milk', quantity: '1 l', category: 'Dairy', updateQuantity: 0 }
    ]);
  });

  it('handles error while fetching ingredients', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchIngredientsFromFridge();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération des ingrédients :', expect.any(Error));
  });

  it('adds a new ingredient successfully', async () => {
    wrapper.setData({
      newIngredient: 'Carrot',
      newQuantity: '3',
      newUnit: 'kg'
    });

    axios.post.mockResolvedValue({ status: 200 });

    await wrapper.vm.addIngredient();

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/add`, {
      foodName: 'Carrot',
      quantity: '3 kg'
    }, { withCredentials: true });
    expect(wrapper.vm.newIngredient).toBe('');
    expect(wrapper.vm.newQuantity).toBe('');
    expect(wrapper.vm.newUnit).toBe('');
  });

  it('handles error while adding a new ingredient', async () => {
    wrapper.setData({ newIngredient: 'Carrot', newQuantity: '3', newUnit: 'kg' });

    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.addIngredient();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de l\'ajout de l\'aliment :', expect.any(Error));
  });

  it('updates ingredient quantity successfully', async () => {
    wrapper.setData({
      ingredients: [{ name: 'Apple', quantity: '5', category: 'Fruits', updateQuantity: 0 }]
    });
    wrapper.vm.ingredients[0].updateQuantity = 2;

    axios.put.mockResolvedValue({ status: 200 });

    await wrapper.vm.updateIngredientQuantity(0, 'Apple', 2, 'add');

    expect(axios.put).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/update`, {
      foodName: 'Apple',
      quantity: 7,
      unit: ''
    }, { withCredentials: true });
  });

  it('handles error while updating ingredient quantity', async () => {
    wrapper.setData({
      ingredients: [{ name: 'Apple', quantity: '5', category: 'Fruits', updateQuantity: 0 }]
    });
    wrapper.vm.ingredients[0].updateQuantity = 2;

    axios.put.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.updateIngredientQuantity(0, 'Apple', 2, 'add');

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la mise à jour de l\'aliment :', expect.any(Error));
  });

  it('removes an ingredient successfully', async () => {
    wrapper.setData({
      ingredients: [{ name: 'Apple', quantity: '5', category: 'Fruits', updateQuantity: 0 }]
    });

    axios.delete.mockResolvedValue({ status: 200 });

    await wrapper.vm.removeIngredient(0, 'Apple');

    expect(axios.delete).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/users/fridge/delete`, {
      params: { foodName: 'Apple' },
      withCredentials: true
    });
    expect(wrapper.vm.ingredients.length).toBe(0);
  });

  it('handles error while removing an ingredient', async () => {
    wrapper.setData({
      ingredients: [{ name: 'Apple', quantity: '5', category: 'Fruits', updateQuantity: 0 }]
    });

    axios.delete.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.removeIngredient(0, 'Apple');

    expect(console.error).toHaveBeenCalledWith('Erreur lors de la suppression de l\'aliment :', expect.any(Error));
  });
});
