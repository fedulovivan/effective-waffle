const foo = {
  foo: 2,
  rootItemKey: 'LWB-4359',
  labels: [
    'GUI',
    'QA',
    'DB',
    'DOC'
  ],
  subtasks: [
    {
      label: 'GUI',
      summary: '',
      estimate: '',
      id: 1
    }
  ],
  jiraItem: {
    expand: 'renderedFields,names,schema,transitions,operations,editmeta,changelog',
    id: '39182',
    self: 'https://jira.danateq.net/rest/api/2/issue/39182',
    key: 'LWB-4359',
    fields: {
      issuetype: {
        self: 'https://jira.danateq.net/rest/api/2/issuetype/7',
        id: '7',
        description: 'Created by GreenHopper - do not edit or delete. Issue type for a user story.',
        iconUrl: 'https://jira.danateq.net/images/icons/ico_story.png',
        name: 'Story',
        subtask: false
      },
      timespent: 60,
      project: {
        self: 'https://jira.danateq.net/rest/api/2/project/10702',
        id: '10702',
        key: 'LWB',
        name: 'LINK Workbench',
        avatarUrls: {
          '48x48': 'https://jira.danateq.net/secure/projectavatar?pid=10702&avatarId=10011',
          '24x24': 'https://jira.danateq.net/secure/projectavatar?size=small&pid=10702&avatarId=10011',
          '16x16': 'https://jira.danateq.net/secure/projectavatar?size=xsmall&pid=10702&avatarId=10011',
          '32x32': 'https://jira.danateq.net/secure/projectavatar?size=medium&pid=10702&avatarId=10011'
        },
        projectCategory: {
          self: 'https://jira.danateq.net/rest/api/2/projectCategory/10005',
          id: '10005',
          description: 'Research and Development Projects',
          name: 'R&D'
        }
      },
      fixVersions: [
        {
          self: 'https://jira.danateq.net/rest/api/2/version/12437',
          id: '12437',
          name: 'V9.0',
          archived: false,
          released: false,
          releaseDate: '2017-12-22'
        }
      ],
      customfield_11001: null,
      customfield_11002: null,
      aggregatetimespent: 198060,
      resolution: {
        self: 'https://jira.danateq.net/rest/api/2/resolution/1',
        id: '1',
        description: 'A fix for this issue is checked into the tree and tested.',
        name: 'Fixed'
      },
      customfield_10500: '0|0zzx5o:',
      customfield_10700: {
        self: 'https://jira.danateq.net/rest/api/2/customFieldOption/10308',
        value: 'Please set the value',
        id: '10308'
      },
      customfield_10701: [
        {
          self: 'https://jira.danateq.net/rest/api/2/customFieldOption/10311',
          value: 'Please set the value',
          id: '10311'
        }
      ],
      customfield_10702: {
        self: 'https://jira.danateq.net/rest/api/2/customFieldOption/10321',
        value: 'Please set the value',
        id: '10321'
      },
      customfield_10703: {
        self: 'https://jira.danateq.net/rest/api/2/customFieldOption/10325',
        value: 'Please set the value',
        id: '10325'
      },
      customfield_10704: 'Your comments',
      customfield_10902: null,
      resolutiondate: '2017-11-28T17:40:47.000+0300',
      customfield_10903: null,
      customfield_10705: 'Your comments',
      customfield_10904: null,
      customfield_10905: null,
      workratio: -1,
      customfield_10908: null,
      lastViewed: '2017-12-10T10:53:56.678+0300',
      watches: {
        self: 'https://jira.danateq.net/rest/api/2/issue/LWB-4359/watchers',
        watchCount: 3,
        isWatching: true
      },
      created: '2017-10-09T09:26:07.000+0300',
      priority: {
        self: 'https://jira.danateq.net/rest/api/2/priority/3',
        iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
        name: 'Major',
        id: '3'
      },
      customfield_10100: null,
      customfield_10101: null,
      customfield_10102: null,
      labels: [
        'TeamLWB'
      ],
      customfield_10811: null,
      timeestimate: 0,
      aggregatetimeoriginalestimate: 255600,
      versions: [],
      customfield_10814: null,
      customfield_10815: null,
      customfield_10816: null,
      issuelinks: [
        {
          id: '27672',
          self: 'https://jira.danateq.net/rest/api/2/issueLink/27672',
          type: {
            id: '10300',
            name: 'Contributes',
            inward: 'Comprises',
            outward: 'Contributes ',
            self: 'https://jira.danateq.net/rest/api/2/issueLinkType/10300'
          },
          outwardIssue: {
            id: '37483',
            key: 'FP-349',
            self: 'https://jira.danateq.net/rest/api/2/issue/37483',
            fields: {
              summary: 'Contact Policy (Addlt Req): Message Category Subtypes which can override rules',
              status: {
                self: 'https://jira.danateq.net/rest/api/2/status/5',
                description: 'A resolution has been taken, and it is awaiting verification by reporter. From here issues are either reopened, or are closed.',
                iconUrl: 'https://jira.danateq.net/images/icons/statuses/resolved.png',
                name: 'Resolved',
                id: '5',
                statusCategory: {
                  self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                  id: 3,
                  key: 'done',
                  colorName: 'green',
                  name: 'Complete'
                }
              },
              priority: {
                self: 'https://jira.danateq.net/rest/api/2/priority/3',
                iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
                name: 'Major',
                id: '3'
              },
              issuetype: {
                self: 'https://jira.danateq.net/rest/api/2/issuetype/9',
                id: '9',
                description: 'A new Business requirement, which has been raised by an existing Customer ',
                iconUrl: 'https://jira.danateq.net/secure/viewavatar?size=xsmall&avatarId=11514&avatarType=issuetype',
                name: 'Change Request',
                subtask: false
              }
            }
          }
        },
        {
          id: '27671',
          self: 'https://jira.danateq.net/rest/api/2/issueLink/27671',
          type: {
            id: '10300',
            name: 'Contributes',
            inward: 'Comprises',
            outward: 'Contributes ',
            self: 'https://jira.danateq.net/rest/api/2/issueLinkType/10300'
          },
          outwardIssue: {
            id: '39398',
            key: 'FP-420',
            self: 'https://jira.danateq.net/rest/api/2/issue/39398',
            fields: {
              summary: 'CONTACT POLICY: Capability to add/edit/delete NPD Attributes via GUI',
              status: {
                self: 'https://jira.danateq.net/rest/api/2/status/10204',
                description: '',
                iconUrl: 'https://jira.danateq.net/images/icons/statuses/generic.png',
                name: 'Ready for execution',
                id: '10204',
                statusCategory: {
                  self: 'https://jira.danateq.net/rest/api/2/statuscategory/4',
                  id: 4,
                  key: 'indeterminate',
                  colorName: 'yellow',
                  name: 'In Progress'
                }
              },
              priority: {
                self: 'https://jira.danateq.net/rest/api/2/priority/3',
                iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
                name: 'Major',
                id: '3'
              },
              issuetype: {
                self: 'https://jira.danateq.net/rest/api/2/issuetype/9',
                id: '9',
                description: 'A new Business requirement, which has been raised by an existing Customer ',
                iconUrl: 'https://jira.danateq.net/secure/viewavatar?size=xsmall&avatarId=11514&avatarType=issuetype',
                name: 'Change Request',
                subtask: false
              }
            }
          }
        },
        {
          id: '27747',
          self: 'https://jira.danateq.net/rest/api/2/issueLink/27747',
          type: {
            id: '10003',
            name: 'Relates',
            inward: 'relates to',
            outward: 'relates to',
            self: 'https://jira.danateq.net/rest/api/2/issueLinkType/10003'
          },
          outwardIssue: {
            id: '39927',
            key: 'LNK-18111',
            self: 'https://jira.danateq.net/rest/api/2/issue/39927',
            fields: {
              summary: 'incorrect filtering in pkg_attr_type_val_lookup.get_rows_in_lookup_def',
              status: {
                self: 'https://jira.danateq.net/rest/api/2/status/6',
                description: '',
                iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
                name: 'Closed',
                id: '6',
                statusCategory: {
                  self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                  id: 3,
                  key: 'done',
                  colorName: 'green',
                  name: 'Complete'
                }
              },
              priority: {
                self: 'https://jira.danateq.net/rest/api/2/priority/3',
                iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
                name: 'Major',
                id: '3'
              },
              issuetype: {
                self: 'https://jira.danateq.net/rest/api/2/issuetype/1',
                id: '1',
                description: 'A problem which impairs or prevents the functions of the product.',
                iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/bug.png',
                name: 'Bug',
                subtask: false
              }
            }
          }
        },
        {
          id: '27734',
          self: 'https://jira.danateq.net/rest/api/2/issueLink/27734',
          type: {
            id: '10003',
            name: 'Relates',
            inward: 'relates to',
            outward: 'relates to',
            self: 'https://jira.danateq.net/rest/api/2/issueLinkType/10003'
          },
          outwardIssue: {
            id: '38976',
            key: 'LNK-17539',
            self: 'https://jira.danateq.net/rest/api/2/issue/38976',
            fields: {
              summary: 'Contact Policy: delivery channels \'tolerance\' settings',
              status: {
                self: 'https://jira.danateq.net/rest/api/2/status/6',
                description: '',
                iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
                name: 'Closed',
                id: '6',
                statusCategory: {
                  self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                  id: 3,
                  key: 'done',
                  colorName: 'green',
                  name: 'Complete'
                }
              },
              priority: {
                self: 'https://jira.danateq.net/rest/api/2/priority/3',
                iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
                name: 'Major',
                id: '3'
              },
              issuetype: {
                self: 'https://jira.danateq.net/rest/api/2/issuetype/7',
                id: '7',
                description: 'Created by GreenHopper - do not edit or delete. Issue type for a user story.',
                iconUrl: 'https://jira.danateq.net/images/icons/ico_story.png',
                name: 'Story',
                subtask: false
              }
            }
          }
        }
      ],
      assignee: {
        self: 'https://jira.danateq.net/rest/api/2/user?username=nikita.glazov',
        name: 'nikita.glazov',
        emailAddress: 'nikita.glazov@danateq.com',
        avatarUrls: {
          '48x48': 'https://jira.danateq.net/secure/useravatar?avatarId=10122',
          '24x24': 'https://jira.danateq.net/secure/useravatar?size=small&avatarId=10122',
          '16x16': 'https://jira.danateq.net/secure/useravatar?size=xsmall&avatarId=10122',
          '32x32': 'https://jira.danateq.net/secure/useravatar?size=medium&avatarId=10122'
        },
        displayName: 'Nikita Glazov',
        active: true
      },
      updated: '2017-11-30T18:43:10.000+0300',
      status: {
        self: 'https://jira.danateq.net/rest/api/2/status/6',
        description: '',
        iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
        name: 'Closed',
        id: '6',
        statusCategory: {
          self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
          id: 3,
          key: 'done',
          colorName: 'green',
          name: 'Complete'
        }
      },
      components: [],
      timeoriginalestimate: null,
      description: 'See FP-293, FP-348, FP-349, FP-350.\r\nMockups: LNK-16901\r\n\r\n*ACCEPTANCE CRITERIA*\r\n# For enumerated types it should be possible to manage the dictionary of values. The default dictionary editor should be provided for all types which don\'t require specific settings. -For other types dedicated editors should be provided- (LNK-17533, LNK-17539). The default editor should provide the following features:\r\n## View list of values. A user should be able to easily recognize System and Custom values.\r\n## Add Custom values to the dictionary\r\n## Edit existing Custom values. System values should not be editable.\r\n## Delete existing Custom values. System values should not be removable.\r\n# User permissions should be properly handled. Permissions on the whole page with all dictionaries should be supported. Separate permissions on certain dictionaries are out of scope.',
      customfield_11100: null,
      timetracking: {
        remainingEstimate: '0m',
        timeSpent: '1m',
        remainingEstimateSeconds: 0,
        timeSpentSeconds: 60
      },
      customfield_10005: [
        'com.atlassian.greenhopper.service.sprint.Sprint@421e937f[rapidViewId=26,state=CLOSED,name=LWB 9.0 Sprint 1,startDate=2017-11-09T10:00:44.970+03:00,endDate=2017-11-29T19:00:00.000+03:00,completeDate=2017-11-30T15:16:20.449+03:00,sequence=337,id=337]'
      ],
      customfield_10006: null,
      customfield_10600: {
        self: 'https://jira.danateq.net/rest/api/2/customFieldOption/10204',
        value: 'Link Workbench',
        id: '10204'
      },
      attachment: [],
      aggregatetimeestimate: 0,
      summary: 'NPD Attribute Types Editor: default editor for enumerated types',
      creator: {
        self: 'https://jira.danateq.net/rest/api/2/user?username=alexander.lapin',
        name: 'alexander.lapin',
        emailAddress: 'alexander.lapin@danateq.com',
        avatarUrls: {
          '48x48': 'https://jira.danateq.net/secure/useravatar?ownerId=alapin&avatarId=11003',
          '24x24': 'https://jira.danateq.net/secure/useravatar?size=small&ownerId=alapin&avatarId=11003',
          '16x16': 'https://jira.danateq.net/secure/useravatar?size=xsmall&ownerId=alapin&avatarId=11003',
          '32x32': 'https://jira.danateq.net/secure/useravatar?size=medium&ownerId=alapin&avatarId=11003'
        },
        displayName: 'Alexander Lapin',
        active: true
      },
      subtasks: [
        {
          id: '39350',
          key: 'LWB-4407',
          self: 'https://jira.danateq.net/rest/api/2/issue/39350',
          fields: {
            summary: 'Backend: REST interface and DB model for list of dictionaries + UT + fixtures (Read)',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39351',
          key: 'LWB-4408',
          self: 'https://jira.danateq.net/rest/api/2/issue/39351',
          fields: {
            summary: 'Backend: REST interface and DB model for dictionary values + UT + fixtures (CRUD)',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39352',
          key: 'LWB-4409',
          self: 'https://jira.danateq.net/rest/api/2/issue/39352',
          fields: {
            summary: 'Register new \'Dictionaries\' page in menu',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39353',
          key: 'LWB-4410',
          self: 'https://jira.danateq.net/rest/api/2/issue/39353',
          fields: {
            summary: 'New React page boilerplate code',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39357',
          key: 'LWB-4414',
          self: 'https://jira.danateq.net/rest/api/2/issue/39357',
          fields: {
            summary: 'Redux store design + API (empty actions selectors)',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39355',
          key: 'LWB-4412',
          self: 'https://jira.danateq.net/rest/api/2/issue/39355',
          fields: {
            summary: 'Fetch values of selected dictionary (actions, selectors, reducer + UT)',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39354',
          key: 'LWB-4411',
          self: 'https://jira.danateq.net/rest/api/2/issue/39354',
          fields: {
            summary: 'Component for left panel with list of dictionaries',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39356',
          key: 'LWB-4413',
          self: 'https://jira.danateq.net/rest/api/2/issue/39356',
          fields: {
            summary: 'Implement Table component in read-only mode',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39358',
          key: 'LWB-4415',
          self: 'https://jira.danateq.net/rest/api/2/issue/39358',
          fields: {
            summary: 'Actions and selectors for add/edit mode + UT',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39359',
          key: 'LWB-4416',
          self: 'https://jira.danateq.net/rest/api/2/issue/39359',
          fields: {
            summary: 'Action for deleting an item+ UT',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39360',
          key: 'LWB-4417',
          self: 'https://jira.danateq.net/rest/api/2/issue/39360',
          fields: {
            summary: 'Component for expanded row (both read and edit)',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39362',
          key: 'LWB-4419',
          self: 'https://jira.danateq.net/rest/api/2/issue/39362',
          fields: {
            summary: 'Handle user permissions for entire page',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39363',
          key: 'LWB-4420',
          self: 'https://jira.danateq.net/rest/api/2/issue/39363',
          fields: {
            summary: 'QA: test preparation',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39364',
          key: 'LWB-4421',
          self: 'https://jira.danateq.net/rest/api/2/issue/39364',
          fields: {
            summary: 'QA: test execution + XSS',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        },
        {
          id: '39365',
          key: 'LWB-4422',
          self: 'https://jira.danateq.net/rest/api/2/issue/39365',
          fields: {
            summary: 'DOC: Web OAM Manual update (NPD types editor + default dictionary editor)',
            status: {
              self: 'https://jira.danateq.net/rest/api/2/status/6',
              description: '',
              iconUrl: 'https://jira.danateq.net/images/icons/statuses/closed.png',
              name: 'Closed',
              id: '6',
              statusCategory: {
                self: 'https://jira.danateq.net/rest/api/2/statuscategory/3',
                id: 3,
                key: 'done',
                colorName: 'green',
                name: 'Complete'
              }
            },
            priority: {
              self: 'https://jira.danateq.net/rest/api/2/priority/3',
              iconUrl: 'https://jira.danateq.net/images/icons/priorities/major.png',
              name: 'Major',
              id: '3'
            },
            issuetype: {
              self: 'https://jira.danateq.net/rest/api/2/issuetype/5',
              id: '5',
              description: 'Sub-task',
              iconUrl: 'https://jira.danateq.net/images/icons/issuetypes/subtask_alternate.png',
              name: 'Sub-task',
              subtask: true
            }
          }
        }
      ],
      reporter: {
        self: 'https://jira.danateq.net/rest/api/2/user?username=alexander.lapin',
        name: 'alexander.lapin',
        emailAddress: 'alexander.lapin@danateq.com',
        avatarUrls: {
          '48x48': 'https://jira.danateq.net/secure/useravatar?ownerId=alapin&avatarId=11003',
          '24x24': 'https://jira.danateq.net/secure/useravatar?size=small&ownerId=alapin&avatarId=11003',
          '16x16': 'https://jira.danateq.net/secure/useravatar?size=xsmall&ownerId=alapin&avatarId=11003',
          '32x32': 'https://jira.danateq.net/secure/useravatar?size=medium&ownerId=alapin&avatarId=11003'
        },
        displayName: 'Alexander Lapin',
        active: true
      },
      customfield_10000: null,
      aggregateprogress: {
        progress: 198060,
        total: 198060,
        percent: 100
      },
      customfield_10001: null,
      customfield_10002: 3,
      customfield_10003: null,
      customfield_10004: '9223372036854775807',
      customfield_10400: null,
      environment: null,
      duedate: null,
      progress: {
        progress: 60,
        total: 60,
        percent: 100
      },
      comment: {
        startAt: 0,
        maxResults: 1,
        total: 1,
        comments: [
          {
            self: 'https://jira.danateq.net/rest/api/2/issue/39182/comment/86277',
            id: '86277',
            author: {
              self: 'https://jira.danateq.net/rest/api/2/user?username=anna.sevryugina',
              name: 'anna.sevryugina',
              emailAddress: 'anna.sevryugina@danateq.com',
              avatarUrls: {
                '48x48': 'https://jira.danateq.net/secure/useravatar?avatarId=10103',
                '24x24': 'https://jira.danateq.net/secure/useravatar?size=small&avatarId=10103',
                '16x16': 'https://jira.danateq.net/secure/useravatar?size=xsmall&avatarId=10103',
                '32x32': 'https://jira.danateq.net/secure/useravatar?size=medium&avatarId=10103'
              },
              displayName: 'Anna Sevryugina',
              active: true
            },
            body: 'Sub-tasks:\r\n- Backend: REST interface and DB model for list of dictionaries + UT (Read) 3h\r\n- Backend: REST interface and DB model for dictionary values + UT + fixtures (CRUD) 8h\r\n- Register new \'Dictionaries\' page in menu 1h\r\n- New React page boilerplate code 3h\r\n- Component for left panel with list of dictionaries 3h\r\n- Fetch values of selected dictionary (actions, store update, + UT)  3h\r\n- Implement Table component in read-only mode 3h\r\n- Redux store design + API (empty actions selectors) 3h\r\n- Actions and selectors for add/edit mode 5h\r\n- Action for deleting an item 3h\r\n- Component for expanded row (both read and edit) 3h\r\n- Integrate this page with NPD attr. type editor (fetch list of dictionaries there, handle "allow multiple" there, extend list of available values types) 8h  \r\n- Handle user permissions for entire page 2h\r\n- QA: test preparation 6h\r\n- QA: test execution + XSS 6h\r\n- DOC: Web OAM Manual update (NPD types editor + this page) 5h \r\n',
            updateAuthor: {
              self: 'https://jira.danateq.net/rest/api/2/user?username=ivan.fedulov',
              name: 'ivan.fedulov',
              emailAddress: 'ivan.fedulov@danateq.com',
              avatarUrls: {
                '48x48': 'https://jira.danateq.net/secure/useravatar?ownerId=ivan.fedulov&avatarId=11908',
                '24x24': 'https://jira.danateq.net/secure/useravatar?size=small&ownerId=ivan.fedulov&avatarId=11908',
                '16x16': 'https://jira.danateq.net/secure/useravatar?size=xsmall&ownerId=ivan.fedulov&avatarId=11908',
                '32x32': 'https://jira.danateq.net/secure/useravatar?size=medium&ownerId=ivan.fedulov&avatarId=11908'
              },
              displayName: 'Ivan Fedulov',
              active: true
            },
            created: '2017-10-11T12:41:26.000+0300',
            updated: '2017-10-11T15:41:01.000+0300'
          }
        ]
      },
      votes: {
        self: 'https://jira.danateq.net/rest/api/2/issue/LWB-4359/votes',
        votes: 0,
        hasVoted: false
      },
      worklog: {
        startAt: 0,
        maxResults: 20,
        total: 1,
        worklogs: [
          {
            self: 'https://jira.danateq.net/rest/api/2/issue/39182/worklog/45367',
            author: {
              name: 'alapin',
              active: false
            },
            updateAuthor: {
              name: 'alapin',
              active: false
            },
            comment: 'Time submitted by alexander.lapin for review DOCR-385',
            created: '2017-11-15T17:13:31.000+0300',
            updated: '2017-11-15T17:13:31.000+0300',
            started: '2017-11-15T17:13:31.000+0300',
            timeSpent: '1m',
            timeSpentSeconds: 60,
            id: '45367'
          }
        ]
      }
    }
  },
  fetchJiraItemPending: false,
  error: null
}