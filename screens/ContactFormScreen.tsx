import { StackNavigationProp } from "@react-navigation/stack";
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-paper';
import  queryString from 'query-string';
import { Field } from '../components/Field';
import { PhoneField } from '../components/PhoneField';
import { CodeTypeEnum } from '../models/code';
import { TabOneParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<TabOneParamList, "TabOneScreen">;
}

export default function ContactForm({ navigation }: Props) {
  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          company: '',
        }}
        validationSchema={schema}
        onSubmit={values => {
          navigation.navigate('QrGenerator', {
            value: `contact?${queryString.stringify(values, { skipEmptyString: true})}`,
            type: CodeTypeEnum.contact
          });
        }}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <Field name="firstName" label="First name"/>
            <Field name="lastName" label="Last Name" />
            <PhoneField name="phoneNumber" label="Phone Number" keyboardType="number-pad" />
            <Field name="email" label="Email" keyboardType="email-address" />
            <Field name="company" label="Company" />
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
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .optional(),
  company: Yup.string().optional(),
  phoneNumber: Yup.string()
    .min(10, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});