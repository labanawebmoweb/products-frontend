import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const ProductList = () => {
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Stored Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Batch No</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Expire Date</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item?.name}</td>
                <td className="border p-2">{item?.batchNo}</td>
                <td className="border p-2">{item?.quantity}</td>
                <td className="border p-2">{item?.expireDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
