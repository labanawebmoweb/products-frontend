import { Route, Routes } from "react-router";
import "./App.css";
import ProductList from "./components/ProductList";
import Products from "./components/Products";

function App() {
  return (
    // <>
    //   <Products></Products>
    //   {/* <ProductList></ProductList> */}
    // </>
    <>
      <Routes>
        <Route path="/" element={<Products></Products>}></Route>
        <Route
          path="/product-list"
          element={<ProductList></ProductList>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;

// import { useState } from "react";

// import { AsyncPaginate } from "react-select-async-paginate";

// import { loadOptions } from "./loadOptions";
// import type { OptionType } from "./loadOptions";

// function App() {
//   const [value, onChange] = useState<OptionType | null>(null);

//   return (
//     <div>
//       <h1>react-select-async-paginate</h1>
//       <h2>Simple example</h2>

//       <AsyncPaginate
//         value={value}
//         loadOptions={loadOptions}
//         onChange={onChange}
//       />
//     </div>
//   );
// }
// export default App;
