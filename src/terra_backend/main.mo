import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";

import ICRC7 "mo:icrc7-mo";


// Token Canister Interface
module {
  public type TokenCanister = actor {
    icrc1_transfer : (TransferArgs) -> async Result.Result<Nat, TransferError>;
    icrc1_balance_of : (Account) -> async Nat;
  };

  public type Account = {
    owner : Principal;
    subaccount : ?[Nat8];
  };

  public type TransferArgs = {
    to : Account;
    amount : Nat;
  };

  public type TransferError = {
    #InsufficientFunds;
    #TooOld;
    #BadFee;
    #Other : Text;
  };

  public type ProposalStatus = {
    #Pending;
    #Approved;
    #Rejected;
    #Executed;
  };

  public type ProposalType = {
    #AddAnimal;
    #UpdateAnimalStatus;
    #CreateTask;
    #UpdateTokenomics;
    #WithdrawFunds;
  };

  public type Proposal = {
    id : Nat;
    proposer : Principal;
    title : Text;
    description : Text;
    proposalType : ProposalType;
    status : ProposalStatus;
    votes : {
      supportive : [Principal];
      against : [Principal];
    };
    createdAt : Time.Time;
    executionData : ?Text;
  };

  public type VotingPower = Nat;

  public type CkBTCCanister = {
    getBalance : (account : Account) -> async Nat;
    transfer : (request : TransferRequest) -> async Result.Result<Nat, TransferError>;
  };

  public type Account = {
    owner : Principal;
    subaccount : ?[Nat8];
  };

  public type TransferRequest = {
    to : Account;
    amount : Nat;
    memo : ?Text;
  };

  public type TransferError = {
    #InsufficientFunds;
    #InvalidAccount;
    #Other : Text;
  };
};

