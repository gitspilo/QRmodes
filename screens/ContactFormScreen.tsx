import { StackNavigationProp } from "@react-navigation/stack";
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-paper';
import { Field } from '../components/Field';
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
          email: ''
        }}
        validationSchema={schema}
        onSubmit={values => console.log(values)}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <Field
              name="firstName"
              label="First name"
            />
            <Field
              name="lastName"
              label="Last Name"
            />
            <Field
              name="email"
              label="Email"
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
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
    padding: 10,
  }
});

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});