import {
  Layout,
  SkeletonBodyText,
  IndexTable,
  useIndexResourceState,
  Badge,
} from "@shopify/polaris";

export const ProductList = ({ data, isLoading, isRefetching }) => {
  if (isLoading || isRefetching) {
    return (
      <Layout sectioned>
        <SkeletonBodyText />
      </Layout>
    );
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  console.log(data);

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const rowMarkup = data?.data.map(
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
      {rowMarkup}
    </IndexTable>
  );
};
