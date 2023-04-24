import { useEffect, useState } from "react";
import {
  Layout,
  SkeletonBodyText,
  IndexTable,
  Button,
  Thumbnail,
} from "@shopify/polaris";
import { ProductUpdateModal } from "./ProductUpdateModal";
import ProductHightlight from "./ProductHightlight";

export const ProductList = ({ data, isLoading, isRefetching, refetch }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
          <Thumbnail source={image} alt={title} />
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>
          <ProductHightlight id={id} />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Button
            onClick={() => {
              setSelectedProduct({ id, image, title, description });
              setShowModal(true);
            }}
            primary
          >
            Update Product
          </Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <>
      <IndexTable
        resourceName={resourceName}
        itemCount={data?.data?.length}
        selectable={false}
        headings={[
          { title: "Image" },
          { title: "Title" },
          { title: "Description" },
          { title: "Highlight" },
          { title: "Action" },
        ]}
      >
        {productsRowMarkup}
      </IndexTable>
      {selectedProduct && (
        <ProductUpdateModal
          showModal={showModal}
          setShowModal={setShowModal}
          product={selectedProduct}
          refetch={refetch}
        />
      )}
    </>
  );
};
