import { Card, Page, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { ProductList } from "../components";
import { useAppQuery } from "../hooks";

export default function HomePage() {
  const { data, isLoading, isRefetching } = useAppQuery({
    url: "/api/products",
  });

  return (
    <Page fullWidth>
      <TitleBar title="Product Updater App" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card title="Products" sectioned>
            <ProductList
              data={data}
              isLoading={isLoading}
              isRefetching={isRefetching}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
