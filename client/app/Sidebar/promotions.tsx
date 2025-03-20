import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, FlatList, Image, StyleSheet , TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import router for navigation

const promotions = [
  { id: '1', title: 'Exchange Rates Special!', description: 'Get the best rates for USD to INR today.', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Wallet Cashback Offer', description: 'Earn 10% cashback on wallet top-ups.', image: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Zero Fee Transfers', description: 'No fees on international transfers.', image: 'https://via.placeholder.com/150' },
  { id: '4', title: 'Zero Fee Transfers', description: 'No fees on international transfers.', image: 'https://via.placeholder.com/150' },
];
 const router = useRouter(); // For navigation
const PromotionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPromotions = (promotions || []).filter(promotion => {
    const title = String(promotion.title || ''); // Convert to string
    const description = String(promotion.description || ''); // Convert to string
    const query = String(searchQuery || ''); // Convert to string
    return title.toLowerCase().includes(query.toLowerCase()) ||
           description.toLowerCase().includes(query.toLowerCase());
  });
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Promotions</Text>
      </View><View style={styles.card}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Promotions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
    

      {/* Carousel Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
        {promotions.map(promotion => (
          <View key={promotion.id} style={styles.carouselItem}>
            <Image source={{ uri: promotion.image }} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{promotion.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Promotions Grid */}
      <FlatList
        data={filteredPromotions}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.promotionCard}>
            <Image source={{ uri: item.image }} style={styles.promotionImage} />
            <Text style={styles.promotionTitle}>{item.title}</Text>
            <Text style={styles.promotionDescription}>{item.description}</Text>
          </View>
        )}
      />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#ADD8E6'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 16,
    marginBottom:10,
  
  },
  headerTitle: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 10,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 50,
    backgroundColor: '#f9f9f9',
  },
  carouselContainer: { 
    marginBottom: 20 
  },
  carouselItem: { 
    marginRight: 10, 
    alignItems: 'center'
   },
  carouselImage: { 
    width: 150, 
    height: 100,
     borderRadius: 8 
    },
  carouselText: {
     marginTop: 5,
      fontSize: 14, 
      fontWeight: 'bold' 
    },
  promotionCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#E6F2FA",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    margin: 20,
  },
  promotionImage: { width: '100%', height: 100, borderRadius: 8 },
  promotionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  promotionDescription: { fontSize: 12, color: '#555', marginTop: 5 },
});

export default PromotionsPage;
