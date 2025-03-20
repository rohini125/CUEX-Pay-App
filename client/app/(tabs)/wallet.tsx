
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   ScrollView,
//   TextInput,
//   Alert,
// } from "react-native";
// import React, { useState } from "react";
// import Header from '../Header';

// // Define a type for currency object
// interface Currency {
//   id: string;
//   currency: string;
//   amount: number;
// }

// const currencySymbols: { [key: string]: string } = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr',  PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', 
//   OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', 
//   AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡',  CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK',
// };

// const Wallet = () => {
//   // Set the initial state with types
//   const [currencies, setCurrencies] = useState<Currency[]>([
//     { id: "1", currency: "INR", amount: 0 },
//     // { id: "2", currency: "USD", amount: 0 },
//   ]);
//   const [totalBalance, setTotalBalance] = useState<number>(0);
//   const [inputAmount, setInputAmount] = useState<string>("");
//   const [conversionRate, setConversionRate] = useState<number>(0.013); // Example rate: 1 INR = 0.013 USD

//   const handleDeposit = () => {
//     const amount = parseFloat(inputAmount);
//     if (!amount || isNaN(amount)) {
//       Alert.alert("Invalid Input", "Please enter a valid amount.");
//       return;
//     }

//     const updatedCurrencies = currencies.map((currency) =>
//       currency.currency === "INR"
//         ? { ...currency, amount: currency.amount + amount }
//         : currency
//     );

//     setCurrencies(updatedCurrencies);
//     setTotalBalance(totalBalance + amount);
//     setInputAmount("");
//     Alert.alert("Success", `₹${amount} deposited successfully.`);
//   };

//   const handleWithdraw = () => {
//     const amount = parseFloat(inputAmount);
//     if (!amount || isNaN(amount) || amount > totalBalance) {
//       Alert.alert(
//         "Invalid Input",
//         "Please enter a valid amount or ensure sufficient balance."
//       );
//       return;
//     }

//     const updatedCurrencies = currencies.map((currency) =>
//       currency.currency === "INR"
//         ? { ...currency, amount: currency.amount - amount }
//         : currency
//     );

//     setCurrencies(updatedCurrencies);
//     setTotalBalance(totalBalance - amount);
//     setInputAmount("");
//     Alert.alert("Success", `₹ ${amount} withdrawn successfully.`);
//   };

//   const handleBuy = () => {
//     Alert.alert("Buy Action", "Buy functionality is under development.");
//   };

//   const handleTransfer = () => {
//     Alert.alert("Transfer Action", "Transfer functionality is under development.");
//   };

//   return (
//     <View style={{ flex: 1 }}>
//     {/* Full-Width Header */}
//     <View >
//       <Header/>
//     </View>
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>My Wallet</Text>
//         <Text style={styles.balanceLabel}>Total Balance</Text>
//         <Text style={styles.balanceValue}>₹{totalBalance.toFixed(2)}</Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter amount"
//         keyboardType="numeric"
//         value={inputAmount}
//         onChangeText={(text) => setInputAmount(text)}
//       />

//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionButton} onPress={handleDeposit} activeOpacity={0.7}>
//           <Text style={styles.actionText}>Deposit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw} activeOpacity={0.7}>
//           <Text style={styles.actionText}>Withdraw</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={handleBuy} activeOpacity={0.7}>
//           <Text style={styles.actionText}>Buy</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={handleTransfer} activeOpacity={0.7}>
//           <Text style={styles.actionText}>Transfer</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.currencies}>
//         <Text style={styles.sectionTitle}>Currency</Text>

//         <FlatList
//           data={currencies}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.currencyRow}>
//               <Text style={styles.currencyName}>{item.currency}</Text>
//               <Text style={styles.currencyValue}>
//                 {currencySymbols[item.currency] || ''} {item.amount.toFixed(2)}
//               </Text>
//             </View>
//           )}
//         />

