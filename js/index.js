const searchText = document.querySelector("#search-result-text");

// fetch the data

const loadData = () => {
    document.getElementById("card-area").textContent = "";
    document.querySelector("#load-more").classList.add("hidden");
    const Input = document.getElementById("form");
    if (Input.value == "") {
        searchText.classList.add("text-danger");
        searchText.textContent = "Please Enter a Device Name...😊";
        Input.value = "";
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${Input.value}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.data.length == 0) {
                    searchText.classList.add("text-danger");
                    searchText.textContent = "Data Not Found..😥";
                    Input.value = "";
                } else {
                    searchText.classList.remove("text-danger");
                    searchText.textContent = "Search Result";
                    getData(data.data);
                }
            });
        Input.value = "";
    }
};

const extraData = [];
// update the card

const getData = (phone) => {
    // extract data
    const firstData = [];
    for (let i = 0; i < 20; i++) {
        firstData.push(phone[i]);
    }
    for (let i = 20; i < phone.length; i++) {
        extraData.push(phone[i]);
    }

    firstData.forEach((data) => {
        const cardArea = document.getElementById("card-area");
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
        <div class= "card m-4">
        <div class= "bg-image hover-overlay ripple w-100 d-flex justify-content-center p-4">
        <img src=${data.image} class="img-fluid">
        <a href="#!">
        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"> </div>
        </a>
        </div>
        <div class= "card-body">
        <h5 class= "card-title text-primary fw-bold"> ${data.phone_name}</h5>
        <p class="card-text fw-bold"> ${data.brand} </p>
        <button type="button" class="btn btn-primary" onclick="showModal('${data.slug}')"> More Info </button>
        </div>
        </div>
        `;

        cardArea.appendChild(div);
    });
    // making load more button visible

    document.querySelector("#load-more").classList.remove("hidden");
};
// showing the modal

const showModal = (id) => {
    document.getElementById("modal-show").textContent = "";
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((player) => updateModal(player.data));
};
const updateModal = (data) => {
    const othersMessage = "Information Not Found...";
    const release = "Upcoming";
    const modal = document.querySelector(".pop-up");
    modal.innerHTML = `
    <button onclick= "clearData()" class="pop-btn btn btn-danger">
    <i class="fa-solid fa-xmark fs-4"></i> 
    </button>
    <div class = "row pop-up-body">
    <div class = "col-md-6 d-flex align-items-center justify-content-center">
    <img src=${data.image} alt="" class="w-75">
    </div>
    <div class="col-md-6">
    <h2 class="card-title text-center my-3 fw-bold">${data.name}</h2>
    <dl class="row details">
    <dt class="col-sm-3 text-primary">Release Date </dt>
    <dd class="col-sm-9 fw-bold">${data.releaseDate || release} </dd>
    <dt class="col-sm-3 text-primary margin-3"> Main Features </dt>
    <dd class="col-sm-9">
    <ul class="list-group my-3">
    <li class="list-group-item me">
    <span class="text-dark fw-bold">Storage : </span>
    <p> ${data.mainFeatures.storage} </p>
    </li>
    <li class="list-group-item my">
    <span class="text-dark fw-bold">Display Size :</span>
    ${data.mainFeatures.displaySize}
  </li>
  <li class="list-group-item my">
  <span class="text-dark fw-bold">Chipset</span>: 
  ${data.mainFeatures.chipSet}
</li>
</ul>
</dd>
<dt class="col-sm-3 text-primary"> Sensors </dt>
<dd class="col-sm-9 fw-bold"> 
<ul class="list-group">
<li class="list-group-item my hide">
           
${data.mainFeatures.sensors}
</li>
</ul>
</dd>
<dt class="col-sm-3 text-primary">Others</dt>
<dd class="col-sm-9 fw-bold hide">
<ul class="list-group my-3">
<li class="list-group-item my">
  <span class=" fw-bold text-primary">WLAN :</span>
  <p>
   ${data?.others?.WLAN || othersMessage}
   
  </p>
  </li>
     <li class="list-group-item my">
       <span class=" fw-bold text-primary">Bluetooth </span> :
       ${data?.others?.Bluetooth || othersMessage}
     </li>
     <li class="list-group-item my">
       <span class=" fw-bold text-primary">GPS </span>:
       ${data?.others?.GPS || othersMessage}
     </li>
     <li class="list-group-item my">
       <span class="fw-bold text-primary">NFC </span> :
       ${data?.others?.NFC || othersMessage}
     </li>
     <li class="list-group-item my">
       <span class="fw-bold text-primary">Radio</span>:
       ${data?.others?.Radio || othersMessage}
     </li>
     <li class="list-group-item my">
       <span class=" fw-bold text-primary">USB</span>: 
       ${data?.others?.USB || othersMessage}
     </li>
   </ul>
     </dd>
   </dl>
   <button class="btn btn-danger" onclick="clearData()">Close</button>
 </div>
</div>
    `;

    modal.classList.add("show");
    document.querySelector("#card-area").classList.add("hidden");
};

// closing the modal
const clearData =() =>{
    const modal = document.querySelector(".pop-up");

    modal.classList.remove("show");
    document.querySelector("#card-area").classList.remove("hidden");
};

// load more function

const loadMore = () => {
    console.log(extraData);
    extraData.forEach((data) =>{
        const cardArea = document.getElementById("card-area");
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML =  `
        
    <div class="card m-4">
    <div
      class="bg-image hover-overlay ripple w-100 d-flex justify-content-center p-4"
      data-mdb-ripple-color="light"
    >
      <img
        src=${data.image}
        class="img-fluid"
      />
      <a href="#!">
        <div
          class="mask"
          style="background-color: rgba(251, 251, 251, 0.15)"
        ></div>
      </a>
    </div>
    <div class="card-body">
      <h5 class="card-title text-primary fw-bold ">${data.phone_name}</h5>
      <p class="card-text fw-bold">
        ${data.brand}
      </p>
      <button
        type="button"
       
        class="btn btn-primary"
        onclick="showModal('${data.slug}')"
      >
        More Info
      </button>
    </div>
  </div>
        `;
        cardArea.appendChild(div);
    });
    document.querySelector("#load-more").classList.add("hidden");
};