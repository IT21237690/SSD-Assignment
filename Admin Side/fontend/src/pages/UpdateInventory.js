import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../components/CustomToasts";
import "./ModuleDisplayInventory.css";


const UpdateInventory = () => {
 
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [Image, setImage] = useState("");
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const [initQty, setInitQty] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8070/api/inventory/" + id).then((res) => {
      let inventory = res.data;
      setName(inventory.name);
      setQuantity(inventory.quantity);
      setPrice(inventory.price);
      setImage(inventory.image);
      const inputDate = new Date(inventory.dateOfPurchase);
      const isoString = inputDate.toISOString();
      const outputDateString = isoString.slice(0, 10);
      setDateOfPurchase(outputDateString);
    });
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !quantity || !price || !dateOfPurchase) {
      setMessage("Please fill all the fields!");
      setVariant("Warning");
      setShow(true);
      return;
    }
    // Validate name field
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(name)) {
      setMessage("Name should contain only alphabets and spaces");
      setVariant("Warning");
      setShow(true);
      return;
    }
  
    // Validate quantity field
    const quantityRegex = /^[0-9]*$/;
    if (!quantityRegex.test(quantity)) {
      setMessage("Quantity should contain only numbers");
      setVariant("Warning");
      setShow(true);
      return;
    }
  
    // Validate price field
    const priceRegex = /^[0-9]*$/;
    if (!priceRegex.test(price)) {
      setMessage("Price should contain only numbers");
      setVariant("Warning");
      setShow(true);
      return;
    }
  
    // Validate date of purchase field
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateOfPurchase)) {
      setMessage("Date of Purchase should be a valid date");
      setVariant("Warning");
      setShow(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", name);
    formData.append("image", Image);
    formData.append("quantity", quantity);
    formData.append("upInitQty", initQty);
    formData.append("price", price);
    formData.append("dateOfPurchase", dateOfPurchase);
    setMessage("");
    axios
      .put("http://localhost:8070/api/inventory/" + id, formData)
      .then((res) => {
        console.log(res);
        setVariant("Success");
        setMessage("Update");
        setShow(true);
        setTimeout(()=> {
          navigate("/InventoryManagment");
        },1500)
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
        <form onSubmit={handleSubmit}>
          <div className="form-group py-3">
            <h4>Update Inventory</h4>
          </div>

          <div className="form-group">
            {/* image */}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Item name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="quantity" className="mt-2">
              Available Quantity
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="Enter Available Quantity"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="checkbox"
                id="initqty"
                name="initqty"
                style={{marginLeft:"1rem"}}
                value={initQty}
                onChange={(e) => setInitQty(e.target.checked)}
              />
              <label htmlFor="initqty"> Update initial quantity</label>
            </div>
            <label htmlFor="price" className="mt-2">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="dateOfPurchase" className="mt-2">
              Date Of Purchase
            </label>
            <input
              type="date"
              placeholder="Enter Date Of Purchase"
              className="form-control"
              value={dateOfPurchase}
              onChange={(e) => setDateOfPurchase(e.target.value)}
            />
            <label htmlFor="image">Choose an image:</label>
            <input
              type="file"
              className="form-control-file mt-2"
              id="image"
              accept=".jpg,.png"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <button className="btn editBtn mt-2">Update</button>
        </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateInventory;