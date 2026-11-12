import react, { useEffect, useState } from "react";

const ProductList = ({ categories }: { categories: string }) => {
  const [products, setProducts] = useState<String[]>([]);

  useEffect(() => {
    console.log("Fetching products in category:", categories);
    setProducts(["Product 1", "Product 2", "Product 3"]);
  }, [categories]);

  return <div>Product List</div>;
};

export default ProductList;
