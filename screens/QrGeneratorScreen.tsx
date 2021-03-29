import React, { useRef, useEffect, useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, PixelRatio, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import CameraRoll from "@react-native-community/cameraroll";
import { Text, Button, useTheme } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import  queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { captureRef } from 'react-native-view-shot';
import { Dispatch } from '../store';
import { CodeTypeEnum } from '../models/code';
import { TabOneParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<TabOneParamList, 'QrGenerator'>;
  route: RouteProp<TabOneParamList, 'QrGenerator'>;
}

export default function QrGeneratorScreen({ navigation, route }: Props) {
  const { params } = route;
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const { colors } = useTheme();
  const refShots = useRef(null);
  const dispatch = useDispatch<Dispatch>();
  const parsed = queryString.parseUrl(params.value);
  const targetPixelCount = 1080;
  const pixelRatio = PixelRatio.get();
  const pixels = targetPixelCount / pixelRatio;

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleSave = () => {
    dispatch.code.addCode({
      value: params.value,
      type: params.type
    })
  };

  const handleDownload = async () => {
    const result = await captureRef(refShots, {
      result: 'tmpfile',
      height: pixels,
      width: pixels,
      quality: 1,
      format: 'png',
    });
    console.log('result', result);

    CameraRoll.save(result, { type: 'photo' });
  };
  

  const eValue = (type: CodeTypeEnum) => {
    switch (type) {
      case CodeTypeEnum.contact:
        return (
          <View style={styles.detail}>
            <Text style={styles.title}>
              {parsed.query.firstName} {parsed.query.lastName}
            </Text>
            <Text>{parsed.query.phoneNumber}</Text>
          </View>
        );
      case CodeTypeEnum.text:
        return (
          <View style={styles.detail}>
            <Text style={styles.title}>{parsed.query.title}</Text>
            <Text>{parsed.query.text}</Text>
          </View>
        );
      case CodeTypeEnum.url:
        return (
          <View style={styles.detail}>
            <Text style={styles.title}>{parsed.query.website}</Text>
            <Text>{parsed.query.url}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View collapsable={false} ref={refShots}>
        {eValue(params.type)}
        <QRCode size={200} value={params.value} />
      </View>
      <View style={styles.actions}>
        <Button
          icon="download"
          color={colors.primary}
          onPress={handleDownload}
        >
          Download
        </Button>
        <Button
          icon="share"
          color={colors.primary}
          onPress={() => {}}
        >
          Share
        </Button>
      </View>
      <View style={styles.actions}>
        <Button
          icon="file"
          color={colors.primary}
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    marginTop: 15,
    flexDirection: 'row',
  },
  detail: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
  }
});
