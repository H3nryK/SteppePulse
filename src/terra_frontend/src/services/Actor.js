import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/terra_backend';

export function createActor(identity) {
  const agent = new HttpAgent({identity});

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: 'bkyz2-fmaaa-aaaaa-qaaaq-cai',
  });
}
