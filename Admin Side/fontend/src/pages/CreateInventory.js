import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/CustomToasts";
import validator from "validator"; // Import the validator library
import "./ModuleDisplayInventory.css";

const CreateInventory = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    // Check if all fields are filled or not
    if (!name || !quantity || !price || !dateOfPurchase) {
      setMessage("Please fill all the fields!");
      setVariant("Warning");
      setShow(true);
      return;
        
    }

    // Sanitize and Validate name field
    const sanitizedName = validator.trim(name);
    if (!validator.isAlpha(sanitizedName.replace(/\s/g, ''))) {
      setMessage("Name should contain only alphabets and spaces");
      setVariant("Warning");
      setShow(true);
      return;
    }

    // Sanitize and Validate quantity field
    const sanitizedQuantity = validator.trim(quantity);
    if (!validator.isNumeric(sanitizedQuantity)) {
      setMessage("Quantity should contain only numbers");
      setVariant("Warning");
      setShow(true);
      return;
    }

    // Sanitize and Validate price field
    const sanitizedPrice = validator.trim(price);
    if (!validator.isNumeric(sanitizedPrice)) {
      setMessage("Price should contain only numbers");
      setVariant("Warning");
      setShow(true);
      return;
    }

    // Sanitize and Validate date of purchase field
    const sanitizedDate = validator.trim(dateOfPurchase);
    if (!validator.isISO8601(sanitizedDate)) {
      setMessage("Date of Purchase should be a valid date (YYYY-MM-DD)");
      setVariant("Warning");
      setShow(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", sanitizedName);
    formData.append("quantity", sanitizedQuantity);
    formData.append("price", sanitizedPrice);
    formData.append("dateOfPurchase", sanitizedDate);
    
    axios
      .post("http://localhost:8070/api/inventory", formData)
      .then(() => {
        setVariant("Success");
        setMessage("Item successfully added!");
        setShow(true);
        setTimeout(() => {
          navigate("/InventoryManagment");
        }, 1500);
      })
      .catch((err) => console.log(err));
  }

  return (
    <section>
      <div>
        <div className="d-flex justify-content-center">
          {show && (
            <Toast
              setShow={setShow}
              Show={show}
              variant={variant}
              cmpMessage={message}
            />
          )}
        </div>
        <div className="d-flex vh-100 justify-content-center align-items-center">

          {/* Create inventory */}
          <form onSubmit={handleSubmit}>
            <div className="form-group py-3">
              <h4>Add Inventory</h4>
            </div>

            <div className="form-group">

              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Item name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="quantity" className="mt-2">
                Available Quantity
              </label>
              <input
                type="number"
                min={0}
                placeholder="Enter Available Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />

              <label htmlFor="price" className="mt-2">
                Price
              </label>
              <input
                type="number"
                min={0}
                placeholder="Enter price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />

              <label htmlFor="dateOfPurchase" className="mt-2">
                Date Of Purchase
              </label>
              <input
                type="date"
                placeholder="Enter Date Of Purchase"
                className="form-control"
                onChange={(e) => setDateOfPurchase(e.target.value)}
              />
              <label htmlFor="image">Choose an image:</label>
              <input
                type="file"
                className="form-control-file mt-2"
                id="image"
                accept=".jpg,.png, .jpeg"
                onChange={(e) => {
                  setImageFile(e.target.files[0])
                }}
              />
            </div>
            <button className="btn editBtn mt-2">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateInventory;
