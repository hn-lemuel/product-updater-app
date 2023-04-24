import { useState, useCallback, useEffect } from "react";
import { Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import {
  Form,
  FormLayout,
  Modal,
  TextField,
  Button,
  Checkbox,
} from "@shopify/polaris";

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

  const handleIsHotEnable = () => {
    setIsHot(true);
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
      createProjectHighlight();
      toggleToast();
      setShowModal(false);
      refetch();
    }

    setIsUpdating(false);
  };

  const createProjectHighlight = async () => {
    const updatedProjectHighlight = {
      isHotItem: isHot,
      product_id: product.id,
    };
    const response = await fetch("/api/products-highlight/create", {
      method: "POST",
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
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
    }
  }, [product]);

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
