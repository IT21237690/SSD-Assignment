import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../components/CustomToasts";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import {AiFillDelete} from "react-icons/ai";
import {BsPencil} from "react-icons/bs";
import "./inventory.css";
import {
  getLastEmailSentDate,
  sendEmail
} from "../Helpers/emailSend";

const DisplayInventory = () => {
  const [display, setInventory] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const [OriginalInventory, setOriginalInventory] = useState([]);
  const [show, setShow] = useState(false);
  const [cmpMessage, setcmpMessage] = useState("");
  const [variant, setVariant] = useState("");

  const fetchInventory = useCallback(async () => {
    axios
        .get("http://localhost:8070/api/inventory")
        .then(async (res) => {
          setInventory(res.data);
          setOriginalInventory(res.data);

          // below code is to check if any item is low in stock
          let lowStockItems = res.data.filter((i) => i.quantity < 10);
          if (!lowStockItems.length) return;

          // below code is to get the last email sent date for each item
          const emailSentDates = await getLastEmailSentDate(
            lowStockItems.map((i) => i._id)
          );
          if (emailSentDates?.length) {
            // below code is to filter out the items which have been sent email in the last 30 days
            lowStockItems = lowStockItems.filter((i) => {
              const lastSentDate = emailSentDates.find(
                (e) => e.inventoryId === i._id
              );
              if (!lastSentDate) return true;
              const lastSentDateObj = new Date(lastSentDate.emailSentDate);
              const today = new Date();
              // below condition is to check if the last sent date is more than 30 days ago
              return today.getDate() - lastSentDateObj.getDate() > 30;
            });
          }


          let lowStockItemsIds = lowStockItems.map((i) => i._id);
          // below code is to convert the array of objects to a string for email message
          let stringStockItems = lowStockItems.map((i) => i.name).join(" and ");
          if (!lowStockItems.length) return;
          // below code is to send email
          sendEmail(false, {
            idArray: [...lowStockItemsIds],
            userData: {
              to_name: "Admin",
              user_email: "malmihewakapuge@gmail.com",
              message: `The following item is running low on stock. Please order more.
            ${stringStockItems}
            `,
            },
          })
        })
        .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  //delete
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8070/api/inventory/" + id);
      setVariant("Success");
      setcmpMessage("Delete");
      setShow(true);
      let filterdOriginalInventory = OriginalInventory.filter(
        (i) => i._id !== id
      );
      let displayInventory = display.filter((i) => i._id !== id);
      setOriginalInventory([...filterdOriginalInventory]);
      setInventory([...displayInventory]);
    } catch (err) {
      setVariant("Danger");
      setcmpMessage("Delete");
      setShow(true);
      console.log(err);
    }
  };

  //report generation part
  const genReport = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8070/api/inventory/reporting",
        {
          responseType: "blob", 
        }
      );
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      // create a unique filename based on the current date
      const currentDate = new Date().toISOString().slice(0, 10);
      link.setAttribute("download", `inventory_report_${currentDate}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setVariant("Danger");
      setcmpMessage("Report generation");
      setShow(true);
      console.log(error);
    }
  };


  //used to limit the no of calls to some functions
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };


  //handling seraching functionality
  const handleSearch = debounce((SearchedText) => {
    if (!SearchedText) setInventory([...OriginalInventory]);
    let filterdInventory = OriginalInventory.filter((i) =>
      i.name.toLowerCase().includes(SearchedText.toLowerCase())
    );
    setInventory(filterdInventory);
  }, 200);


  //use to search inventories by search name
  useEffect(() => {
    handleSearch(SearchText);
  }, [SearchText, handleSearch]);

  // for converting date to ISO format YYYY-MM-DD
  const convertDate = (date) => {
    if (!date) return "";
    const inputDate = new Date(date);
    const isoString = inputDate.toISOString();
    const outputDateString = isoString.slice(0, 10);
    return outputDateString;
  };

  //handle the image part
  const handleImage = (fileName) => {
    if (!fileName)
      return `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`;
    return `http://localhost:8070/api/content/${fileName}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        {show && (
          <Toast
            setShow={setShow}
            Show={show}
            variant={variant}
            cmpMessage={cmpMessage}
          />
        )}
      </div>
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className=" bg-white rounded p-3">
          <div className="spaceBetweenItems">
            <h3>Inventory Management</h3>
            {/* Search by name */}
            <input
              className="form-control w-25"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={SearchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <Link to="CreateInventory" className="btn lightBlueBtn">
              Add inventory
            </Link>
          </div>
          <Table striped bordered hover className="mt-2" style={{width: '80vw'}}>
            <thead>
              <tr>
                <th scope="col">Item ID</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Available Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Date Of Purchace</th>
                <th scope="col text-center">Action</th>
                <th scope="col text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {display.map((data) => (
                <tr key={data._id}>
                  {/* //id //Image */}
                  <td className="text-center">{data._id}</td>
                  <td className="text-center">
                    <Image
                      src={handleImage(data.image)}
                      width={`50px`}
                      height={`50px`}
                      alt="Example Image"
                    />
                  </td>
                  <td className="text-center">{data.name}</td>
                  <td className="text-center">{data.quantity}</td>
                  <td className="text-center">{data.price.toFixed(2)}</td>
                  <td className="text-center">
                    {convertDate(data.dateOfPurchase)}
                  </td>
                  <td>
                    <Link
                      to={`UpdateInventory/${data._id}`}
                      className="btn editBtn mx-2"
                    >
                      <BsPencil/>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(data._id)}
                    >
                     <AiFillDelete/>
                    </button>
                  </td>
                  <td>
                    <div
                      className={`${
                        data.quantity > 10 ? "colorBoxGreen" : "colorBoxRed"
                      }`}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end">
            <button className="btn lightBlueBtn" onClick={genReport}>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayInventory;