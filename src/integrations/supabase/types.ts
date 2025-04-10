export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_connections: {
        Row: {
          api_key_encrypted: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          model: string
          provider: string
          user_id: string | null
        }
        Insert: {
          api_key_encrypted?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          model: string
          provider: string
          user_id?: string | null
        }
        Update: {
          api_key_encrypted?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          model?: string
          provider?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chatbots: {
        Row: {
          appearance: Json | null
          created_at: string | null
          custom_prompt: string | null
          description: string | null
          id: string
          industry: string | null
          knowledge_base: Json | null
          language: string | null
          name: string
          template: string | null
          user_id: string | null
        }
        Insert: {
          appearance?: Json | null
          created_at?: string | null
          custom_prompt?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          knowledge_base?: Json | null
          language?: string | null
          name: string
          template?: string | null
          user_id?: string | null
        }
        Update: {
          appearance?: Json | null
          created_at?: string | null
          custom_prompt?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          knowledge_base?: Json | null
          language?: string | null
          name?: string
          template?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          question: string
          scraping_task_id: string | null
          source_url: string | null
          user_id: string | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          question: string
          scraping_task_id?: string | null
          source_url?: string | null
          user_id?: string | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          question?: string
          scraping_task_id?: string | null
          source_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faqs_scraping_task_id_fkey"
            columns: ["scraping_task_id"]
            isOneToOne: false
            referencedRelation: "scraping_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_tasks: {
        Row: {
          completed_pages: number | null
          created_at: string | null
          id: string
          raw_content: Json | null
          status: string | null
          total_pages: number | null
          url: string
          user_id: string | null
        }
        Insert: {
          completed_pages?: number | null
          created_at?: string | null
          id?: string
          raw_content?: Json | null
          status?: string | null
          total_pages?: number | null
          url: string
          user_id?: string | null
        }
        Update: {
          completed_pages?: number | null
          created_at?: string | null
          id?: string
          raw_content?: Json | null
          status?: string | null
          total_pages?: number | null
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
