// gitddn demo rich mock data
// Converted from the legacy browser global mock into an importable ES module.

const mockData = {
  "common": {
    "status": {
      "approved": {
        "label": "승인 완료",
        "chip": "green"
      },
      "pending": {
        "label": "Pending",
        "chip": "orange"
      },
      "rejected": {
        "label": "승인 반려",
        "chip": "red"
      },
      "canceled": {
        "label": "Canceled",
        "chip": ""
      },
      "open": {
        "label": "Open",
        "chip": "blue"
      },
      "merged": {
        "label": "Merged",
        "chip": "green"
      },
      "closed": {
        "label": "Closed",
        "chip": ""
      },
      "draft": {
        "label": "Draft",
        "chip": ""
      },
      "passed": {
        "label": "Passed",
        "chip": "green"
      },
      "failed": {
        "label": "Failed",
        "chip": "red"
      },
      "running": {
        "label": "Running",
        "chip": "orange"
      },
      "warning": {
        "label": "Warning",
        "chip": "orange"
      },
      "pass": {
        "label": "Pass",
        "chip": "green"
      },
      "blocked": {
        "label": "Blocked",
        "chip": "red"
      },
      "created": {
        "label": "Created",
        "chip": ""
      },
      "skipped": {
        "label": "Skipped",
        "chip": ""
      },
      "manual": {
        "label": "Manual",
        "chip": "blue"
      },
      "finished": {
        "label": "Finished",
        "chip": "green"
      },
      "none": {
        "label": "-",
        "chip": ""
      },
      "need-check": {
        "label": "확인 필요",
        "chip": "red"
      }
    },
    "gnbCounts": {
      "mergeRequest": 7,
      "security": 2,
      "deployment": 3
    },
    "notifications": [
      {
        "id": "NTF-1001",
        "type": "review-request",
        "severity": "warning",
        "title": "MR review requested",
        "message": "MR #128 인증 정책 응답값 개선 리뷰가 필요합니다.",
        "createdAt": "5분 전",
        "targetLink": "/repositories/mobile-banking-api/merge-requests/128"
      },
      {
        "id": "NTF-1002",
        "type": "pipeline-failed",
        "severity": "failed",
        "title": "Pipeline failed",
        "message": "Pipeline #2847502395의 Test 단계가 실패했습니다.",
        "createdAt": "20분 전",
        "targetLink": "/repositories/mobile-banking-api/pipelines/2847502395"
      },
      {
        "id": "NTF-1003",
        "type": "security-blocked",
        "severity": "blocked",
        "title": "Security validation blocked",
        "message": "SEC-204 보안 정책 차단 항목 확인이 필요합니다.",
        "createdAt": "30분 전",
        "targetLink": "/security/SEC-204"
      },
      {
        "id": "NTF-1004",
        "type": "deployment-approved",
        "severity": "approved",
        "title": "Deployment transfer approved",
        "message": "DT-2026-0521-003 운영이관 요청이 승인되었습니다.",
        "createdAt": "2시간 전",
        "targetLink": "/deployment-transfer/DT-2026-0521-003"
      },
      {
        "id": "NTF-1005",
        "type": "policy-changed",
        "severity": "info",
        "title": "Repository policy changed",
        "message": "Repository naming policy가 업데이트되었습니다.",
        "createdAt": "3시간 전",
        "targetLink": "/admin/repository-policy"
      },
      {
        "id": "NTF-1006",
        "type": "audit-warning",
        "severity": "warning",
        "title": "Audit warning detected",
        "message": "권한/정책 변경 이벤트 검토가 필요합니다.",
        "createdAt": "4시간 전",
        "targetLink": "/audit"
      }
    ]
  },
  "user": {
    "currentUser": {
      "id": "jito",
      "name": "Jito",
      "email": "jito@company.com",
      "role": "Maintainer",
      "avatar": "J"
    },
    "users": [
      {
        "id": "jito",
        "name": "Jito",
        "email": "jito@company.com",
        "role": "Maintainer",
        "avatar": "J"
      },
      {
        "id": "min",
        "name": "Min",
        "email": "min@company.com",
        "role": "Tech Lead",
        "avatar": "민"
      },
      {
        "id": "han",
        "name": "Han",
        "email": "han@company.com",
        "role": "Backend Lead",
        "avatar": "한"
      },
      {
        "id": "seo",
        "name": "Seo",
        "email": "seo@company.com",
        "role": "QA Reviewer",
        "avatar": "서"
      },
      {
        "id": "park",
        "name": "Park",
        "email": "security@company.com",
        "role": "Security Reviewer",
        "avatar": "박"
      },
      {
        "id": "yoon",
        "name": "Yoon",
        "email": "yoon@company.com",
        "role": "DevOps Engineer",
        "avatar": "윤"
      },
      {
        "id": "choi",
        "name": "Choi",
        "email": "choi@company.com",
        "role": "Release Manager",
        "avatar": "최"
      },
      {
        "id": "lim",
        "name": "Lim",
        "email": "lim@company.com",
        "role": "Frontend Lead",
        "avatar": "임"
      },
      {
        "id": "kang",
        "name": "Kang",
        "email": "kang@company.com",
        "role": "Backend Developer",
        "avatar": "강"
      },
      {
        "id": "baek",
        "name": "Baek",
        "email": "baek@company.com",
        "role": "Auditor",
        "avatar": "백"
      },
      {
        "id": "system",
        "name": "System",
        "email": "system@gitddn.local",
        "role": "Automation",
        "avatar": "S"
      },
      {
        "id": "partner",
        "name": "Partner Dev",
        "email": "partner@company.com",
        "role": "External Developer",
        "avatar": "P"
      }
    ]
  },
  "auth": {
    "mockUsers": [
      {
        "id": "admin-001",
        "name": "Admin User",
        "email": "admin@gitddn.local",
        "password": "admin",
        "employeeId": "A0001",
        "role": "admin",
        "roleLabel": "Admin",
        "organization": "Shinhan Bank",
        "department": "Platform Governance Team",
        "allowedRepositoryIds": "all",
        "permissions": "all"
      },
      {
        "id": "user-001",
        "name": "Internal Developer",
        "email": "developer@gitddn.local",
        "password": "user",
        "employeeId": "D1024",
        "role": "internal",
        "roleLabel": "Internal User",
        "organization": "Shinhan Bank",
        "department": "Digital Banking Team",
        "allowedRepositoryIds": ["mobile-banking-api", "customer-web-portal", "auth-policy-engine"],
        "permissions": ["dashboard:read", "repository:read", "repository:create-request", "mr:read", "mr:create", "pipeline:read", "security:read", "deployment:read", "deployment:create-request", "audit:read"]
      },
      {
        "id": "external-001",
        "name": "External Partner",
        "email": "partner@gitddn.local",
        "password": "external",
        "employeeId": "EXT-204",
        "role": "external",
        "roleLabel": "External Developer",
        "organization": "Partner Company",
        "department": "External Development",
        "allowedRepositoryIds": ["customer-web-portal"],
        "permissions": ["dashboard:read", "repository:read", "mr:read", "mr:create", "pipeline:read"]
      }
    ]
  },
  "organizations": [
    {
      "key": "shinhan-bank",
      "label": "Shinhan Bank"
    },
    {
      "key": "hana-financial",
      "label": "Hana Financial Group"
    },
    {
      "key": "kb-financial",
      "label": "KB Financial"
    },
    {
      "key": "woori-bank",
      "label": "Woori Bank"
    }
  ],
  "repositories": {
    "requests": [
      {
        "id": "req-001",
        "path": "Digital Banking/Web/Gitddn-Frontend",
        "description": "관리자 정책 설정 화면과 운영 도구를 제공하는 Console UI",
        "language": "Vue",
        "status": "pending",
        "requestedAtText": "Requested 20 minutes ago"
      },
      {
        "id": "req-002",
        "path": "Digital Banking/Web/Gitddn-Frontend",
        "description": "관리자 정책 설정 화면과 운영 도구를 제공하는 Console UI",
        "language": "Vue",
        "status": "pending",
        "requestedAtText": "Requested 20 minutes ago"
      },
      {
        "id": "req-003",
        "path": "Digital Banking/Web/Gitddn-Frontend",
        "description": "설명 문장 길이가 다르게 써봄",
        "language": "Python",
        "status": "rejected",
        "requestedAtText": "Rejected 20 minutes ago",
        "rejectReason": "요청 정보가 부족하거나 생성 정책 조건을 충족하지 않습니다."
      },
      {
        "id": "req-004",
        "path": "Digital Banking/Web/Gitddn-Frontend",
        "description": "히든의 디자인은 이러함",
        "language": "React",
        "status": "canceled",
        "requestedAtText": "Canceled 20 minutes ago"
      }
    ],
    "projectTemplates": [
      {
        "id": "spring-boot-api",
        "name": "Spring Boot API",
        "description": "Spring Boot 기반 Backend API 저장소 템플릿",
        "language": "Java",
        "framework": "Spring Boot",
        "type": "Backend API",
        "branchStrategy": "Git Flow",
        "defaultPolicies": ["Protected Branch", "CI/CD", "CODEOWNERS"],
        "enabled": true,
        "order": 1,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "react-web",
        "name": "React Web",
        "description": "React 기반 Frontend Web 저장소 템플릿",
        "language": "TypeScript",
        "framework": "React",
        "type": "Frontend Web",
        "branchStrategy": "Github Flow",
        "defaultPolicies": ["Preview Deploy", "PR Review Rule"],
        "enabled": true,
        "order": 2,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "vue-admin",
        "name": "Vue Admin",
        "description": "Vue 기반 Admin Dashboard 저장소 템플릿",
        "language": "TypeScript",
        "framework": "Vue",
        "type": "Admin Dashboard",
        "branchStrategy": "Develop/Main",
        "defaultPolicies": ["Staging Deploy", "권한 정책 포함"],
        "enabled": true,
        "order": 3,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "node-api",
        "name": "Node API",
        "description": "Node.js Express 기반 REST API 저장소 템플릿",
        "language": "TypeScript",
        "framework": "Node.js · Express",
        "type": "REST API",
        "branchStrategy": "Github Flow",
        "defaultPolicies": ["Docker", "Swagger", "CI Pipeline"],
        "enabled": true,
        "order": 4,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "python-batch",
        "name": "Python Batch",
        "description": "Python Batch Worker 저장소 템플릿",
        "language": "Python",
        "framework": "Celery · Scheduler",
        "type": "Batch Worker",
        "branchStrategy": "Release Branch",
        "defaultPolicies": ["Logging", "Monitoring", "Scheduler 설정"],
        "enabled": true,
        "order": 5,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "android-app",
        "name": "Android App",
        "description": "Android Native Mobile App 저장소 템플릿",
        "language": "Kotlin",
        "framework": "Android Native",
        "type": "Mobile App",
        "branchStrategy": "Git Flow",
        "defaultPolicies": ["QA Branch", "Firebase Deploy"],
        "enabled": true,
        "order": 6,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "ios-app",
        "name": "iOS App",
        "description": "iOS Native Mobile App 저장소 템플릿",
        "language": "Swift",
        "framework": "iOS Native",
        "type": "Mobile App",
        "branchStrategy": "Protected Main",
        "defaultPolicies": ["Fastlane", "TestFlight Deploy"],
        "enabled": true,
        "order": 7,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "nextjs-web",
        "name": "Next.js Web",
        "description": "Next.js 기반 SSR Web Service 저장소 템플릿",
        "language": "TypeScript",
        "framework": "Next.js",
        "type": "SSR Web Service",
        "branchStrategy": "Github Flow",
        "defaultPolicies": ["Vercel Deploy", "Preview Environment"],
        "enabled": true,
        "order": 8,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "nestjs-api",
        "name": "NestJS API",
        "description": "NestJS 기반 Backend API 저장소 템플릿",
        "language": "TypeScript",
        "framework": "NestJS",
        "type": "Backend API",
        "branchStrategy": "Git Flow",
        "defaultPolicies": ["Swagger", "Docker", "CI/CD"],
        "enabled": true,
        "order": 9,
        "updatedAtText": "Updated 20 minutes ago"
      },
      {
        "id": "data-pipeline",
        "name": "Data Pipeline",
        "description": "Airflow 기반 Data Engineering 저장소 템플릿",
        "language": "Python",
        "framework": "Airflow",
        "type": "Data Engineering",
        "branchStrategy": "Release Branch",
        "defaultPolicies": ["DAG Template", "Monitoring", "Logging"],
        "enabled": true,
        "order": 10,
        "updatedAtText": "Updated 20 minutes ago"
      }
    ],
    "list": [
      {
        "id": "mobile-banking-api",
        "name": "mobile-banking-api",
        "organizationKey": "digital-banking",
        "groupKey": "banking",
        "group": "Digital Banking / Mobile",
        "typeKey": "typescript",
        "type": "TypeScript",
        "description": "은행 모바일 서비스의 계좌/인증 API Repository",
        "status": "approved",
        "favorite": true,
        "updatedAt": "Updated 20 minutes ago",
        "role": "Maintainer",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 5,
        "pipelineStatus": "failed",
        "securityStatus": "blocked",
        "metrics": [
          {
            "label": "Commits",
            "value": "1,248"
          },
          {
            "label": "Branches",
            "value": "14"
          },
          {
            "label": "Tags",
            "value": "8"
          },
          {
            "label": "Project Storage",
            "value": "2.4 GB"
          },
          {
            "label": "Security",
            "value": "High 1",
            "tone": "danger"
          }
        ],
        "nextUp": [
          {
            "title": "MR #128 검토가 필요합니다.",
            "desc": "mobile-banking-api · 리뷰/검증 상태 확인",
            "status": "리뷰 필요",
            "tone": "orange"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "red"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2419 은행 모바일 서비스의 계좌/인증  정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2450 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2480 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "customer-web-portal",
        "name": "customer-web-portal",
        "organizationKey": "digital-banking",
        "groupKey": "banking",
        "group": "Digital Banking / Web",
        "typeKey": "react",
        "type": "React",
        "description": "고객 웹 포털 화면과 인증 흐름을 관리하는 Repository",
        "status": "approved",
        "favorite": true,
        "updatedAt": "Updated 1 hour ago",
        "role": "Developer",
        "visibility": "Private",
        "defaultBranch": "develop",
        "openMrCount": 4,
        "pipelineStatus": "running",
        "securityStatus": "running",
        "metrics": [
          {
            "label": "Commits",
            "value": "1,185"
          },
          {
            "label": "Branches",
            "value": "15"
          },
          {
            "label": "Tags",
            "value": "9"
          },
          {
            "label": "Project Storage",
            "value": "2.7 GB"
          },
          {
            "label": "Security",
            "value": "Running",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #129 검토가 필요합니다.",
            "desc": "customer-web-portal · 리뷰/검증 상태 확인",
            "status": "확인 필요",
            "tone": "red"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "green"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2420 고객 웹 포털 화면과 인증 흐름을 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2451 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2481 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "account-limit-service",
        "name": "account-limit-service",
        "organizationKey": "digital-banking",
        "groupKey": "banking",
        "group": "Digital Banking / Core API",
        "typeKey": "java",
        "type": "Java",
        "description": "계좌 한도와 이체 제한 정책을 처리하는 내부 API 서비스",
        "status": "approved",
        "favorite": false,
        "updatedAt": "Updated 2 hours ago",
        "role": "Maintainer",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 3,
        "pipelineStatus": "passed",
        "securityStatus": "passed",
        "metrics": [
          {
            "label": "Commits",
            "value": "1,122"
          },
          {
            "label": "Branches",
            "value": "16"
          },
          {
            "label": "Tags",
            "value": "10"
          },
          {
            "label": "Project Storage",
            "value": "3.0 GB"
          },
          {
            "label": "Security",
            "value": "Passed",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #130 검토가 필요합니다.",
            "desc": "account-limit-service · 리뷰/검증 상태 확인",
            "status": "리뷰 필요",
            "tone": "orange"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "green"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2421 계좌 한도와 이체 제한 정책을 처 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2452 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2482 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "loan-screen-web",
        "name": "loan-screen-web",
        "organizationKey": "digital-banking",
        "groupKey": "banking",
        "group": "Digital Banking / Loan",
        "typeKey": "react",
        "type": "React",
        "description": "대출 신청/조회 화면과 심사 진행 상태를 제공하는 Web Repository",
        "status": "approved",
        "favorite": false,
        "updatedAt": "Updated yesterday",
        "role": "Developer",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 2,
        "pipelineStatus": "passed",
        "securityStatus": "warning",
        "metrics": [
          {
            "label": "Commits",
            "value": "1,059"
          },
          {
            "label": "Branches",
            "value": "17"
          },
          {
            "label": "Tags",
            "value": "11"
          },
          {
            "label": "Project Storage",
            "value": "3.3 GB"
          },
          {
            "label": "Security",
            "value": "Medium 2",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #131 검토가 필요합니다.",
            "desc": "loan-screen-web · 리뷰/검증 상태 확인",
            "status": "확인 필요",
            "tone": "red"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "red"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2422 대출 신청/조회 화면과 심사 진행 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2453 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2483 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "notification-gateway",
        "name": "notification-gateway",
        "organizationKey": "digital-banking",
        "groupKey": "platform",
        "group": "Platform Center / Messaging",
        "typeKey": "typescript",
        "type": "TypeScript",
        "description": "알림 발송, 템플릿, 발송 이력 관리를 담당하는 Gateway",
        "status": "approved",
        "favorite": false,
        "updatedAt": "Updated 3 hours ago",
        "role": "Maintainer",
        "visibility": "Private",
        "defaultBranch": "develop",
        "openMrCount": 3,
        "pipelineStatus": "warning",
        "securityStatus": "passed",
        "metrics": [
          {
            "label": "Commits",
            "value": "996"
          },
          {
            "label": "Branches",
            "value": "18"
          },
          {
            "label": "Tags",
            "value": "8"
          },
          {
            "label": "Project Storage",
            "value": "3.6 GB"
          },
          {
            "label": "Security",
            "value": "Passed",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #132 검토가 필요합니다.",
            "desc": "notification-gateway · 리뷰/검증 상태 확인",
            "status": "리뷰 필요",
            "tone": "orange"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "green"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2423 알림 발송, 템플릿, 발송 이력  정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2454 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2484 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "auth-policy-engine",
        "name": "auth-policy-engine",
        "organizationKey": "digital-banking",
        "groupKey": "platform",
        "group": "Platform Center / Security",
        "typeKey": "java",
        "type": "Java",
        "description": "인증 정책과 접근 조건을 평가하는 Policy Engine",
        "status": "approved",
        "favorite": true,
        "updatedAt": "Updated 30 minutes ago",
        "role": "Security Reviewer",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 2,
        "pipelineStatus": "failed",
        "securityStatus": "failed",
        "metrics": [
          {
            "label": "Commits",
            "value": "933"
          },
          {
            "label": "Branches",
            "value": "14"
          },
          {
            "label": "Tags",
            "value": "9"
          },
          {
            "label": "Project Storage",
            "value": "3.9 GB"
          },
          {
            "label": "Security",
            "value": "Critical 1",
            "tone": "danger"
          }
        ],
        "nextUp": [
          {
            "title": "MR #133 검토가 필요합니다.",
            "desc": "auth-policy-engine · 리뷰/검증 상태 확인",
            "status": "확인 필요",
            "tone": "red"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "green"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2424 인증 정책과 접근 조건을 평가하는 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2455 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2485 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "admin-console-ui",
        "name": "admin-console-ui",
        "organizationKey": "digital-banking",
        "groupKey": "platform",
        "group": "Platform Center / Admin",
        "typeKey": "vue",
        "type": "Vue",
        "description": "관리자 정책 설정 화면과 운영 도구를 제공하는 Console UI",
        "status": "approved",
        "favorite": false,
        "updatedAt": "Updated 4 hours ago",
        "role": "Developer",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 1,
        "pipelineStatus": "passed",
        "securityStatus": "passed",
        "metrics": [
          {
            "label": "Commits",
            "value": "870"
          },
          {
            "label": "Branches",
            "value": "15"
          },
          {
            "label": "Tags",
            "value": "10"
          },
          {
            "label": "Project Storage",
            "value": "4.2 GB"
          },
          {
            "label": "Security",
            "value": "Passed",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #134 검토가 필요합니다.",
            "desc": "admin-console-ui · 리뷰/검증 상태 확인",
            "status": "리뷰 필요",
            "tone": "orange"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "red"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2425 관리자 정책 설정 화면과 운영 도 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2456 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2486 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "settlement-batch",
        "name": "settlement-batch",
        "organizationKey": "digital-banking",
        "groupKey": "banking",
        "group": "Digital Banking / Batch",
        "typeKey": "python",
        "type": "Python",
        "description": "정산 데이터 집계와 일마감 배치 작업 Repository",
        "status": "approved",
        "favorite": false,
        "updatedAt": "Updated 2 days ago",
        "role": "Maintainer",
        "visibility": "Private",
        "defaultBranch": "develop",
        "openMrCount": 1,
        "pipelineStatus": "passed",
        "securityStatus": "passed",
        "metrics": [
          {
            "label": "Commits",
            "value": "807"
          },
          {
            "label": "Branches",
            "value": "16"
          },
          {
            "label": "Tags",
            "value": "11"
          },
          {
            "label": "Project Storage",
            "value": "4.5 GB"
          },
          {
            "label": "Security",
            "value": "Passed",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #135 검토가 필요합니다.",
            "desc": "settlement-batch · 리뷰/검증 상태 확인",
            "status": "확인 필요",
            "tone": "red"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "green"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2426 정산 데이터 집계와 일마감 배치  정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2457 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2487 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "common-ui-components",
        "name": "common-ui-components",
        "organizationKey": "digital-banking",
        "groupKey": "platform",
        "group": "Platform Center / Shared Module",
        "typeKey": "vue",
        "type": "Vue",
        "description": "공통 UI 컴포넌트 라이브러리 Repository 생성 요청",
        "status": "pending",
        "favorite": false,
        "updatedAt": "Requested 5 hours ago",
        "role": "Requested",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 0,
        "pipelineStatus": "none",
        "securityStatus": "none",
        "metrics": [
          {
            "label": "Commits",
            "value": "744"
          },
          {
            "label": "Branches",
            "value": "17"
          },
          {
            "label": "Tags",
            "value": "8"
          },
          {
            "label": "Project Storage",
            "value": "4.8 GB"
          },
          {
            "label": "Security",
            "value": "Pending",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #136 검토가 필요합니다.",
            "desc": "common-ui-components · 리뷰/검증 상태 확인",
            "status": "리뷰 필요",
            "tone": "orange"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "green"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2427 공통 UI 컴포넌트 라이브러리 R 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2458 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2488 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "partner-payment-sdk",
        "name": "partner-payment-sdk",
        "organizationKey": "digital-banking",
        "groupKey": "partner",
        "group": "Partner Workspace",
        "typeKey": "java",
        "type": "Java",
        "description": "외부 결제 SDK 연동 모듈 Repository 생성 요청",
        "status": "rejected",
        "favorite": false,
        "updatedAt": "Rejected 1 day ago",
        "role": "Requested",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 0,
        "pipelineStatus": "none",
        "securityStatus": "blocked",
        "metrics": [
          {
            "label": "Commits",
            "value": "681"
          },
          {
            "label": "Branches",
            "value": "18"
          },
          {
            "label": "Tags",
            "value": "9"
          },
          {
            "label": "Project Storage",
            "value": "5.1 GB"
          },
          {
            "label": "Security",
            "value": "Blocked",
            "tone": "danger"
          }
        ],
        "nextUp": [
          {
            "title": "MR #137 검토가 필요합니다.",
            "desc": "partner-payment-sdk · 리뷰/검증 상태 확인",
            "status": "확인 필요",
            "tone": "red"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "red"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2428 외부 결제 SDK 연동 모듈 Re 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2459 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2489 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ],
        "rejectReason": "외부 파트너 SDK 반입 승인 문서가 누락되었습니다."
      },
      {
        "id": "legacy-report-batch",
        "name": "legacy-report-batch",
        "organizationKey": "digital-banking",
        "groupKey": "banking",
        "group": "Digital Banking / Batch",
        "typeKey": "python",
        "type": "Python",
        "description": "리포트 배치 작업을 분리하기 위한 Repository 생성 요청",
        "status": "canceled",
        "favorite": false,
        "updatedAt": "Canceled 3 days ago",
        "role": "Requested",
        "visibility": "Private",
        "defaultBranch": "develop",
        "openMrCount": 0,
        "pipelineStatus": "none",
        "securityStatus": "none",
        "metrics": [
          {
            "label": "Commits",
            "value": "618"
          },
          {
            "label": "Branches",
            "value": "14"
          },
          {
            "label": "Tags",
            "value": "10"
          },
          {
            "label": "Project Storage",
            "value": "5.4 GB"
          },
          {
            "label": "Security",
            "value": "-",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #138 검토가 필요합니다.",
            "desc": "legacy-report-batch · 리뷰/검증 상태 확인",
            "status": "리뷰 필요",
            "tone": "orange"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "green"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2429 리포트 배치 작업을 분리하기 위한 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2460 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2490 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "compliance-exporter",
        "name": "compliance-exporter",
        "organizationKey": "digital-banking",
        "groupKey": "platform",
        "group": "Platform Center / Audit",
        "typeKey": "python",
        "type": "Python",
        "description": "감사 로그와 정책 이력을 외부 보고 포맷으로 내보내는 모듈",
        "status": "pending",
        "favorite": false,
        "updatedAt": "Requested 1 day ago",
        "role": "Requested",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 0,
        "pipelineStatus": "none",
        "securityStatus": "none",
        "metrics": [
          {
            "label": "Commits",
            "value": "555"
          },
          {
            "label": "Branches",
            "value": "15"
          },
          {
            "label": "Tags",
            "value": "11"
          },
          {
            "label": "Project Storage",
            "value": "5.7 GB"
          },
          {
            "label": "Security",
            "value": "Pending",
            "tone": ""
          }
        ],
        "nextUp": [
          {
            "title": "MR #139 검토가 필요합니다.",
            "desc": "compliance-exporter · 리뷰/검증 상태 확인",
            "status": "확인 필요",
            "tone": "red"
          },
          {
            "title": "최근 Pipeline 결과를 확인하세요.",
            "desc": "실패 Job 또는 Running 상태가 있는지 확인",
            "status": "Pipeline",
            "tone": "blue"
          },
          {
            "title": "보안 점검 결과를 확인하세요.",
            "desc": "병합 전 필수 Security Validation 기준",
            "status": "Security",
            "tone": "green"
          }
        ],
        "tickets": [
          {
            "title": "DBK-2430 감사 로그와 정책 이력을 외부 보 정리",
            "desc": "담당: Jito · Due today",
            "status": "진행 중",
            "tone": "orange"
          },
          {
            "title": "DBK-2461 API/화면 영향 범위 확인",
            "desc": "MR과 연결된 업무 티켓",
            "status": "To do",
            "tone": ""
          },
          {
            "title": "DBK-2491 정책/보안 점검 결과 조치",
            "desc": "Security Check와 연결",
            "status": "확인 필요",
            "tone": "red"
          }
        ]
      },
      {
        "id": "corp-loan-risk-api",
        "name": "corp-loan-risk-api",
        "organizationKey": "corporate-banking",
        "groupKey": "banking",
        "group": "Digital Banking / Core API",
        "typeKey": "java",
        "type": "Java",
        "description": "기업 여신 심사와 리스크 등급 계산을 처리하는 API Repository",
        "status": "approved",
        "favorite": true,
        "updatedAt": "Updated 12 minutes ago",
        "role": "Maintainer",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 2,
        "pipelineStatus": "passed",
        "securityStatus": "passed",
        "metrics": [],
        "nextUp": [],
        "tickets": []
      },
      {
        "id": "corp-cash-portal",
        "name": "corp-cash-portal",
        "organizationKey": "corporate-banking",
        "groupKey": "banking",
        "group": "Digital Banking / Web",
        "typeKey": "react",
        "type": "React",
        "description": "기업 자금관리 포털의 계좌, 승인, 이체 화면 Repository",
        "status": "approved",
        "favorite": false,
        "updatedAt": "Updated 45 minutes ago",
        "role": "Developer",
        "visibility": "Private",
        "defaultBranch": "develop",
        "openMrCount": 1,
        "pipelineStatus": "running",
        "securityStatus": "warning",
        "metrics": [],
        "nextUp": [],
        "tickets": []
      },
      {
        "id": "wealth-advisor-web",
        "name": "wealth-advisor-web",
        "organizationKey": "wealth-management",
        "groupKey": "banking",
        "group": "Digital Banking / Web",
        "typeKey": "react",
        "type": "React",
        "description": "자산관리 상담 화면과 포트폴리오 제안 흐름을 제공하는 Web Repository",
        "status": "approved",
        "favorite": true,
        "updatedAt": "Updated 25 minutes ago",
        "role": "Maintainer",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 3,
        "pipelineStatus": "passed",
        "securityStatus": "passed",
        "metrics": [],
        "nextUp": [],
        "tickets": []
      },
      {
        "id": "wealth-report-batch",
        "name": "wealth-report-batch",
        "organizationKey": "wealth-management",
        "groupKey": "banking",
        "group": "Digital Banking / Batch",
        "typeKey": "python",
        "type": "Python",
        "description": "고객 포트폴리오 리포트 생성과 발송 배치를 담당하는 Repository",
        "status": "pending",
        "favorite": false,
        "updatedAt": "Requested 2 hours ago",
        "role": "Requested",
        "visibility": "Private",
        "defaultBranch": "main",
        "openMrCount": 0,
        "pipelineStatus": "none",
        "securityStatus": "none",
        "metrics": [],
        "nextUp": [],
        "tickets": []
      }
    ],
    "detail": {
      "id": "mobile-banking-api",
      "name": "mobile-banking-api",
      "groupKey": "banking",
      "group": "Digital Banking / Mobile",
      "typeKey": "typescript",
      "type": "TypeScript",
      "description": "은행 모바일 서비스의 계좌/인증 API Repository",
      "status": "approved",
      "favorite": true,
      "updatedAt": "Updated 20 minutes ago",
      "role": "Maintainer",
      "visibility": "Private",
      "defaultBranch": "main",
      "openMrCount": 5,
      "pipelineStatus": "failed",
      "securityStatus": "blocked",
      "mergeConditions": [
        "Pipeline 성공",
        "리뷰어 승인 1건 이상",
        "보안 점검 통과",
        "Target Branch 최신 상태"
      ],
      "branches": [
        {
          "name": "main",
          "isDefault": true,
          "isProtected": true,
          "aheadCount": 0,
          "behindCount": 0,
          "updatedAt": "2026-05-28",
          "latestCommit": {
            "message": "Branch policy validation flow 정리",
            "author": "Min",
            "timeText": "20분 전 업데이트",
            "sha": "91a42df0"
          }
        },
        {
          "name": "develop",
          "isDefault": false,
          "isProtected": true,
          "aheadCount": 12,
          "behindCount": 0,
          "updatedAt": "2026-05-28",
          "latestCommit": {
            "message": "develop 브랜치 빌드 안정화",
            "author": "김동현",
            "timeText": "2시간 전",
            "sha": "5c91a022"
          }
        },
        {
          "name": "feature/login-policy",
          "isDefault": false,
          "isProtected": false,
          "aheadCount": 3,
          "behindCount": 8,
          "updatedAt": "2026-05-27",
          "latestCommit": {
            "message": "인증 정책 응답값 개선",
            "author": "Jito",
            "timeText": "어제",
            "sha": "7e14d754"
          }
        },
        {
          "name": "feature/payment-exception",
          "isDefault": false,
          "isProtected": false,
          "aheadCount": 5,
          "behindCount": 12,
          "updatedAt": "2026-05-27",
          "latestCommit": {
            "message": "로그인 정책 예외 케이스 응답값 개선",
            "author": "김동현",
            "timeText": "어제",
            "sha": "7e14d754"
          }
        },
        {
          "name": "release/1.2.0",
          "isDefault": false,
          "isProtected": true,
          "aheadCount": 999,
          "behindCount": 34,
          "updatedAt": "2026-05-26",
          "latestCommit": {
            "message": "운영 반영 전 영향도 점검 추가",
            "author": "Kim",
            "timeText": "2026.05.26",
            "sha": "8f6d2ab1"
          }
        },
        {
          "name": "hotfix/auth-timeout",
          "isDefault": false,
          "isProtected": false,
          "aheadCount": 2,
          "behindCount": 42,
          "updatedAt": "2026-05-25",
          "latestCommit": {
            "message": "세션 만료 처리 긴급 수정",
            "author": "Park",
            "timeText": "2026.05.25",
            "sha": "4ac81e02"
          }
        },
        {
          "name": "feature/auth-policy",
          "isDefault": false,
          "isProtected": false,
          "aheadCount": 7,
          "behindCount": 14,
          "updatedAt": "2026-05-24",
          "latestCommit": {
            "message": "인증 정책 테스트 케이스 보강",
            "author": "Jito",
            "timeText": "2026.05.24",
            "sha": "4ac81e02"
          }
        }
      ],
      "branchComparisons": [
        {
          "source": "feature/payment-exception",
          "target": "develop",
          "hasDiff": true,
          "diffCount": 246
        },
        {
          "source": "feature/login-policy",
          "target": "develop",
          "hasDiff": true,
          "diffCount": 167
        },
        {
          "source": "develop",
          "target": "main",
          "hasDiff": true,
          "diffCount": 12
        },
        {
          "source": "main",
          "target": "develop",
          "hasDiff": false,
          "diffCount": 0
        }
      ],
      "metrics": [
        {
          "label": "Commits",
          "value": "1,248"
        },
        {
          "label": "Branches",
          "value": "14"
        },
        {
          "label": "Tags",
          "value": "8"
        },
        {
          "label": "Project Storage",
          "value": "2.4 GB"
        },
        {
          "label": "Security",
          "value": "High 1",
          "tone": "danger"
        }
      ],
      "nextUp": [
        {
          "title": "MR #128 검토가 필요합니다.",
          "desc": "mobile-banking-api · 리뷰/검증 상태 확인",
          "status": "리뷰 필요",
          "tone": "orange"
        },
        {
          "title": "최근 Pipeline 결과를 확인하세요.",
          "desc": "실패 Job 또는 Running 상태가 있는지 확인",
          "status": "Pipeline",
          "tone": "blue"
        },
        {
          "title": "보안 점검 결과를 확인하세요.",
          "desc": "병합 전 필수 Security Validation 기준",
          "status": "Security",
          "tone": "red"
        }
      ],
      "tickets": [
        {
          "title": "DBK-2419 은행 모바일 서비스의 계좌/인증  정리",
          "desc": "담당: Jito · Due today",
          "status": "진행 중",
          "tone": "orange"
        },
        {
          "title": "DBK-2450 API/화면 영향 범위 확인",
          "desc": "MR과 연결된 업무 티켓",
          "status": "To do",
          "tone": ""
        },
        {
          "title": "DBK-2480 정책/보안 점검 결과 조치",
          "desc": "Security Check와 연결",
          "status": "확인 필요",
          "tone": "red"
        }
      ]
    }
  },
  "mergeRequests": {
    "list": [
      {
        "id": 129,
        "title": "고객 포털 인증 배너 개선",
        "summary": "로그인 후 고객 포털 상단 인증 안내 배너와 만료 상태 표시를 개선합니다.",
        "repo": "customer-web-portal",
        "repoGroup": "Digital Banking / Web",
        "source": "feature/auth-banner",
        "target": "develop",
        "owner": "min",
        "author": "Min",
        "updatedAt": "15분 전",
        "pipeline": "failed",
        "security": "warning",
        "securityLabel": "Warning",
        "review": "need-review",
        "reviewLabel": "리뷰 필요",
        "approved": 1,
        "required": 2,
        "comments": 5,
        "status": "open",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 0/2",
            "status": "0/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "customer-web-portal · feature/account-cache",
            "status": "실패",
            "tone": "danger",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "실패",
                "tone": "danger"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "대기",
                "tone": "warning"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "2시간 전",
              "stateLabel": "리뷰",
              "comment": "계좌 목록 캐싱 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/customer/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "M",
              "tone": "orange",
              "author": "Min",
              "time": "2시간 전",
              "comment": "계좌 목록 캐싱 개선 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "2시간 전",
              "title": "MR 생성",
              "desc": "Min가 feature/account-cache → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline failed · Security 대기"
            }
          ]
        },
        "meta": [
          "Min 요청",
          "15분 전",
          "댓글 5",
          "커밋 3",
          "변경 파일 4개"
        ],
        "diff": {
          "added": "+98",
          "removed": "-21",
          "files": 4
        }
      },
      {
        "id": 128,
        "title": "인증 정책 응답값 개선",
        "summary": "로그인 정책 예외 케이스 응답값 정리 및 인증 API 응답 필드 표준화",
        "repo": "mobile-banking-api",
        "repoGroup": "Digital Banking / Mobile",
        "source": "feature/login-policy",
        "target": "develop",
        "owner": "jito",
        "author": "Jito",
        "updatedAt": "20분 전",
        "pipeline": "passed",
        "security": "failed",
        "securityLabel": "확인 필요",
        "review": "need-review",
        "reviewLabel": "리뷰 필요",
        "approved": 1,
        "required": 2,
        "comments": 8,
        "status": "open",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 1/2",
            "status": "1/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "검토 중",
                "tone": "warning"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "mobile-banking-api · feature/login-policy",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "확인 필요",
            "tone": "danger",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "확인 필요",
                "tone": "danger"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "확인 필요",
                "tone": "danger"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "20분 전",
              "stateLabel": "리뷰",
              "comment": "인증 정책 응답값 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/mobile/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "J",
              "tone": "orange",
              "author": "Jito",
              "time": "20분 전",
              "comment": "인증 정책 응답값 개선 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "20분 전",
              "title": "MR 생성",
              "desc": "Jito가 feature/login-policy → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security 확인 필요"
            }
          ]
        },
        "meta": [
          "Jito 요청",
          "20분 전",
          "댓글 8",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+166",
          "removed": "-47",
          "files": 5
        }
      },
      {
        "id": 127,
        "title": "계좌 이체 한도 정책 추가",
        "summary": "고객 등급별 이체 한도 검증 로직 추가",
        "repo": "account-limit-service",
        "repoGroup": "Digital Banking / Core API",
        "source": "feature/transfer-limit",
        "target": "develop",
        "owner": "kang",
        "author": "Kang",
        "updatedAt": "45분 전",
        "pipeline": "failed",
        "security": "warning",
        "securityLabel": "Warning",
        "review": "need-review",
        "reviewLabel": "리뷰 필요",
        "approved": 0,
        "required": 2,
        "comments": 6,
        "status": "open",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 0/2",
            "status": "0/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "검토 중",
                "tone": "warning"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "account-limit-service · feature/transfer-limit",
            "status": "실패",
            "tone": "danger",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "실패",
                "tone": "danger"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Warning",
            "tone": "warning",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "확인 필요",
                "tone": "warning"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "대기",
                "tone": "warning"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "45분 전",
              "stateLabel": "리뷰",
              "comment": "계좌 이체 한도 정책 추가 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/account/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "K",
              "tone": "orange",
              "author": "Kang",
              "time": "45분 전",
              "comment": "계좌 이체 한도 정책 추가 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "45분 전",
              "title": "MR 생성",
              "desc": "Kang가 feature/transfer-limit → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline failed · Security Warning"
            }
          ]
        },
        "meta": [
          "Kang 요청",
          "45분 전",
          "댓글 6",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+143",
          "removed": "-38",
          "files": 4
        }
      },
      {
        "id": 126,
        "title": "계좌 목록 캐싱 개선",
        "summary": "계좌 목록 API 응답 캐싱 처리 및 로딩 상태 개선",
        "repo": "customer-web-portal",
        "repoGroup": "Digital Banking / Web",
        "source": "feature/account-cache",
        "target": "develop",
        "owner": "min",
        "author": "Min",
        "updatedAt": "2시간 전",
        "pipeline": "failed",
        "security": "pending",
        "securityLabel": "대기",
        "review": "draft",
        "reviewLabel": "Draft",
        "approved": 0,
        "required": 2,
        "comments": 3,
        "status": "open",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 0/2",
            "status": "0/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "customer-web-portal · feature/account-cache",
            "status": "실패",
            "tone": "danger",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "실패",
                "tone": "danger"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "대기",
                "tone": "warning"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "2시간 전",
              "stateLabel": "리뷰",
              "comment": "계좌 목록 캐싱 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/customer/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "M",
              "tone": "orange",
              "author": "Min",
              "time": "2시간 전",
              "comment": "계좌 목록 캐싱 개선 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "2시간 전",
              "title": "MR 생성",
              "desc": "Min가 feature/account-cache → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline failed · Security 대기"
            }
          ]
        },
        "meta": [
          "Min 요청",
          "2시간 전",
          "댓글 3",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+120",
          "removed": "-29",
          "files": 3
        }
      },
      {
        "id": 125,
        "title": "알림 템플릿 변수 표준화",
        "summary": "알림 발송 템플릿의 변수 규칙 통합",
        "repo": "notification-gateway",
        "repoGroup": "Platform Center / Messaging",
        "source": "feature/template-vars",
        "target": "develop",
        "owner": "yoon",
        "author": "Yoon",
        "updatedAt": "3시간 전",
        "pipeline": "running",
        "security": "pending",
        "securityLabel": "검증 중",
        "review": "need-review",
        "reviewLabel": "리뷰 필요",
        "approved": 1,
        "required": 2,
        "comments": 5,
        "status": "open",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 1/2",
            "status": "1/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "notification-gateway · feature/template-vars",
            "status": "실행 중",
            "tone": "warning",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "실행 중",
                "tone": "warning"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "대기",
                "tone": "warning"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "검증 중",
            "tone": "warning",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "대기",
                "tone": "warning"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "3시간 전",
              "stateLabel": "리뷰",
              "comment": "알림 템플릿 변수 표준화 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/notification/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "Y",
              "tone": "orange",
              "author": "Yoon",
              "time": "3시간 전",
              "comment": "알림 템플릿 변수 표준화 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "3시간 전",
              "title": "MR 생성",
              "desc": "Yoon가 feature/template-vars → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline running · Security 검증 중"
            }
          ]
        },
        "meta": [
          "Yoon 요청",
          "3시간 전",
          "댓글 5",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+258",
          "removed": "-20",
          "files": 8
        }
      },
      {
        "id": 124,
        "title": "관리자 정책 화면 검색 개선",
        "summary": "정책 목록 검색/필터 사용성 개선",
        "repo": "admin-console-ui",
        "repoGroup": "Platform Center / Admin",
        "source": "feature/policy-search",
        "target": "develop",
        "owner": "lim",
        "author": "Lim",
        "updatedAt": "5시간 전",
        "pipeline": "passed",
        "security": "passed",
        "securityLabel": "Passed",
        "review": "approved",
        "reviewLabel": "승인 완료",
        "approved": 2,
        "required": 2,
        "comments": 9,
        "status": "open",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 2/2",
            "status": "2/2 승인",
            "tone": "success",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "admin-console-ui · feature/policy-search",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Passed",
            "tone": "success",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "5시간 전",
              "stateLabel": "리뷰",
              "comment": "관리자 정책 화면 검색 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/admin/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "L",
              "tone": "orange",
              "author": "Lim",
              "time": "5시간 전",
              "comment": "관리자 정책 화면 검색 개선 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "5시간 전",
              "title": "MR 생성",
              "desc": "Lim가 feature/policy-search → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Passed"
            }
          ]
        },
        "meta": [
          "Lim 요청",
          "5시간 전",
          "댓글 9",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+235",
          "removed": "-56",
          "files": 7
        }
      },
      {
        "id": 123,
        "title": "Auth policy rule matcher 분리",
        "summary": "인증 정책 조건 매칭 로직 모듈화",
        "repo": "auth-policy-engine",
        "repoGroup": "Platform Center / Security",
        "source": "feature/rule-matcher",
        "target": "develop",
        "owner": "park",
        "author": "Park",
        "updatedAt": "6시간 전",
        "pipeline": "failed",
        "security": "failed",
        "securityLabel": "확인 필요",
        "review": "need-review",
        "reviewLabel": "리뷰 필요",
        "approved": 1,
        "required": 3,
        "comments": 12,
        "status": "draft",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 3명 승인 필요 · 현재 1/3",
            "status": "1/3 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "검토 중",
                "tone": "warning"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "auth-policy-engine · feature/rule-matcher",
            "status": "실패",
            "tone": "danger",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "실패",
                "tone": "danger"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "확인 필요",
            "tone": "danger",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "확인 필요",
                "tone": "danger"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "확인 필요",
                "tone": "danger"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "대기",
                "tone": "warning"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "6시간 전",
              "stateLabel": "리뷰",
              "comment": "Auth policy rule matcher 분리 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/auth/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "P",
              "tone": "orange",
              "author": "Park",
              "time": "6시간 전",
              "comment": "Auth policy rule matcher 분리 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "6시간 전",
              "title": "MR 생성",
              "desc": "Park가 feature/rule-matcher → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline failed · Security 확인 필요"
            }
          ]
        },
        "meta": [
          "Park 요청",
          "6시간 전",
          "댓글 12",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+212",
          "removed": "-47",
          "files": 6
        }
      },
      {
        "id": 122,
        "title": "대출 신청 상태 카드 개선",
        "summary": "대출 심사 진행 단계 UI와 상태 메시지 개선",
        "repo": "loan-screen-web",
        "repoGroup": "Digital Banking / Loan",
        "source": "feature/loan-status-card",
        "target": "develop",
        "owner": "seo",
        "author": "Seo",
        "updatedAt": "어제",
        "pipeline": "passed",
        "security": "warning",
        "securityLabel": "Warning",
        "review": "need-review",
        "reviewLabel": "리뷰 필요",
        "approved": 1,
        "required": 2,
        "comments": 4,
        "status": "open",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 1/2",
            "status": "1/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "검토 중",
                "tone": "warning"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "loan-screen-web · feature/loan-status-card",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Warning",
            "tone": "warning",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "확인 필요",
                "tone": "warning"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "어제",
              "stateLabel": "리뷰",
              "comment": "대출 신청 상태 카드 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/loan/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "S",
              "tone": "orange",
              "author": "Seo",
              "time": "어제",
              "comment": "대출 신청 상태 카드 개선 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "어제",
              "title": "MR 생성",
              "desc": "Seo가 feature/loan-status-card → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Warning"
            }
          ]
        },
        "meta": [
          "Seo 요청",
          "어제",
          "댓글 4",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+189",
          "removed": "-38",
          "files": 5
        }
      },
      {
        "id": 121,
        "title": "로그인 실패 메시지 정리",
        "summary": "로그인 실패 케이스별 메시지 및 에러 코드 정리",
        "repo": "mobile-banking-api",
        "repoGroup": "Digital Banking / Mobile",
        "source": "fix/login-message",
        "target": "main",
        "owner": "han",
        "author": "Han",
        "updatedAt": "어제",
        "pipeline": "passed",
        "security": "passed",
        "securityLabel": "Passed",
        "review": "approved",
        "reviewLabel": "승인 완료",
        "approved": 2,
        "required": 2,
        "comments": 11,
        "status": "merged",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 2/2",
            "status": "2/2 승인",
            "tone": "success",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "mobile-banking-api · fix/login-message",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Passed",
            "tone": "success",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "어제",
              "stateLabel": "리뷰",
              "comment": "로그인 실패 메시지 정리 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/mobile/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "H",
              "tone": "orange",
              "author": "Han",
              "time": "어제",
              "comment": "로그인 실패 메시지 정리 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "어제",
              "title": "MR 생성",
              "desc": "Han가 fix/login-message → main MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Passed"
            }
          ]
        },
        "meta": [
          "Han 요청",
          "어제",
          "댓글 11",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+166",
          "removed": "-29",
          "files": 4
        }
      },
      {
        "id": 120,
        "title": "정산 배치 재시도 정책 개선",
        "summary": "실패한 정산 배치의 재시도 횟수와 알림 조건 개선",
        "repo": "settlement-batch",
        "repoGroup": "Digital Banking / Batch",
        "source": "feature/retry-policy",
        "target": "main",
        "owner": "choi",
        "author": "Choi",
        "updatedAt": "2일 전",
        "pipeline": "passed",
        "security": "passed",
        "securityLabel": "Passed",
        "review": "approved",
        "reviewLabel": "승인 완료",
        "approved": 2,
        "required": 2,
        "comments": 7,
        "status": "merged",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 2/2",
            "status": "2/2 승인",
            "tone": "success",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "settlement-batch · feature/retry-policy",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Passed",
            "tone": "success",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "2일 전",
              "stateLabel": "리뷰",
              "comment": "정산 배치 재시도 정책 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/settlement/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "C",
              "tone": "orange",
              "author": "Choi",
              "time": "2일 전",
              "comment": "정산 배치 재시도 정책 개선 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "2일 전",
              "title": "MR 생성",
              "desc": "Choi가 feature/retry-policy → main MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Passed"
            }
          ]
        },
        "meta": [
          "Choi 요청",
          "2일 전",
          "댓글 7",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+143",
          "removed": "-20",
          "files": 3
        }
      },
      {
        "id": 119,
        "title": "감사 로그 내보내기 포맷 추가",
        "summary": "CSV/JSON 감사 로그 추출 포맷 추가",
        "repo": "compliance-exporter",
        "repoGroup": "Platform Center / Audit",
        "source": "feature/audit-export",
        "target": "develop",
        "owner": "baek",
        "author": "Baek",
        "updatedAt": "2일 전",
        "pipeline": "running",
        "security": "pending",
        "securityLabel": "검증 중",
        "review": "draft",
        "reviewLabel": "Draft",
        "approved": 0,
        "required": 2,
        "comments": 2,
        "status": "open",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 0/2",
            "status": "0/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "compliance-exporter · feature/audit-export",
            "status": "실행 중",
            "tone": "warning",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "실행 중",
                "tone": "warning"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "대기",
                "tone": "warning"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "검증 중",
            "tone": "warning",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "대기",
                "tone": "warning"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "2일 전",
              "stateLabel": "리뷰",
              "comment": "감사 로그 내보내기 포맷 추가 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/compliance/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "B",
              "tone": "orange",
              "author": "Baek",
              "time": "2일 전",
              "comment": "감사 로그 내보내기 포맷 추가 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "2일 전",
              "title": "MR 생성",
              "desc": "Baek가 feature/audit-export → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline running · Security 검증 중"
            }
          ]
        },
        "meta": [
          "Baek 요청",
          "2일 전",
          "댓글 2",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+120",
          "removed": "-56",
          "files": 8
        }
      },
      {
        "id": 118,
        "title": "외부 인증 모듈 교체",
        "summary": "외부 파트너 인증 SDK 교체 요청",
        "repo": "partner-payment-sdk",
        "repoGroup": "Partner Workspace",
        "source": "feature/external-auth",
        "target": "develop",
        "owner": "partner",
        "author": "Partner Dev",
        "updatedAt": "3일 전",
        "pipeline": "canceled",
        "security": "none",
        "securityLabel": "-",
        "review": "rejected",
        "reviewLabel": "승인 반려",
        "approved": 0,
        "required": 2,
        "comments": 5,
        "status": "closed",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 0/2",
            "status": "0/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "partner-payment-sdk · feature/external-auth",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "실행 중",
                "tone": "warning"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "-",
            "tone": "warning",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "대기",
                "tone": "warning"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "3일 전",
              "stateLabel": "리뷰",
              "comment": "외부 인증 모듈 교체 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/partner/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "P",
              "tone": "orange",
              "author": "Partner Dev",
              "time": "3일 전",
              "comment": "외부 인증 모듈 교체 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "3일 전",
              "title": "MR 생성",
              "desc": "Partner Dev가 feature/external-auth → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline canceled · Security -"
            }
          ]
        },
        "meta": [
          "Partner Dev 요청",
          "3일 전",
          "댓글 5",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+258",
          "removed": "-47",
          "files": 7
        }
      },
      {
        "id": 117,
        "title": "모바일 약관 API 응답 축소",
        "summary": "약관 목록 조회 응답 필드 최소화",
        "repo": "mobile-banking-api",
        "repoGroup": "Digital Banking / Mobile",
        "source": "feature/terms-response",
        "target": "develop",
        "owner": "jito",
        "author": "Jito",
        "updatedAt": "3일 전",
        "pipeline": "passed",
        "security": "passed",
        "securityLabel": "Passed",
        "review": "approved",
        "reviewLabel": "승인 완료",
        "approved": 2,
        "required": 2,
        "comments": 6,
        "status": "merged",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 2/2",
            "status": "2/2 승인",
            "tone": "success",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "mobile-banking-api · feature/terms-response",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Passed",
            "tone": "success",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "3일 전",
              "stateLabel": "리뷰",
              "comment": "모바일 약관 API 응답 축소 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/mobile/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "J",
              "tone": "orange",
              "author": "Jito",
              "time": "3일 전",
              "comment": "모바일 약관 API 응답 축소 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "3일 전",
              "title": "MR 생성",
              "desc": "Jito가 feature/terms-response → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Passed"
            }
          ]
        },
        "meta": [
          "Jito 요청",
          "3일 전",
          "댓글 6",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+235",
          "removed": "-38",
          "files": 6
        }
      },
      {
        "id": 116,
        "title": "공통 버튼 컴포넌트 접근성 개선",
        "summary": "키보드 포커스와 ARIA 속성을 보완합니다.",
        "repo": "common-ui-components",
        "repoGroup": "Platform Center / Shared Module",
        "source": "feature/a11y-button",
        "target": "develop",
        "owner": "seo",
        "author": "Seo",
        "updatedAt": "5일 전",
        "pipeline": "passed",
        "security": "passed",
        "securityLabel": "Passed",
        "review": "approved",
        "reviewLabel": "승인 완료",
        "approved": 2,
        "required": 2,
        "comments": 4,
        "status": "merged",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 2/2",
            "status": "2/2 승인",
            "tone": "success",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "common-ui-components · feature/a11y-button",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Passed",
            "tone": "success",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "5일 전",
              "stateLabel": "리뷰",
              "comment": "공통 버튼 컴포넌트 접근성 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/common/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "S",
              "tone": "orange",
              "author": "Seo",
              "time": "5일 전",
              "comment": "공통 버튼 컴포넌트 접근성 개선 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "5일 전",
              "title": "MR 생성",
              "desc": "Seo가 feature/a11y-button → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Passed"
            }
          ]
        },
        "meta": [
          "Seo 요청",
          "5일 전",
          "댓글 4",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+212",
          "removed": "-29",
          "files": 5
        }
      },
      {
        "id": 115,
        "title": "알림 발송 실패 재처리",
        "summary": "알림 발송 실패 건의 재처리 Queue 추가",
        "repo": "notification-gateway",
        "repoGroup": "Platform Center / Messaging",
        "source": "feature/retry-queue",
        "target": "main",
        "owner": "yoon",
        "author": "Yoon",
        "updatedAt": "5일 전",
        "pipeline": "passed",
        "security": "passed",
        "securityLabel": "Passed",
        "review": "approved",
        "reviewLabel": "승인 완료",
        "approved": 3,
        "required": 3,
        "comments": 10,
        "status": "merged",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 3명 승인 필요 · 현재 3/3",
            "status": "3/3 승인",
            "tone": "success",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "notification-gateway · feature/retry-queue",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Passed",
            "tone": "success",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "5일 전",
              "stateLabel": "리뷰",
              "comment": "알림 발송 실패 재처리 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/notification/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "Y",
              "tone": "orange",
              "author": "Yoon",
              "time": "5일 전",
              "comment": "알림 발송 실패 재처리 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "5일 전",
              "title": "MR 생성",
              "desc": "Yoon가 feature/retry-queue → main MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Passed"
            }
          ]
        },
        "meta": [
          "Yoon 요청",
          "5일 전",
          "댓글 10",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+189",
          "removed": "-20",
          "files": 4
        }
      },
      {
        "id": 114,
        "title": "관리자 메뉴 권한 뱃지 추가",
        "summary": "역할별 접근 가능한 메뉴에 권한 뱃지 표시",
        "repo": "admin-console-ui",
        "repoGroup": "Platform Center / Admin",
        "source": "feature/role-badge",
        "target": "develop",
        "owner": "lim",
        "author": "Lim",
        "updatedAt": "6일 전",
        "pipeline": "passed",
        "security": "warning",
        "securityLabel": "Warning",
        "review": "approved",
        "reviewLabel": "승인 완료",
        "approved": 2,
        "required": 2,
        "comments": 3,
        "status": "merged",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 2/2",
            "status": "2/2 승인",
            "tone": "success",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "검토 중",
                "tone": "warning"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "admin-console-ui · feature/role-badge",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Warning",
            "tone": "warning",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "확인 필요",
                "tone": "warning"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "6일 전",
              "stateLabel": "리뷰",
              "comment": "관리자 메뉴 권한 뱃지 추가 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/admin/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "L",
              "tone": "orange",
              "author": "Lim",
              "time": "6일 전",
              "comment": "관리자 메뉴 권한 뱃지 추가 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "6일 전",
              "title": "MR 생성",
              "desc": "Lim가 feature/role-badge → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Warning"
            }
          ]
        },
        "meta": [
          "Lim 요청",
          "6일 전",
          "댓글 3",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+166",
          "removed": "-56",
          "files": 3
        }
      },
      {
        "id": 113,
        "title": "대출 서류 업로드 오류 처리",
        "summary": "대출 신청 서류 업로드 실패 메시지 개선",
        "repo": "loan-screen-web",
        "repoGroup": "Digital Banking / Loan",
        "source": "fix/upload-error",
        "target": "develop",
        "owner": "seo",
        "author": "Seo",
        "updatedAt": "6일 전",
        "pipeline": "failed",
        "security": "passed",
        "securityLabel": "Passed",
        "review": "rejected",
        "reviewLabel": "승인 반려",
        "approved": 0,
        "required": 2,
        "comments": 8,
        "status": "closed",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 0/2",
            "status": "0/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "loan-screen-web · fix/upload-error",
            "status": "실패",
            "tone": "danger",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "실패",
                "tone": "danger"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Passed",
            "tone": "success",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "대기",
            "tone": "warning",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "대기",
                "tone": "warning"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "6일 전",
              "stateLabel": "리뷰",
              "comment": "대출 서류 업로드 오류 처리 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/loan/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "S",
              "tone": "orange",
              "author": "Seo",
              "time": "6일 전",
              "comment": "대출 서류 업로드 오류 처리 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "6일 전",
              "title": "MR 생성",
              "desc": "Seo가 fix/upload-error → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline failed · Security Passed"
            }
          ]
        },
        "meta": [
          "Seo 요청",
          "6일 전",
          "댓글 8",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+143",
          "removed": "-47",
          "files": 8
        }
      },
      {
        "id": 112,
        "title": "정산 파일 암호화 옵션 추가",
        "summary": "정산 파일 생성 시 암호화 옵션과 키 관리 추가",
        "repo": "settlement-batch",
        "repoGroup": "Digital Banking / Batch",
        "source": "feature/encrypt-export",
        "target": "develop",
        "owner": "choi",
        "author": "Choi",
        "updatedAt": "1주 전",
        "pipeline": "passed",
        "security": "failed",
        "securityLabel": "확인 필요",
        "review": "need-review",
        "reviewLabel": "리뷰 필요",
        "approved": 1,
        "required": 2,
        "comments": 13,
        "status": "draft",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 2명 승인 필요 · 현재 1/2",
            "status": "1/2 승인",
            "tone": "warning",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "대기 중",
                "tone": "warning"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "검토 중",
                "tone": "warning"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "settlement-batch · feature/encrypt-export",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "확인 필요",
            "tone": "danger",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "확인 필요",
                "tone": "danger"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "확인 필요",
                "tone": "danger"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "1주 전",
              "stateLabel": "리뷰",
              "comment": "정산 파일 암호화 옵션 추가 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/settlement/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "C",
              "tone": "orange",
              "author": "Choi",
              "time": "1주 전",
              "comment": "정산 파일 암호화 옵션 추가 MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "1주 전",
              "title": "MR 생성",
              "desc": "Choi가 feature/encrypt-export → develop MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security 확인 필요"
            }
          ]
        },
        "meta": [
          "Choi 요청",
          "1주 전",
          "댓글 13",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+120",
          "removed": "-38",
          "files": 7
        }
      },
      {
        "id": 111,
        "title": "권한 매핑 정책 import",
        "summary": "CSV 기반 권한 매핑 정책 일괄 등록",
        "repo": "auth-policy-engine",
        "repoGroup": "Platform Center / Security",
        "source": "feature/role-import",
        "target": "main",
        "owner": "park",
        "author": "Park",
        "updatedAt": "1주 전",
        "pipeline": "passed",
        "security": "passed",
        "securityLabel": "Passed",
        "review": "approved",
        "reviewLabel": "승인 완료",
        "approved": 3,
        "required": 3,
        "comments": 9,
        "status": "merged",
        "gates": [
          {
            "type": "approval",
            "icon": "AP",
            "iconTone": "blue",
            "title": "승인자",
            "subtitle": "최소 3명 승인 필요 · 현재 3/3",
            "status": "3/3 승인",
            "tone": "success",
            "items": [
              {
                "title": "Min",
                "desc": "Tech Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Han",
                "desc": "Backend Lead · 필수 승인자",
                "result": "승인",
                "tone": "success"
              },
              {
                "title": "Park",
                "desc": "Security Reviewer · 선택 승인자",
                "result": "확인 완료",
                "tone": "success"
              }
            ]
          },
          {
            "type": "pipeline",
            "icon": "PL",
            "iconTone": "orange",
            "title": "파이프라인",
            "subtitle": "auth-policy-engine · feature/role-import",
            "status": "통과",
            "tone": "success",
            "items": [
              {
                "title": "Build",
                "desc": "dependency-install · compile",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Test",
                "desc": "unit-test · integration-test",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Quality Gate",
                "desc": "coverage · lint · static analysis",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "SC",
            "iconTone": "red",
            "title": "보안 점검",
            "subtitle": "SAST · SCA · Secret Detection · Container Scan",
            "status": "Passed",
            "tone": "success",
            "items": [
              {
                "title": "SAST",
                "desc": "정적 분석 취약점 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "SCA",
                "desc": "오픈소스 취약점 및 라이선스 확인",
                "result": "통과",
                "tone": "success"
              },
              {
                "title": "Secret Detection",
                "desc": "하드코딩된 키/패스워드 검출",
                "result": "통과",
                "tone": "success"
              }
            ]
          },
          {
            "type": "check",
            "icon": "DT",
            "iconTone": "purple",
            "title": "운영 이관",
            "subtitle": "운영 배포 전 사전 점검",
            "status": "준비 완료",
            "tone": "success",
            "items": [
              {
                "title": "변경 영향도",
                "desc": "연계 서비스 및 API 변경 영향 확인",
                "result": "확인 완료",
                "tone": "success"
              },
              {
                "title": "롤백 계획",
                "desc": "문제 발생 시 이전 버전 복구 절차",
                "result": "첨부됨",
                "tone": "success"
              }
            ]
          }
        ],
        "activity": {
          "review": [
            {
              "avatar": "민",
              "tone": "blue",
              "author": "Min",
              "time": "1주 전",
              "stateLabel": "리뷰",
              "comment": "권한 매핑 정책 import 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
            },
            {
              "avatar": "박",
              "tone": "red",
              "author": "Park",
              "time": "10분 전",
              "stateLabel": "보안 검토",
              "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
            }
          ],
          "line": [
            {
              "avatar": "한",
              "tone": "green",
              "author": "Han",
              "file": "src/auth/policy.ts:42",
              "time": "8분 전",
              "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
            }
          ],
          "general": [
            {
              "avatar": "P",
              "tone": "orange",
              "author": "Park",
              "time": "1주 전",
              "comment": "권한 매핑 정책 import MR 생성했습니다. 리뷰 부탁드립니다."
            }
          ],
          "history": [
            {
              "time": "1주 전",
              "title": "MR 생성",
              "desc": "Park가 feature/role-import → main MR을 생성했습니다."
            },
            {
              "time": "방금",
              "title": "상태 업데이트",
              "desc": "Pipeline passed · Security Passed"
            }
          ]
        },
        "meta": [
          "Park 요청",
          "1주 전",
          "댓글 9",
          "커밋 4",
          "변경 파일 6개"
        ],
        "diff": {
          "added": "+258",
          "removed": "-29",
          "files": 6
        }
      }
    ],
    "detail": {
      "id": 128,
      "title": "feat: Update file style.css",
      "summary": "결제 승인 API 예외 케이스 실패 응답 처리 로직 보완",
      "repo": "mobile-banking-api",
      "repoGroup": "Digital Banking / Mobile",
      "source": "feature/payment-exception",
      "target": "develop",
      "owner": "jito",
      "author": "김동현",
      "createdAtText": "2일 전 생성",
      "updatedAt": "23시간 전 마지막 업데이트",
      "updatedAtText": "23시간 전 마지막 업데이트",
      "sourceBranch": "feature/payment-exception",
      "targetBranch": "develop",
      "pipeline": "failed",
      "security": "passed",
      "securityLabel": "Passed",
      "review": "need-review",
      "reviewLabel": "리뷰 필요",
      "approved": 0,
      "required": 1,
      "comments": 8,
      "status": "open",
      "mergeable": false,
      "mergeProgress": 50,
      "tabs": {
        "commitsCount": 3,
        "pipelinesCount": 4,
        "changesAdded": 123,
        "changesRemoved": 123
      },
      "description": [
        "결제 승인 API에서 특정 예외 케이스가 누락되어, 실패 응답 처리 로직을 보완합니다.",
        "결제 승인 API에서 특정 예외 케이스가 누락되어, 실패 응답 처리 로직을 보완합니다.",
        "결제 승인 API에서 특정 예외 케이스가 누락되어, 실패 응답 처리 로직을 보완합니다."
      ],
      "mergeConditions": [
        {
          "id": "pipeline",
          "title": "Pipeline",
          "statusLabel": "Failed",
          "status": "failed",
          "completed": false,
          "summary": "build-test Job에서 오류가 발생했어요.",
          "pipelineId": "#8014"
        },
        {
          "id": "approval",
          "title": "승인",
          "current": 0,
          "required": 1,
          "statusLabel": "승인 1건 필요",
          "status": "required",
          "completed": false
        },
        {
          "id": "security",
          "title": "보안 점검",
          "statusLabel": "Passed",
          "status": "passed",
          "completed": false,
          "vulnerabilities": {
            "critical": 9,
            "high": 4,
            "danger": 6,
            "medium": 8,
            "low": 0,
            "veryLow": 0
          }
        },
        {
          "id": "target-branch",
          "title": "Target Branch 최신 상태",
          "status": "passed",
          "completed": true,
          "rebaseRequired": false
        }
      ],
      "nextSteps": [
        {
          "id": "pipeline-log",
          "text": "실패한 Pipeline #8014를 확인해 주세요.",
          "description": "build-test Job에서 오류가 발생했어요.",
          "actionLabel": "로그 보기"
        },
        {
          "id": "request-approval",
          "text": "리뷰어 1명의 승인이 필요해요.",
          "description": "박승인님에게 승인을 요청할 수 있어요. 승인되면 Merge 조건 1개가 완료돼요.",
          "actionLabel": "승인 요청 보내기"
        }
      ],
      "approvers": [],
      "reviewers": [],
      "project": null,
      "integrations": [],
      "activities": [
        {
          "id": "act-001",
          "type": "merge_request_created",
          "actor": "김동현",
          "text": "김동현님이 Merge Request를 생성했어요.",
          "timeText": "6시간 전"
        },
        {
          "id": "act-002",
          "type": "security",
          "text": "보안 점검 Pipeline이 취약점을 감지했어요.",
          "timeText": "6시간 전",
          "branchName": "branch-name",
          "vulnerabilities": {
            "critical": 9,
            "high": 4,
            "danger": 6,
            "medium": 8,
            "low": 0,
            "veryLow": 0
          }
        },
        {
          "id": "act-003",
          "type": "pipeline",
          "text": "Pipeline {pipelineLabel}이 성공했어요.",
          "pipelineLabel": "pipelineLabel",
          "timeText": "6시간 전"
        },
        {
          "id": "act-004",
          "type": "commit",
          "actor": "김동현",
          "text": "김동현님이 commit 코멘트 {commitSHA}를 작성했어요.",
          "commitSHA": "commitSHA",
          "commentsCount": 13,
          "participantsCount": 8,
          "timeText": "6시간 전"
        },
        {
          "id": "act-005",
          "type": "repository",
          "actor": "김동현",
          "text": "김동현님이 Git 저장소 root-sub-repo를 생성했습니다.",
          "repositoryName": "root-sub-repo",
          "timeText": "6시간 전"
        }
      ],
      "gates": [
        {
          "type": "approval",
          "icon": "AP",
          "iconTone": "blue",
          "title": "승인자",
          "subtitle": "최소 2명 승인 필요 · 현재 1/2",
          "status": "1/2 승인",
          "tone": "warning",
          "items": [
            {
              "title": "Min",
              "desc": "Tech Lead · 필수 승인자",
              "result": "승인",
              "tone": "success"
            },
            {
              "title": "Han",
              "desc": "Backend Lead · 필수 승인자",
              "result": "대기 중",
              "tone": "warning"
            },
            {
              "title": "Park",
              "desc": "Security Reviewer · 선택 승인자",
              "result": "검토 중",
              "tone": "warning"
            }
          ]
        },
        {
          "type": "pipeline",
          "icon": "PL",
          "iconTone": "orange",
          "title": "파이프라인",
          "subtitle": "mobile-banking-api · feature/login-policy",
          "status": "통과",
          "tone": "success",
          "items": [
            {
              "title": "Build",
              "desc": "dependency-install · compile",
              "result": "통과",
              "tone": "success"
            },
            {
              "title": "Test",
              "desc": "unit-test · integration-test",
              "result": "통과",
              "tone": "success"
            },
            {
              "title": "Quality Gate",
              "desc": "coverage · lint · static analysis",
              "result": "통과",
              "tone": "success"
            }
          ]
        },
        {
          "type": "check",
          "icon": "SC",
          "iconTone": "red",
          "title": "보안 점검",
          "subtitle": "SAST · SCA · Secret Detection · Container Scan",
          "status": "확인 필요",
          "tone": "danger",
          "items": [
            {
              "title": "SAST",
              "desc": "정적 분석 취약점 확인",
              "result": "확인 필요",
              "tone": "danger"
            },
            {
              "title": "SCA",
              "desc": "오픈소스 취약점 및 라이선스 확인",
              "result": "확인 필요",
              "tone": "danger"
            },
            {
              "title": "Secret Detection",
              "desc": "하드코딩된 키/패스워드 검출",
              "result": "통과",
              "tone": "success"
            }
          ]
        },
        {
          "type": "check",
          "icon": "DT",
          "iconTone": "purple",
          "title": "운영 이관",
          "subtitle": "운영 배포 전 사전 점검",
          "status": "준비 완료",
          "tone": "success",
          "items": [
            {
              "title": "변경 영향도",
              "desc": "연계 서비스 및 API 변경 영향 확인",
              "result": "확인 완료",
              "tone": "success"
            },
            {
              "title": "롤백 계획",
              "desc": "문제 발생 시 이전 버전 복구 절차",
              "result": "첨부됨",
              "tone": "success"
            }
          ]
        }
      ],
      "activity": {
        "review": [
          {
            "avatar": "민",
            "tone": "blue",
            "author": "Min",
            "time": "20분 전",
            "stateLabel": "리뷰",
            "comment": "인증 정책 응답값 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
          },
          {
            "avatar": "박",
            "tone": "red",
            "author": "Park",
            "time": "10분 전",
            "stateLabel": "보안 검토",
            "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
          }
        ],
        "line": [
          {
            "avatar": "한",
            "tone": "green",
            "author": "Han",
            "file": "src/mobile/policy.ts:42",
            "time": "8분 전",
            "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
          }
        ],
        "general": [
          {
            "avatar": "J",
            "tone": "orange",
            "author": "Jito",
            "time": "20분 전",
            "comment": "인증 정책 응답값 개선 MR 생성했습니다. 리뷰 부탁드립니다."
          }
        ],
        "history": [
          {
            "time": "20분 전",
            "title": "MR 생성",
            "desc": "Jito가 feature/login-policy → develop MR을 생성했습니다."
          },
          {
            "time": "방금",
            "title": "상태 업데이트",
            "desc": "Pipeline passed · Security 확인 필요"
          }
        ]
      },
      "meta": [
        "Jito 요청",
        "20분 전",
        "댓글 8",
        "커밋 4",
        "변경 파일 6개"
      ],
      "diff": {
        "added": "+166",
        "removed": "-47",
        "files": 5
      }
    }
  },
  "pipelines": {
    "list": [
      {
        "id": "2847502411",
        "updatedAt": "10분 전",
        "title": "고객 포털 인증 배너 개선 배포 검증",
        "repo": "customer-web-portal",
        "repoGroup": "Digital Banking / Web",
        "branch": "feature/auth-banner",
        "target": "develop",
        "author": "Min",
        "commit": "c2b8e129",
        "status": "failed",
        "result": "failed",
        "trigger": "Merge Request",
        "jobs": [
          "manual",
          "passed",
          "passed",
          "failed",
          "failed",
          "pending",
          "skipped",
          "created"
        ],
        "mrId": 129,
        "description": "고객 포털 인증 배너 개선 MR의 배포 전 Pipeline 실행 결과입니다.",
        "meta": [
          {
            "label": "Failed",
            "tone": "red"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "merge request",
            "tone": "blue"
          },
          {
            "label": "작성자 Min"
          },
          {
            "label": "10분 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/auth-banner"
          },
          {
            "label": "Commit",
            "value": "c2b8e129"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "2",
            "note": "실패 Job 확인 필요",
            "tone": "danger"
          },
          {
            "label": "Completed Jobs",
            "value": "7",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "failed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "failed"
              },
              {
                "name": "contract-test",
                "status": "failed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502401",
        "updatedAt": "15분 전",
        "title": "고객 포털 인증 배너 개선 검증",
        "repo": "customer-web-portal",
        "repoGroup": "Digital Banking / Web",
        "branch": "feature/auth-banner",
        "target": "develop",
        "author": "Min",
        "commit": "a91f2c31",
        "status": "failed",
        "result": "failed",
        "trigger": "Push",
        "jobs": [
          "manual",
          "passed",
          "passed",
          "failed",
          "failed",
          "pending",
          "skipped",
          "created"
        ],
        "mrId": 129,
        "description": "고객 포털 인증 배너 개선 MR의 Pipeline 실행 결과입니다.",
        "meta": [
          {
            "label": "Failed",
            "tone": "red"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Min"
          },
          {
            "label": "2시간 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/account-cache"
          },
          {
            "label": "Commit",
            "value": "b71c2f09"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "2",
            "note": "실패 Job 확인 필요",
            "tone": "danger"
          },
          {
            "label": "Completed Jobs",
            "value": "7",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "failed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "failed"
              },
              {
                "name": "contract-test",
                "status": "failed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502395",
        "updatedAt": "20분 전",
        "title": "인증 정책 응답값 개선 Pipeline",
        "repo": "mobile-banking-api",
        "repoGroup": "Digital Banking / Mobile",
        "branch": "feature/login-policy",
        "target": "develop",
        "author": "Jito",
        "commit": "7e14d754",
        "status": "failed",
        "result": "failed",
        "trigger": "Push",
        "jobs": [
          "manual",
          "passed",
          "passed",
          "failed",
          "failed",
          "pending",
          "skipped",
          "created"
        ],
        "mrId": 128,
        "description": "인증 정책 응답값 개선 Pipeline 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Failed",
            "tone": "red"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Jito"
          },
          {
            "label": "20분 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/login-policy"
          },
          {
            "label": "Commit",
            "value": "7e14d754"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "2",
            "note": "실패 Job 확인 필요",
            "tone": "danger"
          },
          {
            "label": "Completed Jobs",
            "value": "7",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "failed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "failed"
              },
              {
                "name": "contract-test",
                "status": "failed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502388",
        "updatedAt": "45분 전",
        "title": "계좌 이체 한도 정책 검증",
        "repo": "account-limit-service",
        "repoGroup": "Digital Banking / Core API",
        "branch": "feature/transfer-limit",
        "target": "develop",
        "author": "Kang",
        "commit": "3c96a12b",
        "status": "failed",
        "result": "failed",
        "trigger": "Push",
        "jobs": [
          "manual",
          "passed",
          "passed",
          "failed",
          "failed",
          "pending",
          "skipped",
          "created"
        ],
        "mrId": 127,
        "description": "계좌 이체 한도 정책 검증 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Failed",
            "tone": "red"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Kang"
          },
          {
            "label": "45분 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/transfer-limit"
          },
          {
            "label": "Commit",
            "value": "3c96a12b"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "2",
            "note": "실패 Job 확인 필요",
            "tone": "danger"
          },
          {
            "label": "Completed Jobs",
            "value": "7",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "failed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "failed"
              },
              {
                "name": "contract-test",
                "status": "failed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502374",
        "updatedAt": "2시간 전",
        "title": "계좌 목록 캐싱 개선 검증",
        "repo": "customer-web-portal",
        "repoGroup": "Digital Banking / Web",
        "branch": "feature/account-cache",
        "target": "develop",
        "author": "Min",
        "commit": "b71c2f09",
        "status": "failed",
        "result": "failed",
        "trigger": "Branch",
        "jobs": [
          "manual",
          "passed",
          "passed",
          "failed",
          "failed",
          "pending",
          "skipped",
          "created"
        ],
        "mrId": 126,
        "description": "계좌 목록 캐싱 개선 검증 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Failed",
            "tone": "red"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Min"
          },
          {
            "label": "2시간 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/account-cache"
          },
          {
            "label": "Commit",
            "value": "b71c2f09"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "2",
            "note": "실패 Job 확인 필요",
            "tone": "danger"
          },
          {
            "label": "Completed Jobs",
            "value": "7",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "failed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "failed"
              },
              {
                "name": "contract-test",
                "status": "failed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502369",
        "updatedAt": "3시간 전",
        "title": "알림 템플릿 변수 표준화",
        "repo": "notification-gateway",
        "repoGroup": "Platform Center / Messaging",
        "branch": "feature/template-vars",
        "target": "develop",
        "author": "Yoon",
        "commit": "c41a79ee",
        "status": "running",
        "result": "running",
        "trigger": "Push",
        "jobs": [
          "manual",
          "running",
          "passed",
          "pending",
          "created",
          "created",
          "skipped",
          "created"
        ],
        "mrId": 125,
        "description": "알림 템플릿 변수 표준화 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Running",
            "tone": "orange"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Yoon"
          },
          {
            "label": "3시간 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/template-vars"
          },
          {
            "label": "Commit",
            "value": "c41a79ee"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "0",
            "note": "실패 Job 확인 필요",
            "tone": ""
          },
          {
            "label": "Completed Jobs",
            "value": "4",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "running",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "running"
              }
            ]
          },
          {
            "name": "test",
            "status": "pending",
            "jobs": [
              {
                "name": "unit-test",
                "status": "passed"
              },
              {
                "name": "contract-test",
                "status": "pending"
              },
              {
                "name": "integration-test",
                "status": "created"
              }
            ]
          },
          {
            "name": "security",
            "status": "pending",
            "jobs": [
              {
                "name": "sast",
                "status": "pending"
              },
              {
                "name": "sca",
                "status": "created"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502362",
        "updatedAt": "5시간 전",
        "title": "관리자 정책 검색 개선",
        "repo": "admin-console-ui",
        "repoGroup": "Platform Center / Admin",
        "branch": "feature/policy-search",
        "target": "develop",
        "author": "Lim",
        "commit": "e0d1ab42",
        "status": "finished",
        "result": "passed",
        "trigger": "Manual",
        "jobs": [
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed"
        ],
        "mrId": 124,
        "description": "관리자 정책 검색 개선 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Passed",
            "tone": "green"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Lim"
          },
          {
            "label": "5시간 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/policy-search"
          },
          {
            "label": "Commit",
            "value": "e0d1ab42"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "0",
            "note": "실패 Job 확인 필요",
            "tone": ""
          },
          {
            "label": "Completed Jobs",
            "value": "9",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "passed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "passed"
              },
              {
                "name": "contract-test",
                "status": "passed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502355",
        "updatedAt": "6시간 전",
        "title": "Auth policy rule matcher",
        "repo": "auth-policy-engine",
        "repoGroup": "Platform Center / Security",
        "branch": "feature/rule-matcher",
        "target": "develop",
        "author": "Park",
        "commit": "a82f4c1",
        "status": "failed",
        "result": "failed",
        "trigger": "Push",
        "jobs": [
          "manual",
          "passed",
          "passed",
          "failed",
          "failed",
          "pending",
          "skipped",
          "created"
        ],
        "mrId": 123,
        "description": "Auth policy rule matcher 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Failed",
            "tone": "red"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Park"
          },
          {
            "label": "6시간 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/rule-matcher"
          },
          {
            "label": "Commit",
            "value": "a82f4c1"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "3",
            "note": "실패 Job 확인 필요",
            "tone": "danger"
          },
          {
            "label": "Completed Jobs",
            "value": "6",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "failed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "failed"
              },
              {
                "name": "contract-test",
                "status": "failed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "failed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "failed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502344",
        "updatedAt": "어제",
        "title": "대출 상태 카드 개선",
        "repo": "loan-screen-web",
        "repoGroup": "Digital Banking / Loan",
        "branch": "feature/loan-status-card",
        "target": "develop",
        "author": "Seo",
        "commit": "9c21d0e",
        "status": "finished",
        "result": "passed",
        "trigger": "Push",
        "jobs": [
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed"
        ],
        "mrId": 122,
        "description": "대출 상태 카드 개선 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Passed",
            "tone": "green"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Seo"
          },
          {
            "label": "어제 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/loan-status-card"
          },
          {
            "label": "Commit",
            "value": "9c21d0e"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "0",
            "note": "실패 Job 확인 필요",
            "tone": ""
          },
          {
            "label": "Completed Jobs",
            "value": "9",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "passed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "passed"
              },
              {
                "name": "contract-test",
                "status": "passed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502333",
        "updatedAt": "어제",
        "title": "로그인 실패 메시지 정리",
        "repo": "mobile-banking-api",
        "repoGroup": "Digital Banking / Mobile",
        "branch": "fix/login-message",
        "target": "main",
        "author": "Han",
        "commit": "d31e92a",
        "status": "finished",
        "result": "passed",
        "trigger": "Merge Request",
        "jobs": [
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed"
        ],
        "mrId": 121,
        "description": "로그인 실패 메시지 정리 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Passed",
            "tone": "green"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Han"
          },
          {
            "label": "어제 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "fix/login-message"
          },
          {
            "label": "Commit",
            "value": "d31e92a"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "0",
            "note": "실패 Job 확인 필요",
            "tone": ""
          },
          {
            "label": "Completed Jobs",
            "value": "9",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "passed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "passed"
              },
              {
                "name": "contract-test",
                "status": "passed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502321",
        "updatedAt": "2일 전",
        "title": "정산 배치 재시도 정책",
        "repo": "settlement-batch",
        "repoGroup": "Digital Banking / Batch",
        "branch": "feature/retry-policy",
        "target": "main",
        "author": "Choi",
        "commit": "f40b91c",
        "status": "finished",
        "result": "passed",
        "trigger": "Schedule",
        "jobs": [
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed"
        ],
        "mrId": 120,
        "description": "정산 배치 재시도 정책 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Passed",
            "tone": "green"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Choi"
          },
          {
            "label": "2일 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/retry-policy"
          },
          {
            "label": "Commit",
            "value": "f40b91c"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "0",
            "note": "실패 Job 확인 필요",
            "tone": ""
          },
          {
            "label": "Completed Jobs",
            "value": "9",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "passed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "passed"
              },
              {
                "name": "contract-test",
                "status": "passed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502310",
        "updatedAt": "2일 전",
        "title": "감사 로그 내보내기 포맷",
        "repo": "compliance-exporter",
        "repoGroup": "Platform Center / Audit",
        "branch": "feature/audit-export",
        "target": "develop",
        "author": "Baek",
        "commit": "5a77c90",
        "status": "running",
        "result": "running",
        "trigger": "Manual",
        "jobs": [
          "manual",
          "running",
          "passed",
          "pending",
          "created",
          "created",
          "skipped",
          "created"
        ],
        "mrId": 119,
        "description": "감사 로그 내보내기 포맷 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Running",
            "tone": "orange"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Baek"
          },
          {
            "label": "2일 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/audit-export"
          },
          {
            "label": "Commit",
            "value": "5a77c90"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "0",
            "note": "실패 Job 확인 필요",
            "tone": ""
          },
          {
            "label": "Completed Jobs",
            "value": "4",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "running",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "running"
              }
            ]
          },
          {
            "name": "test",
            "status": "pending",
            "jobs": [
              {
                "name": "unit-test",
                "status": "passed"
              },
              {
                "name": "contract-test",
                "status": "pending"
              },
              {
                "name": "integration-test",
                "status": "created"
              }
            ]
          },
          {
            "name": "security",
            "status": "pending",
            "jobs": [
              {
                "name": "sast",
                "status": "pending"
              },
              {
                "name": "sca",
                "status": "created"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502302",
        "updatedAt": "3일 전",
        "title": "외부 인증 모듈 교체",
        "repo": "partner-payment-sdk",
        "repoGroup": "Partner Workspace",
        "branch": "feature/external-auth",
        "target": "develop",
        "author": "Partner Dev",
        "commit": "8b21dd0",
        "status": "finished",
        "result": "canceled",
        "trigger": "Manual",
        "jobs": [
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed"
        ],
        "mrId": 118,
        "description": "외부 인증 모듈 교체 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Canceled",
            "tone": ""
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Partner Dev"
          },
          {
            "label": "3일 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/external-auth"
          },
          {
            "label": "Commit",
            "value": "8b21dd0"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "0",
            "note": "실패 Job 확인 필요",
            "tone": ""
          },
          {
            "label": "Completed Jobs",
            "value": "9",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "passed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "passed"
              },
              {
                "name": "contract-test",
                "status": "passed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      },
      {
        "id": "2847502299",
        "updatedAt": "3일 전",
        "title": "모바일 약관 API 응답 축소",
        "repo": "mobile-banking-api",
        "repoGroup": "Digital Banking / Mobile",
        "branch": "feature/terms-response",
        "target": "develop",
        "author": "Jito",
        "commit": "a1b2c3d",
        "status": "finished",
        "result": "passed",
        "trigger": "Push",
        "jobs": [
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed",
          "passed"
        ],
        "mrId": 117,
        "description": "모바일 약관 API 응답 축소 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
        "meta": [
          {
            "label": "Passed",
            "tone": "green"
          },
          {
            "label": "latest",
            "tone": "green"
          },
          {
            "label": "branch",
            "tone": "blue"
          },
          {
            "label": "작성자 Jito"
          },
          {
            "label": "3일 전 생성"
          }
        ],
        "refs": [
          {
            "label": "Branch",
            "value": "feature/terms-response"
          },
          {
            "label": "Commit",
            "value": "a1b2c3d"
          }
        ],
        "summary": [
          {
            "label": "Pipeline 총 실행 시간",
            "value": "04:22",
            "note": "생성부터 종료까지"
          },
          {
            "label": "실제 실행 시간",
            "value": "03:48",
            "note": "Runner 실행 기준"
          },
          {
            "label": "Failed Jobs",
            "value": "0",
            "note": "실패 Job 확인 필요",
            "tone": ""
          },
          {
            "label": "Completed Jobs",
            "value": "9",
            "note": "성공 또는 종료됨"
          }
        ],
        "stages": [
          {
            "name": "prepare",
            "status": "passed",
            "jobs": [
              {
                "name": "checkout",
                "status": "passed"
              },
              {
                "name": "install-dependencies",
                "status": "passed"
              }
            ]
          },
          {
            "name": "build",
            "status": "passed",
            "jobs": [
              {
                "name": "build-api",
                "status": "passed"
              },
              {
                "name": "build-assets",
                "status": "passed"
              }
            ]
          },
          {
            "name": "test",
            "status": "passed",
            "jobs": [
              {
                "name": "unit-test",
                "status": "passed"
              },
              {
                "name": "contract-test",
                "status": "passed"
              },
              {
                "name": "integration-test",
                "status": "passed"
              }
            ]
          },
          {
            "name": "security",
            "status": "passed",
            "jobs": [
              {
                "name": "sast",
                "status": "passed"
              },
              {
                "name": "sca",
                "status": "passed"
              }
            ]
          }
        ]
      }
    ],
    "detail": {
      "id": "2847502395",
      "updatedAt": "20분 전",
      "title": "인증 정책 응답값 개선 Pipeline",
      "repo": "mobile-banking-api",
      "repoGroup": "Digital Banking / Mobile",
      "branch": "feature/login-policy",
      "target": "develop",
      "author": "Jito",
      "commit": "7e14d754",
      "status": "failed",
      "result": "failed",
      "trigger": "Push",
      "jobs": [
        "manual",
        "passed",
        "passed",
        "failed",
        "failed",
        "pending",
        "skipped",
        "created"
      ],
      "mrId": 128,
      "description": "인증 정책 응답값 개선 Pipeline 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
      "meta": [
        {
          "label": "Failed",
          "tone": "red"
        },
        {
          "label": "latest",
          "tone": "green"
        },
        {
          "label": "branch",
          "tone": "blue"
        },
        {
          "label": "작성자 Jito"
        },
        {
          "label": "20분 전 생성"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/login-policy"
        },
        {
          "label": "Commit",
          "value": "7e14d754"
        }
      ],
      "summary": [
        {
          "label": "Pipeline 총 실행 시간",
          "value": "04:22",
          "note": "생성부터 종료까지"
        },
        {
          "label": "실제 실행 시간",
          "value": "03:48",
          "note": "Runner 실행 기준"
        },
        {
          "label": "Failed Jobs",
          "value": "2",
          "note": "실패 Job 확인 필요",
          "tone": "danger"
        },
        {
          "label": "Completed Jobs",
          "value": "7",
          "note": "성공 또는 종료됨"
        }
      ],
      "stages": [
        {
          "name": "prepare",
          "status": "passed",
          "jobs": [
            {
              "name": "checkout",
              "status": "passed"
            },
            {
              "name": "install-dependencies",
              "status": "passed"
            }
          ]
        },
        {
          "name": "build",
          "status": "passed",
          "jobs": [
            {
              "name": "build-api",
              "status": "passed"
            },
            {
              "name": "build-assets",
              "status": "passed"
            }
          ]
        },
        {
          "name": "test",
          "status": "failed",
          "jobs": [
            {
              "name": "unit-test",
              "status": "failed"
            },
            {
              "name": "contract-test",
              "status": "failed"
            },
            {
              "name": "integration-test",
              "status": "passed"
            }
          ]
        },
        {
          "name": "security",
          "status": "passed",
          "jobs": [
            {
              "name": "sast",
              "status": "passed"
            },
            {
              "name": "sca",
              "status": "passed"
            }
          ]
        }
      ]
    }
  },
  "jobs": [
    {
      "id": "2847502395",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502395",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502395",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502395",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502395",
      "name": "unit-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for mobile-banking-api",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502395",
      "name": "contract-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for mobile-banking-api",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502395",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502395",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502395",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502388",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for account-limit-service",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502388",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for account-limit-service",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502388",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for account-limit-service",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502388",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for account-limit-service",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502388",
      "name": "unit-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for account-limit-service",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502388",
      "name": "contract-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for account-limit-service",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502388",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for account-limit-service",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502388",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for account-limit-service",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502388",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "45분 전",
      "pipelineId": "2847502388",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for account-limit-service",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502374",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for customer-web-portal",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502374",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for customer-web-portal",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502374",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for customer-web-portal",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502374",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for customer-web-portal",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502374",
      "name": "unit-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for customer-web-portal",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502374",
      "name": "contract-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for customer-web-portal",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502374",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for customer-web-portal",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502374",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for customer-web-portal",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502374",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2시간 전",
      "pipelineId": "2847502374",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for customer-web-portal",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "build-assets",
      "stage": "build",
      "status": "running",
      "statusLabel": "Running",
      "tone": "orange",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "contract-test",
      "stage": "test",
      "status": "pending",
      "statusLabel": "Pending",
      "tone": "orange",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "integration-test",
      "stage": "test",
      "status": "created",
      "statusLabel": "Created",
      "tone": "",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "sast",
      "stage": "security",
      "status": "pending",
      "statusLabel": "Pending",
      "tone": "orange",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502369",
      "name": "sca",
      "stage": "security",
      "status": "created",
      "statusLabel": "Created",
      "tone": "",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3시간 전",
      "pipelineId": "2847502369",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for notification-gateway",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "contract-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502362",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "5시간 전",
      "pipelineId": "2847502362",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for admin-console-ui",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502355",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for auth-policy-engine",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502355",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for auth-policy-engine",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502355",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for auth-policy-engine",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502355",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for auth-policy-engine",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502355",
      "name": "unit-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for auth-policy-engine",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502355",
      "name": "contract-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for auth-policy-engine",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502355",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for auth-policy-engine",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502355",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for auth-policy-engine",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502355",
      "name": "sca",
      "stage": "security",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:54",
      "runner": "runner-secure-02",
      "startedAt": "6시간 전",
      "pipelineId": "2847502355",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for auth-policy-engine",
        "✓ environment prepared",
        "✕ assertion failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502344",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502344",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502344",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502344",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502344",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502344",
      "name": "contract-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502344",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502344",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502344",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502344",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for loan-screen-web",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "contract-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502333",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "어제",
      "pipelineId": "2847502333",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "contract-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502321",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502321",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for settlement-batch",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "build-assets",
      "stage": "build",
      "status": "running",
      "statusLabel": "Running",
      "tone": "orange",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "contract-test",
      "stage": "test",
      "status": "pending",
      "statusLabel": "Pending",
      "tone": "orange",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "integration-test",
      "stage": "test",
      "status": "created",
      "statusLabel": "Created",
      "tone": "",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "sast",
      "stage": "security",
      "status": "pending",
      "statusLabel": "Pending",
      "tone": "orange",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502310",
      "name": "sca",
      "stage": "security",
      "status": "created",
      "statusLabel": "Created",
      "tone": "",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "2일 전",
      "pipelineId": "2847502310",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for compliance-exporter",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "contract-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502302",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502302",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for partner-payment-sdk",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "build-api",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run build-api",
        "Running build-api for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "build-assets",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run build-assets",
        "Running build-assets for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "contract-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "integration-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run integration-test",
        "Running integration-test for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "sast",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run sast",
        "Running sast for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502299",
      "name": "sca",
      "stage": "security",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "3일 전",
      "pipelineId": "2847502299",
      "log": [
        "$ npm ci",
        "$ npm run sca",
        "Running sca for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502411-checkout",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:24",
      "runner": "runner-web-01",
      "startedAt": "10분 전",
      "finishedAt": "방금",
      "pipelineId": "2847502411",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for customer-web-portal",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502411-install-dependencies",
      "name": "install-dependencies",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:46",
      "runner": "runner-web-01",
      "startedAt": "10분 전",
      "finishedAt": "방금",
      "pipelineId": "2847502411",
      "log": [
        "$ npm ci",
        "$ npm run install-dependencies",
        "Running install-dependencies for customer-web-portal",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502411-build-web",
      "name": "build-web",
      "stage": "build",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "01:12",
      "runner": "runner-web-01",
      "startedAt": "10분 전",
      "finishedAt": "방금",
      "pipelineId": "2847502411",
      "log": [
        "$ npm ci",
        "$ npm run build-web",
        "Running build-web for customer-web-portal",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502411-unit-test",
      "name": "unit-test",
      "stage": "test",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "01:08",
      "runner": "runner-web-01",
      "startedAt": "10분 전",
      "finishedAt": "방금",
      "pipelineId": "2847502411",
      "log": [
        "$ npm ci",
        "$ npm run unit-test",
        "Running unit-test for customer-web-portal",
        "✓ job completed",
        "Job succeeded"
      ]
    },
    {
      "id": "2847502411-contract-test",
      "name": "contract-test",
      "stage": "test",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:55",
      "runner": "runner-web-01",
      "startedAt": "10분 전",
      "finishedAt": "방금",
      "pipelineId": "2847502411",
      "log": [
        "$ npm ci",
        "$ npm run contract-test",
        "Running contract-test for customer-web-portal",
        "✕ job failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502411-security-scan",
      "name": "security-scan",
      "stage": "security",
      "status": "failed",
      "statusLabel": "Failed",
      "tone": "red",
      "duration": "00:48",
      "runner": "runner-web-01",
      "startedAt": "10분 전",
      "finishedAt": "방금",
      "pipelineId": "2847502411",
      "log": [
        "$ npm ci",
        "$ npm run security-scan",
        "Running security-scan for customer-web-portal",
        "✕ job failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502411-quality-gate",
      "name": "quality-gate",
      "stage": "quality-gate",
      "status": "blocked",
      "statusLabel": "Blocked",
      "tone": "red",
      "duration": "00:05",
      "runner": "runner-web-01",
      "startedAt": "10분 전",
      "finishedAt": "방금",
      "pipelineId": "2847502411",
      "log": [
        "$ npm ci",
        "$ npm run quality-gate",
        "Running quality-gate for customer-web-portal",
        "✕ job failed",
        "Job failed with exit code 1"
      ]
    },
    {
      "id": "2847502411-deploy-preview",
      "name": "deploy-preview",
      "stage": "deploy",
      "status": "pending",
      "statusLabel": "Pending",
      "tone": "orange",
      "duration": "-",
      "runner": "runner-web-01",
      "startedAt": "10분 전",
      "finishedAt": "-",
      "pipelineId": "2847502411",
      "log": [
        "$ npm ci",
        "$ npm run deploy-preview",
        "Running deploy-preview for customer-web-portal",
        "Job pending",
        "Waiting for runner"
      ]
    }
  ],
  "commits": [
    {
      "id": "c2b8e129",
      "sha": "c2b8e129",
      "repositoryId": "customer-web-portal",
      "title": "고객 포털 인증 배너 개선 배포 검증",
      "description": "인증 안내 배너와 만료 상태 표시 변경 사항입니다.",
      "author": "Min",
      "createdAt": "10분 전",
      "added": 98,
      "removed": 21,
      "branch": "feature/auth-banner",
      "mrId": 129,
      "meta": [
        {
          "label": "c2b8e129",
          "tone": "blue"
        },
        {
          "label": "작성자 Min"
        },
        {
          "label": "10분 전"
        },
        {
          "label": "+98 / -21"
        }
      ],
      "refs": []
    },
    {
      "id": "7e14d754",
      "sha": "7e14d754",
      "repositoryId": "mobile-banking-api",
      "title": "인증 정책 응답값 개선 Pipeline",
      "description": "인증 정책 응답값 개선 Pipeline 관련 변경 사항입니다.",
      "author": "Jito",
      "createdAt": "20분 전",
      "added": 120,
      "removed": 20,
      "branch": "feature/login-policy",
      "mrId": 128,
      "meta": [
        {
          "label": "7e14d754",
          "tone": "blue"
        },
        {
          "label": "작성자 Jito"
        },
        {
          "label": "20분 전"
        },
        {
          "label": "+120 / -20"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/login-policy",
          "href": "./repository-detail.html?id=mobile-banking-api#branches"
        },
        {
          "label": "MR",
          "value": "#128",
          "href": "./mr-detail.html?id=128"
        },
        {
          "label": "Pipeline",
          "value": "#2847502395",
          "href": "./pipeline-detail.html?id=2847502395"
        }
      ]
    },
    {
      "id": "3c96a12b",
      "sha": "3c96a12b",
      "repositoryId": "account-limit-service",
      "title": "계좌 이체 한도 정책 검증",
      "description": "계좌 이체 한도 정책 검증 관련 변경 사항입니다.",
      "author": "Kang",
      "createdAt": "45분 전",
      "added": 127,
      "removed": 23,
      "branch": "feature/transfer-limit",
      "mrId": 127,
      "meta": [
        {
          "label": "3c96a12b",
          "tone": "blue"
        },
        {
          "label": "작성자 Kang"
        },
        {
          "label": "45분 전"
        },
        {
          "label": "+127 / -23"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/transfer-limit",
          "href": "./repository-detail.html?id=account-limit-service#branches"
        },
        {
          "label": "MR",
          "value": "#127",
          "href": "./mr-detail.html?id=127"
        },
        {
          "label": "Pipeline",
          "value": "#2847502388",
          "href": "./pipeline-detail.html?id=2847502388"
        }
      ]
    },
    {
      "id": "b71c2f09",
      "sha": "b71c2f09",
      "repositoryId": "customer-web-portal",
      "title": "계좌 목록 캐싱 개선 검증",
      "description": "계좌 목록 캐싱 개선 검증 관련 변경 사항입니다.",
      "author": "Min",
      "createdAt": "2시간 전",
      "added": 134,
      "removed": 26,
      "branch": "feature/account-cache",
      "mrId": 126,
      "meta": [
        {
          "label": "b71c2f09",
          "tone": "blue"
        },
        {
          "label": "작성자 Min"
        },
        {
          "label": "2시간 전"
        },
        {
          "label": "+134 / -26"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/account-cache",
          "href": "./repository-detail.html?id=customer-web-portal#branches"
        },
        {
          "label": "MR",
          "value": "#126",
          "href": "./mr-detail.html?id=126"
        },
        {
          "label": "Pipeline",
          "value": "#2847502374",
          "href": "./pipeline-detail.html?id=2847502374"
        }
      ]
    },
    {
      "id": "c41a79ee",
      "sha": "c41a79ee",
      "repositoryId": "notification-gateway",
      "title": "알림 템플릿 변수 표준화",
      "description": "알림 템플릿 변수 표준화 관련 변경 사항입니다.",
      "author": "Yoon",
      "createdAt": "3시간 전",
      "added": 141,
      "removed": 29,
      "branch": "feature/template-vars",
      "mrId": 125,
      "meta": [
        {
          "label": "c41a79ee",
          "tone": "blue"
        },
        {
          "label": "작성자 Yoon"
        },
        {
          "label": "3시간 전"
        },
        {
          "label": "+141 / -29"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/template-vars",
          "href": "./repository-detail.html?id=notification-gateway#branches"
        },
        {
          "label": "MR",
          "value": "#125",
          "href": "./mr-detail.html?id=125"
        },
        {
          "label": "Pipeline",
          "value": "#2847502369",
          "href": "./pipeline-detail.html?id=2847502369"
        }
      ]
    },
    {
      "id": "e0d1ab42",
      "sha": "e0d1ab42",
      "repositoryId": "admin-console-ui",
      "title": "관리자 정책 검색 개선",
      "description": "관리자 정책 검색 개선 관련 변경 사항입니다.",
      "author": "Lim",
      "createdAt": "5시간 전",
      "added": 148,
      "removed": 32,
      "branch": "feature/policy-search",
      "mrId": 124,
      "meta": [
        {
          "label": "e0d1ab42",
          "tone": "blue"
        },
        {
          "label": "작성자 Lim"
        },
        {
          "label": "5시간 전"
        },
        {
          "label": "+148 / -32"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/policy-search",
          "href": "./repository-detail.html?id=admin-console-ui#branches"
        },
        {
          "label": "MR",
          "value": "#124",
          "href": "./mr-detail.html?id=124"
        },
        {
          "label": "Pipeline",
          "value": "#2847502362",
          "href": "./pipeline-detail.html?id=2847502362"
        }
      ]
    },
    {
      "id": "a82f4c1",
      "sha": "a82f4c1",
      "repositoryId": "auth-policy-engine",
      "title": "Auth policy rule matcher",
      "description": "Auth policy rule matcher 관련 변경 사항입니다.",
      "author": "Park",
      "createdAt": "6시간 전",
      "added": 155,
      "removed": 35,
      "branch": "feature/rule-matcher",
      "mrId": 123,
      "meta": [
        {
          "label": "a82f4c1",
          "tone": "blue"
        },
        {
          "label": "작성자 Park"
        },
        {
          "label": "6시간 전"
        },
        {
          "label": "+155 / -35"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/rule-matcher",
          "href": "./repository-detail.html?id=auth-policy-engine#branches"
        },
        {
          "label": "MR",
          "value": "#123",
          "href": "./mr-detail.html?id=123"
        },
        {
          "label": "Pipeline",
          "value": "#2847502355",
          "href": "./pipeline-detail.html?id=2847502355"
        }
      ]
    },
    {
      "id": "9c21d0e",
      "sha": "9c21d0e",
      "repositoryId": "loan-screen-web",
      "title": "대출 상태 카드 개선",
      "description": "대출 상태 카드 개선 관련 변경 사항입니다.",
      "author": "Seo",
      "createdAt": "어제",
      "added": 162,
      "removed": 38,
      "branch": "feature/loan-status-card",
      "mrId": 122,
      "meta": [
        {
          "label": "9c21d0e",
          "tone": "blue"
        },
        {
          "label": "작성자 Seo"
        },
        {
          "label": "어제"
        },
        {
          "label": "+162 / -38"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/loan-status-card",
          "href": "./repository-detail.html?id=loan-screen-web#branches"
        },
        {
          "label": "MR",
          "value": "#122",
          "href": "./mr-detail.html?id=122"
        },
        {
          "label": "Pipeline",
          "value": "#2847502344",
          "href": "./pipeline-detail.html?id=2847502344"
        }
      ]
    },
    {
      "id": "d31e92a",
      "sha": "d31e92a",
      "repositoryId": "mobile-banking-api",
      "title": "로그인 실패 메시지 정리",
      "description": "로그인 실패 메시지 정리 관련 변경 사항입니다.",
      "author": "Han",
      "createdAt": "어제",
      "added": 169,
      "removed": 41,
      "branch": "fix/login-message",
      "mrId": 121,
      "meta": [
        {
          "label": "d31e92a",
          "tone": "blue"
        },
        {
          "label": "작성자 Han"
        },
        {
          "label": "어제"
        },
        {
          "label": "+169 / -41"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "fix/login-message",
          "href": "./repository-detail.html?id=mobile-banking-api#branches"
        },
        {
          "label": "MR",
          "value": "#121",
          "href": "./mr-detail.html?id=121"
        },
        {
          "label": "Pipeline",
          "value": "#2847502333",
          "href": "./pipeline-detail.html?id=2847502333"
        }
      ]
    },
    {
      "id": "f40b91c",
      "sha": "f40b91c",
      "repositoryId": "settlement-batch",
      "title": "정산 배치 재시도 정책",
      "description": "정산 배치 재시도 정책 관련 변경 사항입니다.",
      "author": "Choi",
      "createdAt": "2일 전",
      "added": 176,
      "removed": 44,
      "branch": "feature/retry-policy",
      "mrId": 120,
      "meta": [
        {
          "label": "f40b91c",
          "tone": "blue"
        },
        {
          "label": "작성자 Choi"
        },
        {
          "label": "2일 전"
        },
        {
          "label": "+176 / -44"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/retry-policy",
          "href": "./repository-detail.html?id=settlement-batch#branches"
        },
        {
          "label": "MR",
          "value": "#120",
          "href": "./mr-detail.html?id=120"
        },
        {
          "label": "Pipeline",
          "value": "#2847502321",
          "href": "./pipeline-detail.html?id=2847502321"
        }
      ]
    },
    {
      "id": "5a77c90",
      "sha": "5a77c90",
      "repositoryId": "compliance-exporter",
      "title": "감사 로그 내보내기 포맷",
      "description": "감사 로그 내보내기 포맷 관련 변경 사항입니다.",
      "author": "Baek",
      "createdAt": "2일 전",
      "added": 183,
      "removed": 47,
      "branch": "feature/audit-export",
      "mrId": 119,
      "meta": [
        {
          "label": "5a77c90",
          "tone": "blue"
        },
        {
          "label": "작성자 Baek"
        },
        {
          "label": "2일 전"
        },
        {
          "label": "+183 / -47"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/audit-export",
          "href": "./repository-detail.html?id=compliance-exporter#branches"
        },
        {
          "label": "MR",
          "value": "#119",
          "href": "./mr-detail.html?id=119"
        },
        {
          "label": "Pipeline",
          "value": "#2847502310",
          "href": "./pipeline-detail.html?id=2847502310"
        }
      ]
    },
    {
      "id": "8b21dd0",
      "sha": "8b21dd0",
      "repositoryId": "partner-payment-sdk",
      "title": "외부 인증 모듈 교체",
      "description": "외부 인증 모듈 교체 관련 변경 사항입니다.",
      "author": "Partner Dev",
      "createdAt": "3일 전",
      "added": 190,
      "removed": 50,
      "branch": "feature/external-auth",
      "mrId": 118,
      "meta": [
        {
          "label": "8b21dd0",
          "tone": "blue"
        },
        {
          "label": "작성자 Partner Dev"
        },
        {
          "label": "3일 전"
        },
        {
          "label": "+190 / -50"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/external-auth",
          "href": "./repository-detail.html?id=partner-payment-sdk#branches"
        },
        {
          "label": "MR",
          "value": "#118",
          "href": "./mr-detail.html?id=118"
        },
        {
          "label": "Pipeline",
          "value": "#2847502302",
          "href": "./pipeline-detail.html?id=2847502302"
        }
      ]
    },
    {
      "id": "a1b2c3d",
      "sha": "a1b2c3d",
      "repositoryId": "mobile-banking-api",
      "title": "모바일 약관 API 응답 축소",
      "description": "모바일 약관 API 응답 축소 관련 변경 사항입니다.",
      "author": "Jito",
      "createdAt": "3일 전",
      "added": 197,
      "removed": 53,
      "branch": "feature/terms-response",
      "mrId": 117,
      "meta": [
        {
          "label": "a1b2c3d",
          "tone": "blue"
        },
        {
          "label": "작성자 Jito"
        },
        {
          "label": "3일 전"
        },
        {
          "label": "+197 / -53"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/terms-response",
          "href": "./repository-detail.html?id=mobile-banking-api#branches"
        },
        {
          "label": "MR",
          "value": "#117",
          "href": "./mr-detail.html?id=117"
        },
        {
          "label": "Pipeline",
          "value": "#2847502299",
          "href": "./pipeline-detail.html?id=2847502299"
        }
      ]
    }
  ],
  "commitDetails": [
    {
      "repositoryId": "mobile-banking-api",
      "sha": "7e14d754",
      "message": "인증 정책 응답값 개선 Pipeline",
      "author": {
        "name": "Jito",
        "avatarUrl": ""
      },
      "createdAtText": "20분 전 생성",
      "parentCommitSha": "91a42df0",
      "branches": ["feature/login-policy", "main"],
      "tags": ["v1.4.2"],
      "mergeRequests": [
        {
          "id": "mr-128",
          "number": "!128",
          "title": "인증 정책 응답값 개선"
        }
      ],
      "pipeline": {
        "id": "2847502395",
        "number": "#2847502395",
        "status": "failed",
        "statusLabel": "Pipeline 실패",
        "finishedAtText": "3분 전"
      },
      "summary": {
        "fileCount": 3,
        "additions": 14,
        "deletions": 1
      },
      "files": [
        {
          "id": "file-001",
          "path": "react-app/src/ReactVersion.js",
          "name": "ReactVersion.js",
          "extension": ".js",
          "additions": 14,
          "deletions": 1,
          "changeDistribution": ["added", "added", "added", "added", "neutral"],
          "treePath": ["folder1", "folder1", "folder3", "ReactVersion.js"],
          "diff": [
            { "id": "hunk-001", "type": "hunk", "content": "@@ -281,8 +281,8 @@" },
            { "id": "line-346", "type": "context", "oldLine": 346, "newLine": 346, "oldContent": "const ReactVersion = '19.2.5';", "newContent": "const ReactVersion = '19.2.5';" },
            { "id": "line-347", "type": "removed", "oldLine": 347, "newLine": null, "oldContent": "export const channel = 'stable';", "newContent": "" },
            { "id": "line-348", "type": "added", "oldLine": null, "newLine": 347, "oldContent": "", "newContent": "export const channel = 'production';" },
            { "id": "collapsed-001", "type": "collapsed", "hiddenLinesCount": 12 },
            { "id": "line-349", "type": "context", "oldLine": 348, "newLine": 348, "oldContent": "export default ReactVersion;", "newContent": "export default ReactVersion;" }
          ]
        },
        {
          "id": "file-002",
          "path": "react-app/src/api/authPolicy.ts",
          "name": "authPolicy.ts",
          "extension": ".ts",
          "additions": 8,
          "deletions": 0,
          "changeDistribution": ["added", "added", "neutral", "neutral"],
          "treePath": ["src", "api", "authPolicy.ts"],
          "diff": [
            { "id": "hunk-002", "type": "hunk", "content": "@@ -42,6 +42,8 @@" },
            { "id": "line-042", "type": "context", "oldLine": 42, "newLine": 42, "oldContent": "export function normalizePolicyResponse(response) {", "newContent": "export function normalizePolicyResponse(response) {" },
            { "id": "line-043", "type": "added", "oldLine": null, "newLine": 43, "oldContent": "", "newContent": "  if (response.status === 500) return { status: 'blocked' };" },
            { "id": "line-044", "type": "added", "oldLine": null, "newLine": 44, "oldContent": "", "newContent": "  if (!response.policy) return { status: 'review' };" },
            { "id": "line-045", "type": "context", "oldLine": 43, "newLine": 45, "oldContent": "  return response;", "newContent": "  return response;" }
          ]
        },
        {
          "id": "file-003",
          "path": "README.md",
          "name": "README.md",
          "extension": ".md",
          "additions": 2,
          "deletions": 0,
          "changeDistribution": ["added", "neutral"],
          "treePath": ["README.md"],
          "diff": [
            { "id": "hunk-003", "type": "hunk", "content": "@@ -12,6 +12,8 @@" },
            { "id": "line-012", "type": "context", "oldLine": 12, "newLine": 12, "oldContent": "## 인증 정책", "newContent": "## 인증 정책" },
            { "id": "line-013", "type": "added", "oldLine": null, "newLine": 13, "oldContent": "", "newContent": "운영 반영 전 Commit 상세에서 변경 Diff를 확인합니다." },
            { "id": "line-014", "type": "added", "oldLine": null, "newLine": 14, "oldContent": "", "newContent": "Pipeline 실패 시 Job 상세 화면에서 원인을 확인합니다." }
          ]
        }
      ]
    }
  ],
  "security": {
    "validations": [
      {
        "id": "SEC-301",
        "mrId": 129,
        "mrTitle": "고객 포털 인증 배너 개선",
        "repo": "customer-web-portal",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Web",
        "branch": "feature/auth-banner → develop",
        "author": "Min",
        "mrStatus": "open",
        "vstatus": "warning",
        "vlabel": "Warning",
        "policy": "pending",
        "policyLabel": "보안 승인 필요",
        "severity": {
          "critical": 0,
          "high": 2,
          "medium": 2,
          "low": 1
        },
        "lastCheckedAt": "8분 전",
        "notice": {
          "title": "보안 승인 필요",
          "desc": "High 취약점 2건에 대한 보안 담당자 검토가 필요합니다."
        }
      },
      {
        "id": "SEC-112",
        "mrId": 111,
        "mrTitle": "권한 매핑 정책 import",
        "repo": "auth-policy-engine",
        "projectKey": "platform-center",
        "project": "Platform Center / Security",
        "branch": "feature/role-import → main",
        "author": "Park",
        "mrStatus": "merged",
        "vstatus": "pass",
        "vlabel": "Pass",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 1
        },
        "lastCheckedAt": "1주 전",
        "notice": {
          "title": "보안 검증 통과",
          "desc": "필수 보안 검증 조건을 충족했습니다."
        }
      },
      {
        "id": "SEC-205",
        "mrId": 129,
        "mrTitle": "고객 포털 인증 배너 개선",
        "repo": "customer-web-portal",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Web",
        "branch": "feature/auth-banner → develop",
        "author": "Min",
        "mrStatus": "open",
        "vstatus": "warning",
        "vlabel": "Warning",
        "policy": "allowed",
        "policyLabel": "조건부 병합 가능",
        "severity": {
          "critical": 0,
          "high": 1,
          "medium": 2,
          "low": 1
        },
        "lastCheckedAt": "15분 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "High 취약점 1건과 Medium 취약점 2건에 대한 검토가 필요합니다."
        }
      },
      {
        "id": "SEC-204",
        "mrId": 128,
        "mrTitle": "인증 정책 응답값 개선",
        "repo": "mobile-banking-api",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Mobile",
        "branch": "feature/login-policy → develop",
        "author": "Jito",
        "mrStatus": "blocked",
        "vstatus": "failed",
        "vlabel": "Failed",
        "policy": "blocked",
        "policyLabel": "병합 불가",
        "severity": {
          "critical": 2,
          "high": 3,
          "medium": 1,
          "low": 0
        },
        "lastCheckedAt": "20분 전",
        "notice": {
          "title": "병합이 차단되었습니다",
          "desc": "Critical 또는 High 취약점이 탐지되어 보안 정책에 따라 병합이 제한됩니다."
        }
      },
      {
        "id": "SEC-203",
        "mrId": 127,
        "mrTitle": "계좌 이체 한도 정책 추가",
        "repo": "account-limit-service",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Core API",
        "branch": "feature/transfer-limit → develop",
        "author": "Kang",
        "mrStatus": "open",
        "vstatus": "warning",
        "vlabel": "Warning",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 1,
          "medium": 1,
          "low": 1
        },
        "lastCheckedAt": "45분 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-202",
        "mrId": 126,
        "mrTitle": "계좌 목록 캐싱 개선",
        "repo": "customer-web-portal",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Web",
        "branch": "feature/account-cache → develop",
        "author": "Min",
        "mrStatus": "open",
        "vstatus": "running",
        "vlabel": "Running",
        "policy": "pending",
        "policyLabel": "검증 중",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 2
        },
        "lastCheckedAt": "2시간 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-201",
        "mrId": 125,
        "mrTitle": "알림 템플릿 변수 표준화",
        "repo": "notification-gateway",
        "projectKey": "platform-center",
        "project": "Platform Center / Messaging",
        "branch": "feature/template-vars → develop",
        "author": "Yoon",
        "mrStatus": "open",
        "vstatus": "running",
        "vlabel": "Running",
        "policy": "pending",
        "policyLabel": "검증 중",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0
        },
        "lastCheckedAt": "3시간 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-200",
        "mrId": 124,
        "mrTitle": "관리자 정책 화면 검색 개선",
        "repo": "admin-console-ui",
        "projectKey": "platform-center",
        "project": "Platform Center / Admin",
        "branch": "feature/policy-search → develop",
        "author": "Lim",
        "mrStatus": "open",
        "vstatus": "pass",
        "vlabel": "Pass",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 1,
          "low": 1
        },
        "lastCheckedAt": "5시간 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-199",
        "mrId": 123,
        "mrTitle": "Auth policy rule matcher 분리",
        "repo": "auth-policy-engine",
        "projectKey": "platform-center",
        "project": "Platform Center / Security",
        "branch": "feature/rule-matcher → develop",
        "author": "Park",
        "mrStatus": "blocked",
        "vstatus": "failed",
        "vlabel": "Failed",
        "policy": "blocked",
        "policyLabel": "병합 불가",
        "severity": {
          "critical": 1,
          "high": 3,
          "medium": 1,
          "low": 0
        },
        "lastCheckedAt": "6시간 전",
        "notice": {
          "title": "병합이 차단되었습니다",
          "desc": "Critical 또는 High 취약점이 탐지되어 보안 정책에 따라 병합이 제한됩니다."
        }
      },
      {
        "id": "SEC-198",
        "mrId": 122,
        "mrTitle": "대출 신청 상태 카드 개선",
        "repo": "loan-screen-web",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Loan",
        "branch": "feature/loan-status-card → develop",
        "author": "Seo",
        "mrStatus": "open",
        "vstatus": "warning",
        "vlabel": "Warning",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 1,
          "medium": 1,
          "low": 0
        },
        "lastCheckedAt": "어제",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-197",
        "mrId": 121,
        "mrTitle": "로그인 실패 메시지 정리",
        "repo": "mobile-banking-api",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Mobile",
        "branch": "fix/login-message → main",
        "author": "Han",
        "mrStatus": "merged",
        "vstatus": "pass",
        "vlabel": "Pass",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 1
        },
        "lastCheckedAt": "어제",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-196",
        "mrId": 120,
        "mrTitle": "정산 배치 재시도 정책 개선",
        "repo": "settlement-batch",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Batch",
        "branch": "feature/retry-policy → main",
        "author": "Choi",
        "mrStatus": "merged",
        "vstatus": "pass",
        "vlabel": "Pass",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 1,
          "low": 2
        },
        "lastCheckedAt": "2일 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-195",
        "mrId": 119,
        "mrTitle": "감사 로그 내보내기 포맷 추가",
        "repo": "compliance-exporter",
        "projectKey": "platform-center",
        "project": "Platform Center / Audit",
        "branch": "feature/audit-export → develop",
        "author": "Baek",
        "mrStatus": "open",
        "vstatus": "running",
        "vlabel": "Running",
        "policy": "pending",
        "policyLabel": "검증 중",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0
        },
        "lastCheckedAt": "2일 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-194",
        "mrId": 118,
        "mrTitle": "외부 인증 모듈 교체",
        "repo": "partner-payment-sdk",
        "projectKey": "partner-workspace",
        "project": "Partner Workspace",
        "branch": "feature/external-auth → develop",
        "author": "Partner Dev",
        "mrStatus": "closed",
        "vstatus": "warning",
        "vlabel": "Warning",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 1
        },
        "lastCheckedAt": "3일 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-193",
        "mrId": 117,
        "mrTitle": "모바일 약관 API 응답 축소",
        "repo": "mobile-banking-api",
        "projectKey": "digital-banking",
        "project": "Digital Banking / Mobile",
        "branch": "feature/terms-response → develop",
        "author": "Jito",
        "mrStatus": "merged",
        "vstatus": "pass",
        "vlabel": "Pass",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 2
        },
        "lastCheckedAt": "3일 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-192",
        "mrId": 116,
        "mrTitle": "공통 버튼 컴포넌트 접근성 개선",
        "repo": "common-ui-components",
        "projectKey": "platform-center",
        "project": "Platform Center / Shared Module",
        "branch": "feature/a11y-button → develop",
        "author": "Seo",
        "mrStatus": "merged",
        "vstatus": "pass",
        "vlabel": "Pass",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 1,
          "low": 0
        },
        "lastCheckedAt": "5일 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-191",
        "mrId": 115,
        "mrTitle": "알림 발송 실패 재처리",
        "repo": "notification-gateway",
        "projectKey": "platform-center",
        "project": "Platform Center / Messaging",
        "branch": "feature/retry-queue → main",
        "author": "Yoon",
        "mrStatus": "merged",
        "vstatus": "pass",
        "vlabel": "Pass",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 1
        },
        "lastCheckedAt": "5일 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      },
      {
        "id": "SEC-190",
        "mrId": 114,
        "mrTitle": "관리자 메뉴 권한 뱃지 추가",
        "repo": "admin-console-ui",
        "projectKey": "platform-center",
        "project": "Platform Center / Admin",
        "branch": "feature/role-badge → develop",
        "author": "Lim",
        "mrStatus": "merged",
        "vstatus": "warning",
        "vlabel": "Warning",
        "policy": "allowed",
        "policyLabel": "병합 가능",
        "severity": {
          "critical": 0,
          "high": 1,
          "medium": 1,
          "low": 2
        },
        "lastCheckedAt": "6일 전",
        "notice": {
          "title": "보안 검증 결과를 확인하세요",
          "desc": "보안 검증 기준에 따라 상세 항목을 검토하세요."
        }
      }
    ],
    "vulnerabilities": [
      {
        "id": "VUL-204-C1",
        "securityId": "SEC-204",
        "mrId": 128,
        "repositoryId": "mobile-banking-api",
        "severity": "critical",
        "type": "Secret Detection",
        "title": "Hardcoded credential detected",
        "file": "src/mobile/config.ts",
        "line": 42,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-204-C2",
        "securityId": "SEC-204",
        "mrId": 128,
        "repositoryId": "mobile-banking-api",
        "severity": "critical",
        "type": "Secret Detection",
        "title": "Hardcoded credential detected",
        "file": "src/mobile/config.ts",
        "line": 49,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-204-H1",
        "securityId": "SEC-204",
        "mrId": 128,
        "repositoryId": "mobile-banking-api",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/mobile/config.ts",
        "line": 42,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-204-H2",
        "securityId": "SEC-204",
        "mrId": 128,
        "repositoryId": "mobile-banking-api",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/mobile/config.ts",
        "line": 49,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-204-H3",
        "securityId": "SEC-204",
        "mrId": 128,
        "repositoryId": "mobile-banking-api",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/mobile/config.ts",
        "line": 56,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-204-M1",
        "securityId": "SEC-204",
        "mrId": 128,
        "repositoryId": "mobile-banking-api",
        "severity": "medium",
        "type": "SAST",
        "title": "Unchecked input validation",
        "file": "src/mobile/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-203-H1",
        "securityId": "SEC-203",
        "mrId": 127,
        "repositoryId": "account-limit-service",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/account/config.ts",
        "line": 42,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-203-M1",
        "securityId": "SEC-203",
        "mrId": 127,
        "repositoryId": "account-limit-service",
        "severity": "medium",
        "type": "SAST",
        "title": "Unchecked input validation",
        "file": "src/account/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-203-L1",
        "securityId": "SEC-203",
        "mrId": 127,
        "repositoryId": "account-limit-service",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/account/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-202-L1",
        "securityId": "SEC-202",
        "mrId": 126,
        "repositoryId": "customer-web-portal",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/customer/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-202-L2",
        "securityId": "SEC-202",
        "mrId": 126,
        "repositoryId": "customer-web-portal",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/customer/config.ts",
        "line": 49,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-200-M1",
        "securityId": "SEC-200",
        "mrId": 124,
        "repositoryId": "admin-console-ui",
        "severity": "medium",
        "type": "SAST",
        "title": "Unchecked input validation",
        "file": "src/admin/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-200-L1",
        "securityId": "SEC-200",
        "mrId": 124,
        "repositoryId": "admin-console-ui",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/admin/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-199-C1",
        "securityId": "SEC-199",
        "mrId": 123,
        "repositoryId": "auth-policy-engine",
        "severity": "critical",
        "type": "Secret Detection",
        "title": "Hardcoded credential detected",
        "file": "src/auth/config.ts",
        "line": 42,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-199-H1",
        "securityId": "SEC-199",
        "mrId": 123,
        "repositoryId": "auth-policy-engine",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/auth/config.ts",
        "line": 42,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-199-H2",
        "securityId": "SEC-199",
        "mrId": 123,
        "repositoryId": "auth-policy-engine",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/auth/config.ts",
        "line": 49,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-199-H3",
        "securityId": "SEC-199",
        "mrId": 123,
        "repositoryId": "auth-policy-engine",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/auth/config.ts",
        "line": 56,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-199-M1",
        "securityId": "SEC-199",
        "mrId": 123,
        "repositoryId": "auth-policy-engine",
        "severity": "medium",
        "type": "SAST",
        "title": "Unchecked input validation",
        "file": "src/auth/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-198-H1",
        "securityId": "SEC-198",
        "mrId": 122,
        "repositoryId": "loan-screen-web",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/loan/config.ts",
        "line": 42,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-198-M1",
        "securityId": "SEC-198",
        "mrId": 122,
        "repositoryId": "loan-screen-web",
        "severity": "medium",
        "type": "SAST",
        "title": "Unchecked input validation",
        "file": "src/loan/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-197-L1",
        "securityId": "SEC-197",
        "mrId": 121,
        "repositoryId": "mobile-banking-api",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/mobile/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-196-M1",
        "securityId": "SEC-196",
        "mrId": 120,
        "repositoryId": "settlement-batch",
        "severity": "medium",
        "type": "SAST",
        "title": "Unchecked input validation",
        "file": "src/settlement/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-196-L1",
        "securityId": "SEC-196",
        "mrId": 120,
        "repositoryId": "settlement-batch",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/settlement/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-196-L2",
        "securityId": "SEC-196",
        "mrId": 120,
        "repositoryId": "settlement-batch",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/settlement/config.ts",
        "line": 49,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-194-L1",
        "securityId": "SEC-194",
        "mrId": 118,
        "repositoryId": "partner-payment-sdk",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/partner/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-193-L1",
        "securityId": "SEC-193",
        "mrId": 117,
        "repositoryId": "mobile-banking-api",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/mobile/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-193-L2",
        "securityId": "SEC-193",
        "mrId": 117,
        "repositoryId": "mobile-banking-api",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/mobile/config.ts",
        "line": 49,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-192-M1",
        "securityId": "SEC-192",
        "mrId": 116,
        "repositoryId": "common-ui-components",
        "severity": "medium",
        "type": "SAST",
        "title": "Unchecked input validation",
        "file": "src/common/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-191-L1",
        "securityId": "SEC-191",
        "mrId": 115,
        "repositoryId": "notification-gateway",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/notification/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-190-H1",
        "securityId": "SEC-190",
        "mrId": 114,
        "repositoryId": "admin-console-ui",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "src/admin/config.ts",
        "line": 42,
        "status": "open",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-190-M1",
        "securityId": "SEC-190",
        "mrId": 114,
        "repositoryId": "admin-console-ui",
        "severity": "medium",
        "type": "SAST",
        "title": "Unchecked input validation",
        "file": "src/admin/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-190-L1",
        "securityId": "SEC-190",
        "mrId": 114,
        "repositoryId": "admin-console-ui",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/admin/config.ts",
        "line": 42,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-190-L2",
        "securityId": "SEC-190",
        "mrId": 114,
        "repositoryId": "admin-console-ui",
        "severity": "low",
        "type": "Dependency Notice",
        "title": "Outdated package notice",
        "file": "src/admin/config.ts",
        "line": 49,
        "status": "review",
        "action": "조치 후 재검증 필요"
      },
      {
        "id": "VUL-301-H-37",
        "securityId": "SEC-301",
        "mrId": 129,
        "repositoryId": "customer-web-portal",
        "severity": "high",
        "type": "SAST",
        "title": "Unsafe redirect parameter",
        "file": "src/pages/LoginRedirect.tsx",
        "line": 37,
        "status": "open",
        "action": "수정 후 보안 승인 필요",
        "assignee": "Min",
        "detectedAt": "8분 전"
      },
      {
        "id": "VUL-301-H-22",
        "securityId": "SEC-301",
        "mrId": 129,
        "repositoryId": "customer-web-portal",
        "severity": "high",
        "type": "SCA",
        "title": "Vulnerable dependency detected",
        "file": "package.json",
        "line": 22,
        "status": "open",
        "action": "수정 후 보안 승인 필요",
        "assignee": "Min",
        "detectedAt": "8분 전"
      },
      {
        "id": "VUL-301-M-118",
        "securityId": "SEC-301",
        "mrId": 129,
        "repositoryId": "customer-web-portal",
        "severity": "medium",
        "type": "License Policy",
        "title": "Unapproved transitive license",
        "file": "package-lock.json",
        "line": 118,
        "status": "review",
        "action": "검토 후 재검증 필요",
        "assignee": "Min",
        "detectedAt": "8분 전"
      },
      {
        "id": "VUL-301-M-4",
        "securityId": "SEC-301",
        "mrId": 129,
        "repositoryId": "customer-web-portal",
        "severity": "medium",
        "type": "Container Scan",
        "title": "Base image needs update",
        "file": "Dockerfile",
        "line": 4,
        "status": "review",
        "action": "검토 후 재검증 필요",
        "assignee": "Min",
        "detectedAt": "8분 전"
      },
      {
        "id": "VUL-301-L-81",
        "securityId": "SEC-301",
        "mrId": 129,
        "repositoryId": "customer-web-portal",
        "severity": "low",
        "type": "SAST",
        "title": "Verbose client error message",
        "file": "src/components/AuthBanner.tsx",
        "line": 81,
        "status": "open",
        "action": "검토 후 재검증 필요",
        "assignee": "Min",
        "detectedAt": "8분 전"
      },
      {
        "id": "VUL-112-L-1",
        "securityId": "SEC-112",
        "mrId": 111,
        "repositoryId": "auth-policy-engine",
        "severity": "low",
        "type": "License Policy",
        "title": "License notice update recommended",
        "file": "NOTICE",
        "line": 1,
        "status": "accepted",
        "action": "검토 후 재검증 필요",
        "assignee": "Park",
        "detectedAt": "1주 전"
      }
    ],
    "detail": {
      "id": "SEC-204",
      "mrId": 128,
      "mrTitle": "인증 정책 응답값 개선",
      "repo": "mobile-banking-api",
      "projectKey": "digital-banking",
      "project": "Digital Banking / Mobile",
      "branch": "feature/login-policy → develop",
      "author": "Jito",
      "mrStatus": "blocked",
      "vstatus": "failed",
      "vlabel": "Failed",
      "policy": "blocked",
      "policyLabel": "병합 불가",
      "severity": {
        "critical": 2,
        "high": 3,
        "medium": 1,
        "low": 0
      },
      "lastCheckedAt": "20분 전",
      "notice": {
        "title": "병합이 차단되었습니다",
        "desc": "Critical 또는 High 취약점이 탐지되어 보안 정책에 따라 병합이 제한됩니다."
      }
    }
  },
  "activities": [
    {
      "id": "ACT-1060",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-301",
      "repositoryId": "customer-web-portal",
      "message": "SEC-301 보안 검증 결과: 보안 승인 필요",
      "createdAt": "8분 전"
    },
    {
      "id": "ACT-1061",
      "type": "security.approval",
      "actor": "Park",
      "targetType": "security",
      "targetId": "SEC-301",
      "repositoryId": "customer-web-portal",
      "message": "Park님이 High 취약점 보안 승인을 요청했습니다.",
      "createdAt": "6분 전"
    },
    {
      "id": "ACT-1062",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-112",
      "repositoryId": "auth-policy-engine",
      "message": "SEC-112 보안 검증 결과: Pass",
      "createdAt": "1주 전"
    },
    {
      "id": "ACT-1000",
      "type": "mr.created",
      "actor": "Jito",
      "targetType": "mergeRequest",
      "targetId": 128,
      "repositoryId": "mobile-banking-api",
      "message": "Jito님이 MR #128 인증 정책 응답값 개선을 생성했습니다.",
      "createdAt": "20분 전"
    },
    {
      "id": "ACT-1001",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502395",
      "repositoryId": "mobile-banking-api",
      "message": "MR #128 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "20분 전"
    },
    {
      "id": "ACT-1002",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-204",
      "repositoryId": "mobile-banking-api",
      "message": "MR #128 보안 검증 결과: 확인 필요",
      "createdAt": "20분 전"
    },
    {
      "id": "ACT-1003",
      "type": "mr.created",
      "actor": "Kang",
      "targetType": "mergeRequest",
      "targetId": 127,
      "repositoryId": "account-limit-service",
      "message": "Kang님이 MR #127 계좌 이체 한도 정책 추가을 생성했습니다.",
      "createdAt": "45분 전"
    },
    {
      "id": "ACT-1004",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502388",
      "repositoryId": "account-limit-service",
      "message": "MR #127 Pipeline 상태가 failed로 변경되었습니다.",
      "createdAt": "45분 전"
    },
    {
      "id": "ACT-1005",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-203",
      "repositoryId": "account-limit-service",
      "message": "MR #127 보안 검증 결과: Warning",
      "createdAt": "45분 전"
    },
    {
      "id": "ACT-1006",
      "type": "mr.created",
      "actor": "Min",
      "targetType": "mergeRequest",
      "targetId": 126,
      "repositoryId": "customer-web-portal",
      "message": "Min님이 MR #126 계좌 목록 캐싱 개선을 생성했습니다.",
      "createdAt": "2시간 전"
    },
    {
      "id": "ACT-1007",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502374",
      "repositoryId": "customer-web-portal",
      "message": "MR #126 Pipeline 상태가 failed로 변경되었습니다.",
      "createdAt": "2시간 전"
    },
    {
      "id": "ACT-1008",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-202",
      "repositoryId": "customer-web-portal",
      "message": "MR #126 보안 검증 결과: 대기",
      "createdAt": "2시간 전"
    },
    {
      "id": "ACT-1009",
      "type": "mr.created",
      "actor": "Yoon",
      "targetType": "mergeRequest",
      "targetId": 125,
      "repositoryId": "notification-gateway",
      "message": "Yoon님이 MR #125 알림 템플릿 변수 표준화을 생성했습니다.",
      "createdAt": "3시간 전"
    },
    {
      "id": "ACT-1010",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502369",
      "repositoryId": "notification-gateway",
      "message": "MR #125 Pipeline 상태가 running로 변경되었습니다.",
      "createdAt": "3시간 전"
    },
    {
      "id": "ACT-1011",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-201",
      "repositoryId": "notification-gateway",
      "message": "MR #125 보안 검증 결과: 검증 중",
      "createdAt": "3시간 전"
    },
    {
      "id": "ACT-1012",
      "type": "mr.created",
      "actor": "Lim",
      "targetType": "mergeRequest",
      "targetId": 124,
      "repositoryId": "admin-console-ui",
      "message": "Lim님이 MR #124 관리자 정책 화면 검색 개선을 생성했습니다.",
      "createdAt": "5시간 전"
    },
    {
      "id": "ACT-1013",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502362",
      "repositoryId": "admin-console-ui",
      "message": "MR #124 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "5시간 전"
    },
    {
      "id": "ACT-1014",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-200",
      "repositoryId": "admin-console-ui",
      "message": "MR #124 보안 검증 결과: Passed",
      "createdAt": "5시간 전"
    },
    {
      "id": "ACT-1015",
      "type": "mr.created",
      "actor": "Park",
      "targetType": "mergeRequest",
      "targetId": 123,
      "repositoryId": "auth-policy-engine",
      "message": "Park님이 MR #123 Auth policy rule matcher 분리을 생성했습니다.",
      "createdAt": "6시간 전"
    },
    {
      "id": "ACT-1016",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502355",
      "repositoryId": "auth-policy-engine",
      "message": "MR #123 Pipeline 상태가 failed로 변경되었습니다.",
      "createdAt": "6시간 전"
    },
    {
      "id": "ACT-1017",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-199",
      "repositoryId": "auth-policy-engine",
      "message": "MR #123 보안 검증 결과: 확인 필요",
      "createdAt": "6시간 전"
    },
    {
      "id": "ACT-1018",
      "type": "mr.created",
      "actor": "Seo",
      "targetType": "mergeRequest",
      "targetId": 122,
      "repositoryId": "loan-screen-web",
      "message": "Seo님이 MR #122 대출 신청 상태 카드 개선을 생성했습니다.",
      "createdAt": "어제"
    },
    {
      "id": "ACT-1019",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502344",
      "repositoryId": "loan-screen-web",
      "message": "MR #122 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "어제"
    },
    {
      "id": "ACT-1020",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-198",
      "repositoryId": "loan-screen-web",
      "message": "MR #122 보안 검증 결과: Warning",
      "createdAt": "어제"
    },
    {
      "id": "ACT-1021",
      "type": "mr.created",
      "actor": "Han",
      "targetType": "mergeRequest",
      "targetId": 121,
      "repositoryId": "mobile-banking-api",
      "message": "Han님이 MR #121 로그인 실패 메시지 정리을 생성했습니다.",
      "createdAt": "어제"
    },
    {
      "id": "ACT-1022",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502333",
      "repositoryId": "mobile-banking-api",
      "message": "MR #121 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "어제"
    },
    {
      "id": "ACT-1023",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-197",
      "repositoryId": "mobile-banking-api",
      "message": "MR #121 보안 검증 결과: Passed",
      "createdAt": "어제"
    },
    {
      "id": "ACT-1024",
      "type": "mr.created",
      "actor": "Choi",
      "targetType": "mergeRequest",
      "targetId": 120,
      "repositoryId": "settlement-batch",
      "message": "Choi님이 MR #120 정산 배치 재시도 정책 개선을 생성했습니다.",
      "createdAt": "2일 전"
    },
    {
      "id": "ACT-1025",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502321",
      "repositoryId": "settlement-batch",
      "message": "MR #120 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "2일 전"
    },
    {
      "id": "ACT-1026",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-196",
      "repositoryId": "settlement-batch",
      "message": "MR #120 보안 검증 결과: Passed",
      "createdAt": "2일 전"
    },
    {
      "id": "ACT-1027",
      "type": "mr.created",
      "actor": "Baek",
      "targetType": "mergeRequest",
      "targetId": 119,
      "repositoryId": "compliance-exporter",
      "message": "Baek님이 MR #119 감사 로그 내보내기 포맷 추가을 생성했습니다.",
      "createdAt": "2일 전"
    },
    {
      "id": "ACT-1028",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502310",
      "repositoryId": "compliance-exporter",
      "message": "MR #119 Pipeline 상태가 running로 변경되었습니다.",
      "createdAt": "2일 전"
    },
    {
      "id": "ACT-1029",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-195",
      "repositoryId": "compliance-exporter",
      "message": "MR #119 보안 검증 결과: 검증 중",
      "createdAt": "2일 전"
    },
    {
      "id": "ACT-1030",
      "type": "mr.created",
      "actor": "Partner Dev",
      "targetType": "mergeRequest",
      "targetId": 118,
      "repositoryId": "partner-payment-sdk",
      "message": "Partner Dev님이 MR #118 외부 인증 모듈 교체을 생성했습니다.",
      "createdAt": "3일 전"
    },
    {
      "id": "ACT-1031",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502302",
      "repositoryId": "partner-payment-sdk",
      "message": "MR #118 Pipeline 상태가 canceled로 변경되었습니다.",
      "createdAt": "3일 전"
    },
    {
      "id": "ACT-1032",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-194",
      "repositoryId": "partner-payment-sdk",
      "message": "MR #118 보안 검증 결과: -",
      "createdAt": "3일 전"
    },
    {
      "id": "ACT-1033",
      "type": "mr.created",
      "actor": "Jito",
      "targetType": "mergeRequest",
      "targetId": 117,
      "repositoryId": "mobile-banking-api",
      "message": "Jito님이 MR #117 모바일 약관 API 응답 축소을 생성했습니다.",
      "createdAt": "3일 전"
    },
    {
      "id": "ACT-1034",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502299",
      "repositoryId": "mobile-banking-api",
      "message": "MR #117 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "3일 전"
    },
    {
      "id": "ACT-1035",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-193",
      "repositoryId": "mobile-banking-api",
      "message": "MR #117 보안 검증 결과: Passed",
      "createdAt": "3일 전"
    },
    {
      "id": "ACT-1036",
      "type": "mr.created",
      "actor": "Seo",
      "targetType": "mergeRequest",
      "targetId": 116,
      "repositoryId": "common-ui-components",
      "message": "Seo님이 MR #116 공통 버튼 컴포넌트 접근성 개선을 생성했습니다.",
      "createdAt": "5일 전"
    },
    {
      "id": "ACT-1037",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502395",
      "repositoryId": "common-ui-components",
      "message": "MR #116 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "5일 전"
    },
    {
      "id": "ACT-1038",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-192",
      "repositoryId": "common-ui-components",
      "message": "MR #116 보안 검증 결과: Passed",
      "createdAt": "5일 전"
    },
    {
      "id": "ACT-1039",
      "type": "mr.created",
      "actor": "Yoon",
      "targetType": "mergeRequest",
      "targetId": 115,
      "repositoryId": "notification-gateway",
      "message": "Yoon님이 MR #115 알림 발송 실패 재처리을 생성했습니다.",
      "createdAt": "5일 전"
    },
    {
      "id": "ACT-1040",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502395",
      "repositoryId": "notification-gateway",
      "message": "MR #115 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "5일 전"
    },
    {
      "id": "ACT-1041",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-191",
      "repositoryId": "notification-gateway",
      "message": "MR #115 보안 검증 결과: Passed",
      "createdAt": "5일 전"
    },
    {
      "id": "ACT-1042",
      "type": "mr.created",
      "actor": "Lim",
      "targetType": "mergeRequest",
      "targetId": 114,
      "repositoryId": "admin-console-ui",
      "message": "Lim님이 MR #114 관리자 메뉴 권한 뱃지 추가을 생성했습니다.",
      "createdAt": "6일 전"
    },
    {
      "id": "ACT-1043",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502395",
      "repositoryId": "admin-console-ui",
      "message": "MR #114 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "6일 전"
    },
    {
      "id": "ACT-1044",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-190",
      "repositoryId": "admin-console-ui",
      "message": "MR #114 보안 검증 결과: Warning",
      "createdAt": "6일 전"
    },
    {
      "id": "ACT-1045",
      "type": "mr.created",
      "actor": "Seo",
      "targetType": "mergeRequest",
      "targetId": 113,
      "repositoryId": "loan-screen-web",
      "message": "Seo님이 MR #113 대출 서류 업로드 오류 처리을 생성했습니다.",
      "createdAt": "6일 전"
    },
    {
      "id": "ACT-1046",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502395",
      "repositoryId": "loan-screen-web",
      "message": "MR #113 Pipeline 상태가 failed로 변경되었습니다.",
      "createdAt": "6일 전"
    },
    {
      "id": "ACT-1047",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-204",
      "repositoryId": "loan-screen-web",
      "message": "MR #113 보안 검증 결과: Passed",
      "createdAt": "6일 전"
    },
    {
      "id": "ACT-1048",
      "type": "mr.created",
      "actor": "Choi",
      "targetType": "mergeRequest",
      "targetId": 112,
      "repositoryId": "settlement-batch",
      "message": "Choi님이 MR #112 정산 파일 암호화 옵션 추가을 생성했습니다.",
      "createdAt": "1주 전"
    },
    {
      "id": "ACT-1049",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502395",
      "repositoryId": "settlement-batch",
      "message": "MR #112 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "1주 전"
    },
    {
      "id": "ACT-1050",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-204",
      "repositoryId": "settlement-batch",
      "message": "MR #112 보안 검증 결과: 확인 필요",
      "createdAt": "1주 전"
    },
    {
      "id": "ACT-1051",
      "type": "mr.created",
      "actor": "Park",
      "targetType": "mergeRequest",
      "targetId": 111,
      "repositoryId": "auth-policy-engine",
      "message": "Park님이 MR #111 권한 매핑 정책 import을 생성했습니다.",
      "createdAt": "1주 전"
    },
    {
      "id": "ACT-1052",
      "type": "pipeline.updated",
      "actor": "System",
      "targetType": "pipeline",
      "targetId": "2847502395",
      "repositoryId": "auth-policy-engine",
      "message": "MR #111 Pipeline 상태가 passed로 변경되었습니다.",
      "createdAt": "1주 전"
    },
    {
      "id": "ACT-1053",
      "type": "security.validation",
      "actor": "System",
      "targetType": "security",
      "targetId": "SEC-204",
      "repositoryId": "auth-policy-engine",
      "message": "MR #111 보안 검증 결과: Passed",
      "createdAt": "1주 전"
    }
  ],
  "audit": {
    "summaryCards": [
      {
        "label": "오늘 수집된 이벤트",
        "value": "42",
        "valueClass": "",
        "note": "최근 24시간 기준"
      },
      {
        "label": "위험 이벤트",
        "value": "7",
        "valueClass": "danger",
        "note": "즉시 확인 필요"
      },
      {
        "label": "권한/정책 변경",
        "value": "9",
        "valueClass": "",
        "note": "관리자 변경 포함"
      },
      {
        "label": "배포/보안 로그",
        "value": "18",
        "valueClass": "",
        "note": "Pipeline, Security 포함"
      }
    ],
    "actors": [
      {
        "value": "jito",
        "label": "Jito"
      },
      {
        "value": "min",
        "label": "Min"
      },
      {
        "value": "han",
        "label": "Han"
      },
      {
        "value": "seo",
        "label": "Seo"
      },
      {
        "value": "park",
        "label": "Park"
      },
      {
        "value": "yoon",
        "label": "Yoon"
      },
      {
        "value": "choi",
        "label": "Choi"
      },
      {
        "value": "lim",
        "label": "Lim"
      },
      {
        "value": "kang",
        "label": "Kang"
      },
      {
        "value": "baek",
        "label": "Baek"
      },
      {
        "value": "system",
        "label": "System"
      }
    ],
    "targets": [
      {
        "value": "repository",
        "label": "repository"
      },
      {
        "value": "mergeRequest",
        "label": "mergeRequest"
      },
      {
        "value": "pipeline",
        "label": "pipeline"
      },
      {
        "value": "security",
        "label": "security"
      },
      {
        "value": "deployment",
        "label": "deployment"
      },
      {
        "value": "policy",
        "label": "policy"
      }
    ],
    "logs": [
      {
        "id": "AUD-20260520-1042",
        "eventCode": "mr.approval.update",
        "title": "MR approval status changed",
        "message": "mobile-banking-api의 MR #128 인증 정책 응답값 개선 관련 이벤트가 기록되었습니다.",
        "actor": "jito",
        "actorName": "Jito",
        "actorRole": "Maintainer",
        "target": "repository",
        "targetName": "mobile-banking-api",
        "targetDetail": "MR #128 / feature/login-policy → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.18.91",
        "time": "2026-05-20 14:22:10"
      },
      {
        "id": "AUD-20260520-1043",
        "eventCode": "pipeline.status.change",
        "title": "Pipeline status changed",
        "message": "account-limit-service의 MR #127 계좌 이체 한도 정책 추가 관련 이벤트가 기록되었습니다.",
        "actor": "min",
        "actorName": "Min",
        "actorRole": "Tech Lead",
        "target": "mergeRequest",
        "targetName": "account-limit-service",
        "targetDetail": "MR #127 / feature/transfer-limit → develop",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.19.92",
        "time": "2026-05-20 13:23:10"
      },
      {
        "id": "AUD-20260520-1044",
        "eventCode": "security.validation.failed",
        "title": "Security validation completed",
        "message": "customer-web-portal의 MR #126 계좌 목록 캐싱 개선 관련 이벤트가 기록되었습니다.",
        "actor": "han",
        "actorName": "Han",
        "actorRole": "Backend Lead",
        "target": "pipeline",
        "targetName": "customer-web-portal",
        "targetDetail": "MR #126 / feature/account-cache → develop",
        "severity": "danger",
        "result": "위험 확인 필요",
        "resultClass": "red",
        "ip": "10.42.20.93",
        "time": "2026-05-20 12:24:10"
      },
      {
        "id": "AUD-20260520-1045",
        "eventCode": "repository.policy.update",
        "title": "Repository policy changed",
        "message": "notification-gateway의 MR #125 알림 템플릿 변수 표준화 관련 이벤트가 기록되었습니다.",
        "actor": "park",
        "actorName": "Park",
        "actorRole": "Security Reviewer",
        "target": "security",
        "targetName": "notification-gateway",
        "targetDetail": "MR #125 / feature/template-vars → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.21.94",
        "time": "2026-05-20 11:25:10"
      },
      {
        "id": "AUD-20260520-1046",
        "eventCode": "deployment.request.create",
        "title": "Deployment transfer requested",
        "message": "admin-console-ui의 MR #124 관리자 정책 화면 검색 개선 관련 이벤트가 기록되었습니다.",
        "actor": "system",
        "actorName": "System",
        "actorRole": "Automation",
        "target": "deployment",
        "targetName": "admin-console-ui",
        "targetDetail": "MR #124 / feature/policy-search → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.22.95",
        "time": "2026-05-20 10:26:10"
      },
      {
        "id": "AUD-20260520-1047",
        "eventCode": "role.mapping.change",
        "title": "Role mapping updated",
        "message": "auth-policy-engine의 MR #123 Auth policy rule matcher 분리 관련 이벤트가 기록되었습니다.",
        "actor": "yoon",
        "actorName": "Yoon",
        "actorRole": "DevOps Engineer",
        "target": "policy",
        "targetName": "auth-policy-engine",
        "targetDetail": "MR #123 / feature/rule-matcher → develop",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.23.96",
        "time": "2026-05-20 09:27:10"
      },
      {
        "id": "AUD-20260520-1048",
        "eventCode": "mr.approval.update",
        "title": "MR approval status changed",
        "message": "loan-screen-web의 MR #122 대출 신청 상태 카드 개선 관련 이벤트가 기록되었습니다.",
        "actor": "seo",
        "actorName": "Seo",
        "actorRole": "QA Reviewer",
        "target": "repository",
        "targetName": "loan-screen-web",
        "targetDetail": "MR #122 / feature/loan-status-card → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.24.97",
        "time": "2026-05-20 08:28:10"
      },
      {
        "id": "AUD-20260520-1049",
        "eventCode": "pipeline.status.change",
        "title": "Pipeline status changed",
        "message": "mobile-banking-api의 MR #121 로그인 실패 메시지 정리 관련 이벤트가 기록되었습니다.",
        "actor": "baek",
        "actorName": "Baek",
        "actorRole": "Auditor",
        "target": "mergeRequest",
        "targetName": "mobile-banking-api",
        "targetDetail": "MR #121 / fix/login-message → main",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.25.98",
        "time": "2026-05-20 07:29:10"
      },
      {
        "id": "AUD-20260520-1050",
        "eventCode": "security.validation.failed",
        "title": "Security validation completed",
        "message": "settlement-batch의 MR #120 정산 배치 재시도 정책 개선 관련 이벤트가 기록되었습니다.",
        "actor": "choi",
        "actorName": "Choi",
        "actorRole": "Release Manager",
        "target": "pipeline",
        "targetName": "settlement-batch",
        "targetDetail": "MR #120 / feature/retry-policy → main",
        "severity": "danger",
        "result": "위험 확인 필요",
        "resultClass": "red",
        "ip": "10.42.26.99",
        "time": "2026-05-20 14:30:10"
      },
      {
        "id": "AUD-20260520-1051",
        "eventCode": "repository.policy.update",
        "title": "Repository policy changed",
        "message": "compliance-exporter의 MR #119 감사 로그 내보내기 포맷 추가 관련 이벤트가 기록되었습니다.",
        "actor": "lim",
        "actorName": "Lim",
        "actorRole": "Frontend Lead",
        "target": "security",
        "targetName": "compliance-exporter",
        "targetDetail": "MR #119 / feature/audit-export → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.27.100",
        "time": "2026-05-20 13:31:10"
      },
      {
        "id": "AUD-20260520-1052",
        "eventCode": "deployment.request.create",
        "title": "Deployment transfer requested",
        "message": "partner-payment-sdk의 MR #118 외부 인증 모듈 교체 관련 이벤트가 기록되었습니다.",
        "actor": "jito",
        "actorName": "Jito",
        "actorRole": "Maintainer",
        "target": "deployment",
        "targetName": "partner-payment-sdk",
        "targetDetail": "MR #118 / feature/external-auth → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.28.101",
        "time": "2026-05-20 12:32:10"
      },
      {
        "id": "AUD-20260520-1053",
        "eventCode": "role.mapping.change",
        "title": "Role mapping updated",
        "message": "mobile-banking-api의 MR #117 모바일 약관 API 응답 축소 관련 이벤트가 기록되었습니다.",
        "actor": "min",
        "actorName": "Min",
        "actorRole": "Tech Lead",
        "target": "policy",
        "targetName": "mobile-banking-api",
        "targetDetail": "MR #117 / feature/terms-response → develop",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.29.102",
        "time": "2026-05-20 11:33:10"
      },
      {
        "id": "AUD-20260520-1054",
        "eventCode": "mr.approval.update",
        "title": "MR approval status changed",
        "message": "common-ui-components의 MR #116 공통 버튼 컴포넌트 접근성 개선 관련 이벤트가 기록되었습니다.",
        "actor": "han",
        "actorName": "Han",
        "actorRole": "Backend Lead",
        "target": "repository",
        "targetName": "common-ui-components",
        "targetDetail": "MR #116 / feature/a11y-button → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.30.103",
        "time": "2026-05-20 10:34:10"
      },
      {
        "id": "AUD-20260520-1055",
        "eventCode": "pipeline.status.change",
        "title": "Pipeline status changed",
        "message": "notification-gateway의 MR #115 알림 발송 실패 재처리 관련 이벤트가 기록되었습니다.",
        "actor": "park",
        "actorName": "Park",
        "actorRole": "Security Reviewer",
        "target": "mergeRequest",
        "targetName": "notification-gateway",
        "targetDetail": "MR #115 / feature/retry-queue → main",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.31.104",
        "time": "2026-05-20 09:35:10"
      },
      {
        "id": "AUD-20260520-1056",
        "eventCode": "security.validation.failed",
        "title": "Security validation completed",
        "message": "admin-console-ui의 MR #114 관리자 메뉴 권한 뱃지 추가 관련 이벤트가 기록되었습니다.",
        "actor": "system",
        "actorName": "System",
        "actorRole": "Automation",
        "target": "pipeline",
        "targetName": "admin-console-ui",
        "targetDetail": "MR #114 / feature/role-badge → develop",
        "severity": "danger",
        "result": "위험 확인 필요",
        "resultClass": "red",
        "ip": "10.42.32.105",
        "time": "2026-05-19 08:36:10"
      },
      {
        "id": "AUD-20260520-1057",
        "eventCode": "repository.policy.update",
        "title": "Repository policy changed",
        "message": "loan-screen-web의 MR #113 대출 서류 업로드 오류 처리 관련 이벤트가 기록되었습니다.",
        "actor": "yoon",
        "actorName": "Yoon",
        "actorRole": "DevOps Engineer",
        "target": "security",
        "targetName": "loan-screen-web",
        "targetDetail": "MR #113 / fix/upload-error → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.33.106",
        "time": "2026-05-19 07:37:10"
      },
      {
        "id": "AUD-20260520-1058",
        "eventCode": "deployment.request.create",
        "title": "Deployment transfer requested",
        "message": "settlement-batch의 MR #112 정산 파일 암호화 옵션 추가 관련 이벤트가 기록되었습니다.",
        "actor": "seo",
        "actorName": "Seo",
        "actorRole": "QA Reviewer",
        "target": "deployment",
        "targetName": "settlement-batch",
        "targetDetail": "MR #112 / feature/encrypt-export → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.34.107",
        "time": "2026-05-19 14:38:10"
      },
      {
        "id": "AUD-20260520-1059",
        "eventCode": "role.mapping.change",
        "title": "Role mapping updated",
        "message": "auth-policy-engine의 MR #111 권한 매핑 정책 import 관련 이벤트가 기록되었습니다.",
        "actor": "baek",
        "actorName": "Baek",
        "actorRole": "Auditor",
        "target": "policy",
        "targetName": "auth-policy-engine",
        "targetDetail": "MR #111 / feature/role-import → main",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.35.108",
        "time": "2026-05-19 13:39:10"
      },
      {
        "id": "AUD-20260520-1060",
        "eventCode": "mr.approval.update",
        "title": "MR approval status changed",
        "message": "mobile-banking-api의 MR #128 인증 정책 응답값 개선 관련 이벤트가 기록되었습니다.",
        "actor": "choi",
        "actorName": "Choi",
        "actorRole": "Release Manager",
        "target": "repository",
        "targetName": "mobile-banking-api",
        "targetDetail": "MR #128 / feature/login-policy → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.36.109",
        "time": "2026-05-19 12:40:10"
      },
      {
        "id": "AUD-20260520-1061",
        "eventCode": "pipeline.status.change",
        "title": "Pipeline status changed",
        "message": "account-limit-service의 MR #127 계좌 이체 한도 정책 추가 관련 이벤트가 기록되었습니다.",
        "actor": "lim",
        "actorName": "Lim",
        "actorRole": "Frontend Lead",
        "target": "mergeRequest",
        "targetName": "account-limit-service",
        "targetDetail": "MR #127 / feature/transfer-limit → develop",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.37.110",
        "time": "2026-05-19 11:41:10"
      },
      {
        "id": "AUD-20260520-1062",
        "eventCode": "security.validation.failed",
        "title": "Security validation completed",
        "message": "customer-web-portal의 MR #126 계좌 목록 캐싱 개선 관련 이벤트가 기록되었습니다.",
        "actor": "jito",
        "actorName": "Jito",
        "actorRole": "Maintainer",
        "target": "pipeline",
        "targetName": "customer-web-portal",
        "targetDetail": "MR #126 / feature/account-cache → develop",
        "severity": "danger",
        "result": "위험 확인 필요",
        "resultClass": "red",
        "ip": "10.42.18.111",
        "time": "2026-05-19 10:42:10"
      },
      {
        "id": "AUD-20260520-1063",
        "eventCode": "repository.policy.update",
        "title": "Repository policy changed",
        "message": "notification-gateway의 MR #125 알림 템플릿 변수 표준화 관련 이벤트가 기록되었습니다.",
        "actor": "min",
        "actorName": "Min",
        "actorRole": "Tech Lead",
        "target": "security",
        "targetName": "notification-gateway",
        "targetDetail": "MR #125 / feature/template-vars → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.19.112",
        "time": "2026-05-19 09:43:10"
      },
      {
        "id": "AUD-20260520-1064",
        "eventCode": "deployment.request.create",
        "title": "Deployment transfer requested",
        "message": "admin-console-ui의 MR #124 관리자 정책 화면 검색 개선 관련 이벤트가 기록되었습니다.",
        "actor": "han",
        "actorName": "Han",
        "actorRole": "Backend Lead",
        "target": "deployment",
        "targetName": "admin-console-ui",
        "targetDetail": "MR #124 / feature/policy-search → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.20.113",
        "time": "2026-05-19 08:44:10"
      },
      {
        "id": "AUD-20260520-1065",
        "eventCode": "role.mapping.change",
        "title": "Role mapping updated",
        "message": "auth-policy-engine의 MR #123 Auth policy rule matcher 분리 관련 이벤트가 기록되었습니다.",
        "actor": "park",
        "actorName": "Park",
        "actorRole": "Security Reviewer",
        "target": "policy",
        "targetName": "auth-policy-engine",
        "targetDetail": "MR #123 / feature/rule-matcher → develop",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.21.114",
        "time": "2026-05-19 07:45:10"
      },
      {
        "id": "AUD-20260520-1066",
        "eventCode": "mr.approval.update",
        "title": "MR approval status changed",
        "message": "loan-screen-web의 MR #122 대출 신청 상태 카드 개선 관련 이벤트가 기록되었습니다.",
        "actor": "system",
        "actorName": "System",
        "actorRole": "Automation",
        "target": "repository",
        "targetName": "loan-screen-web",
        "targetDetail": "MR #122 / feature/loan-status-card → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.22.115",
        "time": "2026-05-19 14:46:10"
      },
      {
        "id": "AUD-20260520-1067",
        "eventCode": "pipeline.status.change",
        "title": "Pipeline status changed",
        "message": "mobile-banking-api의 MR #121 로그인 실패 메시지 정리 관련 이벤트가 기록되었습니다.",
        "actor": "yoon",
        "actorName": "Yoon",
        "actorRole": "DevOps Engineer",
        "target": "mergeRequest",
        "targetName": "mobile-banking-api",
        "targetDetail": "MR #121 / fix/login-message → main",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.23.116",
        "time": "2026-05-19 13:47:10"
      },
      {
        "id": "AUD-20260520-1068",
        "eventCode": "security.validation.failed",
        "title": "Security validation completed",
        "message": "settlement-batch의 MR #120 정산 배치 재시도 정책 개선 관련 이벤트가 기록되었습니다.",
        "actor": "seo",
        "actorName": "Seo",
        "actorRole": "QA Reviewer",
        "target": "pipeline",
        "targetName": "settlement-batch",
        "targetDetail": "MR #120 / feature/retry-policy → main",
        "severity": "danger",
        "result": "위험 확인 필요",
        "resultClass": "red",
        "ip": "10.42.24.117",
        "time": "2026-05-19 12:48:10"
      },
      {
        "id": "AUD-20260520-1069",
        "eventCode": "repository.policy.update",
        "title": "Repository policy changed",
        "message": "compliance-exporter의 MR #119 감사 로그 내보내기 포맷 추가 관련 이벤트가 기록되었습니다.",
        "actor": "baek",
        "actorName": "Baek",
        "actorRole": "Auditor",
        "target": "security",
        "targetName": "compliance-exporter",
        "targetDetail": "MR #119 / feature/audit-export → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.25.118",
        "time": "2026-05-19 11:49:10"
      },
      {
        "id": "AUD-20260520-1070",
        "eventCode": "deployment.request.create",
        "title": "Deployment transfer requested",
        "message": "partner-payment-sdk의 MR #118 외부 인증 모듈 교체 관련 이벤트가 기록되었습니다.",
        "actor": "choi",
        "actorName": "Choi",
        "actorRole": "Release Manager",
        "target": "deployment",
        "targetName": "partner-payment-sdk",
        "targetDetail": "MR #118 / feature/external-auth → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.26.119",
        "time": "2026-05-18 10:50:10"
      },
      {
        "id": "AUD-20260520-1071",
        "eventCode": "role.mapping.change",
        "title": "Role mapping updated",
        "message": "mobile-banking-api의 MR #117 모바일 약관 API 응답 축소 관련 이벤트가 기록되었습니다.",
        "actor": "lim",
        "actorName": "Lim",
        "actorRole": "Frontend Lead",
        "target": "policy",
        "targetName": "mobile-banking-api",
        "targetDetail": "MR #117 / feature/terms-response → develop",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.27.120",
        "time": "2026-05-18 09:51:10"
      },
      {
        "id": "AUD-20260520-1072",
        "eventCode": "mr.approval.update",
        "title": "MR approval status changed",
        "message": "common-ui-components의 MR #116 공통 버튼 컴포넌트 접근성 개선 관련 이벤트가 기록되었습니다.",
        "actor": "jito",
        "actorName": "Jito",
        "actorRole": "Maintainer",
        "target": "repository",
        "targetName": "common-ui-components",
        "targetDetail": "MR #116 / feature/a11y-button → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.28.121",
        "time": "2026-05-18 08:52:10"
      },
      {
        "id": "AUD-20260520-1073",
        "eventCode": "pipeline.status.change",
        "title": "Pipeline status changed",
        "message": "notification-gateway의 MR #115 알림 발송 실패 재처리 관련 이벤트가 기록되었습니다.",
        "actor": "min",
        "actorName": "Min",
        "actorRole": "Tech Lead",
        "target": "mergeRequest",
        "targetName": "notification-gateway",
        "targetDetail": "MR #115 / feature/retry-queue → main",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.29.122",
        "time": "2026-05-18 07:53:10"
      },
      {
        "id": "AUD-20260520-1074",
        "eventCode": "security.validation.failed",
        "title": "Security validation completed",
        "message": "admin-console-ui의 MR #114 관리자 메뉴 권한 뱃지 추가 관련 이벤트가 기록되었습니다.",
        "actor": "han",
        "actorName": "Han",
        "actorRole": "Backend Lead",
        "target": "pipeline",
        "targetName": "admin-console-ui",
        "targetDetail": "MR #114 / feature/role-badge → develop",
        "severity": "danger",
        "result": "위험 확인 필요",
        "resultClass": "red",
        "ip": "10.42.30.123",
        "time": "2026-05-18 14:54:10"
      },
      {
        "id": "AUD-20260520-1075",
        "eventCode": "repository.policy.update",
        "title": "Repository policy changed",
        "message": "loan-screen-web의 MR #113 대출 서류 업로드 오류 처리 관련 이벤트가 기록되었습니다.",
        "actor": "park",
        "actorName": "Park",
        "actorRole": "Security Reviewer",
        "target": "security",
        "targetName": "loan-screen-web",
        "targetDetail": "MR #113 / fix/upload-error → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.31.124",
        "time": "2026-05-18 13:55:10"
      },
      {
        "id": "AUD-20260520-1076",
        "eventCode": "deployment.request.create",
        "title": "Deployment transfer requested",
        "message": "settlement-batch의 MR #112 정산 파일 암호화 옵션 추가 관련 이벤트가 기록되었습니다.",
        "actor": "system",
        "actorName": "System",
        "actorRole": "Automation",
        "target": "deployment",
        "targetName": "settlement-batch",
        "targetDetail": "MR #112 / feature/encrypt-export → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.32.125",
        "time": "2026-05-18 12:56:10"
      },
      {
        "id": "AUD-20260520-1077",
        "eventCode": "role.mapping.change",
        "title": "Role mapping updated",
        "message": "auth-policy-engine의 MR #111 권한 매핑 정책 import 관련 이벤트가 기록되었습니다.",
        "actor": "yoon",
        "actorName": "Yoon",
        "actorRole": "DevOps Engineer",
        "target": "policy",
        "targetName": "auth-policy-engine",
        "targetDetail": "MR #111 / feature/role-import → main",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.33.126",
        "time": "2026-05-18 11:57:10"
      },
      {
        "id": "AUD-20260520-1078",
        "eventCode": "mr.approval.update",
        "title": "MR approval status changed",
        "message": "mobile-banking-api의 MR #128 인증 정책 응답값 개선 관련 이벤트가 기록되었습니다.",
        "actor": "seo",
        "actorName": "Seo",
        "actorRole": "QA Reviewer",
        "target": "repository",
        "targetName": "mobile-banking-api",
        "targetDetail": "MR #128 / feature/login-policy → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.34.127",
        "time": "2026-05-18 10:58:10"
      },
      {
        "id": "AUD-20260520-1079",
        "eventCode": "pipeline.status.change",
        "title": "Pipeline status changed",
        "message": "account-limit-service의 MR #127 계좌 이체 한도 정책 추가 관련 이벤트가 기록되었습니다.",
        "actor": "baek",
        "actorName": "Baek",
        "actorRole": "Auditor",
        "target": "mergeRequest",
        "targetName": "account-limit-service",
        "targetDetail": "MR #127 / feature/transfer-limit → develop",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.35.128",
        "time": "2026-05-18 09:22:10"
      },
      {
        "id": "AUD-20260520-1080",
        "eventCode": "security.validation.failed",
        "title": "Security validation completed",
        "message": "customer-web-portal의 MR #126 계좌 목록 캐싱 개선 관련 이벤트가 기록되었습니다.",
        "actor": "choi",
        "actorName": "Choi",
        "actorRole": "Release Manager",
        "target": "pipeline",
        "targetName": "customer-web-portal",
        "targetDetail": "MR #126 / feature/account-cache → develop",
        "severity": "danger",
        "result": "위험 확인 필요",
        "resultClass": "red",
        "ip": "10.42.36.129",
        "time": "2026-05-18 08:23:10"
      },
      {
        "id": "AUD-20260520-1081",
        "eventCode": "repository.policy.update",
        "title": "Repository policy changed",
        "message": "notification-gateway의 MR #125 알림 템플릿 변수 표준화 관련 이벤트가 기록되었습니다.",
        "actor": "lim",
        "actorName": "Lim",
        "actorRole": "Frontend Lead",
        "target": "security",
        "targetName": "notification-gateway",
        "targetDetail": "MR #125 / feature/template-vars → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.37.130",
        "time": "2026-05-18 07:24:10"
      },
      {
        "id": "AUD-20260520-1082",
        "eventCode": "deployment.request.create",
        "title": "Deployment transfer requested",
        "message": "admin-console-ui의 MR #124 관리자 정책 화면 검색 개선 관련 이벤트가 기록되었습니다.",
        "actor": "jito",
        "actorName": "Jito",
        "actorRole": "Maintainer",
        "target": "deployment",
        "targetName": "admin-console-ui",
        "targetDetail": "MR #124 / feature/policy-search → develop",
        "severity": "info",
        "result": "정상 처리",
        "resultClass": "green",
        "ip": "10.42.18.131",
        "time": "2026-05-18 14:25:10"
      },
      {
        "id": "AUD-20260520-1083",
        "eventCode": "role.mapping.change",
        "title": "Role mapping updated",
        "message": "auth-policy-engine의 MR #123 Auth policy rule matcher 분리 관련 이벤트가 기록되었습니다.",
        "actor": "min",
        "actorName": "Min",
        "actorRole": "Tech Lead",
        "target": "policy",
        "targetName": "auth-policy-engine",
        "targetDetail": "MR #123 / feature/rule-matcher → develop",
        "severity": "warning",
        "result": "검토 필요",
        "resultClass": "orange",
        "ip": "10.42.19.132",
        "time": "2026-05-18 13:26:10"
      }
    ],
    "evidenceCategories": [
      { "key": "governance", "label": "공통 및 거버넌스", "count": 4 },
      { "key": "change-control", "label": "시스템 변경/개발 통제", "count": 5 },
      { "key": "security-infra", "label": "정보보호/인프라 보안", "count": 5 },
      { "key": "legal-duty", "label": "법정 의무 수행", "count": 3 },
      { "key": "export-history", "label": "내보내기 이력", "count": 12 }
    ],
    "evidenceItems": [
      {
        "id": "audit-evidence-001",
        "category": "change-control",
        "title": "형상관리 접근 권한 리스트",
        "description": "개발자와 운영 배포 담당자 권한 분리 증명",
        "mappedEvidence": "Repository 권한 변경 로그 · Role 매핑 이력",
        "mappedDescription": "Admin/Internal/External 권한, 보호 Branch 접근 이력 포함",
        "status": "ready",
        "formats": ["CSV", "PDF", "ZIP"],
        "owner": "관리자",
        "relatedResources": ["Repository", "Role", "Branch"]
      },
      {
        "id": "audit-evidence-002",
        "category": "change-control",
        "title": "개발/변경 요청서 SR 샘플",
        "description": "요청자, 개발자, 검증자, 승인자 이력",
        "mappedEvidence": "MR 생성/승인/리뷰 Activity",
        "mappedDescription": "MR #391, 승인자 2명, 리뷰 코멘트, Merge 조건 포함",
        "status": "ready",
        "formats": ["PDF", "ZIP"],
        "owner": "김신한",
        "relatedResources": ["MR", "Activity"]
      },
      {
        "id": "audit-evidence-003",
        "category": "change-control",
        "title": "테스트 결과서",
        "description": "SAST/DAST 조치 완료 및 Pipeline 결과",
        "mappedEvidence": "Pipeline · Security Validation 결과",
        "mappedDescription": "성공/실패 Job, 취약점 조치 상태, 재실행 이력 포함",
        "status": "need-review",
        "formats": ["PDF", "CSV"],
        "owner": "보안 담당자",
        "relatedResources": ["Pipeline", "Security Validation"]
      },
      {
        "id": "audit-evidence-004",
        "category": "change-control",
        "title": "정기 프로그램 감사 보고서",
        "description": "임의 배포가 없었음을 확인하는 감사 결과",
        "mappedEvidence": "운영이관 승인/반려/취소 로그",
        "mappedDescription": "운영 반영 가능 여부, 승인권자, 차단 사유 포함",
        "status": "ready",
        "formats": ["PDF", "ZIP"],
        "owner": "Choi",
        "relatedResources": ["운영이관", "Pipeline"]
      },
      {
        "id": "audit-evidence-005",
        "category": "security-infra",
        "title": "망분리 예외 승인 문서",
        "description": "예외 단말 및 승인 결재 문서",
        "mappedEvidence": "외부 파일 첨부 필요",
        "mappedDescription": "gitddn Activity만으로는 증적 생성이 어려운 항목",
        "status": "need-file",
        "formats": ["PDF", "첨부"],
        "owner": "보안 담당자",
        "relatedResources": []
      },
      {
        "id": "audit-evidence-006",
        "category": "governance",
        "title": "접근 권한 관리 대장",
        "description": "주요 Repository와 시스템별 권한 부여 및 변경 이력",
        "mappedEvidence": "사용자 Role 변경 · Repository 접근 로그",
        "mappedDescription": "반기별 권한 정비 결과와 연결 가능",
        "status": "ready",
        "formats": ["CSV", "PDF"],
        "owner": "관리자",
        "relatedResources": ["Repository", "Role"]
      },
      {
        "id": "audit-evidence-007",
        "category": "security-infra",
        "title": "패치 적용 현황",
        "description": "운영 환경 구성 요소의 보안 패치 적용 이력",
        "mappedEvidence": "Pipeline 배포 이력 · 운영이관 체크리스트",
        "mappedDescription": "미적용 사유가 있는 항목은 보완 필요",
        "status": "need-fix",
        "formats": ["PDF", "첨부"],
        "owner": "박운영",
        "relatedResources": ["Pipeline", "운영이관"]
      },
      {
        "id": "audit-evidence-008",
        "category": "security-infra",
        "title": "취약점 분석·평가 조치 보고서",
        "description": "취약점 지적 사항에 대한 개선 완료 증적",
        "mappedEvidence": "Security Validation · MR 조치 이력",
        "mappedDescription": "취약점 등급, 조치 Commit, 승인 이력 포함",
        "status": "ready",
        "formats": ["PDF", "ZIP"],
        "owner": "보안 담당자",
        "relatedResources": ["Security Validation", "MR", "Commit"]
      },
      {
        "id": "audit-evidence-009",
        "category": "governance",
        "title": "개인정보처리방침 변경 이력",
        "description": "정책 변경 및 승인 이력",
        "mappedEvidence": "정책 변경 Activity · 승인 로그",
        "mappedDescription": "변경 전/후 내용, 승인권자, 적용 일자 포함",
        "status": "ready",
        "formats": ["PDF"],
        "owner": "관리자",
        "relatedResources": ["Policy", "Activity"]
      },
      {
        "id": "audit-evidence-010",
        "category": "legal-duty",
        "title": "개인정보 처리 위탁 계약서",
        "description": "위탁 업체별 계약서 및 점검 결과",
        "mappedEvidence": "외부 파일 첨부 필요",
        "mappedDescription": "계약서 원본은 gitddn 외부에서 관리",
        "status": "need-file",
        "formats": ["PDF", "첨부"],
        "owner": "법무 담당자",
        "relatedResources": []
      }
    ],
    "exportHistories": [
      {
        "id": "export-001",
        "packageName": "2026년 5월 운영이관 감사 패키지",
        "createdAt": "2026-05-28",
        "createdAtText": "20분 전",
        "createdBy": "김신한",
        "itemCount": 8,
        "formats": ["ZIP"],
        "status": "completed"
      },
      {
        "id": "export-002",
        "packageName": "Repository 권한 변경 증적",
        "createdAt": "2026-05-27",
        "createdAtText": "어제",
        "createdBy": "박운영",
        "itemCount": 3,
        "formats": ["CSV", "PDF"],
        "status": "completed"
      },
      {
        "id": "export-003",
        "packageName": "5월 정기 감사 전체 패키지",
        "createdAt": "2026-05-25",
        "createdAtText": "3일 전",
        "createdBy": "관리자",
        "itemCount": 12,
        "formats": ["ZIP"],
        "status": "completed"
      }
    ]
  },
  "dashboard": {
    "summaryCards": [
      {
        "title": "승인해야 할 MR",
        "value": 4,
        "note": "리뷰 또는 승인 필요",
        "href": "./pages/mr-list.html"
      },
      {
        "title": "진행 중인 내 MR",
        "value": 7,
        "note": "Open 상태의 Merge Request",
        "href": "./pages/mr-list.html"
      },
      {
        "title": "조치 필요한 Pipeline",
        "value": 2,
        "note": "실패 원인 확인 필요",
        "tone": "risk",
        "href": "./pages/pipeline-list.html"
      },
      {
        "title": "운영이관 대기",
        "value": 3,
        "note": "승인 또는 반영 대기 중",
        "href": "#deployment"
      },
      {
        "title": "보안 검증 필요",
        "value": 1,
        "note": "취약점 또는 정책 확인 필요",
        "tone": "warning",
        "href": "./pages/security-list.html"
      }
    ],
    "nextUp": [
      {
        "filters": "urgent failure",
        "priority": "긴급",
        "tone": "risk",
        "title": "Pipeline #2847502395 실패 원인 확인",
        "meta": "mobile-banking-api · feature/login-policy · Test 단계 실패 · 20분 전",
        "condition": "조건 2/4 충족",
        "done": 2,
        "total": 4,
        "actionLabel": "실패 원인 보기",
        "actionType": "secondary",
        "href": "./pages/pipeline-detail.html?id=2847502395"
      },
      {
        "filters": "approval",
        "priority": "리뷰 필요",
        "tone": "warning",
        "title": "MR #128 인증 정책 응답값 개선",
        "meta": "mobile-banking-api · 리뷰 요청 · 20분 전",
        "condition": "조건 3/4 충족",
        "done": 3,
        "total": 4,
        "actionLabel": "리뷰하기",
        "actionType": "primary",
        "href": "./pages/mr-detail.html?id=128&repo=mobile-banking-api"
      },
      {
        "filters": "deploy",
        "priority": "오늘까지",
        "tone": "warning",
        "title": "운영이관 요청 승인 대기",
        "meta": "customer-web-portal · 운영 반영 예정일 오늘",
        "condition": "운영이관 조건 4/5 충족",
        "done": 4,
        "total": 5,
        "actionLabel": "요청 보기",
        "toast": "Deployment Transfer 화면은 다음 단계에서 연결됩니다."
      },
      {
        "filters": "security urgent",
        "priority": "보안 확인",
        "tone": "risk",
        "title": "Security #SEC-204 보안 정책 확인 필요",
        "meta": "mobile-banking-api · Critical 취약점 2건",
        "condition": "조건 1/3 충족",
        "done": 1,
        "total": 3,
        "actionLabel": "조치 가이드 보기",
        "href": "./pages/security-detail.html?id=SEC-204&mrId=128"
      }
    ],
    "repositories": [
      {
        "name": "mobile-banking-api",
        "href": "./pages/repository-detail.html?id=mobile-banking-api",
        "chips": [
          {
            "label": "MR 5",
            "tone": "blue"
          },
          {
            "label": "Pipeline 실패 1",
            "tone": "red"
          },
          {
            "label": "보안 차단 1",
            "tone": "orange"
          }
        ],
        "updatedAt": "Updated 20 minutes ago"
      },
      {
        "name": "common-ui-components",
        "href": "./pages/repository-detail.html?id=common-ui-components",
        "chips": [
          {
            "label": "MR 1",
            "tone": "blue"
          },
          {
            "label": "보안 검증 1",
            "tone": "orange"
          }
        ],
        "updatedAt": "Updated 5 hours ago"
      },
      {
        "name": "customer-web-portal",
        "href": "./pages/repository-detail.html?id=customer-web-portal",
        "chips": [
          {
            "label": "MR 3",
            "tone": "blue"
          },
          {
            "label": "Pipeline 실행 중",
            "tone": "orange"
          }
        ],
        "updatedAt": "Updated yesterday"
      }
    ],
    "recent": [
      {
        "title": "MR #128 인증 정책 응답값 개선",
        "meta": "Merge Request · 방금 전",
        "href": "./pages/mr-detail.html?id=128&repo=mobile-banking-api"
      },
      {
        "title": "Pipeline #2847502395",
        "meta": "Test 단계 실패 · 20분 전",
        "href": "./pages/pipeline-detail.html?id=2847502395"
      },
      {
        "title": "Repository mobile-banking-api",
        "meta": "Repository · 1시간 전",
        "href": "./pages/repository-detail.html?id=mobile-banking-api"
      },
      {
        "title": "Security #SEC-204",
        "meta": "Security Validation · 확인 필요",
        "href": "./pages/security-detail.html?id=SEC-204&mrId=128"
      }
    ],
    "activity": [
      {
        "filter": "repository",
        "type": "Commit",
        "tone": "blue",
        "title": "Jito님이 feature/login-policy 브랜치에 3개의 Commit을 push했습니다.",
        "meta": "mobile-banking-api · 1시간 전"
      },
      {
        "filter": "mr",
        "type": "Review",
        "tone": "orange",
        "title": "Min님이 MR #128에 리뷰 코멘트를 남겼습니다.",
        "meta": "Merge Request · 2시간 전"
      },
      {
        "filter": "pipeline",
        "type": "Pipeline",
        "tone": "blue",
        "title": "Pipeline #2847502395가 test 단계에서 실패했습니다.",
        "meta": "Pipeline · 20분 전"
      },
      {
        "filter": "security",
        "type": "Security",
        "tone": "orange",
        "title": "Security #SEC-204에서 Critical 취약점이 확인되었습니다.",
        "meta": "Security Validation · 방금 전"
      }
    ]
  },
  "forms": {
    "repositoryTemplates": [
      "Spring Boot API",
      "GitLab 기본 템플릿",
      "Android",
      "iOS(Swift)",
      "React Web",
      "Vue Admin",
      "Node API",
      "Python Batch"
    ],
    "repositoryMembers": [
      "jito@company.com",
      "min@company.com",
      "security@company.com"
    ],
    "mrRepositories": [
      "mobile-banking-api",
      "customer-web-portal",
      "account-limit-service",
      "loan-screen-web",
      "notification-gateway",
      "auth-policy-engine",
      "admin-console-ui",
      "settlement-batch"
    ],
    "sourceBranches": [
      "feature/login-policy",
      "feature/account-cache",
      "feature/transfer-limit",
      "feature/template-vars",
      "feature/policy-search",
      "fix/login-message",
      "feature/retry-policy"
    ],
    "targetBranches": [
      "develop",
      "main",
      "release/2026.05"
    ],
    "branchCommits": {
      "source": {
        "feature/login-policy": {
          "title": "인증 정책 응답값 개선",
          "author": "Jito",
          "sha": "7e14d754",
          "time": "20분 전"
        },
        "feature/transfer-limit": {
          "title": "계좌 이체 한도 정책 추가",
          "author": "Kang",
          "sha": "3c96a12b",
          "time": "45분 전"
        },
        "feature/account-cache": {
          "title": "계좌 목록 캐싱 개선",
          "author": "Min",
          "sha": "b71c2f09",
          "time": "2시간 전"
        },
        "feature/template-vars": {
          "title": "알림 템플릿 변수 표준화",
          "author": "Yoon",
          "sha": "c41a79ee",
          "time": "3시간 전"
        },
        "feature/policy-search": {
          "title": "관리자 정책 화면 검색 개선",
          "author": "Lim",
          "sha": "e0d1ab42",
          "time": "5시간 전"
        },
        "feature/rule-matcher": {
          "title": "Auth policy rule matcher 분리",
          "author": "Park",
          "sha": "a82f4c1",
          "time": "6시간 전"
        },
        "feature/loan-status-card": {
          "title": "대출 신청 상태 카드 개선",
          "author": "Seo",
          "sha": "9c21d0e",
          "time": "어제"
        },
        "fix/login-message": {
          "title": "로그인 실패 메시지 정리",
          "author": "Han",
          "sha": "d31e92a",
          "time": "어제"
        }
      },
      "target": {
        "develop": {
          "title": "develop 브랜치 빌드 안정화",
          "author": "Min",
          "sha": "d31e92a",
          "time": "1시간 전"
        },
        "main": {
          "title": "main 브랜치 최신 릴리즈 태그 적용",
          "author": "Jito",
          "sha": "a1b2c3d",
          "time": "3시간 전"
        },
        "release/2026.05": {
          "title": "release/2026.05 보안 점검 완료",
          "author": "Security",
          "sha": "f40b91c",
          "time": "어제"
        }
      }
    },
    "reviewers": [
      {
        "email": "min@company.com",
        "role": "리뷰어"
      },
      {
        "email": "security@company.com",
        "role": "승인자"
      },
      {
        "email": "han@company.com",
        "role": "리뷰어 + 승인자"
      }
    ]
  },
  "details": {
    "mergeRequest": {
      "id": 128,
      "title": "인증 정책 응답값 개선",
      "summary": "로그인 정책 예외 케이스 응답값 정리 및 인증 API 응답 필드 표준화",
      "repo": "mobile-banking-api",
      "repoGroup": "Digital Banking / Mobile",
      "source": "feature/login-policy",
      "target": "develop",
      "owner": "jito",
      "author": "Jito",
      "updatedAt": "20분 전",
      "pipeline": "passed",
      "security": "failed",
      "securityLabel": "확인 필요",
      "review": "need-review",
      "reviewLabel": "리뷰 필요",
      "approved": 1,
      "required": 2,
      "comments": 8,
      "status": "open",
      "gates": [
        {
          "type": "approval",
          "icon": "AP",
          "iconTone": "blue",
          "title": "승인자",
          "subtitle": "최소 2명 승인 필요 · 현재 1/2",
          "status": "1/2 승인",
          "tone": "warning",
          "items": [
            {
              "title": "Min",
              "desc": "Tech Lead · 필수 승인자",
              "result": "승인",
              "tone": "success"
            },
            {
              "title": "Han",
              "desc": "Backend Lead · 필수 승인자",
              "result": "대기 중",
              "tone": "warning"
            },
            {
              "title": "Park",
              "desc": "Security Reviewer · 선택 승인자",
              "result": "검토 중",
              "tone": "warning"
            }
          ]
        },
        {
          "type": "pipeline",
          "icon": "PL",
          "iconTone": "orange",
          "title": "파이프라인",
          "subtitle": "mobile-banking-api · feature/login-policy",
          "status": "통과",
          "tone": "success",
          "items": [
            {
              "title": "Build",
              "desc": "dependency-install · compile",
              "result": "통과",
              "tone": "success"
            },
            {
              "title": "Test",
              "desc": "unit-test · integration-test",
              "result": "통과",
              "tone": "success"
            },
            {
              "title": "Quality Gate",
              "desc": "coverage · lint · static analysis",
              "result": "통과",
              "tone": "success"
            }
          ]
        },
        {
          "type": "check",
          "icon": "SC",
          "iconTone": "red",
          "title": "보안 점검",
          "subtitle": "SAST · SCA · Secret Detection · Container Scan",
          "status": "확인 필요",
          "tone": "danger",
          "items": [
            {
              "title": "SAST",
              "desc": "정적 분석 취약점 확인",
              "result": "확인 필요",
              "tone": "danger"
            },
            {
              "title": "SCA",
              "desc": "오픈소스 취약점 및 라이선스 확인",
              "result": "확인 필요",
              "tone": "danger"
            },
            {
              "title": "Secret Detection",
              "desc": "하드코딩된 키/패스워드 검출",
              "result": "통과",
              "tone": "success"
            }
          ]
        },
        {
          "type": "check",
          "icon": "DT",
          "iconTone": "purple",
          "title": "운영 이관",
          "subtitle": "운영 배포 전 사전 점검",
          "status": "준비 완료",
          "tone": "success",
          "items": [
            {
              "title": "변경 영향도",
              "desc": "연계 서비스 및 API 변경 영향 확인",
              "result": "확인 완료",
              "tone": "success"
            },
            {
              "title": "롤백 계획",
              "desc": "문제 발생 시 이전 버전 복구 절차",
              "result": "첨부됨",
              "tone": "success"
            }
          ]
        }
      ],
      "activity": {
        "review": [
          {
            "avatar": "민",
            "tone": "blue",
            "author": "Min",
            "time": "20분 전",
            "stateLabel": "리뷰",
            "comment": "인증 정책 응답값 개선 변경 범위 확인했습니다. 정책 조건과 예외 케이스를 중심으로 보겠습니다."
          },
          {
            "avatar": "박",
            "tone": "red",
            "author": "Park",
            "time": "10분 전",
            "stateLabel": "보안 검토",
            "comment": "보안 검증 결과와 운영 반영 조건을 함께 확인해 주세요."
          }
        ],
        "line": [
          {
            "avatar": "한",
            "tone": "green",
            "author": "Han",
            "file": "src/mobile/policy.ts:42",
            "time": "8분 전",
            "comment": "이 조건은 상수로 분리하면 재사용하기 좋겠습니다."
          }
        ],
        "general": [
          {
            "avatar": "J",
            "tone": "orange",
            "author": "Jito",
            "time": "20분 전",
            "comment": "인증 정책 응답값 개선 MR 생성했습니다. 리뷰 부탁드립니다."
          }
        ],
        "history": [
          {
            "time": "20분 전",
            "title": "MR 생성",
            "desc": "Jito가 feature/login-policy → develop MR을 생성했습니다."
          },
          {
            "time": "방금",
            "title": "상태 업데이트",
            "desc": "Pipeline passed · Security 확인 필요"
          }
        ]
      },
      "meta": [
        "Jito 요청",
        "20분 전",
        "댓글 8",
        "커밋 4",
        "변경 파일 6개"
      ],
      "diff": {
        "added": "+166",
        "removed": "-47",
        "files": 5
      }
    },
    "repository": {
      "id": "mobile-banking-api",
      "name": "mobile-banking-api",
      "groupKey": "banking",
      "group": "Digital Banking / Mobile",
      "typeKey": "typescript",
      "type": "TypeScript",
      "description": "은행 모바일 서비스의 계좌/인증 API Repository",
      "status": "approved",
      "favorite": true,
      "updatedAt": "Updated 20 minutes ago",
      "role": "Maintainer",
      "visibility": "Private",
      "defaultBranch": "main",
      "openMrCount": 5,
      "pipelineStatus": "failed",
      "securityStatus": "blocked",
      "metrics": [
        {
          "label": "Commits",
          "value": "1,248"
        },
        {
          "label": "Branches",
          "value": "14"
        },
        {
          "label": "Tags",
          "value": "8"
        },
        {
          "label": "Project Storage",
          "value": "2.4 GB"
        },
        {
          "label": "Security",
          "value": "High 1",
          "tone": "danger"
        }
      ],
      "nextUp": [
        {
          "title": "MR #128 검토가 필요합니다.",
          "desc": "mobile-banking-api · 리뷰/검증 상태 확인",
          "status": "리뷰 필요",
          "tone": "orange"
        },
        {
          "title": "최근 Pipeline 결과를 확인하세요.",
          "desc": "실패 Job 또는 Running 상태가 있는지 확인",
          "status": "Pipeline",
          "tone": "blue"
        },
        {
          "title": "보안 점검 결과를 확인하세요.",
          "desc": "병합 전 필수 Security Validation 기준",
          "status": "Security",
          "tone": "red"
        }
      ],
      "tickets": [
        {
          "title": "DBK-2419 은행 모바일 서비스의 계좌/인증  정리",
          "desc": "담당: Jito · Due today",
          "status": "진행 중",
          "tone": "orange"
        },
        {
          "title": "DBK-2450 API/화면 영향 범위 확인",
          "desc": "MR과 연결된 업무 티켓",
          "status": "To do",
          "tone": ""
        },
        {
          "title": "DBK-2480 정책/보안 점검 결과 조치",
          "desc": "Security Check와 연결",
          "status": "확인 필요",
          "tone": "red"
        }
      ]
    },
    "pipeline": {
      "id": "2847502395",
      "updatedAt": "20분 전",
      "title": "인증 정책 응답값 개선 Pipeline",
      "repo": "mobile-banking-api",
      "repoGroup": "Digital Banking / Mobile",
      "branch": "feature/login-policy",
      "target": "develop",
      "author": "Jito",
      "commit": "7e14d754",
      "status": "failed",
      "result": "failed",
      "trigger": "Push",
      "jobs": [
        "manual",
        "passed",
        "passed",
        "failed",
        "failed",
        "pending",
        "skipped",
        "created"
      ],
      "mrId": 128,
      "description": "인증 정책 응답값 개선 Pipeline 실행 결과입니다. Stage 흐름과 Job 로그를 확인할 수 있습니다.",
      "meta": [
        {
          "label": "Failed",
          "tone": "red"
        },
        {
          "label": "latest",
          "tone": "green"
        },
        {
          "label": "branch",
          "tone": "blue"
        },
        {
          "label": "작성자 Jito"
        },
        {
          "label": "20분 전 생성"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/login-policy"
        },
        {
          "label": "Commit",
          "value": "7e14d754"
        }
      ],
      "summary": [
        {
          "label": "Pipeline 총 실행 시간",
          "value": "04:22",
          "note": "생성부터 종료까지"
        },
        {
          "label": "실제 실행 시간",
          "value": "03:48",
          "note": "Runner 실행 기준"
        },
        {
          "label": "Failed Jobs",
          "value": "2",
          "note": "실패 Job 확인 필요",
          "tone": "danger"
        },
        {
          "label": "Completed Jobs",
          "value": "7",
          "note": "성공 또는 종료됨"
        }
      ],
      "stages": [
        {
          "name": "prepare",
          "status": "passed",
          "jobs": [
            {
              "name": "checkout",
              "status": "passed"
            },
            {
              "name": "install-dependencies",
              "status": "passed"
            }
          ]
        },
        {
          "name": "build",
          "status": "passed",
          "jobs": [
            {
              "name": "build-api",
              "status": "passed"
            },
            {
              "name": "build-assets",
              "status": "passed"
            }
          ]
        },
        {
          "name": "test",
          "status": "failed",
          "jobs": [
            {
              "name": "unit-test",
              "status": "failed"
            },
            {
              "name": "contract-test",
              "status": "failed"
            },
            {
              "name": "integration-test",
              "status": "passed"
            }
          ]
        },
        {
          "name": "security",
          "status": "passed",
          "jobs": [
            {
              "name": "sast",
              "status": "passed"
            },
            {
              "name": "sca",
              "status": "passed"
            }
          ]
        }
      ]
    },
    "security": {
      "id": "SEC-204",
      "mrId": 128,
      "mrTitle": "인증 정책 응답값 개선",
      "repo": "mobile-banking-api",
      "projectKey": "digital-banking",
      "project": "Digital Banking / Mobile",
      "branch": "feature/login-policy → develop",
      "author": "Jito",
      "mrStatus": "blocked",
      "vstatus": "failed",
      "vlabel": "Failed",
      "policy": "blocked",
      "policyLabel": "병합 불가",
      "severity": {
        "critical": 2,
        "high": 3,
        "medium": 1,
        "low": 0
      },
      "lastCheckedAt": "20분 전",
      "notice": {
        "title": "병합이 차단되었습니다",
        "desc": "Critical 또는 High 취약점이 탐지되어 보안 정책에 따라 병합이 제한됩니다."
      }
    },
    "commit": {
      "id": "7e14d754",
      "sha": "7e14d754",
      "repositoryId": "mobile-banking-api",
      "title": "인증 정책 응답값 개선 Pipeline",
      "description": "인증 정책 응답값 개선 Pipeline 관련 변경 사항입니다.",
      "author": "Jito",
      "createdAt": "20분 전",
      "added": 120,
      "removed": 20,
      "branch": "feature/login-policy",
      "mrId": 128,
      "meta": [
        {
          "label": "7e14d754",
          "tone": "blue"
        },
        {
          "label": "작성자 Jito"
        },
        {
          "label": "20분 전"
        },
        {
          "label": "+120 / -20"
        }
      ],
      "refs": [
        {
          "label": "Branch",
          "value": "feature/login-policy",
          "href": "./repository-detail.html?id=mobile-banking-api#branches"
        },
        {
          "label": "MR",
          "value": "#128",
          "href": "./mr-detail.html?id=128"
        },
        {
          "label": "Pipeline",
          "value": "#2847502395",
          "href": "./pipeline-detail.html?id=2847502395"
        }
      ]
    },
    "job": {
      "id": "2847502395",
      "name": "checkout",
      "stage": "prepare",
      "status": "passed",
      "statusLabel": "Passed",
      "tone": "green",
      "duration": "00:32",
      "runner": "runner-secure-02",
      "startedAt": "20분 전",
      "pipelineId": "2847502395",
      "log": [
        "$ npm ci",
        "$ npm run checkout",
        "Running checkout for mobile-banking-api",
        "✓ environment prepared",
        "✓ job completed",
        "Job succeeded"
      ]
    }
  },
  "deploymentTransfers": [
    {
      "id": "DT-2026-0519-001",
      "transferId": "DT-2026-0519-001",
      "repositoryId": "mobile-banking-api",
      "mrId": 128,
      "pipelineId": "2847502395",
      "securityId": "SEC-204",
      "status": "reviewing",
      "targetEnvironment": "production",
      "requestedBy": "Jito",
      "approvedBy": "Choi",
      "requestedAt": "20분 전",
      "scheduledAt": "2026-05-21 22:30",
      "updatedAt": "10분 전",
      "riskLevel": "high",
      "policyDecision": "conditional approval",
      "approvalStatus": "pending",
      "pipelineStatus": "passed",
      "securityStatus": "blocked",
      "gates": [
        { "label": "MR approved", "status": "passed" },
        { "label": "Pipeline passed", "status": "passed" },
        { "label": "Security validation passed", "status": "failed" },
        { "label": "Required approver completed", "status": "pending" },
        { "label": "Deployment window allowed", "status": "passed" },
        { "label": "No active policy block", "status": "failed" },
        { "label": "Audit log ready", "status": "passed" }
      ],
      "approvers": [
        { "role": "Requester", "name": "Jito", "status": "approved" },
        { "role": "Reviewer", "name": "Min", "status": "approved" },
        { "role": "Security Manager", "name": "Park", "status": "pending" },
        { "role": "Final Approver", "name": "Choi", "status": "pending" }
      ],
      "deploymentPlan": {
        "window": "22:30-23:30 KST",
        "rollbackPlan": "Blue/green rollback to v1.4.1-hotfix",
        "changeReason": "모바일 인증 정책 응답값 운영 반영",
        "impactScope": "Mobile login and account authentication API",
        "checklistNote": "Security exception approval required before deployment"
      },
      "activities": [
        { "type": "requested", "actor": "Jito", "message": "운영이관 요청 생성", "createdAt": "20분 전" },
        { "type": "reviewed", "actor": "Min", "message": "MR 승인 상태 확인", "createdAt": "15분 전" },
        { "type": "blocked", "actor": "System", "message": "Security gate blocked by SEC-204", "createdAt": "12분 전" }
      ]
    },
    {
      "id": "DT-2026-0520-002",
      "transferId": "DT-2026-0520-002",
      "repositoryId": "customer-web-portal",
      "mrId": 129,
      "pipelineId": "2847502411",
      "securityId": "SEC-301",
      "status": "scheduled",
      "targetEnvironment": "staging",
      "requestedBy": "Min",
      "approvedBy": "Han",
      "requestedAt": "1시간 전",
      "scheduledAt": "2026-05-21 19:00",
      "updatedAt": "30분 전",
      "riskLevel": "medium",
      "policyDecision": "approved",
      "approvalStatus": "approved",
      "pipelineStatus": "running",
      "securityStatus": "warning",
      "gates": [
        { "label": "MR approved", "status": "passed" },
        { "label": "Pipeline passed", "status": "warning" },
        { "label": "Security validation passed", "status": "warning" },
        { "label": "Required approver completed", "status": "passed" },
        { "label": "Deployment window allowed", "status": "passed" },
        { "label": "No active policy block", "status": "passed" },
        { "label": "Audit log ready", "status": "passed" }
      ],
      "approvers": [
        { "role": "Requester", "name": "Min", "status": "approved" },
        { "role": "Reviewer", "name": "Seo", "status": "approved" },
        { "role": "Final Approver", "name": "Han", "status": "approved" }
      ],
      "deploymentPlan": {
        "window": "19:00-20:00 KST",
        "rollbackPlan": "Rollback frontend bundle to previous CDN version",
        "changeReason": "고객 포털 인증 배너 개선",
        "impactScope": "Customer portal login page",
        "checklistNote": "Monitor error rate for 30 minutes"
      },
      "activities": [
        { "type": "requested", "actor": "Min", "message": "Staging 이관 요청", "createdAt": "1시간 전" },
        { "type": "approved", "actor": "Han", "message": "배포 승인 완료", "createdAt": "30분 전" },
        { "type": "scheduled", "actor": "System", "message": "배포 창 예약", "createdAt": "30분 전" }
      ]
    },
    {
      "id": "DT-2026-0521-003",
      "transferId": "DT-2026-0521-003",
      "repositoryId": "mobile-banking-api",
      "mrId": 127,
      "pipelineId": "2847502398",
      "securityId": "SEC-112",
      "status": "approved",
      "targetEnvironment": "production",
      "requestedBy": "Kang",
      "approvedBy": "Choi",
      "requestedAt": "어제",
      "scheduledAt": "2026-05-22 01:00",
      "updatedAt": "2시간 전",
      "riskLevel": "low",
      "policyDecision": "approved",
      "approvalStatus": "approved",
      "pipelineStatus": "passed",
      "securityStatus": "passed",
      "gates": [
        { "label": "MR approved", "status": "passed" },
        { "label": "Pipeline passed", "status": "passed" },
        { "label": "Security validation passed", "status": "passed" },
        { "label": "Required approver completed", "status": "passed" },
        { "label": "Deployment window allowed", "status": "passed" },
        { "label": "No active policy block", "status": "passed" },
        { "label": "Audit log ready", "status": "passed" }
      ],
      "approvers": [
        { "role": "Requester", "name": "Kang", "status": "approved" },
        { "role": "Reviewer", "name": "Han", "status": "approved" },
        { "role": "Final Approver", "name": "Choi", "status": "approved" }
      ],
      "deploymentPlan": {
        "window": "01:00-02:00 KST",
        "rollbackPlan": "Feature flag off and API rollback",
        "changeReason": "계좌 이체 한도 정책 운영 반영",
        "impactScope": "Transfer limit API",
        "checklistNote": "Ready to deploy"
      },
      "activities": [
        { "type": "requested", "actor": "Kang", "message": "운영이관 요청", "createdAt": "어제" },
        { "type": "approved", "actor": "Choi", "message": "최종 승인 완료", "createdAt": "2시간 전" }
      ]
    }
  ],
  "deploymentTransferDashboard": {
    "summary": {
      "scheduledToday": 4,
      "ready": 3,
      "needsReview": 2,
      "blocked": 1
    },
    "timeline": [
      {
        "time": "21:00",
        "title": "사전 점검 시작",
        "description": "Pipeline, 보안 점검, 승인 상태 확인 · 운영 담당자 박운영",
        "status": "completed"
      },
      {
        "time": "22:00",
        "title": "리허설 결과 검토",
        "description": "DB 마이그레이션 예상 소요 18분 · 오류 1건 확인 필요",
        "status": "warning"
      },
      {
        "time": "23:00",
        "title": "최종 운영이관 실행",
        "description": "payment-api, customer-portal, admin-console 순차 반영",
        "status": "waiting"
      },
      {
        "time": "00:30",
        "title": "안정화 모니터링",
        "description": "서비스 정상 작동, 데이터 정합성, 연계 시스템 통신 확인",
        "status": "scheduled"
      }
    ],
    "risks": [
      {
        "id": "risk-001",
        "requestId": "transfer-002",
        "title": "보안 점검 미완료",
        "status": "blocked",
        "description": "customer-portal MR의 High 취약점 1건이 조치 대기 상태입니다. 보안 담당자 확인 후 예외 승인 또는 조치가 필요합니다."
      },
      {
        "id": "risk-002",
        "requestId": "transfer-003",
        "title": "리허설 결과 확인 필요",
        "status": "review",
        "description": "DB 마이그레이션 리허설에서 예상 시간보다 7분 초과되었습니다. 운영 영향도를 재검토해 주세요."
      },
      {
        "id": "risk-003",
        "requestId": "transfer-005",
        "title": "승인권자 1명 미승인",
        "status": "waiting",
        "description": "최종 승인자 2명 중 1명의 승인이 남아 있습니다. 승인 완료 전 최종 이관을 실행할 수 없습니다."
      }
    ],
    "requests": [
      {
        "id": "transfer-001",
        "title": "결제 승인 API 개선 반영",
        "environment": "Production",
        "repositoryId": "mobile-banking-api",
        "repositoryName": "payment-api",
        "mrId": 128,
        "mrNumber": "!248",
        "pipelineId": "2847502395",
        "pipelineNumber": "#8471",
        "scheduledTime": "오늘 23:00",
        "owners": ["김개발", "박운영"],
        "currentStep": "승인 완료",
        "riskLevel": "low",
        "status": "ready"
      },
      {
        "id": "transfer-002",
        "title": "고객 포털 인증 정책 변경",
        "environment": "Production",
        "repositoryId": "customer-web-portal",
        "repositoryName": "customer-portal",
        "mrId": 129,
        "mrNumber": "!391",
        "pipelineId": "2847502411",
        "pipelineNumber": "#8522",
        "scheduledTime": "오늘 23:20",
        "owners": ["이프론트", "최보안"],
        "currentStep": "보안 점검",
        "riskLevel": "high",
        "status": "blocked"
      },
      {
        "id": "transfer-003",
        "title": "관리자 콘솔 권한 메뉴 배포",
        "environment": "Production",
        "repositoryId": "auth-policy-engine",
        "repositoryName": "admin-console",
        "mrId": 128,
        "mrNumber": "!112",
        "pipelineId": "2847502382",
        "pipelineNumber": "#8390",
        "scheduledTime": "오늘 23:40",
        "owners": ["정관리", "박운영"],
        "currentStep": "리허설 검토",
        "riskLevel": "medium",
        "status": "review"
      },
      {
        "id": "transfer-004",
        "title": "계좌 한도 정책 운영 반영",
        "environment": "Production",
        "repositoryId": "mobile-banking-api",
        "repositoryName": "account-limit-service",
        "mrId": 127,
        "mrNumber": "!255",
        "pipelineId": "2847502388",
        "pipelineNumber": "#8488",
        "scheduledTime": "오늘 23:55",
        "owners": ["한계좌", "박운영"],
        "currentStep": "승인 완료",
        "riskLevel": "low",
        "status": "ready"
      },
      {
        "id": "transfer-005",
        "title": "알림 템플릿 변수 표준화",
        "environment": "Production",
        "repositoryId": "notification-gateway",
        "repositoryName": "notification-gateway",
        "mrId": 125,
        "mrNumber": "!318",
        "pipelineId": "2847502369",
        "pipelineNumber": "#8369",
        "scheduledTime": "내일 00:10",
        "owners": ["윤메시지", "박운영"],
        "currentStep": "최종 승인",
        "riskLevel": "medium",
        "status": "review"
      },
      {
        "id": "transfer-006",
        "title": "정산 배치 처리량 개선",
        "environment": "Production",
        "repositoryId": "settlement-batch",
        "repositoryName": "settlement-batch",
        "mrId": 121,
        "mrNumber": "!204",
        "pipelineId": "2847502322",
        "pipelineNumber": "#8322",
        "scheduledTime": "내일 00:30",
        "owners": ["배정산", "김운영"],
        "currentStep": "안정화 모니터링",
        "riskLevel": "low",
        "status": "stabilizing"
      },
      {
        "id": "transfer-007",
        "title": "감사 로그 내보내기 포맷 반영",
        "environment": "Production",
        "repositoryId": "compliance-exporter",
        "repositoryName": "compliance-exporter",
        "mrId": 119,
        "mrNumber": "!179",
        "pipelineId": "2847502310",
        "pipelineNumber": "#8310",
        "scheduledTime": "내일 00:45",
        "owners": ["백감사", "김운영"],
        "currentStep": "승인 완료",
        "riskLevel": "low",
        "status": "ready"
      }
    ],
    "defaultSelectedRequestId": "transfer-002",
    "requestDetails": {
      "transfer-001": {
        "summary": {
          "availability": "운영 반영 가능",
          "currentStep": "승인 완료",
          "blockers": 0,
          "riskLevel": "low",
          "expectedDuration": "18분",
          "expectedRollbackTime": "12분"
        },
        "mergeable": true,
        "mergeBlockers": [],
        "mergeTarget": {
          "sourceBranch": "feature/payment-approval",
          "targetBranch": "main",
          "environment": "Production"
        },
        "conditions": [
          { "id": "plan", "title": "이관 계획서 작성", "status": "completed", "description": "일정, 담당자, 작업 범위가 등록되었습니다.", "owner": "박운영", "completedAt": "6시간 전", "action": "계획서 보기" },
          { "id": "rollback", "title": "롤백 계획 등록", "status": "completed", "description": "장애 발생 시 롤백 절차가 등록되었습니다.", "owner": "박운영", "completedAt": "6시간 전", "action": "롤백 계획 보기" },
          { "id": "approval", "title": "승인권자 승인", "status": "completed", "description": "필수 승인권자 승인이 완료되었습니다.", "owner": "김승인", "completedAt": "2시간 전", "action": "승인 내역 보기" },
          { "id": "pipeline", "title": "Pipeline 성공", "status": "completed", "description": "연결된 Pipeline이 성공했습니다.", "owner": "김개발", "completedAt": "5시간 전", "action": "Pipeline 보기" },
          { "id": "security", "title": "보안 점검 완료", "status": "completed", "description": "보안 점검이 완료되었습니다.", "owner": "최보안", "completedAt": "4시간 전", "action": "보안 결과 보기" },
          { "id": "rehearsal", "title": "리허설 결과 검토", "status": "completed", "description": "리허설 결과 검토가 완료되었습니다.", "owner": "박운영", "completedAt": "3시간 전", "action": "리허설 결과 보기" },
          { "id": "impact", "title": "운영 영향도 확인", "status": "completed", "description": "운영 영향도 확인이 완료되었습니다.", "owner": "김개발", "completedAt": "2시간 전", "action": "영향도 보기" }
        ],
        "checklist": [
          { "title": "이관 계획서 작성", "status": "completed" },
          { "title": "롤백 계획 등록", "status": "completed" },
          { "title": "리허설 결과 검토", "status": "completed" },
          { "title": "보안 점검 완료", "status": "completed" },
          { "title": "승인권자 승인", "status": "completed" }
        ],
        "steps": [
          { "step": "STEP 01", "title": "계획 수립", "description": "일정, 담당자, 롤백 계획 등록 완료", "status": "completed" },
          { "step": "STEP 02", "title": "UAT 완료", "description": "현업 인수 테스트 완료", "status": "completed" },
          { "step": "STEP 03", "title": "보안 점검", "description": "취약점 조치 완료", "status": "completed" },
          { "step": "STEP 04", "title": "리허설 검토", "description": "예정 시간 내 완료", "status": "completed" },
          { "step": "STEP 05", "title": "안정화", "description": "최종 이관 이후 모니터링 예정", "status": "scheduled" }
        ],
        "metrics": { "recentErrors": "0건", "integrationStatus": "정상", "expectedRollbackTime": "12분" },
        "owners": {
          "developer": "김개발",
          "operator": "박운영",
          "security": "최보안",
          "approvers": ["김승인", "박승인"]
        },
        "sourceBranch": "feature/payment-approval",
        "targetBranch": "main",
        "deployWindow": "오늘 23:00 - 01:00",
        "rehearsal": {
          "status": "completed",
          "expectedDuration": "18분",
          "actualDuration": "17분",
          "exceededBy": "0분",
          "errors": "0건",
          "warnings": "0건",
          "rollbackTime": "12분"
        },
        "rollbackPlan": {
          "owner": "박운영",
          "expectedTime": "12분",
          "condition": "배포 후 오류율 5% 이상 또는 결제 승인 API 장애 발생",
          "summary": "이전 이미지로 재배포 후 결제 승인 라우팅을 이전 버전으로 전환합니다.",
          "backupStatus": "완료",
          "finalReviewer": "김승인",
          "steps": ["이전 API 이미지로 재배포합니다.", "결제 승인 라우팅을 이전 버전으로 전환합니다.", "승인 요청 성공률을 확인합니다."]
        },
        "activities": [
          { "id": "activity-ready-001", "type": "request", "title": "박운영님이 운영이관 요청을 생성했어요.", "timeText": "6시간 전" },
          { "id": "activity-ready-002", "type": "pipeline", "title": "Pipeline #8471이 성공했어요.", "timeText": "5시간 전" },
          { "id": "activity-ready-003", "type": "approval", "title": "승인권자 승인이 완료되었어요.", "timeText": "2시간 전" }
        ]
      },
      "transfer-002": {
        "summary": {
          "availability": "운영 반영 불가",
          "currentStep": "보안 점검",
          "blockers": 1,
          "riskLevel": "high",
          "expectedDuration": "18분",
          "expectedRollbackTime": "18분"
        },
        "mergeable": false,
        "mergeTarget": {
          "sourceBranch": "feature/auth-policy",
          "targetBranch": "main",
          "environment": "Production"
        },
        "mergeBlockers": [
          "보안 점검 완료 항목이 미완료 상태입니다.",
          "리허설 결과 검토가 필요합니다.",
          "운영 영향도 확인이 필요합니다."
        ],
        "conditions": [
          { "id": "plan", "title": "이관 계획서 작성", "status": "completed", "description": "일정, 담당자, 작업 범위가 등록되었습니다.", "owner": "박운영", "completedAt": "6시간 전", "action": "계획서 보기" },
          { "id": "rollback", "title": "롤백 계획 등록", "status": "completed", "description": "장애 발생 시 롤백 절차가 등록되었습니다.", "owner": "박운영", "completedAt": "6시간 전", "action": "롤백 계획 보기" },
          { "id": "approval", "title": "승인권자 승인", "status": "completed", "description": "필수 승인권자 승인이 완료되었습니다.", "owner": "김승인", "completedAt": "2시간 전", "action": "승인 내역 보기" },
          { "id": "pipeline", "title": "Pipeline 성공", "status": "completed", "description": "연결된 Pipeline이 성공했습니다.", "owner": "이프론트", "completedAt": "5시간 전", "action": "Pipeline 보기" },
          { "id": "security", "title": "보안 점검 완료", "status": "blocked", "description": "High 취약점 1건이 조치 대기 상태입니다.", "owner": "최보안", "completedAt": "-", "action": "보안 결과 보기" },
          { "id": "rehearsal", "title": "리허설 결과 검토", "status": "review", "description": "예상 시간보다 7분 초과되어 확인이 필요합니다.", "owner": "박운영", "completedAt": "3시간 전", "action": "리허설 결과 보기" },
          { "id": "impact", "title": "운영 영향도 확인", "status": "review", "description": "로그인 정책 예외 응답값 변경 영향도를 재검토해야 합니다.", "owner": "이프론트", "completedAt": "-", "action": "영향도 보기" }
        ],
        "checklist": [
          { "title": "이관 계획서 작성", "status": "completed" },
          { "title": "롤백 계획 등록", "status": "completed" },
          { "title": "리허설 결과 검토", "status": "review" },
          { "title": "보안 점검 완료", "status": "blocked" },
          { "title": "승인권자 승인", "status": "completed" }
        ],
        "steps": [
          { "step": "STEP 01", "title": "계획 수립", "description": "일정, 담당자, 롤백 계획 등록 완료", "status": "completed" },
          { "step": "STEP 02", "title": "UAT 완료", "description": "현업 인수 테스트 완료", "status": "completed" },
          { "step": "STEP 03", "title": "보안 점검", "description": "High 취약점 조치 필요", "status": "blocked" },
          { "step": "STEP 04", "title": "리허설 검토", "description": "소요 시간 초과 확인 중", "status": "review" },
          { "step": "STEP 05", "title": "안정화", "description": "최종 이관 이후 모니터링 예정", "status": "scheduled" }
        ],
        "metrics": { "recentErrors": "0건", "integrationStatus": "정상", "expectedRollbackTime": "18분" },
        "owners": {
          "developer": "이프론트",
          "operator": "박운영",
          "security": "최보안",
          "approvers": ["김승인", "박승인"]
        },
        "sourceBranch": "feature/auth-policy",
        "targetBranch": "main",
        "deployWindow": "오늘 23:00 - 01:00",
        "rehearsal": {
          "status": "review",
          "expectedDuration": "18분",
          "actualDuration": "25분",
          "exceededBy": "+7분",
          "errors": "0건",
          "warnings": "1건",
          "rollbackTime": "18분"
        },
        "rollbackPlan": {
          "owner": "박운영",
          "expectedTime": "18분",
          "condition": "배포 후 오류율 5% 이상 또는 핵심 API 장애 발생",
          "summary": "이전 이미지로 재배포 후 DB migration rollback script를 실행합니다.",
          "backupStatus": "완료",
          "finalReviewer": "김승인",
          "steps": ["이전 이미지로 customer-portal 서비스를 재배포합니다.", "DB migration rollback script를 실행합니다.", "인증 서버와 결제 승인 API 연계를 재확인합니다."]
        },
        "impact": {
          "services": ["customer-portal"],
          "apis": ["/api/v1/account/limits"],
          "hasDatabaseChange": true,
          "integrations": ["인증 서버", "결제 승인 API"],
          "userImpact": "로그인 정책 예외 응답값 변경",
          "needsInspection": true
        },
        "changes": {
          "files": 12,
          "added": 280,
          "removed": 96,
          "summary": ["인증 정책 예외 응답값 정규화", "계정 한도 API 오류 처리 보강", "운영 로그 필드 추가"],
          "filesChanged": [
            { "path": "src/features/auth/authPolicy.ts", "changeType": "수정", "impact": "로그인 정책 응답값" },
            { "path": "src/api/accountLimits.ts", "changeType": "수정", "impact": "계정 한도 API" },
            { "path": "db/migrations/20260528_auth_policy.sql", "changeType": "추가", "impact": "DB migration" }
          ]
        },
        "activities": [
          { "id": "activity-001", "type": "request", "title": "박운영님이 운영이관 요청을 생성했어요.", "timeText": "6시간 전" },
          { "id": "activity-002", "type": "pipeline", "title": "Pipeline #8522가 성공했어요.", "timeText": "5시간 전" },
          { "id": "activity-003", "type": "security", "title": "보안 점검에서 High 취약점 1건이 발견되었어요.", "timeText": "4시간 전" },
          { "id": "activity-004", "type": "security", "title": "최보안님이 예외 승인 검토를 요청했어요.", "timeText": "4시간 전" },
          { "id": "activity-005", "type": "rehearsal", "title": "DB 마이그레이션 리허설이 완료되었어요.", "timeText": "3시간 전" },
          { "id": "activity-006", "type": "rehearsal", "title": "예상 소요 시간보다 7분 초과되었어요.", "timeText": "3시간 전" },
          { "id": "activity-007", "type": "approval", "title": "승인권자 1명이 승인했어요.", "timeText": "2시간 전" },
          { "id": "activity-008", "type": "deployment", "title": "운영 반영 요청이 대기 상태로 변경되었어요.", "timeText": "1시간 전" }
        ]
      },
      "transfer-003": {
        "checklist": [
          { "title": "이관 계획서 작성", "status": "completed" },
          { "title": "롤백 계획 등록", "status": "completed" },
          { "title": "리허설 결과 검토", "status": "review" },
          { "title": "보안 점검 완료", "status": "completed" },
          { "title": "승인권자 승인", "status": "completed" }
        ],
        "steps": [
          { "step": "STEP 01", "title": "계획 수립", "description": "일정, 담당자, 롤백 계획 등록 완료", "status": "completed" },
          { "step": "STEP 02", "title": "UAT 완료", "description": "현업 인수 테스트 완료", "status": "completed" },
          { "step": "STEP 03", "title": "보안 점검", "description": "보안 점검 통과", "status": "completed" },
          { "step": "STEP 04", "title": "리허설 검토", "description": "소요 시간 초과 확인 중", "status": "review" },
          { "step": "STEP 05", "title": "안정화", "description": "최종 이관 이후 모니터링 예정", "status": "scheduled" }
        ],
        "metrics": { "recentErrors": "1건", "integrationStatus": "주의", "expectedRollbackTime": "18분" }
      }
    }
  },
  "mrMergePolicies": [
    {
      "id": "mcp-finance-standard",
      "name": "금융권 표준 MR Merge 조건",
      "minimumApprovals": 2,
      "requirePipelineSuccess": true,
      "requireSecurityValidation": true,
      "requireResolvedDiscussions": true,
      "requireNoConflicts": true,
      "requireDeploymentApproval": true,
      "allowedMergeRoles": ["Maintainer", "Admin"]
    }
  ],
  "branchProtectionTemplates": [
    {
      "id": "bpt-standard-v12",
      "name": "표준 운영 브랜치 보호 정책 v1.2",
      "description": "운영 브랜치의 직접 변경을 제한하고 MR, 승인, Pipeline, 보안 점검을 필수화하는 표준 정책입니다.",
      "status": "active",
      "version": "1.2",
      "targetBranches": ["main", "release/*"],
      "restrictions": { "createBranchRestricted": true, "pushRestricted": true, "deleteBranchRestricted": true, "forcePushBlocked": true },
      "mergeRules": { "mergeRequestRequired": true, "minimumApprovals": 2, "pipelineSuccessRequired": true, "securityCheckRequired": true, "deploymentApprovalRequired": true },
      "exceptionAllowedTargets": ["Admin", "Security Manager"],
      "adjustableOptionsForOwner": ["minimumApprovals", "targetBranches"],
      "summary": ["main 브랜치 직접 push 제한", "MR 승인 2명 이상 필요", "Pipeline 성공 시 병합 가능", "보안 점검 통과 필수", "Force push 차단", "브랜치 삭제 차단"],
      "appliedRepositoryIds": ["mobile-banking-api", "auth-policy-engine"],
      "createdBy": "Admin",
      "updatedBy": "Admin",
      "createdAt": "2026-05-10T09:00:00+09:00",
      "updatedAt": "2026-05-20T15:00:00+09:00"
    },
    {
      "id": "bpt-dev-flex-v10",
      "name": "개발 브랜치 유연 운영 정책 v1.0",
      "description": "개발 브랜치의 빠른 협업을 위해 승인 조건은 낮추고 Pipeline 검증을 유지하는 정책입니다.",
      "status": "active",
      "version": "1.0",
      "targetBranches": ["develop", "feature/*"],
      "restrictions": { "createBranchRestricted": false, "pushRestricted": false, "deleteBranchRestricted": true, "forcePushBlocked": true },
      "mergeRules": { "mergeRequestRequired": true, "minimumApprovals": 1, "pipelineSuccessRequired": true, "securityCheckRequired": false, "deploymentApprovalRequired": false },
      "exceptionAllowedTargets": ["Admin", "Maintainer"],
      "adjustableOptionsForOwner": ["targetBranches"],
      "summary": ["develop 브랜치 MR 필수", "MR 승인 1명 이상 필요", "Pipeline 성공 시 병합 가능", "Force push 차단"],
      "appliedRepositoryIds": ["customer-web-portal"],
      "createdBy": "Admin",
      "updatedBy": "Admin",
      "createdAt": "2026-05-12T09:00:00+09:00",
      "updatedAt": "2026-05-18T12:00:00+09:00"
    },
    {
      "id": "bpt-external-v11",
      "name": "외부 협업 저장소 제한 정책 v1.1",
      "description": "외부 개발자가 참여하는 저장소에서 직접 변경과 민감 브랜치 접근을 제한하는 정책입니다.",
      "status": "active",
      "version": "1.1",
      "targetBranches": ["main", "partner/*"],
      "restrictions": { "createBranchRestricted": true, "pushRestricted": true, "deleteBranchRestricted": true, "forcePushBlocked": true },
      "mergeRules": { "mergeRequestRequired": true, "minimumApprovals": 2, "pipelineSuccessRequired": true, "securityCheckRequired": true, "deploymentApprovalRequired": false },
      "exceptionAllowedTargets": ["Admin"],
      "adjustableOptionsForOwner": ["targetBranches"],
      "summary": ["외부 협업 브랜치 직접 push 제한", "MR 승인 2명 이상 필요", "보안 점검 통과 필수", "브랜치 삭제 차단"],
      "appliedRepositoryIds": [],
      "createdBy": "Admin",
      "updatedBy": "Admin",
      "createdAt": "2026-05-14T09:00:00+09:00",
      "updatedAt": "2026-05-19T14:00:00+09:00"
    },
    {
      "id": "bpt-hotfix-v10",
      "name": "긴급 Hotfix 브랜치 보호 정책 v1.0",
      "description": "긴급 수정 브랜치의 빠른 승인과 추적 가능한 예외 처리를 지원하는 정책입니다.",
      "status": "draft",
      "version": "1.0",
      "targetBranches": ["hotfix/*"],
      "restrictions": { "createBranchRestricted": false, "pushRestricted": true, "deleteBranchRestricted": true, "forcePushBlocked": true },
      "mergeRules": { "mergeRequestRequired": true, "minimumApprovals": 1, "pipelineSuccessRequired": true, "securityCheckRequired": true, "deploymentApprovalRequired": true },
      "exceptionAllowedTargets": ["Admin", "Release Manager"],
      "adjustableOptionsForOwner": ["targetBranches"],
      "summary": ["Hotfix MR 필수", "Release Manager 승인 필요", "Pipeline 및 보안 점검 필수", "운영이관 승인 필수"],
      "appliedRepositoryIds": [],
      "createdBy": "Admin",
      "updatedBy": "Admin",
      "createdAt": "2026-05-15T09:00:00+09:00",
      "updatedAt": "2026-05-17T16:00:00+09:00"
    }
  ],
  "branchProtectionPolicyRequests": [
    {
      "id": "BPR-1024",
      "type": "exception",
      "status": "pending",
      "repositoryId": "customer-web-portal",
      "templateId": "bpt-standard-v12",
      "requestedBy": "이지훈",
      "requestedRole": "Owner",
      "reason": "긴급 운영 배포를 위해 release/2026.05 브랜치에 한시적 예외가 필요합니다.",
      "requestedChanges": { "targetBranch": "release/2026.05", "expiresAt": "2026-05-30T23:59:59+09:00" },
      "reviewedBy": null,
      "createdAt": "2026-05-21T10:20:00+09:00",
      "updatedAt": "2026-05-21T10:20:00+09:00"
    },
    {
      "id": "BPR-1025",
      "type": "change",
      "status": "approved",
      "repositoryId": "mobile-banking-api",
      "templateId": "bpt-standard-v12",
      "requestedBy": "김민수",
      "requestedRole": "PM",
      "reason": "release/* 브랜치를 정책 적용 대상에 포함했습니다.",
      "requestedChanges": { "targetBranches": ["main", "release/*"] },
      "reviewedBy": "Admin",
      "createdAt": "2026-05-19T13:00:00+09:00",
      "updatedAt": "2026-05-20T09:30:00+09:00"
    },
    {
      "id": "BPR-1026",
      "type": "exception",
      "status": "rejected",
      "repositoryId": "auth-policy-engine",
      "templateId": "bpt-standard-v12",
      "requestedBy": "박서연",
      "requestedRole": "Owner",
      "reason": "main 브랜치 force push 예외 요청",
      "requestedChanges": { "targetBranch": "main", "expiresAt": "2026-05-22T23:59:59+09:00" },
      "reviewedBy": "Security Manager",
      "createdAt": "2026-05-18T10:20:00+09:00",
      "updatedAt": "2026-05-18T15:20:00+09:00"
    }
  ],
  "branchProtectionPolicyHistories": [
    { "id": "BPH-9001", "templateId": "bpt-standard-v12", "action": "updated", "actor": "Admin", "message": "최소 승인자 수가 1명에서 2명으로 변경되었습니다.", "before": { "minimumApprovals": 1 }, "after": { "minimumApprovals": 2 }, "createdAt": "2026-05-20T15:00:00+09:00" },
    { "id": "BPH-9002", "templateId": "bpt-standard-v12", "action": "applied", "actor": "Admin", "message": "mobile-banking-api에 표준 운영 브랜치 보호 정책이 적용되었습니다.", "before": {}, "after": { "repositoryId": "mobile-banking-api" }, "createdAt": "2026-05-20T16:10:00+09:00" },
    { "id": "BPH-9003", "templateId": "bpt-dev-flex-v10", "action": "created", "actor": "Admin", "message": "개발 브랜치 유연 운영 정책이 생성되었습니다.", "before": {}, "after": { "version": "1.0" }, "createdAt": "2026-05-12T09:00:00+09:00" }
  ],
  "admin": {
    "summary": { "organizations": 3, "users": 248, "activePolicies": 18, "policyViolations": 7, "pendingRequests": 9, "integrationStatus": "Healthy" },
    "roles": ["Owner", "Maintainer", "Developer", "Reporter", "Auditor", "Security Manager", "Custom Role"],
    "roleMappings": [
      { "id": "RM-1", "organization": "Digital Banking", "team": "Mobile API", "role": "Maintainer", "gitlabRole": "Maintainer", "screenAccess": "Repository, MR, Pipeline" },
      { "id": "RM-2", "organization": "Digital Banking", "team": "Security", "role": "Security Manager", "gitlabRole": "Reporter", "screenAccess": "Security, Deployment, Audit" },
      { "id": "RM-3", "organization": "Corporate Banking", "team": "Audit", "role": "Auditor", "gitlabRole": "Reporter", "screenAccess": "Audit, Policy read-only" }
    ],
    "policies": {
      "repository": [
        { "id": "RP-1", "name": "Repository naming", "value": "kebab-case with service suffix", "enabled": true },
        { "id": "RP-2", "name": "Default branch", "value": "main", "enabled": true },
        { "id": "RP-3", "name": "Private visibility", "value": "Required for banking projects", "enabled": true }
      ],
      "mrApproval": [
        { "id": "MRP-1", "name": "Required approvals", "value": "2 approvals", "enabled": true },
        { "id": "MRP-2", "name": "Code owner approval", "value": "Required on protected branch", "enabled": true },
        { "id": "MRP-3", "name": "Emergency exception", "value": "Owner + Audit reason", "enabled": true }
      ],
      "security": [
        { "id": "SP-1", "name": "SAST", "value": "Required", "enabled": true },
        { "id": "SP-2", "name": "Critical/High block", "value": "Block merge and deployment", "enabled": true },
        { "id": "SP-3", "name": "Exception approval", "value": "Security Manager required", "enabled": true }
      ],
      "deployment": [
        { "id": "DP-1", "name": "Production approver", "value": "Release Manager", "enabled": true },
        { "id": "DP-2", "name": "Deployment window", "value": "22:00-02:00 KST", "enabled": true },
        { "id": "DP-3", "name": "Rollback plan", "value": "Required", "enabled": true }
      ],
      "audit": [
        { "id": "AP-1", "name": "Retention", "value": "5 years", "enabled": true },
        { "id": "AP-2", "name": "Risk event alert", "value": "Immediate", "enabled": true },
        { "id": "AP-3", "name": "Admin tracking", "value": "All admin actions", "enabled": true }
      ],
      "notification": [
        { "id": "NP-1", "name": "MR review request", "value": "Mattermost + Email", "enabled": true },
        { "id": "NP-2", "name": "Pipeline failed", "value": "Mattermost", "enabled": true },
        { "id": "NP-3", "name": "Deployment approved", "value": "Email", "enabled": true }
      ]
    },
    "integrations": [
      { "id": "INT-1", "name": "GitLab", "status": "connected", "owner": "DevOps", "lastSync": "5분 전" },
      { "id": "INT-2", "name": "Mattermost", "status": "connected", "owner": "Platform", "lastSync": "12분 전" },
      { "id": "INT-3", "name": "Jira/ITBPI", "status": "warning", "owner": "PMO", "lastSync": "1시간 전" },
      { "id": "INT-4", "name": "Security scanner", "status": "connected", "owner": "Security", "lastSync": "8분 전" },
      { "id": "INT-5", "name": "Nexus", "status": "connected", "owner": "DevOps", "lastSync": "30분 전" },
      { "id": "INT-6", "name": "SSO/LDAP", "status": "connected", "owner": "IAM", "lastSync": "2분 전" }
    ],
    "themeSettings": { "productName": "gitddn", "organizationLogo": "K-Digital Bank", "primaryColor": "#256ef4", "accentColor": "#00a870", "mode": "Light" },
    "adminAuditLogs": [
      { "id": "ADM-101", "actor": "Baek", "action": "Deployment policy updated", "target": "Production approval", "createdAt": "15분 전", "result": "success" },
      { "id": "ADM-102", "actor": "Park", "action": "Security exception rule reviewed", "target": "Critical block", "createdAt": "1시간 전", "result": "warning" },
      { "id": "ADM-103", "actor": "System", "action": "Integration sync completed", "target": "GitLab", "createdAt": "2시간 전", "result": "success" }
    ],
    "tags": [
      {
        "id": "tag-001",
        "repositoryId": "mobile-banking-api",
        "repositoryName": "mobile-banking-api",
        "projectName": "Mobile Banking / API",
        "organizationName": "디지털뱅킹개발팀",
        "name": "v1.5.0-rc.1",
        "description": "다음 버전 릴리즈 후보",
        "protected": false,
        "release": false,
        "type": "pre-release",
        "latestCommit": { "sha": "c2b8e129", "message": "다음 버전 릴리즈 후보", "author": "Min", "updatedAt": "2026-05-28", "updatedAtText": "3시간 전 마지막 업데이트" },
        "createdAt": "2026-05-28",
        "createdAtText": "3시간 전 생성"
      },
      {
        "id": "tag-002",
        "repositoryId": "mobile-banking-api",
        "repositoryName": "mobile-banking-api",
        "projectName": "Mobile Banking / API",
        "organizationName": "디지털뱅킹개발팀",
        "name": "prod-2026.05.20",
        "description": "운영 배포 승인 태그",
        "protected": true,
        "release": true,
        "type": "production",
        "latestCommit": { "sha": "91a42df0", "message": "운영 배포 승인 태그", "author": "Choi", "updatedAt": "2026-05-27", "updatedAtText": "어제 마지막 업데이트" },
        "createdAt": "2026-05-27",
        "createdAtText": "어제 생성"
      },
      {
        "id": "tag-003",
        "repositoryId": "mobile-banking-api",
        "repositoryName": "mobile-banking-api",
        "projectName": "Mobile Banking / API",
        "organizationName": "디지털뱅킹개발팀",
        "name": "release-2026.05.20",
        "description": "5월 정기 릴리즈 후보",
        "protected": true,
        "release": true,
        "type": "release",
        "latestCommit": { "sha": "91a42df0", "message": "5월 정기 릴리즈 후보", "author": "Choi", "updatedAt": "2026-05-27", "updatedAtText": "어제 마지막 업데이트" },
        "createdAt": "2026-05-27",
        "createdAtText": "어제 생성"
      },
      {
        "id": "tag-004",
        "repositoryId": "mobile-banking-api",
        "repositoryName": "mobile-banking-api",
        "projectName": "Mobile Banking / API",
        "organizationName": "디지털뱅킹개발팀",
        "name": "v1.4.2",
        "description": "인증 정책 응답값 개선 정식 배포",
        "protected": true,
        "release": true,
        "type": "production",
        "latestCommit": { "sha": "7e14d754", "message": "인증 정책 응답값 개선 정식 배포", "author": "Choi", "updatedAt": "2026-05-26", "updatedAtText": "2일 전 마지막 업데이트" },
        "createdAt": "2026-05-26",
        "createdAtText": "2일 전 생성"
      },
      {
        "id": "tag-005",
        "repositoryId": "mobile-banking-api",
        "repositoryName": "mobile-banking-api",
        "projectName": "Mobile Banking / API",
        "organizationName": "디지털뱅킹개발팀",
        "name": "v1.4.1-hotfix",
        "description": "Pipeline retry hotfix",
        "protected": false,
        "release": false,
        "type": "hotfix",
        "latestCommit": { "sha": "5c91a022", "message": "Pipeline retry hotfix", "author": "Yoon", "updatedAt": "2026-05-23", "updatedAtText": "5일 전 마지막 업데이트" },
        "createdAt": "2026-05-23",
        "createdAtText": "5일 전 생성"
      },
      {
        "id": "tag-006",
        "repositoryId": "customer-web-portal",
        "repositoryName": "customer-web-portal",
        "projectName": "Digital Banking / Web",
        "organizationName": "디지털뱅킹개발팀",
        "name": "v2.1.0",
        "description": "고객 포털 인증 배너 개선 배포",
        "protected": true,
        "release": true,
        "type": "production",
        "latestCommit": { "sha": "c2b8e129", "message": "고객 포털 인증 배너 개선 배포", "author": "Min", "updatedAt": "2026-05-28", "updatedAtText": "10분 전 마지막 업데이트" },
        "createdAt": "2026-05-28",
        "createdAtText": "10분 전 생성"
      },
      {
        "id": "tag-007",
        "repositoryId": "customer-web-portal",
        "repositoryName": "customer-web-portal",
        "projectName": "Digital Banking / Web",
        "organizationName": "디지털뱅킹개발팀",
        "name": "v2.0.3-hotfix",
        "description": "로그인 만료 처리 긴급 수정",
        "protected": false,
        "release": false,
        "type": "hotfix",
        "latestCommit": { "sha": "4ac81e02", "message": "로그인 만료 처리 긴급 수정", "author": "Park", "updatedAt": "2026-05-25", "updatedAtText": "3일 전 마지막 업데이트" },
        "createdAt": "2026-05-25",
        "createdAtText": "3일 전 생성"
      },
      {
        "id": "tag-008",
        "repositoryId": "account-limit-service",
        "repositoryName": "account-limit-service",
        "projectName": "Account Limit / Service",
        "organizationName": "결제플랫폼팀",
        "name": "release-2026.05",
        "description": "계좌 한도 정책 5월 릴리즈",
        "protected": true,
        "release": true,
        "type": "release",
        "latestCommit": { "sha": "3c96a12b", "message": "계좌 이체 한도 정책 검증", "author": "Kang", "updatedAt": "2026-05-26", "updatedAtText": "2일 전 마지막 업데이트" },
        "createdAt": "2026-05-26",
        "createdAtText": "2일 전 생성"
      },
      {
        "id": "tag-009",
        "repositoryId": "account-limit-service",
        "repositoryName": "account-limit-service",
        "projectName": "Account Limit / Service",
        "organizationName": "결제플랫폼팀",
        "name": "v3.2.1",
        "description": "계좌 한도 서비스 안정화",
        "protected": true,
        "release": false,
        "type": "production",
        "latestCommit": { "sha": "8f6d2ab1", "message": "계좌 한도 서비스 안정화", "author": "Kim", "updatedAt": "2026-05-22", "updatedAtText": "6일 전 마지막 업데이트" },
        "createdAt": "2026-05-22",
        "createdAtText": "6일 전 생성"
      }
    ]
  }
}

export default mockData
