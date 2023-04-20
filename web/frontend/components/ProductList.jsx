import {
  Layout,
  SkeletonBodyText,
  IndexTable,
  EmptyState,
} from "@shopify/polaris";

export const ProductList = ({ data, isLoading, isRefetching }) => {
  const products = data?.data;

  if (isLoading || isRefetching) {
    return (
      <Layout sectioned>
        <SkeletonBodyText />
      </Layout>
    );
  }

  if (!products) {
    return (
      <EmptyState
        heading="No Products Found"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Please add products</p>
      </EmptyState>
    );
  }

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const productsRowMarkup = products.map(
    ({ id, image, title, description }, index) => (
      <IndexTable.Row key={id} position={index}>
        <IndexTable.Cell>
          <img src={image} alt={title} width={50} height={50} />
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <IndexTable
      resourceName={resourceName}
      itemCount={data.data?.length}
      selectable={false}
      headings={[
        { title: "Image" },
        { title: "Title" },
        { title: "Description" },
      ]}
    >
      {productsRowMarkup}
    </IndexTable>
  );
};
