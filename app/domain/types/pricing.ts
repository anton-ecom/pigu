type PriceType = 'cloud' | 'on-premise';
type PriceLevel = 'start' | 'pro' | 'ultimate';

export interface PricingFeature {
  name: string;
  enabled: boolean;
  value?: string | number;
}

export interface PricingPlan {
  type: PriceType;
  level: PriceLevel;
  name: string;
  description: string;
  price: number;
  currency: string;
  period: string;
  features: PricingFeature[];
  highlighted?: boolean;
  cta: string;
  url: string;
}

export interface PricingData {
  cloud: PricingPlan[];
  onPremise: PricingPlan[];
}