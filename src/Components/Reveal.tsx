import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

// Faz o conteúdo surgir subindo e ganhando opacidade, com atraso configurável.
export default function Reveal({
  children,
  delay = 0,
  enabled = true,
  style,
}: RevealProps) {
  const progress = useRef(new Animated.Value(enabled ? 0 : 1)).current;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    Animated.timing(progress, {
      toValue: 1,
      duration: 480,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [enabled, delay, progress]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [28, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}