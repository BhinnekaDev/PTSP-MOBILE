// constants/dataStations.js
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

export const dataStations = [
  {
    name: 'Stasiun Meteorologi',
    icon: <FontAwesome6 name="mountain" size={40} color="#3498DB" />,
    date: 'Jan 23',
    unread: 1,
    instansi: 'Meteorologi',
  },
  {
    name: 'Stasiun Klimatologi',
    icon: <FontAwesome6 name="cloud-bolt" size={40} color="#3498DB" />,
    date: 'Jan 23',
    unread: 1,
    instansi: 'Klimatologi',
  },
  {
    name: 'Stasiun Geofisika',
    icon: <Feather name="wind" size={40} color="#3498DB" />,
    date: 'Jan 23',
    unread: 1,
    instansi: 'Geofisika',
  },
];
