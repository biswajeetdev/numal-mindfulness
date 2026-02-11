import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type GradientPosition = "top" | "center" | "bottom";

interface GradientProps {
  position: GradientPosition;
  isSpeaking: boolean;
}

const colors = ["#007AFA", "#4DA6FF", "#5AC8FA", "#E6F3FF", "#FFFFFF"];

export function Gradient({ position }: GradientProps) {
  const start = position === "top" ? { x: 0.5, y: 0 } : { x: 0.5, y: 0.5 };
  const end = position === "bottom" ? { x: 0.5, y: 1 } : { x: 0.5, y: 0.5 };

  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
