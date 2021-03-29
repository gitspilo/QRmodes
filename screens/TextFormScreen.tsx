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

export default function TextFormScreen({ navigation }: Props) {
  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          title: '',
          text: '',
        }}
        validationSchema={schema}
        onSubmit={values => {
          navigation.navigate('QrGenerator', {
            value: `text?${queryString.stringify(values, { skipEmptyString: true})}`,
            type: CodeTypeEnum.text,
          });
        }}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <Field name="title" label="Title" />
            <Field name="text" label="Text" multiline numberOfLines={4} />
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
  title: Yup.string().required('Required'),
  text: Yup.string().required('Required'),
});