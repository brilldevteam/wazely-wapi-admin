import { Plan } from "./store";

export interface AddPlansPageProps {
  id?: string;
}

export interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export interface PlanFeaturesProps {
  features: {
    contacts: string;
    template_bots: string;
    message_bots: string;
    campaigns: string;
    ai_prompts: string;
    staff: string;
    conversations: string;
    bot_flow: string;
    rest_api: boolean;
    whatsapp_webhook: boolean;
    auto_replies: boolean;
    analytics: boolean;
    priority_support: boolean;
    omnichannel_facebook?: boolean;
    fb_chat?: boolean;
    fb_automation?: boolean;
    fb_campaign?: boolean;
    fb_template?: boolean;
    fb_keyword?: boolean;
    fb_comment_dm?: boolean;
    fb_retrigger?: boolean;
    omnichannel_instagram?: boolean;
    ig_chat?: boolean;
    ig_automation?: boolean;
    ig_campaign?: boolean;
    ig_template?: boolean;
    ig_keyword?: boolean;
    ig_comment_dm?: boolean;
    ig_retrigger?: boolean;
    omnichannel_telegram?: boolean;
    tg_chat?: boolean;
    tg_automation?: boolean;
    tg_campaign?: boolean;
    tg_template?: boolean;
    tg_keyword?: boolean;
    omnichannel_twitter?: boolean;
    tw_chat?: boolean;
    tw_automation?: boolean;
    tw_campaign?: boolean;
    tw_template?: boolean;
    tw_keyword?: boolean;
    custom_fields: string;
    tags: string;
    teams: string;
    forms: string;
    whatsapp_calling: string;
    appointment_bookings: string;
    facebookAds_campaign: string;
    kanban_funnels: string;
    segments: string;
    google_account: string;
    quick_replies: string;
    workspaces: string;
    facebook_lead: string;
    document_file_limit: string;
    audio_file_limit: string;
    video_file_limit: string;
    image_file_limit: string;
    multiple_file_share_limit: string;
  };
  enabled_features: Record<string, boolean>;
  onFeatureChange: (field: string, value: string | boolean) => void;
}

export interface PlanBasicInfoProps {
  formData: {
    name: string;
    slug: string;
    description: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

export interface PlanCardProps {
  plan: Plan;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  isHighlighted?: boolean;
}

export interface PlanHeaderProps {
  isLoading?: boolean;
  onFreeTrialClick?: () => void;
  onSyncClick?: () => void;
  isSyncing?: boolean;
}

export interface PlanListProps {
  plans: Plan[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export interface PlanPricingProps {
  formData: {
    price: string;
    original_price: string;
    currency: string;
    billing_cycle: "monthly" | "yearly" | "lifetime" | "free Trial";
    trial_days: string;
    sort_order: string;
    taxes: string[];
  };
  onFieldChange: (field: string, value: any) => void;
}

export interface PlanFeaturesComponentProps extends PlanFeaturesProps {
  mode?: "all" | "numeric" | "boolean";
  omnichannelPlatforms?: string[];
}

export interface PlanGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export interface PlanSnippetData {
  _id: string;
  name: string;
  token: string;
  plan_ids: {
    _id: string;
    name: string;
    price: number;
    billing_cycle: string;
    is_active: boolean;
  }[];
  theme_color: string;
  title?: string;
  description?: string;
  created_at: string;
  updated_at: string;
} 

export interface GetPlanSnippetsResponse {
  success: boolean;
  data: {
    snippets: PlanSnippetData[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface CreatePlanSnippetRequest {
  name: string;
  plan_ids: string[];
  theme_color: string;
  title?: string;
  description?: string;
}