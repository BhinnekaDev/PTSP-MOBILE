// utils/getCategoryIcon.ts
import React, { ReactElement } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const getCategoryIcon = (cat: string): ReactElement => {
  switch (cat) {
    case 'Meteorologi':
      return <FontAwesome6 name="mountain" size={60} color="white" />;
    case 'Klimatologi':
      return <FontAwesome6 name="cloud-bolt" size={60} color="white" />;
    case 'Geofisika':
      return <FontAwesome6 name="wind" size={60} color="white" />;
    default:
      return <FontAwesome6 name="info-circle" size={60} color="white" />;
  }
};
