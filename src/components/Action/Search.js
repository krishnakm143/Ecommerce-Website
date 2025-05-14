import { getDatabase, ref, query, orderByChild, startAt, endAt, get } from 'firebase/database';

export const searchProductsInDatabase = async (searchQuery) => {
  const db = getDatabase();
  const searchResults = [];

  try {
    const categories = ['kids', 'mens', 'womens'];

    for (const category of categories) {
      const categoryRef = ref(db, `products/${category}`);
      const searchQueryRef = query(
        categoryRef,
        orderByChild('title'),
        startAt(searchQuery),
        endAt(searchQuery + '\uf8ff')
      );

      const snapshot = await get(searchQueryRef);
      console.log(`Snapshot for ${category}:`, snapshot.val());

      if (snapshot.exists()) {
        const products = snapshot.val();
        for (const productId in products) {
          searchResults.push({ id: productId, ...products[productId] });
        }
      } else {
        console.log(`No products found in category: ${category}`);
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return searchResults;
};
