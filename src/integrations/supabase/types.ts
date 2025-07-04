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
      animal_facts: {
        Row: {
          animal_name: string
          created_at: string | null
          fact: string
          id: string
        }
        Insert: {
          animal_name: string
          created_at?: string | null
          fact: string
          id?: string
        }
        Update: {
          animal_name?: string
          created_at?: string | null
          fact?: string
          id?: string
        }
        Relationships: []
      }
      animals: {
        Row: {
          conservation_status: string
          created_at: string | null
          description: string
          diet: string
          feeding_time: string
          fun_facts: string[] | null
          habitat: string
          id: string
          image_url: string
          name: string
          scientific_name: string
          sound_url: string | null
          zone: string
        }
        Insert: {
          conservation_status: string
          created_at?: string | null
          description: string
          diet: string
          feeding_time: string
          fun_facts?: string[] | null
          habitat: string
          id?: string
          image_url: string
          name: string
          scientific_name: string
          sound_url?: string | null
          zone: string
        }
        Update: {
          conservation_status?: string
          created_at?: string | null
          description?: string
          diet?: string
          feeding_time?: string
          fun_facts?: string[] | null
          habitat?: string
          id?: string
          image_url?: string
          name?: string
          scientific_name?: string
          sound_url?: string | null
          zone?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string | null
          email: string
          id: string
          number_of_people: number
          phone: string
          special_requirements: string | null
          status: string | null
          visit_date: string
          visit_time: string | null
          visitor_name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          number_of_people: number
          phone: string
          special_requirements?: string | null
          status?: string | null
          visit_date: string
          visit_time?: string | null
          visitor_name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          number_of_people?: number
          phone?: string
          special_requirements?: string | null
          status?: string | null
          visit_date?: string
          visit_time?: string | null
          visitor_name?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      visitor_journals: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          message: string
          rating: number | null
          visitor_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          message: string
          rating?: number | null
          visitor_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          message?: string
          rating?: number | null
          visitor_name?: string
        }
        Relationships: []
      }
      zone_maps: {
        Row: {
          coordinates: Json
          created_at: string | null
          description: string | null
          id: string
          zone_name: string
        }
        Insert: {
          coordinates: Json
          created_at?: string | null
          description?: string | null
          id?: string
          zone_name: string
        }
        Update: {
          coordinates?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          zone_name?: string
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
