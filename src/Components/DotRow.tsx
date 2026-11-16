import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

import characterStyle from "../style/CharacterStyle";

const TOTAL = 5;

interface DotProps {
  filled: boolean;
  delay: number;
  animate: boolean;
  onPress: () => void;
}

function Dot({ filled, delay, animate, onPress }: DotProps) {
  const scale = useRef(new Animated.Value(animate ? 0 : 1)).current;

  useEffect(() => {
    if (!animate) {
      return;
    }

    Animated.spring(scale, {
      toValue: 1,
      delay,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [animate, delay, scale]);

  return (
    <TouchableOpacity onPress={onPress} hitSlop={4}>
      <Animated.View
        style={[
          characterStyle.dot,
          filled && characterStyle.dotFilled,
          { transform: [{ scale }] },
        ]}
      ></Animated.View>
    </TouchableOpacity>
  );
}

interface DotRowProps {
  value: number;
  onChange: (value: number) => void;
  delay?: number;
  animate?: boolean;
}

// Linha com 5 bolinhas: tocar na bolinha define o valor; tocar na atual remove 1 ponto.
export default function DotRow({
  value,
  onChange,
  delay = 0,
  animate = false,
}: DotRowProps) {
  return (
    <View style={characterStyle.dots}>
      {Array.from({ length: TOTAL }, (_, index) => {
        const posicao = index + 1;

        return (
          <Dot
            key={posicao}
            filled={posicao <= value}
            delay={delay + index * 50}
            animate={animate}
            onPress={() => onChange(posicao === value ? posicao - 1 : posicao)}
          ></Dot>
        );
      })}
    </View>
  );
}