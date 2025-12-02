import * as React from "react";
import { Plugin, Getter } from "@vtrphan/dx-react-core";
import { buildAnimation, easeOutCubic } from "@vtrphan/dx-chart-core";
import { AnimationProps } from "../types";

const AnimationBase: React.FC<AnimationProps> = ({
  easing = easeOutCubic,
  duration = 1000
}) => {
  const buildAnimationGetter = React.useMemo(
    () => () => buildAnimation(easing, duration),
    [easing, duration]
  );

  return (
    <Plugin name="Animation">
      <Getter name="animation" computed={buildAnimationGetter} />
    </Plugin>
  );
};

export const Animation: React.ComponentType<AnimationProps> = AnimationBase;
