import "./App.css";
import Products from "./components/Products";

function App() {
  return (
    <>
      <Products></Products>
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
