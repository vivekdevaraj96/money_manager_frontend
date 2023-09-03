

import React, {useEffect, useState } from "react";

const Rightcontains = (props) => {
  var [selectedyear, setselectedyear] = useState("");
  var [selectedmonth, setselectedmonth] = useState("");
  var [selectedcategory, setselectedcategory] = useState("");
  var [selectedpurpose, setselectedpurpose] = useState("");
  var [somedata,setsomedata]=useState([]);

 
  var  e=""
  let year = [2022, 2023];
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];


  async function filterfunction(e){
    e.preventDefault()
    console.log(selectedyear, selectedmonth, selectedcategory, selectedpurpose)   
   
    var value

    if(selectedyear && selectedmonth && selectedcategory && selectedpurpose){
      value=props.data.filter((a)=>{return a.year==selectedyear && a.month==selectedmonth && a.category==selectedcategory && a.purpose==selectedpurpose});
    }else if(selectedyear && selectedmonth && selectedcategory){
      value=props.data.filter((a)=>{return a.year==selectedyear && a.month==selectedmonth && a.category==selectedcategory});
    }else if(selectedyear && selectedmonth  && selectedpurpose){
      value=props.data.filter((a)=>{return a.year==selectedyear && a.month==selectedmonth && a.purpose==selectedpurpose});
    }else if(selectedmonth && selectedcategory && selectedpurpose){
      value=props.data.filter((a)=>{return a.month==selectedmonth && a.category==selectedcategory && a.purpose==selectedpurpose});
    }else if(selectedyear  && selectedcategory && selectedpurpose){
      value=props.data.filter((a)=>{return a.year==selectedyear  && a.category==selectedcategory && a.purpose==selectedpurpose});
    }else if(selectedyear && selectedmonth){
      value=props.data.filter((a)=>{return a.year==selectedyear && a.month==selectedmonth});
    }else if(selectedmonth && selectedcategory){
      value=props.data.filter((a)=>{return  a.month==selectedmonth && a.category==selectedcategory});
    }else if(selectedcategory && selectedpurpose){
      value=props.data.filter((a)=>{return  a.category==selectedcategory && a.purpose==selectedpurpose});
    }else if(selectedyear && selectedpurpose){
      value=props.data.filter((a)=>{return a.year==selectedyear && a.purpose==selectedpurpose});
    }else if(selectedyear && selectedcategory){
      value=props.data.filter((a)=>{return a.year==selectedyear && a.category==selectedcategory});
    }else if(selectedmonth && selectedpurpose){
      value=props.data.filter((a)=>{return a.month==selectedmonth && a.purpose==selectedpurpose});
    }else if(selectedyear){
      value=props.data.filter((a)=>{return a.year==selectedyear});
    }else if(selectedmonth){
      value=props.data.filter((a)=>{return a.month==selectedmonth});
    }else if(selectedcategory){
      value=props.data.filter((a)=>{return a.category==selectedcategory});
    }else if(selectedpurpose){
      value=props.data.filter((a)=>{return a.purpose==selectedpurpose});
    }

    console.log(value)
    setsomedata(value)
    setselectedyear('')
    setselectedmonth('')
    setselectedcategory('')
    setselectedpurpose('')
    
    
  }

  function resetselect(e){
    e.preventDefault()
    setselectedyear('')
    setselectedmonth('')
    setselectedcategory('')
    setselectedpurpose('')
  }


  props.data.forEach(element => {
    if(!month.includes(element.month)){
      month.push(element.month)
    }})

    props.data.forEach(element => {
      if(!year.includes(element.year)){
        year.push(element.year)
      }})


  




  return (
    <div>      
      <div className="selectform">
      <form class="row row-cols-lg-auto g-3 align-items-center">
  
  <div class="col-12">
    <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
    <select class="form-select" id="inlineFormSelectPref" value={selectedyear} onChange={(e) => setselectedyear(e.target.value)}>
      <option selected value=''>Select Year</option>
      {year.map((e, i) => {
              return (
                <option key={i} value={e}>
                  {e}
                </option>
              );
            })}
    </select>
  </div>
  <div class="col-12">
    <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
    <select class="form-select" id="inlineFormSelectPref" value={selectedmonth} onChange={(e) => setselectedmonth(e.target.value)}>
      <option selected value=''>Select Month</option>
      {month.map((e, i) => {
              return (
                <option key={i} value={e}>
                  {e}
                </option>
              );
            })}
    </select>
  </div>  
  <div class="col-12">
    <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
    <select class="form-select" id="inlineFormSelectPref" value={selectedcategory} onChange={(e) => setselectedcategory(e.target.value)}>
      <option selected value=''>Select Category</option>
      <option value="fuel">fuel</option>
            <option value="movie">movie</option>
            <option value="food">food</option>
            <option value="loan">loan</option>
            <option value="medical">medical</option>
            <option value="salary">salary</option>
            <option value="others">others</option>
    </select>
  </div>
  <div class="col-12">
    <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
    <select class="form-select" id="inlineFormSelectPref" value={selectedpurpose} onChange={(e) => setselectedpurpose(e.target.value)}>
      <option selected value=''>Select Purpose</option>
      <option value="office">Office</option>
            <option value="personal">personal</option>
    </select>
  </div>

  <div class="col-12">
    <button class="btn btn-primary" onClick={(e)=>filterfunction(e)}>Submit</button>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" onClick={(e)=>resetselect(e)}>Reset</button>
  </div>
</form>
               

      </div>

      <div>
        <table
          class="table"
          style={{ borderTop: "1px solid black", marginTop: "10px" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th> 
              <th scope="col">Date/Month/Year</th>              
              <th scope="col">Category</th>
              <th scope="col">Purpose</th>
              <th scope="col">Transaction type</th>
            </tr>
          </thead>
          <tbody>
            {somedata.map((e, i)=>(
              <tr class={e.type=='income'? "table-success" : "table-danger"}>            
              <th scope="row">{i}</th>
              <td>{e.amount}</td>
              <td>{e.date}/{e.month}/{e.year}</td>              
              <td>{e.category}</td>
              <td>{e.purpose}</td>
              <td>{e.type}</td>
            </tr>
            ))}            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rightcontains;
