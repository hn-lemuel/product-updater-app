import { useEffect, useState } from "react";
import { Layout, SkeletonBodyText, IndexTable } from "@shopify/polaris";

export const ProductList = ({ data, isLoading, isRefetching }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  if (isLoading || isRefetching) {
    return (
      <Layout sectioned>
        <SkeletonBodyText />
      </Layout>
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
      itemCount={data?.data?.length}
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
