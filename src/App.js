import {  Container,  Navbar } from "react-bootstrap";
import "./App.css";
import Rightcontains from "./Components/Rightcontains";
import { useEffect, useState } from "react";
import axios from 'axios';
import MyVerticallyCenteredModal from "./Components/MYVerticallyCenteredModal";



function App() {
  var [modalShow, setModalShow] = useState(false);
  var [data, setdata]=useState([]);
  



async function getData() {
    try {
      var res = await axios.get("https://money-manager-ke03.onrender.com");
      setdata(res.data);
      // console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getData()    
  },[])

  var totalincome=0

  for(let x of data){  
    if(x.type==='income')  
    totalincome=totalincome+parseInt(x.amount)
  }
  // console.log(totalincome)

  var totalexpense=0
  for(let x of data){  
    if(x.type==='expense')  
    totalexpense=totalexpense+parseInt(x.amount)
  }
  // console.log(totalexpense)

  var totalbalance=totalincome-totalexpense

  


  function deletetransaction(id){  
    console.log(id)

    axios.delete(`https://money-manager-ke03.onrender.com/${id}`)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
    
        const newdata = data.filter(item => item._id !== id);  
        console.log(newdata)
        setdata(newdata);  
      })
    }

  



  return (
    <div className="App">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Money Manager</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="containersflex">
        <div className="leftcontainer">
          <div
            class="card text-bg-primary mb-3"
            style={{ width: "25rem", padding: "20px 0 10px 0" }}
          >
            <h3>Total Balance</h3>
            <h1 class="card-title card-header">
              <i class="bi bi-currency-rupee"></i>{totalbalance}
            </h1>
            <div class="card-body">
              <div className="incomeexpense">
                <div
                  class="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                  style={{ width: "10rem" }}
                >
                  <i class="bi bi-arrow-down-circle"></i>
                  {"     "}<i class="bi bi-currency-rupee"></i>{totalincome}
                </div>

                <div
                  class="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3"
                  style={{ width: "10rem" }}
                >
                  <i class="bi bi-arrow-up-circle"></i>
                  {"     "}<i class="bi bi-currency-rupee"></i>
                  {totalexpense}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-outline-primary transactionbutton"
            onClick={() => setModalShow(true)}
            style={{ width: "25rem" }}
          >
            Add Transaction
          </button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={data}
            setdata={setdata}
            totalbalance={totalbalance}
          />

          <div className="recenttranaction">
            {data.map((e,i) => {
              return (
                <div
                  key={i}
                  class={
                    e.type === "income"
                      ? "p-3 mb-2 bg-success-subtle text-emphasis-success border-start border-success border-5 credit"
                      : "p-3 mb-2 bg-danger-subtle text-emphasis-danger border-start border-danger border-5 credit"
                  }
                  style={{ position: "relative", textAlign: "left" }}
                >
                  <span className="eamount">{e.amount}</span>{" "}<span className="ecategory">{e.category}</span>
                  {e.createdtime<=e.editabletill? <button type="button" class="btn btn-danger del-button" onClick={()=>{deletetransaction(e._id)}}>
                    <i class="bi bi-x-lg"></i>
                  </button> : 
                  <button type="button" class="btn btn-danger del-button" onClick={()=>{deletetransaction(e._id)}} disabled>
                  <i class="bi bi-x-lg"></i>
                </button>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="rightcontainer">
          <Rightcontains data={data}/>
        </div>
      </div>
    </div>
  );
}

export default App;
