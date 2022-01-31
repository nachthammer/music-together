import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "./Themed";

export type ButtonProps = {
  title: string;
  onPress: () => void;
  style: any;
};

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>title</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flexDirection: "row",
    height: 50,
    backgroundColor: "#ff99ff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 0,
    width: "45%",
  },
  buttonText: {
    padding: 5,
    justifyContent: "space-evenly",
  },
});
