import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import { AsyncPaginate } from "react-select-async-paginate";
// import { loadOptions } from "../../src/loadOptions";
import { loadOptions, type OptionType } from "../../src/loadOptions";
import { useState } from "react";

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
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
  const [value, setValue] = useState<OptionType | null>(null);

  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log("Submitted:", values);
    resetForm();
  };

  return (
    <>
      <div className="">
        <div className="">
          <Formik
            initialValues={{
              name: "",
              batchNo: "",
              quantity: "",
              expireDate: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}

            // onSubmit={() => console.log(value)}
          >
            {({ values, setFieldValue }) => (
              // { isSubmitting } // add date values, setFieldValue
              <Form className="space-y-4 flex gap-14 mt-10 ml-10">
                <div className="min-w-fit">
                  <label className="block mb-1 font-semibold">
                    Product Name
                  </label>

                  <AsyncPaginate
                    value={value}
                    loadOptions={loadOptions}
                    onChange={setValue}
                    additional={{ page: 1 }}
                    debounceTimeout={300}
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Batch No</label>
                  <Field
                    type="number"
                    name="batchNo"
                    placeholder="Batch No"
                    className=" p-2 border border-gray-300 rounded"
                  />
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
                  className=" py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                >
                  Add
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Products;
