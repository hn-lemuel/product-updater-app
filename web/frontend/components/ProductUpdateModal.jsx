import { useState, useCallback } from "react";
import { Form, FormLayout, Modal, TextField } from "@shopify/polaris";

export const ProductUpdateModal = ({ showModal, setShowModal, product }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");

  const handleTitleChange = useCallback((value) => {
    setTitle(value);
  }, []);

  const handleDescriptionChange = useCallback((value) => {
    setDescription(value);
  }, []);

  return (
    <Modal
      open={showModal}
      title="Update Product"
      onClose={() => setShowModal(false)}
      primaryAction={{
        content: "Save Changes",
      }}
      secondaryActions={[
        {
          content: "Update via Admin",
        },
      ]}
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
  );
};
