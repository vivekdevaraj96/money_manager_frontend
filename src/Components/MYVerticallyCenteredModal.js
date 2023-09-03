import axios from "axios";
import { useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
function MyVerticallyCenteredModal(props) {
  var [incomeamount, setincomeamount] = useState("");
  var [incomedescription, setincomedescription] = useState("");
  var [incomecategory, setincomecategory] = useState("");
  var [incomepurpose, setincomepurpose] = useState("");
  var [expenseamount, setexpenseamount] = useState("");
  var [expensedescription, setexpensedescription] = useState("");
  var [expensecategory, setexpensecategory] = useState("");
  var [expensepurpose, setexpensepurpose] = useState("");
  async function addincome(e) {
    try {
      const response = await axios.post("https://money-manager-ke03.onrender.com/addincome", {
        incomeamount,
        incomedescription,
        incomecategory,
        incomepurpose,
      });
      console.log(response.data);
      props.setdata([...response.data.data])
    } catch (error) {
      console.log(error);
    }
    // console.log(incomeamount, incomedescription,incomeCategory, incomePurpose);
    setincomeamount("");
    setincomedescription("");
    setincomecategory("");
    setincomepurpose("");
    props.onHide();
  }
  async function addexpense() {
    try {
      const response = await axios.post("https://money-manager-ke03.onrender.com/addexpense", {
        expenseamount: expenseamount,
        expensedescription: expensedescription,
        expensecategory: expensecategory,
        expensepurpose: expensepurpose,
        totalbalance:props.totalbalance
      });
      alert(response.data.message)
      if(response.data.data){
        props.setdata([...response.data.data])
      }       
      
    } catch (error) {
      console.log(error);
    }

    setexpenseamount("");
    setexpensedescription("")
    setexpensecategory("");
    setexpensepurpose("");
    props.onHide();
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Tabs
          defaultActiveKey="Income"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="Income" title="Income">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setincomeamount(e.target.value);
                }}
              />
              <label for="floatingInput">Amount</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setincomedescription(e.target.value);
                }}
              />
              <label for="floatingInput">Description</label>
            </div>
            <select
              class="form-select form-select-lg mb-3"
              aria-label="Large select example"
              id="purpose"
              onChange={(e) => {
                setincomecategory(e.target.value);
              }}
            >
              <option defaultValue>Category</option>
              <option value="salary">salary</option>
              <option value="others">others</option>
            </select>
            <select
              class="form-select form-select-lg mb-3"
              aria-label="Large select example"
              id="purpose"
              onChange={(e) => {
                setincomepurpose(e.target.value);
              }}
            >
              <option defaultValue>Purpose</option>
              <option value="office">office</option>
              <option value="personal">personal</option>
            </select>
            <Button onClick={(e) => addincome(e)}>Add</Button>
          </Tab>
          <Tab eventKey="Expense" title="Expense">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setexpenseamount(e.target.value);
                }}
              />
              <label for="floatingInput">Amount</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setexpensedescription(e.target.value);
                }}
              />
              <label for="floatingInput">Description</label>
            </div>
            <select
              class="form-select form-select-lg mb-3"
              aria-label="Large select example"
              id="purpose"
              onChange={(e) => {
                setexpensecategory(e.target.value);
              }}
            >
              <option defaultValue>Category</option>
              <option value="fuel">fuel</option>
              <option value="movie">movie</option>
              <option value="food">food</option>
              <option value="loan">loan</option>
              <option value="medical">medical</option>
              <option value="others">others</option>
            </select>
            <select
              class="form-select form-select-lg mb-3"
              aria-label="Large select example"
              onChange={(e) => {
                setexpensepurpose(e.target.value);
              }}
            >
              <option defaultValue>Purpose</option>
              <option value="office">office</option>
              <option value="personal">personal</option>
            </select>
            <Button onClick={() => addexpense()}>Add</Button>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