// Main Wildlife Conservation Canister
actor WildlifeConservationSystem {

  public type UserRole = {
    #Casual;
    #Admin;
  };

  public type UserProfile = {
    id : Principal;
    username : Text;
    email : Text;
    role : UserRole;
    createdAt : Time.Time;
  };

  public type Animal = {
    id : Nat;
    name : Text;
    species : Text;
    description : Text;
    adoptionFee : Nat;
    imageUrl : Text;
    status : {
      #Available;
      #Adopted;
      #Endangered;
    };
  };

  public type NFT = {
    id : Nat;
    name : Text;
    description : Text;
    imageUrl : Text;
    tokenPrice : Nat;
    mintedBy : Principal;
  };

  public type Task = {
    id : Nat;
    title : Text;
    description : Text;
    reward : Nat;
    status : {
      #Open;
      #InProgress;
      #Completed;
    };
    createdBy : Principal;
    assignedTo : ?Principal;
  };

  // State Management
  private let users = HashMap.HashMap<Principal, UserProfile>(10, Principal.equal, Principal.hash);
  private let animals = HashMap.HashMap<Nat, Animal>(10, Nat.equal, Nat.hash);
  private let nfts = HashMap.HashMap<Nat, NFT>(10, Nat.equal, Nat.hash);
  private let tasks = HashMap.HashMap<Nat, Task>(10, Nat.equal, Nat.hash);
  private let proposals = HashMap.HashMap<Nat, {
    id : Nat;
    title : Text;
    description : Text;
    proposer : Principal;
    votes : {
      yes : Nat;
      no : Nat;
    };
    status : {
      #Open;
      #Approved;
      #Rejected;
    };
  }>(10, Nat.equal, Nat.hash);
  private let proposalCounter : Nat = 0;

  // Governance and ckBTC Integration
  private let ckBTCCanister : actor {
    icrc1_balance_of : shared query { owner : Principal; subaccount : ?Blob } -> async Nat;
    icrc1_transfer : shared { from_subaccount : ?Blob; to : { owner : Principal; subaccount : ?Blob }; amount : Nat; fee : ?Nat; memo : ?Blob; created_at_time : ?Nat64 } -> async { #Ok : Nat; #Err : Text };
  } = actor("mxzaz-hqaaa-aaaar-qaada-cai"); // Mainnet ckBTC ledger

  // Token Interaction
  private let tokenCanister : actor { icrc1_balance_of : shared query { owner : Principal; subaccount : ?Blob } -> async Nat } = actor("csjlp-eaaaa-aaaam-advwa-cai");
  // Counter for generating unique IDs
  private var userCounter : Nat = 0;
  private var animalCounter : Nat = 0;
  private var nftCounter : Nat = 0;
  private var taskCounter : Nat = 0;

  // Voting power calculation
  private func calculateVotingPower(voter : Principal) : async VotingPower {

    let tokenBalance = await tokenCanister.icrc1_balance_of({
        owner = voter;
        subaccount = null;
    });
  };

  // User Management
  public shared(msg) func createUser(username : Text, email : Text, role : UserRole) : async Result.Result<UserProfile, Text> {
    let userId = msg.caller;
    
    // Check if user already exists
    switch (users.get(userId)) {
      case (null) {
        let newUser : UserProfile = {
          id = userId;
          username = username;
          email = email;
          role = role;
          createdAt = Time.now();
        };
        users.put(userId, newUser);
        #ok(newUser)
      };
      case (_) { #err("User already exists") };
    }
  };

  public shared(msg) func getUserProfile() : async Result.Result<UserProfile, Text> {
    switch (users.get(msg.caller)) {
      case (null) { #err("User not found") };
      case (?user) { #ok(user) };
    }
  };

  // Animal Adoption Management
  public shared(msg) func addAnimal(name : Text, species : Text, description : Text, adoptionFee : Nat, imageUrl : Text) : async Result.Result<Animal, Text> {
    // Only admins can add animals
    switch (users.get(msg.caller)) {
      case (null) { #err("User not found") };
      case (?user) {
        if (user.role != #Admin) {
          return #err("Only admins can add animals");
        };

        let newAnimal : Animal = {
          id = animalCounter;
          name = name;
          species = species;
          description = description;
          adoptionFee = adoptionFee;
          imageUrl = imageUrl;
          status = #Available;
        };

        animals.put(animalCounter, newAnimal);
        animalCounter += 1;
        #ok(newAnimal)
      };
    }
  };

  public shared(msg) func adoptAnimal(animalId : Nat) : async Result.Result<Animal, Text> {
    switch (animals.get(animalId)) {
      case (null) { #err("Animal not found") };
      case (?animal) {
        if (animal.status != #Available) {
          return #err("Animal is not available for adoption");
        };

        // Transfer adoption fee to the system
        let transferResult = await tokenCanister.icrc1_transfer({
          to = { owner = Principal.fromActor(this); subaccount = null };
          amount = animal.adoptionFee;
        });

        switch (transferResult) {
          case (#ok(_)) {
            let updatedAnimal = { animal with status = #Adopted };
            animals.put(animalId, updatedAnimal);
            #ok(updatedAnimal)
          };
          case (#err(transferError)) { 
            #err("Transfer failed: " # debug_show(transferError)) 
          };
        }
      };
    }
  };

  // NFT Management
  public shared(msg) func createNFT(name : Text, description : Text, imageUrl : Text, tokenPrice : Nat) : async Result.Result<NFT, Text> {
    // Only admins can create NFTs
    switch (users.get(msg.caller)) {
      case (null) { #err("User not found") };
      case (?user) {
        if (user.role != #Admin) {
          return #err("Only admins can create NFTs");
        };

        let newNFT : NFT = {
          id = nftCounter;
          name = name;
          description = description;
          imageUrl = imageUrl;
          tokenPrice = tokenPrice;
          mintedBy = msg.caller;
        };

        nfts.put(nftCounter, newNFT);
        nftCounter += 1;
        #ok(newNFT)
      };
    }
  };

  public shared(msg) func purchaseNFT(nftId : Nat) : async Result.Result<NFT, Text> {
    switch (nfts.get(nftId)) {
      case (null) { #err("NFT not found") };
      case (?nft) {
        // Transfer NFT price to the system
        let transferResult = await tokenCanister.icrc1_transfer({
          to = { owner = Principal.fromActor(this); subaccount = null };
          amount = nft.tokenPrice;
        });

        switch (transferResult) {
          case (#ok(_)) { #ok(nft) };
          case (#err(transferError)) { 
            #err("Transfer failed: " # debug_show(transferError)) 
          };
        }
      };
    }
  };

  // Task Management
  public shared(msg) func createTask(title : Text, description : Text, reward : Nat) : async Result.Result<Task, Text> {
    // Only admins can create tasks
    switch (users.get(msg.caller)) {
      case (null) { #err("User not found") };
      case (?user) {
        if (user.role != #Admin) {
          return #err("Only admins can create tasks");
        };

        let newTask : Task = {
          id = taskCounter;
          title = title;
          description = description;
          reward = reward;
          status = #Open;
          createdBy = msg.caller;
          assignedTo = null;
        };

        tasks.put(taskCounter, newTask);
        taskCounter += 1;
        #ok(newTask)
      };
    }
  };

  public shared(msg) func assignTask(taskId : Nat) : async Result.Result<Task, Text> {
    switch (tasks.get(taskId)) {
      case (null) { #err("Task not found") };
      case (?task) {
        if (task.status != #Open) {
          return #err("Task is not available for assignment");
        };

        let updatedTask = { task with 
          status = #InProgress; 
          assignedTo = ?msg.caller 
        };
        tasks.put(taskId, updatedTask);
        #ok(updatedTask)
      };
    }
  };

  public shared(msg) func completeTask(taskId : Nat) : async Result.Result<Task, Text> {
    switch (tasks.get(taskId)) {
      case (null) { #err("Task not found") };
      case (?task) {
        if (task.status != #InProgress or task.assignedTo != ?msg.caller) {
          return #err("You cannot complete this task");
        };

        // Transfer task reward to the user
        let transferResult = await tokenCanister.icrc1_transfer({
          to = { owner = msg.caller; subaccount = null };
          amount = task.reward;
        });

        switch (transferResult) {
          case (#ok(_)) {
            let updatedTask = { task with status = #Completed };
            tasks.put(taskId, updatedTask);
            #ok(updatedTask)
          };
          case (#err(transferError)) { 
            #err("Reward transfer failed: " # debug_show(transferError)) 
          };
        }
      };
    }
  };

  // Governance Functions
  public shared(msg) func createProposal(
    title : Text,
    description : Text,
    proposalType : ProposalType,
    executionData :? Text
  ) : async Result.Result<Proposal, Text> {

    let votingPower = await calculateVotingPower(msg.caller);
    if (votingPower < 100) {
        return #err("Insufficient voting power to create a proposal");
    };

    let newProposal : Proposal = {
        id = proposalCounter;
        proposer = msg.caller;
        title = title;
        description = description;
        proposalType = proposalType;
        status = #Pending;
        votes = {
            supportive = [];
            against = [];
        };
        createdAt = Time.now();
        executionData = executionData;
    };

    proposals.put(proposalCounter, newProposal);
    proposalCounter += 1;
    #ok(newProposal)
  };

  public shared(msg) func voteOnProposal(
    proposalId : Nat,
    vote : Bool
  ) : async Result.Result<Proposal, Text> {
    switch (proposals.get(proposalId)) {
        case (null) { #err("Proposal not found") };
        case (?proposal) {

            // Prevent double voting
            if (Array.find(proposal.votes.supportive, func(p : Principal) = p == msg.caller ) != null or
            Array.find(proposal.votes.against, func(p : Principal) = p == msg.caller ) != null) {
                return #err("You have already voted on this proposal");
            };

            let votingPower = await calculateVotingPower(msg.caller);
            if (votingPower < 100) {
                return #err("Insufficient voting power to vote");
            };

            let updatedVotes = if (support) {
                {
                    supportive = Array.append(proposal.votes.supportive, [msg.caller]);
                    against = proposal.votes.against;
                }
            } else {
                {
                    supportive = proposal.votes.supportive;
                    against = Array.append(proposal.votes.against, [msg.caller]);
                }
            };

            let updatedProposal = checkProposalResolution({
                proposal with
                votes = updatedVotes;
            });

            proposals.put(proposalId, updatedProposal);
            #ok(updatedProposal)
        };
    }
  };

  private func checkProposalResolution(proposal : Proposal) : Proposal {

    let totalVotingPower = proposal.votes.supportive.size() + proposal.votes.against.size();

    if (proposal.votes.supportive.size() > totalVotingPower / 2) {
        executeProposal(proposal)
    } else if (proposal.votes.against.size() > totalVotingPower / 2) {
        { proposal with status = #Rejected }
    } else {
        proposal
    }
  };

  private func executeProposal(proposal : Proposal) : Proposal {
    switch (proposal.proposalType) {
      case (#AddAnimal) {
        // Extract animal details from executionData
        // This would require parsing the executionData JSON
        // Assuming successful execution
        { proposal with status = #Executed }
      };
      case (#UpdateAnimalStatus) {
        // Similar to AddAnimal, parse and execute
        { proposal with status = #Executed }
      };
      case (#CreateTask) {
        // Parse and create task from executionData
        { proposal with status = #Executed }
      };
      case (#UpdateTokenomics) {
        // Implement tokenomics update logic
        { proposal with status = #Executed }
      };
      
      case (#WithdrawFunds) {
        // Implement fund withdrawal logic
        { proposal with status = #Executed }
      };
    }
  };

  // ckBTC Interaction
  public shared(msg) func checkCkBTCBalance() : async Nat {
    await ckBTCCanister.getBalance({
        owner = msg.caller;
        subaccount = null;
    })
  };

  public shared(msg) func transerCkBTC(to : Principal, amount : Nat) : async Result.Result<Nat, Text> {
    let transferResult = await ckBTCCanister.transfer({
        to = {
            owner = to;
            subaccount = null
        };
        amount = amount;
        memo = ?("Wildlife Conservation Transfer")
    });

    switch (transferResult) {
        case (#ok(blockIndex)) { #ok(blockIndex) };
        case (#err(transferError)) {
            #err(switch (transferError) {
                case (#InsufficientFunds) { "Insufficient ckBTC funds" };
                case (#InvalidAccount) { "Invalid required account" };
                case (#Other(errorMsg)) { "Transfer error: " # errorMsg };
            })
        };
    }
  };
  
  // Utility Functions
  public query func getAllAnimals() : async [Animal] {
    Buffer.toArray(Buffer.fromArray<Animal>(Iter.toArray(animals.vals())))
  };

  public query func getAllNFTs() : async [NFT] {
    Buffer.toArray(Buffer.fromArray<NFT>(Iter.toArray(nfts.vals())))
  };

  public query func getAllTasks() : async [Task] {
    Buffer.toArray(Buffer.fromArray<Task>(Iter.toArray(tasks.vals())))
  };

  // Token Balance Checking
  public shared(msg) func checkTokenBalance() : async Nat {
    await tokenCanister.icrc1_balance_of({
      owner = msg.caller;
      subaccount = null;
    })
  };

  public query func getAllProposals() : async [Proposal] {
    Buffer.toArray(Buffer.fromArray<Proposal>(Iter.toArray(proposals.vals())))
  };

  public query func getProposalById(proposalId : Nat) : async ?Proposal {
    proposals.get(proposalId)
  };

  // System Upgrade and Maintenance
  public shared({ caller }) func upgradeSystem(
    newCanisterCode : Blob
  ) : async Result.Result<(), Text> {

    if (caller != Principal.fromText("your-governance-principal")) {
        return #err("unauthorized system upgrade attempt");
    };

    #ok()
  };

};