//       </View>
//     </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     padding: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   balanceLabel: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 5,
//   },
//   balanceValue: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#28a745",
//     marginTop: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: "#fff",
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   actionButton: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   actionText: {
//     color: "#fff",
//     fontSize: 16,
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
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   currencyName: {
//     fontSize: 16,
//   },
//   currencyValue: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default Wallet;



 {/* <FlatList
          data={currencies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.currencyRow}>
              <Text style={styles.currencyName}>{item.currency}</Text>
              <Text style={styles.currencyValue}>
                {item.currency === "USD" ? `$ ${item.amount.toFixed(2)}` : `₹ ${item.amount.toFixed(2)}`}
              </Text>
            </View>
          )}
        /> */}


        

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

// interface Currency {
//   id: string;
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

//   // Fetch currencies from database
//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       try {
//         const response = await axios.get("http://192.168.52.190:9000/api/wallet/currencies");
//         setCurrencies(response.data);
//         const total = response.data.reduce(
//           (sum: number, currency: Currency) => sum + currency.amount,
//           0
//         );
//         setTotalBalance(total);
//       } catch (error) {
//         Alert.alert("Error", "Failed to fetch currencies from database.");
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   const handleDeposit = async () => {
//     const amount = parseFloat(inputAmount);
//     if (!amount || isNaN(amount)) {
//       Alert.alert("Invalid Input", "Please enter a valid amount.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.52.190:9000/api/wallet/deposit", {
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
//       const response = await axios.post("http://192.168.52.190:9000/api/wallet/withdraw", {
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
//         <Header />
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
//           <TouchableOpacity
//             style={styles.actionButton}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.actionText}>Buy</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.actionButton}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.actionText}>Transfer</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.currencies}>
//           <Text style={styles.sectionTitle}>Currency</Text>

//           <FlatList
//             data={currencies}
//             keyExtractor={(item) => item.id}
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
//     backgroundColor:'#ADD8E6',
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
//     backgroundColor: "#000000",
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

interface Currency {
  id: string;
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

    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
          const response = await axios.get("http://192.168.52.190:9000/api/wallet/currencies");
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
          setTotalBalance(total);
        } catch (error) {
          console.error("Failed to fetch currencies from database", error);
          Alert.alert("Error", "Failed to fetch currencies from database.");
        }
      };
    fetchCurrencies();
  }, []);
  
            
        


  const handleDeposit = async () => {
    const amount = parseFloat(inputAmount);
    if (!amount || isNaN(amount)) {
      Alert.alert("Invalid Input", "Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.52.190:9000/api/wallet/deposit", {
        currency: "INR",
        amount,
      });

      if (response.status === 200) {
        setCurrencies((prev) =>
          prev.map((currency) =>
            currency.currency === "INR"
              ? { ...currency, amount: currency.amount + amount }
              : currency
          )
        );
        setTotalBalance(totalBalance + amount);
        setInputAmount("");
        Alert.alert("Success", `₹${amount} deposited successfully.`);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to deposit amount.");
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(inputAmount);
    if (!amount || isNaN(amount) || amount > totalBalance) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid amount or ensure sufficient balance."
      );
      return;
    }

    try {
      const response = await axios.post("http://192.168.52.190:9000/api/wallet/withdraw", {
        currency: "INR",
        amount,
      });

      if (response.status === 200) {
        setCurrencies((prev) =>
          prev.map((currency) =>
            currency.currency === "INR"
              ? { ...currency, amount: currency.amount - amount }
              : currency
          )
        );
        setTotalBalance(totalBalance - amount);
        setInputAmount("");
        Alert.alert("Success", `₹${amount} withdrawn successfully.`);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to withdraw amount.");
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

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={inputAmount}
          onChangeText={(text) => setInputAmount(text)}
        />

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
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.currencies}>
          <Text style={styles.sectionTitle}>Currency</Text>

          <FlatList
            data={currencies}
            keyExtractor={(item) => item.id}
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
    backgroundColor:'#ADD8E6',
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
  input: {
    height: 40,
    backgroundColor:'#fff',
    // borderWidth: 1,
    // borderColor: "gray",
    borderRadius: 5,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#000000",
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

