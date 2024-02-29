const loadPhone = async(searchText='13',isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    displayPhones(phones,isShowAll)
}


const displayPhones = (phones,isShowAll) => {
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.textContent = '';


const showAllContainer = document.getElementById('show-all-container')

if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
} else{
    showAllContainer.classList.add('hidden');
}

    if(!isShowAll){
        phones = phones.slice(0,10);
    }

    phones.forEach(phone =>{
        console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 border p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center my-4">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">See Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneCard);
    })
    toggleSpinner(false);
}

const handleShowDetail = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span>Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
    `

    show_details_modal.showModal()
}


const handleSearch = (isShowAll) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const toggleSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () =>{
    handleSearch(true);
}


loadPhone()
