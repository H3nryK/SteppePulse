import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/terra_backend';

export function createActor(identity) {
  const agent = new HttpAgent({identity});

  // Fetch root key for local replica
  if (process.env.NODE_ENV === "development") {
    agent.fetchRootKey();
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: 'bkyz2-fmaaa-aaaaa-qaaaq-cai',
  });
}
