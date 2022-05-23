submitButton()

function handleSubmit(event){
    event.stopPropagation();
    event.preventDefault();
    console.log(document.getElementsByClassName("api")[0].value)
    console.log(document.getElementsByClassName("api")[1].value)
    doAPICall(document.getElementsByClassName("api")[0].value, document.getElementsByClassName("api")[1].value)
}

function submitButton(){
    let button = document.getElementById('submit')
    button.addEventListener("click", (e)=>handleSubmit(e))
}

async function doAPICall(year, round){
    let response = await axios.get(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`);
    console.log(response)
    
    response = response.data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
    let tbody=document.getElementsByTagName('tbody')[0];
    for(const racer of response){
        

        let tr=document.createElement('tr');
        tbody.appendChild(tr);

        th=document.createElement('th');
        th.scope="row";
        th.innerHTML=racer['position'];
        tr.appendChild(th);

        td=document.createElement('td');
        td.innerText=racer['Driver']['givenName'];
        tr.appendChild(td);

        td=document.createElement('td');
        td.innerText=racer['Driver']['familyName'];
        tr.appendChild(td);
    
        td=document.createElement('td');
        td.innerText=racer['Driver']['dateOfBirth'];
        tr.appendChild(td);

        td=document.createElement('td');
        td.innerText=racer['wins'];
        tr.appendChild(td);

        td=document.createElement('td');
        td.innerText=racer['Driver']['nationality'];
        tr.appendChild(td);

        td=document.createElement('td');
        td.innerText=racer['Constructors'][0]['name'];
        tr.appendChild(td);
    }
}