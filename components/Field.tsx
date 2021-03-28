import React from "react";
import { TextInput, HelperText } from "react-native-paper";
import { useField } from "formik";
import { StyleSheet } from "react-native";

type Props = React.ComponentProps<typeof TextInput> & {
  name: string;
  helperText?: string;
};

// default helperText to space to prevent layout jumping
export function Field({ name, helperText = " ", ...rest }: Props) {
  const [field, meta, helpers] = useField(name);
  const errorActive = meta.touched && typeof meta.error === "string";

  return (
    <>
      <TextInput
        mode="outlined"
        error={errorActive}
        style={styles.input}
        {...rest}
        value={field.value}
        onChangeText={helpers.setValue}
        onBlur={() => {
          if (field.name !== "password") {
            helpers.setValue(field.value.trim());
          }

          helpers.setTouched(true);
        }}
      />
      <HelperText
        type={errorActive ? "error" : "info"}
        style={rest.dense ? null : styles.help}
      >
        {errorActive ? meta.error : helperText}
      </HelperText>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fefefe",
  },
  help: {
    marginBottom: 3,
  },
});
