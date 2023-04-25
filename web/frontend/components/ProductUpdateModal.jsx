import { useState, useCallback, useEffect } from "react";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { Form, FormLayout, Modal, TextField, Checkbox } from "@shopify/polaris";

export const ProductUpdateModal = ({
  showModal,
  setShowModal,
  product,
  refetch,
}) => {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [showToast, setShowToast] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isHot, setIsHot] = useState(false);
  const fetch = useAuthenticatedFetch();

  const { data } = useAppQuery({
    url: `/api/products-highlight/get?id=${product.id}`,
  });

  const handleIsHotEnable = () => {
    setIsHot(!isHot);
  };

  const handleTitleChange = useCallback((value) => {
    setTitle(value);
  }, []);

  const handleDescriptionChange = useCallback((value) => {
    setDescription(value);
  }, []);

  const toggleToast = useCallback(() => setShowToast((active) => !active), []);

  const toastMarkup = showToast ? (
    <Toast content="Product Updated" onDismiss={toggleToast} />
  ) : null;

  const handleUpdateProduct = async () => {
    setIsUpdating(true);

    const updatedProduct = {
      id: product.id,
      title,
      description,
    };

    const response = await fetch("/api/products/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      handleProjectHighlight();
      toggleToast();
      setShowModal(false);
      refetch();
    }

    setIsUpdating(false);
  };

  const handleProjectHighlight = async () => {
    const action = data?.data.length ? "update" : "create";
    const method = data?.data.length ? "PUT" : "POST";

    const updatedProjectHighlight = {
      isHotItem: isHot,
      name: title,
      product_id: product.id,
    };

    const response = await fetch(`/api/products-highlight/${action}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProjectHighlight),
    });

    if (response.ok) {
      console.log("res", response);
    }
  };

  // This update the state with the fetched data
  useEffect(() => {
    setTitle(product?.title || "");
    setDescription(product?.description || "");
    if (data?.data.length) {
      setIsHot(data?.data[0].isHotItem);
    } else {
      setIsHot(false);
    }
  }, [product, data]);

  return (
    <>
      <Modal
        open={showModal}
        title="Update Product"
        onClose={() => setShowModal(false)}
        primaryAction={{
          content: isUpdating ? "Saving..." : "Save Changes",
          onAction: handleUpdateProduct,
          disabled: isUpdating,
        }}
      >
        <Modal.Section>
          <Form>
            <FormLayout>
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={product?.image || ""}
              />
              <TextField
                label="Product Title"
                value={title}
                onChange={handleTitleChange}
              />
              <TextField
                label="Product Description"
                value={description}
                multiline={4}
                onChange={handleDescriptionChange}
              />
              <Checkbox
                label="This product is Hot right now?"
                checked={isHot}
                onChange={handleIsHotEnable}
              />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>

      {toastMarkup}
    </>
  );
};
