import { useState } from 'react';

function RecordForm({ customer: initialCustomer, notify }) {

    const [customer, setCustomer] = useState(initialCustomer);
    const isAdd = initialCustomer.firstName === "";

    //keep form in sync with submit
    function handleChange(evt) {
        const clone = { ...customer };
        clone[evt.target.name] = evt.target.value;
        setCustomer(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "http://localhost:8080/customers" : `http://localhost:8080/customers/${customer.id}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(customer)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return customer;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                customer: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{customer.id > 0 ? "Edit" : "Add"} Customer</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName">firstName</label>
                    <input type="text" id="firstName" name="firstName"
                        className="form-control"
                        value={customer.firstName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName">lastName</label>
                    <input type="text" id="lastName" name="lastName"
                        className="form-control"
                        value={customer.lastName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="street">street</label>
                    <input type="text" id="street" name="street"
                        className="form-control"
                        value={customer.street} onChange={handleChange} />
                </div>
                {/* City
State
Zip code
Level (Gold, Silver, Bronze) */}
                <div className="mb-3">
                    <label htmlFor="city">city</label>
                    <input type="text" id="city" name="city"
                        className="form-control"
                        value={customer.city} onChange={handleChange} />
                </div>
                <div className="mb-3">
          <label htmlFor="state">State</label>
          <select
            type="text"
            id="state"
            name="state"
            className="form-control"
            value={customer.state}
            onChange={handleChange}
          >
            <option value="">Get Customers by State</option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
        </div>
                <div className="mb-3">
                    <label htmlFor="level">level</label>
                    <select
                        type="text"
                        id="level"
                        name="level"
                        className="form-control"
                        value={customer.level}
                        onChange={handleChange}
                        >
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Bronze">Bronze</option>
                        </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="zipCode">zipCode</label>
                    <input type="text" id="zipCode" name="zipCode"
                        className="form-control"
                        value={customer.zipCode} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default RecordForm;