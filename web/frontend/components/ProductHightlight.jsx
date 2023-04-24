import React, { useEffect } from "react";
import { useAuthenticatedFetch } from "../hooks";

export default function ProductHightlight({ id }) {
  const fetch = useAuthenticatedFetch();

  const getHighlight = async () => {
    const response = await fetch(`/api/products-highlight/get?id=${id}`, {
      method: "GET",
    });

    if (response.ok) {
      console.log("res", response);
    }
  };

  useEffect(() => {
    if (id) {
      getHighlight();
    }
  }, [id]);

  return <div>Hot</div>;
}
