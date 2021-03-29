import * as React from 'react';
import { StyleSheet, View, FlatList, TouchableNativeFeedback, Text } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import SafeAreaView from 'react-native-safe-area-view';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import  queryString from 'query-string';
import { CodeTypeEnum, Code } from '../models/code';
import { RootState } from '../store';
import { TabOneParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<TabOneParamList, 'QrGenerator'>;
}

export default function TabThreeScreen({ navigation }: Props) {
  const all = useSelector((state: RootState) => state.code.all);

  const handleNavigation = (item: Code) => {
    navigation.navigate("QrGenerator", {
      value: item.value,
      type: item.type
    })
  }

  const renderItem = ({ item }: any) => {
    const parsed = queryString.parseUrl(item.value);

    switch (item.type) {
      case CodeTypeEnum.contact:
        return (
          <TouchableNativeFeedback
            onPress={() => handleNavigation(item)}
          >
            <View style={styles.item}>
              <View>
              <Text style={styles.title}>
                {parsed.query.firstName} {parsed.query.lastName}
              </Text>
              <Text>{parsed.query.phoneNumber}</Text>
              </View>
              <View>
                <QRCode size={50} value={item.value} />
              </View>
            </View>
          </TouchableNativeFeedback>
        );
      case CodeTypeEnum.text:
        return (
          <TouchableNativeFeedback
            onPress={() => handleNavigation(item)}
          >
            <View style={styles.item}>
              <View>
                <Text style={styles.title}>{parsed.query.title}</Text>
                <Text>{parsed.query.text}</Text>
              </View>
              <View>
                <QRCode size={50} value={item.value} />
              </View>
            </View>
          </TouchableNativeFeedback>
        );
      case CodeTypeEnum.url:
        return (
          <TouchableNativeFeedback
            onPress={() => handleNavigation(item)}
          >
            <View style={styles.item}>
              <View>
                <Text style={styles.title}>{parsed.query.website}</Text>
                <Text>{parsed.query.url}</Text>
              </View>
              <View>
                <QRCode size={50} value={item.value} />
              </View>
            </View>
          </TouchableNativeFeedback>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={all}
        renderItem={renderItem}
        keyExtractor={(item, i) => item.value}
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
  detail: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
