import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const retrieveProducts = async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
};

export default function ProductList() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retrieveProducts,
  });
  // finding a loading
  if (isLoading) {
    return <div>Data is fetching...</div>;
  }
  // finding a error from server response

  if (error) {
    return (
      <div>
        An error is occur: {error.message} {<br />} {error.status}
      </div>
    );
  }
  // data fetching from server

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-3 underline"> Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products &&
          products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 border rounded-sm"
            >
              <img src={product.thumbnail} alt={product.title} />
              <p className="text-xl my-4">{product.title}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
