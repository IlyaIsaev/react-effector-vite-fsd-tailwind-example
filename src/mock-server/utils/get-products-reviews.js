export const getProductsReviews = (products, productsSearch) =>
  products
    .filter((product) => product.name.includes(productsSearch))
    .models.reduce(
      (acc, productModel) => [...acc, ...productModel.reviews.models],
      []
    );
