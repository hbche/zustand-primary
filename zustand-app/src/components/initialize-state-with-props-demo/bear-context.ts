import React from 'react';
import { BearStore } from './create-bear-store';

export const BearContext = React.createContext<BearStore | null>(null);
