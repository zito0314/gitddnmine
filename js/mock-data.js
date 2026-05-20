// gitddn demo mock data
// 화면에 직접 박혀 있던 하드코딩 데이터를 한 곳에서 관리하기 위한 데모용 데이터입니다.
(function(){
  const status = {
    approved:{label:'승인 완료', chip:'green'}, pending:{label:'승인 대기', chip:'orange'}, rejected:{label:'승인 반려', chip:'red'}, canceled:{label:'요청 취소', chip:''},
    open:{label:'Open', chip:'blue'}, merged:{label:'Merged', chip:'green'}, closed:{label:'Closed', chip:''}, draft:{label:'Draft', chip:''},
    passed:{label:'Passed', chip:'green'}, failed:{label:'Failed', chip:'red'}, running:{label:'Running', chip:'orange'}, warning:{label:'Warning', chip:'orange'}, pass:{label:'Pass', chip:'green'}, blocked:{label:'Blocked', chip:'red'}
  };
  const users = [
    {id:'jito', name:'Jito', email:'jito@company.com', role:'Maintainer', avatar:'J'},
    {id:'min', name:'Min', email:'min@company.com', role:'Tech Lead', avatar:'민'},
    {id:'han', name:'Han', email:'han@company.com', role:'Backend Lead', avatar:'한'},
    {id:'seo', name:'Seo', email:'seo@company.com', role:'QA', avatar:'서'},
    {id:'park', name:'Park', email:'security@company.com', role:'Security Reviewer', avatar:'박'},
    {id:'partner', name:'Partner Dev', email:'partner@company.com', role:'Developer', avatar:'P'}
  ];
  const repositories = [
    {id:'mobile-banking-api', name:'mobile-banking-api', groupKey:'banking', group:'Digital Banking / Mobile', typeKey:'typescript', type:'TypeScript', description:'은행 모바일 서비스의 계좌/인증 API Repository', status:'approved', favorite:true, updatedAt:'Updated 2 hours ago', role:'Maintainer', visibility:'Private'},
    {id:'customer-web-portal', name:'customer-web-portal', groupKey:'banking', group:'Digital Banking / Web', typeKey:'react', type:'React', description:'고객 웹 포털 화면과 인증 흐름을 관리하는 Repository', status:'approved', favorite:false, updatedAt:'Updated yesterday', role:'Developer', visibility:'Private'},
    {id:'common-ui-components', name:'common-ui-components', groupKey:'platform', group:'Platform Center / Shared Module', typeKey:'vue', type:'Vue', description:'공통 UI 컴포넌트 라이브러리 Repository 생성 요청', status:'pending', favorite:false, updatedAt:'Requested 5 hours ago'},
    {id:'partner-payment-sdk', name:'partner-payment-sdk', groupKey:'partner', group:'Partner Workspace', typeKey:'java', type:'Java', description:'외부 결제 SDK 연동 모듈 Repository 생성 요청', status:'rejected', favorite:false, updatedAt:'Rejected 1 day ago', rejectReason:'외부 파트너 SDK 반입 승인 문서가 누락되었습니다.'},
    {id:'legacy-report-batch', name:'legacy-report-batch', groupKey:'banking', group:'Digital Banking / Batch', typeKey:'python', type:'Python', description:'리포트 배치 작업을 분리하기 위한 Repository 생성 요청', status:'canceled', favorite:false, updatedAt:'Canceled 3 days ago'}
  ];
  const mergeRequests = [
    {id:128,title:'인증 정책 응답값 개선',summary:'로그인 정책 예외 케이스 응답값 정리 및 인증 API 응답 필드 표준화',repo:'mobile-banking-api',repoGroup:'Digital Banking / Mobile',source:'feature/login-policy',target:'develop',owner:'jito',author:'Jito',updatedAt:'20분 전',pipeline:'passed',security:'failed',securityLabel:'확인 필요',review:'need-review',reviewLabel:'리뷰 필요',approved:1,required:2,comments:8,status:'open'},
    {id:126,title:'계좌 목록 캐싱 개선',summary:'계좌 목록 API 응답 캐싱 처리 및 로딩 상태 개선',repo:'customer-web-portal',repoGroup:'Digital Banking / Web',source:'feature/account-cache',target:'develop',owner:'min',author:'Min',updatedAt:'2시간 전',pipeline:'failed',security:'pending',securityLabel:'대기',review:'draft',reviewLabel:'Draft',approved:0,required:2,comments:3,status:'open'},
    {id:121,title:'로그인 실패 메시지 정리',summary:'로그인 실패 케이스별 메시지 및 에러 코드 정리',repo:'mobile-banking-api',repoGroup:'Digital Banking / Mobile',source:'fix/login-message',target:'main',owner:'han',author:'Han',updatedAt:'어제',pipeline:'passed',security:'passed',securityLabel:'Passed',review:'approved',reviewLabel:'승인 완료',approved:2,required:2,comments:11,status:'merged'},
    {id:118,title:'외부 인증 모듈 교체',summary:'외부 파트너 인증 SDK 교체 요청',repo:'partner-payment-sdk',repoGroup:'Partner Workspace',source:'feature/external-auth',target:'develop',owner:'partner',author:'Partner Dev',updatedAt:'3일 전',pipeline:'canceled',security:'none',securityLabel:'-',review:'rejected',reviewLabel:'승인 반려',approved:0,required:2,comments:5,status:'closed'},
    {id:116,title:'공통 버튼 컴포넌트 접근성 개선',summary:'키보드 포커스와 ARIA 속성을 보완합니다.',repo:'common-ui-components',repoGroup:'Platform Center / Shared Module',source:'feature/a11y-button',target:'develop',owner:'seo',author:'Seo',updatedAt:'5일 전',pipeline:'passed',security:'passed',securityLabel:'Passed',review:'approved',reviewLabel:'승인 완료',approved:2,required:2,comments:4,status:'merged'}
  ];
  const pipelines = [
    {id:'2847502395',updatedAt:'3분 전',title:"Merge branch 'dg-fix-subgroup-menu' into main",repo:'root-sub-repo',repoGroup:'Git 저장소 / root / sub',branch:'feature/subgroup-menu',target:'main',author:'김신한',commit:'7e14d754',status:'running',trigger:'Push',jobs:['manual','running','passed','pending','failed','canceled','skipped','created'],action:'cancel'},
    {id:'2847502388',updatedAt:'38분 전',title:'GNB breadcrumb overflow policy 적용',repo:'root-sub-repo',repoGroup:'Git 저장소 / root / sub',branch:'main',target:'main',author:'김신한',commit:'3c96a12b',status:'finished',result:'passed',trigger:'Push',jobs:['passed','passed','passed','passed','passed','passed','passed','passed']},
    {id:'2847502374',updatedAt:'1시간 전',title:'Contract test for account limits API',repo:'mobile-banking-api',repoGroup:'Digital Banking / Mobile',branch:'feature/account-limit',target:'develop',author:'이신한',commit:'b71c2f09',status:'failed',trigger:'Branch',jobs:['manual','passed','passed','pending','failed','canceled','skipped','created'],action:'rerun'},
    {id:'2847502369',updatedAt:'2시간 전',title:'MR 생성 화면 validation rule 정리',repo:'customer-web-portal',repoGroup:'Digital Banking / Web',branch:'feature/mr-validation',target:'develop',author:'박신한',commit:'c41a79ee',status:'finished',result:'canceled',trigger:'Manual',jobs:['manual','running','passed','pending','canceled','skipped','created','created'],action:'rerun'},
    {id:'2847502362',updatedAt:'2시간 전',title:'Security scan schedule trigger',repo:'mobile-banking-api',repoGroup:'Digital Banking / Mobile',branch:'release/2026.05',target:'main',author:'정신한',commit:'e0d1ab42',status:'running',trigger:'Schedule',jobs:['manual','running','passed','pending','created','created','created','created'],action:'cancel'}
  ];
  const securityValidations = [
    {id:'SEC-204',mrId:128,mrTitle:'인증 정책 응답값 개선',repo:'mobile-banking-api',projectKey:'digital-banking',project:'Digital Banking / Mobile',branch:'feature/login-policy → develop',author:'Jito',mrStatus:'blocked',vstatus:'failed',vlabel:'Failed',policy:'blocked',policyLabel:'병합 불가',severity:{critical:2,high:3,medium:1,low:0},lastCheckedAt:'20분 전'},
    {id:'SEC-203',mrId:126,mrTitle:'계좌 목록 캐싱 개선',repo:'customer-web-portal',projectKey:'digital-banking',project:'Digital Banking / Web',branch:'feature/account-cache → develop',author:'Min',mrStatus:'open',vstatus:'running',vlabel:'Running',policy:'pending',policyLabel:'검증 중',severity:{critical:0,high:0,medium:0,low:0},lastCheckedAt:'진행 중'},
    {id:'SEC-198',mrId:121,mrTitle:'로그인 실패 메시지 정리',repo:'mobile-banking-api',projectKey:'digital-banking',project:'Digital Banking / Mobile',branch:'fix/login-message → main',author:'Han',mrStatus:'merged',vstatus:'pass',vlabel:'Pass',policy:'allowed',policyLabel:'병합 가능',severity:{critical:0,high:0,medium:0,low:1},lastCheckedAt:'어제'},
    {id:'SEC-194',mrId:118,mrTitle:'외부 인증 모듈 교체',repo:'partner-payment-sdk',projectKey:'partner-workspace',project:'Partner Workspace',branch:'feature/external-auth → develop',author:'Partner Dev',mrStatus:'blocked',vstatus:'failed',vlabel:'Failed',policy:'blocked',policyLabel:'병합 불가',severity:{critical:1,high:2,medium:0,low:0},lastCheckedAt:'3일 전'},
    {id:'SEC-189',mrId:116,mrTitle:'공통 버튼 컴포넌트 접근성 개선',repo:'common-ui-components',projectKey:'platform-center',project:'Platform Center',branch:'feature/a11y-button → develop',author:'Seo',mrStatus:'merged',vstatus:'warning',vlabel:'Warning',policy:'allowed',policyLabel:'조건부 허용',severity:{critical:0,high:0,medium:2,low:3},lastCheckedAt:'5일 전'}
  ];
  const forms = {
    repositoryTemplates:['Spring','Gitlab','Android','iOS(Swift)','React Web','Node API'],
    repositoryMembers:['jito@company.com','min@company.com'],
    mrRepositories:['mobile-banking-api','customer-web-portal','common-ui-components'],
    sourceBranches:['feature/login-policy','feature/account-cache','fix/login-message','feature/account-limit'],
    targetBranches:['develop','main','release'],
    branchCommits:{
      source:{'feature/login-policy':{title:'로그인 정책 예외 케이스 응답값 개선',author:'Jito',sha:'a82f4c1',time:'20분 전'},'feature/account-cache':{title:'계좌 목록 캐싱 전략 적용',author:'Min',sha:'c92aa11',time:'2시간 전'},'fix/login-message':{title:'로그인 실패 메시지 문구 정리',author:'Han',sha:'9ca7e31',time:'어제'},'feature/account-limit':{title:'account limits API contract update',author:'김신한',sha:'7e14d754',time:'1시간 전'}},
      target:{develop:{title:'develop 브랜치 빌드 안정화',author:'Min',sha:'d31e92a',time:'1시간 전'},main:{title:'main 브랜치 최신 릴리즈 태그 적용',author:'Jito',sha:'a1b2c3d',time:'3시간 전'},release:{title:'release/2026.05 보안 점검 완료',author:'Security',sha:'f40b91c',time:'어제'}}
    },
    reviewers:[{email:'min@company.com',role:'리뷰어'},{email:'security@company.com',role:'승인자'}]
  };
  window.GITDDN_MOCK = { common:{status}, user:{currentUser:users[0], users}, repositories:{list:repositories, detail:repositories[0]}, mergeRequests:{list:mergeRequests, detail:mergeRequests[0]}, pipelines:{list:pipelines, detail:pipelines[0]}, security:{validations:securityValidations, detail:securityValidations[0]}, forms };
})();

