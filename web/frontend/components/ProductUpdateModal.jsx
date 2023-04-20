import { useState, useCallback } from "react";
import { useNavigate, Toast } from "@shopify/app-bridge-react";
import { Form, FormLayout, Modal, TextField } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks";

export const ProductUpdateModal = ({ showModal, setShowModal, product }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [showToast, setShowToast] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const fetch = useAuthenticatedFetch();

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
      toggleToast();
    }

    setIsUpdating(false);
  };

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
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>

      {toastMarkup}
    </>
  );
};
