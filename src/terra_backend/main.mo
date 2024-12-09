import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Error "mo:base/Error";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import List "mo:base/List";

actor TerraPulse {
    // Custom hash function for large Nat values
    private func natHash(n: Nat) : Hash.Hash {
        Text.hash(Nat.toText(n))
    };

    // Types
    type NFTId = Nat;
    type UserId = Principal;

    type Stats = {
        totalTransactions: Nat;
        totalVolume: Nat;
        uniqueOwners: Nat;
        avgPrice: Nat;
    };

    type Attribute = {
        trait_type: Text;
        value: Text;
    };

    type Rarity = {
        #Common;
        #Rare;
        #Epic;
        #Legendary;
    };

    type NFTCategory = {
        #Wildlife;
        #Hotel;
        #Reserve;
        #ConservationProject;
    };

    type NFTMetadata = {
        id: NFTId;
        name: Text;
        description: Text;
        imageUrl: Text;
        category: NFTCategory;
        price: Nat;
        owner: ?Principal;
        createdAt: Int;
        rarity: Rarity;
        attributes: [Attribute];
        conservationStatus: Text;
    };

    type AdoptionRecord = {
        nftId: NFTId;
        userId: UserId;
        adoptedAt: Int;
        name: Text;
        status: Text;
    };

    type UserProfile = {
        id: UserId;
        username: Text;
        adoptions: [NFTId];
        contributions: Nat;
        badges: [Text];
        balance: Nat;
    };

    type UserStats = {
        totalSpent: Nat;
        nftsOwned: Nat;
        projectsSupported: Nat;
        achievementCount: Nat;
        reputation: Nat;
        lastActive: Int;
    };

    type Transaction = {
        id: Text;
        from: Principal;
        to: Principal;
        amount: Nat;
        nftId: ?NFTId;
        timestamp: Int;
        transactionType: TransactionType;
    };

    type TransactionType = {
        #Purchase;
        #Donation;
        #Reward;
    };

    type MarketplaceListing = {
        nftId: NFTId;
        seller: Principal;
        price: Nat;
        listingTime: Int;
        status: ListingStatus;
        bids: [Bid];
    };

    type Bid = {
        bidder: Principal;
        amount: Nat;
        timestamp: Int;
    };

    type ListingStatus = {
        #Active;
        #Sold;
        #Cancelled;
    };

    type Achievement = {
        id: Text;
        name: Text;
        description: Text;
        criteria: AchievementCriteria;
        rewardAmount: Nat;
        rarity: Rarity;
    };

    type AchievementCriteria = {
        #Adoption: Nat;
        #Contribution: Nat;
        #Collection: Nat;
        #Conservation: Nat;
        #Engagement: Nat;
    };

    type ConservationProject = {
        id: Text;
        name: Text;
        description: Text;
        location: Text;
        species: [Text];
        fundingGoal: Nat;
        currentFunding: Nat;
        startDate: Int;
        endDate: ?Int;
        status: ProjectStatus;
        milestones: [Milestone];
        updates: [ProjectUpdate];
        supporters: [Principal];
    };

    type ProjectStatus = {
        #Active;
        #Completed;
        #Suspended;
    };

    type Milestone = {
        id: Text;
        description: Text;
        targetDate: Int;
        completedDate: ?Int;
        fundingRequired: Nat;
        status: Text;
    };

    type ProjectUpdate = {
        timestamp: Int;
        content: Text;
        mediaUrls: [Text];
        author: Principal;
    };

    type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
        #InsufficientFunds;
        #InvalidInput;
        #ProjectClosed;
        #SystemError;
    };

    // State variables
    private stable var nextNftId: NFTId = 0;
    private stable var nextProjectId: Nat = 0;
    private var nfts = HashMap.HashMap<NFTId, NFTMetadata>(0, Nat.equal, natHash);
    private var adoptions = HashMap.HashMap<NFTId, AdoptionRecord>(0, Nat.equal, natHash);
    private var users = HashMap.HashMap<UserId, UserProfile>(0, Principal.equal, Principal.hash);
    private var userStats = HashMap.HashMap<Principal, UserStats>(0, Principal.equal, Principal.hash);
    private var transactions = HashMap.HashMap<Text, Transaction>(0, Text.equal, Text.hash);
    private var marketplace = HashMap.HashMap<NFTId, MarketplaceListing>(0, Nat.equal, natHash);
    private var conservationProjects = HashMap.HashMap<Text, ConservationProject>(0, Text.equal, Text.hash);
    private stable var systemBalance: Nat = 0;

    public shared(msg) func createUserProfile(username: Text) : async Result.Result<(), Error> {
        // Validate username
        if (username == "" or username.size() < 3 or username.size() > 20) {
            return #err(#InvalidInput);
        };

        // Check if username already exists
        label usernameCheck for ((_, user) in users.entries()) {
            if (user.username == username) {
                return #err(#AlreadyExists);
            };
        };

        switch (users.get(msg.caller)) {
            case (?_) { #err(#AlreadyExists) };
            case null {
                let profile: UserProfile = {
                    id = msg.caller;
                    username = username;
                    adoptions = [];
                    contributions = 0;
                    badges = [];
                    balance = 0;
                };
                users.put(msg.caller, profile);
                return #ok(());
            };
        }
    };

    // Add a new query function to get user profile
    public query func getUserProfile(caller : Principal) : async ?UserProfile {
        users.get(caller)
    };
    
    // Add a function to check username availability
    public query func isUsernameAvailable(username: Text) : async Bool {
        // Check if username is valid length
        if (username == "" or username.size() < 3 or username.size() > 20) {
            return false;
        };

        // Check if username already exists
        for ((_, user) in users.entries()) {
            if (user.username == username) {
                return false;
            }
        };

        true
    };

    // Default achievements
    private let defaultAchievements : [Achievement] = [
        {
            id = "pioneer";
            name = "Wildlife Pioneer";
            description = "First wildlife adoption";
            criteria = #Adoption(1);
            rewardAmount = 100;
            rarity = #Common;
        },
        {
            id = "conservationist";
            name = "Master Conservationist";
            description = "Support 5 conservation projects";
            criteria = #Conservation(5);
            rewardAmount = 500;
            rarity = #Rare;
        },
        {
            id = "collector";
            name = "Wildlife Collector";
            description = "Own 10 wildlife NFTs";
            criteria = #Collection(10);
            rewardAmount = 1000;
            rarity = #Epic;
        },
        {
            id = "guardian";
            name = "Ecosystem Guardian";
            description = "Contribute 10000 tokens to conservation";
            criteria = #Contribution(10000);
            rewardAmount = 2000;
            rarity = #Legendary;
        },
    ];

    // NFT Management
    public shared(msg) func createNFT(
        name: Text,
        description: Text,
        imageUrl: Text,
        category: NFTCategory,
        price: Nat,
        attributes: [Attribute],
        conservationStatus: Text
    ) : async Result.Result<NFTId, Error> {
        if (not isAuthorized(msg.caller)) {
            return #err(#NotAuthorized);
        };

        let nftId = nextNftId;
        nextNftId += 1;

        let rarity = calculateRarity(attributes);

        let metadata: NFTMetadata = {
            id = nftId;
            name = name;
            description = description;
            imageUrl = imageUrl;
            category = category;
            price = price;
            owner = ?msg.caller;
            createdAt = Time.now();
            rarity = rarity;
            attributes = attributes;
            conservationStatus = conservationStatus;
        };

        nfts.put(nftId, metadata);
        updateUserStats(msg.caller);
        #ok(nftId)
    };

    public query func getNFT(id: NFTId) : async Result.Result<NFTMetadata, Error> {
        switch (nfts.get(id)) {
            case null { #err(#NotFound) };
            case (?nft) { #ok(nft) };
        }
    };

    // Marketplace Functions
    public shared(msg) func createMarketplaceListing(
        nftId: NFTId, 
        price: Nat
    ) : async Result.Result<(), Error> {
        switch (nfts.get(nftId)) {
            case null { #err(#NotFound) };
            case (?nft) {
                if (nft.owner != ?msg.caller) {
                    return #err(#NotAuthorized);
                };

                let listing: MarketplaceListing = {
                    nftId = nftId;
                    seller = msg.caller;
                    price = price;
                    listingTime = Time.now();
                    status = #Active;
                    bids = [];
                };

                marketplace.put(nftId, listing);
                #ok()
            };
        }
    };

    public shared(msg) func placeBid(nftId: NFTId, amount: Nat) : async Result.Result<(), Error> {
        switch (marketplace.get(nftId)) {
            case null { #err(#NotFound) };
            case (?listing) {
                if (listing.status != #Active) {
                    return #err(#InvalidInput);
                };

                let currentHighestBid = if (listing.bids.size() > 0) {
                    listing.bids[listing.bids.size() - 1].amount;
                } else { 0 };

                if (amount <= currentHighestBid) {
                    return #err(#InvalidInput);
                };

                let newBid: Bid = {
                    bidder = msg.caller;
                    amount = amount;
                    timestamp = Time.now();
                };

                let updatedListing: MarketplaceListing = {
                    nftId = listing.nftId;
                    seller = listing.seller;
                    price = listing.price;
                    listingTime = listing.listingTime;
                    status = listing.status;
                    bids = Array.append(listing.bids, [newBid]);
                };

                marketplace.put(nftId, updatedListing);
                #ok()
            };
        }
    };

    // Conservation Project Management
    public shared(msg) func createConservationProject(
        name: Text,
        description: Text,
        location: Text,
        species: [Text],
        fundingGoal: Nat,
        endDate: ?Int,
        milestones: [Milestone]
    ) : async Result.Result<Text, Error> {
        if (not isAuthorized(msg.caller)) {
            return #err(#NotAuthorized);
        };

        let projectId = Int.toText(Time.now()) # "-" # Nat.toText(nextProjectId);
        nextProjectId += 1;

        let project: ConservationProject = {
            id = projectId;
            name = name;
            description = description;
            location = location;
            species = species;
            fundingGoal = fundingGoal;
            currentFunding = 0;
            startDate = Time.now();
            endDate = endDate;
            status = #Active;
            milestones = milestones;
            updates = [];
            supporters = [];
        };

        conservationProjects.put(projectId, project);
        #ok(projectId)
    };

    // Helper Functions
    private func calculateRarity(attributes: [Attribute]) : Rarity {
        // Implementation of rarity calculation based on attributes
        #Common
    };

    private func updateUserStats(userId: Principal) {
        switch (userStats.get(userId)) {
            case null {
                let newStats: UserStats = {
                    totalSpent = 0;
                    nftsOwned = 1;
                    projectsSupported = 0;
                    achievementCount = 0;
                    reputation = 0;
                    lastActive = Time.now();
                };
                userStats.put(userId, newStats);
            };
            case (?stats) {
                let updatedStats: UserStats = {
                    totalSpent = stats.totalSpent;
                    nftsOwned = stats.nftsOwned + 1;
                    projectsSupported = stats.projectsSupported;
                    achievementCount = stats.achievementCount;
                    reputation = stats.reputation + 1;
                    lastActive = Time.now();
                };
                userStats.put(userId, updatedStats);
            };
        };
    };

    private func isAuthorized(caller: Principal) : Bool {
        switch (users.get(caller)) {
            case null { false };
            case (?_) { true };
        }
    };

    // Query Functions
    public query func getAllNFTs() : async [NFTMetadata] {
        let buffer = Buffer.Buffer<NFTMetadata>(0);
        for ((_, nft) in nfts.entries()) {
            buffer.add(nft);
        };
        Buffer.toArray(buffer)
    };

    public query func getMarketplaceStats() : async Stats {
        var totalVolume = 0;
        var totalTransactions = 0;
        var uniqueOwners = List.nil<Principal>();

        for ((_, nft) in nfts.entries()) {
            switch (nft.owner) {
                case (?owner) {
                    if (not List.some(uniqueOwners, func (p: Principal) : Bool { p == owner })) {
                        uniqueOwners := List.push(owner, uniqueOwners);
                    };
                };
                case null {};
            };
        };

        {
            totalTransactions = totalTransactions;
            totalVolume = totalVolume;
            uniqueOwners = List.size(uniqueOwners);
            avgPrice = if (totalTransactions == 0) 0 else totalVolume / totalTransactions;
        }
    };

    // System Functions
    system func preupgrade() {
        // Add pre-upgrade logic
    };

    system func postupgrade() {
        // Add post-upgrade logic
    };

    // Internet Identity integration
    public shared(msg) func whoami() : async Principal {
        msg.caller
    };
}