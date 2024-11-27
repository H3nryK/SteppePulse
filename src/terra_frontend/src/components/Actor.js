import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/terra_backend';

export function createActor(canisterId, options = {}) {
    const agent = new HttpAgent(options.agentOptions);
    return Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });
}