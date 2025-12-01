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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      annotation_tag_entity: {
        Row: {
          createdAt: string
          id: string
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      auth_identity: {
        Row: {
          createdAt: string
          providerId: string
          providerType: string
          updatedAt: string
          userId: string | null
        }
        Insert: {
          createdAt?: string
          providerId: string
          providerType: string
          updatedAt?: string
          userId?: string | null
        }
        Update: {
          createdAt?: string
          providerId?: string
          providerType?: string
          updatedAt?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_identity_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_provider_sync_history: {
        Row: {
          created: number
          disabled: number
          endedAt: string
          error: string | null
          id: number
          providerType: string
          runMode: string
          scanned: number
          startedAt: string
          status: string
          updated: number
        }
        Insert: {
          created: number
          disabled: number
          endedAt?: string
          error?: string | null
          id?: number
          providerType: string
          runMode: string
          scanned: number
          startedAt?: string
          status: string
          updated: number
        }
        Update: {
          created?: number
          disabled?: number
          endedAt?: string
          error?: string | null
          id?: number
          providerType?: string
          runMode?: string
          scanned?: number
          startedAt?: string
          status?: string
          updated?: number
        }
        Relationships: []
      }
      chat_hub_agents: {
        Row: {
          createdAt: string
          credentialId: string | null
          description: string | null
          id: string
          model: string
          name: string
          ownerId: string
          provider: string
          systemPrompt: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          credentialId?: string | null
          description?: string | null
          id: string
          model: string
          name: string
          ownerId: string
          provider: string
          systemPrompt: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          credentialId?: string | null
          description?: string | null
          id?: string
          model?: string
          name?: string
          ownerId?: string
          provider?: string
          systemPrompt?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_441ba2caba11e077ce3fbfa2cd8"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_9c61ad497dcbae499c96a6a78ba"
            columns: ["credentialId"]
            isOneToOne: false
            referencedRelation: "credentials_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_hub_messages: {
        Row: {
          agentId: string | null
          content: string
          createdAt: string
          executionId: number | null
          id: string
          model: string | null
          name: string
          previousMessageId: string | null
          provider: string | null
          retryOfMessageId: string | null
          revisionOfMessageId: string | null
          sessionId: string
          status: string
          type: string
          updatedAt: string
          workflowId: string | null
        }
        Insert: {
          agentId?: string | null
          content: string
          createdAt?: string
          executionId?: number | null
          id: string
          model?: string | null
          name: string
          previousMessageId?: string | null
          provider?: string | null
          retryOfMessageId?: string | null
          revisionOfMessageId?: string | null
          sessionId: string
          status?: string
          type: string
          updatedAt?: string
          workflowId?: string | null
        }
        Update: {
          agentId?: string | null
          content?: string
          createdAt?: string
          executionId?: number | null
          id?: string
          model?: string | null
          name?: string
          previousMessageId?: string | null
          provider?: string | null
          retryOfMessageId?: string | null
          revisionOfMessageId?: string | null
          sessionId?: string
          status?: string
          type?: string
          updatedAt?: string
          workflowId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "FK_1f4998c8a7dec9e00a9ab15550e"
            columns: ["revisionOfMessageId"]
            isOneToOne: false
            referencedRelation: "chat_hub_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_25c9736e7f769f3a005eef4b372"
            columns: ["retryOfMessageId"]
            isOneToOne: false
            referencedRelation: "chat_hub_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_6afb260449dd7a9b85355d4e0c9"
            columns: ["executionId"]
            isOneToOne: false
            referencedRelation: "execution_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_acf8926098f063cdbbad8497fd1"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_e22538eb50a71a17954cd7e076c"
            columns: ["sessionId"]
            isOneToOne: false
            referencedRelation: "chat_hub_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_e5d1fa722c5a8d38ac204746662"
            columns: ["previousMessageId"]
            isOneToOne: false
            referencedRelation: "chat_hub_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_hub_sessions: {
        Row: {
          agentId: string | null
          agentName: string | null
          createdAt: string
          credentialId: string | null
          id: string
          lastMessageAt: string | null
          model: string | null
          ownerId: string
          provider: string | null
          title: string
          updatedAt: string
          workflowId: string | null
        }
        Insert: {
          agentId?: string | null
          agentName?: string | null
          createdAt?: string
          credentialId?: string | null
          id: string
          lastMessageAt?: string | null
          model?: string | null
          ownerId: string
          provider?: string | null
          title: string
          updatedAt?: string
          workflowId?: string | null
        }
        Update: {
          agentId?: string | null
          agentName?: string | null
          createdAt?: string
          credentialId?: string | null
          id?: string
          lastMessageAt?: string | null
          model?: string | null
          ownerId?: string
          provider?: string | null
          title?: string
          updatedAt?: string
          workflowId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "FK_7bc13b4c7e6afbfaf9be326c189"
            columns: ["credentialId"]
            isOneToOne: false
            referencedRelation: "credentials_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_9f9293d9f552496c40e0d1a8f80"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_e9ecf8ede7d989fcd18790fe36a"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      credentials_entity: {
        Row: {
          createdAt: string
          data: string
          id: string
          isManaged: boolean
          name: string
          type: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          data: string
          id: string
          isManaged?: boolean
          name: string
          type: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          data?: string
          id?: string
          isManaged?: boolean
          name?: string
          type?: string
          updatedAt?: string
        }
        Relationships: []
      }
      data_table: {
        Row: {
          createdAt: string
          id: string
          name: string
          projectId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          projectId: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          projectId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_c2a794257dee48af7c9abf681de"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      data_table_column: {
        Row: {
          createdAt: string
          dataTableId: string
          id: string
          index: number
          name: string
          type: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          dataTableId: string
          id: string
          index: number
          name: string
          type: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          dataTableId?: string
          id?: string
          index?: number
          name?: string
          type?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_930b6e8faaf88294cef23484160"
            columns: ["dataTableId"]
            isOneToOne: false
            referencedRelation: "data_table"
            referencedColumns: ["id"]
          },
        ]
      }
      event_destinations: {
        Row: {
          createdAt: string
          destination: Json
          id: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          destination: Json
          id: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          destination?: Json
          id?: string
          updatedAt?: string
        }
        Relationships: []
      }
      execution_annotation_tags: {
        Row: {
          annotationId: number
          tagId: string
        }
        Insert: {
          annotationId: number
          tagId: string
        }
        Update: {
          annotationId?: number
          tagId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_a3697779b366e131b2bbdae2976"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "annotation_tag_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_c1519757391996eb06064f0e7c8"
            columns: ["annotationId"]
            isOneToOne: false
            referencedRelation: "execution_annotations"
            referencedColumns: ["id"]
          },
        ]
      }
      execution_annotations: {
        Row: {
          createdAt: string
          executionId: number
          id: number
          note: string | null
          updatedAt: string
          vote: string | null
        }
        Insert: {
          createdAt?: string
          executionId: number
          id?: number
          note?: string | null
          updatedAt?: string
          vote?: string | null
        }
        Update: {
          createdAt?: string
          executionId?: number
          id?: number
          note?: string | null
          updatedAt?: string
          vote?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "FK_97f863fa83c4786f19565084960"
            columns: ["executionId"]
            isOneToOne: false
            referencedRelation: "execution_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      execution_data: {
        Row: {
          data: string
          executionId: number
          workflowData: Json
        }
        Insert: {
          data: string
          executionId: number
          workflowData: Json
        }
        Update: {
          data?: string
          executionId?: number
          workflowData?: Json
        }
        Relationships: [
          {
            foreignKeyName: "execution_data_fk"
            columns: ["executionId"]
            isOneToOne: true
            referencedRelation: "execution_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      execution_entity: {
        Row: {
          createdAt: string
          deletedAt: string | null
          finished: boolean
          id: number
          mode: string
          retryOf: string | null
          retrySuccessId: string | null
          startedAt: string | null
          status: string
          stoppedAt: string | null
          waitTill: string | null
          workflowId: string
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          finished: boolean
          id?: number
          mode: string
          retryOf?: string | null
          retrySuccessId?: string | null
          startedAt?: string | null
          status: string
          stoppedAt?: string | null
          waitTill?: string | null
          workflowId: string
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          finished?: boolean
          id?: number
          mode?: string
          retryOf?: string | null
          retrySuccessId?: string | null
          startedAt?: string | null
          status?: string
          stoppedAt?: string | null
          waitTill?: string | null
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_execution_entity_workflow_id"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      execution_metadata: {
        Row: {
          executionId: number
          id: number
          key: string
          value: string
        }
        Insert: {
          executionId: number
          id?: number
          key: string
          value: string
        }
        Update: {
          executionId?: number
          id?: number
          key?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_31d0b4c93fb85ced26f6005cda3"
            columns: ["executionId"]
            isOneToOne: false
            referencedRelation: "execution_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      folder: {
        Row: {
          createdAt: string
          id: string
          name: string
          parentFolderId: string | null
          projectId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          parentFolderId?: string | null
          projectId: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          parentFolderId?: string | null
          projectId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_804ea52f6729e3940498bd54d78"
            columns: ["parentFolderId"]
            isOneToOne: false
            referencedRelation: "folder"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_a8260b0b36939c6247f385b8221"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      folder_tag: {
        Row: {
          folderId: string
          tagId: string
        }
        Insert: {
          folderId: string
          tagId: string
        }
        Update: {
          folderId?: string
          tagId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_94a60854e06f2897b2e0d39edba"
            columns: ["folderId"]
            isOneToOne: false
            referencedRelation: "folder"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_dc88164176283de80af47621746"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "tag_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      insights_by_period: {
        Row: {
          id: number
          metaId: number
          periodStart: string | null
          periodUnit: number
          type: number
          value: number
        }
        Insert: {
          id?: number
          metaId: number
          periodStart?: string | null
          periodUnit: number
          type: number
          value: number
        }
        Update: {
          id?: number
          metaId?: number
          periodStart?: string | null
          periodUnit?: number
          type?: number
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_6414cfed98daabbfdd61a1cfbc0"
            columns: ["metaId"]
            isOneToOne: false
            referencedRelation: "insights_metadata"
            referencedColumns: ["metaId"]
          },
        ]
      }
      insights_metadata: {
        Row: {
          metaId: number
          projectId: string | null
          projectName: string
          workflowId: string | null
          workflowName: string
        }
        Insert: {
          metaId?: number
          projectId?: string | null
          projectName: string
          workflowId?: string | null
          workflowName: string
        }
        Update: {
          metaId?: number
          projectId?: string | null
          projectName?: string
          workflowId?: string | null
          workflowName?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_1d8ab99d5861c9388d2dc1cf733"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_2375a1eda085adb16b24615b69c"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      insights_raw: {
        Row: {
          id: number
          metaId: number
          timestamp: string
          type: number
          value: number
        }
        Insert: {
          id?: number
          metaId: number
          timestamp?: string
          type: number
          value: number
        }
        Update: {
          id?: number
          metaId?: number
          timestamp?: string
          type?: number
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_6e2e33741adef2a7c5d66befa4e"
            columns: ["metaId"]
            isOneToOne: false
            referencedRelation: "insights_metadata"
            referencedColumns: ["metaId"]
          },
        ]
      }
      installed_nodes: {
        Row: {
          latestVersion: number
          name: string
          package: string
          type: string
        }
        Insert: {
          latestVersion?: number
          name: string
          package: string
          type: string
        }
        Update: {
          latestVersion?: number
          name?: string
          package?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_73f857fc5dce682cef8a99c11dbddbc969618951"
            columns: ["package"]
            isOneToOne: false
            referencedRelation: "installed_packages"
            referencedColumns: ["packageName"]
          },
        ]
      }
      installed_packages: {
        Row: {
          authorEmail: string | null
          authorName: string | null
          createdAt: string
          installedVersion: string
          packageName: string
          updatedAt: string
        }
        Insert: {
          authorEmail?: string | null
          authorName?: string | null
          createdAt?: string
          installedVersion: string
          packageName: string
          updatedAt?: string
        }
        Update: {
          authorEmail?: string | null
          authorName?: string | null
          createdAt?: string
          installedVersion?: string
          packageName?: string
          updatedAt?: string
        }
        Relationships: []
      }
      invalid_auth_token: {
        Row: {
          expiresAt: string
          token: string
        }
        Insert: {
          expiresAt: string
          token: string
        }
        Update: {
          expiresAt?: string
          token?: string
        }
        Relationships: []
      }
      mensaje: {
        Row: {
          created_at: string
          id: number
          id_usuario: string | null
          mensaje: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          id_usuario?: string | null
          mensaje?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          id_usuario?: string | null
          mensaje?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          id: number
          name: string
          timestamp: number
        }
        Insert: {
          id?: number
          name: string
          timestamp: number
        }
        Update: {
          id?: number
          name?: string
          timestamp?: number
        }
        Relationships: []
      }
      oauth_access_tokens: {
        Row: {
          clientId: string
          token: string
          userId: string
        }
        Insert: {
          clientId: string
          token: string
          userId: string
        }
        Update: {
          clientId?: string
          token?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_7234a36d8e49a1fa85095328845"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_78b26968132b7e5e45b75876481"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "oauth_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_authorization_codes: {
        Row: {
          clientId: string
          code: string
          codeChallenge: string
          codeChallengeMethod: string
          createdAt: string
          expiresAt: number
          redirectUri: string
          state: string | null
          updatedAt: string
          used: boolean
          userId: string
        }
        Insert: {
          clientId: string
          code: string
          codeChallenge: string
          codeChallengeMethod: string
          createdAt?: string
          expiresAt: number
          redirectUri: string
          state?: string | null
          updatedAt?: string
          used?: boolean
          userId: string
        }
        Update: {
          clientId?: string
          code?: string
          codeChallenge?: string
          codeChallengeMethod?: string
          createdAt?: string
          expiresAt?: number
          redirectUri?: string
          state?: string | null
          updatedAt?: string
          used?: boolean
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_64d965bd072ea24fb6da55468cd"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "oauth_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_aa8d3560484944c19bdf79ffa16"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_clients: {
        Row: {
          clientSecret: string | null
          clientSecretExpiresAt: number | null
          createdAt: string
          grantTypes: Json
          id: string
          name: string
          redirectUris: Json
          tokenEndpointAuthMethod: string
          updatedAt: string
        }
        Insert: {
          clientSecret?: string | null
          clientSecretExpiresAt?: number | null
          createdAt?: string
          grantTypes: Json
          id: string
          name: string
          redirectUris: Json
          tokenEndpointAuthMethod?: string
          updatedAt?: string
        }
        Update: {
          clientSecret?: string | null
          clientSecretExpiresAt?: number | null
          createdAt?: string
          grantTypes?: Json
          id?: string
          name?: string
          redirectUris?: Json
          tokenEndpointAuthMethod?: string
          updatedAt?: string
        }
        Relationships: []
      }
      oauth_refresh_tokens: {
        Row: {
          clientId: string
          createdAt: string
          expiresAt: number
          token: string
          updatedAt: string
          userId: string
        }
        Insert: {
          clientId: string
          createdAt?: string
          expiresAt: number
          token: string
          updatedAt?: string
          userId: string
        }
        Update: {
          clientId?: string
          createdAt?: string
          expiresAt?: number
          token?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_a699f3ed9fd0c1b19bc2608ac53"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_b388696ce4d8be7ffbe8d3e4b69"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "oauth_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_user_consents: {
        Row: {
          clientId: string
          grantedAt: number
          id: number
          userId: string
        }
        Insert: {
          clientId: string
          grantedAt: number
          id?: number
          userId: string
        }
        Update: {
          clientId?: string
          grantedAt?: number
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_21e6c3c2d78a097478fae6aaefa"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_a651acea2f6c97f8c4514935486"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "oauth_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_data: {
        Row: {
          context: string
          createdAt: string
          updatedAt: string
          value: string
          workflowId: string
        }
        Insert: {
          context: string
          createdAt?: string
          updatedAt?: string
          value: string
          workflowId: string
        }
        Update: {
          context?: string
          createdAt?: string
          updatedAt?: string
          value?: string
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_06a69a7032c97a763c2c7599464"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          createdAt: string
          description: string | null
          icon: Json | null
          id: string
          name: string
          type: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          icon?: Json | null
          id: string
          name: string
          type: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          icon?: Json | null
          id?: string
          name?: string
          type?: string
          updatedAt?: string
        }
        Relationships: []
      }
      project_relation: {
        Row: {
          createdAt: string
          projectId: string
          role: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          projectId: string
          role: string
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          projectId?: string
          role?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_5f0643f6717905a05164090dde7"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_61448d56d61802b5dfde5cdb002"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_c6b99592dc96b0d836d7a21db91"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["slug"]
          },
        ]
      }
      role: {
        Row: {
          createdAt: string
          description: string | null
          displayName: string | null
          roleType: string | null
          slug: string
          systemRole: boolean
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          displayName?: string | null
          roleType?: string | null
          slug: string
          systemRole?: boolean
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          displayName?: string | null
          roleType?: string | null
          slug?: string
          systemRole?: boolean
          updatedAt?: string
        }
        Relationships: []
      }
      role_scope: {
        Row: {
          roleSlug: string
          scopeSlug: string
        }
        Insert: {
          roleSlug: string
          scopeSlug: string
        }
        Update: {
          roleSlug?: string
          scopeSlug?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_role"
            columns: ["roleSlug"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "FK_scope"
            columns: ["scopeSlug"]
            isOneToOne: false
            referencedRelation: "scope"
            referencedColumns: ["slug"]
          },
        ]
      }
      scope: {
        Row: {
          description: string | null
          displayName: string | null
          slug: string
        }
        Insert: {
          description?: string | null
          displayName?: string | null
          slug: string
        }
        Update: {
          description?: string | null
          displayName?: string | null
          slug?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          key: string
          loadOnStartup: boolean
          value: string
        }
        Insert: {
          key: string
          loadOnStartup?: boolean
          value: string
        }
        Update: {
          key?: string
          loadOnStartup?: boolean
          value?: string
        }
        Relationships: []
      }
      shared_credentials: {
        Row: {
          createdAt: string
          credentialsId: string
          projectId: string
          role: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          credentialsId: string
          projectId: string
          role: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          credentialsId?: string
          projectId?: string
          role?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_416f66fc846c7c442970c094ccf"
            columns: ["credentialsId"]
            isOneToOne: false
            referencedRelation: "credentials_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_812c2852270da1247756e77f5a4"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_workflow: {
        Row: {
          createdAt: string
          projectId: string
          role: string
          updatedAt: string
          workflowId: string
        }
        Insert: {
          createdAt?: string
          projectId: string
          role: string
          updatedAt?: string
          workflowId: string
        }
        Update: {
          createdAt?: string
          projectId?: string
          role?: string
          updatedAt?: string
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_a45ea5f27bcfdc21af9b4188560"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_daa206a04983d47d0a9c34649ce"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_entity: {
        Row: {
          createdAt: string
          id: string
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      test_case_execution: {
        Row: {
          completedAt: string | null
          createdAt: string
          errorCode: string | null
          errorDetails: Json | null
          executionId: number | null
          id: string
          inputs: Json | null
          metrics: Json | null
          outputs: Json | null
          runAt: string | null
          status: string
          testRunId: string
          updatedAt: string
        }
        Insert: {
          completedAt?: string | null
          createdAt?: string
          errorCode?: string | null
          errorDetails?: Json | null
          executionId?: number | null
          id: string
          inputs?: Json | null
          metrics?: Json | null
          outputs?: Json | null
          runAt?: string | null
          status: string
          testRunId: string
          updatedAt?: string
        }
        Update: {
          completedAt?: string | null
          createdAt?: string
          errorCode?: string | null
          errorDetails?: Json | null
          executionId?: number | null
          id?: string
          inputs?: Json | null
          metrics?: Json | null
          outputs?: Json | null
          runAt?: string | null
          status?: string
          testRunId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_8e4b4774db42f1e6dda3452b2af"
            columns: ["testRunId"]
            isOneToOne: false
            referencedRelation: "test_run"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_e48965fac35d0f5b9e7f51d8c44"
            columns: ["executionId"]
            isOneToOne: false
            referencedRelation: "execution_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      test_run: {
        Row: {
          completedAt: string | null
          createdAt: string
          errorCode: string | null
          errorDetails: Json | null
          id: string
          metrics: Json | null
          runAt: string | null
          status: string
          updatedAt: string
          workflowId: string
        }
        Insert: {
          completedAt?: string | null
          createdAt?: string
          errorCode?: string | null
          errorDetails?: Json | null
          id: string
          metrics?: Json | null
          runAt?: string | null
          status: string
          updatedAt?: string
          workflowId: string
        }
        Update: {
          completedAt?: string | null
          createdAt?: string
          errorCode?: string | null
          errorDetails?: Json | null
          id?: string
          metrics?: Json | null
          runAt?: string | null
          status?: string
          updatedAt?: string
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_d6870d3b6e4c185d33926f423c8"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          createdAt: string
          disabled: boolean
          email: string | null
          firstName: string | null
          id: string
          lastActiveAt: string | null
          lastName: string | null
          mfaEnabled: boolean
          mfaRecoveryCodes: string | null
          mfaSecret: string | null
          password: string | null
          personalizationAnswers: Json | null
          roleSlug: string
          settings: Json | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          disabled?: boolean
          email?: string | null
          firstName?: string | null
          id?: string
          lastActiveAt?: string | null
          lastName?: string | null
          mfaEnabled?: boolean
          mfaRecoveryCodes?: string | null
          mfaSecret?: string | null
          password?: string | null
          personalizationAnswers?: Json | null
          roleSlug?: string
          settings?: Json | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          disabled?: boolean
          email?: string | null
          firstName?: string | null
          id?: string
          lastActiveAt?: string | null
          lastName?: string | null
          mfaEnabled?: boolean
          mfaRecoveryCodes?: string | null
          mfaSecret?: string | null
          password?: string | null
          personalizationAnswers?: Json | null
          roleSlug?: string
          settings?: Json | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_eaea92ee7bfb9c1b6cd01505d56"
            columns: ["roleSlug"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["slug"]
          },
        ]
      }
      user_api_keys: {
        Row: {
          apiKey: string
          audience: string
          createdAt: string
          id: string
          label: string
          scopes: Json | null
          updatedAt: string
          userId: string
        }
        Insert: {
          apiKey: string
          audience?: string
          createdAt?: string
          id: string
          label: string
          scopes?: Json | null
          updatedAt?: string
          userId: string
        }
        Update: {
          apiKey?: string
          audience?: string
          createdAt?: string
          id?: string
          label?: string
          scopes?: Json | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_e131705cbbc8fb589889b02d457"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      variables: {
        Row: {
          id: string
          key: string
          projectId: string | null
          type: string
          value: string | null
        }
        Insert: {
          id: string
          key: string
          projectId?: string | null
          type?: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          projectId?: string | null
          type?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "FK_42f6c766f9f9d2edcc15bdd6e9b"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_entity: {
        Row: {
          method: string
          node: string
          pathLength: number | null
          webhookId: string | null
          webhookPath: string
          workflowId: string
        }
        Insert: {
          method: string
          node: string
          pathLength?: number | null
          webhookId?: string | null
          webhookPath: string
          workflowId: string
        }
        Update: {
          method?: string
          node?: string
          pathLength?: number | null
          webhookId?: string | null
          webhookPath?: string
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_webhook_entity_workflow_id"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_dependency: {
        Row: {
          createdAt: string
          dependencyInfo: Json | null
          dependencyKey: string
          dependencyType: string
          id: number
          indexVersionId: number
          workflowId: string
          workflowVersionId: number
        }
        Insert: {
          createdAt?: string
          dependencyInfo?: Json | null
          dependencyKey: string
          dependencyType: string
          id?: number
          indexVersionId?: number
          workflowId: string
          workflowVersionId: number
        }
        Update: {
          createdAt?: string
          dependencyInfo?: Json | null
          dependencyKey?: string
          dependencyType?: string
          id?: number
          indexVersionId?: number
          workflowId?: string
          workflowVersionId?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_a4ff2d9b9628ea988fa9e7d0bf8"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_entity: {
        Row: {
          active: boolean
          connections: Json
          createdAt: string
          description: string | null
          id: string
          isArchived: boolean
          meta: Json | null
          name: string
          nodes: Json
          parentFolderId: string | null
          pinData: Json | null
          settings: Json | null
          staticData: Json | null
          triggerCount: number
          updatedAt: string
          versionCounter: number
          versionId: string | null
        }
        Insert: {
          active: boolean
          connections: Json
          createdAt?: string
          description?: string | null
          id: string
          isArchived?: boolean
          meta?: Json | null
          name: string
          nodes: Json
          parentFolderId?: string | null
          pinData?: Json | null
          settings?: Json | null
          staticData?: Json | null
          triggerCount?: number
          updatedAt?: string
          versionCounter?: number
          versionId?: string | null
        }
        Update: {
          active?: boolean
          connections?: Json
          createdAt?: string
          description?: string | null
          id?: string
          isArchived?: boolean
          meta?: Json | null
          name?: string
          nodes?: Json
          parentFolderId?: string | null
          pinData?: Json | null
          settings?: Json | null
          staticData?: Json | null
          triggerCount?: number
          updatedAt?: string
          versionCounter?: number
          versionId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_workflow_parent_folder"
            columns: ["parentFolderId"]
            isOneToOne: false
            referencedRelation: "folder"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_history: {
        Row: {
          authors: string
          connections: Json
          createdAt: string
          nodes: Json
          updatedAt: string
          versionId: string
          workflowId: string
        }
        Insert: {
          authors: string
          connections: Json
          createdAt?: string
          nodes: Json
          updatedAt?: string
          versionId: string
          workflowId: string
        }
        Update: {
          authors?: string
          connections?: Json
          createdAt?: string
          nodes?: Json
          updatedAt?: string
          versionId?: string
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_1e31657f5fe46816c34be7c1b4b"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_statistics: {
        Row: {
          count: number | null
          latestEvent: string | null
          name: string
          rootCount: number | null
          workflowId: string
        }
        Insert: {
          count?: number | null
          latestEvent?: string | null
          name: string
          rootCount?: number | null
          workflowId: string
        }
        Update: {
          count?: number | null
          latestEvent?: string | null
          name?: string
          rootCount?: number | null
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_workflow_statistics_workflow_id"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows_tags: {
        Row: {
          tagId: string
          workflowId: string
        }
        Insert: {
          tagId: string
          workflowId: string
        }
        Update: {
          tagId?: string
          workflowId?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_workflows_tags_tag_id"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "tag_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_workflows_tags_workflow_id"
            columns: ["workflowId"]
            isOneToOne: false
            referencedRelation: "workflow_entity"
            referencedColumns: ["id"]
          },
        ]
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
  public_web: {
    Tables: {
      businesses: {
        Row: {
          category: string | null
          company_name: string
          create_at: string
          description: string | null
          employee_count: number | null
          id: number
          net_earnings: number | null
          sector: string | null
          update_at: string
          user_owner_id: string
        }
        Insert: {
          category?: string | null
          company_name?: string
          create_at?: string
          description?: string | null
          employee_count?: number | null
          id?: number
          net_earnings?: number | null
          sector?: string | null
          update_at?: string
          user_owner_id: string
        }
        Update: {
          category?: string | null
          company_name?: string
          create_at?: string
          description?: string | null
          employee_count?: number | null
          id?: number
          net_earnings?: number | null
          sector?: string | null
          update_at?: string
          user_owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "businesses_user_owner_id_fkey"
            columns: ["user_owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      question_options: {
        Row: {
          created_at: string
          id: string
          option_label: string | null
          option_order: number | null
          option_text: string
          question_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          option_label?: string | null
          option_order?: number | null
          option_text: string
          question_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          option_label?: string | null
          option_order?: number | null
          option_text?: string
          question_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          ai_generated: boolean | null
          business_id: number
          created_at: string
          description: string | null
          id: string
          question_text: string
          question_type: Database["public_web"]["Enums"]["question_type_enum"]
          required: boolean | null
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean | null
          business_id: number
          created_at?: string
          description?: string | null
          id?: string
          question_text: string
          question_type: Database["public_web"]["Enums"]["question_type_enum"]
          required?: boolean | null
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean | null
          business_id?: number
          created_at?: string
          description?: string | null
          id?: string
          question_text?: string
          question_type?: Database["public_web"]["Enums"]["question_type_enum"]
          required?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          business_id: number
          created_at: string
          id: string
          question_id: string
          response_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          business_id: number
          created_at?: string
          id?: string
          question_id: string
          response_text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          business_id?: number
          created_at?: string
          id?: string
          question_id?: string
          response_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "responses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          create_at: string
          email: string | null
          full_name: string | null
          id: string
          update_at: string
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          create_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          update_at?: string
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          create_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          update_at?: string
          user_name?: string | null
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
      question_type_enum: "single" | "multiple" | "open"
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
    Enums: {},
  },
  public_web: {
    Enums: {
      question_type_enum: ["single", "multiple", "open"],
    },
  },
} as const
