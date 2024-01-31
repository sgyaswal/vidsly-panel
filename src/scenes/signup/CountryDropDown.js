import React, { useState, useEffect } from 'react';
import Select from 'react-select';
// import countryList from 'i18n-iso-countries'; // Or use your chosen data source
// import { getAllCountries } from 'i18n-iso-countries';


const CountryDropdown = (props) => {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
  
    useEffect(() => {
      const fetchCountries = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(
          data.map((country) => ({
            value: country.cca2,
            label: country.name.common,
          }))
        );
      };
      fetchCountries();
    }, []);
 

//   const countries = countryList.getAllCountries().map((country) => ({
//     value: country.alpha2,
//     label: country.name,
//   }));

//   const [selectedCountry, setSelectedCountry] = useState(null);

const handleChange = (selectedOption) => {
  setSelectedCountry(selectedOption);
  props.getData(selectedOption.label)
};

  return (

    <Select
      value={selectedCountry}
      onChange={handleChange}
      options={countries}
      placeholder="Select a country..."
      styles={{
        control: (provided) => ({
          ...provided,
          marginTop:'10px',
          padding: '10px', // Adjust the padding as needed
          borderRadius: '50px', // Adjust the border radius as needed
        }),
      }}
    />
  );
};

export default CountryDropdown;
