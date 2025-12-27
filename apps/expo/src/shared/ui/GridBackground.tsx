import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { palette } from '../theme';

interface GridBackgroundProps {
  children: React.ReactNode;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Svg pointerEvents="none" style={styles.grid} width="100%" height="100%">
        {Array.from({ length: 40 }).map((_, index) => {
          const offset = index * 32;
          return (
            <React.Fragment key={`grid-${offset}`}>
              <Line
                x1={offset}
                y1={0}
                x2={offset}
                y2="100%"
                stroke={palette.grid}
                strokeWidth="0.5"
              />
              <Line
                x1={0}
                y1={offset}
                x2="100%"
                y2={offset}
                stroke={palette.grid}
                strokeWidth="0.5"
              />
            </React.Fragment>
          );
        })}
      </Svg>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  grid: {
    opacity: 0.25,
    position: 'absolute',
  },
});

export default GridBackground;
