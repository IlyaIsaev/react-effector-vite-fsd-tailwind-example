export const productsRoute = (schema, request) => {
  const searchValue = request.queryParams.searchValue;

  if (searchValue) {
    return schema.products
      .all()
      .filter((product) => product.name.includes(searchValue));
  }

  return schema.products.all();
};
