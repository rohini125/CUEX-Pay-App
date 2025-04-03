import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface CountryCodePickerProps {
  setCountryCode: (code: string) => void;
  countryCode: string | null;
}

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({ setCountryCode, countryCode }) => {
  const [countryCodes, setCountryCodes] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        const formattedData = data
          .filter((country: any) => country.idd?.root) // Ensure it has a country code
          .map((country: any) => ({
            label: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''} (${country.name.common})`,
            value: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`,
          }))
          .sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountryCodes(formattedData);
      } catch (error) {
        console.error('Error fetching country codes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <RNPickerSelect
          onValueChange={(value) => setCountryCode(value)}
          items={countryCodes}
          placeholder={{ label: 'Select Country Code', value: null }}
          value={countryCode}
          style={{
            inputIOS: styles.pickerInput,
            inputAndroid: styles.pickerInput,
            placeholder: { color: '#999', fontSize: 16 }, // Make placeholder visible
          }}
          useNativeAndroidPickerStyle={false} // Ensures styles apply correctly
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Ensures it takes full width of parent container
    maxWidth: 160, // Prevents it from being too wide
    height: 44, // Fixed height to match other input fields
    borderWidth: 1,
    margin:5,
    borderColor: '#ccc',
    borderRadius: 8, // Softer rounded edges
    justifyContent: 'center', // Centers text vertically
    backgroundColor: '#e2f1ff', // Ensures background is white
  },
  pickerInput: {
    fontSize: 14,
    color: '#000', // Ensure text is visible
    paddingVertical: 10,
  },
});

export default CountryCodePicker;
