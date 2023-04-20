import shopify from "../shopify.js";

const UPDATE_PRODUCT_MUTATION = `
  mutation updateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        descriptionHtml
        title
      }
    }
  }
`;

const productUpdater = async (session, { id, description, title }) => {
  const client = new shopify.api.clients.Graphql({ session });
  await client.query({
    data: {
      query: UPDATE_PRODUCT_MUTATION,
      variables: {
        input: {
          id,
          descriptionHtml: description,
          title,
        },
      },
    },
  });
};

export default productUpdater;
