import { StackNavigationProp } from "@react-navigation/stack";
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-paper';
import  queryString from 'query-string';
import { Field } from '../components/Field';
import { CodeTypeEnum } from '../models/code';
import { TabOneParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<TabOneParamList, "TabOneScreen">;
}

export default function URLFormScreen({ navigation }: Props) {
  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          website: '',
          url: '',
        }}
        validationSchema={schema}
        onSubmit={values => {
          navigation.navigate('QrGenerator', {
            value: `url?${queryString.stringify(values, { skipEmptyString: true})}`,
            type: CodeTypeEnum.url,
          });
        }}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <Field name="website" label="Website Name" />
            <Field name="url" label="URL" multiline numberOfLines={4} />
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Generate
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    marginTop: 10,
    padding: 8,
  }
});

const schema = Yup.object().shape({
  website: Yup.string()
    .required('Required'),
  url: Yup.string()
    .url()
    .required('Required'),
});