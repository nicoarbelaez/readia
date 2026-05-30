export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public_web: {
    Tables: {
      businesses: {
        Row: {
          category: string | null;
          company_name: string;
          create_at: string;
          description: string | null;
          employee_count: number | null;
          id: number;
          net_earnings: number | null;
          sector: string | null;
          update_at: string;
          user_owner_id: string;
        };
        Insert: {
          category?: string | null;
          company_name?: string;
          create_at?: string;
          description?: string | null;
          employee_count?: number | null;
          id?: number;
          net_earnings?: number | null;
          sector?: string | null;
          update_at?: string;
          user_owner_id: string;
        };
        Update: {
          category?: string | null;
          company_name?: string;
          create_at?: string;
          description?: string | null;
          employee_count?: number | null;
          id?: number;
          net_earnings?: number | null;
          sector?: string | null;
          update_at?: string;
          user_owner_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "businesses_user_owner_id_fkey";
            columns: ["user_owner_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      diagnostic_distributions: {
        Row: {
          color: string;
          diagnostic_id: string;
          id: string;
          name: string;
          value: number;
        };
        Insert: {
          color: string;
          diagnostic_id: string;
          id?: string;
          name: string;
          value: number;
        };
        Update: {
          color?: string;
          diagnostic_id?: string;
          id?: string;
          name?: string;
          value?: number;
        };
        Relationships: [
          {
            foreignKeyName: "diagnostic_distributions_diagnostic_id_fkey";
            columns: ["diagnostic_id"];
            isOneToOne: false;
            referencedRelation: "diagnostics";
            referencedColumns: ["id"];
          },
        ];
      };
      diagnostic_pillar_data: {
        Row: {
          a_value: number;
          full_mark: number;
          id: string;
          pillar_id: string;
          subject: string;
        };
        Insert: {
          a_value: number;
          full_mark: number;
          id?: string;
          pillar_id: string;
          subject: string;
        };
        Update: {
          a_value?: number;
          full_mark?: number;
          id?: string;
          pillar_id?: string;
          subject?: string;
        };
        Relationships: [
          {
            foreignKeyName: "diagnostic_pillar_data_pillar_id_fkey";
            columns: ["pillar_id"];
            isOneToOne: false;
            referencedRelation: "diagnostic_pillars";
            referencedColumns: ["id"];
          },
        ];
      };
      diagnostic_pillars: {
        Row: {
          description: string;
          diagnostic_id: string;
          id: string;
          title: string;
        };
        Insert: {
          description: string;
          diagnostic_id: string;
          id?: string;
          title: string;
        };
        Update: {
          description?: string;
          diagnostic_id?: string;
          id?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "diagnostic_pillars_diagnostic_id_fkey";
            columns: ["diagnostic_id"];
            isOneToOne: false;
            referencedRelation: "diagnostics";
            referencedColumns: ["id"];
          },
        ];
      };
      diagnostic_recommendations: {
        Row: {
          category: string;
          diagnostic_id: string;
          id: string;
          priority: string;
          text: string;
        };
        Insert: {
          category: string;
          diagnostic_id: string;
          id?: string;
          priority: string;
          text: string;
        };
        Update: {
          category?: string;
          diagnostic_id?: string;
          id?: string;
          priority?: string;
          text?: string;
        };
        Relationships: [
          {
            foreignKeyName: "diagnostic_recommendations_diagnostic_id_fkey";
            columns: ["diagnostic_id"];
            isOneToOne: false;
            referencedRelation: "diagnostics";
            referencedColumns: ["id"];
          },
        ];
      };
      diagnostics: {
        Row: {
          business_id: number;
          conclusions_markdown: string;
          created_at: string;
          id: string;
          overall_score: number;
          score_description: string;
          score_label: string;
          updated_at: string;
        };
        Insert: {
          business_id: number;
          conclusions_markdown: string;
          created_at?: string;
          id?: string;
          overall_score: number;
          score_description: string;
          score_label: string;
          updated_at?: string;
        };
        Update: {
          business_id?: number;
          conclusions_markdown?: string;
          created_at?: string;
          id?: string;
          overall_score?: number;
          score_description?: string;
          score_label?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "diagnostics_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          },
        ];
      };
      question_options: {
        Row: {
          created_at: string;
          id: string;
          option_label: string | null;
          option_order: number | null;
          option_text: string;
          question_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          option_label?: string | null;
          option_order?: number | null;
          option_text: string;
          question_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          option_label?: string | null;
          option_order?: number | null;
          option_text?: string;
          question_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
        ];
      };
      questions: {
        Row: {
          ai_generated: boolean | null;
          business_id: number | null;
          created_at: string;
          description: string | null;
          id: string;
          is_global: boolean | null;
          question_text: string;
          question_type: Database["public_web"]["Enums"]["question_type_enum"];
          required: boolean | null;
          updated_at: string;
        };
        Insert: {
          ai_generated?: boolean | null;
          business_id?: number | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_global?: boolean | null;
          question_text: string;
          question_type: Database["public_web"]["Enums"]["question_type_enum"];
          required?: boolean | null;
          updated_at?: string;
        };
        Update: {
          ai_generated?: boolean | null;
          business_id?: number | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_global?: boolean | null;
          question_text?: string;
          question_type?: Database["public_web"]["Enums"]["question_type_enum"];
          required?: boolean | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "questions_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          },
        ];
      };
      responses: {
        Row: {
          business_id: number;
          created_at: string;
          id: string;
          question_id: string;
          response_text: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          business_id: number;
          created_at?: string;
          id?: string;
          question_id: string;
          response_text: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          business_id?: number;
          created_at?: string;
          id?: string;
          question_id?: string;
          response_text?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "responses_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "responses_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "responses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      roadmap_edges: {
        Row: {
          animated: boolean | null;
          id: string;
          roadmap_id: string;
          source: string;
          target: string;
        };
        Insert: {
          animated?: boolean | null;
          id: string;
          roadmap_id: string;
          source: string;
          target: string;
        };
        Update: {
          animated?: boolean | null;
          id?: string;
          roadmap_id?: string;
          source?: string;
          target?: string;
        };
        Relationships: [
          {
            foreignKeyName: "roadmap_edges_roadmap_id_fkey";
            columns: ["roadmap_id"];
            isOneToOne: false;
            referencedRelation: "roadmaps";
            referencedColumns: ["id"];
          },
        ];
      };
      roadmap_nodes: {
        Row: {
          actions: Json | null;
          description: string | null;
          id: string;
          is_done: boolean | null;
          kpis: Json | null;
          label: string;
          next_steps: Json | null;
          node_type: string;
          objectives: Json | null;
          owner: string | null;
          position_x: number;
          position_y: number;
          roadmap_id: string;
          short_description: string;
          subtasks: Json | null;
          timeline: string | null;
          tools: Json | null;
          type: string;
        };
        Insert: {
          actions?: Json | null;
          description?: string | null;
          id: string;
          is_done?: boolean | null;
          kpis?: Json | null;
          label: string;
          next_steps?: Json | null;
          node_type: string;
          objectives?: Json | null;
          owner?: string | null;
          position_x: number;
          position_y: number;
          roadmap_id: string;
          short_description: string;
          subtasks?: Json | null;
          timeline?: string | null;
          tools?: Json | null;
          type: string;
        };
        Update: {
          actions?: Json | null;
          description?: string | null;
          id?: string;
          is_done?: boolean | null;
          kpis?: Json | null;
          label?: string;
          next_steps?: Json | null;
          node_type?: string;
          objectives?: Json | null;
          owner?: string | null;
          position_x?: number;
          position_y?: number;
          roadmap_id?: string;
          short_description?: string;
          subtasks?: Json | null;
          timeline?: string | null;
          tools?: Json | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "roadmap_nodes_roadmap_id_fkey";
            columns: ["roadmap_id"];
            isOneToOne: false;
            referencedRelation: "roadmaps";
            referencedColumns: ["id"];
          },
        ];
      };
      roadmaps: {
        Row: {
          business_id: number;
          created_at: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          business_id: number;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Update: {
          business_id?: number;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "roadmaps_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          create_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
          update_at: string;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          create_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
          update_at?: string;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          create_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          update_at?: string;
          user_name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      question_type_enum: "single" | "multiple" | "open";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
  public_web: {
    Enums: {
      question_type_enum: ["single", "multiple", "open"],
    },
  },
} as const;
