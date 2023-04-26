console.log("JS working!");

const fetchData = async () => {
  await fetch("https://8d01-49-149-67-13.ngrok-free.app/apps/product-updater", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      const productIdFromInput = document.getElementById("productID").value;
      const productIDValue = `gid://shopify/Product/${productIdFromInput}`;
      console.log(productIDValue);

      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].product_id === productIDValue) {
          const isHotEl = document.getElementById("appBadge");
          isHotEl.classList.add("is-hot--hide");
          isHotEl.classList.add("is-hot");
          break; // exit the loop once a match is found
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

fetchData();
