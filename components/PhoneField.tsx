import React from "react";
import { TextInput, HelperText } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import { useField } from "formik";
import { StyleSheet } from "react-native";

type Props = React.ComponentProps<typeof TextInput> & {
  name: string;
  helperText?: string;
};

// default helperText to space to prevent layout jumping
export function PhoneField({ name, helperText = " ", ...rest }: Props) {
  const [field, meta, helpers] = useField(name);
  const errorActive = meta.touched && typeof meta.error === "string";

  return (
    <>
      <PhoneInput
        defaultValue={field.value}
        defaultCode="IN"
        layout="first"
        containerStyle={styles.container}
        onChangeText={helpers.setValue}
      />
      {errorActive && <HelperText
        type={errorActive ? "error" : "info"}
        style={rest.dense ? null : styles.help}
      >
        {errorActive ? meta.error : helperText}
      </HelperText>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 0.7,
    borderRadius: 5,
    overflow: "hidden",
    width: '100%'
  },
  help: {
    marginLeft: -8,
    marginBottom: 3,
  },
});
