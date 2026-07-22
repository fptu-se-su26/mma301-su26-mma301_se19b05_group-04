import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Destination } from '../../../types/destination';
import { DestinationCard } from '../../../components/travel/DestinationCard';

type Props = { destinations: Destination[]; onPress: (d: Destination) => void; favorites: string[]; onFavorite: (d: Destination) => void };

export const FeaturedDestinationList: React.FC<Props> = ({ destinations, onPress, favorites, onFavorite }) => (
  <View style={styles.c}>
    {destinations.map(d => (
      <DestinationCard key={d.id} destination={d} onPress={() => onPress(d)} onFavorite={() => onFavorite(d)} isFavorite={favorites.includes(d.id)} />
    ))}
  </View>
);

const styles = StyleSheet.create({ c: { paddingHorizontal: 16 } });
