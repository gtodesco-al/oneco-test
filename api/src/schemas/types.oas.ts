// AUTO GENERATED - do not modify
export const definitions = {
  responseContact: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['Contact'],
        description: 'Resource Type',
        example: 'Contact',
        default: 'Contact',
      },
      data: {
        type: 'object',
        properties: {
          location_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'Location ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          account_number: {
            type: 'string',
            maxLength: 32,
            nullable: true,
            description: 'Contact Account Number',
            example: '54545433332',
          },
          contact_api_id: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]*$',
            maxLength: 64,
            nullable: true,
            description: 'Contact API Id',
            example: '137',
          },
          first_name: {
            type: 'string',
            maxLength: 64,
            nullable: true,
            description: 'First Name',
            example: 'John',
          },
          last_name: {
            type: 'string',
            maxLength: 64,
            description: 'Last Name',
            example: 'Smith',
          },
          cell_phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description: 'Cell phone of contact',
            example: '3339998822',
          },
          balance: {
            type: 'number',
            format: 'double',
            minimum: -99999999.99,
            maximum: 99999999.99,
            nullable: true,
            description: 'Balance',
            example: 245.36,
          },
          address: {
            type: 'object',
            properties: {
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description: 'City of contact',
                example: 'Novi',
              },
              state: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description: 'State of contact',
                example: 'Michigan',
              },
              postal_code: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description: 'Postal code of contact',
                example: '48375',
              },
              country: {
                type: 'string',
                enum: ['US', 'CA'],
                nullable: true,
                description: 'Country of contact',
                example: 'US',
              },
              street: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description: 'Street of contact',
                example: '43155 Main Street STE 2310-C',
              },
            },
            description: 'Address of contact',
          },
          company_name: {
            type: 'string',
            maxLength: 64,
            nullable: true,
            description: 'Company Name',
            example: 'Fortis Payment Systems, LLC',
          },
          header_message: {
            type: 'string',
            maxLength: 250,
            nullable: true,
            description: 'Header Message',
            example: 'This is a sample message for you',
          },
          date_of_birth: {
            type: 'string',
            pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
            maxLength: 10,
            nullable: true,
            description: 'Contacts DOB, Format: yyyy-MM-dd',
            example: '2021-12-01',
          },
          email_trx_receipt: {
            type: 'boolean',
            description:
              'Whether or not to email all transactions receipts to contact (1 or 0)',
            example: true,
          },
          home_phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description: 'Contacts home phone',
            example: '3339998822',
          },
          office_phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description: 'Contacts office phone',
            example: '3339998822',
          },
          office_phone_ext: {
            type: 'string',
            pattern: '^\\d{1,10}$',
            maxLength: 10,
            nullable: true,
            description: 'Contacts office phone extension for office phone',
            example: '5',
          },
          header_message_type: {
            type: 'integer',
            minimum: 0,
            maximum: 4,
            description: 'Header Message Type',
            example: 0,
          },
          update_if_exists: {
            type: 'number',
            format: 'float',
            enum: [1],
            nullable: true,
            description: 'Update If Exists',
            example: 1,
          },
          contact_c1: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description: 'Custom field 1 for api users to store custom data',
            example: 'any',
          },
          contact_c2: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description: 'Custom field 2 for api users to store custom data',
            example: 'anything',
          },
          contact_c3: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description: 'Custom field 3 for api users to store custom data',
            example: 'something',
          },
          parent_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description: 'Parent Id',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          email: {
            type: 'string',
            format: 'email',
            maxLength: 64,
            nullable: true,
            description: 'Email of contact',
            example: 'email@domain.com',
          },
          id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'Contact ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          created_ts: {
            type: 'integer',
            description: 'Created Time Stamp',
            example: 1422040992,
          },
          modified_ts: {
            type: 'integer',
            description: 'Modified Time Stamp',
            example: 1422040992,
          },
          active: {
            type: 'boolean',
            description: 'Active',
            example: true,
          },
          received_emails: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                subject: {
                  type: 'string',
                  maxLength: 256,
                  description: 'Subject',
                  example: 'Payment Receipt - 12skiestech',
                },
                body: {
                  type: 'string',
                  description: 'Body',
                  example: 'This email is being sent from a server.',
                },
                source_address: {
                  type: 'string',
                  maxLength: 64,
                  description: 'Source Address',
                  example: '"12skiestech A7t3qi" <noreply@zeamster.email>',
                },
                return_path: {
                  type: 'string',
                  maxLength: 64,
                  description: 'Return Path',
                  example: '"12skiestech A7t3qi" <noreply@zeamster.email>',
                },
                provider_id: {
                  type: 'string',
                  maxLength: 60,
                  nullable: true,
                  description: 'Provider',
                  example:
                    '0100017e67bcc530-e1dd23b4-8a39-4a5b-8d5d-68d51c4c942f-000000',
                },
                domain_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Domain',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                reason_sent: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Reason Sent',
                  example: 'Contact Email',
                },
                reason_model: {
                  type: 'string',
                  maxLength: 64,
                  enum: [
                    'Contact',
                    'Transaction',
                    'Recurring',
                    'User',
                    'ProductTransaction',
                    'TransactionBatch',
                    'QuickInvoice',
                    'DataExport',
                    'UserReportSchedule',
                    'UserReport',
                    'Paylink',
                  ],
                  nullable: true,
                  description: 'Reason Model',
                  example: 'Transaction',
                },
                reason_model_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Reason Model',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                reply_to: {
                  type: 'string',
                  maxLength: 520,
                  nullable: true,
                  description: 'Reply To',
                  example: '"Zeamster" <emma.p@zeamster.com>',
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Log Email Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
              },
              required: [
                'subject',
                'body',
                'source_address',
                'return_path',
                'id',
                'created_ts',
              ],
            },
            description: 'Received Email Information on `expand`',
          },
          is_deletable: {
            type: 'boolean',
            description: 'Is Deletable Information on `expand`',
            example: true,
          },
          location: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              account_number: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-_]+$',
                maxLength: 32,
                nullable: true,
                description: 'Account number',
                example: '5454545454545454',
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City name',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 2,
                    nullable: true,
                    description: 'State name',
                    example: 'MI',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street',
                    example: '43155 Main Street STE 2310-C',
                  },
                  street2: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street 2',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address',
              },
              branding_domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'GUID for Branding Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_email_trx_receipt_default: {
                type: 'boolean',
                description:
                  'If true, will email contact receipt for any transaction',
                example: true,
              },
              default_ach: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description:
                  "GUID for Location's default ACH Product Transaction",
                example: '11e608a7d515f1e093242bb2',
              },
              default_cc: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description:
                  "GUID for Location's default CC Product Transaction",
                example: '11e608a442a5f1e092242dda',
              },
              developer_company_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'GUID for Developer Company',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email_reply_to: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description:
                  'Used as from email address when sending various notifications',
                example: 'email@domain.com',
              },
              fax: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Fax number',
                example: '3339998822',
              },
              location_api_id: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Location api ID',
                example: 'location-111111',
              },
              location_api_key: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Location api key',
                example: 'AE34BBCAADF4AE34BBCAADF4',
              },
              location_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom 1',
              },
              location_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom 2',
              },
              location_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom data 3',
              },
              name: {
                type: 'string',
                maxLength: 64,
                minLength: 1,
                description: 'Name of the company',
                example: 'Sample Company Headquarters',
              },
              office_phone: {
                type: 'string',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office phone number',
                example: '2481234567',
              },
              office_ext_phone: {
                type: 'string',
                maxLength: 10,
                nullable: true,
                description: 'Office phone extension number',
                example: '1021021209',
              },
              recurring_notification_days_default: {
                type: 'integer',
                minimum: 0,
                maximum: 365,
                nullable: true,
                description:
                  'Number of days prior to a Recurring running that a notification should be sent',
                example: 0,
              },
              tz: {
                type: 'string',
                maxLength: 30,
                nullable: true,
                description: 'Time zone',
                example: 'America/New_York',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location GUID of the parent location',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              ticket_hash_key: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Ticket Hash Key',
                example: 'A5F443CADF4AE34BBCAADF4',
              },
            },
            required: ['id', 'created_ts', 'modified_ts', 'name', 'parent_id'],
            description: 'Location Information on `expand`',
          },
          user: {
            type: 'object',
            properties: {
              account_number: {
                type: 'string',
                nullable: true,
                description: 'Account Number',
                example: '5454545454545454',
              },
              address: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description: 'Address',
                example: '43155 Main Street STE 2310-C',
              },
              branding_domain_url: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Branding Domain Url',
                example: '{branding_domain_url}',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell Phone',
                example: '3339998822',
              },
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description: 'City',
                example: 'Novi',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              contact_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Contact',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Date Of Birth',
                example: '2021-12-01',
              },
              domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 128,
                description: 'Email',
                example: 'email@domain.com',
              },
              email_trx_receipt: {
                type: 'boolean',
                description: 'Email Trx Receipt',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Home Phone',
                example: '3339998822',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              locale: {
                type: 'string',
                maxLength: 8,
                nullable: true,
                description: 'Locale',
                example: 'en-US',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office Phone',
                example: '3339998822',
              },
              office_ext_phone: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Office Ext Phone',
                example: '5',
              },
              primary_location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Primary Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              requires_new_password: {
                type: 'string',
                maxLength: 1,
                nullable: true,
                description: 'Requires New Password',
                example: null,
              },
              state: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description: 'State',
                example: 'Michigan',
              },
              terms_condition_code: {
                type: 'string',
                nullable: true,
                description:
                  'Terms Condition (This field is required when updating your own password).',
                example: '20220308',
              },
              tz: {
                type: 'string',
                maxLength: 30,
                description: 'Time zone',
                example: 'America/New_York',
              },
              ui_prefs: {
                type: 'object',
                properties: {
                  entry_page: {
                    type: 'string',
                    nullable: true,
                    description: 'Ui Prefs Entry Page',
                    example: 'dashboard',
                  },
                  page_size: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 99,
                    nullable: true,
                    description: 'Ui Prefs Page Size',
                    example: 2,
                  },
                  report_export_type: {
                    type: 'string',
                    enum: ['csv', 'tsv', 'xls', 'xlsx'],
                    nullable: true,
                    description: 'Ui Prefs Export Type',
                    example: 'csv',
                  },
                  process_method: {
                    type: 'string',
                    enum: ['virtual_terminal', 'physical_terminal'],
                    nullable: true,
                    description: 'Ui Prefs Process Method',
                    example: 'virtual_terminal',
                  },
                  default_terminal: {
                    type: 'string',
                    pattern:
                      '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                    nullable: true,
                    description: 'Ui Prefs Default Termianl',
                    example: '11e95f8ec39de8fbdb0a4f1a',
                  },
                },
                description: 'Ui Prefs',
              },
              username: {
                type: 'string',
                minLength: 2,
                maxLength: 64,
                description: 'Username',
                example: '{user_name}',
              },
              user_api_key: {
                type: 'string',
                minLength: 16,
                maxLength: 64,
                nullable: true,
                description: 'User Api Key',
                example: '234bas8dfn8238f923w2',
              },
              user_hash_key: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description: 'User Hash Key',
                example: null,
              },
              user_type_code: {
                type: 'integer',
                enum: [200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 100],
                description: 'User Type',
                example: 100,
              },
              password: {
                type: 'string',
                pattern:
                  '^(?=.*[`!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>/?~])(?=.*[0-9])(?=.*[a-zA-Z]).*$',
                minLength: 8,
                maxLength: 128,
                nullable: true,
                description: 'Password',
                example: null,
              },
              zip: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description: 'Zip',
                example: '48375',
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_api_id: {
                type: 'string',
                nullable: true,
                description: 'ContactApi Id',
                example: null,
              },
              primary_location_api_id: {
                type: 'string',
                nullable: true,
                description: 'Primary LocationApi ID',
                example: null,
              },
              status_id: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'User ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              status: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              login_attempts: {
                type: 'number',
                format: 'float',
                description: 'Login Attempts',
                example: 0,
              },
              last_login_ts: {
                type: 'integer',
                description: 'Last Login',
                example: 1422040992,
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Created User',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terms_accepted_ts: {
                type: 'integer',
                nullable: true,
                description: 'Terms Accepted',
                example: 1422040992,
              },
              terms_agree_ip: {
                type: 'string',
                maxLength: 16,
                nullable: true,
                description: 'Terms Agree Ip',
                example: '192.168.0.10',
              },
              current_date_time: {
                type: 'string',
                maxLength: 24,
                description: 'Current Date Time',
                example: '2019-03-11T10:38:26-0700',
              },
            },
            required: [
              'email',
              'last_name',
              'primary_location_id',
              'tz',
              'username',
              'user_type_code',
              'id',
              'status',
              'login_attempts',
              'last_login_ts',
              'created_ts',
              'modified_ts',
              'created_user_id',
              'current_date_time',
            ],
            description: 'User Information on `expand`',
          },
          recurrings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                account_vault_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Token ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                active: {
                  type: 'boolean',
                  description: 'Active',
                  example: true,
                },
                description: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Description',
                  example: 'Description',
                },
                end_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  nullable: true,
                  description: 'End date',
                  example: '2021-12-01',
                },
                installment_total_count: {
                  type: 'integer',
                  minimum: 1,
                  maximum: 999,
                  nullable: true,
                  description: 'Installment Total Count',
                  example: 20,
                },
                interval: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 365,
                  description: 'Interval',
                  example: 1,
                },
                interval_type: {
                  type: 'string',
                  enum: ['d', 'w', 'm'],
                  description: 'Interval Type',
                  example: 'd',
                },
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                notification_days: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 365,
                  nullable: true,
                  description: 'Notification Days',
                  example: 2,
                },
                payment_method: {
                  type: 'string',
                  enum: ['cc', 'ach'],
                  description: 'Payment Method',
                  example: 'cc',
                },
                product_transaction_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Product Transaction ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                recurring_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Recurring ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                recurring_api_id: {
                  type: 'string',
                  maxLength: 64,
                  nullable: true,
                  description: 'Recurring Api ID',
                  example: 'recurring1234abcd',
                },
                start_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  description: 'Start date',
                  example: '2021-12-01',
                },
                status: {
                  type: 'string',
                  enum: ['active', 'on hold', 'ended'],
                  description: 'Status',
                  example: 'active',
                },
                transaction_amount: {
                  type: 'number',
                  format: 'double',
                  description: 'Transaction amount',
                  example: 3,
                },
                terms_agree: {
                  type: 'boolean',
                  description: 'Terms Agree',
                  example: true,
                },
                terms_agree_ip: {
                  type: 'string',
                  nullable: true,
                  description: 'Terms Agree Ip',
                  example: '192.168.0.10',
                },
                recurring_c1: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description: 'Custom field used for integrations',
                  example: 'recurring custom data 1',
                },
                recurring_c2: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description: 'Custom field used for integrations',
                  example: 'recurring custom data 2',
                },
                recurring_c3: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description: 'Custom field used for integrations',
                  example: 'recurring custom data 3',
                },
                send_to_proc_as_recur: {
                  type: 'boolean',
                  description: 'Send To Proc As Recur',
                  example: true,
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Recurring ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                next_run_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  description: 'Next Run Date',
                  example: '2021-12-01',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                recurring_type_id: {
                  type: 'string',
                  enum: ['o', 'i'],
                  description: 'Recurring Type',
                  example: 'i',
                },
              },
              required: [
                'account_vault_id',
                'active',
                'interval',
                'interval_type',
                'location_id',
                'payment_method',
                'start_date',
                'status',
                'transaction_amount',
                'id',
                'next_run_date',
                'created_ts',
                'modified_ts',
                'recurring_type_id',
              ],
            },
            description: 'Recurring Information on `expand`',
          },
          email_blacklist: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Blacklist ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              isBlacklisted: {
                type: 'boolean',
                description: 'isBlacklisted',
                example: true,
              },
              detail: {
                type: 'boolean',
                description: 'Contact Id',
                example: true,
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
            },
            description: 'Email Blacklist Information on `expand`',
          },
          sms_blacklist: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Blacklist ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              isBlacklisted: {
                type: 'boolean',
                description: 'isBlacklisted',
                example: true,
              },
              detail: {
                type: 'boolean',
                description: 'Contact Id',
                example: true,
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
            },
            description: 'Sms Blacklist Information on `expand`',
          },
          changelogs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Change Log ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                action: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Action',
                  example: 'CREATE',
                },
                model: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Model',
                  example: 'TransactionRequest',
                },
                model_id: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Model ID',
                  example: '11ec829598f0d4008be9aba4',
                },
                user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                changelog_details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        pattern:
                          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                        nullable: true,
                        description: 'ID',
                        example: '11e95f8ec39de8fbdb0a4f1a',
                      },
                      changelog_id: {
                        type: 'string',
                        pattern:
                          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                        nullable: true,
                        description: 'Changelog ID',
                        example: '11e95f8ec39de8fbdb0a4f1a',
                      },
                      field: {
                        type: 'string',
                        nullable: true,
                        description: 'Field',
                        example: 'next_run_ts',
                      },
                      old_value: {
                        type: 'string',
                        nullable: true,
                        description: 'Old Value',
                        example: '1643616000',
                      },
                    },
                  },
                  description: 'Change Log Details',
                },
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      pattern:
                        '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                      nullable: true,
                      description: 'ID',
                      example: '11e95f8ec39de8fbdb0a4f1a',
                    },
                    username: {
                      type: 'string',
                      nullable: true,
                      description: 'Username',
                      example: 'email@domain.com',
                    },
                    first_name: {
                      type: 'string',
                      nullable: true,
                      description: 'First Name',
                      example: 'Bob',
                    },
                    last_name: {
                      type: 'string',
                      nullable: true,
                      description: 'Last Name',
                      example: 'Fairview',
                    },
                  },
                  description: 'User',
                },
              },
              required: ['id'],
            },
            description: 'Changelog Information on `expand`',
          },
          postback_logs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                postback_status_id: {
                  type: 'number',
                  format: 'float',
                  enum: [1, 2, 3, 4],
                  nullable: true,
                  description: 'Postback Status Id',
                  example: null,
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Postback Log Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                postback_config_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Postback Config Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                changelog_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Changelog Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                http_verb: {
                  type: 'string',
                  nullable: true,
                  description: 'Http Verb',
                  example: null,
                },
                next_run_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Next Run',
                  example: 1422040992,
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                model: {
                  type: 'string',
                  nullable: true,
                  description: 'MOdel',
                  example: null,
                },
                model_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Model Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: ['id', 'postback_config_id', 'changelog_id'],
            },
            description: 'Postback Log Information on `expand`',
          },
          created_user: {
            type: 'object',
            properties: {
              account_number: {
                type: 'string',
                nullable: true,
                description: 'Account Number',
                example: '5454545454545454',
              },
              address: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description: 'Address',
                example: '43155 Main Street STE 2310-C',
              },
              branding_domain_url: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Branding Domain Url',
                example: '{branding_domain_url}',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell Phone',
                example: '3339998822',
              },
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description: 'City',
                example: 'Novi',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              contact_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Contact',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Date Of Birth',
                example: '2021-12-01',
              },
              domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 128,
                description: 'Email',
                example: 'email@domain.com',
              },
              email_trx_receipt: {
                type: 'boolean',
                description: 'Email Trx Receipt',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Home Phone',
                example: '3339998822',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              locale: {
                type: 'string',
                maxLength: 8,
                nullable: true,
                description: 'Locale',
                example: 'en-US',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office Phone',
                example: '3339998822',
              },
              office_ext_phone: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Office Ext Phone',
                example: '5',
              },
              primary_location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Primary Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              requires_new_password: {
                type: 'string',
                maxLength: 1,
                nullable: true,
                description: 'Requires New Password',
                example: null,
              },
              state: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description: 'State',
                example: 'Michigan',
              },
              terms_condition_code: {
                type: 'string',
                nullable: true,
                description:
                  'Terms Condition (This field is required when updating your own password).',
                example: '20220308',
              },
              tz: {
                type: 'string',
                maxLength: 30,
                description: 'Time zone',
                example: 'America/New_York',
              },
              ui_prefs: {
                type: 'object',
                properties: {
                  entry_page: {
                    type: 'string',
                    nullable: true,
                    description: 'Ui Prefs Entry Page',
                    example: 'dashboard',
                  },
                  page_size: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 99,
                    nullable: true,
                    description: 'Ui Prefs Page Size',
                    example: 2,
                  },
                  report_export_type: {
                    type: 'string',
                    enum: ['csv', 'tsv', 'xls', 'xlsx'],
                    nullable: true,
                    description: 'Ui Prefs Export Type',
                    example: 'csv',
                  },
                  process_method: {
                    type: 'string',
                    enum: ['virtual_terminal', 'physical_terminal'],
                    nullable: true,
                    description: 'Ui Prefs Process Method',
                    example: 'virtual_terminal',
                  },
                  default_terminal: {
                    type: 'string',
                    pattern:
                      '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                    nullable: true,
                    description: 'Ui Prefs Default Termianl',
                    example: '11e95f8ec39de8fbdb0a4f1a',
                  },
                },
                description: 'Ui Prefs',
              },
              username: {
                type: 'string',
                minLength: 2,
                maxLength: 64,
                description: 'Username',
                example: '{user_name}',
              },
              user_api_key: {
                type: 'string',
                minLength: 16,
                maxLength: 64,
                nullable: true,
                description: 'User Api Key',
                example: '234bas8dfn8238f923w2',
              },
              user_hash_key: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description: 'User Hash Key',
                example: null,
              },
              user_type_code: {
                type: 'integer',
                enum: [200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 100],
                description: 'User Type',
                example: 100,
              },
              password: {
                type: 'string',
                pattern:
                  '^(?=.*[`!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>/?~])(?=.*[0-9])(?=.*[a-zA-Z]).*$',
                minLength: 8,
                maxLength: 128,
                nullable: true,
                description: 'Password',
                example: null,
              },
              zip: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description: 'Zip',
                example: '48375',
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_api_id: {
                type: 'string',
                nullable: true,
                description: 'ContactApi Id',
                example: null,
              },
              primary_location_api_id: {
                type: 'string',
                nullable: true,
                description: 'Primary LocationApi ID',
                example: null,
              },
              status_id: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'User ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              status: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              login_attempts: {
                type: 'number',
                format: 'float',
                description: 'Login Attempts',
                example: 0,
              },
              last_login_ts: {
                type: 'integer',
                description: 'Last Login',
                example: 1422040992,
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Created User',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terms_accepted_ts: {
                type: 'integer',
                nullable: true,
                description: 'Terms Accepted',
                example: 1422040992,
              },
              terms_agree_ip: {
                type: 'string',
                maxLength: 16,
                nullable: true,
                description: 'Terms Agree Ip',
                example: '192.168.0.10',
              },
              current_date_time: {
                type: 'string',
                maxLength: 24,
                description: 'Current Date Time',
                example: '2019-03-11T10:38:26-0700',
              },
            },
            required: [
              'email',
              'last_name',
              'primary_location_id',
              'tz',
              'username',
              'user_type_code',
              'id',
              'status',
              'login_attempts',
              'last_login_ts',
              'created_ts',
              'modified_ts',
              'created_user_id',
              'current_date_time',
            ],
            description: 'User Information on `expand`',
          },
          parent: {
            type: 'object',
            properties: {
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              account_number: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Contact Account Number',
                example: '54545433332',
              },
              contact_api_id: {
                type: 'string',
                pattern: '^[a-zA-Z0-9]*$',
                maxLength: 64,
                nullable: true,
                description: 'Contact API Id',
                example: '137',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell phone of contact',
                example: '3339998822',
              },
              balance: {
                type: 'number',
                format: 'double',
                minimum: -99999999.99,
                maximum: 99999999.99,
                nullable: true,
                description: 'Balance',
                example: 245.36,
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City of contact',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    maxLength: 24,
                    nullable: true,
                    description: 'State of contact',
                    example: 'Michigan',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code of contact',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country of contact',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street of contact',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address of contact',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              header_message: {
                type: 'string',
                maxLength: 250,
                nullable: true,
                description: 'Header Message',
                example: 'This is a sample message for you',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts DOB, Format: yyyy-MM-dd',
                example: '2021-12-01',
              },
              email_trx_receipt: {
                type: 'boolean',
                description:
                  'Whether or not to email all transactions receipts to contact (1 or 0)',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts home phone',
                example: '3339998822',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone',
                example: '3339998822',
              },
              office_phone_ext: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone extension for office phone',
                example: '5',
              },
              header_message_type: {
                type: 'integer',
                minimum: 0,
                maximum: 4,
                description: 'Header Message Type',
                example: 0,
              },
              update_if_exists: {
                type: 'number',
                format: 'float',
                enum: [1],
                nullable: true,
                description: 'Update If Exists',
                example: 1,
              },
              contact_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 1 for api users to store custom data',
                example: 'any',
              },
              contact_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 2 for api users to store custom data',
                example: 'anything',
              },
              contact_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 3 for api users to store custom data',
                example: 'something',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Parent Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description: 'Email of contact',
                example: 'email@domain.com',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Contact ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              active: {
                type: 'boolean',
                description: 'Active',
                example: true,
              },
            },
            required: [
              'location_id',
              'last_name',
              'email_trx_receipt',
              'header_message_type',
              'id',
              'created_ts',
              'modified_ts',
              'active',
            ],
            description: 'Parent Information on `expand`',
          },
          children: {
            type: 'object',
            properties: {
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              account_number: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Contact Account Number',
                example: '54545433332',
              },
              contact_api_id: {
                type: 'string',
                pattern: '^[a-zA-Z0-9]*$',
                maxLength: 64,
                nullable: true,
                description: 'Contact API Id',
                example: '137',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell phone of contact',
                example: '3339998822',
              },
              balance: {
                type: 'number',
                format: 'double',
                minimum: -99999999.99,
                maximum: 99999999.99,
                nullable: true,
                description: 'Balance',
                example: 245.36,
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City of contact',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    maxLength: 24,
                    nullable: true,
                    description: 'State of contact',
                    example: 'Michigan',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code of contact',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country of contact',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street of contact',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address of contact',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              header_message: {
                type: 'string',
                maxLength: 250,
                nullable: true,
                description: 'Header Message',
                example: 'This is a sample message for you',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts DOB, Format: yyyy-MM-dd',
                example: '2021-12-01',
              },
              email_trx_receipt: {
                type: 'boolean',
                description:
                  'Whether or not to email all transactions receipts to contact (1 or 0)',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts home phone',
                example: '3339998822',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone',
                example: '3339998822',
              },
              office_phone_ext: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone extension for office phone',
                example: '5',
              },
              header_message_type: {
                type: 'integer',
                minimum: 0,
                maximum: 4,
                description: 'Header Message Type',
                example: 0,
              },
              update_if_exists: {
                type: 'number',
                format: 'float',
                enum: [1],
                nullable: true,
                description: 'Update If Exists',
                example: 1,
              },
              contact_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 1 for api users to store custom data',
                example: 'any',
              },
              contact_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 2 for api users to store custom data',
                example: 'anything',
              },
              contact_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 3 for api users to store custom data',
                example: 'something',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Parent Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description: 'Email of contact',
                example: 'email@domain.com',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Contact ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              active: {
                type: 'boolean',
                description: 'Active',
                example: true,
              },
            },
            required: [
              'location_id',
              'last_name',
              'email_trx_receipt',
              'header_message_type',
              'id',
              'created_ts',
              'modified_ts',
              'active',
            ],
            description: 'Children Information on `expand`',
          },
        },
        required: [
          'location_id',
          'last_name',
          'email_trx_receipt',
          'header_message_type',
          'id',
          'created_ts',
          'modified_ts',
          'active',
        ],
      },
    },
    required: ['type'],
  },
  responseLocation: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['Location'],
        description: 'Resource Type',
        example: 'Location',
        default: 'Location',
      },
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'Location ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          created_ts: {
            type: 'integer',
            description: 'Created Time Stamp',
            example: 1422040992,
          },
          modified_ts: {
            type: 'integer',
            description: 'Modified Time Stamp',
            example: 1422040992,
          },
          account_number: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-_]+$',
            maxLength: 32,
            nullable: true,
            description: 'Account number',
            example: '5454545454545454',
          },
          address: {
            type: 'object',
            properties: {
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description: 'City name',
                example: 'Novi',
              },
              state: {
                type: 'string',
                minLength: 2,
                maxLength: 2,
                nullable: true,
                description: 'State name',
                example: 'MI',
              },
              postal_code: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description: 'Postal code',
                example: '48375',
              },
              country: {
                type: 'string',
                enum: ['US', 'CA'],
                nullable: true,
                description: 'Country',
                example: 'US',
              },
              street: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description: 'Street',
                example: '43155 Main Street STE 2310-C',
              },
              street2: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description: 'Street 2',
                example: '43155 Main Street STE 2310-C',
              },
            },
            description: 'Address',
          },
          branding_domain_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description: 'GUID for Branding Domain',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          contact_email_trx_receipt_default: {
            type: 'boolean',
            description:
              'If true, will email contact receipt for any transaction',
            example: true,
          },
          default_ach: {
            type: 'string',
            minLength: 24,
            maxLength: 36,
            nullable: true,
            description: "GUID for Location's default ACH Product Transaction",
            example: '11e608a7d515f1e093242bb2',
          },
          default_cc: {
            type: 'string',
            minLength: 24,
            maxLength: 36,
            nullable: true,
            description: "GUID for Location's default CC Product Transaction",
            example: '11e608a442a5f1e092242dda',
          },
          developer_company_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description: 'GUID for Developer Company',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          email_reply_to: {
            type: 'string',
            format: 'email',
            maxLength: 64,
            nullable: true,
            description:
              'Used as from email address when sending various notifications',
            example: 'email@domain.com',
          },
          fax: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description: 'Fax number',
            example: '3339998822',
          },
          location_api_id: {
            type: 'string',
            maxLength: 36,
            nullable: true,
            description: 'Location api ID',
            example: 'location-111111',
          },
          location_api_key: {
            type: 'string',
            maxLength: 36,
            nullable: true,
            description: 'Location api key',
            example: 'AE34BBCAADF4AE34BBCAADF4',
          },
          location_c1: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description:
              'Can be used to store custom information for location.',
            example: 'custom 1',
          },
          location_c2: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description:
              'Can be used to store custom information for location.',
            example: 'custom 2',
          },
          location_c3: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description:
              'Can be used to store custom information for location.',
            example: 'custom data 3',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
            description: 'Name of the company',
            example: 'Sample Company Headquarters',
          },
          office_phone: {
            type: 'string',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description: 'Office phone number',
            example: '2481234567',
          },
          office_ext_phone: {
            type: 'string',
            maxLength: 10,
            nullable: true,
            description: 'Office phone extension number',
            example: '1021021209',
          },
          recurring_notification_days_default: {
            type: 'integer',
            minimum: 0,
            maximum: 365,
            nullable: true,
            description:
              'Number of days prior to a Recurring running that a notification should be sent',
            example: 0,
          },
          tz: {
            type: 'string',
            maxLength: 30,
            nullable: true,
            description: 'Time zone',
            example: 'America/New_York',
          },
        },
        required: ['id', 'created_ts', 'modified_ts', 'name'],
      },
    },
    required: ['type'],
  },
  responseToken: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['Token'],
        description: 'Resource Type',
        example: 'Token',
        default: 'Token',
      },
      data: {
        type: 'object',
        properties: {
          account_holder_name: {
            type: 'string',
            minLength: 1,
            maxLength: 32,
            nullable: true,
            description: 'Account holder name',
            example: 'John Smith',
          },
          account_number: {
            type: 'string',
            pattern: '^[\\d]+$',
            minLength: 4,
            maxLength: 19,
            nullable: true,
            description: 'Account number',
            example: '545454545454545',
          },
          account_vault_api_id: {
            type: 'string',
            minLength: 1,
            maxLength: 36,
            nullable: true,
            description:
              'This field can be used to correlate Tokens in our system to data within an outside software integration',
            example: 'accountvaultabcd',
          },
          accountvault_c1: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
            nullable: true,
            description: 'Custom field 1 for API users to store custom data',
            example: 'accountvault custom 1',
          },
          accountvault_c2: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
            nullable: true,
            description: 'Custom field 2 for API users to store custom data',
            example: 'accountvault custom 2',
          },
          accountvault_c3: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
            nullable: true,
            description: 'Custom field 3 for API users to store custom data',
            example: 'accountvault custom 3',
          },
          ach_sec_code: {
            type: 'string',
            enum: ['WEB', 'CCD', 'PPD', 'C21', 'POP', 'TEL'],
            nullable: true,
            description: 'SEC code for the account',
            example: 'WEB',
          },
          billing_address: {
            type: 'object',
            properties: {
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description:
                  'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                example: 'Novi',
              },
              state: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description:
                  'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                example: 'Michigan',
              },
              postal_code: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description:
                  "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
                example: '48375',
              },
              street: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description:
                  'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                example: '43155 Main Street STE 2310-C',
              },
              phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description:
                  'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
                example: '3339998822',
              },
            },
            description: 'Billing Address Object',
          },
          contact_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description: 'Used to associate the Token with a Contact.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          customer_id: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description: 'Used to store a customer identification number.',
            example: '123456',
          },
          identity_verification: {
            type: 'object',
            properties: {
              dl_state: {
                type: 'string',
                minLength: 2,
                maxLength: 2,
                nullable: true,
                description:
                  "Used for certain ACH transactions where Driver's License is required by the terminal being used. ",
                example: 'MI',
              },
              dl_number: {
                type: 'string',
                minLength: 1,
                maxLength: 50,
                nullable: true,
                description:
                  "Used for certain ACH transactions where Driver's License is required by the terminal being used. ",
                example: '1235567',
              },
              ssn4: {
                type: 'string',
                maxLength: 4,
                nullable: true,
                description:
                  'The last four of the account_holder social security number.',
                example: '8527',
              },
              dob_year: {
                type: 'string',
                pattern: '^(19\\d{2})|20\\d{2}$',
                minLength: 4,
                maxLength: 4,
                nullable: true,
                description:
                  'Used for certain ACH transactions where Identity Verification is enabled on the terminal being used.',
                example: '1980',
              },
            },
            description: 'Identity verification',
          },
          location_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description:
              'A valid Location Id associated with the Contact for this Token',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          previous_account_vault_api_id: {
            type: 'string',
            maxLength: 64,
            nullable: true,
            description:
              'Can be used to pull payment info from a previous token api id.',
            example: 'previousaccountvault123456',
          },
          previous_account_vault_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              'Can be used to pull payment info from a previous token.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          previous_transaction_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              'Can be used to pull payment info from a previous transaction.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          terms_agree: {
            type: 'boolean',
            description: 'Terms agreement.',
            example: true,
          },
          terms_agree_ip: {
            type: 'string',
            nullable: true,
            description: 'The ip address of the client that agreed to terms.',
            example: '192.168.0.10',
          },
          title: {
            type: 'string',
            minLength: 1,
            maxLength: 16,
            nullable: true,
            description:
              'Used to describe the Token for easier identification within our UI.',
            example: 'Test CC Account',
          },
          id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'A unique, system-generated identifier for the Token.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          account_type: {
            type: 'string',
            minLength: 1,
            maxLength: 32,
            description: 'Account type',
            example: 'checking',
          },
          active: {
            type: 'boolean',
            description: 'Register is Active',
            example: true,
          },
          cau_summary_status_id: {
            type: 'number',
            format: 'float',
            enum: [0, 1, 2, 3],
            description: 'CAU Summary Status ID.',
            example: 1,
          },
          created_ts: {
            type: 'integer',
            description: 'Created Time Stamp',
            example: 1422040992,
          },
          e_serial_number: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]*$',
            maxLength: 36,
            nullable: true,
            description: 'E Serial Number',
            example: '1234567890',
          },
          e_track_data: {
            type: 'string',
            nullable: true,
            description: 'E Track Data',
            example: null,
          },
          e_format: {
            type: 'string',
            nullable: true,
            description: 'E Format',
            example: null,
          },
          e_keyed_data: {
            type: 'string',
            nullable: true,
            description: 'E Keyed Data',
            example: null,
          },
          expiring_in_months: {
            type: 'integer',
            nullable: true,
            description: 'Determined by API based on card exp_date.',
            example: null,
          },
          first_six: {
            type: 'string',
            maxLength: 6,
            description:
              'The first six numbers of an account number.  System will generate a value for this field automatically.',
            example: '700953',
          },
          has_recurring: {
            type: 'boolean',
            description:
              'True indicates that this token is tied to a Recurring Payment',
            example: false,
          },
          last_four: {
            type: 'string',
            maxLength: 4,
            description:
              'The last four numbers of an account number.  System will generate a value for this field automatically.',
            example: '3657',
          },
          modified_ts: {
            type: 'integer',
            description: 'Modified Time Stamp',
            example: 1422040992,
          },
          payment_method: {
            type: 'string',
            enum: ['cc', 'ach'],
            description: "Must be provided as either 'cc' or 'ach'.",
            example: 'cc',
          },
          ticket: {
            type: 'string',
            maxLength: 36,
            nullable: true,
            description: 'A valid ticket that was created to store the token.',
            example: null,
          },
          track_data: {
            type: 'string',
            maxLength: 256,
            nullable: true,
            description: 'Track Data from a magnetic card swipe.',
            example: null,
          },
          location: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              account_number: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-_]+$',
                maxLength: 32,
                nullable: true,
                description: 'Account number',
                example: '5454545454545454',
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City name',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 2,
                    nullable: true,
                    description: 'State name',
                    example: 'MI',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street',
                    example: '43155 Main Street STE 2310-C',
                  },
                  street2: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street 2',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address',
              },
              branding_domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'GUID for Branding Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_email_trx_receipt_default: {
                type: 'boolean',
                description:
                  'If true, will email contact receipt for any transaction',
                example: true,
              },
              default_ach: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description:
                  "GUID for Location's default ACH Product Transaction",
                example: '11e608a7d515f1e093242bb2',
              },
              default_cc: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description:
                  "GUID for Location's default CC Product Transaction",
                example: '11e608a442a5f1e092242dda',
              },
              developer_company_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'GUID for Developer Company',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email_reply_to: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description:
                  'Used as from email address when sending various notifications',
                example: 'email@domain.com',
              },
              fax: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Fax number',
                example: '3339998822',
              },
              location_api_id: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Location api ID',
                example: 'location-111111',
              },
              location_api_key: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Location api key',
                example: 'AE34BBCAADF4AE34BBCAADF4',
              },
              location_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom 1',
              },
              location_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom 2',
              },
              location_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom data 3',
              },
              name: {
                type: 'string',
                maxLength: 64,
                minLength: 1,
                description: 'Name of the company',
                example: 'Sample Company Headquarters',
              },
              office_phone: {
                type: 'string',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office phone number',
                example: '2481234567',
              },
              office_ext_phone: {
                type: 'string',
                maxLength: 10,
                nullable: true,
                description: 'Office phone extension number',
                example: '1021021209',
              },
              recurring_notification_days_default: {
                type: 'integer',
                minimum: 0,
                maximum: 365,
                nullable: true,
                description:
                  'Number of days prior to a Recurring running that a notification should be sent',
                example: 0,
              },
              tz: {
                type: 'string',
                maxLength: 30,
                nullable: true,
                description: 'Time zone',
                example: 'America/New_York',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location GUID of the parent location',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              ticket_hash_key: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Ticket Hash Key',
                example: 'A5F443CADF4AE34BBCAADF4',
              },
            },
            required: ['id', 'created_ts', 'modified_ts', 'name', 'parent_id'],
            description: 'Location Information on `expand`',
          },
          contact: {
            type: 'object',
            properties: {
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              account_number: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Contact Account Number',
                example: '54545433332',
              },
              contact_api_id: {
                type: 'string',
                pattern: '^[a-zA-Z0-9]*$',
                maxLength: 64,
                nullable: true,
                description: 'Contact API Id',
                example: '137',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell phone of contact',
                example: '3339998822',
              },
              balance: {
                type: 'number',
                format: 'double',
                minimum: -99999999.99,
                maximum: 99999999.99,
                nullable: true,
                description: 'Balance',
                example: 245.36,
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City of contact',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    maxLength: 24,
                    nullable: true,
                    description: 'State of contact',
                    example: 'Michigan',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code of contact',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country of contact',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street of contact',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address of contact',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              header_message: {
                type: 'string',
                maxLength: 250,
                nullable: true,
                description: 'Header Message',
                example: 'This is a sample message for you',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts DOB, Format: yyyy-MM-dd',
                example: '2021-12-01',
              },
              email_trx_receipt: {
                type: 'boolean',
                description:
                  'Whether or not to email all transactions receipts to contact (1 or 0)',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts home phone',
                example: '3339998822',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone',
                example: '3339998822',
              },
              office_phone_ext: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone extension for office phone',
                example: '5',
              },
              header_message_type: {
                type: 'integer',
                minimum: 0,
                maximum: 4,
                description: 'Header Message Type',
                example: 0,
              },
              update_if_exists: {
                type: 'number',
                format: 'float',
                enum: [1],
                nullable: true,
                description: 'Update If Exists',
                example: 1,
              },
              contact_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 1 for api users to store custom data',
                example: 'any',
              },
              contact_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 2 for api users to store custom data',
                example: 'anything',
              },
              contact_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 3 for api users to store custom data',
                example: 'something',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Parent Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description: 'Email of contact',
                example: 'email@domain.com',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Contact ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              active: {
                type: 'boolean',
                description: 'Active',
                example: true,
              },
            },
            required: [
              'location_id',
              'last_name',
              'email_trx_receipt',
              'header_message_type',
              'id',
              'created_ts',
              'modified_ts',
              'active',
            ],
            description: 'Contact Information on `expand`',
          },
          transactions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                additional_amounts: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        enum: [
                          'cashback',
                          'surcharge',
                          'healthcare',
                          'transit',
                          'RX',
                          'vision',
                          'clinical',
                          'copay',
                          'dental',
                          'tax',
                          'fee',
                        ],
                        nullable: true,
                        description:
                          'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
                        example: 'cashback',
                      },
                      amount: {
                        type: 'integer',
                        nullable: true,
                        description: 'The amount of additional amount.',
                        example: 10,
                      },
                      account_type: {
                        type: 'string',
                        enum: [
                          'unknown',
                          'checking',
                          'credit',
                          'cash_benefit',
                          'snap',
                          'prepaid',
                          'savings',
                          'spending_power',
                          'universal',
                        ],
                        nullable: true,
                        description: 'Account Type',
                        example: 'credit',
                      },
                      currency: {
                        type: 'number',
                        format: 'float',
                        nullable: true,
                        description: 'Currency Code',
                        example: 840,
                      },
                    },
                  },
                  description: 'Additional amounts',
                },
                billing_address: {
                  type: 'object',
                  properties: {
                    city: {
                      type: 'string',
                      pattern: "^[\\w#,.\\-'&\\s/]+$",
                      maxLength: 36,
                      nullable: true,
                      description:
                        'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                      example: 'Novi',
                    },
                    state: {
                      type: 'string',
                      maxLength: 24,
                      nullable: true,
                      description:
                        'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                      example: 'Michigan',
                    },
                    postal_code: {
                      type: 'string',
                      pattern: '^[a-zA-Z0-9\\-\\s]+$',
                      minLength: 4,
                      maxLength: 10,
                      nullable: true,
                      description:
                        "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
                      example: '48375',
                    },
                    street: {
                      type: 'string',
                      pattern: "^[\\w#,.\\-'&\\s/]+$",
                      maxLength: 255,
                      nullable: true,
                      description:
                        'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                      example: '43155 Main Street STE 2310-C',
                    },
                    phone: {
                      type: 'string',
                      pattern: '^\\d{10}$',
                      minLength: 10,
                      maxLength: 10,
                      nullable: true,
                      description:
                        'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
                      example: '3339998822',
                    },
                  },
                  description: 'Billing Address Object',
                },
                checkin_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  nullable: true,
                  description:
                    'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
                  example: '2021-12-01',
                },
                checkout_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  nullable: true,
                  description:
                    'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
                  example: '2021-12-01',
                },
                clerk_number: {
                  type: 'string',
                  maxLength: 16,
                  nullable: true,
                  description: 'Clerk or Employee Identifier',
                  example: 'AE1234',
                },
                contact_api_id: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description:
                    "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
                  example: null,
                },
                contact_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                custom_data: {
                  type: 'object',
                  properties: {},
                  description:
                    'A field that allows custom JSON to be entered to store extra data.',
                  example: {
                    data1: 'custom1',
                    data2: 'custom2',
                  },
                },
                customer_id: {
                  type: 'string',
                  maxLength: 64,
                  nullable: true,
                  description:
                    'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
                  example: 'customerid',
                },
                description: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 64,
                  nullable: true,
                  description: 'Description',
                  example: 'some description',
                },
                identity_verification: {
                  type: 'object',
                  properties: {
                    dl_state: {
                      type: 'string',
                      minLength: 2,
                      maxLength: 2,
                      nullable: true,
                      description:
                        "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
                      example: 'MI',
                    },
                    dl_number: {
                      type: 'string',
                      minLength: 1,
                      maxLength: 50,
                      nullable: true,
                      description:
                        "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
                      example: '1235567',
                    },
                    dob_year: {
                      type: 'string',
                      pattern: '^(19\\d{2})|20\\d{2}$',
                      minLength: 4,
                      maxLength: 4,
                      nullable: true,
                      description:
                        'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
                      example: '1980',
                    },
                  },
                  description: 'Identity Verification',
                },
                iias_ind: {
                  type: 'integer',
                  enum: [0, 1, 2],
                  nullable: true,
                  description: "Possible values are '0', '1','2'",
                  example: 1,
                },
                image_front: {
                  type: 'string',
                  nullable: true,
                  description:
                    'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
                  example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
                },
                image_back: {
                  type: 'string',
                  nullable: true,
                  description:
                    'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
                  example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
                },
                installment: {
                  type: 'boolean',
                  description:
                    'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
                  example: true,
                },
                installment_number: {
                  type: 'number',
                  format: 'float',
                  minimum: 1,
                  maximum: 999,
                  nullable: true,
                  description:
                    'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
                  example: 1,
                },
                installment_count: {
                  type: 'number',
                  format: 'float',
                  minimum: 1,
                  maximum: 999,
                  nullable: true,
                  description:
                    'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
                  example: 1,
                },
                location_api_id: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description:
                    "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
                  example: 'location-api-id-florida-2',
                },
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    'A valid Location Id to associate the transaction with.',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                product_transaction_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                no_show: {
                  type: 'boolean',
                  description: 'Used in Lodging',
                  example: false,
                },
                notification_email_address: {
                  type: 'string',
                  nullable: true,
                  description:
                    'If email is supplied then receipt will be emailed',
                  example: 'johnsmith@smiths.com',
                },
                order_number: {
                  type: 'string',
                  maxLength: 32,
                  nullable: true,
                  description:
                    "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
                  example: '433659378839',
                },
                po_number: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Purchase Order number',
                  example: '555555553123',
                },
                quick_invoice_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                recurring: {
                  type: 'boolean',
                  description:
                    'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
                  example: false,
                },
                recurring_number: {
                  type: 'number',
                  format: 'float',
                  minimum: 1,
                  maximum: 999,
                  nullable: true,
                  description:
                    'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
                  example: 1,
                },
                room_num: {
                  type: 'string',
                  maxLength: 12,
                  nullable: true,
                  description: 'Used in Lodging',
                  example: '303',
                },
                room_rate: {
                  type: 'integer',
                  nullable: true,
                  description: 'Required if merchant industry type is lodging.',
                  example: 95.3,
                },
                save_account: {
                  type: 'boolean',
                  description:
                    'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
                  example: false,
                },
                save_account_title: {
                  type: 'string',
                  maxLength: 16,
                  nullable: true,
                  description:
                    'If saving token while running a transaction, this will be the title of the token.',
                  example: 'John Account',
                },
                subtotal_amount: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 9999999999,
                  nullable: true,
                  description:
                    'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
                  example: 599,
                },
                surcharge_amount: {
                  type: 'integer',
                  minimum: 1,
                  maximum: 9999999999,
                  nullable: true,
                  description:
                    'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
                  example: 100,
                },
                tags: {
                  type: 'array',
                  items: {
                    type: 'string',
                    example: 'Walk-in Customer',
                  },
                  description: 'Tags',
                },
                tax: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 9999999999,
                  nullable: true,
                  description:
                    'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
                  example: 0,
                },
                tip_amount: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 9999999999,
                  nullable: true,
                  description:
                    'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
                  example: 0,
                },
                transaction_amount: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 999999999,
                  nullable: true,
                  description:
                    'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
                  example: 0,
                },
                secondary_amount: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 999999999,
                  nullable: true,
                  description:
                    'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
                  example: 0,
                },
                transaction_api_id: {
                  type: 'string',
                  maxLength: 64,
                  nullable: true,
                  description: 'See api_id page for more details',
                  example: 'transaction-payment-abcd123',
                },
                transaction_c1: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Custom field 1 for api users to store custom data',
                  example: 'custom-data-1',
                },
                transaction_c2: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Custom field 2 for api users to store custom data',
                  example: 'custom-data-2',
                },
                transaction_c3: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Custom field 3 for api users to store custom data',
                  example: 'custom-data-3',
                },
                transaction_c4: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Custom field 4 for api users to store custom data',
                  example: 'custom-data-4',
                },
                bank_funded_only_override: {
                  type: 'boolean',
                  description: 'Bank Funded Only Override',
                  example: false,
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Transaction ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                terminal_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Terminal ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                account_holder_name: {
                  type: 'string',
                  maxLength: 32,
                  nullable: true,
                  description:
                    "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
                  example: 'smith',
                },
                account_type: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 32,
                  nullable: true,
                  description:
                    'Required for ACH transactions if account_vault_id is not provided.',
                  example: 'checking',
                },
                token_api_id: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description:
                    "This can be supplied in place of account_vault_id if you would like to use an token for the transaction and are using your own custom api_id's to track accountvaults in the system.",
                  example: null,
                },
                token_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    'Required if account_number,  track_data, micr_data is not provided.',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                ach_identifier: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 1,
                  nullable: true,
                  description:
                    'Required for ACH transactions in certain scenarios.',
                  example: 'P',
                },
                ach_sec_code: {
                  type: 'string',
                  enum: ['CCD', 'PPD', 'TEL', 'WEB', 'POP', 'C21'],
                  nullable: true,
                  description:
                    'Required for ACH transactions if account_vault_id is not provided.',
                  example: 'C21',
                },
                advance_deposit: {
                  type: 'boolean',
                  description: 'Advance Deposit',
                  example: true,
                },
                auth_amount: {
                  type: 'number',
                  format: 'float',
                  maximum: 9999999999,
                  nullable: true,
                  description: 'Authorization Amount',
                  example: 1,
                },
                auth_code: {
                  type: 'string',
                  minLength: 6,
                  maxLength: 6,
                  nullable: true,
                  description:
                    'Required on force transactions. Ignored for all other actions.',
                  example: 'BR349K',
                },
                avs: {
                  type: 'string',
                  enum: ['BAD', 'ZIP', 'STREET', 'GOOD', 'UNKNOWN'],
                  nullable: true,
                  description: 'AVS',
                  example: 'BAD',
                },
                avs_enhanced: {
                  type: 'string',
                  minLength: 1,
                  nullable: true,
                  description: 'AVS Enhanced',
                  example: 'N',
                },
                cardholder_present: {
                  type: 'boolean',
                  description:
                    'If the cardholder is present at the point of service',
                  example: true,
                },
                card_present: {
                  type: 'boolean',
                  description:
                    'A POST only field to specify whether or not the card is present.',
                  example: true,
                },
                check_number: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 15,
                  nullable: true,
                  description: 'Required for transactions using TEL SEC code.',
                  example: '8520748520963',
                },
                customer_ip: {
                  type: 'string',
                  nullable: true,
                  description: 'Can be used to store customer IP Address',
                  example: '192.168.0.10',
                },
                cvv_response: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 1,
                  nullable: true,
                  description: 'Obfuscated CVV',
                  example: 'N',
                },
                entry_mode_id: {
                  type: 'string',
                  enum: ['B', 'S', 'K', 'C', 'P', 'F'],
                  nullable: true,
                  description:
                    'Entry Mode - See entry mode section for more detail',
                  example: 'C',
                },
                emv_receipt_data: {
                  type: 'object',
                  properties: {
                    AID: {
                      type: 'string',
                      nullable: true,
                      description:
                        'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                      example: 'a0000000042203',
                    },
                    APPLAB: {
                      type: 'string',
                      nullable: true,
                      description:
                        'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                      example: 'US Maestro',
                    },
                    APPN: {
                      type: 'string',
                      nullable: true,
                      description:
                        'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                      example: 'US Maestro',
                    },
                    CVM: {
                      type: 'string',
                      nullable: true,
                      description:
                        'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                      example: 'Pin Verified',
                    },
                    TSI: {
                      type: 'string',
                      nullable: true,
                      description:
                        'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                      example: 'e800',
                    },
                    TVR: {
                      type: 'string',
                      nullable: true,
                      description:
                        'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                      example: '0800008000',
                    },
                  },
                  description:
                    'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                },
                first_six: {
                  type: 'string',
                  minLength: 6,
                  maxLength: 6,
                  nullable: true,
                  description:
                    'First six numbers of account_number.  Automatically generated by system.',
                  example: '545454',
                },
                last_four: {
                  type: 'string',
                  minLength: 4,
                  maxLength: 4,
                  nullable: true,
                  description:
                    'Last four numbers of account_number.  Automatically generated by the system.',
                  example: '5454',
                },
                payment_method: {
                  type: 'string',
                  enum: ['cc', 'ach'],
                  description: "'cc' or 'ach'",
                  example: 'cc',
                },
                terminal_serial_number: {
                  type: 'string',
                  pattern: '^[a-zA-Z0-9]*$',
                  maxLength: 36,
                  nullable: true,
                  description:
                    "If transaction was processed using a terminal, this field would contain the terminal's serial number",
                  example: '1234567890',
                },
                transaction_settlement_status: {
                  type: 'string',
                  maxLength: 32,
                  nullable: true,
                  description: '(Deprecated field)',
                  example: null,
                },
                charge_back_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  nullable: true,
                  description: 'Charge Back Date (ACH Trxs)',
                  example: '2021-12-01',
                },
                is_recurring: {
                  type: 'boolean',
                  description:
                    'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
                  example: true,
                },
                notification_email_sent: {
                  type: 'string',
                  nullable: true,
                  description: 'Indicates if email receipt has been sent',
                  example: 'true',
                },
                par: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description:
                    "A field usually returned form the processor to uniquely identifier a specific cardholder's credit card.",
                  example: 'Q1J4Z28RKA1EBL470G9XYG90R5D3E',
                },
                reason_code_id: {
                  type: 'number',
                  format: 'float',
                  enum: [
                    0, 1000, 1001, 1002, 1003, 1004, 1005, 1200, 1201, 1240,
                    1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310,
                    1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320,
                    1321, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1330,
                    1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340,
                    1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350,
                    1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360,
                    1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370,
                    1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380,
                    1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390,
                    1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1500,
                    1510, 1518, 1520, 1530, 1531, 1540, 1541, 1588, 1599, 1601,
                    1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1611,
                    1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621,
                    1622, 1623, 1624, 1625, 1626, 1627, 1628, 1629, 1630, 1631,
                    1632, 1640, 1641, 1650, 1651, 1652, 1653, 1654, 1655, 1656,
                    1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666,
                    1667, 1668, 1701, 1800, 1801, 1802, 1803, 1804, 1805,
                  ],
                  nullable: true,
                  description:
                    "Response reason code that provides more detail as to the result of the transaction. The reason code list can be found here: Response Reason Codes\n>0 - N/A\n>\n>1000 - CC - Approved / ACH - Accepted\n>\n>1000 - CC - Approved / ACH - Accepted\n>\n>1001 - AuthCompleted\n>\n>1002 - Forced\n>\n>1003 - AuthOnly Declined\n>\n>1004 - Validation Failure (System Run Trx)\n>\n>1005 - Processor Response Invalid\n>\n>1200 - Voided\n>\n>1201 - Partial Approval\n>\n>1240 - Approved, optional fields are missing (Paya ACH only)\n>\n>1301 - Account Deactivated for Fraud\n>\n>1302-1399 - Reserved for Future Fraud Reason Codes\n>\n>1500 - Generic Decline\n>\n>1510 - Call\n>\n>1518 - Transaction Not Permitted - Terminal\n>\n>1520 - Pickup Card\n>\n>1530 - Retry Trx\n>\n>1531 - Communication Error\n>\n>1540 - Setup Issue, contact Support\n>\n>1541 - Device is not signature capable\n>\n>1588 - Data could not be de-tokenized\n>\n>1599 - Other Reason\n>\n>1601 - Generic Decline\n>\n>1602 - Call\n>\n>1603 - No Reply\n>\n>1604 - Pickup Card - No Fraud\n>\n>1605 - Pickup Card - Fraud\n>\n>1606 - Pickup Card - Lost\n>\n>1607 - Pickup Card - Stolen\n>\n>1608 - Account Error\n>\n>1609 - Already Reversed\n>\n>1610 - Bad PIN\n>\n>1611 - Cashback Exceeded\n>\n>1612 - Cashback Not Available\n>\n>1613 - CID Error\n>\n>1614 - Date Error\n>\n>1615 - Do Not Honor\n>\n>1616 - NSF\n>\n>1618 - Invalid Service Code\n>\n>1619 - Exceeded activity limit\n>\n>1620 - Violation\n>\n>1621 - Encryption Error\n>\n>1622 - Card Expired\n>\n>1623 - Renter\n>\n>1624 - Security Violation\n>\n>1625 - Card Not Permitted\n>\n>1626 - Trans Not Permitted\n>\n>1627 - System Error\n>\n>1628 - Bad Merchant ID\n>\n>1629 - Duplicate Batch (Already Closed)\n>\n>1630 - Batch Rejected\n>\n>1631 - Account Closed\n>\n>1632 - PIN tries exceeded\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>1640 - Required fields are missing (ACH only)\n>\n>1641 - Previously declined transaction (1640)\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>1650 - Contact Support\n>\n>1651 - Max Sending - Throttle Limit Hit (ACH only)\n>\n>1652 - Max Attempts Exceeded\n>\n>1653 - Contact Support\n>\n>1654 - Voided - Online Reversal Failed\n>\n>1655 - Decline (AVS Auto Reversal)\n>\n>1656 - Decline (CVV Auto Reversal)\n>\n>1657 - Decline (Partial Auth Auto Reversal)\n>\n>1658 - Expired Authorization\n>\n>1659 - Declined - Partial Approval not Supported\n>\n>1660 - Bank Account Error, please delete and re-add Token\n>\n>1661 - Declined AuthIncrement\n>\n>1662 - Auto Reversal - Processor can't settle\n>\n>1663 - Manager Needed (Needs override transaction)\n>\n>1664 - Token Not Found: Sharing Group Unavailable\n>\n>1665 - Contact Not Found: Sharing Group Unavailable\n>\n>1666 - Amount Error\n>\n>1667 - Action Not Allowed in Current State\n>\n>1668 - Original Authorization Not Valid\n>\n>1701 - Chip Reject\n>\n>1800 - Incorrect CVV\n>\n>1801 - Duplicate Transaction\n>\n>1802 - MID/TID Not Registered\n>\n>1803 - Stop Recurring\n>\n>1804 - No Transactions in Batch\n>\n>1805 - Batch Does Not Exist\n>\n>   \n>\n**ACH Reject Reason Codes**\n| Code | E-Code | Verbiage | Short Description | Long Description |\n| ----------- | ----------- | ----------- | ----------- | ----------- |\n| 2101 | Rejected-R01 |  | Insufficient funds | Available balance is not sufficient to cover the amount of the debit entry |\n| 2102 | Rejected-R02  | E02 | Bank account closed | Previously active amount has been closed by the customer of RDFI |\n| 2103 | Rejected-R03 | E03 | No bank account/unable to locate account | Account number does not correspond to the individual identified in the entry, or the account number designated is not an open account |\n| 2104 | Rejected-R04  | E04 | Invalid bank account number | Account number structure is not valid |\n| 2105 | Rejected-R05  | E05 | Reserved | Currently not in use |\n| 2106 | Rejected-R06 |  | Returned per ODFI request | ODFI requested the RDFI to return the entry |\n| 2107 | Rejected-R07 | E07 | Authorization revoked by customer | Receiver has revoked authorization |\n| 2108 | Rejected-R08 | E08 | Payment stopped | Receiver of a recurring debit has stopped payment of an entry |\n| 2109 | Rejected-R09 |  | Uncollected funds | Collected funds are not sufficient for payment of the debit entry |\n| 2110 | Rejected-R10 | E10 | Customer Advises Originator is Not Known to Receiver and/or Is Not Authorized by Receiver to Debit Receiver’s Account | Receiver has advised RDFI that originator is not authorized to debit his bank account |\n| 2111 | Rejected-R11 |  | Customer Advises Entry Not In Accordance with the Terms of the Authorization | To be used when there is an error in the authorization |\n| 2112 | Rejected-R12 |  | Branch sold to another RDFI | RDFI unable to post entry destined for a bank account maintained at a branch sold to another financial institution |\n| 2113 | Rejected-R13 |  | RDFI not qualified to participate | Financial institution does not receive commercial ACH entries |\n| 2114 | Rejected-R14 | E14 | Representative payee deceased or unable to continue in that capacity | The representative payee authorized to accept entries on behalf of a beneficiary is either deceased or unable to continue in that capacity |\n| 2115 | Rejected-R15 | E15 | Beneficiary or bank account holder deceased | (Other than representative payee) deceased* - (1) the beneficiary entitled to payments is deceased or (2) the bank account holder other than a representative payee is deceased |\n| 2116 | Rejected-R16 | E16 | Bank account frozen | Funds in bank account are unavailable due to action by RDFI or legal order |\n| 2117 | Rejected-R17 |  | File record edit criteria | Entry with Invalid Account Number Initiated Under Questionable Circumstances |\n| 2118 | Rejected-R18 |  | Improper effective entry date | Entries have been presented prior to the first available processing window for the effective date. |\n| 2119 | Rejected-R19 |  | Amount field error | Improper formatting of the amount field |\n| 2120 | Rejected-R20 |  | Non-payment bank account | Entry destined for non-payment bank account defined by reg. |\n| 2121 | Rejected-R21 |  | Invalid company Identification | The company ID information not valid (normally CIE entries) |\n| 2122 | Rejected-R22 |  | Invalid individual ID number | Individual id used by receiver is incorrect (CIE entries) |\n| 2123 | Rejected-R23 |  | Credit entry refused by receiver | Receiver returned entry because minimum or exact amount not remitted, bank account is subject to litigation, or payment represents an overpayment, originator is not known to receiver or receiver has not authorized this credit entry to this bank account |\n| 2124 | Rejected-R24 |  | Duplicate entry | RDFI has received a duplicate entry |\n| 2125 | Rejected-R25 |  | Addenda error | Improper formatting of the addenda record information |\n| 2126 | Rejected-R26 |  | Mandatory field error | Improper information in one of the mandatory fields |\n| 2127 | Rejected-R27 |  | Trace number error | Original entry trace number is not valid for return entry; or addenda trace numbers do not correspond with entry detail record |\n| 2128 | Rejected-R28 |  | Transit routing number check digit error | Check digit for the transit routing number is incorrect |\n| 2129 | Rejected-R29 | E29 | Corporate customer advises not authorized | RDFI has been notified by corporate receiver that debit entry of originator is not authorized |\n| 2130 | Rejected-R30 |  | RDFI not participant in check truncation program | Financial institution not participating in automated check safekeeping application |\n| 2131 | Rejected-R31 |  | Permissible return entry (CCD and CTX only) | RDFI has been notified by the ODFI that it agrees to accept a CCD or CTX return entry |\n| 2132 | Rejected-R32 |  | RDFI non-settlement | RDFI is not able to settle the entry |\n| 2133 | Rejected-R33 |  | Return of XCK entry | RDFI determines at its sole discretion to return an XCK entry; an XCK return entry may be initiated by midnight of the sixtieth day following the settlement date if the XCK entry |\n| 2134 | Rejected-R34 |  | Limited participation RDFI | RDFI participation has been limited by a federal or state supervisor |\n| 2135 | Rejected-R35 |  | Return of improper debit entry | ACH debit not permitted for use with the CIE standard entry class code (except for reversals) |\n| 2136 | Rejected-R36 |  | Return of Improper Credit Entry |  |\n| 2137 | Rejected-R37 |  | Source Document Presented for Payment |  |\n| 2138 | Rejected-R38 |  | Stop Payment on Source Document |  |\n| 2139 | Rejected-R39 |  | Improper Source Document |  |\n| 2140 | Rejected-R40 |  | Return of ENR Entry by Federal Government Agency |  |\n| 2141 | Rejected-R41 |  | Invalid Transaction Code |  |\n| 2142 | Rejected-R42 |  | Routing Number/Check Digit Error |  |\n| 2143 | Rejected-R43 |  | Invalid DFI Account Number |  |\n| 2144 | Rejected-R44 |  | Invalid Individual ID Number/Identification |  |\n| 2145 | Rejected-R45 |  | Invalid Individual Name/Company Name |  |\n| 2146 | Rejected-R46 |  | Invalid Representative Payee Indicator |  |\n| 2147 | Rejected-R47 |  | Duplicate Enrollment |  |\n| 2150 | Rejected-R50 |  | State Law Affecting RCK Acceptance |  |\n| 2151 | Rejected-R51 |  | Item is Ineligible, Notice Not Provided, etc. |  |\n| 2152 | Rejected-R52 |  | Stop Payment on Item (adjustment entries) |  |\n| 2153 | Rejected-R53 |  | Item and ACH Entry Presented for Payment |  |\n| 2161 | Rejected-R61 |  | Misrouted Return |  |\n| 2162 | Rejected-R62 |  | Incorrect Trace Number |  |\n| 2163 | Rejected-R63 |  | Incorrect Dollar Amount |  |\n| 2164 | Rejected-R64 |  | Incorrect Individual Identification |  |\n| 2165 | Rejected-R65 |  | Incorrect Transaction Code |  |\n| 2166 | Rejected-R66 |  | Incorrect Company Identification |  |\n| 2167 | Rejected-R67 |  | Duplicate Return |  |\n| 2168 | Rejected-R68 |  | Untimely Return |  |\n| 2169 | Rejected-R69 |  | Multiple Errors |  |\n| 2170 | Rejected-R70 |  | Permissible Return Entry Not Accepted |  |\n| 2171 | Rejected-R71 |  | Misrouted Dishonored Return |  |\n| 2172 | Rejected-R72 |  | Untimely Dishonored Return |  |\n| 2173 | Rejected-R73 |  | Timely Original Return |  |\n| 2174 | Rejected-R74 |  | Corrected Return |  |\n| 2180 | Rejected-R80 |  | Cross-Border Payment Coding Error |  |\n| 2181 | Rejected-R81 |  | Non-Participant in Cross-Border Program |  |\n| 2182 | Rejected-R82 |  | Invalid Foreign Receiving DFI Identification |  |\n| 2183 | Rejected-R83 |  | Foreign Receiving DFI Unable to Settle |  |\n| 2200 | Voided |  | Processor Void | The transaction was voided by the processor before being sent to the bank |\n| 2201 | Rejected-C01 |  |  |  |\n| 2202 | Rejected-C02 |  |  |  |\n| 2203 | Rejected-C03 |  |  |  |\n| 2204 | Rejected-C04 |  |  |  |\n| 2205 | Rejected-C05 |  |  |  |\n| 2206 | Rejected-C06 |  |  |  |\n| 2207 | Rejected-C07 |  |  |  |\n| 2208 | Rejected-C08 |  |  |  |\n| 2209 | Rejected-C09 |  |  |  |\n| 2210 | Rejected-C10 |  |  |  |\n| 2211 | Rejected-C11 |  |  |  |\n| 2212 | Rejected-C12 |  |  |  |\n| 2213 | Rejected-C13 |  |  |  |\n| 2261 | Rejected-C61 |  |  |  |\n| 2262 | Rejected-C62 |  |  |  |\n| 2263 | Rejected-C63 |  |  |  |\n| 2264 | Rejected-C64 |  |  |  |\n| 2265 | Rejected-C65 |  |  |  |\n| 2266 | Rejected-C66 |  |  |  |\n| 2267 | Rejected-C67 |  |  |  |\n| 2268 | Rejected-C68 |  |  |  |\n| 2269 | Rejected-C69 |  |  |  |\n| 2301 | Rejected-X01 |  | Misc Check 21 Return |  |\n| 2304 | Rejected-X04 |  | Invalid Image |  |\n| 2305 | Rejected-X05 | E95 | Breach of Warranty |  |\n| 2306 | Rejected-X06 | E96 | Counterfeit / Forgery |  |\n| 2307 | Rejected-X07 | E97 | Refer to Maker |  |\n| 2308 | Rejected-X08 |  | Maximum Payment Attempts |  |\n| 2309 | Rejected-X09 |  | Item Cannot be Re-presented |  |\n| 2310 | Rejected-X10 |  | Not Our Item |  |\n| 2321 | Rejected-X21 |  | Pay None |  |\n| 2322 | Rejected-X22 |  | Pay All |  |\n| 2323 | Rejected-X23 | E93 | Non-Negotiable |  |\n| 2329 | Rejected-X29 |  | Stale Dated |  |\n| 2345 | Rejected-X45 |  | Misc Return |  |\n| 2371 | Rejected-X71 |  | RCK - 2nd Time |  |\n| 2372 | Rejected-X72 |  | RCK Reject - ACH |  |\n| 2373 | Rejected-X73 |  | RCK Reject - Payer |  |",
                  example: 1000,
                },
                recurring_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    'A unique identifer used to associate a transaction with a Recurring.',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                settle_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  nullable: true,
                  description: 'Settle date',
                  example: '2021-12-01',
                },
                status_code: {
                  type: 'integer',
                  enum: [
                    101, 102, 111, 121, 131, 132, 133, 134, 191, 201, 301, 331,
                  ],
                  nullable: true,
                  description:
                    'Status ID - See status id section for more detail\n>101 - Sale cc Approved\n>\n>102 - Sale cc AuthOnly\n>\n>111 - Refund cc Refunded\n>\n>121 - Credit/Debit/Refund cc AvsOnly\n>\n>131 - Credit/Debit/Refund ach Pending Origination\n>\n>132 - Credit/Debit/Refund ach Originating\n>\n>133 - Credit/Debit/Refund ach Originated\n>\n>134 - Credit/Debit/Refund ach Settled\n>\n>191 - Settled (depracated - batches are now settled on the /v2/transactionbatches endpoint)\n>\n>201 - All cc/ach Voided\n>\n>301 - All cc/ach Declined\n>\n>331 - Credit/Debit/Refund ach Charged Back\n>',
                  example: 101,
                },
                transaction_batch_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    'For cc transactions, this is the id of the batch the transaction belongs to (not to be confused with batch number). This will be null for transactions that do not settle (void and authonly).',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                type_id: {
                  type: 'number',
                  format: 'float',
                  enum: [20, 21, 22, 30, 40, 50],
                  nullable: true,
                  description: 'Type ID - See type id section for more detail',
                  example: null,
                },
                verbiage: {
                  type: 'string',
                  nullable: true,
                  description:
                    'Verbiage -Do not use verbiage to see if the transaction was approved, use status_id',
                  example: 'APPROVED',
                },
                void_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  nullable: true,
                  description: 'void date',
                  example: '2021-12-01',
                },
                batch: {
                  type: 'string',
                  nullable: true,
                  description: 'Batch',
                  example: '2',
                },
                terms_agree: {
                  type: 'boolean',
                  description: 'Terms Agreement',
                  example: true,
                },
                response_message: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Response Message',
                  example: null,
                },
                return_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  nullable: true,
                  description: 'Return Date',
                  example: '2021-12-01',
                },
                trx_source_id: {
                  type: 'integer',
                  maximum: 99,
                  nullable: true,
                  description: 'How the transaction was obtained by the API.',
                  example: 8,
                },
              },
              required: ['id', 'created_ts', 'modified_ts', 'payment_method'],
            },
            description: 'Transaction Information on `expand`',
          },
          activeRecurrings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                account_vault_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Token ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                active: {
                  type: 'boolean',
                  description: 'Active',
                  example: true,
                },
                description: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Description',
                  example: 'Description',
                },
                end_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  nullable: true,
                  description: 'End date',
                  example: '2021-12-01',
                },
                installment_total_count: {
                  type: 'integer',
                  minimum: 1,
                  maximum: 999,
                  nullable: true,
                  description: 'Installment Total Count',
                  example: 20,
                },
                interval: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 365,
                  description: 'Interval',
                  example: 1,
                },
                interval_type: {
                  type: 'string',
                  enum: ['d', 'w', 'm'],
                  description: 'Interval Type',
                  example: 'd',
                },
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                notification_days: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 365,
                  nullable: true,
                  description: 'Notification Days',
                  example: 2,
                },
                payment_method: {
                  type: 'string',
                  enum: ['cc', 'ach'],
                  description: 'Payment Method',
                  example: 'cc',
                },
                product_transaction_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Product Transaction ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                recurring_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Recurring ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                recurring_api_id: {
                  type: 'string',
                  maxLength: 64,
                  nullable: true,
                  description: 'Recurring Api ID',
                  example: 'recurring1234abcd',
                },
                start_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  description: 'Start date',
                  example: '2021-12-01',
                },
                status: {
                  type: 'string',
                  enum: ['active', 'on hold', 'ended'],
                  description: 'Status',
                  example: 'active',
                },
                transaction_amount: {
                  type: 'number',
                  format: 'double',
                  description: 'Transaction amount',
                  example: 3,
                },
                terms_agree: {
                  type: 'boolean',
                  description: 'Terms Agree',
                  example: true,
                },
                terms_agree_ip: {
                  type: 'string',
                  nullable: true,
                  description: 'Terms Agree Ip',
                  example: '192.168.0.10',
                },
                recurring_c1: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description: 'Custom field used for integrations',
                  example: 'recurring custom data 1',
                },
                recurring_c2: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description: 'Custom field used for integrations',
                  example: 'recurring custom data 2',
                },
                recurring_c3: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description: 'Custom field used for integrations',
                  example: 'recurring custom data 3',
                },
                send_to_proc_as_recur: {
                  type: 'boolean',
                  description: 'Send To Proc As Recur',
                  example: true,
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Recurring ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                next_run_date: {
                  type: 'string',
                  pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                  maxLength: 10,
                  description: 'Next Run Date',
                  example: '2021-12-01',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                recurring_type_id: {
                  type: 'string',
                  enum: ['o', 'i'],
                  description: 'Recurring Type',
                  example: 'i',
                },
              },
              required: [
                'account_vault_id',
                'active',
                'interval',
                'interval_type',
                'location_id',
                'payment_method',
                'start_date',
                'status',
                'transaction_amount',
                'id',
                'next_run_date',
                'created_ts',
                'modified_ts',
                'recurring_type_id',
              ],
            },
            description: 'ActiveRecurring Information on `expand`',
          },
          is_deletable: {
            type: 'boolean',
            description: 'Is Deletable Information on `expand`',
            example: true,
          },
          signature: {
            type: 'object',
            properties: {
              signature: {
                type: 'string',
                description: 'Signature',
                example:
                  'iVBORw0KGgoAAAANSUhEUgAAANwAAAAsCAYAAAAOyNaYAAACvklEQVR4nO3bLZOqUBjA8ScaNxqNRiKRaCQaiXwEG7cRiUajH8FINBqJRCKR+NxyD4OIXtaXw2H3/5s5MwZ39rgz/zkvuKKqgar+YTAYnx/y7wUACwgOsIjgAIsIznFlWerlcpl6GngTgnNYVVW6WCxURDTLsqmngzcgOMdtNhsVERURDYJA8zyfekp4AcE5oCgKzfN8cOvYNM1VdCKiURRNMEu8A8FNrCzLm5j68Q1Fx2o3TwTngCzLNAiCq6D6UTVNo0mS6NfXF+HNGME5or+KeZ7XxrVcLjWOY83zXOu6vnqfeQ/bzHkgOIf0VzHP83Sz2eh6vW4D831fy7JsowvDsH1NdO4jOAfVdX0VXhRFWhSFRlHUrmr7/b4NLU3T9jVbTLcRnMO620ezep1Op3bF832/3XIORQr3EJzjumc7E9HQBUoYhjdnPKJzD8E5xjyT647T6aSr1UpFRPf7ffveuq41TdOHZzyicwvBTeBeVGEY3jwaGBrmWV3/Z82K1z/jca5zB8F9wFBQY6JaLBYax7EmSXJ3DD2v624rzUpoVrsgCDjXOWRWwVVVNfUUrvTDGrNK3YsqTdNRn69pGs2y7NshssV0w2yCK4pCRUSPx+Okc/hfWI9WqbFRPaMbYjc+s7ptt1uic8BsgsvzXEVED4fDR3/P2PPVUFifDOo7THxmPiY03/fZXk7s1wR371z1zPnKlbDGuvc9TKKz78cE9yio3W436vbv1fOV6/oPx010/Ee5PbMLbrfbPRWU53kPb/9+SlRj9L8ALcJ/lNsym+DO5/PTQaVpqnVdT/0RnGLOed0LlikvpH6L2QSnqoPX4QT1mu4FC3/Dz5tVcMDcERxgEcEBFhEcYBHBARYRHGARwQEWERxgEcEBFhEcYBHBARYRHGARwQEWERxgEcEBFhEcYBHBARYRHGDRX+EC0ah++pNrAAAAAElFTkSuQmCC',
              },
              resource: {
                type: 'string',
                enum: [
                  'Recurring',
                  'Transaction',
                  'AccountVault',
                  'DeviceTerm',
                ],
                description: 'Resource',
                example: 'Transaction',
              },
              resource_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Resource ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Signature ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
            },
            required: [
              'signature',
              'resource',
              'resource_id',
              'id',
              'created_ts',
              'modified_ts',
            ],
            description: 'Signature Information on `expand`',
          },
          created_user: {
            type: 'object',
            properties: {
              account_number: {
                type: 'string',
                nullable: true,
                description: 'Account Number',
                example: '5454545454545454',
              },
              address: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description: 'Address',
                example: '43155 Main Street STE 2310-C',
              },
              branding_domain_url: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Branding Domain Url',
                example: '{branding_domain_url}',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell Phone',
                example: '3339998822',
              },
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description: 'City',
                example: 'Novi',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              contact_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Contact',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Date Of Birth',
                example: '2021-12-01',
              },
              domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 128,
                description: 'Email',
                example: 'email@domain.com',
              },
              email_trx_receipt: {
                type: 'boolean',
                description: 'Email Trx Receipt',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Home Phone',
                example: '3339998822',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              locale: {
                type: 'string',
                maxLength: 8,
                nullable: true,
                description: 'Locale',
                example: 'en-US',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office Phone',
                example: '3339998822',
              },
              office_ext_phone: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Office Ext Phone',
                example: '5',
              },
              primary_location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Primary Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              requires_new_password: {
                type: 'string',
                maxLength: 1,
                nullable: true,
                description: 'Requires New Password',
                example: null,
              },
              state: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description: 'State',
                example: 'Michigan',
              },
              terms_condition_code: {
                type: 'string',
                nullable: true,
                description:
                  'Terms Condition (This field is required when updating your own password).',
                example: '20220308',
              },
              tz: {
                type: 'string',
                maxLength: 30,
                description: 'Time zone',
                example: 'America/New_York',
              },
              ui_prefs: {
                type: 'object',
                properties: {
                  entry_page: {
                    type: 'string',
                    nullable: true,
                    description: 'Ui Prefs Entry Page',
                    example: 'dashboard',
                  },
                  page_size: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 99,
                    nullable: true,
                    description: 'Ui Prefs Page Size',
                    example: 2,
                  },
                  report_export_type: {
                    type: 'string',
                    enum: ['csv', 'tsv', 'xls', 'xlsx'],
                    nullable: true,
                    description: 'Ui Prefs Export Type',
                    example: 'csv',
                  },
                  process_method: {
                    type: 'string',
                    enum: ['virtual_terminal', 'physical_terminal'],
                    nullable: true,
                    description: 'Ui Prefs Process Method',
                    example: 'virtual_terminal',
                  },
                  default_terminal: {
                    type: 'string',
                    pattern:
                      '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                    nullable: true,
                    description: 'Ui Prefs Default Termianl',
                    example: '11e95f8ec39de8fbdb0a4f1a',
                  },
                },
                description: 'Ui Prefs',
              },
              username: {
                type: 'string',
                minLength: 2,
                maxLength: 64,
                description: 'Username',
                example: '{user_name}',
              },
              user_api_key: {
                type: 'string',
                minLength: 16,
                maxLength: 64,
                nullable: true,
                description: 'User Api Key',
                example: '234bas8dfn8238f923w2',
              },
              user_hash_key: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description: 'User Hash Key',
                example: null,
              },
              user_type_code: {
                type: 'integer',
                enum: [200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 100],
                description: 'User Type',
                example: 100,
              },
              password: {
                type: 'string',
                pattern:
                  '^(?=.*[`!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>/?~])(?=.*[0-9])(?=.*[a-zA-Z]).*$',
                minLength: 8,
                maxLength: 128,
                nullable: true,
                description: 'Password',
                example: null,
              },
              zip: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description: 'Zip',
                example: '48375',
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_api_id: {
                type: 'string',
                nullable: true,
                description: 'ContactApi Id',
                example: null,
              },
              primary_location_api_id: {
                type: 'string',
                nullable: true,
                description: 'Primary LocationApi ID',
                example: null,
              },
              status_id: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'User ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              status: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              login_attempts: {
                type: 'number',
                format: 'float',
                description: 'Login Attempts',
                example: 0,
              },
              last_login_ts: {
                type: 'integer',
                description: 'Last Login',
                example: 1422040992,
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Created User',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terms_accepted_ts: {
                type: 'integer',
                nullable: true,
                description: 'Terms Accepted',
                example: 1422040992,
              },
              terms_agree_ip: {
                type: 'string',
                maxLength: 16,
                nullable: true,
                description: 'Terms Agree Ip',
                example: '192.168.0.10',
              },
              current_date_time: {
                type: 'string',
                maxLength: 24,
                description: 'Current Date Time',
                example: '2019-03-11T10:38:26-0700',
              },
            },
            required: [
              'email',
              'last_name',
              'primary_location_id',
              'tz',
              'username',
              'user_type_code',
              'id',
              'status',
              'login_attempts',
              'last_login_ts',
              'created_ts',
              'modified_ts',
              'created_user_id',
              'current_date_time',
            ],
            description: 'User Information on `expand`',
          },
          changelogs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Change Log ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                action: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Action',
                  example: 'CREATE',
                },
                model: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Model',
                  example: 'TransactionRequest',
                },
                model_id: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Model ID',
                  example: '11ec829598f0d4008be9aba4',
                },
                user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                changelog_details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        pattern:
                          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                        nullable: true,
                        description: 'ID',
                        example: '11e95f8ec39de8fbdb0a4f1a',
                      },
                      changelog_id: {
                        type: 'string',
                        pattern:
                          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                        nullable: true,
                        description: 'Changelog ID',
                        example: '11e95f8ec39de8fbdb0a4f1a',
                      },
                      field: {
                        type: 'string',
                        nullable: true,
                        description: 'Field',
                        example: 'next_run_ts',
                      },
                      old_value: {
                        type: 'string',
                        nullable: true,
                        description: 'Old Value',
                        example: '1643616000',
                      },
                    },
                  },
                  description: 'Change Log Details',
                },
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      pattern:
                        '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                      nullable: true,
                      description: 'ID',
                      example: '11e95f8ec39de8fbdb0a4f1a',
                    },
                    username: {
                      type: 'string',
                      nullable: true,
                      description: 'Username',
                      example: 'email@domain.com',
                    },
                    first_name: {
                      type: 'string',
                      nullable: true,
                      description: 'First Name',
                      example: 'Bob',
                    },
                    last_name: {
                      type: 'string',
                      nullable: true,
                      description: 'Last Name',
                      example: 'Fairview',
                    },
                  },
                  description: 'User',
                },
              },
              required: ['id'],
            },
            description: 'Changelog Information on `expand`',
          },
          account_vault_cau_logs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Token CAU Log ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                product_transaction_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Product Transaction ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                account_vault_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Token ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                created_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID Created the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: ['id'],
            },
            description: 'Token Cau Log Information on `expand`',
          },
          account_vault_cau_product_transactions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                account_number: {
                  type: 'string',
                  pattern: '^[a-zA-Z0-9\\-_]+$',
                  maxLength: 32,
                  nullable: true,
                  description: 'Account number',
                  example: '5454545454545454',
                },
                address: {
                  type: 'object',
                  properties: {
                    city: {
                      type: 'string',
                      pattern: "^[\\w#,.\\-'&\\s/]+$",
                      maxLength: 36,
                      nullable: true,
                      description: 'City name',
                      example: 'Novi',
                    },
                    state: {
                      type: 'string',
                      minLength: 2,
                      maxLength: 2,
                      nullable: true,
                      description: 'State name',
                      example: 'MI',
                    },
                    postal_code: {
                      type: 'string',
                      pattern: '^[a-zA-Z0-9\\-\\s]+$',
                      minLength: 4,
                      maxLength: 10,
                      nullable: true,
                      description: 'Postal code',
                      example: '48375',
                    },
                    country: {
                      type: 'string',
                      enum: ['US', 'CA'],
                      nullable: true,
                      description: 'Country',
                      example: 'US',
                    },
                    street: {
                      type: 'string',
                      pattern: "^[\\w#,.\\-'&\\s/]+$",
                      maxLength: 255,
                      nullable: true,
                      description: 'Street',
                      example: '43155 Main Street STE 2310-C',
                    },
                    street2: {
                      type: 'string',
                      pattern: "^[\\w#,.\\-'&\\s/]+$",
                      maxLength: 255,
                      nullable: true,
                      description: 'Street 2',
                      example: '43155 Main Street STE 2310-C',
                    },
                  },
                  description: 'Address',
                },
                branding_domain_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'GUID for Branding Domain',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                contact_email_trx_receipt_default: {
                  type: 'boolean',
                  description:
                    'If true, will email contact receipt for any transaction',
                  example: true,
                },
                default_ach: {
                  type: 'string',
                  minLength: 24,
                  maxLength: 36,
                  nullable: true,
                  description:
                    "GUID for Location's default ACH Product Transaction",
                  example: '11e608a7d515f1e093242bb2',
                },
                default_cc: {
                  type: 'string',
                  minLength: 24,
                  maxLength: 36,
                  nullable: true,
                  description:
                    "GUID for Location's default CC Product Transaction",
                  example: '11e608a442a5f1e092242dda',
                },
                developer_company_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'GUID for Developer Company',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                email_reply_to: {
                  type: 'string',
                  format: 'email',
                  maxLength: 64,
                  nullable: true,
                  description:
                    'Used as from email address when sending various notifications',
                  example: 'email@domain.com',
                },
                fax: {
                  type: 'string',
                  pattern: '^\\d{10}$',
                  minLength: 10,
                  maxLength: 10,
                  nullable: true,
                  description: 'Fax number',
                  example: '3339998822',
                },
                location_api_id: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Location api ID',
                  example: 'location-111111',
                },
                location_api_key: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Location api key',
                  example: 'AE34BBCAADF4AE34BBCAADF4',
                },
                location_c1: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Can be used to store custom information for location.',
                  example: 'custom 1',
                },
                location_c2: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Can be used to store custom information for location.',
                  example: 'custom 2',
                },
                location_c3: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Can be used to store custom information for location.',
                  example: 'custom data 3',
                },
                name: {
                  type: 'string',
                  maxLength: 64,
                  minLength: 1,
                  description: 'Name of the company',
                  example: 'Sample Company Headquarters',
                },
                office_phone: {
                  type: 'string',
                  minLength: 10,
                  maxLength: 10,
                  nullable: true,
                  description: 'Office phone number',
                  example: '2481234567',
                },
                office_ext_phone: {
                  type: 'string',
                  maxLength: 10,
                  nullable: true,
                  description: 'Office phone extension number',
                  example: '1021021209',
                },
                recurring_notification_days_default: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 365,
                  nullable: true,
                  description:
                    'Number of days prior to a Recurring running that a notification should be sent',
                  example: 0,
                },
                tz: {
                  type: 'string',
                  maxLength: 30,
                  nullable: true,
                  description: 'Time zone',
                  example: 'America/New_York',
                },
                parent_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location GUID of the parent location',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                ticket_hash_key: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Ticket Hash Key',
                  example: 'A5F443CADF4AE34BBCAADF4',
                },
              },
              required: [
                'id',
                'created_ts',
                'modified_ts',
                'name',
                'parent_id',
              ],
            },
            description:
              'Token Cau Product Transaction Information on `expand`',
          },
        },
        required: [
          'location_id',
          'id',
          'account_type',
          'cau_summary_status_id',
          'created_ts',
          'first_six',
          'has_recurring',
          'last_four',
          'modified_ts',
          'payment_method',
        ],
      },
    },
    required: ['type'],
  },
  responseUser: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['User'],
        description: 'Resource Type',
        example: 'User',
        default: 'User',
      },
      data: {
        type: 'object',
        properties: {
          account_number: {
            type: 'string',
            nullable: true,
            description: 'Account Number',
            example: '5454545454545454',
          },
          address: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description: 'Address',
            example: '43155 Main Street STE 2310-C',
          },
          branding_domain_url: {
            type: 'string',
            maxLength: 64,
            nullable: true,
            description: 'Branding Domain Url',
            example: '{branding_domain_url}',
          },
          cell_phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description: 'Cell Phone',
            example: '3339998822',
          },
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description: 'City',
            example: 'Novi',
          },
          company_name: {
            type: 'string',
            maxLength: 64,
            nullable: true,
            description: 'Company Name',
            example: 'Fortis Payment Systems, LLC',
          },
          contact_id: {
            type: 'string',
            nullable: true,
            description: 'Contact Id Information on `expand`',
            example: 'Sample contact ID',
          },
          date_of_birth: {
            type: 'string',
            pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
            maxLength: 10,
            nullable: true,
            description: 'Date Of Birth',
            example: '2021-12-01',
          },
          domain_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description: 'Domain',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          email: {
            type: 'string',
            format: 'email',
            maxLength: 128,
            description: 'Email',
            example: 'email@domain.com',
          },
          email_trx_receipt: {
            type: 'boolean',
            description: 'Email Trx Receipt',
            example: true,
          },
          home_phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description: 'Home Phone',
            example: '3339998822',
          },
          first_name: {
            type: 'string',
            maxLength: 64,
            nullable: true,
            description: 'First Name',
            example: 'John',
          },
          last_name: {
            type: 'string',
            maxLength: 64,
            description: 'Last Name',
            example: 'Smith',
          },
          locale: {
            type: 'string',
            maxLength: 8,
            nullable: true,
            description: 'Locale',
            example: 'en-US',
          },
          office_phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description: 'Office Phone',
            example: '3339998822',
          },
          office_ext_phone: {
            type: 'string',
            pattern: '^\\d{1,10}$',
            maxLength: 10,
            nullable: true,
            description: 'Office Ext Phone',
            example: '5',
          },
          primary_location_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'Primary Location ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          requires_new_password: {
            type: 'string',
            maxLength: 1,
            nullable: true,
            description: 'Requires New Password',
            example: null,
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description: 'State',
            example: 'Michigan',
          },
          terms_condition_code: {
            type: 'string',
            nullable: true,
            description:
              'Terms Condition (This field is required when updating your own password).',
            example: '20220308',
          },
          tz: {
            type: 'string',
            maxLength: 30,
            description: 'Time zone',
            example: 'America/New_York',
          },
          ui_prefs: {
            type: 'object',
            properties: {
              entry_page: {
                type: 'string',
                nullable: true,
                description: 'Ui Prefs Entry Page',
                example: 'dashboard',
              },
              page_size: {
                type: 'integer',
                minimum: 0,
                maximum: 99,
                nullable: true,
                description: 'Ui Prefs Page Size',
                example: 2,
              },
              report_export_type: {
                type: 'string',
                enum: ['csv', 'tsv', 'xls', 'xlsx'],
                nullable: true,
                description: 'Ui Prefs Export Type',
                example: 'csv',
              },
              process_method: {
                type: 'string',
                enum: ['virtual_terminal', 'physical_terminal'],
                nullable: true,
                description: 'Ui Prefs Process Method',
                example: 'virtual_terminal',
              },
              default_terminal: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Ui Prefs Default Termianl',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            description: 'Ui Prefs',
          },
          username: {
            type: 'string',
            minLength: 2,
            maxLength: 64,
            description: 'Username',
            example: '{user_name}',
          },
          user_api_key: {
            type: 'string',
            minLength: 16,
            maxLength: 64,
            nullable: true,
            description: 'User Api Key',
            example: '234bas8dfn8238f923w2',
          },
          user_hash_key: {
            type: 'string',
            minLength: 24,
            maxLength: 36,
            nullable: true,
            description: 'User Hash Key',
            example: null,
          },
          user_type_code: {
            type: 'integer',
            enum: [200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 100],
            description: 'User Type',
            example: 100,
          },
          password: {
            type: 'string',
            pattern:
              '^(?=.*[`!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>/?~])(?=.*[0-9])(?=.*[a-zA-Z]).*$',
            minLength: 8,
            maxLength: 128,
            nullable: true,
            description: 'Password',
            example: null,
          },
          zip: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description: 'Zip',
            example: '48375',
          },
          location_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description: 'Location ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          contact_api_id: {
            type: 'string',
            nullable: true,
            description: 'ContactApi Id',
            example: null,
          },
          primary_location_api_id: {
            type: 'string',
            nullable: true,
            description: 'Primary LocationApi ID',
            example: null,
          },
          status_id: {
            type: 'boolean',
            description: 'Status',
            example: true,
          },
          id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'User ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          status: {
            type: 'boolean',
            description: 'Status',
            example: true,
          },
          login_attempts: {
            type: 'number',
            format: 'float',
            description: 'Login Attempts',
            example: 0,
          },
          last_login_ts: {
            type: 'integer',
            description: 'Last Login',
            example: 1422040992,
          },
          created_ts: {
            type: 'integer',
            description: 'Created Time Stamp',
            example: 1422040992,
          },
          modified_ts: {
            type: 'integer',
            description: 'Modified Time Stamp',
            example: 1422040992,
          },
          created_user_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'Created User',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          terms_accepted_ts: {
            type: 'integer',
            nullable: true,
            description: 'Terms Accepted',
            example: 1422040992,
          },
          terms_agree_ip: {
            type: 'string',
            maxLength: 16,
            nullable: true,
            description: 'Terms Agree Ip',
            example: '192.168.0.10',
          },
          current_date_time: {
            type: 'string',
            maxLength: 24,
            description: 'Current Date Time',
            example: '2019-03-11T10:38:26-0700',
          },
          locations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                account_number: {
                  type: 'string',
                  pattern: '^[a-zA-Z0-9\\-_]+$',
                  maxLength: 32,
                  nullable: true,
                  description: 'Account number',
                  example: '5454545454545454',
                },
                address: {
                  type: 'object',
                  properties: {
                    city: {
                      type: 'string',
                      pattern: "^[\\w#,.\\-'&\\s/]+$",
                      maxLength: 36,
                      nullable: true,
                      description: 'City name',
                      example: 'Novi',
                    },
                    state: {
                      type: 'string',
                      minLength: 2,
                      maxLength: 2,
                      nullable: true,
                      description: 'State name',
                      example: 'MI',
                    },
                    postal_code: {
                      type: 'string',
                      pattern: '^[a-zA-Z0-9\\-\\s]+$',
                      minLength: 4,
                      maxLength: 10,
                      nullable: true,
                      description: 'Postal code',
                      example: '48375',
                    },
                    country: {
                      type: 'string',
                      enum: ['US', 'CA'],
                      nullable: true,
                      description: 'Country',
                      example: 'US',
                    },
                    street: {
                      type: 'string',
                      pattern: "^[\\w#,.\\-'&\\s/]+$",
                      maxLength: 255,
                      nullable: true,
                      description: 'Street',
                      example: '43155 Main Street STE 2310-C',
                    },
                    street2: {
                      type: 'string',
                      pattern: "^[\\w#,.\\-'&\\s/]+$",
                      maxLength: 255,
                      nullable: true,
                      description: 'Street 2',
                      example: '43155 Main Street STE 2310-C',
                    },
                  },
                  description: 'Address',
                },
                branding_domain_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'GUID for Branding Domain',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                contact_email_trx_receipt_default: {
                  type: 'boolean',
                  description:
                    'If true, will email contact receipt for any transaction',
                  example: true,
                },
                default_ach: {
                  type: 'string',
                  minLength: 24,
                  maxLength: 36,
                  nullable: true,
                  description:
                    "GUID for Location's default ACH Product Transaction",
                  example: '11e608a7d515f1e093242bb2',
                },
                default_cc: {
                  type: 'string',
                  minLength: 24,
                  maxLength: 36,
                  nullable: true,
                  description:
                    "GUID for Location's default CC Product Transaction",
                  example: '11e608a442a5f1e092242dda',
                },
                developer_company_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'GUID for Developer Company',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                email_reply_to: {
                  type: 'string',
                  format: 'email',
                  maxLength: 64,
                  nullable: true,
                  description:
                    'Used as from email address when sending various notifications',
                  example: 'email@domain.com',
                },
                fax: {
                  type: 'string',
                  pattern: '^\\d{10}$',
                  minLength: 10,
                  maxLength: 10,
                  nullable: true,
                  description: 'Fax number',
                  example: '3339998822',
                },
                location_api_id: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Location api ID',
                  example: 'location-111111',
                },
                location_api_key: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Location api key',
                  example: 'AE34BBCAADF4AE34BBCAADF4',
                },
                location_c1: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Can be used to store custom information for location.',
                  example: 'custom 1',
                },
                location_c2: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Can be used to store custom information for location.',
                  example: 'custom 2',
                },
                location_c3: {
                  type: 'string',
                  maxLength: 128,
                  nullable: true,
                  description:
                    'Can be used to store custom information for location.',
                  example: 'custom data 3',
                },
                name: {
                  type: 'string',
                  maxLength: 64,
                  minLength: 1,
                  description: 'Name of the company',
                  example: 'Sample Company Headquarters',
                },
                office_phone: {
                  type: 'string',
                  minLength: 10,
                  maxLength: 10,
                  nullable: true,
                  description: 'Office phone number',
                  example: '2481234567',
                },
                office_ext_phone: {
                  type: 'string',
                  maxLength: 10,
                  nullable: true,
                  description: 'Office phone extension number',
                  example: '1021021209',
                },
                recurring_notification_days_default: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 365,
                  nullable: true,
                  description:
                    'Number of days prior to a Recurring running that a notification should be sent',
                  example: 0,
                },
                tz: {
                  type: 'string',
                  maxLength: 30,
                  nullable: true,
                  description: 'Time zone',
                  example: 'America/New_York',
                },
                parent_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location GUID of the parent location',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                ticket_hash_key: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Ticket Hash Key',
                  example: 'A5F443CADF4AE34BBCAADF4',
                },
              },
              required: [
                'id',
                'created_ts',
                'modified_ts',
                'name',
                'parent_id',
              ],
            },
            description: 'Location Information on `expand`',
          },
          primary_location: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              account_number: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-_]+$',
                maxLength: 32,
                nullable: true,
                description: 'Account number',
                example: '5454545454545454',
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City name',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 2,
                    nullable: true,
                    description: 'State name',
                    example: 'MI',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street',
                    example: '43155 Main Street STE 2310-C',
                  },
                  street2: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street 2',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address',
              },
              branding_domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'GUID for Branding Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_email_trx_receipt_default: {
                type: 'boolean',
                description:
                  'If true, will email contact receipt for any transaction',
                example: true,
              },
              default_ach: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description:
                  "GUID for Location's default ACH Product Transaction",
                example: '11e608a7d515f1e093242bb2',
              },
              default_cc: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description:
                  "GUID for Location's default CC Product Transaction",
                example: '11e608a442a5f1e092242dda',
              },
              developer_company_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'GUID for Developer Company',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email_reply_to: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description:
                  'Used as from email address when sending various notifications',
                example: 'email@domain.com',
              },
              fax: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Fax number',
                example: '3339998822',
              },
              location_api_id: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Location api ID',
                example: 'location-111111',
              },
              location_api_key: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Location api key',
                example: 'AE34BBCAADF4AE34BBCAADF4',
              },
              location_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom 1',
              },
              location_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom 2',
              },
              location_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom data 3',
              },
              name: {
                type: 'string',
                maxLength: 64,
                minLength: 1,
                description: 'Name of the company',
                example: 'Sample Company Headquarters',
              },
              office_phone: {
                type: 'string',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office phone number',
                example: '2481234567',
              },
              office_ext_phone: {
                type: 'string',
                maxLength: 10,
                nullable: true,
                description: 'Office phone extension number',
                example: '1021021209',
              },
              recurring_notification_days_default: {
                type: 'integer',
                minimum: 0,
                maximum: 365,
                nullable: true,
                description:
                  'Number of days prior to a Recurring running that a notification should be sent',
                example: 0,
              },
              tz: {
                type: 'string',
                maxLength: 30,
                nullable: true,
                description: 'Time zone',
                example: 'America/New_York',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location GUID of the parent location',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              ticket_hash_key: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Ticket Hash Key',
                example: 'A5F443CADF4AE34BBCAADF4',
              },
            },
            required: ['id', 'created_ts', 'modified_ts', 'name', 'parent_id'],
            description: 'Primary Location Information on `expand`',
          },
          received_emails: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                subject: {
                  type: 'string',
                  maxLength: 256,
                  description: 'Subject',
                  example: 'Payment Receipt - 12skiestech',
                },
                body: {
                  type: 'string',
                  description: 'Body',
                  example: 'This email is being sent from a server.',
                },
                source_address: {
                  type: 'string',
                  maxLength: 64,
                  description: 'Source Address',
                  example: '"12skiestech A7t3qi" <noreply@zeamster.email>',
                },
                return_path: {
                  type: 'string',
                  maxLength: 64,
                  description: 'Return Path',
                  example: '"12skiestech A7t3qi" <noreply@zeamster.email>',
                },
                provider_id: {
                  type: 'string',
                  maxLength: 60,
                  nullable: true,
                  description: 'Provider',
                  example:
                    '0100017e67bcc530-e1dd23b4-8a39-4a5b-8d5d-68d51c4c942f-000000',
                },
                domain_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Domain',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                reason_sent: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Reason Sent',
                  example: 'Contact Email',
                },
                reason_model: {
                  type: 'string',
                  maxLength: 64,
                  enum: [
                    'Contact',
                    'Transaction',
                    'Recurring',
                    'User',
                    'ProductTransaction',
                    'TransactionBatch',
                    'QuickInvoice',
                    'DataExport',
                    'UserReportSchedule',
                    'UserReport',
                    'Paylink',
                  ],
                  nullable: true,
                  description: 'Reason Model',
                  example: 'Transaction',
                },
                reason_model_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Reason Model',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                reply_to: {
                  type: 'string',
                  maxLength: 520,
                  nullable: true,
                  description: 'Reply To',
                  example: '"Zeamster" <emma.p@zeamster.com>',
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Log Email Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
              },
              required: [
                'subject',
                'body',
                'source_address',
                'return_path',
                'id',
                'created_ts',
              ],
            },
            description: 'Received Email Information on `expand`',
          },
          contact: {
            type: 'object',
            properties: {
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              account_number: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Contact Account Number',
                example: '54545433332',
              },
              contact_api_id: {
                type: 'string',
                pattern: '^[a-zA-Z0-9]*$',
                maxLength: 64,
                nullable: true,
                description: 'Contact API Id',
                example: '137',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell phone of contact',
                example: '3339998822',
              },
              balance: {
                type: 'number',
                format: 'double',
                minimum: -99999999.99,
                maximum: 99999999.99,
                nullable: true,
                description: 'Balance',
                example: 245.36,
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City of contact',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    maxLength: 24,
                    nullable: true,
                    description: 'State of contact',
                    example: 'Michigan',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code of contact',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country of contact',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street of contact',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address of contact',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              header_message: {
                type: 'string',
                maxLength: 250,
                nullable: true,
                description: 'Header Message',
                example: 'This is a sample message for you',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts DOB, Format: yyyy-MM-dd',
                example: '2021-12-01',
              },
              email_trx_receipt: {
                type: 'boolean',
                description:
                  'Whether or not to email all transactions receipts to contact (1 or 0)',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts home phone',
                example: '3339998822',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone',
                example: '3339998822',
              },
              office_phone_ext: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone extension for office phone',
                example: '5',
              },
              header_message_type: {
                type: 'integer',
                minimum: 0,
                maximum: 4,
                description: 'Header Message Type',
                example: 0,
              },
              update_if_exists: {
                type: 'number',
                format: 'float',
                enum: [1],
                nullable: true,
                description: 'Update If Exists',
                example: 1,
              },
              contact_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 1 for api users to store custom data',
                example: 'any',
              },
              contact_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 2 for api users to store custom data',
                example: 'anything',
              },
              contact_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 3 for api users to store custom data',
                example: 'something',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Parent Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description: 'Email of contact',
                example: 'email@domain.com',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Contact ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              active: {
                type: 'boolean',
                description: 'Active',
                example: true,
              },
            },
            required: [
              'location_id',
              'last_name',
              'email_trx_receipt',
              'header_message_type',
              'id',
              'created_ts',
              'modified_ts',
              'active',
            ],
            description: 'Contact Information on `expand`',
          },
          isDeletable: {
            type: 'boolean',
            description: 'Is Deletable Information on `expand`',
            example: true,
          },
          active_notification_alerts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                location_api_id: {
                  type: 'string',
                  nullable: true,
                  description: 'Location Api ID',
                  example: null,
                },
                date_start: {
                  type: 'string',
                  pattern:
                    '^[\\d]{4}-[\\d]{2}-[\\d]{2}\\s[\\d]{2}:[\\d]{2}:[\\d]{2}$',
                  maxLength: 19,
                  description: 'Date Start',
                  example: '2021-12-01 10:10:00',
                },
                date_end: {
                  type: 'string',
                  pattern:
                    '^[\\d]{4}-[\\d]{2}-[\\d]{2}\\s[\\d]{2}:[\\d]{2}:[\\d]{2}$',
                  maxLength: 19,
                  description: 'Date End',
                  example: '2021-12-01 10:10:00',
                },
                user_location: {
                  type: 'boolean',
                  description: 'User Location',
                  example: true,
                },
                user_contact: {
                  type: 'boolean',
                  description: 'User Contact',
                  example: true,
                },
                include_children: {
                  type: 'boolean',
                  description: 'Include Children',
                  example: true,
                },
                alert_type: {
                  type: 'number',
                  format: 'float',
                  enum: [0, 1, 2, 3, 4, 5],
                  nullable: true,
                  description: 'Alert Type',
                  example: 1,
                },
                alert_type_id: {
                  type: 'number',
                  format: 'float',
                  enum: [0, 1, 2, 3, 4, 5],
                  nullable: true,
                  description: 'Alert Type ID',
                  example: 1,
                },
                description: {
                  type: 'string',
                  maxLength: 32,
                  nullable: true,
                  description: 'Description',
                  example: null,
                },
                alert_message: {
                  type: 'string',
                  nullable: true,
                  description: 'Alert Message',
                  example: null,
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Notification Alert ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                created_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID Created the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                modified_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Last User ID that updated the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: [
                'date_start',
                'date_end',
                'id',
                'created_ts',
                'modified_ts',
              ],
            },
            description: 'Active Notification Alert Information on `expand`',
          },
          location_users: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'User ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                location_api_id: {
                  type: 'string',
                  nullable: true,
                  description: ' ',
                  example: null,
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: ' ',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                created_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'User ID Created the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                modified_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Last User ID that updated the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: [
                'location_id',
                'user_id',
                'id',
                'created_ts',
                'modified_ts',
                'created_user_id',
                'modified_user_id',
              ],
            },
            description: 'Location User Information on `expand`',
          },
          auth_roles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'User ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                auth_role_code: {
                  type: 'integer',
                  description: 'Auth Role Code',
                  example: 110,
                },
                code: {
                  type: 'integer',
                  description: 'Auth Role User Code',
                  example: 83931,
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                created_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    'System generated id for user who created record',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                modified_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description:
                    'System generated id for user who created record',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: [
                'user_id',
                'auth_role_code',
                'code',
                'created_ts',
                'modified_ts',
              ],
            },
            description: 'Auth Role Information on `expand`',
          },
          changelogs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Change Log ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                action: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Action',
                  example: 'CREATE',
                },
                model: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Model',
                  example: 'TransactionRequest',
                },
                model_id: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Model ID',
                  example: '11ec829598f0d4008be9aba4',
                },
                user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                changelog_details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        pattern:
                          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                        nullable: true,
                        description: 'ID',
                        example: '11e95f8ec39de8fbdb0a4f1a',
                      },
                      changelog_id: {
                        type: 'string',
                        pattern:
                          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                        nullable: true,
                        description: 'Changelog ID',
                        example: '11e95f8ec39de8fbdb0a4f1a',
                      },
                      field: {
                        type: 'string',
                        nullable: true,
                        description: 'Field',
                        example: 'next_run_ts',
                      },
                      old_value: {
                        type: 'string',
                        nullable: true,
                        description: 'Old Value',
                        example: '1643616000',
                      },
                    },
                  },
                  description: 'Change Log Details',
                },
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      pattern:
                        '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                      nullable: true,
                      description: 'ID',
                      example: '11e95f8ec39de8fbdb0a4f1a',
                    },
                    username: {
                      type: 'string',
                      nullable: true,
                      description: 'Username',
                      example: 'email@domain.com',
                    },
                    first_name: {
                      type: 'string',
                      nullable: true,
                      description: 'First Name',
                      example: 'Bob',
                    },
                    last_name: {
                      type: 'string',
                      nullable: true,
                      description: 'Last Name',
                      example: 'Fairview',
                    },
                  },
                  description: 'User',
                },
              },
              required: ['id'],
            },
            description: 'Changelog Information on `expand`',
          },
          resources: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                maxLength: 64,
                description: 'Resource Title',
                example: 'My terminal',
              },
              priv: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Priv',
                example: null,
              },
              resource_name: {
                type: 'string',
                maxLength: 64,
                description: 'Resource Name',
                example: 'v2.addons.iframe.get',
              },
              id: {
                type: 'integer',
                description: 'Resource ID',
                example: 5693,
              },
              last_used_date: {
                type: 'integer',
                nullable: true,
                description: 'Last Used Date',
                example: 1422040992,
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                nullable: true,
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
            },
            required: ['title', 'resource_name', 'id'],
            description: 'Resource Information on `expand`',
          },
          domain: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                pattern: '^[a-zA-Z0-9]+([\\-.]{1}[a-zA-Z0-9]+)*.[a-zA-Z]{2,5}$',
                maxLength: 64,
                description: 'URL',
                example: 'fortispayrbyn9y.sandbox.zeamster.com',
              },
              title: {
                type: 'string',
                maxLength: 64,
                description: 'Domain Name',
                example: 'Test Brand Domain Title 2',
              },
              logo: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Logo',
                example: '',
              },
              support_email: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description: 'Support Email',
                example: 'email@domain.com',
              },
              allow_contact_signup: {
                type: 'boolean',
                description: 'Allow Contact Signup.',
                example: true,
              },
              allow_contact_registration: {
                type: 'boolean',
                description: 'Allow Contact Registration.',
                example: true,
              },
              allow_contact_login: {
                type: 'boolean',
                description: 'Allow Contact Login.',
                example: true,
              },
              registration_fields: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: [
                    'id',
                    'first_name',
                    'last_name',
                    'account_number',
                    'email',
                    'company_name',
                    'address',
                    'city',
                    'state',
                    'zip',
                    'home_phone',
                    'office_phone',
                    'office_ext_phone',
                    'cell_phone',
                    'contact_api_id',
                    'date_of_birth',
                  ],
                  example: 'account_number',
                },
                description: 'Registration Fields',
                example: ['id', 'email'],
              },
              company_name: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Company Name.',
                example: null,
              },
              nav_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Nav Color.',
                example: null,
              },
              button_primary_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Button Primary Color.',
                example: null,
              },
              logo_background_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Logo Background Color.',
                example: null,
              },
              icon_background_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Icon Background Color.',
                example: null,
              },
              menu_text_background_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Menu Text Background Color',
                example: null,
              },
              menu_text_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Menu Text Color.',
                example: null,
              },
              right_menu_background_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Right Menu Background Color.',
                example: null,
              },
              right_menu_text_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Right Menu Text Color.',
                example: null,
              },
              button_primary_text_color: {
                type: 'string',
                maxLength: 7,
                nullable: true,
                description: 'Button Primary Text Color.',
                example: null,
              },
              nav_logo: {
                type: 'string',
                maxLength: 256,
                nullable: true,
                description: 'Nav Logo.',
                example: null,
              },
              fav_icon: {
                type: 'string',
                maxLength: 256,
                nullable: true,
                description: 'Fav Icon.',
                example: null,
              },
              aes_key: {
                type: 'string',
                maxLength: 255,
                nullable: true,
                description: 'Aes Key.',
                example: null,
              },
              help_text: {
                type: 'string',
                nullable: true,
                description: 'Help Text.',
                example: null,
              },
              email_reply_to: {
                type: 'string',
                format: 'email',
                nullable: true,
                description: 'Email Reply To.',
                example: 'email@domain.com',
              },
              email: {
                type: 'string',
                format: 'email',
                nullable: true,
                description: 'Email.',
                example: 'email@domain.com',
              },
              custom_javascript: {
                type: 'string',
                pattern: '^<script\\b[^>]*>([\\s\\S]*?)</script>$',
                maxLength: 2048,
                nullable: true,
                description: 'Custom Javascript.',
                example: null,
              },
              custom_theme: {
                type: 'string',
                maxLength: 48,
                nullable: true,
                description: 'Custom Theme',
                example: null,
              },
              custom_css: {
                type: 'string',
                maxLength: 2048,
                nullable: true,
                description: 'Custom CSS',
                example: null,
              },
              contact_user_default_entry_page: {
                type: 'string',
                enum: [
                  'dashboard',
                  'makepayment',
                  'paymenthistory',
                  'accounts',
                  'recurrings',
                  'invoices',
                ],
                nullable: true,
                description: 'Contact User Default Entry Page',
                example: 'dashboard',
              },
              contact_user_default_auth_roles: {
                type: 'array',
                items: {},
                description: 'Contact User Default Auth Role',
                example: null,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
            },
            required: [
              'url',
              'title',
              'allow_contact_signup',
              'allow_contact_registration',
              'allow_contact_login',
              'id',
              'created_ts',
              'modified_ts',
            ],
            description: 'Domain Information on `expand`',
          },
          created_user: {
            type: 'object',
            properties: {
              account_number: {
                type: 'string',
                nullable: true,
                description: 'Account Number',
                example: '5454545454545454',
              },
              address: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description: 'Address',
                example: '43155 Main Street STE 2310-C',
              },
              branding_domain_url: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Branding Domain Url',
                example: '{branding_domain_url}',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell Phone',
                example: '3339998822',
              },
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description: 'City',
                example: 'Novi',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              contact_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Contact',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Date Of Birth',
                example: '2021-12-01',
              },
              domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 128,
                description: 'Email',
                example: 'email@domain.com',
              },
              email_trx_receipt: {
                type: 'boolean',
                description: 'Email Trx Receipt',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Home Phone',
                example: '3339998822',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              locale: {
                type: 'string',
                maxLength: 8,
                nullable: true,
                description: 'Locale',
                example: 'en-US',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office Phone',
                example: '3339998822',
              },
              office_ext_phone: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Office Ext Phone',
                example: '5',
              },
              primary_location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Primary Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              requires_new_password: {
                type: 'string',
                maxLength: 1,
                nullable: true,
                description: 'Requires New Password',
                example: null,
              },
              state: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description: 'State',
                example: 'Michigan',
              },
              terms_condition_code: {
                type: 'string',
                nullable: true,
                description:
                  'Terms Condition (This field is required when updating your own password).',
                example: '20220308',
              },
              tz: {
                type: 'string',
                maxLength: 30,
                description: 'Time zone',
                example: 'America/New_York',
              },
              ui_prefs: {
                type: 'object',
                properties: {
                  entry_page: {
                    type: 'string',
                    nullable: true,
                    description: 'Ui Prefs Entry Page',
                    example: 'dashboard',
                  },
                  page_size: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 99,
                    nullable: true,
                    description: 'Ui Prefs Page Size',
                    example: 2,
                  },
                  report_export_type: {
                    type: 'string',
                    enum: ['csv', 'tsv', 'xls', 'xlsx'],
                    nullable: true,
                    description: 'Ui Prefs Export Type',
                    example: 'csv',
                  },
                  process_method: {
                    type: 'string',
                    enum: ['virtual_terminal', 'physical_terminal'],
                    nullable: true,
                    description: 'Ui Prefs Process Method',
                    example: 'virtual_terminal',
                  },
                  default_terminal: {
                    type: 'string',
                    pattern:
                      '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                    nullable: true,
                    description: 'Ui Prefs Default Termianl',
                    example: '11e95f8ec39de8fbdb0a4f1a',
                  },
                },
                description: 'Ui Prefs',
              },
              username: {
                type: 'string',
                minLength: 2,
                maxLength: 64,
                description: 'Username',
                example: '{user_name}',
              },
              user_api_key: {
                type: 'string',
                minLength: 16,
                maxLength: 64,
                nullable: true,
                description: 'User Api Key',
                example: '234bas8dfn8238f923w2',
              },
              user_hash_key: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description: 'User Hash Key',
                example: null,
              },
              user_type_code: {
                type: 'integer',
                enum: [200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 100],
                description: 'User Type',
                example: 100,
              },
              password: {
                type: 'string',
                pattern:
                  '^(?=.*[`!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>/?~])(?=.*[0-9])(?=.*[a-zA-Z]).*$',
                minLength: 8,
                maxLength: 128,
                nullable: true,
                description: 'Password',
                example: null,
              },
              zip: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description: 'Zip',
                example: '48375',
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_api_id: {
                type: 'string',
                nullable: true,
                description: 'ContactApi Id',
                example: null,
              },
              primary_location_api_id: {
                type: 'string',
                nullable: true,
                description: 'Primary LocationApi ID',
                example: null,
              },
              status_id: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'User ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              status: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              login_attempts: {
                type: 'number',
                format: 'float',
                description: 'Login Attempts',
                example: 0,
              },
              last_login_ts: {
                type: 'integer',
                description: 'Last Login',
                example: 1422040992,
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Created User',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terms_accepted_ts: {
                type: 'integer',
                nullable: true,
                description: 'Terms Accepted',
                example: 1422040992,
              },
              terms_agree_ip: {
                type: 'string',
                maxLength: 16,
                nullable: true,
                description: 'Terms Agree Ip',
                example: '192.168.0.10',
              },
              current_date_time: {
                type: 'string',
                maxLength: 24,
                description: 'Current Date Time',
                example: '2019-03-11T10:38:26-0700',
              },
            },
            required: [
              'email',
              'last_name',
              'primary_location_id',
              'tz',
              'username',
              'user_type_code',
              'id',
              'status',
              'login_attempts',
              'last_login_ts',
              'created_ts',
              'modified_ts',
              'created_user_id',
              'current_date_time',
            ],
            description: 'User Information on `expand`',
          },
          location_marketplaces: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                marketplace_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Marketplacec ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                location_api_id: {
                  type: 'string',
                  nullable: true,
                  description: 'Location API ID',
                  example: null,
                },
                user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location Marketplace ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                created_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID Created the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: ['location_id', 'marketplace_id', 'id'],
            },
            description: 'Locationmarketplaces Information on `expand`',
          },
          email_blacklist: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Blacklist ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              isBlacklisted: {
                type: 'boolean',
                description: 'isBlacklisted',
                example: true,
              },
              detail: {
                type: 'boolean',
                description: 'Contact Id',
                example: true,
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
            },
            description: 'Email Blacklist Information on `expand`',
          },
          helppage: {
            type: 'object',
            properties: {
              user_type_code: {
                type: 'integer',
                enum: [100, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000],
                description: 'User Type',
                example: 100,
              },
              body: {
                type: 'string',
                maxLength: 65000,
                description: 'Body',
                example: 'Sample Body',
              },
              title: {
                type: 'string',
                maxLength: 255,
                description: 'Title',
                example: 'Sample Title',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Help Page ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                nullable: true,
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'User ID Created the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Last User ID that updated the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            required: ['user_type_code', 'body', 'title', 'id'],
            description: 'Helppage Information on `expand`',
          },
        },
        required: [
          'email',
          'last_name',
          'primary_location_id',
          'tz',
          'username',
          'user_type_code',
          'id',
          'status',
          'login_attempts',
          'last_login_ts',
          'created_ts',
          'modified_ts',
          'created_user_id',
          'current_date_time',
        ],
      },
    },
    required: ['type'],
  },
  responseTransaction: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['Transaction'],
        description: 'Resource Type',
        example: 'Transaction',
        default: 'Transaction',
      },
      data: {
        type: 'object',
        properties: {
          additional_amounts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: [
                    'cashback',
                    'surcharge',
                    'healthcare',
                    'transit',
                    'RX',
                    'vision',
                    'clinical',
                    'copay',
                    'dental',
                    'tax',
                    'fee',
                  ],
                  nullable: true,
                  description:
                    'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
                  example: 'cashback',
                },
                amount: {
                  type: 'integer',
                  nullable: true,
                  description: 'The amount of additional amount.',
                  example: 10,
                },
                account_type: {
                  type: 'string',
                  enum: [
                    'unknown',
                    'checking',
                    'credit',
                    'cash_benefit',
                    'snap',
                    'prepaid',
                    'savings',
                    'spending_power',
                    'universal',
                  ],
                  nullable: true,
                  description: 'Account Type',
                  example: 'credit',
                },
                currency: {
                  type: 'number',
                  format: 'float',
                  nullable: true,
                  description: 'Currency Code',
                  example: 840,
                },
              },
            },
            description: 'Additional amounts',
          },
          billing_address: {
            type: 'object',
            properties: {
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description:
                  'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                example: 'Novi',
              },
              state: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description:
                  'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                example: 'Michigan',
              },
              postal_code: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description:
                  "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
                example: '48375',
              },
              street: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description:
                  'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                example: '43155 Main Street STE 2310-C',
              },
              phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description:
                  'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
                example: '3339998822',
              },
            },
            description: 'Billing Address Object',
          },
          checkin_date: {
            type: 'string',
            pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
            maxLength: 10,
            nullable: true,
            description:
              'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
            example: '2021-12-01',
          },
          checkout_date: {
            type: 'string',
            pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
            maxLength: 10,
            nullable: true,
            description:
              'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
            example: '2021-12-01',
          },
          clerk_number: {
            type: 'string',
            maxLength: 16,
            nullable: true,
            description: 'Clerk or Employee Identifier',
            example: 'AE1234',
          },
          contact_api_id: {
            type: 'string',
            maxLength: 36,
            nullable: true,
            description:
              "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
            example: null,
          },
          contact_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          custom_data: {
            type: 'object',
            properties: {},
            description:
              'A field that allows custom JSON to be entered to store extra data.',
            example: {
              data1: 'custom1',
              data2: 'custom2',
            },
          },
          customer_id: {
            type: 'string',
            maxLength: 64,
            nullable: true,
            description:
              'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
            example: 'customerid',
          },
          description: {
            type: 'string',
            minLength: 1,
            maxLength: 64,
            nullable: true,
            description: 'Description',
            example: 'some description',
          },
          identity_verification: {
            type: 'object',
            properties: {
              dl_state: {
                type: 'string',
                minLength: 2,
                maxLength: 2,
                nullable: true,
                description:
                  "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
                example: 'MI',
              },
              dl_number: {
                type: 'string',
                minLength: 1,
                maxLength: 50,
                nullable: true,
                description:
                  "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
                example: '1235567',
              },
              dob_year: {
                type: 'string',
                pattern: '^(19\\d{2})|20\\d{2}$',
                minLength: 4,
                maxLength: 4,
                nullable: true,
                description:
                  'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
                example: '1980',
              },
            },
            description: 'Identity Verification',
          },
          iias_ind: {
            type: 'integer',
            enum: [0, 1, 2],
            nullable: true,
            description: "Possible values are '0', '1','2'",
            example: 1,
          },
          image_front: {
            type: 'string',
            nullable: true,
            description:
              'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
            example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
          },
          image_back: {
            type: 'string',
            nullable: true,
            description:
              'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
            example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
          },
          installment: {
            type: 'boolean',
            description:
              'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
            example: true,
          },
          installment_number: {
            type: 'number',
            format: 'float',
            minimum: 1,
            maximum: 999,
            nullable: true,
            description:
              'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
            example: 1,
          },
          installment_count: {
            type: 'number',
            format: 'float',
            minimum: 1,
            maximum: 999,
            nullable: true,
            description:
              'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
            example: 1,
          },
          location_api_id: {
            type: 'string',
            maxLength: 36,
            nullable: true,
            description:
              "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
            example: 'location-api-id-florida-2',
          },
          location_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              'A valid Location Id to associate the transaction with.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          product_transaction_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          no_show: {
            type: 'boolean',
            description: 'Used in Lodging',
            example: false,
          },
          notification_email_address: {
            type: 'string',
            nullable: true,
            description: 'If email is supplied then receipt will be emailed',
            example: 'johnsmith@smiths.com',
          },
          order_number: {
            type: 'string',
            maxLength: 32,
            nullable: true,
            description:
              "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
            example: '433659378839',
          },
          po_number: {
            type: 'string',
            maxLength: 36,
            nullable: true,
            description: 'Purchase Order number',
            example: '555555553123',
          },
          quick_invoice_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          recurring: {
            type: 'object',
            properties: {
              account_vault_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Token ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              active: {
                type: 'boolean',
                description: 'Active',
                example: true,
              },
              description: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Description',
                example: 'Description',
              },
              end_date: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'End date',
                example: '2021-12-01',
              },
              installment_total_count: {
                type: 'integer',
                minimum: 1,
                maximum: 999,
                nullable: true,
                description: 'Installment Total Count',
                example: 20,
              },
              interval: {
                type: 'integer',
                minimum: 0,
                maximum: 365,
                description: 'Interval',
                example: 1,
              },
              interval_type: {
                type: 'string',
                enum: ['d', 'w', 'm'],
                description: 'Interval Type',
                example: 'd',
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              notification_days: {
                type: 'integer',
                minimum: 0,
                maximum: 365,
                nullable: true,
                description: 'Notification Days',
                example: 2,
              },
              payment_method: {
                type: 'string',
                enum: ['cc', 'ach'],
                description: 'Payment Method',
                example: 'cc',
              },
              product_transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Product Transaction ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              recurring_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Recurring ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              recurring_api_id: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Recurring Api ID',
                example: 'recurring1234abcd',
              },
              start_date: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                description: 'Start date',
                example: '2021-12-01',
              },
              status: {
                type: 'string',
                enum: ['active', 'on hold', 'ended'],
                description: 'Status',
                example: 'active',
              },
              transaction_amount: {
                type: 'number',
                format: 'double',
                description: 'Transaction amount',
                example: 3,
              },
              terms_agree: {
                type: 'boolean',
                description: 'Terms Agree',
                example: true,
              },
              terms_agree_ip: {
                type: 'string',
                nullable: true,
                description: 'Terms Agree Ip',
                example: '192.168.0.10',
              },
              recurring_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description: 'Custom field used for integrations',
                example: 'recurring custom data 1',
              },
              recurring_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description: 'Custom field used for integrations',
                example: 'recurring custom data 2',
              },
              recurring_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description: 'Custom field used for integrations',
                example: 'recurring custom data 3',
              },
              send_to_proc_as_recur: {
                type: 'boolean',
                description: 'Send To Proc As Recur',
                example: true,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Recurring ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              next_run_date: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                description: 'Next Run Date',
                example: '2021-12-01',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              recurring_type_id: {
                type: 'string',
                enum: ['o', 'i'],
                description: 'Recurring Type',
                example: 'i',
              },
            },
            required: [
              'account_vault_id',
              'active',
              'interval',
              'interval_type',
              'location_id',
              'payment_method',
              'start_date',
              'status',
              'transaction_amount',
              'id',
              'next_run_date',
              'created_ts',
              'modified_ts',
              'recurring_type_id',
            ],
            description: 'Recurring Information on `expand`',
          },
          recurring_number: {
            type: 'number',
            format: 'float',
            minimum: 1,
            maximum: 999,
            nullable: true,
            description:
              'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
            example: 1,
          },
          room_num: {
            type: 'string',
            maxLength: 12,
            nullable: true,
            description: 'Used in Lodging',
            example: '303',
          },
          room_rate: {
            type: 'integer',
            nullable: true,
            description: 'Required if merchant industry type is lodging.',
            example: 95.3,
          },
          save_account: {
            type: 'boolean',
            description:
              'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
            example: false,
          },
          save_account_title: {
            type: 'string',
            maxLength: 16,
            nullable: true,
            description:
              'If saving token while running a transaction, this will be the title of the token.',
            example: 'John Account',
          },
          subtotal_amount: {
            type: 'integer',
            minimum: 0,
            maximum: 9999999999,
            nullable: true,
            description:
              'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
            example: 599,
          },
          surcharge_amount: {
            type: 'integer',
            minimum: 1,
            maximum: 9999999999,
            nullable: true,
            description:
              'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
            example: 100,
          },
          tags: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                title: {
                  type: 'string',
                  maxLength: 64,
                  description: 'Tag Title',
                  example: 'My terminal',
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Tag ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
              },
              required: [
                'location_id',
                'title',
                'id',
                'created_ts',
                'modified_ts',
              ],
            },
            description: 'Tag Information on `expand`',
          },
          tax: {
            type: 'integer',
            minimum: 0,
            maximum: 9999999999,
            nullable: true,
            description:
              'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
            example: 0,
          },
          tip_amount: {
            type: 'integer',
            minimum: 0,
            maximum: 9999999999,
            nullable: true,
            description:
              'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
            example: 0,
          },
          transaction_amount: {
            type: 'integer',
            minimum: 0,
            maximum: 999999999,
            nullable: true,
            description:
              'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
            example: 0,
          },
          secondary_amount: {
            type: 'integer',
            minimum: 0,
            maximum: 999999999,
            nullable: true,
            description:
              'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
            example: 0,
          },
          transaction_api_id: {
            type: 'string',
            maxLength: 64,
            nullable: true,
            description: 'See api_id page for more details',
            example: 'transaction-payment-abcd123',
          },
          transaction_c1: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description: 'Custom field 1 for api users to store custom data',
            example: 'custom-data-1',
          },
          transaction_c2: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description: 'Custom field 2 for api users to store custom data',
            example: 'custom-data-2',
          },
          transaction_c3: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description: 'Custom field 3 for api users to store custom data',
            example: 'custom-data-3',
          },
          transaction_c4: {
            type: 'string',
            maxLength: 128,
            nullable: true,
            description: 'Custom field 4 for api users to store custom data',
            example: 'custom-data-4',
          },
          bank_funded_only_override: {
            type: 'boolean',
            description: 'Bank Funded Only Override',
            example: false,
          },
          id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'Transaction ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          created_ts: {
            type: 'integer',
            description: 'Created Time Stamp',
            example: 1422040992,
          },
          modified_ts: {
            type: 'integer',
            description: 'Modified Time Stamp',
            example: 1422040992,
          },
          terminal_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description: 'Terminal ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          account_holder_name: {
            type: 'string',
            maxLength: 32,
            nullable: true,
            description:
              "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
            example: 'smith',
          },
          account_type: {
            type: 'string',
            minLength: 1,
            maxLength: 32,
            nullable: true,
            description:
              'Required for ACH transactions if account_vault_id is not provided.',
            example: 'checking',
          },
          token_api_id: {
            type: 'string',
            maxLength: 36,
            nullable: true,
            description:
              "This can be supplied in place of account_vault_id if you would like to use an token for the transaction and are using your own custom api_id's to track accountvaults in the system.",
            example: null,
          },
          token_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              'Required if account_number,  track_data, micr_data is not provided.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          ach_identifier: {
            type: 'string',
            minLength: 1,
            maxLength: 1,
            nullable: true,
            description: 'Required for ACH transactions in certain scenarios.',
            example: 'P',
          },
          ach_sec_code: {
            type: 'string',
            enum: ['CCD', 'PPD', 'TEL', 'WEB', 'POP', 'C21'],
            nullable: true,
            description:
              'Required for ACH transactions if account_vault_id is not provided.',
            example: 'C21',
          },
          advance_deposit: {
            type: 'boolean',
            description: 'Advance Deposit',
            example: true,
          },
          auth_amount: {
            type: 'number',
            format: 'float',
            maximum: 9999999999,
            nullable: true,
            description: 'Authorization Amount',
            example: 1,
          },
          auth_code: {
            type: 'string',
            minLength: 6,
            maxLength: 6,
            nullable: true,
            description:
              'Required on force transactions. Ignored for all other actions.',
            example: 'BR349K',
          },
          avs: {
            type: 'string',
            enum: ['BAD', 'ZIP', 'STREET', 'GOOD', 'UNKNOWN'],
            nullable: true,
            description: 'AVS',
            example: 'BAD',
          },
          avs_enhanced: {
            type: 'string',
            minLength: 1,
            nullable: true,
            description: 'AVS Enhanced',
            example: 'N',
          },
          cardholder_present: {
            type: 'boolean',
            description: 'If the cardholder is present at the point of service',
            example: true,
          },
          card_present: {
            type: 'boolean',
            description:
              'A POST only field to specify whether or not the card is present.',
            example: true,
          },
          check_number: {
            type: 'string',
            minLength: 1,
            maxLength: 15,
            nullable: true,
            description: 'Required for transactions using TEL SEC code.',
            example: '8520748520963',
          },
          customer_ip: {
            type: 'string',
            nullable: true,
            description: 'Can be used to store customer IP Address',
            example: '192.168.0.10',
          },
          cvv_response: {
            type: 'string',
            minLength: 1,
            maxLength: 1,
            nullable: true,
            description: 'Obfuscated CVV',
            example: 'N',
          },
          entry_mode_id: {
            type: 'string',
            enum: ['B', 'S', 'K', 'C', 'P', 'F'],
            nullable: true,
            description: 'Entry Mode - See entry mode section for more detail',
            example: 'C',
          },
          emv_receipt_data: {
            type: 'object',
            properties: {
              AID: {
                type: 'string',
                nullable: true,
                description:
                  'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                example: 'a0000000042203',
              },
              APPLAB: {
                type: 'string',
                nullable: true,
                description:
                  'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                example: 'US Maestro',
              },
              APPN: {
                type: 'string',
                nullable: true,
                description:
                  'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                example: 'US Maestro',
              },
              CVM: {
                type: 'string',
                nullable: true,
                description:
                  'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                example: 'Pin Verified',
              },
              TSI: {
                type: 'string',
                nullable: true,
                description:
                  'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                example: 'e800',
              },
              TVR: {
                type: 'string',
                nullable: true,
                description:
                  'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
                example: '0800008000',
              },
            },
            description:
              'This field is a read only field. This field will only be populated for EMV transactions and will contain proper JSON formatted data with some or all of the following fields: TC,TVR,AID,TSI,ATC,APPLAB,APPN,CVM',
          },
          first_six: {
            type: 'string',
            minLength: 6,
            maxLength: 6,
            nullable: true,
            description:
              'First six numbers of account_number.  Automatically generated by system.',
            example: '545454',
          },
          last_four: {
            type: 'string',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Last four numbers of account_number.  Automatically generated by the system.',
            example: '5454',
          },
          payment_method: {
            type: 'string',
            enum: ['cc', 'ach'],
            description: "'cc' or 'ach'",
            example: 'cc',
          },
          terminal_serial_number: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]*$',
            maxLength: 36,
            nullable: true,
            description:
              "If transaction was processed using a terminal, this field would contain the terminal's serial number",
            example: '1234567890',
          },
          transaction_settlement_status: {
            type: 'string',
            maxLength: 32,
            nullable: true,
            description: '(Deprecated field)',
            example: null,
          },
          charge_back_date: {
            type: 'string',
            pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
            maxLength: 10,
            nullable: true,
            description: 'Charge Back Date (ACH Trxs)',
            example: '2021-12-01',
          },
          is_recurring: {
            type: 'boolean',
            description:
              'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
            example: true,
          },
          notification_email_sent: {
            type: 'string',
            nullable: true,
            description: 'Indicates if email receipt has been sent',
            example: 'true',
          },
          par: {
            type: 'string',
            maxLength: 36,
            nullable: true,
            description:
              "A field usually returned form the processor to uniquely identifier a specific cardholder's credit card.",
            example: 'Q1J4Z28RKA1EBL470G9XYG90R5D3E',
          },
          reason_code_id: {
            type: 'number',
            format: 'float',
            enum: [
              0, 1000, 1001, 1002, 1003, 1004, 1005, 1200, 1201, 1240, 1301,
              1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312,
              1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323,
              1324, 1325, 1326, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1334,
              1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 1345,
              1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356,
              1357, 1358, 1359, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367,
              1368, 1369, 1370, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378,
              1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389,
              1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1500,
              1510, 1518, 1520, 1530, 1531, 1540, 1541, 1588, 1599, 1601, 1602,
              1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1611, 1612, 1613,
              1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624,
              1625, 1626, 1627, 1628, 1629, 1630, 1631, 1632, 1640, 1641, 1650,
              1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661,
              1662, 1663, 1664, 1665, 1666, 1667, 1668, 1701, 1800, 1801, 1802,
              1803, 1804, 1805,
            ],
            nullable: true,
            description:
              "Response reason code that provides more detail as to the result of the transaction. The reason code list can be found here: Response Reason Codes\n>0 - N/A\n>\n>1000 - CC - Approved / ACH - Accepted\n>\n>1000 - CC - Approved / ACH - Accepted\n>\n>1001 - AuthCompleted\n>\n>1002 - Forced\n>\n>1003 - AuthOnly Declined\n>\n>1004 - Validation Failure (System Run Trx)\n>\n>1005 - Processor Response Invalid\n>\n>1200 - Voided\n>\n>1201 - Partial Approval\n>\n>1240 - Approved, optional fields are missing (Paya ACH only)\n>\n>1301 - Account Deactivated for Fraud\n>\n>1302-1399 - Reserved for Future Fraud Reason Codes\n>\n>1500 - Generic Decline\n>\n>1510 - Call\n>\n>1518 - Transaction Not Permitted - Terminal\n>\n>1520 - Pickup Card\n>\n>1530 - Retry Trx\n>\n>1531 - Communication Error\n>\n>1540 - Setup Issue, contact Support\n>\n>1541 - Device is not signature capable\n>\n>1588 - Data could not be de-tokenized\n>\n>1599 - Other Reason\n>\n>1601 - Generic Decline\n>\n>1602 - Call\n>\n>1603 - No Reply\n>\n>1604 - Pickup Card - No Fraud\n>\n>1605 - Pickup Card - Fraud\n>\n>1606 - Pickup Card - Lost\n>\n>1607 - Pickup Card - Stolen\n>\n>1608 - Account Error\n>\n>1609 - Already Reversed\n>\n>1610 - Bad PIN\n>\n>1611 - Cashback Exceeded\n>\n>1612 - Cashback Not Available\n>\n>1613 - CID Error\n>\n>1614 - Date Error\n>\n>1615 - Do Not Honor\n>\n>1616 - NSF\n>\n>1618 - Invalid Service Code\n>\n>1619 - Exceeded activity limit\n>\n>1620 - Violation\n>\n>1621 - Encryption Error\n>\n>1622 - Card Expired\n>\n>1623 - Renter\n>\n>1624 - Security Violation\n>\n>1625 - Card Not Permitted\n>\n>1626 - Trans Not Permitted\n>\n>1627 - System Error\n>\n>1628 - Bad Merchant ID\n>\n>1629 - Duplicate Batch (Already Closed)\n>\n>1630 - Batch Rejected\n>\n>1631 - Account Closed\n>\n>1632 - PIN tries exceeded\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>1640 - Required fields are missing (ACH only)\n>\n>1641 - Previously declined transaction (1640)\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>\n>1650 - Contact Support\n>\n>1651 - Max Sending - Throttle Limit Hit (ACH only)\n>\n>1652 - Max Attempts Exceeded\n>\n>1653 - Contact Support\n>\n>1654 - Voided - Online Reversal Failed\n>\n>1655 - Decline (AVS Auto Reversal)\n>\n>1656 - Decline (CVV Auto Reversal)\n>\n>1657 - Decline (Partial Auth Auto Reversal)\n>\n>1658 - Expired Authorization\n>\n>1659 - Declined - Partial Approval not Supported\n>\n>1660 - Bank Account Error, please delete and re-add Token\n>\n>1661 - Declined AuthIncrement\n>\n>1662 - Auto Reversal - Processor can't settle\n>\n>1663 - Manager Needed (Needs override transaction)\n>\n>1664 - Token Not Found: Sharing Group Unavailable\n>\n>1665 - Contact Not Found: Sharing Group Unavailable\n>\n>1666 - Amount Error\n>\n>1667 - Action Not Allowed in Current State\n>\n>1668 - Original Authorization Not Valid\n>\n>1701 - Chip Reject\n>\n>1800 - Incorrect CVV\n>\n>1801 - Duplicate Transaction\n>\n>1802 - MID/TID Not Registered\n>\n>1803 - Stop Recurring\n>\n>1804 - No Transactions in Batch\n>\n>1805 - Batch Does Not Exist\n>\n>   \n>\n**ACH Reject Reason Codes**\n| Code | E-Code | Verbiage | Short Description | Long Description |\n| ----------- | ----------- | ----------- | ----------- | ----------- |\n| 2101 | Rejected-R01 |  | Insufficient funds | Available balance is not sufficient to cover the amount of the debit entry |\n| 2102 | Rejected-R02  | E02 | Bank account closed | Previously active amount has been closed by the customer of RDFI |\n| 2103 | Rejected-R03 | E03 | No bank account/unable to locate account | Account number does not correspond to the individual identified in the entry, or the account number designated is not an open account |\n| 2104 | Rejected-R04  | E04 | Invalid bank account number | Account number structure is not valid |\n| 2105 | Rejected-R05  | E05 | Reserved | Currently not in use |\n| 2106 | Rejected-R06 |  | Returned per ODFI request | ODFI requested the RDFI to return the entry |\n| 2107 | Rejected-R07 | E07 | Authorization revoked by customer | Receiver has revoked authorization |\n| 2108 | Rejected-R08 | E08 | Payment stopped | Receiver of a recurring debit has stopped payment of an entry |\n| 2109 | Rejected-R09 |  | Uncollected funds | Collected funds are not sufficient for payment of the debit entry |\n| 2110 | Rejected-R10 | E10 | Customer Advises Originator is Not Known to Receiver and/or Is Not Authorized by Receiver to Debit Receiver’s Account | Receiver has advised RDFI that originator is not authorized to debit his bank account |\n| 2111 | Rejected-R11 |  | Customer Advises Entry Not In Accordance with the Terms of the Authorization | To be used when there is an error in the authorization |\n| 2112 | Rejected-R12 |  | Branch sold to another RDFI | RDFI unable to post entry destined for a bank account maintained at a branch sold to another financial institution |\n| 2113 | Rejected-R13 |  | RDFI not qualified to participate | Financial institution does not receive commercial ACH entries |\n| 2114 | Rejected-R14 | E14 | Representative payee deceased or unable to continue in that capacity | The representative payee authorized to accept entries on behalf of a beneficiary is either deceased or unable to continue in that capacity |\n| 2115 | Rejected-R15 | E15 | Beneficiary or bank account holder deceased | (Other than representative payee) deceased* - (1) the beneficiary entitled to payments is deceased or (2) the bank account holder other than a representative payee is deceased |\n| 2116 | Rejected-R16 | E16 | Bank account frozen | Funds in bank account are unavailable due to action by RDFI or legal order |\n| 2117 | Rejected-R17 |  | File record edit criteria | Entry with Invalid Account Number Initiated Under Questionable Circumstances |\n| 2118 | Rejected-R18 |  | Improper effective entry date | Entries have been presented prior to the first available processing window for the effective date. |\n| 2119 | Rejected-R19 |  | Amount field error | Improper formatting of the amount field |\n| 2120 | Rejected-R20 |  | Non-payment bank account | Entry destined for non-payment bank account defined by reg. |\n| 2121 | Rejected-R21 |  | Invalid company Identification | The company ID information not valid (normally CIE entries) |\n| 2122 | Rejected-R22 |  | Invalid individual ID number | Individual id used by receiver is incorrect (CIE entries) |\n| 2123 | Rejected-R23 |  | Credit entry refused by receiver | Receiver returned entry because minimum or exact amount not remitted, bank account is subject to litigation, or payment represents an overpayment, originator is not known to receiver or receiver has not authorized this credit entry to this bank account |\n| 2124 | Rejected-R24 |  | Duplicate entry | RDFI has received a duplicate entry |\n| 2125 | Rejected-R25 |  | Addenda error | Improper formatting of the addenda record information |\n| 2126 | Rejected-R26 |  | Mandatory field error | Improper information in one of the mandatory fields |\n| 2127 | Rejected-R27 |  | Trace number error | Original entry trace number is not valid for return entry; or addenda trace numbers do not correspond with entry detail record |\n| 2128 | Rejected-R28 |  | Transit routing number check digit error | Check digit for the transit routing number is incorrect |\n| 2129 | Rejected-R29 | E29 | Corporate customer advises not authorized | RDFI has been notified by corporate receiver that debit entry of originator is not authorized |\n| 2130 | Rejected-R30 |  | RDFI not participant in check truncation program | Financial institution not participating in automated check safekeeping application |\n| 2131 | Rejected-R31 |  | Permissible return entry (CCD and CTX only) | RDFI has been notified by the ODFI that it agrees to accept a CCD or CTX return entry |\n| 2132 | Rejected-R32 |  | RDFI non-settlement | RDFI is not able to settle the entry |\n| 2133 | Rejected-R33 |  | Return of XCK entry | RDFI determines at its sole discretion to return an XCK entry; an XCK return entry may be initiated by midnight of the sixtieth day following the settlement date if the XCK entry |\n| 2134 | Rejected-R34 |  | Limited participation RDFI | RDFI participation has been limited by a federal or state supervisor |\n| 2135 | Rejected-R35 |  | Return of improper debit entry | ACH debit not permitted for use with the CIE standard entry class code (except for reversals) |\n| 2136 | Rejected-R36 |  | Return of Improper Credit Entry |  |\n| 2137 | Rejected-R37 |  | Source Document Presented for Payment |  |\n| 2138 | Rejected-R38 |  | Stop Payment on Source Document |  |\n| 2139 | Rejected-R39 |  | Improper Source Document |  |\n| 2140 | Rejected-R40 |  | Return of ENR Entry by Federal Government Agency |  |\n| 2141 | Rejected-R41 |  | Invalid Transaction Code |  |\n| 2142 | Rejected-R42 |  | Routing Number/Check Digit Error |  |\n| 2143 | Rejected-R43 |  | Invalid DFI Account Number |  |\n| 2144 | Rejected-R44 |  | Invalid Individual ID Number/Identification |  |\n| 2145 | Rejected-R45 |  | Invalid Individual Name/Company Name |  |\n| 2146 | Rejected-R46 |  | Invalid Representative Payee Indicator |  |\n| 2147 | Rejected-R47 |  | Duplicate Enrollment |  |\n| 2150 | Rejected-R50 |  | State Law Affecting RCK Acceptance |  |\n| 2151 | Rejected-R51 |  | Item is Ineligible, Notice Not Provided, etc. |  |\n| 2152 | Rejected-R52 |  | Stop Payment on Item (adjustment entries) |  |\n| 2153 | Rejected-R53 |  | Item and ACH Entry Presented for Payment |  |\n| 2161 | Rejected-R61 |  | Misrouted Return |  |\n| 2162 | Rejected-R62 |  | Incorrect Trace Number |  |\n| 2163 | Rejected-R63 |  | Incorrect Dollar Amount |  |\n| 2164 | Rejected-R64 |  | Incorrect Individual Identification |  |\n| 2165 | Rejected-R65 |  | Incorrect Transaction Code |  |\n| 2166 | Rejected-R66 |  | Incorrect Company Identification |  |\n| 2167 | Rejected-R67 |  | Duplicate Return |  |\n| 2168 | Rejected-R68 |  | Untimely Return |  |\n| 2169 | Rejected-R69 |  | Multiple Errors |  |\n| 2170 | Rejected-R70 |  | Permissible Return Entry Not Accepted |  |\n| 2171 | Rejected-R71 |  | Misrouted Dishonored Return |  |\n| 2172 | Rejected-R72 |  | Untimely Dishonored Return |  |\n| 2173 | Rejected-R73 |  | Timely Original Return |  |\n| 2174 | Rejected-R74 |  | Corrected Return |  |\n| 2180 | Rejected-R80 |  | Cross-Border Payment Coding Error |  |\n| 2181 | Rejected-R81 |  | Non-Participant in Cross-Border Program |  |\n| 2182 | Rejected-R82 |  | Invalid Foreign Receiving DFI Identification |  |\n| 2183 | Rejected-R83 |  | Foreign Receiving DFI Unable to Settle |  |\n| 2200 | Voided |  | Processor Void | The transaction was voided by the processor before being sent to the bank |\n| 2201 | Rejected-C01 |  |  |  |\n| 2202 | Rejected-C02 |  |  |  |\n| 2203 | Rejected-C03 |  |  |  |\n| 2204 | Rejected-C04 |  |  |  |\n| 2205 | Rejected-C05 |  |  |  |\n| 2206 | Rejected-C06 |  |  |  |\n| 2207 | Rejected-C07 |  |  |  |\n| 2208 | Rejected-C08 |  |  |  |\n| 2209 | Rejected-C09 |  |  |  |\n| 2210 | Rejected-C10 |  |  |  |\n| 2211 | Rejected-C11 |  |  |  |\n| 2212 | Rejected-C12 |  |  |  |\n| 2213 | Rejected-C13 |  |  |  |\n| 2261 | Rejected-C61 |  |  |  |\n| 2262 | Rejected-C62 |  |  |  |\n| 2263 | Rejected-C63 |  |  |  |\n| 2264 | Rejected-C64 |  |  |  |\n| 2265 | Rejected-C65 |  |  |  |\n| 2266 | Rejected-C66 |  |  |  |\n| 2267 | Rejected-C67 |  |  |  |\n| 2268 | Rejected-C68 |  |  |  |\n| 2269 | Rejected-C69 |  |  |  |\n| 2301 | Rejected-X01 |  | Misc Check 21 Return |  |\n| 2304 | Rejected-X04 |  | Invalid Image |  |\n| 2305 | Rejected-X05 | E95 | Breach of Warranty |  |\n| 2306 | Rejected-X06 | E96 | Counterfeit / Forgery |  |\n| 2307 | Rejected-X07 | E97 | Refer to Maker |  |\n| 2308 | Rejected-X08 |  | Maximum Payment Attempts |  |\n| 2309 | Rejected-X09 |  | Item Cannot be Re-presented |  |\n| 2310 | Rejected-X10 |  | Not Our Item |  |\n| 2321 | Rejected-X21 |  | Pay None |  |\n| 2322 | Rejected-X22 |  | Pay All |  |\n| 2323 | Rejected-X23 | E93 | Non-Negotiable |  |\n| 2329 | Rejected-X29 |  | Stale Dated |  |\n| 2345 | Rejected-X45 |  | Misc Return |  |\n| 2371 | Rejected-X71 |  | RCK - 2nd Time |  |\n| 2372 | Rejected-X72 |  | RCK Reject - ACH |  |\n| 2373 | Rejected-X73 |  | RCK Reject - Payer |  |",
            example: 1000,
          },
          recurring_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              'A unique identifer used to associate a transaction with a Recurring.',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          settle_date: {
            type: 'string',
            pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
            maxLength: 10,
            nullable: true,
            description: 'Settle date',
            example: '2021-12-01',
          },
          status_code: {
            type: 'integer',
            enum: [101, 102, 111, 121, 131, 132, 133, 134, 191, 201, 301, 331],
            nullable: true,
            description:
              'Status ID - See status id section for more detail\n>101 - Sale cc Approved\n>\n>102 - Sale cc AuthOnly\n>\n>111 - Refund cc Refunded\n>\n>121 - Credit/Debit/Refund cc AvsOnly\n>\n>131 - Credit/Debit/Refund ach Pending Origination\n>\n>132 - Credit/Debit/Refund ach Originating\n>\n>133 - Credit/Debit/Refund ach Originated\n>\n>134 - Credit/Debit/Refund ach Settled\n>\n>191 - Settled (depracated - batches are now settled on the /v2/transactionbatches endpoint)\n>\n>201 - All cc/ach Voided\n>\n>301 - All cc/ach Declined\n>\n>331 - Credit/Debit/Refund ach Charged Back\n>',
            example: 101,
          },
          transaction_batch_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description:
              'For cc transactions, this is the id of the batch the transaction belongs to (not to be confused with batch number). This will be null for transactions that do not settle (void and authonly).',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          type_id: {
            type: 'number',
            format: 'float',
            enum: [20, 21, 22, 30, 40, 50],
            nullable: true,
            description: 'Type ID - See type id section for more detail',
            example: null,
          },
          verbiage: {
            type: 'string',
            nullable: true,
            description:
              'Verbiage -Do not use verbiage to see if the transaction was approved, use status_id',
            example: 'APPROVED',
          },
          void_date: {
            type: 'string',
            pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
            maxLength: 10,
            nullable: true,
            description: 'void date',
            example: '2021-12-01',
          },
          batch: {
            type: 'string',
            nullable: true,
            description: 'Batch',
            example: '2',
          },
          terms_agree: {
            type: 'boolean',
            description: 'Terms Agreement',
            example: true,
          },
          response_message: {
            type: 'string',
            maxLength: 255,
            nullable: true,
            description: 'Response Message',
            example: null,
          },
          return_date: {
            type: 'string',
            pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
            maxLength: 10,
            nullable: true,
            description: 'Return Date',
            example: '2021-12-01',
          },
          trx_source_id: {
            type: 'integer',
            maximum: 99,
            nullable: true,
            description: 'How the transaction was obtained by the API.',
            example: 8,
          },
          account_vault: {
            type: 'object',
            properties: {
              account_holder_name: {
                type: 'string',
                minLength: 1,
                maxLength: 32,
                nullable: true,
                description: 'Account holder name',
                example: 'John Smith',
              },
              account_number: {
                type: 'string',
                pattern: '^[\\d]+$',
                minLength: 4,
                maxLength: 19,
                nullable: true,
                description: 'Account number',
                example: '545454545454545',
              },
              account_vault_api_id: {
                type: 'string',
                minLength: 1,
                maxLength: 36,
                nullable: true,
                description:
                  'This field can be used to correlate Tokens in our system to data within an outside software integration',
                example: 'accountvaultabcd',
              },
              accountvault_c1: {
                type: 'string',
                minLength: 1,
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 1 for API users to store custom data',
                example: 'accountvault custom 1',
              },
              accountvault_c2: {
                type: 'string',
                minLength: 1,
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 2 for API users to store custom data',
                example: 'accountvault custom 2',
              },
              accountvault_c3: {
                type: 'string',
                minLength: 1,
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 3 for API users to store custom data',
                example: 'accountvault custom 3',
              },
              ach_sec_code: {
                type: 'string',
                enum: ['WEB', 'CCD', 'PPD', 'C21', 'POP', 'TEL'],
                nullable: true,
                description: 'SEC code for the account',
                example: 'WEB',
              },
              billing_address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description:
                      'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    maxLength: 24,
                    nullable: true,
                    description:
                      'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                    example: 'Michigan',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description:
                      "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
                    example: '48375',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description:
                      'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
                    example: '43155 Main Street STE 2310-C',
                  },
                  phone: {
                    type: 'string',
                    pattern: '^\\d{10}$',
                    minLength: 10,
                    maxLength: 10,
                    nullable: true,
                    description:
                      'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
                    example: '3339998822',
                  },
                },
                description: 'Billing Address Object',
              },
              contact_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Used to associate the Token with a Contact.',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              customer_id: {
                type: 'string',
                minLength: 1,
                maxLength: 50,
                nullable: true,
                description: 'Used to store a customer identification number.',
                example: '123456',
              },
              identity_verification: {
                type: 'object',
                properties: {
                  dl_state: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 2,
                    nullable: true,
                    description:
                      "Used for certain ACH transactions where Driver's License is required by the terminal being used. ",
                    example: 'MI',
                  },
                  dl_number: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 50,
                    nullable: true,
                    description:
                      "Used for certain ACH transactions where Driver's License is required by the terminal being used. ",
                    example: '1235567',
                  },
                  ssn4: {
                    type: 'string',
                    maxLength: 4,
                    nullable: true,
                    description:
                      'The last four of the account_holder social security number.',
                    example: '8527',
                  },
                  dob_year: {
                    type: 'string',
                    pattern: '^(19\\d{2})|20\\d{2}$',
                    minLength: 4,
                    maxLength: 4,
                    nullable: true,
                    description:
                      'Used for certain ACH transactions where Identity Verification is enabled on the terminal being used.',
                    example: '1980',
                  },
                },
                description: 'Identity verification',
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description:
                  'A valid Location Id associated with the Contact for this Token',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              previous_account_vault_api_id: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description:
                  'Can be used to pull payment info from a previous token api id.',
                example: 'previousaccountvault123456',
              },
              previous_account_vault_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description:
                  'Can be used to pull payment info from a previous token.',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              previous_transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description:
                  'Can be used to pull payment info from a previous transaction.',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terms_agree: {
                type: 'boolean',
                description: 'Terms agreement.',
                example: true,
              },
              terms_agree_ip: {
                type: 'string',
                nullable: true,
                description:
                  'The ip address of the client that agreed to terms.',
                example: '192.168.0.10',
              },
              title: {
                type: 'string',
                minLength: 1,
                maxLength: 16,
                nullable: true,
                description:
                  'Used to describe the Token for easier identification within our UI.',
                example: 'Test CC Account',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description:
                  'A unique, system-generated identifier for the Token.',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              account_type: {
                type: 'string',
                minLength: 1,
                maxLength: 32,
                description: 'Account type',
                example: 'checking',
              },
              active: {
                type: 'boolean',
                description: 'Register is Active',
                example: true,
              },
              cau_summary_status_id: {
                type: 'number',
                format: 'float',
                enum: [0, 1, 2, 3],
                description: 'CAU Summary Status ID.',
                example: 1,
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              e_serial_number: {
                type: 'string',
                pattern: '^[a-zA-Z0-9]*$',
                maxLength: 36,
                nullable: true,
                description: 'E Serial Number',
                example: '1234567890',
              },
              e_track_data: {
                type: 'string',
                nullable: true,
                description: 'E Track Data',
                example: null,
              },
              e_format: {
                type: 'string',
                nullable: true,
                description: 'E Format',
                example: null,
              },
              e_keyed_data: {
                type: 'string',
                nullable: true,
                description: 'E Keyed Data',
                example: null,
              },
              expiring_in_months: {
                type: 'integer',
                nullable: true,
                description: 'Determined by API based on card exp_date.',
                example: null,
              },
              first_six: {
                type: 'string',
                maxLength: 6,
                description:
                  'The first six numbers of an account number.  System will generate a value for this field automatically.',
                example: '700953',
              },
              has_recurring: {
                type: 'boolean',
                description:
                  'True indicates that this token is tied to a Recurring Payment',
                example: false,
              },
              last_four: {
                type: 'string',
                maxLength: 4,
                description:
                  'The last four numbers of an account number.  System will generate a value for this field automatically.',
                example: '3657',
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              payment_method: {
                type: 'string',
                enum: ['cc', 'ach'],
                description: "Must be provided as either 'cc' or 'ach'.",
                example: 'cc',
              },
              ticket: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description:
                  'A valid ticket that was created to store the token.',
                example: null,
              },
              track_data: {
                type: 'string',
                maxLength: 256,
                nullable: true,
                description: 'Track Data from a magnetic card swipe.',
                example: null,
              },
            },
            required: [
              'location_id',
              'id',
              'account_type',
              'cau_summary_status_id',
              'created_ts',
              'first_six',
              'has_recurring',
              'last_four',
              'modified_ts',
              'payment_method',
            ],
            description: 'Token Information on `expand`',
          },
          quick_invoice: {
            type: 'object',
            properties: {
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              title: {
                type: 'string',
                maxLength: 64,
                description: 'Title',
                example: 'My terminal',
              },
              cc_product_transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Transaction ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              ach_product_transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'ACH Product Transaction Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              due_date: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                description: 'Due Date, Format: Y-m-d',
                example: '2021-12-01',
              },
              item_list: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      maxLength: 100,
                      description: "Item's Name, must be unique on the list",
                      example: 'Bread',
                    },
                    amount: {
                      type: 'number',
                      format: 'double',
                      minimum: 0,
                      maximum: 9999999.99,
                      description: "Item's Amount",
                      example: 20.15,
                    },
                  },
                  required: ['name', 'amount'],
                },
                minItems: 1,
                maxItems: 99,
                uniqueItems: true,
                description: 'Item List',
              },
              allow_overpayment: {
                type: 'boolean',
                description: 'Allow Overpayment.',
                example: true,
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 128,
                nullable: true,
                description: 'Email',
                example: 'email@domain.com',
              },
              contact_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Contact ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_api_id: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Contact API Id',
                example: 'contact12345',
              },
              customer_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Customer Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              expire_date: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Expire Date.',
                example: '2021-12-01',
              },
              allow_partial_pay: {
                type: 'boolean',
                description: 'Allow partial pay',
                example: true,
              },
              attach_files_to_email: {
                type: 'boolean',
                description: 'Attach Files to Email',
                example: true,
              },
              send_email: {
                type: 'boolean',
                description: 'Send Email',
                example: true,
              },
              invoice_number: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Invoice number',
                example: 'invoice12345',
              },
              item_header: {
                type: 'string',
                maxLength: 250,
                nullable: true,
                description: 'Item Header',
                example: 'Quick invoice header sample',
              },
              item_footer: {
                type: 'string',
                maxLength: 250,
                nullable: true,
                description: 'Item footer',
                example: 'Thank you',
              },
              amount_due: {
                type: 'number',
                format: 'double',
                nullable: true,
                description: 'Amount Due',
                example: 245.36,
              },
              notification_email: {
                type: 'string',
                format: 'email',
                maxLength: 640,
                nullable: true,
                description: 'Notification email',
                example: 'email@domain.com',
              },
              payment_status_id: {
                type: 'number',
                format: 'float',
                minimum: 1,
                maximum: 3,
                nullable: true,
                description: 'Payment Status Id',
                example: 1,
              },
              status_id: {
                type: 'number',
                format: 'float',
                enum: [0, 1],
                nullable: true,
                description: 'Status Id',
                example: 1,
              },
              note: {
                type: 'string',
                maxLength: 200,
                nullable: true,
                description: 'Note',
                example: 'some note',
              },
              notification_days_before_due_date: {
                type: 'integer',
                minimum: 0,
                maximum: 99,
                nullable: true,
                description: 'Notification days before due date',
                example: 3,
              },
              notification_days_after_due_date: {
                type: 'integer',
                minimum: 0,
                maximum: 99,
                nullable: true,
                description: 'Notification days after due date',
                example: 7,
              },
              notification_on_due_date: {
                type: 'boolean',
                description: 'Notification on due date',
                example: true,
              },
              send_text_to_pay: {
                type: 'boolean',
                description: 'Send Text To Pay',
                example: true,
              },
              files: {
                type: 'array',
                items: {},
                description: 'Files',
              },
              remaining_balance: {
                type: 'number',
                format: 'double',
                nullable: true,
                description: 'Remaining Balance',
                example: 245.36,
              },
              single_payment_min_amount: {
                type: 'number',
                format: 'double',
                nullable: true,
                description: 'Single Payment Min Amount',
                example: 5,
              },
              single_payment_max_amount: {
                type: 'number',
                format: 'double',
                nullable: true,
                description: 'Single Payment Max Amount',
                example: 5000,
                default: 9999999.99,
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell Phone',
                example: '3339998822',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Quick Invoice ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Created User Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Modified User Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              active: {
                type: 'boolean',
                description: 'Active status',
                example: true,
              },
              is_active: {
                type: 'boolean',
                description: 'Register is active',
                example: true,
              },
            },
            required: [
              'location_id',
              'title',
              'cc_product_transaction_id',
              'due_date',
              'item_list',
              'id',
              'created_ts',
              'modified_ts',
            ],
            description: 'Quick Invoice Information on `expand`',
          },
          log_emails: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                subject: {
                  type: 'string',
                  maxLength: 256,
                  description: 'Subject',
                  example: 'Payment Receipt - 12skiestech',
                },
                body: {
                  type: 'string',
                  description: 'Body',
                  example: 'This email is being sent from a server.',
                },
                source_address: {
                  type: 'string',
                  maxLength: 64,
                  description: 'Source Address',
                  example: '"12skiestech A7t3qi" <noreply@zeamster.email>',
                },
                return_path: {
                  type: 'string',
                  maxLength: 64,
                  description: 'Return Path',
                  example: '"12skiestech A7t3qi" <noreply@zeamster.email>',
                },
                provider_id: {
                  type: 'string',
                  maxLength: 60,
                  nullable: true,
                  description: 'Provider',
                  example:
                    '0100017e67bcc530-e1dd23b4-8a39-4a5b-8d5d-68d51c4c942f-000000',
                },
                domain_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Domain',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                reason_sent: {
                  type: 'string',
                  maxLength: 36,
                  nullable: true,
                  description: 'Reason Sent',
                  example: 'Contact Email',
                },
                reason_model: {
                  type: 'string',
                  maxLength: 64,
                  enum: [
                    'Contact',
                    'Transaction',
                    'Recurring',
                    'User',
                    'ProductTransaction',
                    'TransactionBatch',
                    'QuickInvoice',
                    'DataExport',
                    'UserReportSchedule',
                    'UserReport',
                    'Paylink',
                  ],
                  nullable: true,
                  description: 'Reason Model',
                  example: 'Transaction',
                },
                reason_model_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Reason Model',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                reply_to: {
                  type: 'string',
                  maxLength: 520,
                  nullable: true,
                  description: 'Reply To',
                  example: '"Zeamster" <emma.p@zeamster.com>',
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Log Email Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
              },
              required: [
                'subject',
                'body',
                'source_address',
                'return_path',
                'id',
                'created_ts',
              ],
            },
            description: 'Log Email Information on `expand`',
          },
          is_voidable: {
            type: 'boolean',
            description: 'Is Voidable Information on `expand`',
            example: true,
          },
          is_reversible: {
            type: 'boolean',
            description: 'Is Reversible Information on `expand`',
            example: true,
          },
          is_refundable: {
            type: 'boolean',
            description: 'Is Refundable Information on `expand`',
            example: true,
          },
          is_completable: {
            type: 'boolean',
            description: 'Is Competable Information on `expand`',
            example: true,
          },
          is_settled: {
            type: 'boolean',
            description: 'Is Settled Information on `expand`',
            example: true,
          },
          created_user: {
            type: 'object',
            properties: {
              account_number: {
                type: 'string',
                nullable: true,
                description: 'Account Number',
                example: '5454545454545454',
              },
              address: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 255,
                nullable: true,
                description: 'Address',
                example: '43155 Main Street STE 2310-C',
              },
              branding_domain_url: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Branding Domain Url',
                example: '{branding_domain_url}',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell Phone',
                example: '3339998822',
              },
              city: {
                type: 'string',
                pattern: "^[\\w#,.\\-'&\\s/]+$",
                maxLength: 36,
                nullable: true,
                description: 'City',
                example: 'Novi',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              contact_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Contact',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Date Of Birth',
                example: '2021-12-01',
              },
              domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 128,
                description: 'Email',
                example: 'email@domain.com',
              },
              email_trx_receipt: {
                type: 'boolean',
                description: 'Email Trx Receipt',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Home Phone',
                example: '3339998822',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              locale: {
                type: 'string',
                maxLength: 8,
                nullable: true,
                description: 'Locale',
                example: 'en-US',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office Phone',
                example: '3339998822',
              },
              office_ext_phone: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Office Ext Phone',
                example: '5',
              },
              primary_location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Primary Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              requires_new_password: {
                type: 'string',
                maxLength: 1,
                nullable: true,
                description: 'Requires New Password',
                example: null,
              },
              state: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description: 'State',
                example: 'Michigan',
              },
              terms_condition_code: {
                type: 'string',
                nullable: true,
                description:
                  'Terms Condition (This field is required when updating your own password).',
                example: '20220308',
              },
              tz: {
                type: 'string',
                maxLength: 30,
                description: 'Time zone',
                example: 'America/New_York',
              },
              ui_prefs: {
                type: 'object',
                properties: {
                  entry_page: {
                    type: 'string',
                    nullable: true,
                    description: 'Ui Prefs Entry Page',
                    example: 'dashboard',
                  },
                  page_size: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 99,
                    nullable: true,
                    description: 'Ui Prefs Page Size',
                    example: 2,
                  },
                  report_export_type: {
                    type: 'string',
                    enum: ['csv', 'tsv', 'xls', 'xlsx'],
                    nullable: true,
                    description: 'Ui Prefs Export Type',
                    example: 'csv',
                  },
                  process_method: {
                    type: 'string',
                    enum: ['virtual_terminal', 'physical_terminal'],
                    nullable: true,
                    description: 'Ui Prefs Process Method',
                    example: 'virtual_terminal',
                  },
                  default_terminal: {
                    type: 'string',
                    pattern:
                      '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                    nullable: true,
                    description: 'Ui Prefs Default Termianl',
                    example: '11e95f8ec39de8fbdb0a4f1a',
                  },
                },
                description: 'Ui Prefs',
              },
              username: {
                type: 'string',
                minLength: 2,
                maxLength: 64,
                description: 'Username',
                example: '{user_name}',
              },
              user_api_key: {
                type: 'string',
                minLength: 16,
                maxLength: 64,
                nullable: true,
                description: 'User Api Key',
                example: '234bas8dfn8238f923w2',
              },
              user_hash_key: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description: 'User Hash Key',
                example: null,
              },
              user_type_code: {
                type: 'integer',
                enum: [200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 100],
                description: 'User Type',
                example: 100,
              },
              password: {
                type: 'string',
                pattern:
                  '^(?=.*[`!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>/?~])(?=.*[0-9])(?=.*[a-zA-Z]).*$',
                minLength: 8,
                maxLength: 128,
                nullable: true,
                description: 'Password',
                example: null,
              },
              zip: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-\\s]+$',
                minLength: 4,
                maxLength: 10,
                nullable: true,
                description: 'Zip',
                example: '48375',
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_api_id: {
                type: 'string',
                nullable: true,
                description: 'ContactApi Id',
                example: null,
              },
              primary_location_api_id: {
                type: 'string',
                nullable: true,
                description: 'Primary LocationApi ID',
                example: null,
              },
              status_id: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'User ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              status: {
                type: 'boolean',
                description: 'Status',
                example: true,
              },
              login_attempts: {
                type: 'number',
                format: 'float',
                description: 'Login Attempts',
                example: 0,
              },
              last_login_ts: {
                type: 'integer',
                description: 'Last Login',
                example: 1422040992,
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Created User',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terms_accepted_ts: {
                type: 'integer',
                nullable: true,
                description: 'Terms Accepted',
                example: 1422040992,
              },
              terms_agree_ip: {
                type: 'string',
                maxLength: 16,
                nullable: true,
                description: 'Terms Agree Ip',
                example: '192.168.0.10',
              },
              current_date_time: {
                type: 'string',
                maxLength: 24,
                description: 'Current Date Time',
                example: '2019-03-11T10:38:26-0700',
              },
            },
            required: [
              'email',
              'last_name',
              'primary_location_id',
              'tz',
              'username',
              'user_type_code',
              'id',
              'status',
              'login_attempts',
              'last_login_ts',
              'created_ts',
              'modified_ts',
              'created_user_id',
              'current_date_time',
            ],
            description: 'User Information on `expand`',
          },
          location: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              account_number: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-_]+$',
                maxLength: 32,
                nullable: true,
                description: 'Account number',
                example: '5454545454545454',
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City name',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 2,
                    nullable: true,
                    description: 'State name',
                    example: 'MI',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street',
                    example: '43155 Main Street STE 2310-C',
                  },
                  street2: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street 2',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address',
              },
              branding_domain_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'GUID for Branding Domain',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              contact_email_trx_receipt_default: {
                type: 'boolean',
                description:
                  'If true, will email contact receipt for any transaction',
                example: true,
              },
              default_ach: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description:
                  "GUID for Location's default ACH Product Transaction",
                example: '11e608a7d515f1e093242bb2',
              },
              default_cc: {
                type: 'string',
                minLength: 24,
                maxLength: 36,
                nullable: true,
                description:
                  "GUID for Location's default CC Product Transaction",
                example: '11e608a442a5f1e092242dda',
              },
              developer_company_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'GUID for Developer Company',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email_reply_to: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description:
                  'Used as from email address when sending various notifications',
                example: 'email@domain.com',
              },
              fax: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Fax number',
                example: '3339998822',
              },
              location_api_id: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Location api ID',
                example: 'location-111111',
              },
              location_api_key: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Location api key',
                example: 'AE34BBCAADF4AE34BBCAADF4',
              },
              location_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom 1',
              },
              location_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom 2',
              },
              location_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Can be used to store custom information for location.',
                example: 'custom data 3',
              },
              name: {
                type: 'string',
                maxLength: 64,
                minLength: 1,
                description: 'Name of the company',
                example: 'Sample Company Headquarters',
              },
              office_phone: {
                type: 'string',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Office phone number',
                example: '2481234567',
              },
              office_ext_phone: {
                type: 'string',
                maxLength: 10,
                nullable: true,
                description: 'Office phone extension number',
                example: '1021021209',
              },
              recurring_notification_days_default: {
                type: 'integer',
                minimum: 0,
                maximum: 365,
                nullable: true,
                description:
                  'Number of days prior to a Recurring running that a notification should be sent',
                example: 0,
              },
              tz: {
                type: 'string',
                maxLength: 30,
                nullable: true,
                description: 'Time zone',
                example: 'America/New_York',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location GUID of the parent location',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              ticket_hash_key: {
                type: 'string',
                maxLength: 36,
                nullable: true,
                description: 'Ticket Hash Key',
                example: 'A5F443CADF4AE34BBCAADF4',
              },
            },
            required: ['id', 'created_ts', 'modified_ts', 'name', 'parent_id'],
            description: 'Location Information on `expand`',
          },
          contact: {
            type: 'object',
            properties: {
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              account_number: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Contact Account Number',
                example: '54545433332',
              },
              contact_api_id: {
                type: 'string',
                pattern: '^[a-zA-Z0-9]*$',
                maxLength: 64,
                nullable: true,
                description: 'Contact API Id',
                example: '137',
              },
              first_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'First Name',
                example: 'John',
              },
              last_name: {
                type: 'string',
                maxLength: 64,
                description: 'Last Name',
                example: 'Smith',
              },
              cell_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Cell phone of contact',
                example: '3339998822',
              },
              balance: {
                type: 'number',
                format: 'double',
                minimum: -99999999.99,
                maximum: 99999999.99,
                nullable: true,
                description: 'Balance',
                example: 245.36,
              },
              address: {
                type: 'object',
                properties: {
                  city: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 36,
                    nullable: true,
                    description: 'City of contact',
                    example: 'Novi',
                  },
                  state: {
                    type: 'string',
                    maxLength: 24,
                    nullable: true,
                    description: 'State of contact',
                    example: 'Michigan',
                  },
                  postal_code: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9\\-\\s]+$',
                    minLength: 4,
                    maxLength: 10,
                    nullable: true,
                    description: 'Postal code of contact',
                    example: '48375',
                  },
                  country: {
                    type: 'string',
                    enum: ['US', 'CA'],
                    nullable: true,
                    description: 'Country of contact',
                    example: 'US',
                  },
                  street: {
                    type: 'string',
                    pattern: "^[\\w#,.\\-'&\\s/]+$",
                    maxLength: 255,
                    nullable: true,
                    description: 'Street of contact',
                    example: '43155 Main Street STE 2310-C',
                  },
                },
                description: 'Address of contact',
              },
              company_name: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Company Name',
                example: 'Fortis Payment Systems, LLC',
              },
              header_message: {
                type: 'string',
                maxLength: 250,
                nullable: true,
                description: 'Header Message',
                example: 'This is a sample message for you',
              },
              date_of_birth: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts DOB, Format: yyyy-MM-dd',
                example: '2021-12-01',
              },
              email_trx_receipt: {
                type: 'boolean',
                description:
                  'Whether or not to email all transactions receipts to contact (1 or 0)',
                example: true,
              },
              home_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts home phone',
                example: '3339998822',
              },
              office_phone: {
                type: 'string',
                pattern: '^\\d{10}$',
                minLength: 10,
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone',
                example: '3339998822',
              },
              office_phone_ext: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                maxLength: 10,
                nullable: true,
                description: 'Contacts office phone extension for office phone',
                example: '5',
              },
              header_message_type: {
                type: 'integer',
                minimum: 0,
                maximum: 4,
                description: 'Header Message Type',
                example: 0,
              },
              update_if_exists: {
                type: 'number',
                format: 'float',
                enum: [1],
                nullable: true,
                description: 'Update If Exists',
                example: 1,
              },
              contact_c1: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 1 for api users to store custom data',
                example: 'any',
              },
              contact_c2: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 2 for api users to store custom data',
                example: 'anything',
              },
              contact_c3: {
                type: 'string',
                maxLength: 128,
                nullable: true,
                description:
                  'Custom field 3 for api users to store custom data',
                example: 'something',
              },
              parent_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Parent Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              email: {
                type: 'string',
                format: 'email',
                maxLength: 64,
                nullable: true,
                description: 'Email of contact',
                example: 'email@domain.com',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Contact ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              active: {
                type: 'boolean',
                description: 'Active',
                example: true,
              },
            },
            required: [
              'location_id',
              'last_name',
              'email_trx_receipt',
              'header_message_type',
              'id',
              'created_ts',
              'modified_ts',
              'active',
            ],
            description: 'Contact Information on `expand`',
          },
          changelogs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Change Log ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                action: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Action',
                  example: 'CREATE',
                },
                model: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Model',
                  example: 'TransactionRequest',
                },
                model_id: {
                  type: 'string',
                  maxLength: 255,
                  nullable: true,
                  description: 'Model ID',
                  example: '11ec829598f0d4008be9aba4',
                },
                user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                changelog_details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        pattern:
                          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                        nullable: true,
                        description: 'ID',
                        example: '11e95f8ec39de8fbdb0a4f1a',
                      },
                      changelog_id: {
                        type: 'string',
                        pattern:
                          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                        nullable: true,
                        description: 'Changelog ID',
                        example: '11e95f8ec39de8fbdb0a4f1a',
                      },
                      field: {
                        type: 'string',
                        nullable: true,
                        description: 'Field',
                        example: 'next_run_ts',
                      },
                      old_value: {
                        type: 'string',
                        nullable: true,
                        description: 'Old Value',
                        example: '1643616000',
                      },
                    },
                  },
                  description: 'Change Log Details',
                },
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      pattern:
                        '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                      nullable: true,
                      description: 'ID',
                      example: '11e95f8ec39de8fbdb0a4f1a',
                    },
                    username: {
                      type: 'string',
                      nullable: true,
                      description: 'Username',
                      example: 'email@domain.com',
                    },
                    first_name: {
                      type: 'string',
                      nullable: true,
                      description: 'First Name',
                      example: 'Bob',
                    },
                    last_name: {
                      type: 'string',
                      nullable: true,
                      description: 'Last Name',
                      example: 'Fairview',
                    },
                  },
                  description: 'User',
                },
              },
              required: ['id'],
            },
            description: 'Changelog Information on `expand`',
          },
          product_transaction: {
            type: 'object',
            properties: {
              processor_version: {
                type: 'string',
                nullable: true,
                description: 'Processor Version',
                example: '1_0_0',
              },
              industry_type: {
                type: 'string',
                maxLength: 45,
                enum: [
                  'ecommerce',
                  'restaurant',
                  'lodging',
                  'moto',
                  'retail',
                  'retail self serve',
                ],
                nullable: true,
                description: 'Industry Type',
                example: null,
              },
              title: {
                type: 'string',
                maxLength: 64,
                description: 'Title',
                example: 'My terminal',
              },
              payment_method: {
                type: 'string',
                enum: ['cc', 'ach'],
                description: 'Payment method',
                example: 'cc',
              },
              processor: {
                type: 'string',
                enum: ['zgate', 'zgate2', 'zach', 'ach', 'fortisach'],
                nullable: true,
                description: 'Processor',
                example: 'zgate',
              },
              mcc: {
                type: 'string',
                pattern: '^\\d+$',
                maxLength: 4,
                description: 'MCC',
                example: '1111',
              },
              tax_surcharge_config: {
                type: 'number',
                format: 'float',
                enum: [2, 3],
                nullable: true,
                description: 'Tax Surcharge Config',
                example: 2,
                default: 2,
              },
              terminal_id: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description: 'Terminal ID',
                example: null,
              },
              partner: {
                type: 'string',
                maxLength: 24,
                enum: [
                  'standalone',
                  'verticle',
                  'Vericle',
                  'AirVoice',
                  'drchrono',
                  'schoolleader',
                  'Frontier',
                  'ChiroTouch',
                  'Platinum',
                  'CentralProcessingService',
                ],
                nullable: true,
                description: 'Partner',
                example: 'standalone',
              },
              product_ach_pv_store_id: {
                type: 'string',
                nullable: true,
                description: 'Product Ach Pv Store ID',
                example: null,
              },
              invoice_adjustment_title: {
                type: 'string',
                nullable: true,
                description: 'Invoice Adjustment Title',
                example: null,
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              location_api_id: {
                type: 'string',
                nullable: true,
                description: 'Location Api ID',
                example: null,
              },
              billing_location_api_id: {
                type: 'string',
                nullable: true,
                description: 'Billing Location API ID',
                example: null,
              },
              portfolio_id: {
                type: 'string',
                nullable: true,
                description: 'Portfolio ID',
                example: null,
              },
              portfolioValidationRule: {
                type: 'string',
                nullable: true,
                description: 'Product Validation Rule',
                example: null,
              },
              sub_processor: {
                type: 'string',
                maxLength: 48,
                nullable: true,
                description: 'Sub Processor',
                example: null,
              },
              surcharge: {
                type: 'object',
                properties: {},
                description: 'Surcharge',
              },
              processor_data: {
                type: 'object',
                properties: {},
                description: ' ',
              },
              vt_clerk_number: {
                type: 'boolean',
                description: 'Vt Clerk Number',
                example: true,
              },
              vt_billing_phone: {
                type: 'boolean',
                description: 'Card Type JCB',
                example: true,
              },
              vt_enable_tip: {
                type: 'boolean',
                description: 'VT Enable Tip',
                example: true,
              },
              ach_allow_debit: {
                type: 'boolean',
                description: 'Ach Allow Debit',
                example: true,
              },
              ach_allow_credit: {
                type: 'boolean',
                description: 'Ach Allow Credit',
                example: true,
              },
              ach_allow_refund: {
                type: 'boolean',
                description: 'Ach Allow Refund',
                example: true,
              },
              vt_cvv: {
                type: 'boolean',
                description: 'VT CVV',
                example: true,
              },
              vt_street: {
                type: 'boolean',
                description: 'VT Street',
                example: true,
              },
              vt_zip: {
                type: 'boolean',
                description: 'VT Zip',
                example: true,
              },
              vt_order_num: {
                type: 'boolean',
                description: 'VT Order Num',
                example: true,
              },
              vt_enable: {
                type: 'boolean',
                description: 'VT Enable',
                example: true,
              },
              receipt_show_contact_name: {
                type: 'boolean',
                description: 'Receipt Show Contact Name',
                example: true,
              },
              display_avs: {
                type: 'boolean',
                description: 'Display Avs',
                example: true,
              },
              card_type_visa: {
                type: 'boolean',
                description: 'Card Type Visa',
                example: true,
              },
              card_type_mc: {
                type: 'boolean',
                description: 'Card Type Mc',
                example: true,
              },
              card_type_disc: {
                type: 'boolean',
                description: 'Card Type Disc',
                example: true,
              },
              card_type_amex: {
                type: 'boolean',
                description: 'Card Type Amex',
                example: true,
              },
              card_type_diners: {
                type: 'boolean',
                description: 'Card Type Dinners',
                example: true,
              },
              card_type_jcb: {
                type: 'boolean',
                description: ' ',
                example: true,
              },
              invoice_location: {
                type: 'boolean',
                description: 'Invoice Location',
                example: true,
              },
              allow_partial_authorization: {
                type: 'boolean',
                description: 'Allow Partial Authorization',
                example: true,
              },
              allow_recurring_partial_authorization: {
                type: 'boolean',
                description: 'Allow Recurring Partial Authorization',
                example: true,
              },
              auto_decline_cvv: {
                type: 'boolean',
                description: 'Auto Decline Cvv',
                example: true,
              },
              auto_decline_street: {
                type: 'boolean',
                description: 'Auto Decline Street',
                example: true,
              },
              auto_decline_zip: {
                type: 'boolean',
                description: 'Auto Decline ZIP',
                example: true,
              },
              split_payments_allow: {
                type: 'boolean',
                description: 'Split Payments Allow',
                example: true,
              },
              vt_show_custom_fields: {
                type: 'boolean',
                description: 'Vt Show Custom Fields',
                example: true,
              },
              receipt_show_custom_fields: {
                type: 'boolean',
                description: 'Receipt Show Custom Fields',
                example: true,
              },
              vt_override_sales_tax_allowed: {
                type: 'boolean',
                description: 'Vt Override Sales Tax Allowed',
                example: true,
              },
              vt_enable_sales_tax: {
                type: 'boolean',
                description: 'Vt Enable Sales Tax',
                example: true,
              },
              vt_require_zip: {
                type: 'boolean',
                description: 'Vt Require ZIP',
                example: true,
              },
              vt_require_street: {
                type: 'boolean',
                description: 'Vt Require Street',
                example: true,
              },
              auto_decline_cavv: {
                type: 'boolean',
                description: 'Auto Decline Cavv',
                example: true,
              },
              merchant_id: {
                type: 'string',
                maxLength: 24,
                nullable: true,
                description: 'Merchant ID',
                example: null,
              },
              receipt_header: {
                type: 'string',
                maxLength: 255,
                nullable: true,
                description: 'Receipt Header',
                example: null,
              },
              receipt_footer: {
                type: 'string',
                maxLength: 255,
                nullable: true,
                description: 'Receipt Footer',
                example: null,
              },
              receipt_add_account_above_signature: {
                type: 'string',
                maxLength: 1032,
                nullable: true,
                description: 'Receipt Add Account Above Signature',
                example: null,
              },
              receipt_add_recurring_above_signature: {
                type: 'string',
                maxLength: 1032,
                nullable: true,
                description: 'Receipt Add Recurring Above Signature',
                example: null,
              },
              receipt_vt_above_signature: {
                type: 'string',
                maxLength: 1032,
                nullable: true,
                description: 'Receipt VT Above Signature',
                example: null,
              },
              default_transaction_type: {
                type: 'string',
                enum: ['debit', 'sale'],
                nullable: true,
                description: 'Default Transaction Type',
                example: null,
              },
              username: {
                type: 'string',
                maxLength: 512,
                nullable: true,
                description: 'Username',
                example: null,
              },
              password: {
                type: 'string',
                maxLength: 512,
                nullable: true,
                description: 'Passowrd',
                example: null,
              },
              current_batch: {
                type: 'number',
                format: 'float',
                minimum: 1,
                maximum: 9999,
                nullable: true,
                description: 'Current Batch',
                example: 34,
                default: 1,
              },
              dup_check_per_batch: {
                type: 'string',
                maxLength: 500,
                nullable: true,
                description: 'Dup Check Per Batch',
                example: null,
              },
              agent_code: {
                type: 'string',
                pattern: '^[\\w\\-]+$',
                maxLength: 16,
                nullable: true,
                description: 'Agent Code',
                example: null,
              },
              quick_invoice_allow: {
                type: 'boolean',
                description: 'Quick Invoice Allow',
                example: false,
              },
              level3_allow: {
                type: 'boolean',
                description: 'Level3 Allow',
                example: false,
              },
              payfac_enable: {
                type: 'boolean',
                description: 'Payfac Enable',
                example: false,
              },
              sales_office_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Sales Office ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              hosted_payment_page_max_allowed: {
                type: 'number',
                format: 'float',
                minimum: 1,
                maximum: 999,
                nullable: true,
                description: 'Hosted Payment Page Max Allowed',
                example: null,
                default: 5,
              },
              hosted_payment_page_allow: {
                type: 'boolean',
                description: 'Hosted Payment Page Allow',
                example: false,
              },
              surcharge_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Surcharge ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              level3_default: {
                type: 'string',
                nullable: true,
                description: 'Level3 Default',
                example: null,
              },
              cau_subscribe_type_id: {
                type: 'number',
                format: 'float',
                enum: [0, 1, 2],
                nullable: true,
                description: 'Cau Subscribe Type ID',
                example: 0,
              },
              cau_account_number: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-]+$',
                minLength: 32,
                maxLength: 32,
                nullable: true,
                description: 'Cau Account Number',
                example: null,
              },
              location_billing_account_id: {
                type: 'string',
                nullable: true,
                description: 'Location Billing Account ID',
                example: '11eb88b873980c64a21e5fd2',
              },
              product_billing_group_id: {
                type: 'string',
                nullable: true,
                description: 'Product Billing Group ID',
                example: 'nofees',
              },
              account_number: {
                type: 'string',
                pattern: '^[a-zA-Z0-9\\-_]+$',
                maxLength: 32,
                nullable: true,
                description: 'Account number',
                example: '12345678',
              },
              run_avs_on_accountvault_create: {
                type: 'boolean',
                description: 'Run Avs On Accountvault Create',
                example: false,
              },
              accountvault_expire_notification_email_enable: {
                type: 'boolean',
                description: 'Accountvault Expire Notification Email Enable',
                example: false,
              },
              debit_allow_void: {
                type: 'boolean',
                description: 'Debit Allow Void',
                example: false,
              },
              quick_invoice_text_to_pay: {
                type: 'boolean',
                description: 'Quick Invoice Text To Pay',
                example: false,
              },
              authentication_code: {
                type: 'string',
                nullable: true,
                description: 'Authentication Code',
                example: null,
              },
              sms_enable: {
                type: 'boolean',
                description: 'SMS Enable',
                example: false,
              },
              vt_show_currency: {
                type: 'boolean',
                description: 'Vt Show Currency',
                example: true,
              },
              receipt_show_currency: {
                type: 'boolean',
                description: 'Receipt Show Currency',
                example: false,
              },
              allow_blind_refund: {
                type: 'boolean',
                description: 'Allow Blind Refund',
                example: false,
              },
              vt_show_company_name: {
                type: 'boolean',
                description: 'Vt Show Company Name',
                example: false,
              },
              receipt_show_company_name: {
                type: 'boolean',
                description: 'Receipt Show Company Name',
                example: false,
              },
              bank_funded_only: {
                type: 'boolean',
                description: 'Bank Funded Only',
                example: false,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'User Reports ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              receipt_logo: {
                type: 'string',
                description: 'Receipt Logo',
                example: null,
              },
              active: {
                type: 'boolean',
                description: 'Active',
                example: true,
              },
              tz: {
                type: 'string',
                nullable: true,
                description: 'TZ',
                example: null,
              },
              currency_code: {
                type: 'number',
                format: 'float',
                nullable: true,
                description: 'Currency Code',
                example: null,
                default: 840,
              },
              current_stan: {
                type: 'number',
                format: 'float',
                nullable: true,
                description: 'Current Stan',
                example: null,
                default: 1,
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                nullable: true,
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'User ID Created the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Last User ID that updated the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            required: ['title', 'payment_method', 'mcc', 'location_id', 'id'],
            description: 'Product Transaction Information on `expand`',
          },
          all_tags: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                title: {
                  type: 'string',
                  maxLength: 64,
                  description: 'Tag Title',
                  example: 'My terminal',
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Tag ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
              },
              required: [
                'location_id',
                'title',
                'id',
                'created_ts',
                'modified_ts',
              ],
            },
            description: 'All Tag Information on `expand`',
          },
          tagTransactions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                tag_id: {
                  type: 'string',
                  description: 'Tag',
                  example: 'Tag ID',
                },
                transaction_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Transaction ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                payment_method: {
                  type: 'string',
                  nullable: true,
                  description: 'Payment Method',
                  example: null,
                },
                created: {
                  type: 'string',
                  nullable: true,
                  description: 'Created',
                  example: null,
                },
                modified: {
                  type: 'string',
                  nullable: true,
                  description: 'Modified',
                  example: null,
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
                created_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID Created the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                modified_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Last User ID that updated the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: ['tag_id', 'transaction_id'],
            },
            description: 'TagTransaction Information on `expand`',
          },
          declined_recurring_notification: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              declined_transaction_id: {
                type: 'string',
                nullable: true,
                description: 'Declined Transaction ID',
                example: null,
              },
              payment_transaction_id: {
                type: 'string',
                nullable: true,
                description: 'Payment Transaction ID',
                example: null,
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'User ID Created the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_ts: {
                type: 'integer',
                nullable: true,
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Last User ID that updated the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            description:
              'Declined Recurring Notification Information on `expand`',
          },
          payment_recurring_notification: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              declined_transaction_id: {
                type: 'string',
                nullable: true,
                description: 'Declined Transaction ID',
                example: null,
              },
              payment_transaction_id: {
                type: 'string',
                nullable: true,
                description: 'Payment Transaction ID',
                example: null,
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'User ID Created the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_ts: {
                type: 'integer',
                nullable: true,
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Last User ID that updated the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            description:
              'Payment Recurring Notification Information on `expand`',
          },
          developer_company: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                maxLength: 64,
                description: 'Title',
                example: 'My terminal',
              },
              description: {
                type: 'string',
                maxLength: 64,
                description: 'Description',
                example: null,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Developer Company Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              active: {
                type: 'boolean',
                description: 'Active',
                example: true,
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'User ID Created the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Last User ID that updated the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            required: ['title', 'id', 'active', 'created_ts', 'modified_ts'],
            description: 'Developer Company Information on `expand`',
          },
          terminal: {
            type: 'object',
            properties: {
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              default_product_transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Product Transaction ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terminal_application_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Terminal Application ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terminal_cvm_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Terminal CVM ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              terminal_manufacturer_code: {
                type: 'string',
                enum: ['1', '2', '4', '100'],
                description: 'Terminal Manufacturer Code',
                example: '1',
              },
              title: {
                type: 'string',
                maxLength: 64,
                description: 'Terminal Name',
                example: 'My terminal',
              },
              mac_address: {
                type: 'string',
                pattern: '^([0-9a-fA-F]{2}[:-]?){5}([0-9a-fA-F]{2})$',
                nullable: true,
                description: 'Terminal MAC Address',
                example: '3D:F2:C9:A6:B3:4F',
              },
              local_ip_address: {
                type: 'string',
                description: 'Terminal Local IP Address',
                example: '192.168.0.10',
              },
              port: {
                type: 'integer',
                minimum: 0,
                maximum: 65535,
                description: 'Terminal Port',
                example: 10009,
                default: 10009,
              },
              serial_number: {
                type: 'string',
                pattern: '^[a-zA-Z0-9]*$',
                maxLength: 24,
                description: 'Terminal Serial Number',
                example: '1234567890',
              },
              terminal_number: {
                type: 'string',
                minLength: 15,
                maxLength: 15,
                description: 'Terminal Number',
                example: '973456789012367',
              },
              terminal_timeouts: {
                type: 'object',
                properties: {
                  card_entry_timeout: {
                    type: 'integer',
                    minimum: 20,
                    maximum: 120,
                    nullable: true,
                    description: 'How long to wait for input from cardholder.',
                    example: 47,
                    default: 120,
                  },
                  device_terms_prompt_timeout: {
                    type: 'integer',
                    minimum: 5,
                    maximum: 300,
                    nullable: true,
                    description:
                      'How long the terms will be displayed on the device.',
                    example: 30,
                    default: 60,
                  },
                  overall_timeout: {
                    type: 'integer',
                    minimum: 30,
                    maximum: 300,
                    nullable: true,
                    description:
                      'How long to wait for response from /v2/routertransactions endpoint.',
                    example: 125,
                    default: 300,
                  },
                  pin_entry_timeout: {
                    type: 'integer',
                    minimum: 20,
                    maximum: 50,
                    nullable: true,
                    description:
                      'How long to wait for pin entry by cardholder.',
                    example: 40,
                    default: 30,
                  },
                  signature_input_timeout: {
                    type: 'integer',
                    minimum: 10,
                    maximum: 50,
                    nullable: true,
                    description:
                      'How long to wait for first "touch" to signature.',
                    example: 35,
                    default: 10,
                  },
                  signature_submit_timeout: {
                    type: 'integer',
                    minimum: 20,
                    maximum: 50,
                    nullable: true,
                    description:
                      'How long to wait for signature to be submitted.',
                    example: 38,
                    default: 30,
                  },
                  status_display_time: {
                    type: 'integer',
                    minimum: 1,
                    maximum: 30,
                    nullable: true,
                    description:
                      'How long the approve/decline status message stays on screen.',
                    example: 12,
                    default: 7,
                  },
                  tip_cashback_timeout: {
                    type: 'integer',
                    minimum: 20,
                    maximum: 50,
                    nullable: true,
                    description:
                      'How long to wait for input on a tip or cashback screen.',
                    example: 25,
                    default: 30,
                  },
                  transaction_timeout: {
                    type: 'integer',
                    minimum: 10,
                    maximum: 20,
                    nullable: true,
                    description:
                      'How long to wait for response from the processor.',
                    example: 17,
                    default: 10,
                  },
                },
                description:
                  'The following options outlines some configurable timeout values that can be used to customize the experience at the terminal for the cardholder.',
              },
              tip_percents: {
                type: 'object',
                properties: {
                  percent_1: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 99,
                    nullable: true,
                    description:
                      'field can only contain a value from 0 to 99, if 1 field is NULL, all fields must be null.',
                    example: 0,
                  },
                  percent_2: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 99,
                    nullable: true,
                    description:
                      'field can only contain a value from 0 to 99, if 1 field is NULL, all fields must be null.',
                    example: 2,
                  },
                  percent_3: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 99,
                    nullable: true,
                    description:
                      'field can only contain a value from 0 to 99, if 1 field is NULL, all fields must be null.',
                    example: 99,
                  },
                },
                description:
                  'A JSON of tip percents the JSON MUST contain only these three fields: percent_1, percent_2, percent_3',
              },
              location_api_id: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Location Api ID',
                example: null,
              },
              terminal_api_id: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Terminal Api ID',
                example: null,
              },
              header_line_1: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Header Line 1',
                example: 'line 1 sample',
              },
              header_line_2: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Header Line 2',
                example: 'line 2 sample',
              },
              header_line_3: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Header Line 3',
                example: 'line 3 sample',
              },
              header_line_4: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Header Line 4',
                example: 'line 4 sample',
              },
              header_line_5: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Header Line 5',
                example: 'line 5 sample',
              },
              trailer_line_1: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Trailer Line 1',
                example: 'trailer 1 sample',
              },
              trailer_line_2: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Trailer Line 2',
                example: 'trailer 2 sample',
              },
              trailer_line_3: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Trailer Line 3',
                example: 'trailer 3 sample',
              },
              trailer_line_4: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Trailer Line 4',
                example: 'trailer 4 sample',
              },
              trailer_line_5: {
                type: 'string',
                maxLength: 32,
                nullable: true,
                description: 'Trailer Line 5',
                example: 'trailer 5 sample',
              },
              default_checkin: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Default Checkin',
                example: '2021-12-01',
              },
              default_checkout: {
                type: 'string',
                pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
                maxLength: 10,
                nullable: true,
                description: 'Default Checkout',
                example: '2021-12-01',
              },
              default_room_rate: {
                type: 'number',
                format: 'float',
                minimum: 0,
                maximum: 100,
                nullable: true,
                description: 'Default Room Rate',
                example: 56,
              },
              default_room_number: {
                type: 'string',
                maxLength: 12,
                nullable: true,
                description: 'Default Room Number',
                example: '303',
              },
              debit: {
                type: 'boolean',
                description: 'Debit',
                example: false,
              },
              emv: {
                type: 'boolean',
                description: 'EMV',
                example: false,
              },
              cashback_enable: {
                type: 'boolean',
                description: 'Cashback Enable',
                example: false,
              },
              print_enable: {
                type: 'boolean',
                description: 'Print Enable',
                example: false,
              },
              sig_capture_enable: {
                type: 'boolean',
                description: 'Sig Capture Enable',
                example: false,
              },
              is_provisioned: {
                type: 'boolean',
                description: 'Is Provisioned',
                example: false,
              },
              tip_enable: {
                type: 'boolean',
                description: 'Tip Enable',
                example: false,
              },
              validated_decryption: {
                type: 'boolean',
                description: 'Validated Decryption',
                example: false,
              },
              communication_type: {
                type: 'string',
                enum: ['http', 'tcp/ip', 'usb/serial'],
                nullable: true,
                description: 'Communication Type',
                example: 'http',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Terminal ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              last_registration_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'User ID Created the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Last User ID that updated the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            required: [
              'location_id',
              'terminal_application_id',
              'terminal_manufacturer_code',
              'title',
              'local_ip_address',
              'port',
              'serial_number',
              'terminal_number',
              'debit',
              'emv',
              'cashback_enable',
              'print_enable',
              'sig_capture_enable',
              'id',
              'created_ts',
              'modified_ts',
              'last_registration_ts',
              'created_user_id',
              'modified_user_id',
            ],
            description: 'Terminal Information on `expand`',
          },
          hosted_payment_page: {
            type: 'object',
            properties: {
              user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'User ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              location_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Location ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              location_api_id: {
                type: 'string',
                nullable: true,
                description: 'Location Api Id',
                example: null,
              },
              product_transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Product Transaction ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              title: {
                type: 'string',
                maxLength: 64,
                description: 'Title',
                example: 'Sample title',
              },
              redirect_url_delay: {
                type: 'number',
                format: 'float',
                maximum: 15,
                nullable: true,
                description: 'Redirect Url Delay',
                example: 15,
                default: 15,
              },
              min_payment_amount: {
                type: 'number',
                format: 'double',
                minimum: 0,
                nullable: true,
                description: 'Min Payment Amount',
                example: 0,
              },
              max_payment_amount: {
                type: 'number',
                format: 'double',
                maximum: 99999999.99,
                nullable: true,
                description: 'Max Payment Amount',
                example: 99999999.99,
                default: 99999999.99,
              },
              redirect_url_on_approve: {
                type: 'string',
                nullable: true,
                description: 'Redirect Url On Approval',
                example: null,
              },
              redirect_url_on_decline: {
                type: 'string',
                nullable: true,
                description: 'Redirect Url On Decline',
                example: null,
              },
              field_configuration: {
                type: 'object',
                properties: {
                  css_mini: {
                    type: 'boolean',
                    description: 'CSS Mini',
                    example: true,
                  },
                  stack: {
                    type: 'string',
                    enum: ['horizontal', 'vertical'],
                    description: 'Stack',
                    example: 'vertical',
                  },
                  header: {
                    type: 'object',
                    properties: {
                      settings: {
                        type: 'object',
                        properties: {
                          enabled: {
                            type: 'boolean',
                            description: 'Enabled',
                            example: true,
                          },
                          columns: {
                            type: 'number',
                            format: 'float',
                            description: 'Columns',
                            example: 1,
                          },
                          rows: {
                            type: 'number',
                            format: 'float',
                            description: 'Rows',
                            example: 1,
                          },
                        },
                        required: ['enabled', 'columns', 'rows'],
                      },
                      fields: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              description: 'id',
                              example: 'transaction_amount',
                            },
                            label: {
                              type: 'string',
                              description: 'Label',
                              example: 'Header',
                            },
                            field_type: {
                              type: 'string',
                              description: 'Field Type',
                              example: 'heading',
                            },
                            position: {
                              type: 'array',
                              items: {
                                type: 'string',
                                example: '1',
                              },
                              minItems: 1,
                              description: 'Position',
                              example: '["1","0","1","1"]',
                            },
                            required: {
                              type: 'boolean',
                              description: 'Required',
                              example: true,
                            },
                            readonly: {
                              type: 'boolean',
                              description: 'Read Only',
                              example: true,
                            },
                            visible: {
                              type: 'boolean',
                              description: 'Visible',
                              example: true,
                            },
                            value: {
                              type: 'string',
                              nullable: true,
                              description: 'Value',
                              example: null,
                            },
                          },
                          required: ['id', 'label', 'field_type', 'position'],
                        },
                      },
                    },
                    required: ['settings', 'fields'],
                    description: 'Header',
                  },
                  body: {
                    type: 'object',
                    properties: {
                      settings: {
                        type: 'object',
                        properties: {
                          enabled: {
                            type: 'boolean',
                            description: 'Enabled',
                            example: true,
                          },
                          columns: {
                            type: 'number',
                            format: 'float',
                            description: 'Columns',
                            example: 1,
                          },
                          rows: {
                            type: 'number',
                            format: 'float',
                            description: 'Rows',
                            example: 1,
                          },
                        },
                        required: ['enabled', 'columns', 'rows'],
                      },
                      fields: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              description: 'id',
                              example: 'transaction_amount',
                            },
                            label: {
                              type: 'string',
                              description: 'Label',
                              example: 'Header',
                            },
                            field_type: {
                              type: 'string',
                              description: 'Field Type',
                              example: 'heading',
                            },
                            position: {
                              type: 'array',
                              items: {
                                type: 'string',
                                example: '1',
                              },
                              minItems: 1,
                              description: 'Position',
                              example: '["1","0","1","1"]',
                            },
                            required: {
                              type: 'boolean',
                              description: 'Required',
                              example: true,
                            },
                            readonly: {
                              type: 'boolean',
                              description: 'Read Only',
                              example: true,
                            },
                            visible: {
                              type: 'boolean',
                              description: 'Visible',
                              example: true,
                            },
                            value: {
                              type: 'string',
                              nullable: true,
                              description: 'Value',
                              example: null,
                            },
                          },
                          required: ['id', 'label', 'field_type', 'position'],
                        },
                      },
                    },
                    required: ['settings', 'fields'],
                    description: 'Body',
                  },
                  footer: {
                    type: 'object',
                    properties: {
                      settings: {
                        type: 'object',
                        properties: {
                          enabled: {
                            type: 'boolean',
                            description: 'Enabled',
                            example: true,
                          },
                          columns: {
                            type: 'number',
                            format: 'float',
                            description: 'Columns',
                            example: 1,
                          },
                          rows: {
                            type: 'number',
                            format: 'float',
                            description: 'Rows',
                            example: 1,
                          },
                        },
                        required: ['enabled', 'columns', 'rows'],
                      },
                      fields: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              description: 'id',
                              example: 'transaction_amount',
                            },
                            label: {
                              type: 'string',
                              description: 'Label',
                              example: 'Header',
                            },
                            field_type: {
                              type: 'string',
                              description: 'Field Type',
                              example: 'heading',
                            },
                            position: {
                              type: 'array',
                              items: {
                                type: 'string',
                                example: '1',
                              },
                              minItems: 1,
                              description: 'Position',
                              example: '["1","0","1","1"]',
                            },
                            required: {
                              type: 'boolean',
                              description: 'Required',
                              example: true,
                            },
                            readonly: {
                              type: 'boolean',
                              description: 'Read Only',
                              example: true,
                            },
                            visible: {
                              type: 'boolean',
                              description: 'Visible',
                              example: true,
                            },
                            value: {
                              type: 'string',
                              nullable: true,
                              description: 'Value',
                              example: null,
                            },
                          },
                          required: ['id', 'label', 'field_type', 'position'],
                        },
                      },
                    },
                    required: ['settings', 'fields'],
                    description: 'Footer',
                  },
                },
                required: ['css_mini', 'stack', 'body', 'footer'],
                description: 'field_configuration',
              },
              encryption_key: {
                type: 'string',
                minLength: 32,
                maxLength: 32,
                nullable: true,
                description: 'Encryption Key',
                example: null,
              },
              stylesheet_url: {
                type: 'string',
                nullable: true,
                description: 'Stylesheet Url',
                example: null,
              },
              parent_send_message: {
                type: 'boolean',
                description: 'Parent Send Message',
                example: true,
              },
              hide_optional_fields: {
                type: 'boolean',
                description: 'Hide Optional Fields',
                example: true,
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Hosted Payment Page Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'System generated id for user who created record',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'System generated id for user who created record',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            required: [
              'product_transaction_id',
              'title',
              'field_configuration',
              'id',
              'created_ts',
              'modified_ts',
            ],
            description: 'Hosted Payment Page Information on `expand`',
          },
          transaction_level3: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Level 3 ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Transaction ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              level3_data: {
                type: 'object',
                properties: {
                  destination_country_code: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 3,
                    nullable: true,
                    description:
                      'Code of the country where the goods are being shipped.',
                    example: '840',
                  },
                  duty_amount: {
                    type: 'number',
                    format: 'double',
                    minimum: 0,
                    maximum: 999999999999,
                    nullable: true,
                    description:
                      'Fee amount associated with the import of the purchased goods ,Can accept Two (2) decimal places',
                    example: 0,
                  },
                  freight_amount: {
                    type: 'number',
                    format: 'double',
                    minimum: 0,
                    maximum: 999999999999,
                    nullable: true,
                    description:
                      'Freight or shipping portion of the total transaction amount ,Can accept Two (2) decimal places.',
                    example: 0,
                  },
                  national_tax: {
                    type: 'number',
                    format: 'double',
                    maximum: 9999999999,
                    nullable: true,
                    description:
                      'National tax for the transaction ,Can accept Two (2) decimal places.',
                    example: 2,
                  },
                  sales_tax: {
                    type: 'number',
                    format: 'double',
                    maximum: 9999999999,
                    nullable: true,
                    description:
                      'Sales tax for the transaction ,Can accept Two (2) decimal places.',
                    example: 200,
                  },
                  shipfrom_zip_code: {
                    type: 'string',
                    maxLength: 10,
                    nullable: true,
                    description:
                      'Postal/ZIP code of the address from where the purchased goods are being shipped.',
                    example: 'AZ1234',
                  },
                  shipto_zip_code: {
                    type: 'string',
                    maxLength: 10,
                    nullable: true,
                    description:
                      'Postal/ZIP code of the address where purchased goods will be delivered.',
                    example: 'FL1234',
                  },
                  tax_amount: {
                    type: 'number',
                    format: 'double',
                    minimum: 0,
                    maximum: 999999999,
                    nullable: true,
                    description:
                      'Amount of any value added taxes ,Can accept Two (2) decimal places.',
                    example: 10,
                  },
                  tax_exempt: {
                    type: 'string',
                    enum: ['0', '1'],
                    nullable: true,
                    description: 'Sales Tax Exempt. Allowed values: “1”, “0”.',
                    example: '0',
                  },
                  customer_vat_registration: {
                    type: 'string',
                    maxLength: 13,
                    nullable: true,
                    description: 'Customer VAT Registration',
                    example: '12345678',
                  },
                  merchant_vat_registration: {
                    type: 'string',
                    maxLength: 20,
                    nullable: true,
                    description: 'Merchant VAT Registration',
                    example: '123456',
                  },
                  order_date: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 6,
                    nullable: true,
                    description: 'Order Date',
                    example: '171006',
                  },
                  summary_commodity_code: {
                    type: 'string',
                    maxLength: 4,
                    nullable: true,
                    description: 'Summary Commodity Code',
                    example: 'C1K2',
                  },
                  tax_rate: {
                    type: 'number',
                    format: 'double',
                    maximum: 9999,
                    nullable: true,
                    description:
                      'Tax rate used to calculate the sales tax amount, can accept 2 decimal places.',
                    example: 0,
                  },
                  unique_vat_ref_number: {
                    type: 'string',
                    maxLength: 15,
                    nullable: true,
                    description: 'Unique VAT Reference Number',
                    example: 'vat1234',
                  },
                  line_items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        description: {
                          type: 'string',
                          maxLength: 26,
                          description: 'Description of the item.',
                          example: 'cool drink',
                        },
                        commodity_code: {
                          type: 'string',
                          maxLength: 12,
                          description:
                            'An international description code of the individual good or service being supplied.',
                          example: 'cc123456',
                        },
                        discount_amount: {
                          type: 'number',
                          format: 'double',
                          maximum: 999999999999,
                          nullable: true,
                          description:
                            'Total discount amount applied against the line item total ,Can accept Two (2) decimal places.',
                          example: 0,
                        },
                        other_tax_amount: {
                          type: 'number',
                          format: 'double',
                          maximum: 999999999999,
                          nullable: true,
                          description:
                            'Used if city or multiple county taxes need to be broken out separately ,Can accept Two (2) decimal places.',
                          example: 0,
                        },
                        product_code: {
                          type: 'string',
                          maxLength: 12,
                          description:
                            'Merchant-defined description code of the item.',
                          example: 'fanta123456',
                        },
                        quantity: {
                          type: 'number',
                          format: 'float',
                          maximum: 99999,
                          nullable: true,
                          description:
                            'Quantity of the item, can accept Four (4) decimal places.',
                          example: 12,
                        },
                        tax_amount: {
                          type: 'number',
                          format: 'double',
                          minimum: 0,
                          maximum: 999999999,
                          nullable: true,
                          description:
                            'Amount of any value added taxes, can accept Two (2) decimal places.',
                          example: 4,
                        },
                        tax_rate: {
                          type: 'number',
                          format: 'double',
                          maximum: 9999,
                          nullable: true,
                          description:
                            'Tax rate used to calculate the sales tax amount, can accept 2 decimal places.',
                          example: 0,
                        },
                        unit_code: {
                          type: 'string',
                          minLength: 3,
                          maxLength: 3,
                          description:
                            'Units of measurement as used in international trade. (See Codes for Units of Measurement below for unit code abbreviations)',
                          example: 'gll',
                        },
                        unit_cost: {
                          type: 'number',
                          format: 'double',
                          maximum: 999999999999,
                          description:
                            'Unit cost of the item ,Can accept Four (4) decimal places.',
                          example: 3,
                        },
                        alternate_tax_id: {
                          type: 'string',
                          maxLength: 15,
                          nullable: true,
                          description:
                            'Tax identification number of the merchant that reported the alternate tax amount.',
                          example: '1234',
                        },
                        debit_credit: {
                          type: 'string',
                          enum: ['D', 'C'],
                          nullable: true,
                          description:
                            'Indicator used to reflect debit (D) or credit (C) transaction. Allowed values: “D”, “C”.',
                          example: 'C',
                        },
                        discount_rate: {
                          type: 'number',
                          format: 'double',
                          maximum: 99999,
                          nullable: true,
                          description:
                            'Discount rate for the line item ,Can accept Two (2) decimal places.',
                          example: 11,
                        },
                        tax_type_applied: {
                          type: 'string',
                          maxLength: 4,
                          nullable: true,
                          description:
                            'Type of value-added taxes that are being used (Conditional If tax amount is supplied)',
                          example: '22',
                        },
                        tax_type_id: {
                          type: 'string',
                          minLength: 2,
                          maxLength: 2,
                          nullable: true,
                          description:
                            'Indicates the type of tax collected in relationship to a specific tax amount (Conditional If tax amount is supplied)',
                          example: '11',
                        },
                      },
                      required: [
                        'description',
                        'commodity_code',
                        'product_code',
                        'unit_code',
                        'unit_cost',
                      ],
                    },
                    description: 'Array of line items in transaction',
                  },
                },
                required: ['line_items'],
                description: 'Level 3 data object',
              },
            },
            required: ['id', 'transaction_id', 'level3_data'],
            description: 'Transaction Level3 Information on `expand`',
          },
          developer_company_id: {
            type: 'string',
            nullable: true,
            description: 'Developer Company Id Information on `expand`',
            example: 'Sample Developer Company ID',
          },
          transaction_histories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                transaction_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Transaction ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Transaction Histories ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                status_id: {
                  type: 'integer',
                  nullable: true,
                  description: 'Status ID',
                  example: 101,
                },
                event_date_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Event Date TS',
                  example: 1422040992,
                },
                location_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Location ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                modified_ts: {
                  type: 'integer',
                  description: 'Modified Time Stamp',
                  example: 1422040992,
                },
              },
              required: ['transaction_id', 'id', 'created_ts', 'modified_ts'],
            },
            description: 'Transaction History Information on `expand`',
          },
          surcharge_transaction: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              model_name: {
                type: 'string',
                description: 'Model Name',
                example: 'Model Name',
              },
              transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Transaction ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              surcharge_fee: {
                type: 'number',
                format: 'float',
                minimum: 0,
                description: 'Surcharge Fee',
                example: 0,
              },
              surcharge_rate: {
                type: 'number',
                format: 'float',
                minimum: 0,
                description: 'Surcharge Rate',
                example: 0,
              },
              surcharge_amount: {
                type: 'number',
                format: 'float',
                minimum: 0,
                nullable: true,
                description: 'Surcharge Amount',
                example: null,
              },
              surcharge_transaction_min: {
                type: 'number',
                format: 'float',
                minimum: 0,
                nullable: true,
                description: 'Surcharge Transaction Minimum',
                example: null,
              },
              surcharge_transaction_max: {
                type: 'number',
                format: 'float',
                minimum: 0,
                nullable: true,
                description: 'Surcharge Transaction Maximum',
                example: null,
              },
              created: {
                type: 'integer',
                nullable: true,
                description: 'Created',
                example: 1422040992,
              },
              modified: {
                type: 'integer',
                nullable: true,
                description: 'Modified',
                example: 1422040992,
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'User ID Created the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Last User ID that updated the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
            },
            required: [
              'model_name',
              'transaction_id',
              'surcharge_fee',
              'surcharge_rate',
            ],
            description: 'Surcharge Transaction Information on `expand`',
          },
          surcharge: {
            type: 'object',
            properties: {
              surcharge_fee: {
                type: 'number',
                format: 'float',
                description: 'Surcharge Fee',
                example: 10,
              },
              surcharge_rate: {
                type: 'number',
                format: 'float',
                description: 'Surcharge Rate',
                example: 1,
              },
              max_transaction_amount: {
                type: 'number',
                format: 'float',
                nullable: true,
                description: 'Max Transaction Amount',
                example: null,
              },
              min_fee_amount: {
                type: 'number',
                format: 'float',
                nullable: true,
                description: 'Min Fee Amount',
                example: null,
              },
              max_fee_amount: {
                type: 'number',
                format: 'float',
                nullable: true,
                description: 'Max Fee Amount',
                example: null,
              },
              surcharge_on_recurring: {
                type: 'boolean',
                description: 'Surcharge On Recurring',
                example: null,
              },
              refund_surcharges: {
                type: 'boolean',
                description: 'Refund Surcharges',
                example: null,
              },
              product_transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Product Transaction Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              run_as_separate_transaction: {
                type: 'boolean',
                description: 'Run As Separate Transaction',
                example: null,
              },
              apply_to_user_type_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Apply To User Type Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              title: {
                type: 'string',
                maxLength: 256,
                nullable: true,
                description: 'Title',
                example: null,
              },
              surcharge_label: {
                type: 'string',
                maxLength: 64,
                nullable: true,
                description: 'Surcharge Label',
                example: null,
              },
              surcharge_transaction_product_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Surcharge Transaction Product Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Surcharge Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'User ID Created the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              modified_user_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Last User ID that updated the register',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
            },
            required: [
              'surcharge_fee',
              'surcharge_rate',
              'product_transaction_id',
              'id',
              'created_user_id',
              'modified_user_id',
              'created_ts',
              'modified_ts',
            ],
            description: 'Surcharge Information on `expand`',
          },
          signature: {
            type: 'object',
            properties: {
              signature: {
                type: 'string',
                description: 'Signature',
                example:
                  'iVBORw0KGgoAAAANSUhEUgAAANwAAAAsCAYAAAAOyNaYAAACvklEQVR4nO3bLZOqUBjA8ScaNxqNRiKRaCQaiXwEG7cRiUajH8FINBqJRCKR+NxyD4OIXtaXw2H3/5s5MwZ39rgz/zkvuKKqgar+YTAYnx/y7wUACwgOsIjgAIsIznFlWerlcpl6GngTgnNYVVW6WCxURDTLsqmngzcgOMdtNhsVERURDYJA8zyfekp4AcE5oCgKzfN8cOvYNM1VdCKiURRNMEu8A8FNrCzLm5j68Q1Fx2o3TwTngCzLNAiCq6D6UTVNo0mS6NfXF+HNGME5or+KeZ7XxrVcLjWOY83zXOu6vnqfeQ/bzHkgOIf0VzHP83Sz2eh6vW4D831fy7JsowvDsH1NdO4jOAfVdX0VXhRFWhSFRlHUrmr7/b4NLU3T9jVbTLcRnMO620ezep1Op3bF832/3XIORQr3EJzjumc7E9HQBUoYhjdnPKJzD8E5xjyT647T6aSr1UpFRPf7ffveuq41TdOHZzyicwvBTeBeVGEY3jwaGBrmWV3/Z82K1z/jca5zB8F9wFBQY6JaLBYax7EmSXJ3DD2v624rzUpoVrsgCDjXOWRWwVVVNfUUrvTDGrNK3YsqTdNRn69pGs2y7NshssV0w2yCK4pCRUSPx+Okc/hfWI9WqbFRPaMbYjc+s7ptt1uic8BsgsvzXEVED4fDR3/P2PPVUFifDOo7THxmPiY03/fZXk7s1wR371z1zPnKlbDGuvc9TKKz78cE9yio3W436vbv1fOV6/oPx010/Ee5PbMLbrfbPRWU53kPb/9+SlRj9L8ALcJ/lNsym+DO5/PTQaVpqnVdT/0RnGLOed0LlikvpH6L2QSnqoPX4QT1mu4FC3/Dz5tVcMDcERxgEcEBFhEcYBHBARYRHGARwQEWERxgEcEBFhEcYBHBARYRHGARwQEWERxgEcEBFhEcYBHBARYRHGDRX+EC0ah++pNrAAAAAElFTkSuQmCC',
              },
              resource: {
                type: 'string',
                enum: [
                  'Recurring',
                  'Transaction',
                  'AccountVault',
                  'DeviceTerm',
                ],
                description: 'Resource',
                example: 'Transaction',
              },
              resource_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Resource ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Signature ID',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              modified_ts: {
                type: 'integer',
                description: 'Modified Time Stamp',
                example: 1422040992,
              },
            },
            required: [
              'signature',
              'resource',
              'resource_id',
              'id',
              'created_ts',
              'modified_ts',
            ],
            description: 'Signature Information on `expand`',
          },
          reason_code: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                nullable: true,
                description: 'ID',
                example: 50,
              },
              title: {
                type: 'string',
                description: 'Title',
                example: 'Sample Title',
              },
            },
            description: 'Reason Code Information on `expand`',
          },
          type: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                nullable: true,
                description: 'ID',
                example: 50,
              },
              title: {
                type: 'string',
                description: 'Title',
                example: 'Sample Title',
              },
            },
            description: 'Type Information on `expand`',
          },
          status: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                nullable: true,
                description: 'ID',
                example: 50,
              },
              title: {
                type: 'string',
                description: 'Title',
                example: 'Sample Title',
              },
            },
            description: 'Status Information on `expand`',
          },
          transaction_batch: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                description: 'Transaction Batch Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              batch_num: {
                type: 'number',
                format: 'float',
                nullable: true,
                description: 'Batch Number',
                example: 35,
              },
              product_transaction_id: {
                type: 'string',
                pattern:
                  '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                nullable: true,
                description: 'Product Transaction Id',
                example: '11e95f8ec39de8fbdb0a4f1a',
              },
              created_ts: {
                type: 'integer',
                nullable: true,
                description: 'Created Time Stamp',
                example: 1422040992,
              },
              is_open: {
                type: 'integer',
                nullable: true,
                description: 'Is Open',
                example: 1,
              },
              processing_status_id: {
                type: 'integer',
                nullable: true,
                description: 'Processing Status Id',
                example: 1,
              },
              settlement_file_name: {
                type: 'string',
                maxLength: 255,
                nullable: true,
                description: 'Settlement File Name',
                example: null,
              },
              batch_close_ts: {
                type: 'integer',
                nullable: true,
                description: 'Batch Close Ts',
                example: 1422040992,
              },
              batch_close_detail: {
                type: 'string',
                maxLength: 1024,
                nullable: true,
                description: 'Batch Close Detail',
                example: null,
              },
              total_sale_amount: {
                type: 'number',
                format: 'double',
                maximum: 999999999999,
                nullable: true,
                description: 'Total Sale Amount',
                example: 123.45,
              },
              total_sale_count: {
                type: 'integer',
                nullable: true,
                description: 'Total Sale Count',
                example: 11,
              },
              total_refund_amount: {
                type: 'number',
                format: 'double',
                maximum: 999999999999,
                nullable: true,
                description: 'Total Refund Amount',
                example: 123.45,
              },
              total_refund_count: {
                type: 'integer',
                nullable: true,
                description: 'Total Refund Count',
                example: 11,
              },
              total_void_amount: {
                type: 'number',
                format: 'double',
                maximum: 999999999999,
                nullable: true,
                description: 'Total Void Amount',
                example: 123.45,
              },
              total_void_count: {
                type: 'integer',
                nullable: true,
                description: 'Total Void Count',
                example: 11,
              },
            },
            required: ['id'],
            description: 'Transaction Batch Information on `expand`',
          },
          transaction_splits: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                transaction_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Transaction ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                contact_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Contact ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                amount: {
                  type: 'number',
                  format: 'float',
                  minimum: 0.01,
                  maximum: 9999999.99,
                  description: 'Amount',
                  example: 10,
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Transaction Splits ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                created_ts: {
                  type: 'integer',
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                created_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID Created the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: [
                'transaction_id',
                'contact_id',
                'amount',
                'id',
                'created_ts',
              ],
            },
            description: 'Transaction Split Information on `expand`',
          },
          postback_logs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                postback_status_id: {
                  type: 'number',
                  format: 'float',
                  enum: [1, 2, 3, 4],
                  nullable: true,
                  description: 'Postback Status Id',
                  example: null,
                },
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Postback Log Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                postback_config_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Postback Config Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                changelog_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'Changelog Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                http_verb: {
                  type: 'string',
                  nullable: true,
                  description: 'Http Verb',
                  example: null,
                },
                next_run_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Next Run',
                  example: 1422040992,
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                model: {
                  type: 'string',
                  nullable: true,
                  description: 'MOdel',
                  example: null,
                },
                model_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'Model Id',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
              required: ['id', 'postback_config_id', 'changelog_id'],
            },
            description: 'Postback Log Information on `expand`',
          },
          currency_type: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                nullable: true,
                description: 'ID',
                example: 50,
              },
              title: {
                type: 'string',
                description: 'Title',
                example: 'Sample Title',
              },
            },
            description: 'Currency Type Information on `expand`',
          },
          transaction_references: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  description: 'ID',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
                transaction_id: {
                  type: 'string',
                  nullable: true,
                  description: 'Transaction ID',
                  example: null,
                },
                previous_transaction_id: {
                  type: 'string',
                  nullable: true,
                  description: 'Previous Transaction ID',
                  example: null,
                },
                transaction_amount: {
                  type: 'string',
                  nullable: true,
                  description: 'Transaction Amount',
                  example: null,
                },
                previous_transaction_amount: {
                  type: 'string',
                  nullable: true,
                  description: 'Previous Transaction Amount',
                  example: null,
                },
                previous_transaction_created_ts: {
                  type: 'number',
                  format: 'float',
                  nullable: true,
                  description: 'Previous Transaction Created Timestamp',
                  example: null,
                },
                reference_type: {
                  type: 'string',
                  nullable: true,
                  description: 'Reference Type',
                  example: null,
                },
                created_ts: {
                  type: 'integer',
                  nullable: true,
                  description: 'Created Time Stamp',
                  example: 1422040992,
                },
                created_user_id: {
                  type: 'string',
                  pattern:
                    '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
                  nullable: true,
                  description: 'User ID Created the register',
                  example: '11e95f8ec39de8fbdb0a4f1a',
                },
              },
            },
            description: 'Transaction Reference Information on `expand`',
          },
        },
        required: ['id', 'created_ts', 'modified_ts', 'payment_method'],
      },
    },
    required: ['type'],
  },
  responseAsyncStatus: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['AsyncStatus'],
        description: 'Resource Type',
        example: 'AsyncStatus',
        default: 'AsyncStatus',
      },
      data: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            format: 'uuid',
            description:
              "A [UUID v4](https://datatracker.ietf.org/doc/html/rfc4122) that's unique for the Async Request",
            example: '406c66c3-21cb-47fb-80fc-843bc42507fb',
          },
          type: {
            type: 'string',
            description: 'The @type from the original request.',
            example: 'Transaction',
          },
          id: {
            type: 'string',
            description:
              'After a sucessfully processing, the system will fill with the final ID for the document',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          progress: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
            description: 'The current percentage progress',
            example: 100,
          },
          error: {
            type: 'string',
            nullable: true,
            description:
              'In case of error processing, it will contain the error details',
            example: null,
          },
          ttl: {
            type: 'integer',
            description:
              'The date (in [Epoch Time](https://en.wikipedia.org/wiki/Unix_time)) this status register is set to expire. Usually 30 days after the request.',
            example: 7956886942,
          },
        },
        required: ['code', 'type', 'id', 'progress', 'ttl'],
      },
    },
    required: ['type'],
  },
  responseRoutingNumber: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['RoutingNumber'],
        description: 'Resource Type',
        example: 'RoutingNumber',
        default: 'RoutingNumber',
      },
      data: {
        type: 'object',
        properties: {
          routing: {
            type: 'string',
            description: 'Routing Id',
            example: '011000015',
          },
          bank_name: {
            type: 'string',
            description: 'Bank Name',
            example: 'FEDERAL RESERVE BANK',
          },
          created_ts: {
            type: 'integer',
            nullable: true,
            description: 'Created Time Stamp',
            example: 1422040992,
          },
          modified_ts: {
            type: 'integer',
            nullable: true,
            description: 'Modified Time Stamp',
            example: 1422040992,
          },
        },
        required: ['routing', 'bank_name'],
      },
    },
    required: ['type'],
  },
  responseSalesTax: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['SalesTax'],
        description: 'Resource Type',
        example: 'SalesTax',
        default: 'SalesTax',
      },
      data: {
        type: 'object',
        properties: {
          location_id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            description: 'Location ID',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          location_api_id: {
            type: 'string',
            nullable: true,
            description: 'Location Api Id',
            example: null,
          },
          rate: {
            type: 'number',
            format: 'float',
            minimum: 0.01,
            maximum: 99.99,
            description: 'Rate',
            example: 10,
          },
          zip_code: {
            type: 'string',
            pattern: '^[\\d]+$',
            minLength: 5,
            maxLength: 5,
            description: 'Zip Code',
            example: '44024',
          },
          country: {
            type: 'string',
            enum: ['US', 'CA'],
            description: 'Country',
            example: 'US',
          },
          id: {
            type: 'string',
            pattern:
              '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
            nullable: true,
            description: 'Sales Tax Id',
            example: '11e95f8ec39de8fbdb0a4f1a',
          },
          created_ts: {
            type: 'integer',
            description: 'Created Time Stamp',
            example: 1422040992,
          },
          modified_ts: {
            type: 'integer',
            description: 'Modified Time Stamp',
            example: 1422040992,
          },
        },
        required: [
          'location_id',
          'rate',
          'zip_code',
          'created_ts',
          'modified_ts',
        ],
      },
    },
    required: ['type'],
  },
  responseReportingSummaryTransactionsAchRejectsCollection: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['ReportingSummaryTransactionsAchRejectsCollection'],
        description: 'Resource Type',
        example: 'ReportingSummaryTransactionsAchRejectsCollection',
        default: 'ReportingSummaryTransactionsAchRejectsCollection',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              enum: ['today', 'last7days'],
              description: 'Report dimension',
              example: 'today',
            },
            scale: {
              type: 'string',
              enum: ['total'],
              description: 'Report scale',
              example: 'total',
            },
            metrics: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['transactions', 'amount'],
                example: 'transactions',
              },
              description: 'Report metrics',
            },
            values: {
              type: 'array',
              items: {
                oneOf: [
                  {
                    type: 'integer',
                    description: 'Transaction Count',
                    example: 10,
                  },
                  {
                    type: 'number',
                    format: 'float',
                    description: 'Transaction Amount Sum',
                    example: 500.1,
                  },
                ],
              },
              description: 'Result list',
            },
          },
          required: ['id', 'scale', 'metrics', 'values'],
        },
        description: 'Resource Members',
      },
      links: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Links'],
            description: 'Object type',
            example: 'Links',
          },
          first: {
            type: 'string',
            description: 'Link to the first page',
            example: '/v1/endpoint?page[size]=10&page[number]=1',
          },
          previous: {
            type: 'string',
            description: 'Link to the previous page',
            example: '/v1/endpoint?page[size]=10&page[number]=5',
          },
          last: {
            type: 'string',
            description: 'Link to the last page',
            example: '/v1/endpoint?page[size]=10&page[number]=42',
          },
        },
        required: ['type', 'first', 'previous', 'last'],
        description: 'Pagination page links',
      },
      pagination: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Pagination'],
            description: 'Object type',
            example: 'Pagination',
          },
          total_count: {
            type: 'integer',
            description: 'Total records count',
            example: 423,
          },
          page_count: {
            type: 'integer',
            description: 'Total page count',
            example: 42,
          },
          page_number: {
            type: 'integer',
            description: 'Current page',
            example: 6,
          },
          page_size: {
            type: 'integer',
            description: 'Page size',
            example: 10,
          },
        },
        required: ['type'],
        description: 'Pagination info',
      },
      sort: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Sorting'],
            description: 'Object type',
            example: 'Sorting',
          },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name used on the sort',
                  example: 'last_name',
                },
                order: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  description: 'Sort direction ASC/DESC',
                  example: 'asc',
                },
              },
              required: ['field', 'order'],
            },
            description: '[object Object]',
          },
        },
        required: ['type', 'fields'],
        description: 'Sort information used on the results',
      },
    },
    required: ['type', 'list'],
  },
  responseReportingSummaryTransactionsChargebacksCollection: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['ReportingSummaryTransactionsChargebacksCollection'],
        description: 'Resource Type',
        example: 'ReportingSummaryTransactionsChargebacksCollection',
        default: 'ReportingSummaryTransactionsChargebacksCollection',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              enum: ['open', 'received_last7days'],
              description: 'Report dimension',
              example: 'open',
            },
            scale: {
              type: 'string',
              enum: ['total'],
              description: 'Report scale',
              example: 'total',
            },
            metrics: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['transactions', 'amount'],
                example: 'transactions',
              },
              description: 'Report metrics',
            },
            values: {
              type: 'array',
              items: {
                oneOf: [
                  {
                    type: 'integer',
                    description: 'Transaction Count',
                    example: 10,
                  },
                  {
                    type: 'number',
                    format: 'float',
                    description: 'Transaction Amount Sum',
                    example: 500.1,
                  },
                ],
              },
              description: 'Result list',
            },
          },
          required: ['id', 'scale', 'metrics', 'values'],
        },
        description: 'Resource Members',
      },
      links: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Links'],
            description: 'Object type',
            example: 'Links',
          },
          first: {
            type: 'string',
            description: 'Link to the first page',
            example: '/v1/endpoint?page[size]=10&page[number]=1',
          },
          previous: {
            type: 'string',
            description: 'Link to the previous page',
            example: '/v1/endpoint?page[size]=10&page[number]=5',
          },
          last: {
            type: 'string',
            description: 'Link to the last page',
            example: '/v1/endpoint?page[size]=10&page[number]=42',
          },
        },
        required: ['type', 'first', 'previous', 'last'],
        description: 'Pagination page links',
      },
      pagination: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Pagination'],
            description: 'Object type',
            example: 'Pagination',
          },
          total_count: {
            type: 'integer',
            description: 'Total records count',
            example: 423,
          },
          page_count: {
            type: 'integer',
            description: 'Total page count',
            example: 42,
          },
          page_number: {
            type: 'integer',
            description: 'Current page',
            example: 6,
          },
          page_size: {
            type: 'integer',
            description: 'Page size',
            example: 10,
          },
        },
        required: ['type'],
        description: 'Pagination info',
      },
      sort: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Sorting'],
            description: 'Object type',
            example: 'Sorting',
          },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name used on the sort',
                  example: 'last_name',
                },
                order: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  description: 'Sort direction ASC/DESC',
                  example: 'asc',
                },
              },
              required: ['field', 'order'],
            },
            description: '[object Object]',
          },
        },
        required: ['type', 'fields'],
        description: 'Sort information used on the results',
      },
    },
    required: ['type', 'list'],
  },
  responseReportingSummaryTransactionsGatewaysCollection: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['ReportingSummaryTransactionsGatewaysCollection'],
        description: 'Resource Type',
        example: 'ReportingSummaryTransactionsGatewaysCollection',
        default: 'ReportingSummaryTransactionsGatewaysCollection',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              enum: ['last24hours', 'last48hours', 'last72hours'],
              description: 'Report dimension',
              example: 'last24hours',
            },
            scale: {
              type: 'string',
              enum: ['hours'],
              description: 'Report scale',
              example: 'hours',
            },
            metrics: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['transactions', 'amount'],
                example: 'transactions',
              },
              description: 'Report metrics',
            },
            range: {
              type: 'array',
              items: {
                type: 'integer',
                description: 'epoch timestamps',
                example: 1422040992,
              },
              description: 'Report range (in epoch timestamps)',
            },
            values: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['auth', 'refund', 'sale'],
                    description: 'Source description',
                    example: 'auth',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'array',
                      items: {
                        oneOf: [
                          {
                            type: 'integer',
                            description: 'Transaction Count',
                            example: 10,
                          },
                          {
                            type: 'number',
                            format: 'float',
                            description: 'Transaction Amount Sum',
                            example: 500.1,
                          },
                        ],
                      },
                      description: 'Values list',
                    },
                    description: 'Result list',
                  },
                },
                required: ['id', 'values'],
                description: 'Result list',
              },
              description: 'Result list',
            },
          },
          required: ['id', 'scale', 'metrics', 'range', 'values'],
        },
        description: 'Resource Members',
      },
      links: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Links'],
            description: 'Object type',
            example: 'Links',
          },
          first: {
            type: 'string',
            description: 'Link to the first page',
            example: '/v1/endpoint?page[size]=10&page[number]=1',
          },
          previous: {
            type: 'string',
            description: 'Link to the previous page',
            example: '/v1/endpoint?page[size]=10&page[number]=5',
          },
          last: {
            type: 'string',
            description: 'Link to the last page',
            example: '/v1/endpoint?page[size]=10&page[number]=42',
          },
        },
        required: ['type', 'first', 'previous', 'last'],
        description: 'Pagination page links',
      },
      pagination: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Pagination'],
            description: 'Object type',
            example: 'Pagination',
          },
          total_count: {
            type: 'integer',
            description: 'Total records count',
            example: 423,
          },
          page_count: {
            type: 'integer',
            description: 'Total page count',
            example: 42,
          },
          page_number: {
            type: 'integer',
            description: 'Current page',
            example: 6,
          },
          page_size: {
            type: 'integer',
            description: 'Page size',
            example: 10,
          },
        },
        required: ['type'],
        description: 'Pagination info',
      },
      sort: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Sorting'],
            description: 'Object type',
            example: 'Sorting',
          },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name used on the sort',
                  example: 'last_name',
                },
                order: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  description: 'Sort direction ASC/DESC',
                  example: 'asc',
                },
              },
              required: ['field', 'order'],
            },
            description: '[object Object]',
          },
        },
        required: ['type', 'fields'],
        description: 'Sort information used on the results',
      },
    },
    required: ['type', 'list'],
  },
  responseReportingSummaryTransactionsRecurringDeclinedsCollection: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['ReportingSummaryTransactionsRecurringDeclinedsCollection'],
        description: 'Resource Type',
        example: 'ReportingSummaryTransactionsRecurringDeclinedsCollection',
        default: 'ReportingSummaryTransactionsRecurringDeclinedsCollection',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              enum: ['today', 'yesterday', 'last30days'],
              description: 'Report dimension',
              example: 'today',
            },
            scale: {
              type: 'string',
              enum: ['total'],
              description: 'Report scale',
              example: 'total',
            },
            metrics: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['transactions', 'amount'],
                example: 'transactions',
              },
              description: 'Report metrics',
            },
            values: {
              type: 'array',
              items: {
                oneOf: [
                  {
                    type: 'integer',
                    description: 'Transaction Count',
                    example: 10,
                  },
                  {
                    type: 'number',
                    format: 'float',
                    description: 'Transaction Amount Sum',
                    example: 500.1,
                  },
                ],
              },
              description: 'Result list',
            },
          },
          required: ['id', 'scale', 'metrics', 'values'],
        },
        description: 'Resource Members',
      },
      links: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Links'],
            description: 'Object type',
            example: 'Links',
          },
          first: {
            type: 'string',
            description: 'Link to the first page',
            example: '/v1/endpoint?page[size]=10&page[number]=1',
          },
          previous: {
            type: 'string',
            description: 'Link to the previous page',
            example: '/v1/endpoint?page[size]=10&page[number]=5',
          },
          last: {
            type: 'string',
            description: 'Link to the last page',
            example: '/v1/endpoint?page[size]=10&page[number]=42',
          },
        },
        required: ['type', 'first', 'previous', 'last'],
        description: 'Pagination page links',
      },
      pagination: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Pagination'],
            description: 'Object type',
            example: 'Pagination',
          },
          total_count: {
            type: 'integer',
            description: 'Total records count',
            example: 423,
          },
          page_count: {
            type: 'integer',
            description: 'Total page count',
            example: 42,
          },
          page_number: {
            type: 'integer',
            description: 'Current page',
            example: 6,
          },
          page_size: {
            type: 'integer',
            description: 'Page size',
            example: 10,
          },
        },
        required: ['type'],
        description: 'Pagination info',
      },
      sort: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Sorting'],
            description: 'Object type',
            example: 'Sorting',
          },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name used on the sort',
                  example: 'last_name',
                },
                order: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  description: 'Sort direction ASC/DESC',
                  example: 'asc',
                },
              },
              required: ['field', 'order'],
            },
            description: '[object Object]',
          },
        },
        required: ['type', 'fields'],
        description: 'Sort information used on the results',
      },
    },
    required: ['type', 'list'],
  },
  responseReportingSummaryTransactionsRecurringForecastsCollection: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['ReportingSummaryTransactionsRecurringForecastsCollection'],
        description: 'Resource Type',
        example: 'ReportingSummaryTransactionsRecurringForecastsCollection',
        default: 'ReportingSummaryTransactionsRecurringForecastsCollection',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              enum: ['next30days', 'next12months'],
              description: 'Report dimension',
              example: 'next30days',
            },
            scale: {
              type: 'string',
              enum: ['days', 'months'],
              description: 'Report scale',
              example: 'days',
            },
            metrics: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['transactions', 'amount'],
                example: 'transactions',
              },
              description: 'Report metrics',
            },
            range: {
              type: 'array',
              items: {
                type: 'integer',
                description: 'epoch timestamps',
                example: 1422040992,
              },
              description: 'Report range (in epoch timestamps)',
            },
            values: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['recurring'],
                    description: 'Source description',
                    example: 'recurring',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'array',
                      items: {
                        oneOf: [
                          {
                            type: 'integer',
                            description: 'Transaction Count',
                            example: 10,
                          },
                          {
                            type: 'number',
                            format: 'float',
                            description: 'Transaction Amount Sum',
                            example: 500.1,
                          },
                        ],
                      },
                      description: 'Values list',
                    },
                    description: 'Result list',
                  },
                },
                required: ['id', 'values'],
                description: 'Result list',
              },
              description: 'Result list',
            },
          },
          required: ['id', 'scale', 'metrics', 'range', 'values'],
        },
        description: 'Resource Members',
      },
      links: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Links'],
            description: 'Object type',
            example: 'Links',
          },
          first: {
            type: 'string',
            description: 'Link to the first page',
            example: '/v1/endpoint?page[size]=10&page[number]=1',
          },
          previous: {
            type: 'string',
            description: 'Link to the previous page',
            example: '/v1/endpoint?page[size]=10&page[number]=5',
          },
          last: {
            type: 'string',
            description: 'Link to the last page',
            example: '/v1/endpoint?page[size]=10&page[number]=42',
          },
        },
        required: ['type', 'first', 'previous', 'last'],
        description: 'Pagination page links',
      },
      pagination: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Pagination'],
            description: 'Object type',
            example: 'Pagination',
          },
          total_count: {
            type: 'integer',
            description: 'Total records count',
            example: 423,
          },
          page_count: {
            type: 'integer',
            description: 'Total page count',
            example: 42,
          },
          page_number: {
            type: 'integer',
            description: 'Current page',
            example: 6,
          },
          page_size: {
            type: 'integer',
            description: 'Page size',
            example: 10,
          },
        },
        required: ['type'],
        description: 'Pagination info',
      },
      sort: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Sorting'],
            description: 'Object type',
            example: 'Sorting',
          },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name used on the sort',
                  example: 'last_name',
                },
                order: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  description: 'Sort direction ASC/DESC',
                  example: 'asc',
                },
              },
              required: ['field', 'order'],
            },
            description: '[object Object]',
          },
        },
        required: ['type', 'fields'],
        description: 'Sort information used on the results',
      },
    },
    required: ['type', 'list'],
  },
  responseReportingSummaryTransactionsRecurringHistorysCollection: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['ReportingSummaryTransactionsRecurringHistorysCollection'],
        description: 'Resource Type',
        example: 'ReportingSummaryTransactionsRecurringHistorysCollection',
        default: 'ReportingSummaryTransactionsRecurringHistorysCollection',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              enum: ['last30days', 'last12months'],
              description: 'Report dimension',
              example: 'last30days',
            },
            scale: {
              type: 'string',
              enum: ['days', 'months'],
              description: 'Report scale',
              example: 'days',
            },
            metrics: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['transactions', 'amount'],
                example: 'transactions',
              },
              description: 'Report metrics',
            },
            range: {
              type: 'array',
              items: {
                type: 'integer',
                description: 'epoch timestamps',
                example: 1422040992,
              },
              description: 'Report range (in epoch timestamps)',
            },
            values: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['paid', 'unpaid'],
                    description: 'Source description',
                    example: 'paid',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'array',
                      items: {
                        oneOf: [
                          {
                            type: 'integer',
                            description: 'Transaction Count',
                            example: 10,
                          },
                          {
                            type: 'number',
                            format: 'float',
                            description: 'Transaction Amount Sum',
                            example: 500.1,
                          },
                        ],
                      },
                      description: 'Values list',
                    },
                    description: 'Result list',
                  },
                },
                required: ['id', 'values'],
                description: 'Result list',
              },
              description: 'Result list',
            },
          },
          required: ['id', 'scale', 'metrics', 'range', 'values'],
        },
        description: 'Resource Members',
      },
      links: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Links'],
            description: 'Object type',
            example: 'Links',
          },
          first: {
            type: 'string',
            description: 'Link to the first page',
            example: '/v1/endpoint?page[size]=10&page[number]=1',
          },
          previous: {
            type: 'string',
            description: 'Link to the previous page',
            example: '/v1/endpoint?page[size]=10&page[number]=5',
          },
          last: {
            type: 'string',
            description: 'Link to the last page',
            example: '/v1/endpoint?page[size]=10&page[number]=42',
          },
        },
        required: ['type', 'first', 'previous', 'last'],
        description: 'Pagination page links',
      },
      pagination: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Pagination'],
            description: 'Object type',
            example: 'Pagination',
          },
          total_count: {
            type: 'integer',
            description: 'Total records count',
            example: 423,
          },
          page_count: {
            type: 'integer',
            description: 'Total page count',
            example: 42,
          },
          page_number: {
            type: 'integer',
            description: 'Current page',
            example: 6,
          },
          page_size: {
            type: 'integer',
            description: 'Page size',
            example: 10,
          },
        },
        required: ['type'],
        description: 'Pagination info',
      },
      sort: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Sorting'],
            description: 'Object type',
            example: 'Sorting',
          },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name used on the sort',
                  example: 'last_name',
                },
                order: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  description: 'Sort direction ASC/DESC',
                  example: 'asc',
                },
              },
              required: ['field', 'order'],
            },
            description: '[object Object]',
          },
        },
        required: ['type', 'fields'],
        description: 'Sort information used on the results',
      },
    },
    required: ['type', 'list'],
  },
  responseReportingSummaryTransactionsSettledsCollection: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['ReportingSummaryTransactionsSettledsCollection'],
        description: 'Resource Type',
        example: 'ReportingSummaryTransactionsSettledsCollection',
        default: 'ReportingSummaryTransactionsSettledsCollection',
      },
      list: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              enum: ['last30days', 'last12months'],
              description: 'Report dimension',
              example: 'last30days',
            },
            scale: {
              type: 'string',
              enum: ['days', 'months'],
              description: 'Report scale',
              example: 'days',
            },
            metrics: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['transactions', 'amount'],
                example: 'transactions',
              },
              description: 'Report metrics',
            },
            range: {
              type: 'array',
              items: {
                type: 'integer',
                description: 'epoch timestamps',
                example: 1422040992,
              },
              description: 'Report range (in epoch timestamps)',
            },
            values: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    enum: ['sale'],
                    description: 'Source description',
                    example: 'sale',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'array',
                      items: {
                        oneOf: [
                          {
                            type: 'integer',
                            description: 'Transaction Count',
                            example: 10,
                          },
                          {
                            type: 'number',
                            format: 'float',
                            description: 'Transaction Amount Sum',
                            example: 500.1,
                          },
                        ],
                      },
                      description: 'Values list',
                    },
                    description: 'Result list',
                  },
                },
                required: ['id', 'values'],
                description: 'Result list',
              },
              description: 'Result list',
            },
          },
          required: ['id', 'scale', 'metrics', 'range', 'values'],
        },
        description: 'Resource Members',
      },
      links: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Links'],
            description: 'Object type',
            example: 'Links',
          },
          first: {
            type: 'string',
            description: 'Link to the first page',
            example: '/v1/endpoint?page[size]=10&page[number]=1',
          },
          previous: {
            type: 'string',
            description: 'Link to the previous page',
            example: '/v1/endpoint?page[size]=10&page[number]=5',
          },
          last: {
            type: 'string',
            description: 'Link to the last page',
            example: '/v1/endpoint?page[size]=10&page[number]=42',
          },
        },
        required: ['type', 'first', 'previous', 'last'],
        description: 'Pagination page links',
      },
      pagination: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Pagination'],
            description: 'Object type',
            example: 'Pagination',
          },
          total_count: {
            type: 'integer',
            description: 'Total records count',
            example: 423,
          },
          page_count: {
            type: 'integer',
            description: 'Total page count',
            example: 42,
          },
          page_number: {
            type: 'integer',
            description: 'Current page',
            example: 6,
          },
          page_size: {
            type: 'integer',
            description: 'Page size',
            example: 10,
          },
        },
        required: ['type'],
        description: 'Pagination info',
      },
      sort: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['Sorting'],
            description: 'Object type',
            example: 'Sorting',
          },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name used on the sort',
                  example: 'last_name',
                },
                order: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  description: 'Sort direction ASC/DESC',
                  example: 'asc',
                },
              },
              required: ['field', 'order'],
            },
            description: '[object Object]',
          },
        },
        required: ['type', 'fields'],
        description: 'Sort information used on the results',
      },
    },
    required: ['type', 'list'],
  },
  '/v1/transactions/ach/debit/keyed': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          ssn4: {
            type: 'string',
            maxLength: 4,
            nullable: true,
            description:
              'For ACH transactions where Identity Verification is enabled for terminal. Only ssn4 or dob_year should be passed. not both.',
            example: '8527',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        required: ['dl_state', 'dl_number'],
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: 'location-api-id-florida-2',
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description: 'A valid Location Id to associate the transaction with.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      ach_identifier: {
        type: 'string',
        minLength: 1,
        maxLength: 1,
        nullable: true,
        description: 'Required for ACH transactions in certain scenarios.',
        example: 'P',
      },
      ach_sec_code: {
        type: 'string',
        enum: ['CCD', 'PPD', 'TEL', 'WEB', 'POP', 'C21'],
        nullable: true,
        description:
          'Required for ACH transactions if account_vault_id is not provided.',
        example: 'C21',
      },
      effective_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'For ACH only, this is optional and defaults to current day.',
        example: '2021-12-01',
      },
      account_holder_name: {
        type: 'string',
        maxLength: 32,
        description:
          "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
        example: 'smith',
      },
      account_number: {
        type: 'string',
        minLength: 4,
        maxLength: 19,
        description:
          'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
        example: '24345',
      },
      account_type: {
        type: 'string',
        minLength: 1,
        maxLength: 32,
        enum: ['checking', 'savings'],
        description:
          'Required for ACH transactions if account_vault_id is not provided.',
        example: 'checking',
      },
      check_number: {
        type: 'string',
        minLength: 1,
        maxLength: 15,
        nullable: true,
        description: 'Required for transactions using TEL SEC code.',
        example: '8520748520963',
      },
      routing_number: {
        type: 'string',
        description:
          'This field is read only for ach on transactions. Must be supplied if account_vault_id is not provided.',
        example: '051904524',
      },
    },
    required: [
      'transaction_amount',
      'account_holder_name',
      'account_number',
      'account_type',
      'routing_number',
    ],
  },
  '/v1/transactions/ach/credit/keyed': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          ssn4: {
            type: 'string',
            maxLength: 4,
            nullable: true,
            description:
              'For ACH transactions where Identity Verification is enabled for terminal. Only ssn4 or dob_year should be passed. not both.',
            example: '8527',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        required: ['dl_state', 'dl_number'],
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: 'location-api-id-florida-2',
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description: 'A valid Location Id to associate the transaction with.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      ach_identifier: {
        type: 'string',
        minLength: 1,
        maxLength: 1,
        nullable: true,
        description: 'Required for ACH transactions in certain scenarios.',
        example: 'P',
      },
      ach_sec_code: {
        type: 'string',
        enum: ['CCD', 'PPD', 'TEL', 'WEB', 'POP', 'C21'],
        nullable: true,
        description:
          'Required for ACH transactions if account_vault_id is not provided.',
        example: 'C21',
      },
      effective_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'For ACH only, this is optional and defaults to current day.',
        example: '2021-12-01',
      },
      account_holder_name: {
        type: 'string',
        maxLength: 32,
        description:
          "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
        example: 'smith',
      },
      account_number: {
        type: 'string',
        minLength: 4,
        maxLength: 19,
        description:
          'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
        example: '24345',
      },
      account_type: {
        type: 'string',
        minLength: 1,
        maxLength: 32,
        enum: ['checking', 'savings'],
        description:
          'Required for ACH transactions if account_vault_id is not provided.',
        example: 'checking',
      },
      check_number: {
        type: 'string',
        minLength: 1,
        maxLength: 15,
        nullable: true,
        description: 'Required for transactions using TEL SEC code.',
        example: '8520748520963',
      },
      routing_number: {
        type: 'string',
        description:
          'This field is read only for ach on transactions. Must be supplied if account_vault_id is not provided.',
        example: '051904524',
      },
    },
    required: [
      'transaction_amount',
      'account_holder_name',
      'account_number',
      'account_type',
      'routing_number',
    ],
  },
  '/v1/transactions/cc/avs-only/keyed': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: 'location-api-id-florida-2',
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description: 'A valid Location Id to associate the transaction with.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      account_holder_name: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
        example: 'smith',
      },
      account_number: {
        type: 'string',
        minLength: 13,
        maxLength: 19,
        description:
          'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
        example: '5454545454545454',
      },
      cvv: {
        type: 'string',
        maxLength: 4,
        nullable: true,
        description:
          'Required for CC transactions if vt_require_cvv is true on producttransaction(Merchant Deposit Account).',
        example: null,
      },
      entry_mode_id: {
        type: 'string',
        enum: ['B', 'S', 'K', 'C', 'P', 'F'],
        nullable: true,
        description: 'Entry Mode - See entry mode section for more detail',
        example: 'K',
      },
      exp_date: {
        type: 'string',
        maxLength: 4,
        description:
          'Required for CC. The Expiration Date for the credit card. (MMYY format).',
        example: '0722',
      },
      track_data: {
        type: 'string',
        maxLength: 256,
        nullable: true,
        description: 'Track Data from a magnetic card swipe.',
        example: 'T051904524T 741025349520O 8520748520963',
      },
    },
    required: ['account_number', 'exp_date'],
  },
  '/v1/transactions/cc/avs-only/terminal': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: null,
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'Location ID',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      terminal_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'Terminal ID',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      terminal_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Advance Deposit',
        example: null,
      },
      e_format: {
        type: 'string',
        enum: ['ksn', 'ksnpin', 'idtech', 'magnesafe'],
        nullable: true,
        description: 'Encrypted Track Data Format.',
        example: 'magnesafe',
      },
      e_track_data: {
        type: 'string',
        nullable: true,
        description: 'Encrypted Track Data',
        example: null,
      },
      e_serial_number: {
        type: 'string',
        maxLength: 20,
        nullable: true,
        description: 'Encrypted Track Data KSN',
        example: null,
      },
    },
    required: ['location_id', 'terminal_id'],
  },
  '/v1/transactions/cc/auth-only/keyed': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: 'location-api-id-florida-2',
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description: 'A valid Location Id to associate the transaction with.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      account_holder_name: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
        example: 'smith',
      },
      account_number: {
        type: 'string',
        minLength: 13,
        maxLength: 19,
        description:
          'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
        example: '5454545454545454',
      },
      cvv: {
        type: 'string',
        maxLength: 4,
        nullable: true,
        description:
          'Required for CC transactions if vt_require_cvv is true on producttransaction(Merchant Deposit Account).',
        example: null,
      },
      entry_mode_id: {
        type: 'string',
        enum: ['B', 'S', 'K', 'C', 'P', 'F'],
        nullable: true,
        description: 'Entry Mode - See entry mode section for more detail',
        example: 'K',
      },
      exp_date: {
        type: 'string',
        maxLength: 4,
        description:
          'Required for CC. The Expiration Date for the credit card. (MMYY format).',
        example: '0722',
      },
      track_data: {
        type: 'string',
        maxLength: 256,
        nullable: true,
        description: 'Track Data from a magnetic card swipe.',
        example: 'T051904524T 741025349520O 8520748520963',
      },
    },
    required: ['transaction_amount', 'account_number', 'exp_date'],
  },
  '/v1/transactions/cc/auth-only/terminal': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: null,
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'Location ID',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      terminal_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'Terminal ID',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      terminal_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Advance Deposit',
        example: null,
      },
      e_format: {
        type: 'string',
        enum: ['ksn', 'ksnpin', 'idtech', 'magnesafe'],
        nullable: true,
        description: 'Encrypted Track Data Format.',
        example: 'magnesafe',
      },
      e_track_data: {
        type: 'string',
        nullable: true,
        description: 'Encrypted Track Data',
        example: null,
      },
      e_serial_number: {
        type: 'string',
        maxLength: 20,
        nullable: true,
        description: 'Encrypted Track Data KSN',
        example: null,
      },
    },
    required: ['location_id', 'transaction_amount', 'terminal_id'],
  },
  '/v1/transactions/cc/force/keyed': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: 'location-api-id-florida-2',
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description: 'A valid Location Id to associate the transaction with.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      account_holder_name: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
        example: 'smith',
      },
      account_number: {
        type: 'string',
        minLength: 13,
        maxLength: 19,
        description:
          'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
        example: '5454545454545454',
      },
      cvv: {
        type: 'string',
        maxLength: 4,
        nullable: true,
        description:
          'Required for CC transactions if vt_require_cvv is true on producttransaction(Merchant Deposit Account).',
        example: null,
      },
      entry_mode_id: {
        type: 'string',
        enum: ['B', 'S', 'K', 'C', 'P', 'F'],
        nullable: true,
        description: 'Entry Mode - See entry mode section for more detail',
        example: 'K',
      },
      exp_date: {
        type: 'string',
        maxLength: 4,
        description:
          'Required for CC. The Expiration Date for the credit card. (MMYY format).',
        example: '0722',
      },
      track_data: {
        type: 'string',
        maxLength: 256,
        nullable: true,
        description: 'Track Data from a magnetic card swipe.',
        example: 'T051904524T 741025349520O 8520748520963',
      },
      auth_code: {
        type: 'string',
        maxLength: 6,
        description:
          'Required on force transactions. Ignored for all other actions.',
        example: 'abc123',
      },
    },
    required: ['account_number', 'exp_date', 'auth_code'],
  },
  '/v1/transactions/cc/refund/keyed': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: 'location-api-id-florida-2',
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description: 'A valid Location Id to associate the transaction with.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      account_holder_name: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
        example: 'smith',
      },
      account_number: {
        anyOf: [
          {
            type: 'string',
            minLength: 13,
            maxLength: 19,
            description:
              'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
            example: '5454545454545454',
          },
          {
            type: 'string',
            minLength: 13,
            maxLength: 19,
            description:
              'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
            example: '5454545454545454',
            'x-required': true,
          },
        ],
        description:
          'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
        example: null,
      },
      cvv: {
        type: 'string',
        maxLength: 4,
        nullable: true,
        description:
          'Required for CC transactions if vt_require_cvv is true on producttransaction(Merchant Deposit Account).',
        example: null,
      },
      entry_mode_id: {
        type: 'string',
        enum: ['B', 'S', 'K', 'C', 'P', 'F'],
        nullable: true,
        description: 'Entry Mode - See entry mode section for more detail',
        example: 'K',
      },
      exp_date: {
        anyOf: [
          {
            type: 'string',
            maxLength: 4,
            description:
              'Required for CC. The Expiration Date for the credit card. (MMYY format).',
            example: '0722',
          },
          {
            type: 'string',
            maxLength: 4,
            description:
              'Required for CC. The Expiration Date for the credit card. (MMYY format).',
            example: '0722',
            'x-required': true,
          },
        ],
        description:
          'Required for CC. The Expiration Date for the credit card. (MMYY format).',
        example: null,
      },
      track_data: {
        type: 'string',
        maxLength: 256,
        nullable: true,
        description: 'Track Data from a magnetic card swipe.',
        example: 'T051904524T 741025349520O 8520748520963',
      },
      previous_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'previous_transaction_id is used as token to run transaction. Account details OR previous_transaction_id should be passed to run transaction.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
    },
    required: ['transaction_amount'],
  },
  '/v1/transactions/cc/refund/terminal': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: null,
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'Location ID',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      terminal_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'Terminal ID',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      terminal_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Advance Deposit',
        example: null,
      },
      e_format: {
        type: 'string',
        enum: ['ksn', 'ksnpin', 'idtech', 'magnesafe'],
        nullable: true,
        description: 'Encrypted Track Data Format.',
        example: 'magnesafe',
      },
      e_track_data: {
        type: 'string',
        nullable: true,
        description: 'Encrypted Track Data',
        example: null,
      },
      e_serial_number: {
        type: 'string',
        maxLength: 20,
        nullable: true,
        description: 'Encrypted Track Data KSN',
        example: null,
      },
    },
    required: ['location_id', 'transaction_amount', 'terminal_id'],
  },
  '/v1/transactions/cc/sale/keyed': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: 'location-api-id-florida-2',
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description: 'A valid Location Id to associate the transaction with.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      account_holder_name: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "For CC, this is the 'Name (as it appears) on Card'. For ACH, this is the 'Name on Account'.",
        example: 'smith',
      },
      account_number: {
        type: 'string',
        minLength: 13,
        maxLength: 19,
        description:
          'For CC transactions, a credit card number. For ACH transactions, a bank account number.',
        example: '5454545454545454',
      },
      cvv: {
        type: 'string',
        maxLength: 4,
        nullable: true,
        description:
          'Required for CC transactions if vt_require_cvv is true on producttransaction(Merchant Deposit Account).',
        example: null,
      },
      entry_mode_id: {
        type: 'string',
        enum: ['B', 'S', 'K', 'C', 'P', 'F'],
        nullable: true,
        description: 'Entry Mode - See entry mode section for more detail',
        example: 'K',
      },
      exp_date: {
        type: 'string',
        maxLength: 4,
        description:
          'Required for CC. The Expiration Date for the credit card. (MMYY format).',
        example: '0722',
      },
      track_data: {
        type: 'string',
        maxLength: 256,
        nullable: true,
        description: 'Track Data from a magnetic card swipe.',
        example: 'T051904524T 741025349520O 8520748520963',
      },
    },
    required: ['transaction_amount', 'account_number', 'exp_date'],
  },
  '/v1/transactions/cc/sale/terminal': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: null,
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'Location ID',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      terminal_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'Terminal ID',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      terminal_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Advance Deposit',
        example: null,
      },
      e_format: {
        type: 'string',
        enum: ['ksn', 'ksnpin', 'idtech', 'magnesafe'],
        nullable: true,
        description: 'Encrypted Track Data Format.',
        example: 'magnesafe',
      },
      e_track_data: {
        type: 'string',
        nullable: true,
        description: 'Encrypted Track Data',
        example: null,
      },
      e_serial_number: {
        type: 'string',
        maxLength: 20,
        nullable: true,
        description: 'Encrypted Track Data KSN',
        example: null,
      },
    },
    required: ['location_id', 'transaction_amount', 'terminal_id'],
  },
  '/v1/transactions/cc/sale/token': {
    type: 'object',
    properties: {
      additional_amounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'cashback',
                'surcharge',
                'healthcare',
                'transit',
                'RX',
                'vision',
                'clinical',
                'copay',
                'dental',
                'tax',
                'fee',
              ],
              nullable: true,
              description:
                'type of the amount [4S-Healthcare(Visa and MC Only), 4U-Prescription/Rx(Visa and MC Only), 4V-Vision/Optical(Visa Only), 4W-clinic/other qualified medical(Visa Only) ,4X-Dental(Visa Only)].',
              example: 'cashback',
            },
            amount: {
              type: 'integer',
              nullable: true,
              description: 'The amount of additional amount.',
              example: 10,
            },
            account_type: {
              type: 'string',
              enum: [
                'unknown',
                'checking',
                'credit',
                'cash_benefit',
                'snap',
                'prepaid',
                'savings',
                'spending_power',
                'universal',
              ],
              nullable: true,
              description: 'Account Type',
              example: 'credit',
            },
            currency: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Currency Code',
              example: 840,
            },
          },
        },
        description: 'Additional amounts',
      },
      billing_address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 36,
            nullable: true,
            description:
              'The City portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Novi',
          },
          state: {
            type: 'string',
            maxLength: 24,
            nullable: true,
            description:
              'The State portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: 'Michigan',
          },
          postal_code: {
            type: 'string',
            pattern: '^[a-zA-Z0-9\\-\\s]+$',
            minLength: 4,
            maxLength: 10,
            nullable: true,
            description:
              "The Zip or 'Postal Code' portion of the address associated with the Credit Card (CC) or Bank Account (ACH).",
            example: '48375',
          },
          street: {
            type: 'string',
            pattern: "^[\\w#,.\\-'&\\s/]+$",
            maxLength: 255,
            nullable: true,
            description:
              'The Street portion of the address associated with the Credit Card (CC) or Bank Account (ACH).',
            example: '43155 Main Street STE 2310-C',
          },
          phone: {
            type: 'string',
            pattern: '^\\d{10}$',
            minLength: 10,
            maxLength: 10,
            nullable: true,
            description:
              'The Phone # to be used to contact Payer if there are any issues processing a transaction.',
            example: '3339998822',
          },
        },
        description: 'Billing Address Object',
      },
      checkin_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkin Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      checkout_date: {
        type: 'string',
        pattern: '^[\\d]{4}-[\\d]{2}-[\\d]{2}$',
        maxLength: 10,
        nullable: true,
        description:
          'Checkout Date - The time difference between checkin_date and checkout_date must be less than or equal to 99 days.',
        example: '2021-12-01',
      },
      clerk_number: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description: 'Clerk or Employee Identifier',
        example: 'AE1234',
      },
      contact_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of contact_id if you would like to use a contact for the transaction and are using your own custom api_id's to track contacts in the system.",
        example: null,
      },
      contact_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'If contact_id is provided, ensure it belongs to the same location as the transaction. You cannot move transaction across locations.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      custom_data: {
        type: 'object',
        properties: {},
        description:
          'A field that allows custom JSON to be entered to store extra data.',
        example: {
          data1: 'custom1',
          data2: 'custom2',
        },
      },
      customer_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description:
          'Can be used by Merchants to identify Contacts in our system by an ID from another system.',
        example: 'customerid',
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
        nullable: true,
        description: 'Description',
        example: 'some description',
      },
      identity_verification: {
        type: 'object',
        properties: {
          dl_state: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: 'MI',
          },
          dl_number: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            nullable: true,
            description:
              "Required for ACH transactions when Driver's License Verification is enabled on the terminal.  Either dl_number + dl_state OR customer_id will need to be passed in this scenario.",
            example: '1235567',
          },
          dob_year: {
            type: 'string',
            pattern: '^(19\\d{2})|20\\d{2}$',
            minLength: 4,
            maxLength: 4,
            nullable: true,
            description:
              'Required for certain ACH transactions where Identity Verification has been enabled for the terminal.  Either ssn4 or dob_year will need to be passed in this scenario but NOT BOTH.',
            example: '1980',
          },
        },
        description: 'Identity Verification',
      },
      iias_ind: {
        type: 'integer',
        enum: [0, 1, 2],
        nullable: true,
        description: "Possible values are '0', '1','2'",
        example: 1,
      },
      image_front: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      image_back: {
        type: 'string',
        nullable: true,
        description:
          'A base64 encoded string for the image.  Used with Check21 ACH transactions.',
        example: 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=',
      },
      installment: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is a fixed installment plan transaction.',
        example: true,
      },
      installment_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the current installment number that is running.',
        example: 1,
      },
      installment_count: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is a fixed installment plan and installment field is being passed as 1, then this field must have a vlue of 1-999 specifying the total number of installments on the plan. This number must be grater than or equal to installment_number.',
        example: 1,
      },
      location_api_id: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description:
          "This can be supplied in place of location_id for the transaction if you are using your own custom api_id's for your locations.",
        example: 'location-api-id-florida-2',
      },
      location_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description: 'A valid Location Id to associate the transaction with.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      product_transaction_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          "The Product's method (cc/ach) has to match the action. If not provided, the API will use the default configured for the Location.",
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      no_show: {
        type: 'boolean',
        description: 'Used in Lodging',
        example: false,
      },
      notification_email_address: {
        type: 'string',
        nullable: true,
        description: 'If email is supplied then receipt will be emailed',
        example: 'johnsmith@smiths.com',
      },
      order_number: {
        type: 'string',
        maxLength: 32,
        nullable: true,
        description:
          "Required for CC transactions , if merchant's deposit account's duplicate check per batch has 'order_number' field",
        example: '433659378839',
      },
      po_number: {
        type: 'string',
        maxLength: 36,
        nullable: true,
        description: 'Purchase Order number',
        example: '555555553123',
      },
      quick_invoice_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        nullable: true,
        description:
          'Can be used to associate a transaction to a Quick Invoice.  Quick Invoice transactions will have a value for this field automatically.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      recurring: {
        type: 'boolean',
        description:
          'Flag that is allowed to be passed on card not present industries to signify the transaction is an ongoing recurring transaction. Possible values to send are 0 or 1. This field must be 0 or not present if installment is sent as 1.',
        example: false,
      },
      recurring_number: {
        type: 'number',
        format: 'float',
        minimum: 1,
        maximum: 999,
        nullable: true,
        description:
          'If this is an ongoing recurring and recurring field is being passed as 1, then this field must have a vlue of 1-999 specifying the current recurring number that is running.',
        example: 1,
      },
      room_num: {
        type: 'string',
        maxLength: 12,
        nullable: true,
        description: 'Used in Lodging',
        example: '303',
      },
      room_rate: {
        type: 'integer',
        nullable: true,
        description: 'Required if merchant industry type is lodging.',
        example: 95.3,
      },
      save_account: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: false,
      },
      save_account_title: {
        type: 'string',
        maxLength: 16,
        nullable: true,
        description:
          'If saving token while running a transaction, this will be the title of the token.',
        example: 'John Account',
      },
      subtotal_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 599,
      },
      surcharge_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 9999999999,
        nullable: true,
        description:
          'This field is allowed and required for transactions that have a product where surcharge is configured. Use only integer numbers, so $10.99 will be 1099.',
        example: 100,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          example: 'Walk-in Customer',
        },
        description: 'Tags',
      },
      tax: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Amount of Sales tax - If supplied, this amount should be included in the total transaction_amount field. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      tip_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 9999999999,
        nullable: true,
        description:
          'Optional tip amount. Tip is not supported for lodging and ecommerce merchants. Use only integer numbers, so $10.99 will be 1099.',
        example: 0,
      },
      transaction_amount: {
        type: 'integer',
        minimum: 1,
        maximum: 999999999,
        description:
          'Amount of the transaction. This should always be the desired settle amount of the transaction. Use only integer numbers, so $10.99 will be 1099.',
        example: 1,
      },
      secondary_amount: {
        type: 'integer',
        minimum: 0,
        maximum: 999999999,
        nullable: true,
        description:
          'Secondary Amount of the transaction. This should always be less than transaction amount. Use only integer numbers, so $10.99 will be 1099',
        example: 0,
      },
      transaction_api_id: {
        type: 'string',
        maxLength: 64,
        nullable: true,
        description: 'See api_id page for more details',
        example: 'transaction-payment-abcd123',
      },
      transaction_c1: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 1 for api users to store custom data',
        example: 'custom-data-1',
      },
      transaction_c2: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 2 for api users to store custom data',
        example: 'custom-data-2',
      },
      transaction_c3: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 3 for api users to store custom data',
        example: 'custom-data-3',
      },
      transaction_c4: {
        type: 'string',
        maxLength: 128,
        nullable: true,
        description: 'Custom field 4 for api users to store custom data',
        example: 'custom-data-4',
      },
      bank_funded_only_override: {
        type: 'boolean',
        description: 'Bank Funded Only Override',
        example: false,
      },
      advance_deposit: {
        type: 'boolean',
        description: 'Advance Deposit',
        example: null,
      },
      cardholder_present: {
        type: 'boolean',
        description: 'If the cardholder is present at the point of service',
        example: null,
      },
      card_present: {
        type: 'boolean',
        description:
          'A POST only field to specify whether or not the card is present.',
        example: null,
      },
      secure_auth_data: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) The token authentication value associated with 3D secure transactions (Such as CAVV, UCAF auth data)',
        example: 'vVwL7UNHCf8W8M2LAfvRChNHN7c%3D',
      },
      secure_protocol_version: {
        type: 'integer',
        nullable: true,
        description: '(ECOMM)  Secure Program Protocol Version',
        example: 2,
      },
      secure_collection_indicator: {
        type: 'integer',
        nullable: true,
        description:
          '(ECOMM) Used for UCAF collection indicator or Discover Autentication type',
        example: null,
      },
      secure_crytogram: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Used to supply the Digital Payment Cryptogram obtained from a Digital Secure Remote Payment (DSRP) transaction',
        example: 'ZVVEVDJITHpTNE9yNlNHMUh0R0E=',
      },
      secure_directory_server_transaction_id: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) Directory Server Transaction ID (Such as XID, TAVV)',
        example: 'd65e93c3-35ab-41ba-b307-767bfc19eae',
      },
      secure_ecomm_url: {
        type: 'string',
        nullable: true,
        description:
          '(ECOMM) This field is used to enter a merchant identifier such as the Merchant URL or reverse domain name as presented to the consumer during the checkout process for a Digital Secure Remote payment transaction',
        example: null,
      },
      terminal_serial_number: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]*$',
        maxLength: 36,
        nullable: true,
        description:
          "If transaction was processed using a terminal, this field would contain the terminal's serial number",
        example: '1234567890',
      },
      threedsecure: {
        type: 'boolean',
        description:
          'Specifies to save account to contacts profile if account_number/track_data is present with either contact_id or contact_api_id in params.',
        example: true,
      },
      wallet_type: {
        type: 'string',
        enum: ['000', '101', '103', '216', '217', '327'],
        nullable: true,
        description:
          'This value provides information from where the transaction was initialized (Such as In-App provider)\n>000 - Unknown wallet type (i.e., Discover PayButton)\n>\n>101 - MasterPass by MasterCard\n>\n>103 - Apple Pay\n>\n>216 - Google Pay\n>\n>217 - Samsung Pay\n>\n>327 - Merchant tokenization program\n>',
        example: null,
      },
      account_vault_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description: 'DEPRECATED (Use token_id instead).',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      token_id: {
        type: 'string',
        pattern:
          '^(([0-9a-fA-F]{24})|(([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})))$',
        description:
          'Required if account_number,  track_data, micr_data is not provided.',
        example: '11e95f8ec39de8fbdb0a4f1a',
      },
      account_vault_api_id: {
        type: 'string',
        maxLength: 36,
        description: 'DEPRECATED (Use token_api_id instead).',
        example: null,
      },
      token_api_id: {
        type: 'string',
        maxLength: 36,
        description:
          "This can be supplied in place of account_vault_id if you would like to use an token for the transaction and are using your own custom api_id's to track accountvaults in the system.",
        example: null,
      },
      _joi: {
        type: 'object',
        properties: {
          conditions: {
            type: 'object',
            properties: {
              method: {
                enum: ['xor'],
                example: null,
              },
              values: {
                enum: [
                  'account_vault_id',
                  'account_vault_api_id',
                  'token_id',
                  'token_api_id',
                ],
                example: null,
              },
            },
          },
        },
      },
    },
    required: ['transaction_amount'],
  },
} as const

export type OpenApiSpec = typeof definitions