(function(){ window.GITDDN_MOCK.audit = window.GITDDN_MOCK.audit || { summaryCards: [], logs: [] }; })();


// 상세 화면용 확장 mock data
(function(){
  const m = window.GITDDN_MOCK || {};
  m.details = {
    mergeRequest: {
      id: 128,
      breadcrumb: 'Digital Banking / mobile-banking-api / Merge Requests / #128',
      state: 'Open', stateKey: 'open', title: '인증 정책 응답값 개선',
      description: '로그인 정책 예외 케이스 응답값을 정리하고, 인증 API 응답 필드를 표준화하여 클라이언트에서 일관된 에러 핸들링이 가능하도록 개선하는 MR입니다.',
      meta: ['Jito 요청', '20분 전', '댓글 8', '커밋 4', '변경 파일 6개'],
      sourceBranch: 'feature/login-policy', targetBranch: 'develop', diff: { added: '+186', removed: '-42', files: 6 },
      summary: [
        {label:'Approvals', value:'1/2', note:'필수 승인자 1명 대기', tone:''},
        {label:'Pipeline', value:'Passed', note:'#8014 모든 단계 통과', tone:'success'},
        {label:'Security', value:'확인 필요', note:'SCA Medium 1건 확인 필요', tone:'danger'},
        {label:'Release Gate', value:'Ready', note:'운영 이관 조건 충족', tone:'success'}
      ],
      gates: [
        {type:'approval', icon:'AP', iconTone:'blue', title:'승인자', subtitle:'최소 2명 승인 필요 · 현재 1/2', status:'1/2 승인', tone:'warning', items:[
          {avatar:'민', avatarTone:'blue', name:'Min', role:'Tech Lead · 필수 승인자', result:'승인', tone:'success'},
          {avatar:'한', avatarTone:'green', name:'Han', role:'Backend Lead · 필수 승인자', result:'대기 중', tone:'warning'},
          {avatar:'서', avatarTone:'orange', name:'Seo', role:'QA · 선택 승인자', result:'승인', tone:'success'},
          {avatar:'박', avatarTone:'red', name:'Park', role:'Security Reviewer · 선택 승인자', result:'검토 중', tone:'warning'}
        ]},
        {type:'pipeline', icon:'PL', iconTone:'orange', title:'파이프라인', subtitle:'Pipeline #8014 · feature/login-policy', status:'통과', tone:'success', items:[
          {status:'done', title:'Build', desc:'gradle-build 58s · dependency-install 32s'},
          {status:'done', title:'Test', desc:'unit-test 통과 · auth-policy-test 통과 · integration-test 통과'},
          {status:'done', title:'Quality Gate', desc:'sonarqube-scan 통과 · coverage 84.2%'},
          {status:'done', title:'Deploy Staging', desc:'deploy-staging 완료 · smoke-test 통과'}
        ]},
        {type:'check', icon:'SC', iconTone:'red', title:'보안 점검', subtitle:'SAST · SCA · Secret Detection · Container Scan', status:'확인 필요 1건', tone:'danger', items:[
          {icon:'✓', iconClass:'check-ok', title:'SAST', desc:'SonarQube · Semgrep 취약점 없음', result:'통과', tone:'success'},
          {icon:'!', iconClass:'check-warn', title:'SCA', desc:'spring-security 5.7.3 CVE-2023-20862 · 업그레이드 권장', result:'확인 필요', tone:'warning'},
          {icon:'✓', iconClass:'check-ok', title:'Secret Detection', desc:'하드코딩된 키/패스워드 없음', result:'통과', tone:'success'},
          {icon:'✓', iconClass:'check-ok', title:'Container Scan', desc:'openjdk:17-slim · High 0 / Medium 0', result:'통과', tone:'success'}
        ]},
        {type:'check', icon:'DT', iconTone:'purple', title:'운영 이관', subtitle:'운영 서버 배포 전 사전 점검 항목', status:'준비 완료', tone:'success', items:[
          {icon:'✓', iconClass:'check-ok', title:'DB 마이그레이션', desc:'스키마 변경 없음', result:'해당 없음', tone:'success'},
          {icon:'!', iconClass:'check-warn', title:'환경변수 변경', desc:'AUTH_ERROR_CODE_VERSION 추가', result:'확인 필요', tone:'warning'},
          {icon:'✓', iconClass:'check-ok', title:'롤백 계획서', desc:'기존 응답 포맷으로 복구 가능', result:'첨부됨', tone:'success'}
        ]},
        {type:'check', icon:'LK', iconTone:'cyan', title:'내부 연계 시스템', subtitle:'Auth Hub · 알림 · 코어뱅킹 · Jira 연동 상태', status:'정상', tone:'success', items:[
          {icon:'✓', iconClass:'check-ok', title:'Auth Hub 인증 서버', desc:'OAuth2 토큰 발급 인터페이스 호환 확인', result:'정상', tone:'success'},
          {icon:'✓', iconClass:'check-ok', title:'알림 발송 시스템', desc:'로그인 실패 알림 스펙 호환', result:'정상', tone:'success'},
          {icon:'!', iconClass:'check-warn', title:'코어뱅킹 연동', desc:'인증 응답 필드 변경에 따른 클라이언트 검토 중', result:'확인 중', tone:'warning'}
        ]}
      ],
      activity: {
        review: [
          {avatar:'민', tone:'blue', author:'Min', time:'15분 전', state:'approved', stateLabel:'승인', comment:'응답 필드 표준화 방향성 좋습니다. AUTH_ERROR_CODE_VERSION 환경변수도 운영 반영 가이드에 함께 명시 부탁드립니다.'},
          {avatar:'박', tone:'red', author:'Park', time:'12분 전', stateLabel:'보안 검토', comment:'SCA 취약점은 운영 반영 전 예외 승인 또는 버전 업그레이드 근거가 필요합니다.'},
          {avatar:'한', tone:'green', author:'Han', time:'5분 전', stateLabel:'검토 중', comment:'클라이언트 에러 핸들링 영향 범위만 한 번 더 확인하겠습니다.'}
        ],
        line: [
          {avatar:'민', tone:'blue', author:'Min', file:'src/api/auth-policy.ts:42', time:'14분 전', comment:'에러 코드 상수는 별도 enum으로 분리하면 재사용하기 좋겠습니다.'},
          {avatar:'서', tone:'orange', author:'Seo', file:'tests/auth-policy.spec.ts:18', time:'10분 전', comment:'세션 만료 케이스에 대한 테스트도 추가해주세요.'}
        ],
        general: [
          {avatar:'J', tone:'orange', author:'Jito', time:'20분 전', comment:'인증 정책 응답값 개선 MR 생성했습니다. 리뷰 부탁드립니다.'},
          {avatar:'민', tone:'blue', author:'Min', time:'18분 전', comment:'확인했습니다. 영향 범위 중심으로 리뷰하겠습니다.'}
        ],
        history: [
          {time:'20분 전', title:'MR 생성', desc:'Jito가 feature/login-policy → develop MR을 생성했습니다.'},
          {time:'18분 전', title:'Pipeline 통과', desc:'#8014 Pipeline이 모든 단계를 통과했습니다.'},
          {time:'12분 전', title:'보안 점검 확인 필요', desc:'SCA Medium 취약점 1건이 확인되었습니다.'}
        ]
      }
    },
    repository: {
      name:'mobile-banking-api', description:'Digital Banking / Mobile 은행 모바일 서비스의 계좌/인증 API Repository',
      metrics:[{label:'Commits',value:'1,248'},{label:'Branches',value:'14'},{label:'Tags',value:'8'},{label:'Project Storage',value:'2.4 GB'},{label:'Security',value:'High 1',tone:'danger'}],
      nextUp:[{title:'MR #128 리뷰 요청이 있습니다.',desc:'인증 정책 응답값 개선 · 리뷰어 2명 대기 중',status:'리뷰 필요',tone:'orange'},{title:'보안 점검 2건의 조치가 필요합니다.',desc:'High 1건, Medium 1건 · Security 메뉴에서 상세 확인',status:'확인 필요',tone:'red'},{title:'main 브랜치 Pipeline이 정상 통과했습니다.',desc:'Build · Test · Security Scan 완료',status:'통과',tone:'green'}],
      tickets:[{title:'DBK-2419 로그인 정책 예외 케이스 정리',desc:'담당: Jito · Due today',status:'진행 중',tone:'orange'},{title:'DBK-2420 인증 API 응답 필드 문서화',desc:'MR #128 연결됨',status:'To do',tone:''},{title:'DBK-2424 보안 점검 결과 조치',desc:'Security Check High 1건 연결',status:'확인 필요',tone:'red'}]
    },
    pipeline: {
      id:'2847502395', description:'account limits API contract update 실행 결과입니다. Stage 흐름, Job dependency, 개별 Job 로그를 한 화면에서 이어서 확인할 수 있습니다.',
      meta:[{label:'Failed',tone:'red'},{label:'latest',tone:'green'},{label:'branch',tone:'blue'},{label:'작성자 김신한'},{label:'1시간 전 생성'},{label:'48분 전 종료'}],
      refs:[{label:'Branch',value:'feature/account-limit'},{label:'Commit',value:'7e14d754'}], chips:[{label:'12 Jobs'},{label:'3 Failed',tone:'red'},{label:'Source Push'}],
      summary:[{label:'Pipeline 총 실행 시간',value:'04:22',note:'생성부터 종료까지'},{label:'실제 실행 시간',value:'03:48',note:'Runner 실행 기준'},{label:'Failed Jobs',value:'3',note:'test stage 확인 필요',tone:'danger'},{label:'Completed Jobs',value:'7',note:'성공 또는 종료됨'}],
      stages:[{name:'prepare',status:'passed',jobs:[{name:'checkout',status:'passed'},{name:'install dependencies',status:'passed'}]},{name:'build',status:'running',jobs:[{name:'build-api',status:'passed'},{name:'build-web',status:'running'}]},{name:'test',status:'failed',jobs:[{name:'unit-test',status:'failed'},{name:'contract-test',status:'failed'},{name:'integration-test',status:'passed'}]},{name:'security',status:'pending',jobs:[{name:'sast',status:'pending'},{name:'sca',status:'created'}]}],
      jobs:[{name:'checkout',stage:'prepare',statusLabel:'Passed',tone:'green',duration:'00:18',runner:'runner-02',startedAt:'1시간 전'},{name:'unit-test',stage:'test',statusLabel:'Failed',tone:'red',duration:'01:12',runner:'runner-04',startedAt:'48분 전'},{name:'contract-test',stage:'test',statusLabel:'Failed',tone:'red',duration:'00:54',runner:'runner-04',startedAt:'47분 전'}]
    },
    security: {
      mrId:128, title:'인증 정책 응답값 개선', status:'Failed', statusKey:'failed', policy:'병합 불가', policyKey:'blocked',
      meta:['mobile-banking-api','feature/login-policy → develop','작성자 Jito','마지막 검증 20분 전'],
      notice:{title:'병합이 차단되었습니다',desc:'Critical 취약점 2건이 탐지되어 보안 정책에 따라 병합이 불가합니다. 하단 취약점 목록에서 조치 후 재검증하세요.'},
      severity:[{key:'critical',label:'Critical',count:2},{key:'high',label:'High',count:3},{key:'medium',label:'Medium',count:1},{key:'low',label:'Low',count:0}]
    },
    commit: {
      title:'account limits API contract update', description:'계좌 한도 API 계약 변경에 맞춰 응답 스키마와 검증 로직을 업데이트한 커밋입니다.',
      meta:[{label:'7e14d754',tone:'blue'},{label:'작성자 김신한'},{label:'1시간 전'},{label:'+186 / -42'}],
      refs:[{label:'Parent',value:'a1b2c3d',href:'./commit-detail.html?commit=a1b2c3d'},{label:'Branch',value:'feature/account-limit · main',href:'./repository-detail.html#branches'},{label:'Tag',value:'v2.4.0',href:'./repository-detail.html#tags'},{label:'MR',value:'#128 · 인증 정책 응답값 개선',href:'./repository-detail.html#merge-requests'}]
    },
    job: {name:'unit-test', description:'account limits API contract update Pipeline의 unit-test Job 실행 로그입니다.', logs:['$ npm run test:unit','Running account limit policy tests...','✓ should return limit policy for active account','✕ should block over-limit transfer','Error: expected 200, received 422','Job failed with exit code 1']}
  };
  window.GITDDN_MOCK = m;
})();
