import React, { useState, useEffect} from 'react';

function CityMunsList(){
    const [cityMuns, setCityMuns] = useState([]);
    useEffect(() =>{
        fetch('http://localhost:9000/citymuns')
        .then(response => response.json())
        .then(data => {
            setCityMuns(data);
        })
        .catch((err) => {
                console.log(err.message);
        });
    },[]);

    //
    let dropdown = document.getElementById('locality-dropdown');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose State/Province';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://localhost:9000/citymuns';
    fetch(url)
    .then(
        (response) => {
            if(response.status !== 200) { 
                console.warn('Looks like there was a problem. Status Code: ' + 
                response.status); 
                return;
            }
            
            // Examine the text in the response  
            response.json().then(function(data) {  
                let option;
            
                for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].name;
                option.value = data[i].abbreviation;
                dropdown.add(option);
                }    
            });  
        }
    )
    .catch((err)=>{
        console.error('Fetch Error - ', err);
    });
    return (
        <div>
            <h1>List of City Municipalities</h1>
            <select id="locality-dropdown" name="locality">
            </select>

            {cityMuns.map((citymun)=>{
                return(
                    <div className="card my-2 p-2">
            <div>City/Mun : {citymun.name}</div>
                        <div>Province Code : {citymun.prov_code}</div>
                        <div>Municipality Code : {citymun.mun_code}</div>
                    </div>
                );
            })};
        </div>
    );
}

export default CityMunsList;