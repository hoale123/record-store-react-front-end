import { useState, useEffect } from "react";
import "./Records.css";
import RecordCard from "./RecordCard.js";
import RecordForm from "./RecordForm.js";

function Records() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedCustomer, setScopedCustomer] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    console.log("test");
    fetch("http://localhost:8080/customers")
      .then((response) => response.json())
      .then((result) => {
        setCustomers(result);
        console.log(result);
      })
      .catch(console.log);
  }, []);

  function addClick() {
    setScopedCustomer({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      level: "",
    });
    setShowForm(true);
  }

  function notify({ action, customer, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }

    switch (action) {
      case "add":
        setCustomers([...customers, customer]);
        break;
      case "edit":
        setCustomers(
          customers.map((e) => {
            if (e.id === customer.id) {
              return customer;
            }
            return e;
          })
        );
        break;
      case "edit-form":
        setScopedCustomer(customer);
        setShowForm(true);
        return;
      case "delete":
        setCustomers(customers.filter((e) => e.id !== customer.id));
        break;
    }

    setError("");
    setShowForm(false);
  }

  if (showForm) {
    return <RecordForm customer={scopedCustomer} notify={notify} />;
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="recordTitle">Customers</h1>
        <button className="btn btn-primary" type="button" onClick={addClick}>
          Add a Customer
        </button>
        <table id="records">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>ZipCode</th>
            <th>Level</th>
          </tr>
          <tbody>
            {customers.map((c) => (
              <RecordCard key={c.id} customer={c} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Records;