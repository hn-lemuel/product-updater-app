import { useState, useCallback } from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Modal,
  TextField,
} from "@shopify/polaris";

export const ProductUpdateModal = ({ data }) => {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{ height: "500px" }}>
      <Modal
        activator={activator}
        open={active}
        title="Update Product Title"
        primaryAction={{
          content: "Update Product",
        }}
        secondaryActions={[
          {
            content: "View in Admin",
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
                src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
              />
              <TextField label="Product Title" />
              <TextField label="Product Description" multiline={4} />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
    </div>
  );
};
