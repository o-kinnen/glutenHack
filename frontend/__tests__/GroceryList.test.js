import { shallowMount } from '@vue/test-utils';
import GroceryList from '../src/views/GroceryList.vue';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  window.alert = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('GroceryList.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GroceryList, {
      data() {
        return {
          shoppingItems: [],
          quantities: {},
          groupedItems: {},
          categoriesVisible: false,
          errorMessage: ''
        };
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('fetches shopping list on mount', async () => {
    const shoppingListMock = {
      listId: 1,
      items: [
        { food_id: 1, food_name: 'Apple', quantity: '5', category: 'Fruits' },
        { food_id: 2, food_name: 'Banana', quantity: '3', category: 'Fruits' }
      ]
    };
    axios.get.mockResolvedValue({ data: shoppingListMock });

    await wrapper.vm.fetchShoppingList();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/shopping-list/`, { withCredentials: true });
    expect(wrapper.vm.shoppingItems).toEqual(shoppingListMock.items);
    expect(wrapper.vm.quantities).toEqual({ 1: 5, 2: 3 });
  });

  it('displays error message when there is an error', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.fetchShoppingList();

    expect(wrapper.vm.errorMessage).toBe('Rien pour le moment');
  });

  it('displays "Rien pour le moment" when there are no shopping items', async () => {
    await wrapper.setData({ shoppingItems: [] });

    const emptyMessage = wrapper.find('.empty-message');
    expect(emptyMessage.exists()).toBe(true);
    expect(emptyMessage.text()).toBe('Rien pour le moment');
  });

  it('toggles category view when sorting is enabled', async () => {
    const items = [
      { food_id: 1, food_name: 'Apple', quantity: '5', category: 'Fruits' },
      { food_id: 2, food_name: 'Banana', quantity: '3', category: 'Fruits' }
    ];
    await wrapper.setData({ shoppingItems: items });

    wrapper.vm.toggleSort();
    expect(wrapper.vm.categoriesVisible).toBe(true);
    expect(wrapper.vm.groupedItems).toHaveProperty('Fruits');
  });

  it('deletes an item from the shopping list', async () => {
    wrapper.setData({
      shoppingItems: [
        { food_id: 1, food_name: 'Apple', quantity: '5' },
        { food_id: 2, food_name: 'Banana', quantity: '3' }
      ]
    });

    axios.delete.mockResolvedValue();

    await wrapper.vm.deleteItem('Apple');

    expect(axios.delete).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/shopping-list/delete`, {
      params: { food_name: 'Apple' },
      withCredentials: true
    });
    expect(wrapper.vm.shoppingItems).toEqual([{ food_id: 2, food_name: 'Banana', quantity: '3' }]);
  });

  it('handles error while deleting an item', async () => {
    wrapper.setData({
      shoppingItems: [{ food_id: 1, food_name: 'Apple', quantity: '5' }]
    });

    axios.delete.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.deleteItem('Apple');

    expect(console.error).toHaveBeenCalledWith('Erreur :', expect.any(Error));
  });

  it('updates item quantity correctly', async () => {
    wrapper.setData({
      shoppingItems: [{ food_id: 1, food_name: 'Apple', quantity: '5' }],
      quantities: { 1: 2 }
    });

    axios.post.mockResolvedValue({ data: { newQuantity: '7' } });

    await wrapper.vm.updateQuantity(1, 'add');

    expect(axios.post).toHaveBeenCalledWith(`${process.env.VUE_APP_URL_BACKEND}/shopping-list/update-quantity`, {
      listId: undefined,
      foodId: 1,
      incrementValue: 2
    }, {
      withCredentials: true
    });
    expect(wrapper.vm.shoppingItems[0].quantity).toBe('7');
  });

  it('handles error while updating quantity', async () => {
    wrapper.setData({
      shoppingItems: [{ food_id: 1, food_name: 'Apple', quantity: '5' }],
      quantities: { 1: 2 }
    });

    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.updateQuantity(1, 'add');

    expect(console.error).toHaveBeenCalledWith('Erreur :', expect.any(Error));
  });

  it('alerts when updating quantity to an invalid value', async () => {
    wrapper.setData({ quantities: { 1: -1 } });

    await wrapper.vm.updateQuantity(1, 'add');

    expect(window.alert).toHaveBeenCalledWith('Veuillez entrer une quantité valide.');
  });
});
