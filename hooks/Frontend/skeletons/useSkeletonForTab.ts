import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useSkeletonForTab = (duration: number = 500) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShowSkeleton(true);
      const timer = setTimeout(() => setShowSkeleton(false), duration);
      return () => clearTimeout(timer);
    }, [duration])
  );

  return showSkeleton;
};
