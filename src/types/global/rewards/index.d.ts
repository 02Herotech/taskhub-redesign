declare interface RewardPointsHistory {
    id: number;
    role: string;
    type: string;
    amount: number;
    rewardedAt: number[] | null;
  }