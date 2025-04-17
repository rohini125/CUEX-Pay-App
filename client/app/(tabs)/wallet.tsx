
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios"; // Assuming axios is installed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

interface Currency {
  emailOrPhone: string;
  currency: string;
  amount: number;
}

const currencySymbols: { [key: string]: string } = {
  INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr', PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', 
  OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', 
  AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡',  CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK',
};

const Wallet = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [emailOrPhone, setemailOrPhone] = useState('');
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
 

      const getExchangeRate = async (currency: string): Promise<number> => {
        try {
          if (currency === "INR") return 1; 
          const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/INR`);
      
          console.log(`Fetching exchange rate for: ${currency}`);
          console.log(`Exchange rate response:`, response.data.rates);
      
          return response.data.rates[currency] || 1; 
        } catch (error) {
          console.error("Exchange rate fetch error", error);
          return 1;
        }
      };

    // useEffect(() => {
      const fetchCurrencies = async (id:any) => {
        try {
          const response = await axios.get("http://192.168.52.190:7000/api/wallet/currencies" ,{
            params: { emailOrPhone: id },
          });
          const currencyData: Currency[] = response.data;
          setCurrencies(currencyData);
      
          const exchangeRatesMap: Record<string, number> = {}; 
          for (const currency of currencyData) {
            const rate = currency.currency === "INR" ? 1 : await getExchangeRate(currency.currency);
            exchangeRatesMap[currency.currency] = rate > 0 ? (1 / rate) : 1; // **Fix**
          }
      
          console.log("Corrected Exchange Rates Map:", exchangeRatesMap);
      
          let total = 0;
          currencyData.forEach((currency) => {
            const rate = exchangeRatesMap[currency.currency];
            const convertedValue = currency.amount * rate;
            console.log(`Converting ${currency.amount} ${currency.currency} to INR: ${convertedValue}`);
            total += convertedValue;
          });
      
          console.log("Corrected Final Total Balance (INR):", total);
          // fetchCurrencies(emailOrPhone);
          setTotalBalance(total);
        } catch (error) {
          console.error("Failed to fetch currencies from database", error);
          Alert.alert("Error", "Failed to fetch currencies from database.");
        }
      };
  //     fetchCurrencies();
  // }, []);
  
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused){
    const fetchUserAndCurrencies = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('emailOrPhone');
        if (storedValue) {
          setemailOrPhone(storedValue);
          fetchCurrencies(storedValue);
        } else {
          Alert.alert("Error", "User not logged in.");
        }
      } catch (error) {
        console.error("❌ Error fetching userId:", error);
      }
    };

    fetchUserAndCurrencies();
  }
  }, [isFocused]);


// const isFocused = useIsFocused();

// useEffect(() => {
//   if (isFocused) {
//     const fetchUserAndCurrencies = async () => {
//       const storedValue = await AsyncStorage.getItem('emailOrPhone');
//       if (storedValue) {
//         setemailOrPhone(storedValue);
//         fetchCurrencies(storedValue);
//       }
//     };
//     fetchUserAndCurrencies();
//   }
// }, [isFocused]);

  // Deposit function
  const handleDeposit = async () => {
    console.log("Hii");
  
    // const numericAmount = parseFloat(amount);
    const numericAmount = parseFloat(inputAmount);
    console.log("numericAmount:", numericAmount, "accountNumber:", accountNumber);
  
    if (isNaN(numericAmount) || numericAmount <= 0 || !accountNumber) {
      Alert.alert("Invalid Input", "Please enter a valid amount and account number");
      return;
    }
  
    console.log("Sending Deposit Request:", {
      emailOrPhone,
      accountNumber,
      amount: numericAmount,
    });
  
    try {
      const response = await axios.post("http://192.168.52.190:7000/api/wallet/deposit", {
        emailOrPhone,
        accountNumber,
        amount: numericAmount,
      });
  
      console.log("Deposit Response:", response);
  
      if (response.status === 200) {
        
        setBalance(prevBalance => prevBalance + numericAmount);
        Alert.alert("Success", "Deposit successful");
        fetchCurrencies(emailOrPhone);
        // setAmount("");
        setInputAmount("");
      }
    } catch (error) {
      console.error("Error during deposit:", error);
      Alert.alert("Error", "Deposit failed");
    }
  };
  
  
  // Withdraw function
  const handleWithdraw = async () => {
    // const numericAmount = parseFloat(amount); // Convert amount to number
    const numericAmount = parseFloat(inputAmount);
    
    if (isNaN(numericAmount) || numericAmount <= 0 || !accountNumber) {
      Alert.alert("Invalid Input", "Please enter a valid amount and account number");
      console.log("invalid");
      return;
    }

    try {
      const response = await axios.post("http://192.168.52.190:7000/api/wallet/withdraw", {
        emailOrPhone,
        accountNumber,
        amount: numericAmount,
      });

      if (response.status === 200) {
        setBalance(prevBalance => prevBalance - numericAmount);
        Alert.alert("Success", "Withdraw successful");
        fetchCurrencies(emailOrPhone);
        setAmount(""); // Reset amount field
      }
    } catch (error) {
      console.error("Error during withdraw:", error);
      Alert.alert("Error", "Withdraw failed");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Header /> 
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Wallet</Text>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>₹{totalBalance.toFixed(2)}</Text>
        </View>

        <View style={styles.inputBox}>
           {/* <Text style={styles.inputLabel}>Account Number:</Text>  */}
          <TextInput
            style={styles.input}
            placeholder="Enter Account Number"
            // keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />

          {/* <Text style={styles.inputLabel}>Amount:</Text>  */}
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={inputAmount}
            // value={amount}
            onChangeText={(text) => setInputAmount(text)}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDeposit}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleWithdraw}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.currencies}>
          <Text style={styles.sectionTitle}>Currency</Text>

          <FlatList
            data={currencies}
            // keyExtractor={(item) => item.emailOrPhone}
            keyExtractor={(item, index) => `${item.emailOrPhone}_${index}`}
            renderItem={({ item }) => (
              <View style={styles.currencyRow}>
                <Text style={styles.currencyName}>{item.currency}</Text>
                <Text style={styles.currencyValue}>
                  {currencySymbols[item.currency] || ""}{" "}
                  {item.amount.toFixed(2)}
                </Text>
              </View>
            )}
            // Optionally, you can make FlatList scrollable if you have a large list
            scrollEnabled={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor:'#F4F6F9',
  },
  header: {
    alignItems: "center",
    marginBottom:10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  balanceLabel: {
    marginTop: 5,
    fontSize: 16,
    color: "#333333",
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: "bold",
    // marginTop: 5,
  },
  inputBox:{
     marginVertical:10,
  },
  inputLabel:{

  },
  input: {
    height: 40,
    backgroundColor:'#fff',
    // borderWidth: 1,
    // borderColor: "gray",
    borderRadius: 5,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#004080",
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize:12,
  },
  currencies: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  currencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  currencyName: {
    fontSize: 16,
    fontWeight: "600",
  },
  currencyValue: {
    fontSize: 16,
  },
});

export default Wallet;



        

///////////////////////////////////// with backend ///////////////////////////////////////////////////////////////////////////





// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   Alert,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import Header from "../Header";
// import axios from "axios"; // Assuming axios is installed
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface Currency {
//   emailOrPhone: string;
//   currency: string;
//   amount: number;
// }

// const currencySymbols: { [key: string]: string } = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr', PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', 
//   OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', 
//   AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡',  CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK',
// };

// const Wallet = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [totalBalance, setTotalBalance] = useState<number>(0);
//   const [inputAmount, setInputAmount] = useState<string>("");
//    const [emailOrPhone, setemailOrPhone] = useState('');

//       const getExchangeRate = async (currency: string): Promise<number> => {
//         try {
//           if (currency === "INR") return 1; 
//           const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/INR`);
      
//           console.log(`Fetching exchange rate for: ${currency}`);
//           console.log(`Exchange rate response:`, response.data.rates);
      
//           return response.data.rates[currency] || 1; 
//         } catch (error) {
//           console.error("Exchange rate fetch error", error);
//           return 1;
//         }
//       };

//     // useEffect(() => {
//       const fetchCurrencies = async (id:any) => {
//         try {
//           const response = await axios.get("http://192.168.52.190:7000/api/wallet/currencies" ,{
//             params: { emailOrPhone: id },
//           });
//           const currencyData: Currency[] = response.data;
//           setCurrencies(currencyData);
      
//           const exchangeRatesMap: Record<string, number> = {}; 
//           for (const currency of currencyData) {
//             const rate = currency.currency === "INR" ? 1 : await getExchangeRate(currency.currency);
//             exchangeRatesMap[currency.currency] = rate > 0 ? (1 / rate) : 1; // **Fix**
//           }
      
//           console.log("Corrected Exchange Rates Map:", exchangeRatesMap);
      
//           let total = 0;
//           currencyData.forEach((currency) => {
//             const rate = exchangeRatesMap[currency.currency];
//             const convertedValue = currency.amount * rate;
//             console.log(`Converting ${currency.amount} ${currency.currency} to INR: ${convertedValue}`);
//             total += convertedValue;
//           });
      
//           console.log("Corrected Final Total Balance (INR):", total);
//           setTotalBalance(total);
//         } catch (error) {
//           console.error("Failed to fetch currencies from database", error);
//           Alert.alert("Error", "Failed to fetch currencies from database.");
//         }
//       };
//       // fetchCurrencies();
//   // }, []);
  
//   useEffect(() => {
//     const fetchUserAndCurrencies = async () => {
//       try {
//         const storedValue = await AsyncStorage.getItem('emailOrPhone');
//         if (storedValue) {
//           setemailOrPhone(storedValue);
//           fetchCurrencies(storedValue);
//         } else {
//           Alert.alert("Error", "User not logged in.");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching userId:", error);
//       }
//     };

//     fetchUserAndCurrencies();
//   }, []);

        


//   const handleDeposit = async () => {
//     const amount = parseFloat(inputAmount);
//     if (!amount || isNaN(amount)) {
//       Alert.alert("Invalid Input", "Please enter a valid amount.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.52.190:7000/api/wallet/deposit", {
//         emailOrPhone,
//         currency: "INR",
//         amount,
//       });

//       if (response.status === 200) {
//         setCurrencies((prev) =>
//           prev.map((currency) =>
//             currency.currency === "INR"
//               ? { ...currency, amount: currency.amount + amount }
//               : currency
//           )
//         );
//         setTotalBalance(totalBalance + amount);
//         setInputAmount("");
//         Alert.alert("Success", `₹${amount} deposited successfully.`);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to deposit amount.");
//     }
//   };

//   const handleWithdraw = async () => {
//     const amount = parseFloat(inputAmount);
//     if (!amount || isNaN(amount) || amount > totalBalance) {
//       Alert.alert(
//         "Invalid Input",
//         "Please enter a valid amount or ensure sufficient balance."
//       );
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.52.190:7000/api/wallet/withdraw", {
//         emailOrPhone,
//         currency: "INR",
//         amount,
//       });

//       if (response.status === 200) {
//         setCurrencies((prev) =>
//           prev.map((currency) =>
//             currency.currency === "INR"
//               ? { ...currency, amount: currency.amount - amount }
//               : currency
//           )
//         );
//         setTotalBalance(totalBalance - amount);
//         setInputAmount("");
//         Alert.alert("Success", `₹${amount} withdrawn successfully.`);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to withdraw amount.");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View>
//         {/* <Header /> */}
//       </View>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>My Wallet</Text>
//           <Text style={styles.balanceLabel}>Total Balance</Text>
//           <Text style={styles.balanceValue}>₹{totalBalance.toFixed(2)}</Text>
//         </View>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter amount"
//           keyboardType="numeric"
//           value={inputAmount}
//           onChangeText={(text) => setInputAmount(text)}
//         />

//         <View style={styles.actions}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={handleDeposit}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.actionText}>Deposit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={handleWithdraw}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.actionText}>Withdraw</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.currencies}>
//           <Text style={styles.sectionTitle}>Currency</Text>

//           <FlatList
//             data={currencies}
//             // keyExtractor={(item) => item.emailOrPhone}
//             keyExtractor={(item, index) => `${item.emailOrPhone}_${index}`}
//             renderItem={({ item }) => (
//               <View style={styles.currencyRow}>
//                 <Text style={styles.currencyName}>{item.currency}</Text>
//                 <Text style={styles.currencyValue}>
//                   {currencySymbols[item.currency] || ""}{" "}
//                   {item.amount.toFixed(2)}
//                 </Text>
//               </View>
//             )}
//             // Optionally, you can make FlatList scrollable if you have a large list
//             scrollEnabled={false}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     backgroundColor:'#F4F6F9',
//   },
//   header: {
//     alignItems: "center",
//     marginBottom:10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   balanceLabel: {
//     marginTop: 5,
//     fontSize: 16,
//     color: "#333333",
//   },
//   balanceValue: {
//     fontSize: 20,
//     fontWeight: "bold",
//     // marginTop: 5,
//   },
//   input: {
//     height: 40,
//     backgroundColor:'#fff',
//     // borderWidth: 1,
//     // borderColor: "gray",
//     borderRadius: 5,
//     marginVertical: 20,
//     paddingHorizontal: 10,
//   },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   actionButton: {
//     backgroundColor: "#004080",
//     padding: 8,
//     borderRadius: 5,
//     flex: 1,
//     marginHorizontal: 4,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   actionText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize:12,
//   },
//   currencies: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   currencyRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   currencyName: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   currencyValue: {
//     fontSize: 16,
//   },
// });

// export default Wallet;

