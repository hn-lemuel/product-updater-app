import { Badge } from "@shopify/polaris";
import { useAppQuery } from "../hooks";

export default function ProductHightlight({ id }) {
  const { data } = useAppQuery({
    url: `/api/products-highlight/get?id=${id}`,
  });

  const hotItems = data?.data.map(({ product_id, isHotItem }) =>
    isHotItem ? (
      <Badge status="success" key={product_id}>
        Hot
      </Badge>
    ) : (
      ""
    )
  );

  return <>{hotItems}</>;
}
