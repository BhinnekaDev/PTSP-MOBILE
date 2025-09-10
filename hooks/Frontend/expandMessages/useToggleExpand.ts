import { useState } from 'react';

export const useToggleExpandMessage = () => {
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);

  const toggleExpandMessage = (id: string) => {
    setExpandedMessageId((prev) => (prev === id ? null : id));
  };

  return { expandedMessageId, toggleExpandMessage };
};
