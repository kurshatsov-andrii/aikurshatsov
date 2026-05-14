export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      briefs: {
        Row: {
          contact: string
          contact_type: string
          created_at: string
          description: string
          id: string
          name: string | null
          service: string
          status: string
        }
        Insert: {
          contact: string
          contact_type?: string
          created_at?: string
          description: string
          id?: string
          name?: string | null
          service: string
          status?: string
        }
        Update: {
          contact?: string
          contact_type?: string
          created_at?: string
          description?: string
          id?: string
          name?: string | null
          service?: string
          status?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          created_at: string
          id: string
          image_url: string
          issuer: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string
          issuer?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          issuer?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      clips: {
        Row: {
          artist: string
          created_at: string
          description_en: string
          description_uk: string
          id: string
          platform: string
          sort_order: number
          thumbnail_url: string
          title_en: string
          title_uk: string
          updated_at: string
          video_url: string
        }
        Insert: {
          artist?: string
          created_at?: string
          description_en?: string
          description_uk?: string
          id?: string
          platform?: string
          sort_order?: number
          thumbnail_url?: string
          title_en: string
          title_uk: string
          updated_at?: string
          video_url?: string
        }
        Update: {
          artist?: string
          created_at?: string
          description_en?: string
          description_uk?: string
          id?: string
          platform?: string
          sort_order?: number
          thumbnail_url?: string
          title_en?: string
          title_uk?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          description_en: string
          description_uk: string
          icon: string
          id: string
          image_url: string
          link_url: string | null
          price: string | null
          sort_order: number
          title_en: string
          title_uk: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string
          description_uk?: string
          icon?: string
          id?: string
          image_url?: string
          link_url?: string | null
          price?: string | null
          sort_order?: number
          title_en: string
          title_uk: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_uk?: string
          icon?: string
          id?: string
          image_url?: string
          link_url?: string | null
          price?: string | null
          sort_order?: number
          title_en?: string
          title_uk?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      songs: {
        Row: {
          audio_url: string | null
          cover_url: string
          created_at: string
          description_en: string
          description_uk: string
          genre: string
          id: string
          sort_order: number
          tags: string[]
          title_en: string
          title_uk: string
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          cover_url?: string
          created_at?: string
          description_en?: string
          description_uk?: string
          genre?: string
          id?: string
          sort_order?: number
          tags?: string[]
          title_en: string
          title_uk: string
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          cover_url?: string
          created_at?: string
          description_en?: string
          description_uk?: string
          genre?: string
          id?: string
          sort_order?: number
          tags?: string[]
          title_en?: string
          title_uk?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string
          role_en: string
          role_uk: string
          sort_order: number
          text_en: string
          text_uk: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name: string
          role_en?: string
          role_uk?: string
          sort_order?: number
          text_en?: string
          text_uk?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string
          role_en?: string
          role_uk?: string
          sort_order?: number
          text_en?: string
          text_uk?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vibe_projects: {
        Row: {
          created_at: string
          description_en: string
          description_uk: string
          features: string[]
          github_url: string | null
          id: string
          live_url: string | null
          screenshot_url: string
          sort_order: number
          stack: string[]
          title_en: string
          title_uk: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string
          description_uk?: string
          features?: string[]
          github_url?: string | null
          id?: string
          live_url?: string | null
          screenshot_url?: string
          sort_order?: number
          stack?: string[]
          title_en: string
          title_uk: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_uk?: string
          features?: string[]
          github_url?: string | null
          id?: string
          live_url?: string | null
          screenshot_url?: string
          sort_order?: number
          stack?: string[]
          title_en?: string
          title_uk?: string
          updated_at?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          brand: string
          created_at: string
          description_en: string
          description_uk: string
          id: string
          platform: string
          sort_order: number
          thumbnail_url: string
          title_en: string
          title_uk: string
          updated_at: string
          video_url: string
        }
        Insert: {
          brand?: string
          created_at?: string
          description_en?: string
          description_uk?: string
          id?: string
          platform?: string
          sort_order?: number
          thumbnail_url?: string
          title_en: string
          title_uk: string
          updated_at?: string
          video_url?: string
        }
        Update: {
          brand?: string
          created_at?: string
          description_en?: string
          description_uk?: string
          id?: string
          platform?: string
          sort_order?: number
          thumbnail_url?: string
          title_en?: string
          title_uk?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
