export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			clients: {
				Row: {
					code: string;
					created_at: string | null;
					id: string;
					name: string;
					organization: string;
				};
				Insert: {
					code: string;
					created_at?: string | null;
					id?: string;
					name: string;
					organization: string;
				};
				Update: {
					code?: string;
					created_at?: string | null;
					id?: string;
					name?: string;
					organization?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'clients_organization_fkey';
						columns: ['organization'];
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					}
				];
			};
			organizations: {
				Row: {
					created_at: string | null;
					id: string;
					name: string | null;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					name?: string | null;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					name?: string | null;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					full_name: string | null;
					id: string;
					organization: string | null;
					theme: string;
					updated_at: string | null;
					username: string | null;
					website: string | null;
				};
				Insert: {
					full_name?: string | null;
					id: string;
					organization?: string | null;
					theme?: string;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Update: {
					full_name?: string | null;
					id?: string;
					organization?: string | null;
					theme?: string;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'profiles_organization_fkey';
						columns: ['organization'];
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					}
				];
			};
			projects: {
				Row: {
					client: string | null;
					code: string;
					created_at: string | null;
					id: string;
					name: string;
					organization: string;
				};
				Insert: {
					client?: string | null;
					code: string;
					created_at?: string | null;
					id?: string;
					name: string;
					organization: string;
				};
				Update: {
					client?: string | null;
					code?: string;
					created_at?: string | null;
					id?: string;
					name?: string;
					organization?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'projects_client_fkey';
						columns: ['client'];
						referencedRelation: 'clients';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'projects_organization_fkey';
						columns: ['organization'];
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					}
				];
			};
			public_tokens: {
				Row: {
					created_at: string | null;
					description: string | null;
					id: string;
					is_revoked: boolean;
					organization: string;
					project: string;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					id?: string;
					is_revoked?: boolean;
					organization: string;
					project: string;
				};
				Update: {
					created_at?: string | null;
					description?: string | null;
					id?: string;
					is_revoked?: boolean;
					organization?: string;
					project?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_tokens_organization_fkey';
						columns: ['organization'];
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_tokens_project_fkey';
						columns: ['project'];
						referencedRelation: 'projects';
						referencedColumns: ['id'];
					}
				];
			};
			revision_request_proposals: {
				Row: {
					created_at: string | null;
					description: string;
					external_email: string;
					external_full_name: string | null;
					id: string;
					project: string;
					title: string;
				};
				Insert: {
					created_at?: string | null;
					description: string;
					external_email: string;
					external_full_name?: string | null;
					id?: string;
					project: string;
					title: string;
				};
				Update: {
					created_at?: string | null;
					description?: string;
					external_email?: string;
					external_full_name?: string | null;
					id?: string;
					project?: string;
					title?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'revision_request_proposals_project_fkey';
						columns: ['project'];
						referencedRelation: 'projects';
						referencedColumns: ['id'];
					}
				];
			};
			revisions: {
				Row: {
					code: string;
					created_at: string | null;
					id: string;
					project: string;
				};
				Insert: {
					code: string;
					created_at?: string | null;
					id?: string;
					project: string;
				};
				Update: {
					code?: string;
					created_at?: string | null;
					id?: string;
					project?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'revisions_project_fkey';
						columns: ['project'];
						referencedRelation: 'projects';
						referencedColumns: ['id'];
					}
				];
			};
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
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'buckets_owner_fkey';
						columns: ['owner'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey';
						columns: ['bucket_id'];
						referencedRelation: 'buckets';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'objects_owner_fkey';
						columns: ['owner'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: unknown;
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
