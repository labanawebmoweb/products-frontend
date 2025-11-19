import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import { AsyncPaginate } from "react-select-async-paginate";
// import { loadOptions } from "../../src/loadOptions";
import { loadOptions, type OptionType } from "../../src/loadOptions";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../redux/productSlice";
import type { RootState } from "../redux/store";
import ProductList from "./ProductList";
import { Link } from "react-router";

const validationSchema = Yup.object({
  // name: Yup.object().required("Product name is required"),
  name: Yup.object().nullable().required("Product name is required"),

  batchNo: Yup.number()
    .typeError("Batch number must be a number")
    .min(1, "Batch number must be at least 1")
    .max(1000, "Batch number must be less than or equal to 1000")
    .required("Batch number is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  expireDate: Yup.date()
    .min(new Date(), "Expire date cannot be in the past")
    .required("Expire date is required"),
});

const Products: React.FC = () => {
  // const handleSubmit = (values: any, { resetForm }: any) => {
  //   console.log("Submitted:", values);
  //   resetForm();
  // };
  const dispatch = useDispatch();

  const handleSubmit = (values: any, { resetForm }: any) => {
    dispatch(
      addProduct({
        name: values.name?.label,
        batchNo: values.batchNo,
        quantity: Number(values.quantity),
        expireDate: values.expireDate
          ? values.expireDate.toISOString().split("T")[0]
          : null,
      })
    );

    resetForm();
  };
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <>
      <div className="">
        <div className="">
          <Formik
            initialValues={{
              name: null,
              batchNo: "",
              quantity: "",
              expireDate: new Date(),
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}

            // onSubmit={() => console.log(value)}
          >
            {({ values, setFieldValue, setFieldTouched }) => (
              // { isSubmitting } // add date values, setFieldValue
              <div>
                <Form className="space-y-4 flex w-full gap-14 mt-10 ml-10">
                  <div
                    className="min-w-fit w-1/5"
                    onBlur={() => setFieldTouched("name", true)}
                  >
                    <label className="block mb-1 font-semibold">
                      Product Name
                    </label>

                    <AsyncPaginate
                      // value={value}
                      value={values.name}
                      loadOptions={loadOptions}
                      // onChange={setValue}
                      onChange={(selected) => {
                        console.log("selected", selected);
                        setFieldValue("name", selected);
                      }}
                      additional={{ page: 1 }}
                      debounceTimeout={100}
                    />

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Batch No</label>
                    {/* <Field
                    type="number"
                    name="batchNo"
                    placeholder="Batch No"
                    className=" p-2 border border-gray-300 rounded"
                    prefix="#"
                  /> */}
                    <Field name="batchNo">
                      {({ field, form }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Batch No"
                          className="p-2 border border-gray-300 rounded"
                          value={
                            field.value !== "" && field.value !== null
                              ? `#${field.value}`
                              : ""
                          }
                          onChange={(e) => {
                            const raw = e.target.value.replace("#", ""); // remove #
                            const onlyNumbers = raw.replace(/\D/g, ""); // keep only digits

                            form.setFieldValue("batchNo", onlyNumbers);
                          }}
                        />
                      )}
                    </Field>

                    <ErrorMessage
                      name="batchNo"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Quantity</label>
                    <Field
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      className=" p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">
                      Expire Date
                    </label>
                    <DatePicker
                      selected={values.expireDate}
                      onChange={(date: Date | null) =>
                        setFieldValue("expireDate", date)
                      }
                      dateFormat="dd/MM/yyyy"
                      className=" p-3 rounded-lg text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-medium"
                      placeholderText="Select a date"
                      minDate={new Date()}
                    />

                    <ErrorMessage
                      name="expireDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    // disabled={isSubmitting || loading}
                    className="m-10 p-2  bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                  >
                    Add
                  </button>
                </Form>
                {/* SHOW DATA BELOW FORM */}
              </div>
            )}
          </Formik>
        </div>
      </div>
      {products.length === 1 ? (
        // <p className="text-gray-500">No products added yet.</p>
        <table className=" m-10">
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.batchNo}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.expireDate}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => dispatch(deleteProduct(index))}
                    disabled
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className=" m-10">
          {/* className="w-full border-collapse border border-gray-300" */}
          {/* <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Batch No</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Expire Date</th>
            </tr>
          </thead> */}

          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.batchNo}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.expireDate}</td>
                <td className="border p-2">
                  {" "}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => dispatch(deleteProduct(index))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/product-list">
        <button className="m-10 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold">
          Submit
        </button>
      </Link>
    </>
  );
};

export default Products;
