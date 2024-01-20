import React,{useState} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';



function Location() {
    const [address, setAddress] = useState("");
    const handleSelect = async (value) => {
        setAddress(value);
        geocodeByAddress(value.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        console.log('Successfully got latitude and longitude', { lat, lng })
      );
      };
    
  return (
    <div>
        <GooglePlacesAutocomplete
        apiKey='AIzaSyAsc69G6yC0OKUVzNm5o90_EvDHHNL7wxE'
        selectProps={{
            value: address,
            onChange: handleSelect,
          }}
        
        />        
    </div>
  )
}

export default Location