import shopify from "../shopify.js";

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
      }
    }
  }
}
`;

const formatGqlResponse = (res) => {
  const { edges = [] } = res?.body?.data?.products || {};

  if (!edges.length) return [];

  return edges.map(({ node }) => {
    const {
      id,
      legacyResourceId: legacyId,
      title,
      description,
      images: { edges: imageEdges = [] } = {},
      variants: { edges: variantEdges = [] } = {},
    } = node;

    const image = imageEdges[0]?.node?.url || "https://placehold.co/600x400";

    const variants = variantEdges.map(({ node: { id, title, price } }) => ({
      id,
      title,
      price,
    }));

    return {
      id,
      legacyId,
      title,
      description,
      image,
      variants,
    };
  });
};

const fetchProducts = async (session) => {
  const client = new shopify.api.clients.Graphql({ session });
  const products = await client.query({
    data: FETCH_PRODUCTS_QUERY,
  });

  return formatGqlResponse(products);
};

export default fetchProducts;
