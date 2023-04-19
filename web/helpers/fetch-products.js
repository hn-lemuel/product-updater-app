import { Shopify } from "@shopify/shopify-api";

const FETCH_PRODUCTS_QUERY = `{
    products(first: 10, reverse: true) {
      edges {
        node {
          id
          description
          title
          legacyResourceId
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                price
                title
              }
            }
          }
        }
      }
    }
  }
`;

const fetchProducts = async (session) => {
  const client = new Shopify.clients.Graphql({ session });

  try {
    const res = await client.query({
      data: {
        query: FETCH_PRODUCTS_QUERY,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default fetchProducts;
