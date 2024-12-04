import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/terra_backend';

export function createActor(canisterId, options = {}) {
  const agent = new HttpAgent(options.agentOptions);

  // Fetch root key for local replica
  if (process.env.NODE_ENV === "development") {
    agent.fetchRootKey();
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}
