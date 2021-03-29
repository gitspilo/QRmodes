import * as React from 'react';
import { StyleSheet, View, FlatList, TouchableNativeFeedback, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import { qrTypes } from '../helpers/qrTypes';
import { TabOneParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<TabOneParamList, "TabOneScreen">;
}

export default function TabOneScreen({ navigation }: Props) {
  const renderItem = ({ item }: any) => (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate(item.nav)}
    >
      <View style={styles.item}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
          <Ionicons name="arrow-forward-circle-outline" size={34} color="black" />
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={qrTypes}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
});
